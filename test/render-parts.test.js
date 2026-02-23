import test from "node:test";
import assert from "node:assert/strict";
import { renderHeaderSvg, renderFooterSvg, renderSnippet, MASCOT_VARIANTS } from "../src/render-parts.js";

test("claude-code header: tall with pixel art mascot, title bar, prompt area", () => {
  const svg = renderHeaderSvg({ theme: "claude-code", title: "My Agent", language: "Agents" });
  assert.match(svg, /viewBox="0 0 800 150"/);
  assert.match(svg, /Claude Code/);           // title bar text
  assert.match(svg, /My Agent/);              // prompt title
  assert.match(svg, /Agents/);                // language label
  assert.match(svg, /#161b22/);               // github code block bg
  assert.match(svg, /<circle/);               // prompt icon
  assert.match(svg, /stroke-dasharray/);      // dashed title border
  assert.match(svg, /#D77757/);               // actual Clawd body color
  // pixel art = many small rects
  assert.ok((svg.match(/<rect /g) || []).length > 20, "pixel art has many rects");
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

test("opencode header: custom logo replaces default", () => {
  const svg = renderHeaderSvg({ theme: "opencode", title: "Test", logo: "myapp" });
  assert.match(svg, /myapp/);
  assert.ok(!svg.includes(">open</tspan>"), "default 'open' tspan should not appear");
});

test("opencode header: default logo when no logo param", () => {
  const svg = renderHeaderSvg({ theme: "opencode", title: "Test" });
  assert.match(svg, />open</);
  assert.match(svg, />code</);
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

test("codex header: terminal prompt style", () => {
  const svg = renderHeaderSvg({ theme: "codex", title: "My Agent", language: "Agents" });
  assert.match(svg, /viewBox="0 0 800 68"/);
  assert.match(svg, /codex/);                  // logo text
  assert.match(svg, /#10a37f/);               // green accent
  assert.match(svg, /&gt;/);                   // prompt cursor >
  assert.match(svg, /full-auto/);              // mode indicator
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

test("mascot variants: all render valid SVG with Clawd color", () => {
  for (const variant of MASCOT_VARIANTS) {
    const svg = renderHeaderSvg({ theme: "claude-code", mascot: variant });
    assert.match(svg, /<svg/, `${variant} should produce SVG`);
    assert.match(svg, /#D77757/, `${variant} should have Clawd body color`);
  }
});

test("mascot default: no hat color pixels", () => {
  const svg = renderHeaderSvg({ theme: "claude-code", mascot: "default" });
  assert.ok(!svg.includes("#8878B8"), "default mascot has no hat pixels");
});

test("mascot hat: includes hat color pixels", () => {
  const svg = renderHeaderSvg({ theme: "claude-code", mascot: "hat" });
  assert.match(svg, /#8878B8/);   // hat color
  assert.match(svg, /#A098D0/);   // hat highlight
});

test("mascot thinking: more rects than default (thought dots)", () => {
  const svg = renderHeaderSvg({ theme: "claude-code", mascot: "thinking" });
  const defaultSvg = renderHeaderSvg({ theme: "claude-code", mascot: "default" });
  const rectCount = (svg.match(/<rect /g) || []).length;
  const defaultRectCount = (defaultSvg.match(/<rect /g) || []).length;
  assert.ok(rectCount > defaultRectCount, "thinking has thought dots");
});

test("mascot wave: more rects than default (arm pixels)", () => {
  const svg = renderHeaderSvg({ theme: "claude-code", mascot: "wave" });
  const defaultSvg = renderHeaderSvg({ theme: "claude-code", mascot: "default" });
  const rectCount = (svg.match(/<rect /g) || []).length;
  const defaultRectCount = (defaultSvg.match(/<rect /g) || []).length;
  assert.ok(rectCount > defaultRectCount, "wave has arm pixels");
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
