# Quickstart For Agents

`shields.io`처럼 URL만으로 SVG를 생성하지만, 목표는 뱃지 대신 `README에 임베드 가능한 테마형 프롬프트/코드블록`입니다.

`opencode`, `claude-code` 등 테마를 선택해 `prompt`를 시각적으로 보여줄 수 있습니다.

## Preview

### OpenCode Theme

![OpenCode Preview](./examples/opencode.svg)

### Claude Code Theme

![Claude Code Preview](./examples/claude-code.svg)

## Quick Start

```bash
npm start
```

서버 실행 후 브라우저에서:

```text
http://localhost:3000/api/block.svg?theme=opencode&lang=prompt&title=Build+Task&prompt=Create+a+CLI+that+parses+CSV+and+prints+JSON
```

## README Embed Example

```md
![Prompt Block](https://YOUR_DEPLOYED_DOMAIN/api/block.svg?theme=claude-code&lang=prompt&title=Release+Plan&prompt=Write+a+release+plan+for+v1.0+including+testing,+rollout,+and+rollback+steps)
```

## Deploy

Vercel/Render/Fly.io 같은 환경에서 `npm start`로 바로 구동할 수 있습니다.

### Example: Vercel

- Build Command: `npm install`
- Output Directory: 비워둠
- Start Command: `npm start`

## Endpoints

- `GET /api/block.svg`
- `GET /themes`
- `GET /healthz`

## Query Params

- `prompt`: 렌더링할 텍스트
- `theme`: `opencode`, `claude-code`, `github-dark`
- `lang`: 헤더 우측 언어/타입 라벨
- `title`: 헤더 타이틀
- `width`: SVG 폭 (360-1200)
- `fontSize`: 본문 폰트 크기 (12-20)

## Why This Project

- README에서 실시간으로 프롬프트를 보여줄 수 있음
- 테마를 통해 프로젝트 브랜딩 톤을 맞출 수 있음
- GitHub Markdown 이미지 문법만으로 사용 가능
