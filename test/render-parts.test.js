import test from "node:test";
import assert from "node:assert/strict";
import { renderHeaderSvg, renderFooterSvg, renderSnippet } from "../src/render-parts.js";

test("claude-code header: github-matching bg, icon, monospace", () => {
  const svg = renderHeaderSvg({ theme: "claude-code", title: "Claude Code", language: "bash" });
  assert.match(svg, /viewBox/);
  assert.match(svg, /Claude Code/);
  assert.match(svg, /bash/);
  assert.match(svg, /#161b22/); // matches github code block bg
  assert.match(svg, /<circle/); // icon
  assert.match(svg, /JetBrains Mono/);
});

test("claude-code footer: status bar with model info", () => {
  const svg = renderFooterSvg({ theme: "claude-code" });
  assert.match(svg, /#161b22/);
  assert.match(svg, /Opus 4.6/);
});

test("opencode header: cyan left bar, matching bg", () => {
  const svg = renderHeaderSvg({ theme: "opencode", title: "OpenCode", language: "bash" });
  assert.match(svg, /OpenCode/);
  assert.match(svg, /#161b22/); // matching bg
  assert.match(svg, /#22d3ee/); // cyan bar
  assert.match(svg, /width="3"/);
});

test("opencode footer: cyan bar + model info", () => {
  const svg = renderFooterSvg({ theme: "opencode" });
  assert.match(svg, /#22d3ee/);
  assert.match(svg, /Sisyphus/);
});

test("headers have rounded top corners", () => {
  const svg = renderHeaderSvg({ theme: "claude-code" });
  assert.ok(svg.includes("Q0,0"), "should have rounded top-left corner");
  assert.ok(svg.includes("Q800,0"), "should have rounded top-right corner");
});

test("footers have rounded bottom corners", () => {
  const svg = renderFooterSvg({ theme: "opencode" });
  assert.ok(svg.includes("clipPath") || svg.includes("path"), "should use path for rounded shape");
});

test("generic themes use github code block bg", () => {
  for (const theme of ["github-dark", "vscode-dark", "vscode-light"]) {
    const svg = renderHeaderSvg({ theme, title: "Test" });
    assert.match(svg, /#161b22/, `${theme} should use github bg`);
  }
});

test("header width via viewBox and clamps", () => {
  assert.match(renderHeaderSvg({ theme: "opencode", width: "900" }), /viewBox="0 0 900 36"/);
  assert.match(renderHeaderSvg({ theme: "opencode", width: "100" }), /viewBox="0 0 300 36"/);
  assert.match(renderHeaderSvg({ theme: "opencode", width: "9999" }), /viewBox="0 0 1280 36"/);
});

test("header escapes XML", () => {
  const svg = renderHeaderSvg({ theme: "opencode", title: '<script>' });
  assert.ok(!svg.includes("<script>"));
  assert.match(svg, /&lt;script&gt;/);
});

test("no traffic light dots", () => {
  const svg = renderHeaderSvg({ theme: "claude-code" });
  assert.ok(!svg.includes("#ff5f57"));
});

test("snippet uses width 100%", () => {
  const snippet = renderSnippet({ host: "https://ex.com", theme: "opencode", language: "bash", code: "echo" });
  assert.match(snippet, /width="100%"/);
});

test("renderSnippet generates valid markdown", () => {
  const snippet = renderSnippet({ host: "https://ex.com", theme: "claude-code", language: "bash", title: "S", code: "npm i" });
  assert.match(snippet, /header\.svg/);
  assert.match(snippet, /footer\.svg/);
  assert.match(snippet, /```bash/);
  assert.match(snippet, /npm i/);
});
