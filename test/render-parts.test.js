import test from "node:test";
import assert from "node:assert/strict";
import { renderHeaderSvg, renderFooterSvg, renderSnippet, MASCOT_VARIANTS } from "../src/render-parts.js";

test("claude-code header: tall with mascot, title bar, prompt area", () => {
  const svg = renderHeaderSvg({ theme: "claude-code", title: "My Agent", language: "Agents" });
  assert.match(svg, /viewBox="0 0 800 150"/);
  assert.match(svg, /Claude Code/);           // title bar text
  assert.match(svg, /My Agent/);              // prompt title
  assert.match(svg, /Agents/);                // language label
  assert.match(svg, /#161b22/);               // github code block bg
  assert.match(svg, /<circle/);               // prompt icon
  assert.match(svg, /stroke-dasharray/);      // dashed title border
  assert.match(svg, /#e89898/);               // mascot pink body
  assert.match(svg, /<ellipse/);              // detailed mascot shapes
  assert.match(svg, /stroke-linecap/);        // smile curve
});

test("claude-code footer: powerline with tokens", () => {
  const svg = renderFooterSvg({ theme: "claude-code", tokens: "128", model: "Sonnet 4.5" });
  assert.match(svg, /128 tokens/);
  assert.match(svg, /Sonnet 4.5/);
  assert.match(svg, /polygon/);               // powerline arrows
});

test("claude-code footer: custom text overrides default", () => {
  const svg = renderFooterSvg({ theme: "claude-code", text: "Custom footer" });
  assert.match(svg, /Custom footer/);
  assert.ok(!svg.includes("polygon"), "no powerline segments when custom text");
});

test("opencode header: tall with logo, cyan bar, prompt area", () => {
  const svg = renderHeaderSvg({ theme: "opencode", title: "My Agent", language: "Agents" });
  assert.match(svg, /viewBox="0 0 800 100"/);
  assert.match(svg, /open/);                  // logo part 1
  assert.match(svg, /code/);                  // logo part 2
  assert.match(svg, /#22d3ee/);               // cyan accent
  assert.match(svg, /My Agent/);
  assert.match(svg, /Agents/);
});

test("opencode footer: cyan bar + token info", () => {
  const svg = renderFooterSvg({ theme: "opencode", tokens: "256", model: "Opus 4.6" });
  assert.match(svg, /#22d3ee/);
  assert.match(svg, /256 tokens/);
  assert.match(svg, /Opus 4.6/);
});

test("opencode footer: custom text overrides", () => {
  const svg = renderFooterSvg({ theme: "opencode", text: "hello world" });
  assert.match(svg, /hello world/);
});

test("codex header: green logo, prompt area", () => {
  const svg = renderHeaderSvg({ theme: "codex", title: "My Agent", language: "Agents" });
  assert.match(svg, /viewBox="0 0 800 96"/);
  assert.match(svg, /codex/);                  // logo
  assert.match(svg, /#10a37f/);               // green accent
  assert.match(svg, /My Agent/);
  assert.match(svg, /Agents/);
});

test("codex footer: green bar + token info", () => {
  const svg = renderFooterSvg({ theme: "codex", tokens: "512", model: "GPT-4.1" });
  assert.match(svg, /#10a37f/);
  assert.match(svg, /512 tokens/);
  assert.match(svg, /GPT-4.1/);
});

test("codex footer: custom text overrides", () => {
  const svg = renderFooterSvg({ theme: "codex", text: "custom codex" });
  assert.match(svg, /custom codex/);
});

test("headers have rounded top corners", () => {
  const svg = renderHeaderSvg({ theme: "claude-code" });
  assert.ok(svg.includes("Q0,0"), "rounded top-left");
  assert.ok(svg.includes("Q800,0"), "rounded top-right");
});

test("footers have rounded bottom corners", () => {
  const svg = renderFooterSvg({ theme: "opencode" });
  assert.ok(svg.includes("path"), "uses path for rounded shape");
});

test("generic themes use github code block bg", () => {
  for (const theme of ["github-dark", "vscode-dark", "vscode-light"]) {
    const svg = renderHeaderSvg({ theme, title: "Test" });
    assert.match(svg, /#161b22/, `${theme} should use github bg`);
  }
});

test("header width clamps correctly", () => {
  assert.match(renderHeaderSvg({ theme: "opencode", width: "900" }), /viewBox="0 0 900 100"/);
  assert.match(renderHeaderSvg({ theme: "opencode", width: "100" }), /viewBox="0 0 300 100"/);
  assert.match(renderHeaderSvg({ theme: "opencode", width: "9999" }), /viewBox="0 0 1280 100"/);
});

test("header escapes XML", () => {
  const svg = renderHeaderSvg({ theme: "opencode", title: "<script>" });
  assert.ok(!svg.includes("<script>"));
  assert.match(svg, /&lt;script&gt;/);
});

test("mascot variants: all render valid SVG", () => {
  for (const variant of MASCOT_VARIANTS) {
    const svg = renderHeaderSvg({ theme: "claude-code", mascot: variant });
    assert.match(svg, /<svg/, `${variant} should produce SVG`);
    assert.match(svg, /#e89898/, `${variant} should have body color`);
  }
});

test("mascot default: no hat elements", () => {
  const svg = renderHeaderSvg({ theme: "claude-code", mascot: "default" });
  assert.ok(!svg.includes("#8888c0"), "default mascot has no hat");
});

test("mascot hat: includes hat color", () => {
  const svg = renderHeaderSvg({ theme: "claude-code", mascot: "hat" });
  assert.match(svg, /#8888c0/);   // hat color
  assert.match(svg, /#a0a0d8/);   // hat highlight
});

test("mascot thinking: thought bubble", () => {
  const svg = renderHeaderSvg({ theme: "claude-code", mascot: "thinking" });
  assert.match(svg, /···/);       // thought bubble dots
});

test("mascot wave: waving hand", () => {
  const svg = renderHeaderSvg({ theme: "claude-code", mascot: "wave" });
  // wave variant has the extra hand path elements (more paths than default)
  const pathCount = (svg.match(/<path/g) || []).length;
  const defaultSvg = renderHeaderSvg({ theme: "claude-code", mascot: "default" });
  const defaultPathCount = (defaultSvg.match(/<path/g) || []).length;
  assert.ok(pathCount > defaultPathCount, "wave has more path elements than default");
});

test("no traffic light dots", () => {
  const svg = renderHeaderSvg({ theme: "claude-code" });
  assert.ok(!svg.includes("#ff5f57"));
});

test("snippet generates valid markdown", () => {
  const snippet = renderSnippet({ host: "https://ex.com", theme: "claude-code", title: "S", code: "do stuff" });
  assert.match(snippet, /header\.svg/);
  assert.match(snippet, /footer\.svg/);
  assert.match(snippet, /do stuff/);
  assert.match(snippet, /width="100%"/);
});
