import { normalizePrompt } from "./render.js";
import { resolveTheme } from "./themes.js";

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function renderPromptHtml(options = {}) {
  const theme = resolveTheme(options.theme);
  const title = (options.title || "Quickstart For Agents").slice(0, 40);
  const language = (options.language || "prompt").slice(0, 16);
  const prompt = normalizePrompt(options.prompt);
  const width = clamp(Number.parseInt(options.width, 10) || 760, 420, 1280);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
      :root {
        color-scheme: light dark;
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
        background: linear-gradient(135deg, ${theme.background}, ${theme.panel});
        font-family: "JetBrains Mono", "Fira Code", monospace;
      }
      .shell {
        width: min(${width}px, 100%);
        border-radius: 18px;
        border: 1px solid ${theme.shellBorder};
        background: ${theme.shell};
        padding: 16px;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
      }
      .meta {
        min-width: 0;
      }
      .meta small {
        color: ${theme.muted};
        font-weight: 700;
        font-size: 11px;
        display: block;
      }
      .meta strong {
        color: ${theme.text};
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
      }
      .actions {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .chip {
        background: ${theme.chipBg};
        color: ${theme.chipText};
        border-radius: 999px;
        padding: 4px 10px;
        font-size: 10px;
        font-weight: 700;
      }
      .copy-btn {
        border: 1px solid ${theme.buttonBorder};
        background: ${theme.buttonBg};
        color: ${theme.buttonText};
        border-radius: 9px;
        padding: 6px 12px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
      }
      .prompt {
        margin-top: 12px;
        border: 1px solid ${theme.promptBorder};
        border-radius: 14px;
        background: ${theme.promptSurface};
        padding: 14px;
      }
      .prompt pre {
        margin: 0;
        color: ${theme.text};
        white-space: pre-wrap;
        word-break: break-word;
        font-size: 15px;
        line-height: 1.45;
      }
      .prompt .prefix {
        color: ${theme.accent};
        font-weight: 700;
        margin-right: 6px;
      }
      .toolbar {
        margin-top: 12px;
        border-radius: 10px;
        background: ${theme.toolbar};
        padding: 6px 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
      .toolbar .info {
        color: ${theme.chipText};
        font-size: 11px;
      }
      .send {
        border: none;
        border-radius: 9px;
        background: ${theme.sendBg};
        color: ${theme.sendText};
        font-weight: 700;
        padding: 6px 14px;
      }
    </style>
  </head>
  <body>
    <div class="shell">
      <div class="header">
        <div class="meta">
          <small>${escapeHtml(theme.name)} Input</small>
          <strong>${escapeHtml(title)}</strong>
        </div>
        <div class="actions">
          <span class="chip">${escapeHtml(language)}</span>
          <button class="copy-btn" id="copy-btn" type="button">Copy</button>
        </div>
      </div>
      <div class="prompt">
        <pre id="prompt-text"><span class="prefix">&gt;</span>${escapeHtml(prompt)}</pre>
        <div class="toolbar">
          <span class="info">${prompt.split("\n").length} lines</span>
          <button class="send" type="button">Send</button>
        </div>
      </div>
    </div>
    <script>
      const button = document.getElementById("copy-btn");
      const promptText = ${JSON.stringify(prompt)};
      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(promptText);
          const previous = button.textContent;
          button.textContent = "Copied";
          setTimeout(() => {
            button.textContent = previous;
          }, 1200);
        } catch (error) {
          button.textContent = "Copy failed";
          setTimeout(() => {
            button.textContent = "Copy";
          }, 1200);
        }
      });
    </script>
  </body>
</html>`;
}

