import { resolveTheme } from "./themes.js";
import { clamp, escapeXml } from "./render.js";

export function renderHeaderSvg(options = {}) {
  const themeName = (options.theme || "opencode").slice(0, 32);
  const theme = resolveTheme(themeName);
  const width = clamp(Number.parseInt(options.width, 10) || 800, 300, 1280);
  const language = (options.language || "").slice(0, 16);
  const title = (options.title || theme.name).slice(0, 40);

  const height = 48;
  const radius = 10;

  // Traffic light dots
  const dotY = 22;
  const dotR = 5;
  const dots = `
    <circle cx="18" cy="${dotY}" r="${dotR}" fill="#ff5f57" />
    <circle cx="34" cy="${dotY}" r="${dotR}" fill="#febc2e" />
    <circle cx="50" cy="${dotY}" r="${dotR}" fill="#28c840" />`;

  // Accent indicator dot before title
  const accentDot = `<circle cx="68" cy="${dotY}" r="3" fill="${theme.accent}" />`;

  // Title text
  const titleEl = `<text x="78" y="${dotY}" fill="${theme.text}" font-family="-apple-system,'SF Pro Display','Segoe UI',system-ui,sans-serif" font-size="13" font-weight="600" dominant-baseline="central">${escapeXml(title)}</text>`;

  // Language badge (right-aligned)
  let langBadge = "";
  if (language) {
    const langWidth = clamp(language.length * 7.5 + 16, 40, 120);
    const langX = width - langWidth - 16;
    const langY = (height - 20) / 2;
    langBadge = `
      <rect x="${langX}" y="${langY}" width="${langWidth}" height="20" fill="${theme.chipBg}" rx="4" ry="4" />
      <text x="${langX + langWidth / 2}" y="${dotY}" fill="${theme.language}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="11" font-weight="600" dominant-baseline="central" text-anchor="middle">${escapeXml(language)}</text>`;
  }

  // Accent bottom line (2px, theme accent color)
  const accentLine = `<rect x="0" y="${height - 2}" width="${width}" height="2" fill="${theme.accent}" opacity="0.7" />`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(title)}">
  <defs>
    <clipPath id="top-round">
      <path d="M ${radius} 0 H ${width - radius} Q ${width} 0 ${width} ${radius} V ${height} H 0 V ${radius} Q 0 0 ${radius} 0 Z" />
    </clipPath>
  </defs>
  <g clip-path="url(#top-round)">
    <rect width="${width}" height="${height}" fill="${theme.header}" />
    ${dots}
    ${accentDot}
    ${titleEl}
    ${langBadge}
    <line x1="0" y1="${height - 2.5}" x2="${width}" y2="${height - 2.5}" stroke="${theme.border}" stroke-width="0.5" />
    ${accentLine}
  </g>
</svg>`;
}

export function renderFooterSvg(options = {}) {
  const themeName = (options.theme || "opencode").slice(0, 32);
  const theme = resolveTheme(themeName);
  const width = clamp(Number.parseInt(options.width, 10) || 800, 300, 1280);

  const height = 8;
  const radius = 10;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img">
  <defs>
    <clipPath id="bottom-round">
      <path d="M 0 0 H ${width} V ${height - radius} Q ${width} ${height} ${width - radius} ${height} H ${radius} Q 0 ${height} 0 ${height - radius} Z" />
    </clipPath>
  </defs>
  <g clip-path="url(#bottom-round)">
    <rect width="${width}" height="${height}" fill="${theme.header}" />
    <line x1="0" y1="0.5" x2="${width}" y2="0.5" stroke="${theme.border}" stroke-width="0.5" />
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
