import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("viroxen.db");
const JWT_SECRET = process.env.JWT_SECRET || "viroxen-super-secret-key";

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS tools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    is_paid BOOLEAN DEFAULT 0,
    price TEXT
  );

  CREATE TABLE IF NOT EXISTS tool_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    tool_id INTEGER,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(tool_id) REFERENCES tools(id)
  );
`);

// Seed initial tools if empty
const toolsCount = db.prepare("SELECT count(*) as count FROM tools").get() as { count: number };
if (toolsCount.count === 0) {
  const insertTool = db.prepare("INSERT INTO tools (name, description, is_paid, price) VALUES (?, ?, ?, ?)");
  insertTool.run("Network Scanner", "Advanced network vulnerability scanner.", 0, null);
  insertTool.run("Web Auditor", "Comprehensive website security audit tool.", 1, "$49/mo");
  insertTool.run("OSINT Engine", "Deep intelligence gathering tool.", 1, "$99/mo");
  insertTool.run("Port Checker", "Basic port scanning utility.", 0, null);
}

// Seed admin user if not exists
const adminExists = db.prepare("SELECT * FROM users WHERE role = 'admin'").get();
if (!adminExists) {
  const hashedPassword = bcrypt.hashSync("admin123", 10);
  db.prepare("INSERT INTO users (email, password, role) VALUES (?, ?, ?)").run("admin@viroxen.com", hashedPassword, "admin");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Auth Middleware
  const authenticate = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
      req.user = jwt.verify(token, JWT_SECRET);
      next();
    } catch (e) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  const isAdmin = (req: any, res: any, next: any) => {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
    next();
  };

  // API Routes
  app.post("/api/auth/signup", (req, res) => {
    const { email, password } = req.body;
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const result = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)").run(email, hashedPassword);
      const token = jwt.sign({ id: result.lastInsertRowid, email, role: "user" }, JWT_SECRET);
      res.json({ token, user: { id: result.lastInsertRowid, email, role: "user" } });
    } catch (e) {
      res.status(400).json({ error: "User already exists" });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  });

  app.get("/api/tools", (req, res) => {
    const tools = db.prepare("SELECT * FROM tools").all();
    res.json(tools);
  });

  app.post("/api/tools/request", authenticate, (req: any, res) => {
    const { toolId } = req.body;
    try {
      db.prepare("INSERT INTO tool_requests (user_id, tool_id) VALUES (?, ?)").run(req.user.id, toolId);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: "Request failed" });
    }
  });

  app.get("/api/user/requests", authenticate, (req: any, res) => {
    const requests = db.prepare(`
      SELECT tr.*, t.name as tool_name 
      FROM tool_requests tr 
      JOIN tools t ON tr.tool_id = t.id 
      WHERE tr.user_id = ?
    `).all(req.user.id);
    res.json(requests);
  });

  // Admin Routes
  app.get("/api/admin/requests", authenticate, isAdmin, (req, res) => {
    const requests = db.prepare(`
      SELECT tr.*, t.name as tool_name, u.email as user_email 
      FROM tool_requests tr 
      JOIN tools t ON tr.tool_id = t.id 
      JOIN users u ON tr.user_id = u.id
    `).all();
    res.json(requests);
  });

  app.post("/api/admin/requests/:id/approve", authenticate, isAdmin, (req, res) => {
    db.prepare("UPDATE tool_requests SET status = 'approved' WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.post("/api/admin/requests/:id/reject", authenticate, isAdmin, (req, res) => {
    db.prepare("UPDATE tool_requests SET status = 'rejected' WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/admin/users", authenticate, isAdmin, (req, res) => {
    const users = db.prepare("SELECT id, email, role, created_at FROM users").all();
    res.json(users);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
