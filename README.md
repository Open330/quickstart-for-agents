<div align="center">

<div><img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=opencode&logo=Quickstart+For+Agents&title=Add+quickstart-for-agents+to+my+README.md+so+my+agent+prompts+look+like+a+real+terminal+UI+with+a+native+copy+button.&font=inter" width="100%" /></div>

```
Add quickstart-for-agents to my README.md so my agent prompts
look like a real terminal UI with a native copy button.
```
<div><img src="https://quickstart-for-agents.vercel.app/api/footer.svg?theme=opencode&text=zero+dependencies+%C2%B7+works+on+any+GitHub+README&font=inter" width="100%" /></div>

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

```
header.svg ← SVG 이미지 (logo, title, lang 등이 이미지 안에 렌더링됨)
  ?theme    = claude-code         테마
  &title    = My+Agent            로고 아래 프롬프트 텍스트 (SVG 안에 표시)
  &lang     = Agents              우측 라벨
  &logo     = My+App              로고 텍스트 (opencode 테마)
  &font     = inter               폰트
  &mascot   = hat                 마스코트 변형 (claude-code 테마)

code block ← GitHub 네이티브 마크다운 코드 블록 (복사 버튼 자동 생성)

footer.svg ← SVG 이미지 (tokens, model 등이 이미지 안에 렌더링됨)
  ?theme    = claude-code         테마 (헤더와 동일)
  &tokens   = 42                  토큰 수
  &model    = Opus+4.6            모델 이름
  &text     = custom+message      커스텀 텍스트 (설정 시 다른 옵션 무시)
  &font     = inter               폰트
```

Example:

```md
<div><img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=claude-code&title=My+Agent&lang=Agents" width="100%" /></div>

​```
Your prompt for the LLM agent here.
​```
<div><img src="https://quickstart-for-agents.vercel.app/api/footer.svg?theme=claude-code&tokens=42&model=Opus+4.6" width="100%" /></div>
```

> [!TIP]
> `?title=`은 SVG 이미지 안에 렌더링되는 프롬프트 텍스트입니다 (코드 블록과 별개).
> `<div><img>` 를 사용하세요 — `![]()` 는 `<p>` 태그로 감싸져 16px 여백이 생깁니다.

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

> [!TIP]
> 히어로 섹션의 텍스트는 `?title=`, `?logo=`, `?text=` 파라미터로 변경 가능합니다. 폰트는 `?font=`로 설정.

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
| `title` | `string` | Theme name | Prompt text rendered inside the SVG, below the logo | SVG 이미지 안에 로고 아래 렌더링되는 프롬프트 텍스트 (최대 60자) |
| `lang` | `string` | — | Language label on the right side | 우측에 표시되는 언어/태그 라벨 (예: `Agents`, `TypeScript`) |
| `width` | `number` | `800` | SVG width in pixels (300–1280) | SVG 이미지 너비. 300~1280px 범위 |
| `mascot` | `string` | `default` | Clawd mascot variant | 마스코트 변형: `default` `hat` `thinking` `wave` (claude-code 테마 전용) |
| `logo` | `string` | `opencode` | Custom logo text replacing "opencode" | 로고 텍스트 커스터마이즈 (opencode 테마 전용, 최대 30자) |
| `font` | `string` | `mono` | Font preset or custom font-family | 폰트 변경. 아래 프리셋 표 참조. 또는 직접 font-family 문자열 입력 |

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

#### Monospace (코딩/터미널)

| Preset | Font stack | 설명 |
|--------|-----------|------|
| `mono` | JetBrains Mono → Fira Code → Cascadia Code → SF Mono | **기본값.** 범용 코딩 폰트 스택 |
| `fira` | Fira Code → JetBrains Mono | Mozilla 제작. 리가처(`=>`, `!=`) 지원 |
| `cascadia` | Cascadia Code → Fira Code | Microsoft 제작. Windows Terminal 기본 폰트 |
| `iosevka` | Iosevka → Fira Code | 좁은 폭. 정보 밀도 높은 레이아웃에 적합 |
| `hack` | Hack → Fira Code | 가독성 최적화된 오픈소스 코딩 폰트 |
| `inconsolata` | Inconsolata → Consolas | 깔끔한 클래식 모노스페이스 |
| `source` | Source Code Pro → SF Mono | Adobe 제작. 깨끗하고 균형 잡힌 디자인 |
| `ibm` | IBM Plex Mono → SF Mono | IBM 제작. 기업/엔터프라이즈 느낌 |
| `ubuntu` | Ubuntu Mono → Consolas | Ubuntu 터미널 기본 폰트 |
| `roboto` | Roboto Mono → Consolas | Google 제작. Android/Material 느낌 |
| `space` | Space Mono → Consolas | Google Fonts. 레트로/타이포그래피 느낌 |
| `menlo` | Menlo → Monaco → SF Mono | macOS 터미널 기본 폰트 |
| `consolas` | Consolas → Courier New | Windows 기본 코딩 폰트 |
| `courier` | Courier New → Courier | 클래식 타자기 스타일 |

#### Sans-serif (UI/모던)

| Preset | Font stack | 설명 |
|--------|-----------|------|
| `sans` | SF Pro → Segoe UI → Helvetica Neue → system-ui | 시스템 기본 산세리프. UI/대시보드 느낌 |
| `inter` | Inter → system-ui | 웹/UI 디자인에서 가장 많이 쓰이는 폰트 |
| `pretendard` | Pretendard → Noto Sans KR | 한국어 지원 최적화. 한글 프로젝트 추천 |
| `noto` | Noto Sans → Noto Sans KR → system-ui | Google 제작. 다국어 지원 |

#### Serif

| Preset | Font stack | 설명 |
|--------|-----------|------|
| `serif` | Georgia → Noto Serif → Times New Roman | 클래식한 세리프. 문서/논문 느낌 |

#### Custom (직접 입력)

프리셋에 없는 폰트도 CSS `font-family` 문자열로 직접 전달 가능:

```
?font=Comic+Sans+MS,cursive
?font='Maple Mono','Fira Code',monospace
```

> [!NOTE]
> SVG는 뷰어의 로컬 폰트를 사용합니다. 설치되지 않은 폰트는 fallback으로 대체됩니다.
> GitHub에서는 system font만 확실히 렌더링되므로 `mono`, `sans`, `menlo`, `consolas`를 권장합니다.

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
