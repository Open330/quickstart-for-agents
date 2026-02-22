import http from "node:http";
import { URL } from "node:url";
import { renderPromptSvg } from "./render.js";
import { THEMES } from "./themes.js";

const port = Number.parseInt(process.env.PORT || "3000", 10);

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "public, max-age=120"
  });
  res.end(JSON.stringify(body, null, 2));
}

function sendSvg(res, svg) {
  res.writeHead(200, {
    "Content-Type": "image/svg+xml; charset=utf-8",
    "Cache-Control": "public, max-age=300"
  });
  res.end(svg);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (url.pathname === "/healthz") {
    return sendJson(res, 200, { ok: true });
  }

  if (url.pathname === "/themes") {
    return sendJson(res, 200, { themes: Object.keys(THEMES) });
  }

  if (url.pathname === "/api/block.svg") {
    const svg = renderPromptSvg({
      prompt: url.searchParams.get("prompt"),
      theme: url.searchParams.get("theme"),
      language: url.searchParams.get("lang"),
      title: url.searchParams.get("title"),
      width: url.searchParams.get("width"),
      fontSize: url.searchParams.get("fontSize")
    });
    return sendSvg(res, svg);
  }

  if (url.pathname === "/") {
    return sendJson(res, 200, {
      name: "readme-prompt-block",
      endpoints: {
        svg: "/api/block.svg?prompt=Build%20a%20REST%20API%20for%20billing&theme=opencode&lang=prompt",
        themes: "/themes",
        healthz: "/healthz"
      }
    });
  }

  return sendJson(res, 404, { message: "Not found" });
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`readme-prompt-block server listening on http://localhost:${port}`);
});

