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

export function normalizePrompt(prompt) {
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

function wrapPrompt(prompt, maxChars, maxLines = 18) {
  const lines = [];

  for (const rawLine of prompt.split("\n")) {
    const wrapped = wrapLine(rawLine, maxChars);
    lines.push(...wrapped);
  }
  return lines.slice(0, maxLines);
}

function text(x, y, fill, content, size = 12, weight = 500, baseline = "middle") {
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="${size}" font-weight="${weight}" dominant-baseline="${baseline}">${escapeXml(content)}</text>`;
}

function createCopyHref(options, prompt) {
  const params = new URLSearchParams();
  params.set("prompt", prompt);
  params.set("autocopy", "1");
  if (options.theme) {
    params.set("theme", options.theme.slice(0, 32));
  }
  if (options.language) {
    params.set("lang", options.language.slice(0, 16));
  }
  if (options.title) {
    params.set("title", options.title.slice(0, 40));
  }
  return `/api/copy?${params.toString()}`;
}

export function renderPromptSvg(options = {}) {
  const themeName = (options.theme || "opencode").slice(0, 32);
  const theme = resolveTheme(themeName);
  const width = clamp(Number.parseInt(options.width, 10) || 760, 460, 1280);
  const fontSize = clamp(Number.parseInt(options.fontSize, 10) || 16, 12, 20);
  const language = (options.language || "prompt").slice(0, 16);
  const title = (options.title || "Quickstart For Agents").slice(0, 40);
  const prompt = normalizePrompt(options.prompt);
  const copyHref = options.copyHref || createCopyHref(options, prompt);

  const outerPad = 22;
  const cardX = outerPad;
  const cardY = outerPad;
  const cardWidth = width - outerPad * 2;
  const headerHeight = 56;
  const composerX = cardX + 16;
  const composerY = cardY + headerHeight + 10;
  const composerWidth = cardWidth - 32;
  const promptPanelX = composerX + 12;
  const promptPanelY = composerY + 12;
  const promptPanelWidth = composerWidth - 24;

  const safeCharWidth = Math.max(7, Math.floor(fontSize * 0.61));
  const maxChars = Math.max(20, Math.floor((promptPanelWidth - 74) / safeCharWidth));
  const lines = wrapPrompt(prompt, maxChars, 18);
  const lineHeight = Math.round(fontSize * 1.45);
  const promptTextX = promptPanelX + 34;
  const markerX = promptPanelX + 16;
  const promptTextY = promptPanelY + 20;
  const bodyHeight = Math.max(44, lines.length * lineHeight + 6);
  const toolbarHeight = 38;
  const promptPanelHeight = 18 + bodyHeight + 12 + toolbarHeight + 12;
  const composerHeight = promptPanelHeight + 24;
  const cardHeight = headerHeight + 10 + composerHeight + 16;
  const height = cardY + cardHeight + outerPad;

  const body = lines
    .map((line, index) => {
      const y = promptTextY + index * lineHeight;
      const marker = index === 0 ? ">" : "·";
      return `${text(markerX, y, theme.accent, marker, Math.max(11, fontSize - 1), 700, "hanging")}${text(
        promptTextX,
        y,
        theme.text,
        line,
        fontSize,
        500,
        "hanging"
      )}`;
    })
    .join("");

  const copyWidth = 90;
  const copyHeight = 30;
  const copyX = cardX + cardWidth - copyWidth - 16;
  const copyY = cardY + 14;
  const langChipWidth = clamp(language.length * 8 + 26, 62, 130);
  const langChipX = copyX - langChipWidth - 10;
  const langChipY = cardY + 20;
  const toolbarY = promptPanelY + promptPanelHeight - toolbarHeight - 12;
  const sendWidth = 84;
  const sendHeight = 28;
  const sendX = promptPanelX + promptPanelWidth - sendWidth - 12;
  const sendY = toolbarY + 5;
  const modelChip = themeName === "claude-code" ? "claude-3.7" : themeName === "github-dark" ? "gpt-4.1" : "opencode";
  const infoChip = `${lines.length} lines`;
  const subtitle = themeName === "claude-code" ? "Message Composer" : "Prompt Composer";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" role="img" aria-label="${escapeXml(
    title
  )}">
  <defs>
    <linearGradient id="bg-gradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${theme.background}" />
      <stop offset="100%" stop-color="${theme.panel}" />
    </linearGradient>
    <linearGradient id="card-gradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${theme.shellTop}" />
      <stop offset="100%" stop-color="${theme.shell}" />
    </linearGradient>
    <radialGradient id="ambient-glow" cx="50%" cy="0%" r="75%">
      <stop offset="0%" stop-color="${theme.canvasGlow}" stop-opacity="0.28" />
      <stop offset="100%" stop-color="${theme.canvasGlow}" stop-opacity="0" />
    </radialGradient>
    <filter id="card-shadow" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#000000" flood-opacity="0.24" />
    </filter>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg-gradient)" />
  <rect width="${width}" height="${Math.round(height * 0.58)}" fill="url(#ambient-glow)" />

  <g filter="url(#card-shadow)">
    <rect x="${cardX}" y="${cardY}" width="${cardWidth}" height="${cardHeight}" fill="url(#card-gradient)" stroke="${theme.shellBorder}" rx="20" ry="20" />
    <line x1="${cardX}" y1="${cardY + headerHeight}" x2="${cardX + cardWidth}" y2="${cardY + headerHeight}" stroke="${theme.promptBorder}" stroke-opacity="0.6" />
    <circle cx="${cardX + 22}" cy="${cardY + 21}" r="4" fill="${theme.accent}" />
    ${text(cardX + 34, cardY + 20, theme.muted, `${theme.name} ${subtitle}`, 11, 700)}
    ${text(cardX + 20, cardY + 39, theme.text, title, 14, 600)}

    <rect x="${langChipX}" y="${langChipY}" width="${langChipWidth}" height="18" fill="${theme.chipBg}" rx="9" ry="9" />
    ${text(langChipX + 10, langChipY + 9, theme.chipText, language, 10, 700)}

    <a href="${escapeXml(copyHref)}" target="_blank">
      <rect x="${copyX}" y="${copyY}" width="${copyWidth}" height="${copyHeight}" fill="${theme.buttonBg}" stroke="${theme.buttonBorder}" rx="9" ry="9" />
      <rect x="${copyX + 13}" y="${copyY + 9}" width="10" height="11" fill="none" stroke="${theme.copyIcon}" rx="2" ry="2" />
      <rect x="${copyX + 15}" y="${copyY + 7}" width="10" height="3" fill="${theme.copyIcon}" rx="1.5" ry="1.5" />
      ${text(copyX + 34, copyY + 16, theme.buttonText, "Copy", 11, 700)}
    </a>

    <rect x="${promptPanelX}" y="${promptPanelY}" width="${promptPanelWidth}" height="${promptPanelHeight}" fill="${theme.promptSurface}" stroke="${theme.promptBorder}" rx="14" ry="14" />
    <rect x="${promptPanelX + 12}" y="${promptPanelY + 14}" width="4" height="${Math.max(26, bodyHeight - 4)}" fill="${theme.accent}" fill-opacity="0.85" rx="2" ry="2" />
    ${body}
    ${text(promptTextX, promptTextY + lines.length * lineHeight + 2, theme.ghostText, "Type your message...", Math.max(11, fontSize - 3), 500, "hanging")}

    <rect x="${promptPanelX + 10}" y="${toolbarY}" width="${promptPanelWidth - 20}" height="${toolbarHeight}" fill="${theme.toolbar}" rx="10" ry="10" />
    <rect x="${promptPanelX + 18}" y="${toolbarY + 9}" width="94" height="20" fill="${theme.chipBg}" rx="10" ry="10" />
    ${text(promptPanelX + 30, toolbarY + 19, theme.chipText, modelChip, 10, 700)}
    <rect x="${promptPanelX + 120}" y="${toolbarY + 9}" width="90" height="20" fill="${theme.chipAltBg}" rx="10" ry="10" />
    ${text(promptPanelX + 132, toolbarY + 19, theme.chipAltText, infoChip, 10, 700)}
    ${text(promptPanelX + 224, toolbarY + 19, theme.footerText, "Ready", 10, 700)}

    <rect x="${sendX - 1}" y="${sendY - 1}" width="${sendWidth + 2}" height="${sendHeight + 2}" fill="${theme.sendGlow}" rx="10" ry="10" />
    <rect x="${sendX}" y="${sendY}" width="${sendWidth}" height="${sendHeight}" fill="${theme.sendBg}" rx="9" ry="9" />
    ${text(sendX + 18, sendY + 14, theme.sendText, "Send", 11, 700)}
    <path d="M ${sendX + 56} ${sendY + 14} l 8 -4 l -2 4 l 2 4 z" fill="${theme.sendText}" />
  </g>
</svg>`;
}
