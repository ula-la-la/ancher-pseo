import { pathToFileURL } from "node:url";
import path from "node:path";

async function importRepoFile(repoRoot, relativePath) {
  return import(pathToFileURL(path.join(repoRoot, relativePath)).href);
}

export async function listHiddenJobs(repoRoot) {
  const [{ galleryItems }, { galleryArtifacts }, { galleryPrompts }, { useCasesBySlug }] =
    await Promise.all([
      importRepoFile(repoRoot, "app/data/gallery.ts"),
      importRepoFile(repoRoot, "app/data/galleryArtifacts.ts"),
      importRepoFile(repoRoot, "app/data/galleryPrompts.ts"),
      importRepoFile(repoRoot, "app/data/useCases.ts"),
    ]);

  const published = new Set(Object.keys(galleryArtifacts));

  return galleryItems
    .filter((item) => !published.has(item.slug))
    .map((item) => {
      const prompt = galleryPrompts[item.slug];
      if (!prompt?.source?.url) {
        throw new Error(`Hidden gallery job ${item.slug} has no X source`);
      }

      return {
        slug: item.slug,
        title: item.title,
        h1: item.h1,
        description: item.description,
        metaDescription: item.metaDescription,
        primaryKeyword: item.primaryKeyword,
        secondaryKeywords: item.secondaryKeywords,
        category: item.category,
        outputType: item.outputType,
        outputMode: "text-first",
        inputType: item.inputType,
        included: item.included,
        sourceRequirements: item.sourceRequirements,
        audiences: useCasesBySlug[item.slug] ?? [],
        prompt: {
          title: prompt.title,
          query: prompt.query,
          body: prompt.body,
        },
        sources: [{ ...prompt.source }],
      };
    });
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const jobs = await listHiddenJobs(process.cwd());
  process.stdout.write(`${JSON.stringify(jobs, null, 2)}\n`);
}
