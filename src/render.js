import { resolveTheme } from "./themes.js";

const MAX_PROMPT_LENGTH = 600;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function normalizePrompt(prompt) {
  const cleaned = (prompt || "").replaceAll("\r\n", "\n").trim();
  if (!cleaned) {
    return "Write a concise implementation plan for this task.";
  }
  return cleaned.slice(0, MAX_PROMPT_LENGTH);
}

function wrapLine(line, maxChars) {
  if (line.length <= maxChars) {
    return [line];
  }

  const wrapped = [];
  let rest = line;
  while (rest.length > maxChars) {
    let splitAt = rest.lastIndexOf(" ", maxChars);
    if (splitAt < Math.floor(maxChars * 0.5)) {
      splitAt = maxChars;
    }
    wrapped.push(rest.slice(0, splitAt));
    rest = rest.slice(splitAt).trimStart();
  }
  if (rest) {
    wrapped.push(rest);
  }
  return wrapped;
}

function wrapPrompt(prompt, width, fontSize) {
  const safeCharWidth = Math.max(7, Math.floor(fontSize * 0.62));
  const available = Math.max(120, width - 80);
  const maxChars = Math.max(18, Math.floor(available / safeCharWidth));
  const lines = [];

  for (const rawLine of prompt.split("\n")) {
    const wrapped = wrapLine(rawLine, maxChars);
    lines.push(...wrapped);
  }
  return lines.slice(0, 25);
}

function circle(cx, color) {
  return `<circle cx="${cx}" cy="18" r="5" fill="${color}" />`;
}

function headerText(x, y, fill, content, size = 12, weight = 600) {
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="${size}" font-weight="${weight}" dominant-baseline="middle">${escapeXml(content)}</text>`;
}

export function renderPromptSvg(options = {}) {
  const theme = resolveTheme(options.theme);
  const width = clamp(Number.parseInt(options.width, 10) || 700, 360, 1200);
  const fontSize = clamp(Number.parseInt(options.fontSize, 10) || 16, 12, 20);
  const language = (options.language || "prompt").slice(0, 16);
  const title = (options.title || "README Prompt Block").slice(0, 40);
  const prompt = normalizePrompt(options.prompt);
  const lines = wrapPrompt(prompt, width, fontSize);
  const lineHeight = Math.round(fontSize * 1.5);
  const headerHeight = 40;
  const topOffset = headerHeight + 12;
  const bodyHeight = lines.length * lineHeight + 28;
  const height = headerHeight + bodyHeight;

  const body = lines
    .map((line, index) => {
      const y = topOffset + index * lineHeight;
      const lineNumber = String(index + 1).padStart(2, "0");
      return [
        `<text x="22" y="${y}" fill="${theme.lineNumber}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="${Math.max(11, fontSize - 2)}" dominant-baseline="hanging">${lineNumber}</text>`,
        `<text x="62" y="${y}" fill="${theme.text}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="${fontSize}" dominant-baseline="hanging">${escapeXml(line)}</text>`
      ].join("");
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" role="img" aria-label="${escapeXml(
    title
  )}">
  <defs>
    <linearGradient id="bg-gradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${theme.background}" />
      <stop offset="100%" stop-color="${theme.panel}" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg-gradient)" rx="14" ry="14" />
  <rect x="0.75" y="0.75" width="${width - 1.5}" height="${height - 1.5}" fill="none" stroke="${theme.border}" rx="13" ry="13" />
  <rect x="0" y="0" width="${width}" height="${headerHeight}" fill="${theme.header}" rx="14" ry="14" />
  <rect x="0" y="${headerHeight - 14}" width="${width}" height="14" fill="${theme.header}" />
  ${circle(26, "#ff5f56")}
  ${circle(46, "#ffbd2e")}
  ${circle(66, "#27c93f")}
  ${headerText(92, 18, theme.muted, title)}
  ${headerText(width - 90, 18, theme.language, language, 11, 700)}
  ${body}
</svg>`;
}

