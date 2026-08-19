import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";

async function page(path) {
  const response = await fetch(`${baseUrl}${path}`);
  assert.equal(response.status, 200, `${path} should render`);
  return response.text();
}

test("shows the sourced prompt and one source on former pending templates", async () => {
  const [promptBacked, formerPending] = await Promise.all([
    page("/templates/market-research-report"),
    page("/templates/study-guide"),
  ]);

  assert.match(promptBacked, /id="template-prompt"/);
  assert.match(promptBacked, /THE PROMPT/i);
  assert.match(promptBacked, /Copy prompt/);
  const promptSection = promptBacked.slice(
    promptBacked.indexOf('id="template-prompt"'),
    promptBacked.indexOf('class="detail-info"'),
  );
  const sourceTrail = promptBacked.slice(
    promptBacked.indexOf('class="example-source-trail"'),
    promptBacked.indexOf('class="source-panel"'),
  );
  assert.doesNotMatch(promptSection, /prompt-source-card/);
  assert.match(sourceTrail, /Original X post for this prompt/);
  assert.match(sourceTrail, /https:\/\/x\.com\/IMJustinBrooke\/status\/1929321780319039955/);
  assert.equal(sourceTrail.match(/href="https:\/\/x\.com\//g)?.length, 1);
  assert.doesNotMatch(sourceTrail, /GrowAIHub/);
  assert.match(formerPending, /id="template-prompt"/);
  assert.match(formerPending, /class="example-source-trail"/);
  assert.equal(formerPending.match(/href="https:\/\/x\.com\//g)?.length, 1);
  assert.doesNotMatch(formerPending, /Preview pending/);
});

test("labels all 34 homepage cards as prompt included", async () => {
  const homepage = await page("/");
  assert.equal(homepage.match(/<span class="prompt-badge">Prompt included<\/span>/g)?.length, 34);
});
