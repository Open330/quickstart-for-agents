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

| Endpoint | Description | 설명 |
|----------|-------------|------|
| `GET /api/header.svg` | Themed header SVG | 코드 블록 위에 배치하는 테마별 헤더 이미지 |
| `GET /api/footer.svg` | Themed footer SVG | 코드 블록 아래에 배치하는 테마별 푸터 이미지 |
| `GET /api/snippet` | Ready-to-paste markdown snippet | 복사해서 바로 붙여넣기 가능한 마크다운 코드 조각 |

### Header params — `GET /api/header.svg`

| Param | Type | Default | Description | 설명 |
|-------|------|---------|-------------|------|
| `theme` | `string` | `opencode` | Visual theme to apply | 적용할 테마. `claude-code`, `opencode`, `codex` 등 선택 |
| `title` | `string` | Theme name | Prompt text shown in the header | 헤더에 표시되는 프롬프트 텍스트 (최대 60자) |
| `lang` | `string` | — | Language label on the right side | 우측에 표시되는 언어/태그 라벨 (예: `Agents`, `TypeScript`) |
| `width` | `number` | `800` | SVG width in pixels (300–1280) | SVG 이미지 너비. 300~1280px 범위 |
| `mascot` | `string` | `default` | Clawd mascot variant | 마스코트 변형: `default` `hat` `thinking` `wave` (claude-code 테마 전용) |
| `logo` | `string` | `opencode` | Custom logo text replacing "opencode" | 로고 텍스트 커스터마이즈 (opencode 테마 전용, 최대 30자) |
| `font` | `string` | `mono` | Font preset or custom font-family | 폰트 변경. 프리셋: `mono` `sans` `serif` `fira` `cascadia` `iosevka`. 또는 직접 font-family 문자열 입력 |

### Footer params — `GET /api/footer.svg`

| Param | Type | Default | Description | 설명 |
|-------|------|---------|-------------|------|
| `theme` | `string` | `opencode` | Visual theme (must match header) | 테마 (헤더와 동일하게 맞춰야 함) |
| `text` | `string` | — | Custom text (overrides all below) | 커스텀 텍스트. 설정 시 아래 파라미터 모두 무시됨 |
| `tokens` | `string` | `—` | Token count display | 토큰 사용량 표시 (예: `12.4k`) |
| `model` | `string` | `Opus 4.6` | Model name display | 모델 이름 표시 (예: `Claude Opus 4.6`, `GPT-4.1`) |
| `project` | `string` | `quickstart-for-agents` | Project name in powerline | 프로젝트 이름 (claude-code 테마의 powerline 영역) |
| `agent` | `string` | `Agents` | Agent name label | 에이전트 이름 표시 (opencode/codex 테마) |
| `font` | `string` | `mono` | Font preset or custom font-family | 폰트 변경 (헤더와 동일한 값 권장) |

### Font presets — `?font=`

| Preset | Font stack | 설명 |
|--------|-----------|------|
| `mono` | JetBrains Mono → Fira Code → Cascadia Code → SF Mono | 기본값. 터미널/코딩 느낌의 모노스페이스 |
| `sans` | SF Pro → Segoe UI → Helvetica Neue → system-ui | 깔끔한 산세리프. UI/대시보드 느낌 |
| `serif` | Georgia → Noto Serif → Times New Roman | 클래식한 세리프. 문서/논문 느낌 |
| `fira` | Fira Code → JetBrains Mono | Mozilla의 코딩 폰트. 리가처 지원 |
| `cascadia` | Cascadia Code → Fira Code | Microsoft의 터미널 폰트 |
| `iosevka` | Iosevka → Fira Code | 좁은 폭의 코딩 폰트 |
| *(custom)* | Your own font-family string | 직접 CSS font-family 문자열 입력 가능 |

> [!NOTE]
> SVG는 뷰어의 로컬 폰트를 사용합니다. 지정한 폰트가 없으면 fallback 폰트가 적용됩니다.
> GitHub에서는 system font만 사용 가능하므로 `mono`나 `sans`를 권장합니다.

### Available themes

| Theme | Style | 설명 |
|-------|-------|------|
| `claude-code` | Pixel art Clawd mascot + powerline footer | Claude Code CLI 스타일. Clawd 마스코트 + powerline 상태바 |
| `opencode` | Dual-tone logo + cyan accent bar | OpenCode TUI 스타일. 시안 액센트 + 커스텀 로고 지원 |
| `codex` | Terminal prompt `>` + green accent | Codex CLI 스타일. 그린 터미널 프롬프트 |
| `github-dark` | Minimal, matches GitHub dark code blocks | GitHub 다크모드 코드 블록과 동일한 미니멀 스타일 |
| `vscode-dark` | VS Code Dark+ colors | VS Code Dark+ 테마 색상 |
| `vscode-light` | VS Code Light+ colors | VS Code Light+ 테마 색상 |

---

<div align="center">
<sub>Built with zero dependencies &middot; SVG generated on the fly &middot; Works on any GitHub README</sub>
</div>
