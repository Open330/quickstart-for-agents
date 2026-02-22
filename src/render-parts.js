import { resolveTheme } from "./themes.js";
import { clamp, escapeXml } from "./render.js";

// ── Accurate prompt-input-area renderers based on real app screenshots ──

function headerClaudeCode(theme, width, height, title, language) {
  // Real Claude Code CLI prompt area:
  // - Very dark background (#1e1e2e)
  // - Small ◕ circle icon on left in muted lavender
  // - Prompt text in light gray, monospace
  // - Minimal, no borders, terminal-native feel
  const bg = "#1e1e2e";
  const iconColor = "#7b7b95";
  const textColor = "#d4d4d4";
  const mutedColor = "#6b6b80";
  const midY = height / 2;

  let langEl = "";
  if (language) {
    langEl = `<text x="${width - 14}" y="${midY}" fill="${mutedColor}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="11" font-weight="400" dominant-baseline="central" text-anchor="end">${escapeXml(language)}</text>`;
  }

  return `
    <rect width="${width}" height="${height}" fill="${bg}" />
    <circle cx="18" cy="${midY}" r="4.5" fill="${iconColor}" opacity="0.7" />
    <text x="30" y="${midY}" fill="${textColor}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="13" font-weight="400" dominant-baseline="central">${escapeXml(title)}</text>
    ${langEl}`;
}

function footerClaudeCode(theme, width, height) {
  // Claude Code status bar: colorful segments
  // Simplified version showing model + path info
  const bg = "#1e1e2e";
  const barY = 1;
  const barH = height - 1;
  const segments = [
    { w: 0.28, color: "#3b4f7a", text: "~/quickstart-for-agents", textColor: "#c8d4e8" },
    { w: 0.12, color: "#4a5a8a", text: "Opus 4.6", textColor: "#d8e0f0" },
    { w: 0.08, color: "#4a7a6a", text: "0.0%", textColor: "#c8e8d8" },
    { w: 0.06, color: "#6a4a5a", text: "0", textColor: "#e8c8d8" },
    { w: 0.06, color: "#7a6a3a", text: "0", textColor: "#e8dcc0" },
  ];

  let x = 0;
  let segs = "";
  for (const s of segments) {
    const sw = Math.round(width * s.w);
    segs += `<rect x="${x}" y="${barY}" width="${sw}" height="${barH}" fill="${s.color}" />`;
    segs += `<text x="${x + sw / 2}" y="${barY + barH / 2}" fill="${s.textColor}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="9" font-weight="500" dominant-baseline="central" text-anchor="middle">${s.text}</text>`;
    x += sw;
  }

  return `
    <rect width="${width}" height="${height}" fill="${bg}" />
    ${segs}`;
}

function headerOpenCode(theme, width, height, title, language) {
  // Real OpenCode TUI prompt area:
  // - Dark gray panel (#2a2a30) distinct from page bg
  // - Bright cyan left bar (3px wide, full height)
  // - Rounded top corners on the panel
  // - Light gray text inside, monospace
  const panelBg = "#2a2a30";
  const barColor = "#22d3ee";
  const barWidth = 3;
  const textColor = "#c8c8cc";
  const mutedColor = "#6b6b75";
  const midY = height / 2;

  let langEl = "";
  if (language) {
    langEl = `<text x="${width - 14}" y="${midY}" fill="${mutedColor}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="11" font-weight="400" dominant-baseline="central" text-anchor="end">${escapeXml(language)}</text>`;
  }

  return `
    <rect width="${width}" height="${height}" fill="${panelBg}" />
    <rect x="0" y="0" width="${barWidth}" height="${height}" fill="${barColor}" />
    <text x="${barWidth + 16}" y="${midY}" fill="${textColor}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="13" font-weight="400" dominant-baseline="central">${escapeXml(title)}</text>
    ${langEl}`;
}

function footerOpenCode(theme, width, height) {
  // OpenCode footer: continue the panel + cyan bar,
  // show model info line like the real UI
  const panelBg = "#2a2a30";
  const barColor = "#22d3ee";
  const barWidth = 3;
  const cyanText = "#22d3ee";
  const lightText = "#c8c8cc";
  const mutedText = "#6b6b75";
  const midY = height / 2;

  return `
    <rect width="${width}" height="${height}" fill="${panelBg}" />
    <rect x="0" y="0" width="${barWidth}" height="${height}" fill="${barColor}" />
    <text x="${barWidth + 16}" y="${midY}" fill="${cyanText}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="600" dominant-baseline="central">Sisyphus (Ultraworker)</text>
    <text x="${barWidth + 190}" y="${midY}" fill="${lightText}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="400" dominant-baseline="central">Claude Opus 4.6</text>
    <text x="${barWidth + 320}" y="${midY}" fill="${mutedText}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="400" dominant-baseline="central">Augment Code</text>`;
}

function headerGeneric(theme, width, height, title, language) {
  // Generic fallback: clean, theme-colored header
  const midY = height / 2;
  let langEl = "";
  if (language) {
    const langWidth = clamp(language.length * 7.5 + 16, 40, 120);
    const langX = width - langWidth - 14;
    const langY = (height - 18) / 2;
    langEl = `
      <rect x="${langX}" y="${langY}" width="${langWidth}" height="18" fill="${theme.chipBg}" rx="4" ry="4" />
      <text x="${langX + langWidth / 2}" y="${midY}" fill="${theme.language}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="700" dominant-baseline="central" text-anchor="middle">${escapeXml(language)}</text>`;
  }
  return `
    <rect width="${width}" height="${height}" fill="${theme.header}" />
    <text x="14" y="${midY}" fill="${theme.text}" font-family="-apple-system,'SF Pro Display',system-ui,sans-serif" font-size="13" font-weight="600" dominant-baseline="central">${escapeXml(title)}</text>
    <rect x="0" y="${height - 1}" width="${width}" height="1" fill="${theme.border}" opacity="0.5" />
    ${langEl}`;
}

function footerGeneric(theme, width, height) {
  return `
    <rect width="${width}" height="${height}" fill="${theme.header}" />
    <rect x="0" y="0" width="${width}" height="1" fill="${theme.border}" opacity="0.5" />`;
}

// ── Dispatch tables ─────────────────────────────────────────────────

const HEADER_RENDERERS = {
  "claude-code": headerClaudeCode,
  "opencode": headerOpenCode,
};

const FOOTER_RENDERERS = {
  "claude-code": footerClaudeCode,
  "opencode": footerOpenCode,
};

// ── Public API ─────────────────────────────────────────────────────

export function renderHeaderSvg(options = {}) {
  const themeName = (options.theme || "opencode").slice(0, 32);
  const theme = resolveTheme(themeName);
  const width = clamp(Number.parseInt(options.width, 10) || 800, 300, 1280);
  const language = (options.language || "").slice(0, 16);
  const title = (options.title || theme.name).slice(0, 40);

  const height = 36;
  const radius = 6;
  const renderer = HEADER_RENDERERS[themeName] || headerGeneric;
  const inner = renderer(theme, width, height, title, language);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(title)}">
  <defs>
    <clipPath id="top-round">
      <path d="M ${radius} 0 H ${width - radius} Q ${width} 0 ${width} ${radius} V ${height} H 0 V ${radius} Q 0 0 ${radius} 0 Z" />
    </clipPath>
  </defs>
  <g clip-path="url(#top-round)">
    ${inner}
  </g>
</svg>`;
}

export function renderFooterSvg(options = {}) {
  const themeName = (options.theme || "opencode").slice(0, 32);
  const theme = resolveTheme(themeName);
  const width = clamp(Number.parseInt(options.width, 10) || 800, 300, 1280);

  // Claude Code gets taller footer for status bar, others get minimal
  const height = themeName === "claude-code" ? 22 : themeName === "opencode" ? 20 : 6;
  const radius = 6;
  const renderer = FOOTER_RENDERERS[themeName] || footerGeneric;
  const inner = renderer(theme, width, height);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img">
  <defs>
    <clipPath id="bottom-round">
      <path d="M 0 0 H ${width} V ${height - radius} Q ${width} ${height} ${width - radius} ${height} H ${radius} Q 0 ${height} 0 ${height - radius} Z" />
    </clipPath>
  </defs>
  <g clip-path="url(#bottom-round)">
    ${inner}
  </g>
</svg>`;
}

export function renderSnippet(options = {}) {
  const host = (options.host || "https://quickstart-for-agents.vercel.app").replace(/\/$/, "");
  const theme = (options.theme || "opencode").slice(0, 32);
  const language = (options.language || "bash").slice(0, 16);
  const title = (options.title || "").slice(0, 40);
  const code = options.code || "# your command here";

  const headerParams = new URLSearchParams();
  headerParams.set("theme", theme);
  if (title) headerParams.set("title", title);
  if (language) headerParams.set("lang", language);

  const footerParams = new URLSearchParams();
  footerParams.set("theme", theme);

  const headerUrl = `${host}/api/header.svg?${headerParams}`;
  const footerUrl = `${host}/api/footer.svg?${footerParams}`;

  return `<img src="${headerUrl}" width="100%" />

\`\`\`${language}
${code}
\`\`\`

<img src="${footerUrl}" width="100%" />`;
}
