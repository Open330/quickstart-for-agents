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
        margin-top: 24px;
        border: 1px dashed var(--border);
        border-radius: 8px;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #0b1020; /* Default preview bg */
        overflow: hidden;
        min-height: 200px;
      }
      .preview-area img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
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
          <div class="full-width">
            <label for="prompt">Prompt Text</label>
            <textarea id="prompt" placeholder="Enter your prompt here...">Build a REST API for billing...</textarea>
          </div>
          <div>
            <label for="theme">Theme</label>
            <select id="theme">
              ${themeOptions}
            </select>
          </div>
          <div>
            <label for="title">Title</label>
            <input type="text" id="title" value="Quickstart For Agents" placeholder="Card Title">
          </div>
        </div>
      </div>

      <div class="card">
        <label>Preview</label>
        <div class="preview-area" id="preview-container">
          <!-- Image will be injected here -->
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
      const promptInput = document.getElementById("prompt");
      const themeInput = document.getElementById("theme");
      const titleInput = document.getElementById("title");
      const previewContainer = document.getElementById("preview-container");
      const markdownOutput = document.getElementById("markdown-output");
      const copyBtn = document.getElementById("copy-markdown");

      function update() {
        const prompt = encodeURIComponent(promptInput.value.trim() || "Your prompt here...");
        const theme = themeInput.value;
        const title = encodeURIComponent(titleInput.value.trim() || "Quickstart For Agents");
        
        const host = window.location.origin;
        const svgUrl = \`\${host}/api/block.svg?prompt=\${prompt}&theme=\${theme}&title=\${title}\`;
        const linkUrl = \`\${host}/api/copy?prompt=\${prompt}&theme=\${theme}&title=\${title}\`;

        previewContainer.innerHTML = \`<a href="\${linkUrl}" target="_blank"><img src="\${svgUrl}" alt="Prompt Preview" /></a>\`;

        const markdown = \`[![Prompt](\${svgUrl})](\${linkUrl})\`;
        markdownOutput.textContent = markdown;
      }

      promptInput.addEventListener("input", update);
      themeInput.addEventListener("change", update);
      titleInput.addEventListener("input", update);
      
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