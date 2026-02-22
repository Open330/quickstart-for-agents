import { resolveTheme } from "./themes.js";
import { clamp, escapeXml } from "./render.js";

// GitHub dark mode code block bg: #161b22
// We match this so header/footer blend with the native code block.

function headerClaudeCode(theme, width, height, title, language) {
  const bg = "#161b22";
  const iconColor = "#7b7b95";
  const textColor = "#d4d4d4";
  const mutedColor = "#6b6b80";
  const borderColor = "#30363d";
  const midY = height / 2;

  let langEl = "";
  if (language) {
    langEl = `<text x="${width - 14}" y="${midY}" fill="${mutedColor}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="11" font-weight="400" dominant-baseline="central" text-anchor="end">${escapeXml(language)}</text>`;
  }

  return `
    <rect width="${width}" height="${height}" fill="${bg}" />
    <circle cx="18" cy="${midY}" r="4.5" fill="${iconColor}" opacity="0.7" />
    <text x="30" y="${midY}" fill="${textColor}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="13" font-weight="400" dominant-baseline="central">${escapeXml(title)}</text>
    ${langEl}
    <line x1="0" y1="${height - 0.5}" x2="${width}" y2="${height - 0.5}" stroke="${borderColor}" />`;
}

function footerClaudeCode(theme, width, height) {
  const bg = "#161b22";
  const borderColor = "#30363d";
  const rowH = height / 2;

  // Row 1 segments (top row): path, model, cpu, errors, warnings, tokens
  const row1 = [
    { w: 0.28, color: "#3b4f7a", next: "#4a5a8a", text: "~/quickstart-for-agents", textColor: "#c8d4e8" },
    { w: 0.11, color: "#4a5a8a", next: "#4a7a6a", text: "Opus 4.6", textColor: "#d8e0f0" },
    { w: 0.07, color: "#4a7a6a", next: "#6a4a5a", text: "0.0%", textColor: "#c8e8d8" },
    { w: 0.05, color: "#6a4a5a", next: "#7a6a3a", text: "0", textColor: "#e8c8d8" },
    { w: 0.05, color: "#7a6a3a", next: bg, text: "0", textColor: "#e8dcc0" },
  ];

  // Row 2 segments (bottom row): branch, git, changes, time, cost
  const row2 = [
    { w: 0.14, color: "#3b4f7a", next: "#4a5a8a", text: "⇡ main", textColor: "#c8d4e8" },
    { w: 0.11, color: "#4a5a8a", next: "#4a7a6a", text: "main", textColor: "#d8e0f0" },
    { w: 0.08, color: "#4a7a6a", next: "#6a4a5a", text: "(+0,-0)", textColor: "#c8e8d8" },
    { w: 0.06, color: "#6a4a5a", next: "#7a6a3a", text: "0m", textColor: "#e8c8d8" },
    { w: 0.07, color: "#7a6a3a", next: bg, text: "$0.00", textColor: "#e8dcc0" },
  ];

  const arrowW = 6;

  function renderRow(segs, yOff) {
    let x = 0;
    let out = "";
    for (const s of segs) {
      const sw = Math.round(width * s.w);
      // Segment rect
      out += `<rect x="${x}" y="${yOff}" width="${sw + arrowW}" height="${rowH}" fill="${s.color}" />`;
      // Segment text
      out += `<text x="${x + sw / 2}" y="${yOff + rowH / 2}" fill="${s.textColor}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="9" font-weight="500" dominant-baseline="central" text-anchor="middle">${s.text}</text>`;
      // Powerline arrow separator
      const ax = x + sw;
      out += `<polygon points="${ax},${yOff} ${ax + arrowW},${yOff + rowH / 2} ${ax},${yOff + rowH}" fill="${s.next}" />`;
      x += sw;
    }
    return out;
  }

  return `
    <rect width="${width}" height="${height}" fill="${bg}" />
    <line x1="0" y1="0.5" x2="${width}" y2="0.5" stroke="${borderColor}" />
    ${renderRow(row1, 1)}
    ${renderRow(row2, rowH + 1)}`;
}

function headerOpenCode(theme, width, height, title, language) {
  const panelBg = "#161b22";
  const barColor = "#22d3ee";
  const barWidth = 3;
  const textColor = "#c8c8cc";
  const mutedColor = "#6b6b75";
  const borderColor = "#30363d";
  const midY = height / 2;

  let langEl = "";
  if (language) {
    langEl = `<text x="${width - 14}" y="${midY}" fill="${mutedColor}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="11" font-weight="400" dominant-baseline="central" text-anchor="end">${escapeXml(language)}</text>`;
  }

  return `
    <rect width="${width}" height="${height}" fill="${panelBg}" />
    <rect x="0" y="0" width="${barWidth}" height="${height}" fill="${barColor}" />
    <text x="${barWidth + 16}" y="${midY}" fill="${textColor}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="13" font-weight="400" dominant-baseline="central">${escapeXml(title)}</text>
    ${langEl}
    <line x1="0" y1="${height - 0.5}" x2="${width}" y2="${height - 0.5}" stroke="${borderColor}" />`;
}

function footerOpenCode(theme, width, height) {
  const panelBg = "#161b22";
  const barColor = "#22d3ee";
  const barWidth = 3;
  const borderColor = "#30363d";
  const cyanText = "#22d3ee";
  const lightText = "#c8c8cc";
  const mutedText = "#6b6b75";
  const midY = height / 2;

  return `
    <rect width="${width}" height="${height}" fill="${panelBg}" />
    <rect x="0" y="0" width="${barWidth}" height="${height}" fill="${barColor}" />
    <line x1="0" y1="0.5" x2="${width}" y2="0.5" stroke="${borderColor}" />
    <text x="${barWidth + 16}" y="${midY}" fill="${cyanText}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="600" dominant-baseline="central">Sisyphus (Ultraworker)</text>
    <text x="${barWidth + 190}" y="${midY}" fill="${lightText}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="400" dominant-baseline="central">Claude Opus 4.6</text>
    <text x="${barWidth + 320}" y="${midY}" fill="${mutedText}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="10" font-weight="400" dominant-baseline="central">Augment Code</text>`;
}

function headerGeneric(theme, width, height, title, language) {
  const bg = "#161b22";
  const borderColor = "#30363d";
  const midY = height / 2;
  let langEl = "";
  if (language) {
    langEl = `<text x="${width - 14}" y="${midY}" fill="#8b949e" font-family="'JetBrains Mono','Fira Code',monospace" font-size="11" font-weight="400" dominant-baseline="central" text-anchor="end">${escapeXml(language)}</text>`;
  }
  return `
    <rect width="${width}" height="${height}" fill="${bg}" />
    <text x="14" y="${midY}" fill="#c9d1d9" font-family="-apple-system,'SF Pro Display',system-ui,sans-serif" font-size="13" font-weight="600" dominant-baseline="central">${escapeXml(title)}</text>
    <line x1="0" y1="${height - 0.5}" x2="${width}" y2="${height - 0.5}" stroke="${borderColor}" />
    ${langEl}`;
}

function footerGeneric(theme, width, height) {
  return `
    <rect width="${width}" height="${height}" fill="#161b22" />
    <line x1="0" y1="0.5" x2="${width}" y2="0.5" stroke="#30363d" />`;
}

// ── Dispatch ────────────────────────────────────────────────────────

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
  const renderer = HEADER_RENDERERS[themeName] || headerGeneric;
  const inner = renderer(theme, width, height, title, language);

  // No rounded corners — flat edges blend better with code block gaps
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(title)}">
  ${inner}
</svg>`;
}

export function renderFooterSvg(options = {}) {
  const themeName = (options.theme || "opencode").slice(0, 32);
  const theme = resolveTheme(themeName);
  const width = clamp(Number.parseInt(options.width, 10) || 800, 300, 1280);

  const height = themeName === "claude-code" ? 32 : themeName === "opencode" ? 20 : 4;
  const renderer = FOOTER_RENDERERS[themeName] || footerGeneric;
  const inner = renderer(theme, width, height);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img">
  ${inner}
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
