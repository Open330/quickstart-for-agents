import test from "node:test";
import assert from "node:assert/strict";
import { renderPromptHtml } from "../src/render-html.js";

test("renders interactive html copy button", () => {
  const html = renderPromptHtml({
    prompt: "Plan migration for monorepo",
    theme: "opencode",
    language: "prompt"
  });

  assert.match(html, /id="copy-btn"/);
  assert.match(html, /navigator\.clipboard\.writeText/);
  assert.match(html, /document\.execCommand\("copy"\)/);
  assert.match(html, /Copy failed automatically\. Use manual copy below\./);
  assert.match(html, /Plan migration for monorepo/);
});
