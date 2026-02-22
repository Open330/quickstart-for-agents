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

function wrapPrompt(prompt, width, fontSize) {
  const safeCharWidth = Math.max(7, Math.floor(fontSize * 0.61));
  const available = Math.max(180, width - 150);
  const maxChars = Math.max(18, Math.floor(available / safeCharWidth));
  const lines = [];

  for (const rawLine of prompt.split("\n")) {
    const wrapped = wrapLine(rawLine, maxChars);
    lines.push(...wrapped);
  }
  return lines.slice(0, 25);
}

function text(x, y, fill, content, size = 12, weight = 500, baseline = "middle") {
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="${size}" font-weight="${weight}" dominant-baseline="${baseline}">${escapeXml(content)}</text>`;
}

export function renderPromptSvg(options = {}) {
  const theme = resolveTheme(options.theme);
  const width = clamp(Number.parseInt(options.width, 10) || 700, 420, 1200);
  const fontSize = clamp(Number.parseInt(options.fontSize, 10) || 16, 12, 20);
  const language = (options.language || "prompt").slice(0, 16);
  const title = (options.title || "Quickstart For Agents").slice(0, 40);
  const prompt = normalizePrompt(options.prompt);
  const copyHref = options.copyHref || `/api/prompt.txt?prompt=${encodeURIComponent(prompt)}`;
  const lines = wrapPrompt(prompt, width, fontSize);
  const lineHeight = Math.round(fontSize * 1.45);

  const framePad = 16;
  const shellX = framePad;
  const shellY = framePad;
  const shellWidth = width - framePad * 2;
  const headerHeight = 44;
  const promptPanelX = shellX + 14;
  const promptPanelY = shellY + headerHeight + 8;
  const promptPanelWidth = shellWidth - 28;
  const promptTextX = promptPanelX + 34;
  const markerX = promptPanelX + 16;
  const promptTextY = promptPanelY + 16;
  const bodyHeight = Math.max(36, lines.length * lineHeight);
  const toolbarHeight = 34;
  const promptPanelHeight = 16 + bodyHeight + 12 + toolbarHeight + 10;
  const shellHeight = headerHeight + 8 + promptPanelHeight + 14;
  const height = shellY + shellHeight + framePad;

  const body = lines
    .map((line, index) => {
      const y = promptTextY + index * lineHeight;
      const marker = index === 0 ? ">" : " ";
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

  const copyWidth = 86;
  const copyHeight = 26;
  const copyX = shellX + shellWidth - copyWidth - 14;
  const copyY = shellY + 10;
  const langChipWidth = Math.max(56, Math.min(122, language.length * 8 + 20));
  const langChipX = copyX - langChipWidth - 10;
  const langChipY = shellY + 14;
  const toolbarY = promptPanelY + promptPanelHeight - toolbarHeight - 8;
  const sendWidth = 74;
  const sendHeight = 24;
  const sendX = promptPanelX + promptPanelWidth - sendWidth - 12;
  const sendY = toolbarY + 5;
  const linesLabel = `${lines.length} line${lines.length === 1 ? "" : "s"}`;

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
  <rect width="${width}" height="${height}" fill="url(#bg-gradient)" rx="22" ry="22" />
  <rect x="${shellX}" y="${shellY}" width="${shellWidth}" height="${shellHeight}" fill="${theme.shell}" stroke="${theme.shellBorder}" rx="16" ry="16" />
  ${text(shellX + 18, shellY + 17, theme.muted, `${theme.name} Input`, 11, 700)}
  ${text(shellX + 18, shellY + 32, theme.text, title, 13, 600)}

  <rect x="${langChipX}" y="${langChipY}" width="${langChipWidth}" height="18" fill="${theme.chipBg}" rx="9" ry="9" />
  ${text(langChipX + 10, langChipY + 9, theme.chipText, language, 10, 700)}

  <a href="${escapeXml(copyHref)}" target="_blank">
    <rect x="${copyX}" y="${copyY}" width="${copyWidth}" height="${copyHeight}" fill="${theme.buttonBg}" stroke="${theme.buttonBorder}" rx="9" ry="9" />
    <rect x="${copyX + 12}" y="${copyY + 7}" width="10" height="12" fill="none" stroke="${theme.copyIcon}" rx="2" ry="2" />
    <rect x="${copyX + 14}" y="${copyY + 5}" width="10" height="3" fill="${theme.copyIcon}" rx="1.5" ry="1.5" />
    ${text(copyX + 32, copyY + 14, theme.buttonText, "Copy", 11, 700)}
  </a>

  <rect x="${promptPanelX}" y="${promptPanelY}" width="${promptPanelWidth}" height="${promptPanelHeight}" fill="${theme.promptSurface}" stroke="${theme.promptBorder}" rx="13" ry="13" />
  ${body}

  <rect x="${promptPanelX + 10}" y="${toolbarY}" width="${promptPanelWidth - 20}" height="${toolbarHeight}" fill="${theme.toolbar}" rx="10" ry="10" />
  <rect x="${promptPanelX + 20}" y="${toolbarY + 7}" width="96" height="20" fill="${theme.chipBg}" rx="10" ry="10" />
  ${text(promptPanelX + 30, toolbarY + 17, theme.chipText, linesLabel, 10, 700)}
  <rect x="${sendX}" y="${sendY}" width="${sendWidth}" height="${sendHeight}" fill="${theme.sendBg}" rx="9" ry="9" />
  ${text(sendX + 20, sendY + 12, theme.sendText, "Send", 11, 700)}
  <path d="M ${sendX + 53} ${sendY + 12} l 8 -4 l -2 4 l 2 4 z" fill="${theme.sendText}" />
</svg>`;
}
