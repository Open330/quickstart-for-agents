import { resolveTheme } from "./themes.js";
import { clamp, escapeXml } from "./render.js";

// GitHub dark mode code block: bg #161b22, border #30363d, border-radius 6px
const R = 6;

function roundedTopPath(w, h) {
  return `M0,${R} Q0,0 ${R},0 L${w - R},0 Q${w},0 ${w},${R} L${w},${h} L0,${h} Z`;
}
function roundedBottomPath(w, h) {
  return `M0,0 L${w},0 L${w},${h - R} Q${w},${h} ${w - R},${h} L${R},${h} Q0,${h} 0,${h - R} Z`;
}

// ── Claude mascot variants ───────────────────────────────────────
const C = {
  body: "#e89898", bodyDark: "#d08080", hat: "#8888c0", hatLight: "#a0a0d8",
  sparkle: "#c8c0f0", eye: "#504050", blush: "#d07878", stem: "#a0a0c0",
};

function mascotParts(cx, y0) {
  const sparkle = (() => {
    const sx = cx, sy = y0;
    return `<path d="M${sx},${sy-6} L${sx+2},${sy-2} L${sx+6},${sy} L${sx+2},${sy+2} L${sx},${sy+6} L${sx-2},${sy+2} L${sx-6},${sy} L${sx-2},${sy-2} Z" fill="${C.sparkle}" opacity="0.9" />`;
  })();
  const stem = `<rect x="${cx-1}" y="${y0+8}" width="2" height="8" rx="1" fill="${C.stem}" />`;
  const hatY = y0 + 16;
  const hat = [
    `<rect x="${cx-14}" y="${hatY}" width="28" height="7" rx="3.5" fill="${C.hat}" />`,
    `<rect x="${cx-10}" y="${hatY+1}" width="20" height="3" rx="1.5" fill="${C.hatLight}" opacity="0.5" />`,
  ].join("\n    ");
  const bodyY = hatY + 7;
  const bodyW = 38, bodyH = 26;
  const bodyEl = [
    `<rect x="${cx-bodyW/2}" y="${bodyY}" width="${bodyW}" height="${bodyH}" rx="8" fill="${C.body}" />`,
    `<rect x="${cx-bodyW/2+3}" y="${bodyY+2}" width="${bodyW-6}" height="8" rx="4" fill="${C.bodyDark}" opacity="0.15" />`,
  ].join("\n    ");
  const eyeY = bodyY + 10;
  const eyes = [
    `<ellipse cx="${cx-7}" cy="${eyeY}" rx="2.5" ry="3" fill="${C.eye}" />`,
    `<ellipse cx="${cx+7}" cy="${eyeY}" rx="2.5" ry="3" fill="${C.eye}" />`,
    `<circle cx="${cx-6}" cy="${eyeY-1}" r="1" fill="#ffffff" opacity="0.7" />`,
    `<circle cx="${cx+8}" cy="${eyeY-1}" r="1" fill="#ffffff" opacity="0.7" />`,
  ].join("\n    ");
  const blushY = eyeY + 5;
  const blushMarks = [
    `<ellipse cx="${cx-12}" cy="${blushY}" rx="4" ry="2.5" fill="${C.blush}" opacity="0.45" />`,
    `<ellipse cx="${cx+12}" cy="${blushY}" rx="4" ry="2.5" fill="${C.blush}" opacity="0.45" />`,
  ].join("\n    ");
  const smileY = eyeY + 7;
  const smile = `<path d="M${cx-4},${smileY} Q${cx},${smileY+3} ${cx+4},${smileY}" fill="none" stroke="${C.eye}" stroke-width="1.2" stroke-linecap="round" />`;
  const feetY = bodyY + bodyH;
  const feet = [
    `<ellipse cx="${cx-8}" cy="${feetY+3}" rx="5" ry="3.5" fill="${C.body}" />`,
    `<ellipse cx="${cx+8}" cy="${feetY+3}" rx="5" ry="3.5" fill="${C.body}" />`,
  ].join("\n    ");

  // Closed eyes (for thinking variant)
  const closedEyes = [
    `<path d="M${cx-9},${eyeY} Q${cx-7},${eyeY+2} ${cx-5},${eyeY}" fill="none" stroke="${C.eye}" stroke-width="1.5" stroke-linecap="round" />`,
    `<path d="M${cx+5},${eyeY} Q${cx+7},${eyeY+2} ${cx+9},${eyeY}" fill="none" stroke="${C.eye}" stroke-width="1.5" stroke-linecap="round" />`,
  ].join("\n    ");

  // Thought bubble (for thinking variant)
  const tbx = cx + 24, tby = bodyY - 2;
  const thought = [
    `<circle cx="${cx+16}" cy="${bodyY+8}" r="2" fill="#808090" opacity="0.5" />`,
    `<circle cx="${cx+20}" cy="${bodyY+2}" r="2.5" fill="#808090" opacity="0.5" />`,
    `<rect x="${tbx}" y="${tby}" width="28" height="14" rx="7" fill="#808090" opacity="0.25" />`,
    `<text x="${tbx+14}" y="${tby+7}" fill="#c0c0d0" font-family="'JetBrains Mono',monospace" font-size="7" font-weight="400" dominant-baseline="central" text-anchor="middle">···</text>`,
  ].join("\n    ");

  // Waving hand (for wave variant)
  const handX = cx + 22, handY = bodyY + 6;
  const wave = [
    `<path d="M${cx+19},${bodyY+14} Q${handX},${handY} ${handX+4},${handY-6}" fill="none" stroke="${C.body}" stroke-width="3" stroke-linecap="round" />`,
    `<circle cx="${handX+4}" cy="${handY-8}" r="3.5" fill="${C.body}" />`,
  ].join("\n    ");

  // No-hat body starts higher
  const noHatBodyY = y0 + 16;
  const noHatBodyEl = [
    `<rect x="${cx-bodyW/2}" y="${noHatBodyY}" width="${bodyW}" height="${bodyH}" rx="8" fill="${C.body}" />`,
    `<rect x="${cx-bodyW/2+3}" y="${noHatBodyY+2}" width="${bodyW-6}" height="8" rx="4" fill="${C.bodyDark}" opacity="0.15" />`,
  ].join("\n    ");
  const noHatEyeY = noHatBodyY + 10;
  const noHatEyes = [
    `<ellipse cx="${cx-7}" cy="${noHatEyeY}" rx="2.5" ry="3" fill="${C.eye}" />`,
    `<ellipse cx="${cx+7}" cy="${noHatEyeY}" rx="2.5" ry="3" fill="${C.eye}" />`,
    `<circle cx="${cx-6}" cy="${noHatEyeY-1}" r="1" fill="#ffffff" opacity="0.7" />`,
    `<circle cx="${cx+8}" cy="${noHatEyeY-1}" r="1" fill="#ffffff" opacity="0.7" />`,
  ].join("\n    ");
  const noHatBlushY = noHatEyeY + 5;
  const noHatBlush = [
    `<ellipse cx="${cx-12}" cy="${noHatBlushY}" rx="4" ry="2.5" fill="${C.blush}" opacity="0.45" />`,
    `<ellipse cx="${cx+12}" cy="${noHatBlushY}" rx="4" ry="2.5" fill="${C.blush}" opacity="0.45" />`,
  ].join("\n    ");
  const noHatSmileY = noHatEyeY + 7;
  const noHatSmile = `<path d="M${cx-4},${noHatSmileY} Q${cx},${noHatSmileY+3} ${cx+4},${noHatSmileY}" fill="none" stroke="${C.eye}" stroke-width="1.2" stroke-linecap="round" />`;
  const noHatFeetY = noHatBodyY + bodyH;
  const noHatFeet = [
    `<ellipse cx="${cx-8}" cy="${noHatFeetY+3}" rx="5" ry="3.5" fill="${C.body}" />`,
    `<ellipse cx="${cx+8}" cy="${noHatFeetY+3}" rx="5" ry="3.5" fill="${C.body}" />`,
  ].join("\n    ");

  // Closed eyes for no-hat thinking
  const noHatClosedEyes = [
    `<path d="M${cx-9},${noHatEyeY} Q${cx-7},${noHatEyeY+2} ${cx-5},${noHatEyeY}" fill="none" stroke="${C.eye}" stroke-width="1.5" stroke-linecap="round" />`,
    `<path d="M${cx+5},${noHatEyeY} Q${cx+7},${noHatEyeY+2} ${cx+9},${noHatEyeY}" fill="none" stroke="${C.eye}" stroke-width="1.5" stroke-linecap="round" />`,
  ].join("\n    ");
  const noHatThought = [
    `<circle cx="${cx+16}" cy="${noHatBodyY+8}" r="2" fill="#808090" opacity="0.5" />`,
    `<circle cx="${cx+20}" cy="${noHatBodyY+2}" r="2.5" fill="#808090" opacity="0.5" />`,
    `<rect x="${cx+24}" y="${noHatBodyY-2}" width="28" height="14" rx="7" fill="#808090" opacity="0.25" />`,
    `<text x="${cx+38}" y="${noHatBodyY+5}" fill="#c0c0d0" font-family="'JetBrains Mono',monospace" font-size="7" font-weight="400" dominant-baseline="central" text-anchor="middle">···</text>`,
  ].join("\n    ");

  return {
    sparkle, stem, hat, bodyEl, eyes, blushMarks, smile, feet, closedEyes, thought, wave,
    noHatBodyEl, noHatEyes, noHatBlush, noHatSmile, noHatFeet, noHatClosedEyes, noHatThought,
  };
}

// variant: "default" (no hat), "hat", "thinking", "wave"
function claudeMascot(cx, y0, variant = "default") {
  const p = mascotParts(cx, y0);
  switch (variant) {
    case "hat":
      return [p.sparkle, p.stem, p.hat, p.bodyEl, p.eyes, p.blushMarks, p.smile, p.feet].join("\n    ");
    case "thinking":
      return [p.sparkle, p.noHatBodyEl, p.noHatClosedEyes, p.noHatBlush, p.noHatFeet, p.noHatThought].join("\n    ");
    case "wave":
      return [p.sparkle, p.noHatBodyEl, p.noHatEyes, p.noHatBlush, p.noHatSmile, p.noHatFeet, p.wave].join("\n    ");
    default: // "default" — no hat, standard smile
      return [p.sparkle, p.noHatBodyEl, p.noHatEyes, p.noHatBlush, p.noHatSmile, p.noHatFeet].join("\n    ");
  }
}

export const MASCOT_VARIANTS = ["default", "hat", "thinking", "wave"];

// ── Header: Claude Code (tall, with mascot) ──────────────────────
function headerClaudeCode(theme, width, height, title, language, mascotVariant) {
  const bg = "#161b22";
  const border = "#30363d";
  const dashed = "#4a3040";
  const titleClr = "#c09090";
  const muted = "#6b6b80";
  const text = "#d4d4d4";
  const info = "#808090";
  const cx = width / 2;

  const mascot = claudeMascot(cx, 20, mascotVariant);
  const infoY = 96;
  const promptY = height - 22;

  let langEl = "";
  if (language) {
    langEl = `<text x="${width - 14}" y="${promptY}" fill="${muted}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="11" font-weight="400" dominant-baseline="central" text-anchor="end">${escapeXml(language)}</text>`;
  }

  return `
    <path d="${roundedTopPath(width, height)}" fill="${bg}" stroke="${border}" stroke-width="1" />
    <line x1="14" y1="14" x2="${cx - 62}" y2="14" stroke="${dashed}" stroke-dasharray="4,3" />
    <text x="${cx}" y="14" fill="${titleClr}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="11" font-weight="400" dominant-baseline="central" text-anchor="middle">Claude Code</text>
    <line x1="${cx + 62}" y1="14" x2="${width - 14}" y2="14" stroke="${dashed}" stroke-dasharray="4,3" />
    ${mascot}
    <text x="${cx}" y="${infoY}" fill="${info}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="400" dominant-baseline="central" text-anchor="middle">Opus 4.6 · Claude Team</text>
    <line x1="0" y1="${promptY - 14}" x2="${width}" y2="${promptY - 14}" stroke="${border}" />
    <circle cx="18" cy="${promptY}" r="4.5" fill="#7b7b95" opacity="0.7" />
    <text x="30" y="${promptY}" fill="${text}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="13" font-weight="400" dominant-baseline="central">${escapeXml(title)}</text>
    ${langEl}`;
}

// ── Header: OpenCode (tall, with logo) ───────────────────────────
function headerOpenCode(theme, width, height, title, language) {
  const bg = "#161b22";
  const border = "#30363d";
  const cyan = "#22d3ee";
  const textClr = "#c8c8cc";
  const muted = "#6b6b75";
  const cx = width / 2;
  const logoY = 42;
  const promptY = height - 22;

  let langEl = "";
  if (language) {
    langEl = `<text x="${width - 14}" y="${promptY}" fill="${muted}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="11" font-weight="400" dominant-baseline="central" text-anchor="end">${escapeXml(language)}</text>`;
  }

  return `
    <defs><clipPath id="oc-header-clip"><path d="${roundedTopPath(width, height)}" /></clipPath></defs>
    <path d="${roundedTopPath(width, height)}" fill="${bg}" stroke="${border}" stroke-width="1" />
    <text x="${cx}" y="${logoY}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="28" dominant-baseline="central" text-anchor="middle" letter-spacing="2"><tspan fill="#707078" font-weight="300">open</tspan><tspan fill="#e0e0e0" font-weight="700">code</tspan></text>
    <line x1="0" y1="${promptY - 14}" x2="${width}" y2="${promptY - 14}" stroke="${border}" />
    <g clip-path="url(#oc-header-clip)">
      <rect x="0" y="${promptY - 14}" width="3" height="${height - promptY + 14}" fill="${cyan}" />
    </g>
    <text x="22" y="${promptY}" fill="${textClr}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="13" font-weight="400" dominant-baseline="central">${escapeXml(title)}</text>
    ${langEl}`;
}

// ── Header: Codex CLI ────────────────────────────────────────────
function headerCodex(theme, width, height, title, language) {
  const bg = "#161b22";
  const border = "#30363d";
  const green = "#10a37f";
  const textClr = "#e0e0e0";
  const muted = "#666666";
  const cx = width / 2;
  const logoY = 38;
  const promptY = height - 22;

  let langEl = "";
  if (language) {
    langEl = `<text x="${width - 14}" y="${promptY}" fill="${muted}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="11" font-weight="400" dominant-baseline="central" text-anchor="end">${escapeXml(language)}</text>`;
  }

  return `
    <defs><clipPath id="cx-header-clip"><path d="${roundedTopPath(width, height)}" /></clipPath></defs>
    <path d="${roundedTopPath(width, height)}" fill="${bg}" stroke="${border}" stroke-width="1" />
    <text x="${cx}" y="${logoY}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="22" dominant-baseline="central" text-anchor="middle" letter-spacing="1"><tspan fill="${green}" font-weight="700">codex</tspan></text>
    <text x="${cx}" y="${logoY + 18}" fill="${muted}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="9" font-weight="400" dominant-baseline="central" text-anchor="middle">OpenAI Codex CLI</text>
    <line x1="0" y1="${promptY - 14}" x2="${width}" y2="${promptY - 14}" stroke="${border}" />
    <g clip-path="url(#cx-header-clip)">
      <rect x="0" y="${promptY - 14}" width="3" height="${height - promptY + 14}" fill="${green}" />
    </g>
    <text x="22" y="${promptY}" fill="${textClr}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="13" font-weight="400" dominant-baseline="central">${escapeXml(title)}</text>
    ${langEl}`;
}

// ── Header: Generic ──────────────────────────────────────────────
function headerGeneric(theme, width, height, title, language) {
  const bg = "#161b22";
  const border = "#30363d";
  const midY = height / 2;
  let langEl = "";
  if (language) {
    langEl = `<text x="${width - 14}" y="${midY}" fill="#8b949e" font-family="'JetBrains Mono','Fira Code',monospace" font-size="11" font-weight="400" dominant-baseline="central" text-anchor="end">${escapeXml(language)}</text>`;
  }
  return `
    <path d="${roundedTopPath(width, height)}" fill="${bg}" stroke="${border}" stroke-width="1" />
    <text x="14" y="${midY}" fill="#c9d1d9" font-family="-apple-system,'SF Pro Display',system-ui,sans-serif" font-size="13" font-weight="600" dominant-baseline="central">${escapeXml(title)}</text>
    ${langEl}`;
}

// ── Footer: Claude Code (powerline) ──────────────────────────────
function footerClaudeCode(theme, width, height, opts) {
  const bg = "#161b22";
  const border = "#30363d";
  const arrowW = 6;

  if (opts.text) {
    return `
    <defs><clipPath id="cc-footer-clip"><path d="${roundedBottomPath(width, height)}" /></clipPath></defs>
    <path d="${roundedBottomPath(width, height)}" fill="${bg}" stroke="${border}" stroke-width="1" />
    <text x="14" y="${height / 2}" fill="#c8d4e8" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="400" dominant-baseline="central">${escapeXml(opts.text)}</text>`;
  }

  const tokens = opts.tokens || "—";
  const model = opts.model || "Opus 4.6";
  const project = opts.project || "quickstart-for-agents";

  const segs = [
    { w: 0.22, color: "#3b4f7a", next: "#4a5a8a", text: `~/${project}`, textColor: "#c8d4e8" },
    { w: 0.12, color: "#4a5a8a", next: "#4a7a6a", text: model, textColor: "#d8e0f0" },
    { w: 0.10, color: "#4a7a6a", next: "#6a4a5a", text: `${tokens} tokens`, textColor: "#c8e8d8" },
    { w: 0.08, color: "#6a4a5a", next: bg, text: "Agents", textColor: "#e8c8d8" },
  ];

  let x = 0;
  let segSvg = "";
  for (const s of segs) {
    const sw = Math.round(width * s.w);
    segSvg += `<rect x="${x}" y="0" width="${sw + arrowW}" height="${height}" fill="${s.color}" />`;
    segSvg += `<text x="${x + sw / 2}" y="${height / 2}" fill="${s.textColor}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="9" font-weight="500" dominant-baseline="central" text-anchor="middle">${escapeXml(s.text)}</text>`;
    const ax = x + sw;
    segSvg += `<polygon points="${ax},0 ${ax + arrowW},${height / 2} ${ax},${height}" fill="${s.next}" />`;
    x += sw;
  }

  return `
    <defs><clipPath id="cc-footer-clip"><path d="${roundedBottomPath(width, height)}" /></clipPath></defs>
    <path d="${roundedBottomPath(width, height)}" fill="${bg}" stroke="${border}" stroke-width="1" />
    <g clip-path="url(#cc-footer-clip)">${segSvg}</g>`;
}

// ── Footer: OpenCode ─────────────────────────────────────────────
function footerOpenCode(theme, width, height, opts) {
  const bg = "#161b22";
  const cyan = "#22d3ee";
  const border = "#30363d";
  const midY = height / 2;

  if (opts.text) {
    return `
    <defs><clipPath id="oc-footer-clip"><path d="${roundedBottomPath(width, height)}" /></clipPath></defs>
    <path d="${roundedBottomPath(width, height)}" fill="${bg}" stroke="${border}" stroke-width="1" />
    <g clip-path="url(#oc-footer-clip)"><rect x="0" y="0" width="3" height="${height}" fill="${cyan}" /></g>
    <text x="19" y="${midY}" fill="#c8c8cc" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="400" dominant-baseline="central">${escapeXml(opts.text)}</text>`;
  }

  const tokens = opts.tokens || "—";
  const model = opts.model || "Claude Opus 4.6";
  const agent = opts.agent || "Agents";

  return `
    <defs><clipPath id="oc-footer-clip"><path d="${roundedBottomPath(width, height)}" /></clipPath></defs>
    <path d="${roundedBottomPath(width, height)}" fill="${bg}" stroke="${border}" stroke-width="1" />
    <g clip-path="url(#oc-footer-clip)"><rect x="0" y="0" width="3" height="${height}" fill="${cyan}" /></g>
    <text x="19" y="${midY}" fill="${cyan}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="600" dominant-baseline="central">${escapeXml(tokens)} tokens</text>
    <text x="130" y="${midY}" fill="#c8c8cc" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="400" dominant-baseline="central">${escapeXml(model)}</text>
    <text x="290" y="${midY}" fill="#6b6b75" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="400" dominant-baseline="central">${escapeXml(agent)}</text>`;
}

// ── Footer: Codex CLI ────────────────────────────────────────────
function footerCodex(theme, width, height, opts) {
  const bg = "#161b22";
  const green = "#10a37f";
  const border = "#30363d";
  const midY = height / 2;

  if (opts.text) {
    return `
    <defs><clipPath id="cx-footer-clip"><path d="${roundedBottomPath(width, height)}" /></clipPath></defs>
    <path d="${roundedBottomPath(width, height)}" fill="${bg}" stroke="${border}" stroke-width="1" />
    <g clip-path="url(#cx-footer-clip)"><rect x="0" y="0" width="3" height="${height}" fill="${green}" /></g>
    <text x="19" y="${midY}" fill="#e0e0e0" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="400" dominant-baseline="central">${escapeXml(opts.text)}</text>`;
  }

  const tokens = opts.tokens || "—";
  const model = opts.model || "GPT-4.1";
  const agent = opts.agent || "Agents";

  return `
    <defs><clipPath id="cx-footer-clip"><path d="${roundedBottomPath(width, height)}" /></clipPath></defs>
    <path d="${roundedBottomPath(width, height)}" fill="${bg}" stroke="${border}" stroke-width="1" />
    <g clip-path="url(#cx-footer-clip)"><rect x="0" y="0" width="3" height="${height}" fill="${green}" /></g>
    <text x="19" y="${midY}" fill="${green}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="600" dominant-baseline="central">${escapeXml(tokens)} tokens</text>
    <text x="130" y="${midY}" fill="#e0e0e0" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="400" dominant-baseline="central">${escapeXml(model)}</text>
    <text x="290" y="${midY}" fill="#666666" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="400" dominant-baseline="central">${escapeXml(agent)}</text>`;
}

// ── Footer: Generic ──────────────────────────────────────────────
function footerGeneric(theme, width, height, opts) {
  const bg = "#161b22";
  const border = "#30363d";
  if (opts.text) {
    return `
    <path d="${roundedBottomPath(width, height)}" fill="${bg}" stroke="${border}" stroke-width="1" />
    <text x="14" y="${height / 2}" fill="#8b949e" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="400" dominant-baseline="central">${escapeXml(opts.text)}</text>`;
  }
  return `
    <path d="${roundedBottomPath(width, height)}" fill="${bg}" stroke="${border}" stroke-width="1" />`;
}

// ── Dispatch ─────────────────────────────────────────────────────
const HEADER_RENDERERS = { "claude-code": headerClaudeCode, "opencode": headerOpenCode, "codex": headerCodex };
const FOOTER_RENDERERS = { "claude-code": footerClaudeCode, "opencode": footerOpenCode, "codex": footerCodex };

const HEADER_HEIGHTS = { "claude-code": 150, "opencode": 100, "codex": 96 };
const FOOTER_HEIGHTS = { "claude-code": 22, "opencode": 22, "codex": 22 };

// ── Public API ───────────────────────────────────────────────────
export function renderHeaderSvg(options = {}) {
  const themeName = (options.theme || "opencode").slice(0, 32);
  const theme = resolveTheme(themeName);
  const width = clamp(Number.parseInt(options.width, 10) || 800, 300, 1280);
  const language = (options.language || "").slice(0, 16);
  const title = (options.title || theme.name).slice(0, 60);

  const mascot = (options.mascot || "default").slice(0, 16);
  const height = HEADER_HEIGHTS[themeName] || 36;
  const renderer = HEADER_RENDERERS[themeName] || headerGeneric;
  const inner = renderer(theme, width, height, title, language, mascot);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(title)}">
  ${inner}
</svg>`;
}

export function renderFooterSvg(options = {}) {
  const themeName = (options.theme || "opencode").slice(0, 32);
  const theme = resolveTheme(themeName);
  const width = clamp(Number.parseInt(options.width, 10) || 800, 300, 1280);

  const height = FOOTER_HEIGHTS[themeName] || 4;
  const renderer = FOOTER_RENDERERS[themeName] || footerGeneric;
  const footerOpts = {
    text: (options.text || "").slice(0, 120) || null,
    tokens: (options.tokens || "").slice(0, 16),
    model: (options.model || "").slice(0, 40),
    project: (options.project || "").slice(0, 60),
    agent: (options.agent || "").slice(0, 30),
  };
  const inner = renderer(theme, width, height, footerOpts);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img">
  ${inner}
</svg>`;
}

export function renderSnippet(options = {}) {
  const host = (options.host || "https://quickstart-for-agents.vercel.app").replace(/\/$/, "");
  const theme = (options.theme || "opencode").slice(0, 32);
  const language = (options.language || "").slice(0, 16);
  const title = (options.title || "").slice(0, 60);
  const code = options.code || "Design retry and dead-letter handling for asynchronous workers\nwith clear failure budgets.";

  const headerParams = new URLSearchParams();
  headerParams.set("theme", theme);
  if (title) headerParams.set("title", title);
  if (language) headerParams.set("lang", language);

  const footerParams = new URLSearchParams();
  footerParams.set("theme", theme);

  const headerUrl = `${host}/api/header.svg?${headerParams}`;
  const footerUrl = `${host}/api/footer.svg?${footerParams}`;

  return `<div><img src="${headerUrl}" width="100%" /></div>

\`\`\`${language || "text"}
${code}
\`\`\`
<div><img src="${footerUrl}" width="100%" /></div>`;
}
