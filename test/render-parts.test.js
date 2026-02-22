import test from "node:test";
import assert from "node:assert/strict";
import { renderHeaderSvg, renderFooterSvg, renderSnippet } from "../src/render-parts.js";

test("claude-code header has prompt marker and accent color", () => {
  const svg = renderHeaderSvg({ theme: "claude-code", title: "Claude Code", language: "bash" });
  assert.match(svg, /^<\?xml/);
  assert.match(svg, /<svg/);
  assert.match(svg, /viewBox/);
  assert.match(svg, /Claude Code/);
  assert.match(svg, /bash/);
  // ❯ prompt marker (unicode ❯ = &#x276F;)
  assert.match(svg, /&#x276F;/);
  // Uses shell bg, not generic header
  assert.match(svg, /#fffaf2/); // claude-code shell color
  // Accent color lines
  assert.match(svg, /#c26f29/); // claude-code accent
});

test("opencode header has left accent bar", () => {
  const svg = renderHeaderSvg({ theme: "opencode", title: "OpenCode", language: "bash" });
  assert.match(svg, /OpenCode/);
  assert.match(svg, /bash/);
  // Thick left accent bar (4px wide)
  assert.match(svg, /width="4"/);
  assert.match(svg, /#22d3ee/); // opencode accent (cyan)
  assert.match(svg, /#0d1526/); // opencode shell bg
});

test("github-dark header has dot indicator", () => {
  const svg = renderHeaderSvg({ theme: "github-dark", title: "Terminal" });
  assert.match(svg, /Terminal/);
  assert.match(svg, /#58a6ff/); // github-dark accent
});

test("vscode-dark header has top accent line", () => {
  const svg = renderHeaderSvg({ theme: "vscode-dark", title: "Editor" });
  assert.match(svg, /Editor/);
  assert.match(svg, /#007acc/); // vscode accent
  assert.match(svg, /#323233/); // vscode-dark header bg
});

test("vscode-light header has top accent line", () => {
  const svg = renderHeaderSvg({ theme: "vscode-light", title: "Editor" });
  assert.match(svg, /Editor/);
  assert.match(svg, /#007acc/); // vscode accent
  assert.match(svg, /#e8e8e8/); // vscode-light header bg
});

test("header uses default theme name as title when no title given", () => {
  const svg = renderHeaderSvg({ theme: "opencode" });
  assert.match(svg, /OpenCode/);
});

test("header falls back to opencode for unknown theme", () => {
  const svg = renderHeaderSvg({ theme: "nonexistent" });
  assert.match(svg, /viewBox/);
});

test("header respects width via viewBox and clamps", () => {
  const svg = renderHeaderSvg({ theme: "opencode", width: "900" });
  assert.match(svg, /viewBox="0 0 900 40"/);

  const svgSmall = renderHeaderSvg({ theme: "opencode", width: "100" });
  assert.match(svgSmall, /viewBox="0 0 300 40"/);

  const svgLarge = renderHeaderSvg({ theme: "opencode", width: "9999" });
  assert.match(svgLarge, /viewBox="0 0 1280 40"/);
});

test("header escapes XML special characters in title", () => {
  const svg = renderHeaderSvg({ theme: "opencode", title: '<script>alert("xss")</script>' });
  assert.ok(!svg.includes("<script>"));
  assert.match(svg, /&lt;script&gt;/);
});

test("header renders without language badge when lang is empty", () => {
  const svg = renderHeaderSvg({ theme: "opencode" });
  assert.ok(!svg.includes("chipBg"));
});

test("claude-code footer has accent lines", () => {
  const svg = renderFooterSvg({ theme: "claude-code" });
  assert.match(svg, /^<\?xml/);
  assert.match(svg, /viewBox/);
  assert.match(svg, /#fffaf2/); // claude-code shell
  assert.match(svg, /#c26f29/); // accent
});

test("opencode footer has left accent bar", () => {
  const svg = renderFooterSvg({ theme: "opencode" });
  assert.match(svg, /width="4"/);
  assert.match(svg, /#22d3ee/); // cyan accent
});

test("footer respects width via viewBox", () => {
  const svg = renderFooterSvg({ theme: "opencode", width: "700" });
  assert.match(svg, /viewBox="0 0 700 8"/);
});

test("header has no traffic light dots", () => {
  const svg = renderHeaderSvg({ theme: "claude-code" });
  assert.ok(!svg.includes("#ff5f57")); // no red dot
  assert.ok(!svg.includes("#febc2e")); // no yellow dot
  assert.ok(!svg.includes("#28c840")); // no green dot
});

test("snippet uses width 100%", () => {
  const snippet = renderSnippet({ host: "https://example.com", theme: "opencode", language: "bash", code: "echo hi" });
  assert.match(snippet, /width="100%"/);
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
