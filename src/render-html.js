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
  const themeName = (options.theme || "opencode").slice(0, 32);
  const theme = resolveTheme(themeName);
  const title = (options.title || "Quickstart For Agents").slice(0, 40);
  const language = (options.language || "prompt").slice(0, 16);
  const prompt = normalizePrompt(options.prompt);
  const width = clamp(Number.parseInt(options.width, 10) || 820, 460, 1280);
  const autoCopy = options.autoCopy === true || options.autoCopy === "1";
  const modelChip = themeName === "claude-code" ? "claude-3.7" : themeName === "github-dark" ? "gpt-4.1" : "opencode";
  const subtitle = themeName === "claude-code" ? "Message Composer" : "Prompt Composer";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
        background: linear-gradient(140deg, ${theme.background}, ${theme.panel});
        font-family: "JetBrains Mono", "Fira Code", monospace;
      }
      .glow {
        position: fixed;
        inset: 0;
        pointer-events: none;
        background:
          radial-gradient(64% 46% at 50% 0%, ${theme.canvasGlow}44 0%, transparent 72%),
          radial-gradient(42% 30% at 95% 95%, ${theme.canvasGlow}22 0%, transparent 72%);
      }
      .shell {
        position: relative;
        width: min(${width}px, 100%);
        border-radius: 22px;
        border: 1px solid ${theme.shellBorder};
        background: linear-gradient(180deg, ${theme.shellTop}, ${theme.shell});
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.24);
        overflow: hidden;
      }
      .header {
        padding: 14px 18px;
        border-bottom: 1px solid ${theme.promptBorder};
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
      .meta {
        min-width: 0;
      }
      .meta small {
        display: block;
        color: ${theme.muted};
        font-size: 11px;
        font-weight: 700;
      }
      .meta strong {
        display: block;
        margin-top: 4px;
        color: ${theme.text};
        font-size: 14px;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .actions {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .chip {
        padding: 4px 11px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 700;
      }
      .chip.lang {
        background: ${theme.chipBg};
        color: ${theme.chipText};
      }
      .copy-btn {
        border: 1px solid ${theme.buttonBorder};
        background: ${theme.buttonBg};
        color: ${theme.buttonText};
        border-radius: 10px;
        padding: 7px 12px;
        font-size: 12px;
        font-weight: 700;
        line-height: 1;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .copy-btn[disabled] {
        opacity: 0.78;
        cursor: default;
      }
      .copy-icon {
        width: 12px;
        height: 12px;
        border: 1.5px solid ${theme.copyIcon};
        border-radius: 2px;
        display: inline-block;
        position: relative;
      }
      .copy-icon::before {
        content: "";
        position: absolute;
        left: 2px;
        top: -4px;
        width: 9px;
        height: 3px;
        border-radius: 2px;
        background: ${theme.copyIcon};
      }
      .composer {
        padding: 16px;
      }
      .prompt {
        border: 1px solid ${theme.promptBorder};
        border-radius: 15px;
        background: ${theme.promptSurface};
        padding: 14px 14px 12px;
      }
      .prompt-body {
        display: flex;
        gap: 10px;
        align-items: flex-start;
      }
      .prefix {
        width: 10px;
        color: ${theme.accent};
        font-weight: 700;
        line-height: 1.45;
        user-select: none;
      }
      pre {
        margin: 0;
        color: ${theme.text};
        white-space: pre-wrap;
        word-break: break-word;
        font-size: 15px;
        line-height: 1.45;
      }
      .ghost {
        margin-top: 8px;
        margin-left: 20px;
        color: ${theme.ghostText};
        font-size: 12px;
      }
      .toolbar {
        margin-top: 12px;
        border-radius: 11px;
        background: ${theme.toolbar};
        padding: 7px 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
      .toolbar-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .chip.model {
        background: ${theme.chipBg};
        color: ${theme.chipText};
      }
      .chip.info {
        background: ${theme.chipAltBg};
        color: ${theme.chipAltText};
      }
      .status {
        margin-left: 2px;
        color: ${theme.footerText};
        font-size: 11px;
      }
      .status[data-state="ok"] {
        color: ${theme.sendBg};
      }
      .status[data-state="warn"] {
        color: ${theme.accent};
      }
      .send-wrap {
        border-radius: 10px;
        padding: 1px;
        background: ${theme.sendGlow};
      }
      .send {
        border: none;
        border-radius: 9px;
        background: ${theme.sendBg};
        color: ${theme.sendText};
        font-weight: 700;
        font-size: 11px;
        padding: 7px 16px;
        font-family: inherit;
      }
      .manual {
        margin-top: 12px;
        border: 1px dashed ${theme.buttonBorder};
        background: ${theme.buttonBg};
        border-radius: 10px;
        padding: 10px;
      }
      .manual p {
        margin: 0 0 6px;
        color: ${theme.buttonText};
        font-size: 12px;
      }
      .manual textarea {
        width: 100%;
        min-height: 90px;
        resize: vertical;
        border-radius: 8px;
        border: 1px solid ${theme.promptBorder};
        background: ${theme.promptSurface};
        color: ${theme.text};
        padding: 8px;
        font-family: inherit;
      }
    </style>
  </head>
  <body>
    <div class="glow" aria-hidden="true"></div>
    <main class="shell">
      <header class="header">
        <div class="meta">
          <small>${escapeHtml(theme.name)} ${escapeHtml(subtitle)}</small>
          <strong>${escapeHtml(title)}</strong>
        </div>
        <div class="actions">
          <span class="chip lang">${escapeHtml(language)}</span>
          <button class="copy-btn" id="copy-btn" type="button">
            <span class="copy-icon" aria-hidden="true"></span>
            <span id="copy-label">Copy</span>
          </button>
        </div>
      </header>

      <section class="composer">
        <div class="prompt">
          <div class="prompt-body">
            <span class="prefix" aria-hidden="true">&gt;</span>
            <pre id="prompt-text">${escapeHtml(prompt)}</pre>
          </div>
          <div class="ghost">Type your message...</div>

          <div class="toolbar">
            <div class="toolbar-left">
              <span class="chip model">${escapeHtml(modelChip)}</span>
              <span class="chip info">${prompt.split("\n").length} lines</span>
              <span class="status" id="copy-status">Ready</span>
            </div>
            <div class="send-wrap"><button class="send" type="button">Send</button></div>
          </div>
        </div>

        <div class="manual" id="manual-copy" hidden>
          <p>Copy failed automatically. Use manual copy below.</p>
          <textarea id="manual-text" readonly>${escapeHtml(prompt)}</textarea>
        </div>
      </section>
    </main>

    <script>
      const promptText = ${JSON.stringify(prompt)};
      const autoCopy = ${autoCopy ? "true" : "false"};
      const copyBtn = document.getElementById("copy-btn");
      const copyLabel = document.getElementById("copy-label");
      const status = document.getElementById("copy-status");
      const manual = document.getElementById("manual-copy");
      const manualText = document.getElementById("manual-text");

      function setStatus(state, message) {
        status.dataset.state = state;
        status.textContent = message;
      }

      function showManualFallback() {
        manual.hidden = false;
        manualText.focus();
        manualText.select();
      }

      async function copyWithClipboardApi(text) {
        if (!navigator.clipboard || !window.isSecureContext) {
          return { ok: false, method: "clipboard-api" };
        }
        try {
          await navigator.clipboard.writeText(text);
          return { ok: true, method: "clipboard-api" };
        } catch (error) {
          return { ok: false, method: "clipboard-api" };
        }
      }

      function copyWithExecCommand(text) {
        try {
          const textArea = document.createElement("textarea");
          textArea.value = text;
          textArea.setAttribute("readonly", "");
          textArea.style.position = "fixed";
          textArea.style.top = "-9999px";
          textArea.style.left = "-9999px";
          document.body.append(textArea);
          textArea.select();
          const success = document.execCommand("copy");
          textArea.remove();
          return { ok: success, method: "exec-command" };
        } catch (error) {
          return { ok: false, method: "exec-command" };
        }
      }

      async function copyPrompt() {
        const first = await copyWithClipboardApi(promptText);
        if (first.ok) {
          return first;
        }
        return copyWithExecCommand(promptText);
      }

      async function handleCopy() {
        copyBtn.disabled = true;
        const previous = copyLabel.textContent;
        const result = await copyPrompt();

        if (result.ok) {
          copyLabel.textContent = "Copied";
          setStatus("ok", "Copied via " + result.method);
          manual.hidden = true;
          setTimeout(() => {
            copyLabel.textContent = previous;
            setStatus("", "Ready");
          }, 1200);
        } else {
          copyLabel.textContent = "Select";
          setStatus("warn", "Copy blocked by browser");
          showManualFallback();
        }

        copyBtn.disabled = false;
      }

      copyBtn.addEventListener("click", () => {
        void handleCopy();
      });

      if (autoCopy) {
        window.addEventListener("load", () => {
          void handleCopy();
        });
      }
    </script>
  </body>
</html>`;
}
