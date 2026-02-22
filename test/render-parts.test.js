import test from "node:test";
import assert from "node:assert/strict";
import { renderHeaderSvg, renderFooterSvg, renderSnippet } from "../src/render-parts.js";

test("header renders valid SVG with theme colors", () => {
  const svg = renderHeaderSvg({ theme: "claude-code", title: "Setup", language: "bash" });

  assert.match(svg, /^<\?xml/);
  assert.match(svg, /<svg/);
  assert.match(svg, /Setup/);
  assert.match(svg, /bash/);
  // Traffic light dots
  assert.match(svg, /#ff5f57/);
  assert.match(svg, /#febc2e/);
  assert.match(svg, /#28c840/);
  // Claude Code header color
  assert.match(svg, /#eee5d2/);
});

test("header uses default theme name as title when no title given", () => {
  const svg = renderHeaderSvg({ theme: "opencode" });
  assert.match(svg, /OpenCode/);
});

test("header falls back to opencode for unknown theme", () => {
  const svg = renderHeaderSvg({ theme: "nonexistent" });
  assert.match(svg, /#0f172a/); // opencode header color
});

test("header respects width param via viewBox and clamps", () => {
  const svg = renderHeaderSvg({ theme: "opencode", width: "900" });
  assert.match(svg, /viewBox="0 0 900 48"/);

  const svgSmall = renderHeaderSvg({ theme: "opencode", width: "100" });
  assert.match(svgSmall, /viewBox="0 0 300 48"/); // clamped to min 300

  const svgLarge = renderHeaderSvg({ theme: "opencode", width: "9999" });
  assert.match(svgLarge, /viewBox="0 0 1280 48"/); // clamped to max 1280
});

test("header escapes XML special characters in title", () => {
  const svg = renderHeaderSvg({ theme: "opencode", title: '<script>alert("xss")</script>' });
  assert.ok(!svg.includes("<script>"));
  assert.match(svg, /&lt;script&gt;/);
});

test("header renders without language badge when lang is empty", () => {
  const svg = renderHeaderSvg({ theme: "opencode" });
  // Should not have a chip rect for language
  const langChipCount = (svg.match(/chipBg/g) || []).length;
  assert.equal(langChipCount, 0);
});

test("footer renders valid SVG", () => {
  const svg = renderFooterSvg({ theme: "claude-code" });
  assert.match(svg, /^<\?xml/);
  assert.match(svg, /<svg/);
  assert.match(svg, /#eee5d2/); // claude-code header color
});

test("footer respects width param via viewBox", () => {
  const svg = renderFooterSvg({ theme: "opencode", width: "700" });
  assert.match(svg, /viewBox="0 0 700 8"/);
});

test("vscode-dark theme works in header", () => {
  const svg = renderHeaderSvg({ theme: "vscode-dark", title: "Editor" });
  assert.match(svg, /Editor/);
  assert.match(svg, /#323233/); // vscode-dark header color
});

test("vscode-light theme works in header", () => {
  const svg = renderHeaderSvg({ theme: "vscode-light", title: "Editor" });
  assert.match(svg, /Editor/);
  assert.match(svg, /#e8e8e8/); // vscode-light header color
});

test("header has viewBox for responsiveness and accent line", () => {
  const svg = renderHeaderSvg({ theme: "opencode" });
  assert.match(svg, /viewBox="0 0 800 48"/);
  assert.ok(!svg.match(/<svg[^>]*width="\d+"/), "should not have fixed width attr");
  // Accent line
  assert.match(svg, /fill="#22d3ee"/); // opencode accent color in bottom line
});

test("snippet uses width 100%", () => {
  const snippet = renderSnippet({ host: "https://example.com", theme: "opencode", language: "bash", code: "echo hi" });
  assert.match(snippet, /width="100%"/);
  assert.ok(!snippet.includes('width="600"'), "should not use fixed pixel width");
});

test("renderSnippet generates valid markdown", () => {
  const snippet = renderSnippet({
    host: "https://example.com",
    theme: "claude-code",
    language: "bash",
    title: "Setup",
    code: "npm install"
  });

  assert.match(snippet, /header\.svg/);
  assert.match(snippet, /footer\.svg/);
  assert.match(snippet, /```bash/);
  assert.match(snippet, /npm install/);
  assert.match(snippet, /theme=claude-code/);
  assert.match(snippet, /title=Setup/);
});
