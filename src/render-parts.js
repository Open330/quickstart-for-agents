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

// ── Claude mascot pixel art ───────────────────────────────────────
function claudeMascot(cx, y0, s = 3.5) {
  const P = "#e89898", H = "#8888c0", S = "#c8c0f0", A = "#a0a0c0", E = "#604040";
  // [colOffset, rowOffset, width, height, color]
  const px = [
    [0,0,1,1,S], [-1,1,3,1,S], [0,2,1,1,S],       // sparkle
    [0,3,1,2,A],                                      // antenna
    [-2,5,5,1,H], [-3,6,7,1,H],                      // hat
    [-5,7,11,6,P],                                    // body
    [-3,9,1,1,E], [3,9,1,1,E],                       // eyes
    [-5,13,2,2,P], [4,13,2,2,P],                     // legs
  ];
  return px.map(([c,r,w,h,f]) =>
    `<rect x="${cx+c*s}" y="${y0+r*s}" width="${w*s}" height="${h*s}" fill="${f}" />`
  ).join("\n    ");
}

// ── Header: Claude Code (tall, with mascot) ──────────────────────
function headerClaudeCode(theme, width, height, title, language) {
  const bg = "#161b22";
  const border = "#30363d";
  const dashed = "#4a3040";
  const titleClr = "#c09090";
  const muted = "#6b6b80";
  const text = "#d4d4d4";
  const info = "#808090";
  const cx = width / 2;

  const mascot = claudeMascot(cx, 24);
  const infoY = 82;
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
    <text x="${cx}" y="${logoY}" fill="#707078" font-family="'JetBrains Mono','Fira Code',monospace" font-size="28" font-weight="300" dominant-baseline="central" text-anchor="middle" letter-spacing="2">open</text>
    <text x="${cx + 74}" y="${logoY}" fill="#e0e0e0" font-family="'JetBrains Mono','Fira Code',monospace" font-size="28" font-weight="700" dominant-baseline="central" text-anchor="middle" letter-spacing="2">code</text>
    <line x1="0" y1="${promptY - 14}" x2="${width}" y2="${promptY - 14}" stroke="${border}" />
    <g clip-path="url(#oc-header-clip)">
      <rect x="0" y="${promptY - 14}" width="3" height="${height - promptY + 14}" fill="${cyan}" />
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
const HEADER_RENDERERS = { "claude-code": headerClaudeCode, "opencode": headerOpenCode };
const FOOTER_RENDERERS = { "claude-code": footerClaudeCode, "opencode": footerOpenCode };

const HEADER_HEIGHTS = { "claude-code": 130, "opencode": 100 };
const FOOTER_HEIGHTS = { "claude-code": 22, "opencode": 22 };

// ── Public API ───────────────────────────────────────────────────
export function renderHeaderSvg(options = {}) {
  const themeName = (options.theme || "opencode").slice(0, 32);
  const theme = resolveTheme(themeName);
  const width = clamp(Number.parseInt(options.width, 10) || 800, 300, 1280);
  const language = (options.language || "").slice(0, 16);
  const title = (options.title || theme.name).slice(0, 60);

  const height = HEADER_HEIGHTS[themeName] || 36;
  const renderer = HEADER_RENDERERS[themeName] || headerGeneric;
  const inner = renderer(theme, width, height, title, language);

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
