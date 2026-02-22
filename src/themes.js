export const THEMES = {
  "opencode": {
    name: "OpenCode",
    background: "#0b1020",
    panel: "#131c30",
    header: "#0f172a",
    border: "#2b3a52",
    shell: "#0d1526",
    shellBorder: "#334155",
    promptSurface: "#111d31",
    promptBorder: "#3b4d69",
    toolbar: "#0d1729",
    buttonBg: "#16243c",
    buttonBorder: "#36506f",
    buttonText: "#dbeafe",
    copyIcon: "#93c5fd",
    sendBg: "#22d3ee",
    sendText: "#06242b",
    chipBg: "#172338",
    chipText: "#9db6db",
    text: "#e5e7eb",
    muted: "#9aa9c0",
    accent: "#22d3ee",
    language: "#67e8f9",
    lineNumber: "#64748b"
  },
  "claude-code": {
    name: "Claude Code",
    background: "#f8f4ea",
    panel: "#fffaf0",
    header: "#eee5d2",
    border: "#d8c8aa",
    shell: "#fffaf2",
    shellBorder: "#d0bf9f",
    promptSurface: "#fff4df",
    promptBorder: "#d9c39d",
    toolbar: "#f4e8d2",
    buttonBg: "#f2e4cd",
    buttonBorder: "#cfb58e",
    buttonText: "#5b4530",
    copyIcon: "#8f6038",
    sendBg: "#c26f29",
    sendText: "#fff8ef",
    chipBg: "#e8d7b9",
    chipText: "#6b5439",
    text: "#2d2a24",
    muted: "#8a7d68",
    accent: "#c26f29",
    language: "#8f4a15",
    lineNumber: "#9a8a71"
  },
  "github-dark": {
    name: "GitHub Dark",
    background: "#0d1117",
    panel: "#161b22",
    header: "#161b22",
    border: "#30363d",
    shell: "#0f141b",
    shellBorder: "#30363d",
    promptSurface: "#161b22",
    promptBorder: "#30363d",
    toolbar: "#0f141b",
    buttonBg: "#21262d",
    buttonBorder: "#30363d",
    buttonText: "#c9d1d9",
    copyIcon: "#8b949e",
    sendBg: "#238636",
    sendText: "#f0fff4",
    chipBg: "#21262d",
    chipText: "#8b949e",
    text: "#c9d1d9",
    muted: "#8b949e",
    accent: "#58a6ff",
    language: "#79c0ff",
    lineNumber: "#6e7681"
  }
};

export function resolveTheme(themeName) {
  if (!themeName) {
    return THEMES["opencode"];
  }
  return THEMES[themeName] || THEMES["opencode"];
}
