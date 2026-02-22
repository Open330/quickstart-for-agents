# Quickstart For Agents

URL 쿼리만으로 프롬프트 카드를 SVG로 렌더링하는 서비스입니다.

결과물은 일반 뱃지 대신 `README에 바로 임베드 가능한 입력창 스타일 카드`이며, 테마별로 OpenCode/ClaudeCode 계열 UI를 모사합니다.

## Generator UI

서버 루트 경로(`/`)에 접속하면, 쉽고 빠르게 프롬프트 카드를 생성할 수 있는 UI를 제공합니다.

1. 서버 실행 후 `http://localhost:3000` (또는 설정한 포트) 접속
2. 프롬프트 내용 입력 및 테마 선택
3. 실시간 미리보기 확인
4. 생성된 Markdown 코드 복사 후 `README.md`에 붙여넣기

## Preview

### OpenCode Theme

![OpenCode Preview](./examples/opencode.svg)

### Claude Code Theme

![Claude Code Preview](./examples/claude-code.svg)

## Quick Start

기본적으로 서버는 `0.0.0.0:3000`에서 리스닝합니다.

```bash
# 기본 포트(3000) 실행
npm start

# 포트 변경 실행 (예: 8080)
PORT=8080 npm start
```

서버 실행 후 브라우저에서:

```text
http://localhost:3000/api/block.svg?theme=opencode&lang=prompt&title=Queue+Worker&prompt=Design+a+retry+policy+for+background+jobs+with+dead-letter+queue
```

실제 복사 버튼이 동작하는 인터랙티브 뷰:

```text
http://localhost:3000/api/block.html?theme=opencode&lang=prompt&title=Queue+Worker&prompt=Design+a+retry+policy+for+background+jobs+with+dead-letter+queue
```

## README Embed Example

```md
[![Prompt Card](https://YOUR_DEPLOYED_DOMAIN/api/block.svg?theme=claude-code&lang=prompt&title=Release+Plan&prompt=Create+a+release+checklist+with+smoke+tests,+staged+rollout,+and+rollback)](https://YOUR_DEPLOYED_DOMAIN/api/copy?theme=claude-code&lang=prompt&title=Release+Plan&prompt=Create+a+release+checklist+with+smoke+tests,+staged+rollout,+and+rollback)
```

참고: GitHub README의 SVG는 보안 정책상 내부 스크립트/인터랙션이 동작하지 않습니다.  
그래서 카드 클릭 시 `/api/copy`(auto-copy 시도 + fallback 제공) 페이지로 이동하도록 사용하는 방식이 가장 안정적입니다.

## Deploy

Vercel/Render/Fly.io 같은 환경에서 `npm start`로 바로 구동할 수 있습니다.

### Example: Vercel

- Build Command: `npm install`
- Output Directory: 비워둠
- Start Command: `npm start`

## Endpoints

- `GET /` (Generator UI)
- `GET /api/block.svg`
- `GET /api/block.html` (실제 Copy 버튼 동작)
- `GET /api/copy` (auto-copy 시도 + 수동 fallback)
- `GET /api/prompt.txt` (Copy fallback 텍스트)
- `GET /themes`
- `GET /healthz`

## Query Params

- `prompt`: 렌더링할 텍스트
- `theme`: `opencode`, `claude-code`, `github-dark`
- `lang`: 헤더 우측 언어/타입 라벨
- `title`: 헤더 타이틀
- `width`: SVG/HTML 폭 (460-1280)
- `fontSize`: 본문 폰트 크기 (12-20)

## Why This Project

- README에서 실시간으로 프롬프트를 보여줄 수 있음
- 테마를 통해 프로젝트 브랜딩 톤을 맞출 수 있음
- GitHub Markdown 이미지 문법만으로 사용 가능