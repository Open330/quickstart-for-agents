import { THEMES } from "./themes.js";

export function renderGeneratorHtml() {
  const themeOptions = Object.keys(THEMES).map(key =>
    `<option value="${key}">${THEMES[key].name}</option>`
  ).join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Quickstart For Agents - Generator</title>
    <style>
      :root {
        --bg: #0f172a;
        --panel: #1e293b;
        --border: #334155;
        --text: #e2e8f0;
        --accent: #38bdf8;
        --muted: #94a3b8;
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        min-height: 100vh;
        background: var(--bg);
        color: var(--text);
        font-family: system-ui, -apple-system, sans-serif;
        display: grid;
        place-items: center;
        padding: 20px;
      }
      .container {
        width: 100%;
        max-width: 1000px;
        display: grid;
        gap: 24px;
      }
      header {
        text-align: center;
        margin-bottom: 20px;
      }
      h1 {
        margin: 0;
        font-size: 2rem;
        background: linear-gradient(to right, #38bdf8, #818cf8);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      p {
        color: var(--muted);
        margin-top: 8px;
      }
      .card {
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      .controls {
        display: grid;
        gap: 16px;
        grid-template-columns: 1fr 1fr;
      }
      .full-width {
        grid-column: 1 / -1;
      }
      label {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 6px;
        color: var(--muted);
      }
      input, select, textarea {
        width: 100%;
        background: #0f172a;
        border: 1px solid var(--border);
        border-radius: 6px;
        padding: 8px 12px;
        color: var(--text);
        font-family: inherit;
        font-size: 0.9rem;
      }
      textarea {
        min-height: 120px;
        resize: vertical;
        font-family: "JetBrains Mono", monospace;
      }
      input:focus, select:focus, textarea:focus {
        outline: 2px solid var(--accent);
        border-color: transparent;
      }
      .preview-area {
        margin-top: 16px;
        border: 1px dashed var(--border);
        border-radius: 8px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #0b1020;
        overflow: hidden;
        min-height: 120px;
        gap: 0;
      }
      .preview-area img {
        max-width: 100%;
        height: auto;
        display: block;
      }
      .preview-codeblock {
        background: #161b22;
        color: #c9d1d9;
        font-family: "JetBrains Mono", monospace;
        font-size: 13px;
        padding: 12px 16px;
        width: 100%;
        max-width: 600px;
        white-space: pre-wrap;
        word-break: break-all;
      }
      .code-block {
        background: #0f172a;
        padding: 16px;
        border-radius: 6px;
        overflow-x: auto;
        font-family: "JetBrains Mono", monospace;
        font-size: 0.85rem;
        color: #a5b4fc;
        border: 1px solid var(--border);
        position: relative;
      }
      .copy-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        background: var(--border);
        color: var(--text);
        border: none;
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 0.75rem;
        cursor: pointer;
      }
      .copy-btn:hover {
        background: var(--accent);
        color: #fff;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>Quickstart For Agents</h1>
        <p>Create beautiful, copy-paste ready prompts for your READMEs.</p>
      </header>

      <div class="card">
        <div class="controls">
          <div>
            <label for="theme">Theme</label>
            <select id="theme">
              ${themeOptions}
            </select>
          </div>
          <div>
            <label for="title">Title</label>
            <input type="text" id="title" value="Quickstart For Agents" placeholder="Header title">
          </div>
          <div class="full-width">
            <label for="code-input">Code (for codeblock)</label>
            <textarea id="code-input" placeholder="npm install -g @anthropic-ai/claude-code" style="min-height:80px">npm install -g @anthropic-ai/claude-code</textarea>
          </div>
          <div>
            <label for="lang-input">Language</label>
            <input type="text" id="lang-input" value="bash" placeholder="bash, python, js...">
          </div>
          <div>
            <label for="width-input">Width (px)</label>
            <input type="number" id="width-input" value="600" min="300" max="1280">
          </div>
          <div class="full-width">
            <label for="footer-text">Footer Text <span style="color:var(--border);font-weight:400">(overrides tokens/model if set)</span></label>
            <input type="text" id="footer-text" placeholder="copy this prompt · paste into your agent · get a styled README">
          </div>
          <div>
            <label for="tokens-input">Tokens</label>
            <input type="text" id="tokens-input" placeholder="12.4k">
          </div>
          <div>
            <label for="model-input">Model</label>
            <input type="text" id="model-input" placeholder="Opus 4.6">
          </div>
        </div>
      </div>

      <div class="card">
        <label>Preview</label>
        <div class="preview-area" id="preview-container">
          <!-- Preview injected here -->
        </div>
      </div>

      <div class="card">
        <label>Markdown Code (for README.md)</label>
        <div class="code-block">
          <button class="copy-btn" id="copy-markdown">Copy</button>
          <pre id="markdown-output"></pre>
        </div>
      </div>
    </div>

    <script>
      const themeInput = document.getElementById("theme");
      const titleInput = document.getElementById("title");
      const codeInput = document.getElementById("code-input");
      const langInput = document.getElementById("lang-input");
      const widthInput = document.getElementById("width-input");
      const footerTextInput = document.getElementById("footer-text");
      const tokensInput = document.getElementById("tokens-input");
      const modelInput = document.getElementById("model-input");
      const previewContainer = document.getElementById("preview-container");
      const markdownOutput = document.getElementById("markdown-output");
      const copyBtn = document.getElementById("copy-markdown");

      function update() {
        const host = window.location.origin;
        const theme = themeInput.value;
        const title = encodeURIComponent(titleInput.value.trim() || "Quickstart For Agents");
        const lang = langInput.value.trim() || "bash";
        const code = codeInput.value.trim() || "# your command here";
        const width = Math.min(1280, Math.max(300, parseInt(widthInput.value) || 600));
        const langParam = encodeURIComponent(lang);
        const footerText = footerTextInput.value.trim();
        const tokens = tokensInput.value.trim();
        const model = modelInput.value.trim();
        const headerUrl = \`\${host}/api/header.svg?theme=\${theme}&title=\${title}&lang=\${langParam}&width=\${width}\`;
        let footerUrl = \`\${host}/api/footer.svg?theme=\${theme}&width=\${width}\`;
        if (footerText) {
          footerUrl += \`&text=\${encodeURIComponent(footerText)}\`;
        } else {
          if (tokens) footerUrl += \`&tokens=\${encodeURIComponent(tokens)}\`;
          if (model) footerUrl += \`&model=\${encodeURIComponent(model)}\`;
        }

        previewContainer.innerHTML = \`<img src="\${headerUrl}" alt="Header" style="max-width:\${width}px;width:100%" /><div class="preview-codeblock" style="max-width:\${width}px">\${escapeHtml(code)}</div><img src="\${footerUrl}" alt="Footer" style="max-width:\${width}px;width:100%" />\`;

        const backticks = "\\\`\\\`\\\`";
        const md = \`<div><img src="\${headerUrl}" width="100%" /></div>\\n\\n\${backticks}\${lang}\\n\${code}\\n\${backticks}\\n\\n<div><img src="\${footerUrl}" width="100%" /></div>\`;
        markdownOutput.textContent = md;
      }

      function escapeHtml(s) {
        return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
      }

      themeInput.addEventListener("change", update);
      titleInput.addEventListener("input", update);
      codeInput.addEventListener("input", update);
      langInput.addEventListener("input", update);
      widthInput.addEventListener("input", update);
      footerTextInput.addEventListener("input", update);
      tokensInput.addEventListener("input", update);
      modelInput.addEventListener("input", update);

      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(markdownOutput.textContent).then(() => {
          const original = copyBtn.textContent;
          copyBtn.textContent = "Copied!";
          setTimeout(() => copyBtn.textContent = original, 2000);
        });
      });

      update();
    </script>
  </body>
</html>`;
}
