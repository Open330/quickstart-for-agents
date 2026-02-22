export const THEMES = {
  "opencode": {
    name: "OpenCode",
    background: "#0f172a",
    panel: "#111827",
    header: "#1f2937",
    border: "#334155",
    text: "#e5e7eb",
    muted: "#94a3b8",
    accent: "#22d3ee",
    language: "#67e8f9",
    lineNumber: "#64748b"
  },
  "claude-code": {
    name: "Claude Code",
    background: "#f8f5ee",
    panel: "#fffdfa",
    header: "#efe8da",
    border: "#d6c8ad",
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

