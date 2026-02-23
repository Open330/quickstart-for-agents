<div align="center">

<div><img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=opencode&logo=Quickstart+For+Agents&title=Add+quickstart-for-agents+to+my+README.md+so+my+agent+prompts+look+like+a+real+terminal+UI+with+a+native+copy+button." width="100%" /></div>

```
Add quickstart-for-agents to my README.md so my agent prompts
look like a real terminal UI with a native copy button.
```
<div><img src="https://quickstart-for-agents.vercel.app/api/footer.svg?theme=opencode&text=zero+dependencies+%C2%B7+works+on+any+GitHub+README" width="100%" /></div>

<br />

**Terminal-themed SVG headers & footers for your agent prompts.**<br />
Wrap native GitHub code blocks — copy button works out of the box.

<br />

<a href="#themes">Themes</a>
&middot;
<a href="#quick-start">Quick Start</a>
&middot;
<a href="#api-reference">API Reference</a>
&middot;
<a href="https://github.com/Open330/quickstart-for-agents/issues">Report Bug</a>

<br /><br />

</div>

## How It Works

Paste a header SVG, a fenced code block, and a footer SVG into your README. GitHub renders the SVGs as images and keeps the code block's **native copy button** intact.

```md
<div><img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=claude-code&title=My+Agent&lang=Agents" width="100%" /></div>

​```
Your prompt for the LLM agent here.
​```
<div><img src="https://quickstart-for-agents.vercel.app/api/footer.svg?theme=claude-code&tokens=42&model=Opus+4.6" width="100%" /></div>
```

> [!TIP]
> Use `<div><img>` instead of `![]()` — the latter wraps in `<p>` tags with 16px margins, creating gaps between the header, code block, and footer.

---

## Themes

### Claude Code

<div><img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=claude-code&title=Fix+the+auth+middleware" width="100%" /></div>

```
Design retry and dead-letter handling for asynchronous workers
with clear failure budgets.
```
<div><img src="https://quickstart-for-agents.vercel.app/api/footer.svg?theme=claude-code&tokens=12.4k&model=Opus+4.6" width="100%" /></div>

<br />

<details>
<summary><strong>Mascot variants</strong> — <code>?mascot=default|hat|thinking|wave</code></summary>

<br />

| `default` | `hat` | `thinking` | `wave` |
|:---------:|:-----:|:----------:|:------:|
| <img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=claude-code&title=Fix+the+auth+middleware" width="200" /> | <img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=claude-code&title=Fix+the+auth+middleware&mascot=hat" width="200" /> | <img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=claude-code&title=Fix+the+auth+middleware&mascot=thinking" width="200" /> | <img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=claude-code&title=Fix+the+auth+middleware&mascot=wave" width="200" /> |

Pixel art mascot based on [Clawd](https://github.com/anthropics/claude-code), the Claude Code CLI mascot.

</details>

### OpenCode

<div><img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=opencode&title=Design+retry+and+dead-letter+handling" width="100%" /></div>

```
Design retry and dead-letter handling for asynchronous workers
with clear failure budgets.
```
<div><img src="https://quickstart-for-agents.vercel.app/api/footer.svg?theme=opencode&tokens=8.2k&model=Claude+Opus+4.6" width="100%" /></div>

> [!NOTE]
> Use `?logo=YourApp` to replace the "opencode" logo with your own text.

### Codex CLI

<div><img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=codex&title=Set+up+the+project+scaffolding" width="100%" /></div>

```
Design retry and dead-letter handling for asynchronous workers
with clear failure budgets.
```
<div><img src="https://quickstart-for-agents.vercel.app/api/footer.svg?theme=codex&tokens=5.1k&model=GPT-4.1" width="100%" /></div>

---

## Quick Start

```bash
npm start
```

The server starts at `http://localhost:3000`. Test it:

```
http://localhost:3000/api/header.svg?theme=claude-code&title=Hello&lang=Agents
```

### Live Service

The hosted version is live at:

```
https://quickstart-for-agents.vercel.app
```

---

## API Reference

### Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/header.svg` | Themed header SVG |
| `GET /api/footer.svg` | Themed footer SVG |
| `GET /api/snippet` | Ready-to-paste markdown snippet |

### Header params

| Param | Type | Description | Default |
|-------|------|-------------|---------|
| `theme` | `string` | Theme name | `opencode` |
| `title` | `string` | Prompt title text | Theme name |
| `lang` | `string` | Right-side label (e.g. `Agents`) | — |
| `width` | `number` | SVG width, 300–1280 | `800` |
| `mascot` | `string` | Clawd variant: `default` `hat` `thinking` `wave` | `default` |
| `logo` | `string` | Custom logo text (OpenCode theme) | `opencode` |

### Footer params

| Param | Type | Description | Default |
|-------|------|-------------|---------|
| `theme` | `string` | Theme name | `opencode` |
| `text` | `string` | Custom text (overrides all other params) | — |
| `tokens` | `string` | Token count | `—` |
| `model` | `string` | Model name | `Opus 4.6` |
| `project` | `string` | Project name (Claude Code) | `quickstart-for-agents` |
| `agent` | `string` | Agent name (OpenCode / Codex) | `Agents` |

### Available themes

| Theme | Style |
|-------|-------|
| `claude-code` | Pixel art Clawd mascot + powerline footer |
| `opencode` | Dual-tone logo + cyan accent bar |
| `codex` | Terminal prompt `>` + green accent |
| `github-dark` | Minimal, matches GitHub dark code blocks |
| `vscode-dark` | VS Code Dark+ colors |
| `vscode-light` | VS Code Light+ colors |

---

<div align="center">
<sub>Built with zero dependencies &middot; SVG generated on the fly &middot; Works on any GitHub README</sub>
</div>
