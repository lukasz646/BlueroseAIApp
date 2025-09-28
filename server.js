// server.js (CommonJS)
const http = require("node:http");

const PORT = Number(process.env.PORT) || 8088;
let running = false;

function setCORS(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function json(res, obj, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(obj));
}

const server = http.createServer((req, res) => {
  setCORS(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.url === "/start" && req.method === "POST") {
    running = true;
    return json(res, { ok: true, action: "start" });
  }

  if (req.url === "/stop" && req.method === "POST") {
    running = false;
    return json(res, { ok: true, action: "stop" });
  }

  if (req.url === "/status" && req.method === "GET") {
    return json(res, { ok: true, status: running ? "running" : "stopped" });
  }

  return json(res, { ok: false, error: "not found" }, 404);
});

server.on("listening", () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
server.on("error", (err) => {
  console.error("SERVER ERROR:", err);
});

process.on("uncaughtException", (e) => console.error("Uncaught:", e));
process.on("unhandledRejection", (e) => console.error("Unhandled:", e));

server.listen(PORT);
