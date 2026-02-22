import http from "node:http";
import { URL } from "node:url";
import { normalizePrompt, renderPromptSvg } from "./render.js";
import { renderPromptHtml } from "./render-html.js";
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

function sendHtml(res, html) {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "public, max-age=120"
  });
  res.end(html);
}

function sendText(res, text) {
  res.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "public, max-age=120"
  });
  res.end(text);
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

  if (url.pathname === "/api/block.html") {
    const html = renderPromptHtml({
      prompt: url.searchParams.get("prompt"),
      theme: url.searchParams.get("theme"),
      language: url.searchParams.get("lang"),
      title: url.searchParams.get("title"),
      width: url.searchParams.get("width"),
      autoCopy: url.searchParams.get("autocopy")
    });
    return sendHtml(res, html);
  }

  if (url.pathname === "/api/copy") {
    const html = renderPromptHtml({
      prompt: url.searchParams.get("prompt"),
      theme: url.searchParams.get("theme"),
      language: url.searchParams.get("lang"),
      title: url.searchParams.get("title"),
      width: url.searchParams.get("width"),
      autoCopy: url.searchParams.get("autocopy") || "1"
    });
    return sendHtml(res, html);
  }

  if (url.pathname === "/api/prompt.txt") {
    const prompt = normalizePrompt(url.searchParams.get("prompt"));
    return sendText(res, prompt);
  }

  if (url.pathname === "/") {
    return sendJson(res, 200, {
      name: "quickstart-for-agents",
      endpoints: {
        svg: "/api/block.svg?prompt=Build%20a%20REST%20API%20for%20billing&theme=opencode&lang=prompt",
        html: "/api/block.html?prompt=Build%20a%20REST%20API%20for%20billing&theme=opencode&lang=prompt",
        copy: "/api/copy?prompt=Build%20a%20REST%20API%20for%20billing&theme=opencode&lang=prompt",
        prompt: "/api/prompt.txt?prompt=Build%20a%20REST%20API%20for%20billing",
        themes: "/themes",
        healthz: "/healthz"
      }
    });
  }

  return sendJson(res, 404, { message: "Not found" });
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`quickstart-for-agents server listening on http://localhost:${port}`);
});
