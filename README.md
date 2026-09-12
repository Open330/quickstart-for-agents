<div><img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=opencode&logo=Quickstart+For+Agents&title=Add+a+concise+agent+setup+prompt+to+my+README&font=inter" width="100%" /></div>

```prompt
Using https://github.com/Open330/quickstart-for-agents, add a "Quickstart for Agents"
section above the existing installation guide in README.md. Inspect this repository
and write a short, project-specific setup prompt that lets a coding agent discover
the required steps and verify the setup. Wrap it with the header/footer SVG API,
choose a suitable theme, and preserve the existing human-readable documentation.
```
<div><img src="https://quickstart-for-agents.vercel.app/api/footer.svg?theme=opencode&text=copy+prompt+%C2%B7+paste+into+your+coding+agent+%C2%B7+verify+the+setup&font=inter" width="100%" /></div>

<br />

**Give your README a concise agent-first setup section above the human install guide.**<br />
Copy the prompt above and let your coding agent inspect the repository, add the section, and preserve the existing docs.

<br />

<a href="#themes">Themes</a>
&middot;
<a href="#how-it-works">How It Works</a>
&middot;
<a href="#parameters">Parameters</a>
&middot;
<a href="https://github.com/Open330/quickstart-for-agents/issues">Report Bug</a>

<br /><br />

## Themes

### Claude Code

<div><img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=claude-code&title=Set+up+this+project&lang=prompt" width="100%" /></div>

```prompt
Set up this project in the current workspace. Read the repository instructions
and documentation, use the existing toolchain, and verify the setup works.
```
<div><img src="https://quickstart-for-agents.vercel.app/api/footer.svg?theme=claude-code&text=copy+prompt+%C2%B7+inspect+the+repository+%C2%B7+verify+the+result" width="100%" /></div>

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

<div><img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=opencode&title=Set+up+this+project&lang=prompt" width="100%" /></div>

```prompt
Set up this project in the current workspace. Read the repository instructions
and documentation, use the existing toolchain, and verify the setup works.
```
<div><img src="https://quickstart-for-agents.vercel.app/api/footer.svg?theme=opencode&text=copy+prompt+%C2%B7+inspect+the+repository+%C2%B7+verify+the+result" width="100%" /></div>

### Codex CLI

<div><img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=codex&title=Set+up+this+project&lang=prompt" width="100%" /></div>

```prompt
Set up this project in the current workspace. Read the repository instructions
and documentation, use the existing toolchain, and verify the setup works.
```
<div><img src="https://quickstart-for-agents.vercel.app/api/footer.svg?theme=codex&text=copy+prompt+%C2%B7+inspect+the+repository+%C2%B7+verify+the+result" width="100%" /></div>

---

## How It Works

헤더 SVG + 짧은 에이전트 프롬프트를 README에 붙여넣으세요. 프롬프트는 모든 설치 단계를 나열하기보다 에이전트가 저장소 지침과 문서를 확인하고 설정을 검증하도록 안내하면 됩니다. GitHub이 SVG를 이미지로 렌더링하고, 코드 블록의 **복사 버튼**은 그대로 유지됩니다. 푸터는 선택 사항입니다.

```md
<div><img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=claude-code&title=Set+up+this+project&lang=prompt" width="100%" /></div>

​```prompt
Set up this project in the current workspace. Read the repository instructions
and documentation, use the existing toolchain, and verify the setup works.
​```
<!-- footer is optional -->
<div><img src="https://quickstart-for-agents.vercel.app/api/footer.svg?theme=claude-code&text=copy+prompt+%C2%B7+paste+into+your+coding+agent+%C2%B7+verify+the+setup" width="100%" /></div>
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
| `title` | 하단 (작은 글씨) | 프롬프트 텍스트. 구분선 아래 렌더링 (최대 120자) |

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
| `model` | `Agent` | 모델 또는 에이전트 이름 |
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

---
<p align="center"><sub>Part of <a href="https://github.com/Open330">Open330</a> · open source tools for AI-agent workflows · <a href="https://open330.github.io">open330.github.io</a></sub></p>
