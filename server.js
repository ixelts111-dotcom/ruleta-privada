
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "CAMBIA-ESTA-CONTRASEÑA";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let winner = null;
let revealed = false;

app.post("/api/admin/login", (req, res) => {
  if (req.body.password === ADMIN_PASSWORD) return res.json({ ok: true });
  res.status(401).json({ ok: false, error: "Contraseña incorrecta" });
});

app.post("/api/admin/winner", (req, res) => {
  if (req.body.password !== ADMIN_PASSWORD)
    return res.status(401).json({ ok: false, error: "No autorizado" });

  const n = Number(req.body.winner);
  if (!Number.isInteger(n) || n < 1 || n > 100)
    return res.status(400).json({ ok: false, error: "Número inválido" });

  winner = n;
  revealed = false;
  res.json({ ok: true });
});

app.post("/api/reveal", (req, res) => {
  if (winner === null)
    return res.status(400).json({ ok: false, error: "Todavía no hay ganador configurado" });

  revealed = true;
  res.json({ ok: true, winner });
});

app.get("/api/status", (req, res) => {
  // Antes del giro no se envía el número ganador.
  res.json({ configured: winner !== null, revealed });
});

app.get("/api/winner", (req, res) => {
  if (!revealed || winner === null)
    return res.status(403).json({ ok: false, error: "Resultado no revelado" });
  res.json({ ok: true, winner });
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`Ruleta funcionando en http://localhost:${PORT}`));
