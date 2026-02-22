import { resolveTheme } from "./themes.js";
import { clamp, escapeXml } from "./render.js";

// ── Theme-specific header layouts ──────────────────────────────────
// Each theme gets a unique prompt-input-style header that mimics the
// actual app's UI, not a generic window title bar.

function headerClaudeCode(theme, width, height, title, language) {
  // Claude Code CLI: dark prompt area with ❯ marker in amber,
  // dashed-style border, minimal terminal feel
  const midY = height / 2;
  const langBadge = renderLangBadge(language, theme, width, midY, height);

  return `
    <rect width="${width}" height="${height}" fill="${theme.shell}" />
    <rect x="0" y="0" width="${width}" height="1" fill="${theme.accent}" opacity="0.5" />
    <text x="16" y="${midY}" fill="${theme.accent}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="15" font-weight="700" dominant-baseline="central">&#x276F;</text>
    <text x="32" y="${midY}" fill="${theme.muted}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="12" font-weight="500" dominant-baseline="central">${escapeXml(title)}</text>
    <rect x="0" y="${height - 1}" width="${width}" height="1" fill="${theme.border}" opacity="0.5" />
    ${langBadge}`;
}

function headerOpenCode(theme, width, height, title, language) {
  // OpenCode TUI: thick cyan left accent bar, dark navy panel,
  // polished Bubble Tea / Lip Gloss style
  const midY = height / 2;
  const barWidth = 4;
  const langBadge = renderLangBadge(language, theme, width, midY, height);

  return `
    <rect width="${width}" height="${height}" fill="${theme.shell}" />
    <rect x="0" y="0" width="${barWidth}" height="${height}" fill="${theme.accent}" />
    <text x="${barWidth + 14}" y="${midY}" fill="${theme.text}" font-family="-apple-system,'SF Pro Display',system-ui,sans-serif" font-size="13" font-weight="600" dominant-baseline="central">${escapeXml(title)}</text>
    <rect x="0" y="${height - 1}" width="${width}" height="1" fill="${theme.border}" opacity="0.4" />
    ${langBadge}`;
}

function headerGithubDark(theme, width, height, title, language) {
  // GitHub style: clean, flat header with subtle separator
  const midY = height / 2;
  const langBadge = renderLangBadge(language, theme, width, midY, height);

  return `
    <rect width="${width}" height="${height}" fill="${theme.header}" />
    <circle cx="16" cy="${midY}" r="4" fill="${theme.accent}" opacity="0.8" />
    <text x="28" y="${midY}" fill="${theme.text}" font-family="-apple-system,'SF Pro Display',system-ui,sans-serif" font-size="13" font-weight="600" dominant-baseline="central">${escapeXml(title)}</text>
    <rect x="0" y="${height - 1}" width="${width}" height="1" fill="${theme.border}" />
    ${langBadge}`;
}

function headerVSCode(theme, width, height, title, language) {
  // VS Code: tab-style header with accent top line
  const midY = height / 2;
  const langBadge = renderLangBadge(language, theme, width, midY, height);

  return `
    <rect width="${width}" height="${height}" fill="${theme.header}" />
    <rect x="0" y="0" width="${width}" height="2" fill="${theme.accent}" />
    <text x="14" y="${midY}" fill="${theme.text}" font-family="-apple-system,'SF Pro Display',system-ui,sans-serif" font-size="12" font-weight="500" dominant-baseline="central">${escapeXml(title)}</text>
    <rect x="0" y="${height - 1}" width="${width}" height="1" fill="${theme.border}" opacity="0.5" />
    ${langBadge}`;
}

// ── Theme-specific footer layouts ──────────────────────────────────

function footerClaudeCode(theme, width, height) {
  return `
    <rect width="${width}" height="${height}" fill="${theme.shell}" />
    <rect x="0" y="0" width="${width}" height="1" fill="${theme.border}" opacity="0.5" />
    <rect x="0" y="${height - 1}" width="${width}" height="1" fill="${theme.accent}" opacity="0.5" />`;
}

function footerOpenCode(theme, width, height) {
  const barWidth = 4;
  return `
    <rect width="${width}" height="${height}" fill="${theme.shell}" />
    <rect x="0" y="0" width="${barWidth}" height="${height}" fill="${theme.accent}" />
    <rect x="0" y="0" width="${width}" height="1" fill="${theme.border}" opacity="0.4" />`;
}

function footerGeneric(theme, width, height) {
  return `
    <rect width="${width}" height="${height}" fill="${theme.header}" />
    <rect x="0" y="0" width="${width}" height="1" fill="${theme.border}" opacity="0.5" />`;
}

// ── Shared helpers ─────────────────────────────────────────────────

function renderLangBadge(language, theme, width, midY, height) {
  if (!language) return "";
  const langWidth = clamp(language.length * 7.5 + 16, 40, 120);
  const langX = width - langWidth - 14;
  const langY = (height - 18) / 2;
  return `
    <rect x="${langX}" y="${langY}" width="${langWidth}" height="18" fill="${theme.chipBg}" rx="4" ry="4" />
    <text x="${langX + langWidth / 2}" y="${midY}" fill="${theme.language}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="700" dominant-baseline="central" text-anchor="middle">${escapeXml(language)}</text>`;
}

const HEADER_RENDERERS = {
  "claude-code": headerClaudeCode,
  "opencode": headerOpenCode,
  "github-dark": headerGithubDark,
  "vscode-dark": headerVSCode,
  "vscode-light": headerVSCode,
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

  const height = 40;
  const radius = 8;
  const renderer = HEADER_RENDERERS[themeName] || headerGithubDark;
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

  const height = 8;
  const radius = 8;
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
