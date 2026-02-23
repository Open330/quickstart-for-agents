<div align="center">

<div><img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=opencode&logo=Quickstart+For+Agents&title=Add+an+agent+prompt+section+to+my+README+using+quickstart-for-agents&font=inter" width="100%" /></div>

```
Using https://github.com/Open330/quickstart-for-agents — 
add an "Quickstart for Agents" section above my existing install guide in README.md.
Use the header/footer SVG API to wrap a fenced code block so it looks like a real terminal UI with a native copy button.
The code block should contain the installtion prompt for AI agents using this project.
Keep the existing human-readable docs below it.
You can ask me which theme to use or just pick one you like!
```
<div><img src="https://quickstart-for-agents.vercel.app/api/footer.svg?theme=opencode&text=copy+this+prompt+%C2%B7+paste+into+your+agent+%C2%B7+get+a+styled+README&font=inter" width="100%" /></div>

<br />

**Give your README an agent-first section above the human install guide.**<br />
Copy the prompt above, paste it into your AI agent, and get a styled terminal UI with a native copy button.

<br />

<a href="#themes">Themes</a>
&middot;
<a href="#how-it-works">How It Works</a>
&middot;
<a href="#parameters">Parameters</a>
&middot;
<a href="https://github.com/Open330/quickstart-for-agents/issues">Report Bug</a>

<br /><br />

</div>

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

### Codex CLI

<div><img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=codex&title=Set+up+the+project+scaffolding" width="100%" /></div>

```
Design retry and dead-letter handling for asynchronous workers
with clear failure budgets.
```
<div><img src="https://quickstart-for-agents.vercel.app/api/footer.svg?theme=codex&tokens=5.1k&model=GPT-4.1" width="100%" /></div>

---

## How It Works

헤더 SVG + 코드 블록을 README에 붙여넣으세요. GitHub이 SVG를 이미지로 렌더링하고, 코드 블록의 **복사 버튼**은 그대로 유지됩니다. 푸터는 선택 사항입니다.

```md
<div><img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=claude-code&title=My+Agent&lang=Agents" width="100%" /></div>

​```
Your prompt for the LLM agent here.
​```
<!-- footer is optional -->
<div><img src="https://quickstart-for-agents.vercel.app/api/footer.svg?theme=claude-code&tokens=42&model=Opus+4.6" width="100%" /></div>
```

> [!TIP]
> `<div><img>` 를 사용하세요 — `![]()` 는 `<p>` 태그로 감싸져 16px 여백이 생깁니다.

---

## Parameters

### Header SVG — `?logo=` vs `?title=`

SVG 이미지 안에 두 가지 텍스트 영역이 렌더링됩니다:

```
┌─────────────────────────────────┐
│                                 │
│       Quickstart For Agents     │ ← ?logo=    큰 로고 텍스트 (상단 영역)
│                                 │
│─────────────────────────────────│
│ ▌ Add this to my README.md...   │ ← ?title=   프롬프트 텍스트 (하단 영역)
└─────────────────────────────────┘
```

| Param | 위치 | 설명 |
|-------|------|------|
| `logo` | 상단 (큰 글씨) | 로고/앱 이름. opencode 테마에서 사용 (최대 30자) |
| `title` | 하단 (작은 글씨) | 프롬프트 텍스트. 구분선 아래 렌더링 (최대 60자) |

### Header params

| Param | Default | 설명 |
|-------|---------|------|
| `theme` | `opencode` | 테마: `claude-code`, `opencode`, `codex`, `github-dark`, `vscode-dark`, `vscode-light` |
| `logo` | `opencode` | 상단 로고 텍스트 (opencode 테마) |
| `title` | Theme name | 하단 프롬프트 텍스트 (구분선 아래, SVG 안에 렌더링) |
| `lang` | — | 우측 라벨 (예: `Agents`, `TypeScript`) |
| `width` | `800` | SVG 너비 (300–1280px) |
| `mascot` | `default` | 마스코트: `default` `hat` `thinking` `wave` (claude-code 테마) |
| `font` | `mono` | 폰트 프리셋 또는 CSS font-family 문자열 |

### Footer params

| Param | Default | 설명 |
|-------|---------|------|
| `theme` | `opencode` | 테마 (헤더와 동일하게) |
| `text` | — | 커스텀 텍스트 (설정 시 다른 옵션 무시) |
| `tokens` | `—` | 토큰 수 (예: `12.4k`) |
| `model` | `Opus 4.6` | 모델 이름 |
| `project` | `quickstart-for-agents` | 프로젝트 이름 (claude-code 테마) |
| `agent` | `Agents` | 에이전트 이름 (opencode/codex 테마) |
| `font` | `mono` | 폰트 (헤더와 동일 권장) |

### Font presets — `?font=`

<details>
<summary><strong>19 presets</strong> — monospace, sans-serif, serif + custom</summary>

<br />

**Monospace**

| Preset | 설명 |
|--------|------|
| `mono` | **기본값.** JetBrains Mono → Fira Code → Cascadia Code → SF Mono |
| `fira` | Mozilla. 리가처 지원 |
| `cascadia` | Microsoft. Windows Terminal 기본 |
| `iosevka` | 좁은 폭. 정보 밀도 높은 레이아웃 |
| `hack` | 가독성 최적화 오픈소스 |
| `inconsolata` | 클래식 모노스페이스 |
| `source` | Adobe. Source Code Pro |
| `ibm` | IBM Plex Mono |
| `ubuntu` | Ubuntu Mono |
| `roboto` | Google. Roboto Mono |
| `space` | Google. 레트로 느낌 |
| `menlo` | macOS 기본 |
| `consolas` | Windows 기본 |
| `courier` | 클래식 타자기 |

**Sans-serif**

| Preset | 설명 |
|--------|------|
| `sans` | 시스템 기본 산세리프 |
| `inter` | 웹/UI 디자인 최다 사용 |
| `pretendard` | 한국어 최적화 |
| `noto` | Google. 다국어 지원 |

**Serif**

| Preset | 설명 |
|--------|------|
| `serif` | Georgia. 클래식 문서 느낌 |

커스텀: `?font=Comic+Sans+MS,cursive` 처럼 직접 입력 가능

</details>

---

<div align="center">
<sub>Built with zero dependencies &middot; SVG generated on the fly &middot; Works on any GitHub README</sub>
</div>
