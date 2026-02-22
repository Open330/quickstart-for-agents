import http from "node:http";
import { URL } from "node:url";
import { normalizePrompt, renderPromptSvg } from "./render.js";
import { renderPromptHtml } from "./render-html.js";
import { renderGeneratorHtml } from "./generator-html.js";
import { renderHeaderSvg, renderFooterSvg, renderSnippet } from "./render-parts.js";
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

function handler(req, res) {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (url.pathname === "/healthz") {
    return sendJson(res, 200, { ok: true });
  }

  if (url.pathname === "/themes") {
    return sendJson(res, 200, { themes: Object.keys(THEMES) });
  }

  if (url.pathname === "/api/header.svg") {
    const svg = renderHeaderSvg({
      theme: url.searchParams.get("theme"),
      language: url.searchParams.get("lang"),
      title: url.searchParams.get("title"),
      width: url.searchParams.get("width")
    });
    return sendSvg(res, svg);
  }

  if (url.pathname === "/api/footer.svg") {
    const svg = renderFooterSvg({
      theme: url.searchParams.get("theme"),
      width: url.searchParams.get("width")
    });
    return sendSvg(res, svg);
  }

  if (url.pathname === "/api/snippet") {
    const snippet = renderSnippet({
      host: `${url.protocol}//${url.host}`,
      theme: url.searchParams.get("theme"),
      language: url.searchParams.get("lang"),
      title: url.searchParams.get("title"),
      width: url.searchParams.get("width"),
      code: url.searchParams.get("code")
    });
    return sendText(res, snippet);
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
    return sendHtml(res, renderGeneratorHtml());
  }

  return sendJson(res, 404, { message: "Not found" });
}

export default handler;

const server = http.createServer(handler);

server.listen(port, "0.0.0.0", () => {
  // eslint-disable-next-line no-console
  console.log(`quickstart-for-agents server listening on http://0.0.0.0:${port}`);
});
