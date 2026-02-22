import test from "node:test";
import assert from "node:assert/strict";
import { renderHeaderSvg, renderFooterSvg, renderSnippet } from "../src/render-parts.js";

// ── Claude Code ─────────────────────────────────────────────────

test("claude-code header: dark bg, circle icon, monospace text", () => {
  const svg = renderHeaderSvg({ theme: "claude-code", title: "Claude Code", language: "bash" });
  assert.match(svg, /^<\?xml/);
  assert.match(svg, /viewBox/);
  assert.match(svg, /Claude Code/);
  assert.match(svg, /bash/);
  // Dark terminal bg
  assert.match(svg, /#1e1e2e/);
  // Circle icon
  assert.match(svg, /<circle/);
  // Monospace font
  assert.match(svg, /JetBrains Mono/);
});

test("claude-code footer: colorful status bar segments", () => {
  const svg = renderFooterSvg({ theme: "claude-code" });
  assert.match(svg, /viewBox/);
  assert.match(svg, /#1e1e2e/); // dark bg
  assert.match(svg, /Opus 4.6/); // model name in status bar
  assert.match(svg, /quickstart/); // path in status bar
});

// ── OpenCode ────────────────────────────────────────────────────

test("opencode header: panel bg, cyan left bar, monospace text", () => {
  const svg = renderHeaderSvg({ theme: "opencode", title: "OpenCode", language: "bash" });
  assert.match(svg, /OpenCode/);
  assert.match(svg, /bash/);
  // Panel bg (darker gray)
  assert.match(svg, /#2a2a30/);
  // Cyan left bar
  assert.match(svg, /#22d3ee/);
  assert.match(svg, /width="3"/); // 3px bar
  // Monospace
  assert.match(svg, /JetBrains Mono/);
});

test("opencode footer: panel + cyan bar + model info", () => {
  const svg = renderFooterSvg({ theme: "opencode" });
  assert.match(svg, /#2a2a30/); // panel bg
  assert.match(svg, /#22d3ee/); // cyan bar
  assert.match(svg, /Sisyphus/); // agent name
  assert.match(svg, /Claude Opus 4.6/); // model
});

// ── Generic themes ──────────────────────────────────────────────

test("github-dark uses generic header with theme colors", () => {
  const svg = renderHeaderSvg({ theme: "github-dark", title: "Terminal" });
  assert.match(svg, /Terminal/);
  assert.match(svg, /#161b22/); // github-dark header bg
});

test("vscode-dark uses generic header", () => {
  const svg = renderHeaderSvg({ theme: "vscode-dark", title: "Editor" });
  assert.match(svg, /Editor/);
  assert.match(svg, /#323233/); // vscode-dark header
});

test("vscode-light uses generic header", () => {
  const svg = renderHeaderSvg({ theme: "vscode-light", title: "Editor" });
  assert.match(svg, /Editor/);
  assert.match(svg, /#e8e8e8/); // vscode-light header
});

// ── Common behavior ─────────────────────────────────────────────

test("header uses theme name as default title", () => {
  const svg = renderHeaderSvg({ theme: "opencode" });
  assert.match(svg, /OpenCode/);
});

test("header falls back for unknown theme", () => {
  const svg = renderHeaderSvg({ theme: "nonexistent" });
  assert.match(svg, /viewBox/);
  assert.match(svg, /<svg/);
});

test("header respects width via viewBox and clamps", () => {
  const svg = renderHeaderSvg({ theme: "opencode", width: "900" });
  assert.match(svg, /viewBox="0 0 900 36"/);

  const svgSmall = renderHeaderSvg({ theme: "opencode", width: "100" });
  assert.match(svgSmall, /viewBox="0 0 300 36"/);

  const svgLarge = renderHeaderSvg({ theme: "opencode", width: "9999" });
  assert.match(svgLarge, /viewBox="0 0 1280 36"/);
});

test("header escapes XML special characters", () => {
  const svg = renderHeaderSvg({ theme: "opencode", title: '<script>alert("xss")</script>' });
  assert.ok(!svg.includes("<script>"));
  assert.match(svg, /&lt;script&gt;/);
});

test("no traffic light dots in any header", () => {
  for (const theme of ["claude-code", "opencode", "github-dark"]) {
    const svg = renderHeaderSvg({ theme });
    assert.ok(!svg.includes("#ff5f57"), `${theme} should not have red dot`);
    assert.ok(!svg.includes("#febc2e"), `${theme} should not have yellow dot`);
    assert.ok(!svg.includes("#28c840"), `${theme} should not have green dot`);
  }
});

// ── Snippet ─────────────────────────────────────────────────────

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
});
