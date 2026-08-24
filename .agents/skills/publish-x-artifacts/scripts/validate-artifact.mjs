import fs from "node:fs/promises";
import { pathToFileURL } from "node:url";

function textFromHtml(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|amp|lt|gt|quot|#39);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tagText(html, tag) {
  const match = html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? textFromHtml(match[1]) : "";
}

function normalize(value = "") {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function includesNormalized(haystack = "", needle = "") {
  return normalize(haystack).includes(normalize(needle));
}

function footerDetails(html) {
  const matches = [...html.matchAll(/<footer\b[^>]*>([\s\S]*?)<\/footer>/gi)];
  const footerHtml = matches[0]?.[1] ?? "";
  const anchors = [...footerHtml.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)];
  const href = anchors[0]?.[1]?.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? "";
  const afterFooter = matches.length
    ? html.slice((matches[0].index ?? 0) + matches[0][0].length)
    : html;
  return {
    count: matches.length,
    text: textFromHtml(footerHtml),
    anchorCount: anchors.length,
    anchorText: anchors[0] ? textFromHtml(anchors[0][2]) : "",
    href,
    afterText: textFromHtml(afterFooter),
  };
}

export function validateArtifact({ html, job }) {
  const errors = [];
  const add = (code, message) => errors.push({ code, message });
  const visibleText = textFromHtml(html);
  const title = tagText(html, "title");
  const h1 = tagText(html, "h1");
  const footer = footerDetails(html);

  if (!/<meta\s+[^>]*name=["']viewport["'][^>]*>/i.test(html)) {
    add("viewport", "Responsive viewport metadata is required");
  }
  if (!/<meta\s+[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(html) &&
      !/<meta\s+[^>]*content=["'][^"']+["'][^>]*name=["']description["']/i.test(html)) {
    add("meta-description", "A meta description is required");
  }

  if (!job.editorialTitle ||
      !includesNormalized(title, job.editorialTitle) ||
      !includesNormalized(h1, job.editorialTitle)) {
    add("editorial-title", "The HTML title and H1 must carry the locked source-derived editorial title");
  }

  const genericTitle = /\b(?:illustrative\s+example|sample|example)\b/i.test(`${title} ${h1}`) ||
    (job.outputType && [title, h1].some((value) => normalize(value) === normalize(job.outputType)));
  if (genericTitle) {
    add("generic-title", "Use a specific source-derived editorial headline, not sample/example or a bare output type");
  }

  if (/\b(?:illustrative\s+example|fictional\s+(?:example|sample|case)|sample\s+(?:report|summary|brief|document)|example\s+(?:report|summary|brief|document))\b/i.test(visibleText)) {
    add("example-framing", "Invented example/sample framing must not appear in the Artifact");
  }

  const hasSourceUi = /\b(?:source\s+trail|prompt\s+inspiration|original\s+x\s+(?:source|post|content)|see\s+the\s+original\s+post)\b/i.test(visibleText) ||
    /https?:\/\/(?:www\.)?x\.com\//i.test(html);
  if (hasSourceUi) {
    add("artifact-source-ui", "X provenance UI belongs on ancher.us, not inside the Artifact");
  }

  if (footer.count !== 1 ||
      footer.text !== "Design in ancher" ||
      footer.anchorCount !== 1 ||
      footer.anchorText !== "Design in ancher" ||
      footer.href.replace(/\/$/, "") !== "https://app.ancher.ai") {
    add("footer-link", 'Footer must contain only one "Design in ancher" link to https://app.ancher.ai');
  }
  if (footer.afterText) {
    add("after-footer", "No visible content may appear after the footer");
  }
  if ((visibleText.match(/Design in ancher/g) ?? []).length !== 1) {
    add("footer-count", 'Visible "Design in ancher" text must appear exactly once');
  }
  if (/\bDesigned in Ancher\b/i.test(visibleText)) {
    add("legacy-footer", 'Legacy "Designed in Ancher" copy must not appear');
  }

  if (/\b(?:private(?:ly)?|manual[- ]review|review memo|pending(?: review)?|awaiting review|not for publication|internal[- ]only|draft only|unpublished)\b/i.test(visibleText)) {
    add("internal-review-language", "Internal review or publication-state language must not appear in the Artifact");
  }

  for (const term of job.disallowedTerms ?? []) {
    if (term && includesNormalized(visibleText, term)) {
      add("invented-entity", `Disallowed invented entity found: ${term}`);
    }
  }

  return errors;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const [htmlPath, jobPath] = process.argv.slice(2);
  if (!htmlPath || !jobPath) {
    process.stderr.write("Usage: node validate-artifact.mjs <artifact.html> <job.json>\n");
    process.exitCode = 2;
  } else {
    const [html, jobText] = await Promise.all([
      fs.readFile(htmlPath, "utf8"),
      fs.readFile(jobPath, "utf8"),
    ]);
    const errors = validateArtifact({ html, job: JSON.parse(jobText) });
    process.stdout.write(`${JSON.stringify(errors, null, 2)}\n`);
    if (errors.length) process.exitCode = 1;
  }
}
