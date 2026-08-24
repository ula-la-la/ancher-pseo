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

function includesNormalized(haystack, needle) {
  return haystack.toLowerCase().replace(/\s+/g, " ").includes(
    needle.toLowerCase().replace(/\s+/g, " "),
  );
}

export function validateArtifact({ html, job }) {
  const errors = [];
  const add = (code, message) => errors.push({ code, message });
  const visibleText = textFromHtml(html);
  const title = tagText(html, "title");
  const h1 = tagText(html, "h1");
  const footerMatch = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/i);
  const footerHtml = footerMatch?.[1] ?? "";
  const footerText = textFromHtml(footerHtml);

  if (!/<meta\s+[^>]*name=["']viewport["'][^>]*>/i.test(html)) {
    add("viewport", "Responsive viewport metadata is required");
  }
  if (!/<meta\s+[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(html) &&
      !/<meta\s+[^>]*content=["'][^"']+["'][^>]*name=["']description["']/i.test(html)) {
    add("meta-description", "A meta description is required");
  }

  if (!includesNormalized(title, job.primaryKeyword)) {
    add("keyword-title", "The title must include the primary keyword");
  }
  if (!includesNormalized(h1, job.primaryKeyword)) {
    add("keyword-h1", "The H1 must include the primary keyword");
  }

  for (const source of job.sources ?? []) {
    if (!html.includes(source.url)) {
      add("source-missing", `Missing source URL: ${source.url}`);
    }
  }

  if (footerText !== "Design in ancher") {
    add("footer-exact", 'Footer must be exactly "Design in ancher"');
  }
  if (/<a\b/i.test(footerHtml)) {
    add("footer-linked", "Footer branding must not be linked");
  }
  if (/\b(?:app\.)?ancher\.(?:ai|us)\b/i.test(html)) {
    add("ancher-domain", "Artifact content must not contain Ancher domains");
  }
  if (/\b(?:private review|manual review|pending review|awaiting review|not for publication)\b/i.test(visibleText)) {
    add("internal-review-language", "Internal review language must not appear in the artifact");
  }

  const wordCount = visibleText.split(/\s+/).filter(Boolean).length;
  if (job.outputMode === "text-first" && wordCount < 700) {
    add("visible-word-count", `Text-first artifact has ${wordCount} visible words; minimum is 700`);
  }
  const controlCount = (html.match(/<(?:input|textarea|select|button)\b/gi) ?? []).length;
  if (job.outputMode === "text-first" && controlCount > 4) {
    add("tool-heavy", `Text-first artifact has ${controlCount} interactive controls; maximum is 4`);
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
