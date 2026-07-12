import test from "node:test";
import assert from "node:assert/strict";
import { renderGeneratorHtml } from "../src/generator-html.js";
import {
  DEFAULT_AGENT_LANGUAGE,
  DEFAULT_AGENT_PROMPT,
  DEFAULT_AGENT_TITLE,
  DEFAULT_FOOTER_TEXT,
} from "../src/prompt-defaults.js";

test("generator starts with the shared concise agent prompt", () => {
  const html = renderGeneratorHtml();

  assert.match(html, /Agent Prompt/);
  assert.match(html, /Code Block Language/);
  assert.ok(html.includes(DEFAULT_AGENT_TITLE));
  assert.ok(html.includes(DEFAULT_AGENT_LANGUAGE));
  assert.ok(html.includes(DEFAULT_AGENT_PROMPT));
  assert.ok(html.includes(DEFAULT_FOOTER_TEXT));
  assert.doesNotMatch(html, /npm install -g @anthropic-ai\/claude-code/);
});

test("default agent prompt stays concise and delegates repository discovery", () => {
  assert.ok(DEFAULT_AGENT_PROMPT.length <= 300);
  assert.match(DEFAULT_AGENT_PROMPT, /repository instructions and documentation/);
  assert.match(DEFAULT_AGENT_PROMPT, /verify the setup works/);
});
