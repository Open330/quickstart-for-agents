import test from "node:test";
import assert from "node:assert/strict";
import { renderPromptSvg } from "../src/render.js";

test("renders default theme and title", () => {
  const svg = renderPromptSvg({
    prompt: "Generate deployment checklist",
    theme: "opencode"
  });

  assert.match(svg, /Quickstart For Agents/);
  assert.match(svg, /Generate deployment checklist/);
  assert.match(svg, /#67e8f9/);
});

test("falls back to default theme for unknown theme", () => {
  const svg = renderPromptSvg({
    prompt: "x",
    theme: "unknown-theme"
  });

  assert.match(svg, /#67e8f9/);
});

test("renders line numbers", () => {
  const svg = renderPromptSvg({
    prompt: "line1\nline2",
    theme: "claude-code"
  });

  assert.match(svg, />01</);
  assert.match(svg, />02</);
});
