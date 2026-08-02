// Standalone contact-form API server for the static export portfolio.
// Run alongside the static site:  node contact-server.js
// Listens on CONTACT_API_PORT (default 3500).

require("dotenv").config();

const http = require("http");
const nodemailer = require("nodemailer");

// ── Config (from environment) ──────────────────────────────────────────
const PORT = parseInt(process.env.CONTACT_API_PORT || "3500", 10);
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || "https://hakim.automex.tech";

// Allow localhost origins in development
const ALLOWED_ORIGINS = [
  ALLOW_ORIGIN,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3500",
];

function getAllowedOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return ALLOW_ORIGIN; // same-origin request (e.g. nginx proxy)
  return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOW_ORIGIN;
}

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS; // 16-char Google app password

const TO_EMAIL = process.env.TO_EMAIL || process.env.SMTP_USER;

// ── Validate on startup ───────────────────────────────────────────────
if (!SMTP_USER || !SMTP_PASS) {
  console.error("[contact-server] SMTP_USER and SMTP_PASS env vars are required.");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

// ── Rate limiting (simple in-memory) ──────────────────────────────────
const rateMap = new Map(); // ip → { count, reset }
const RATE_LIMIT = 5; // requests per window
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// ── Helpers ────────────────────────────────────────────────────────────
function sendJson(res, code, body) {
  res.writeHead(code, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ALLOW_ORIGIN,
  });
  res.end(JSON.stringify(body));
}

function sendJsonDynamic(res, req, code, body) {
  res.writeHead(code, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": getAllowedOrigin(req),
  });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => { data += chunk; });
    req.on("end", () => {
      try { resolve(JSON.parse(data)); } catch { reject(new Error("Invalid JSON")); }
    });
    req.on("error", reject);
  });
}

// ── Server ─────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    const origin = getAllowedOrigin(req);
    res.writeHead(204, {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    });
    res.end();
    return;
  }

  if (req.method !== "POST" || req.url !== "/api/contact") {
    sendJsonDynamic(res, req, 404, { error: "Not found" });
    return;
  }

  // Rate limit
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (entry && now < entry.reset && entry.count >= RATE_LIMIT) {
    sendJsonDynamic(res, req, 429, { error: "Too many requests. Please try again later." });
    return;
  }
  if (!entry || now >= entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
  } else {
    entry.count++;
  }

  let body;
  try { body = await readBody(req); } catch {
    sendJsonDynamic(res, req, 400, { error: "Invalid JSON body" });
    return;
  }

  const { name, email, message } = body || {};
  if (!name || !email || !message) {
    sendJsonDynamic(res, req, 400, { error: "name, email, and message are required." });
    return;
  }

  // Basic validation
  if (typeof name !== "string" || name.length > 200) {
    sendJsonDynamic(res, req, 400, { error: "Invalid name." });
    return;
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    sendJsonDynamic(res, req, 400, { error: "Invalid email." });
    return;
  }
  if (typeof message !== "string" || message.length > 5000) {
    sendJsonDynamic(res, req, 400, { error: "Message too long (max 5000 chars)." });
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Portfolio Contact — ${name}`,
      text: `New message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#00a6ff">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <hr style="border:1px solid #e1e6ed" />
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>`,
    });

    console.log(`[contact-server] Sent: ${name} <${email}>`);
    sendJsonDynamic(res, req, 200, { success: true });
  } catch (err) {
    console.error("[contact-server] Send error:", err.message);
    sendJsonDynamic(res, req, 500, { error: "Failed to send message. Please try again later." });
  }
});

server.listen(PORT, () => {
  console.log(`[contact-server] Listening on http://localhost:${PORT}/api/contact`);
});

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
