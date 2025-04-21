
const express = require("express");
const { createCanvas } = require("canvas");

const app = express();
const port = process.env.PORT || 3000;

app.get("/contador", async (req, res) => {
  const width = 400;
  const height = 120;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Fondo blanco
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  const now = new Date();
  const target = new Date("2025-04-29T05:59:59Z");
  const diff = Math.max(0, target - now);
  const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0");
  const hours = String(Math.floor(diff / (1000 * 60 * 60)) % 24).padStart(2, "0");
  const minutes = String(Math.floor(diff / (1000 * 60)) % 60).padStart(2, "0");

  const labels = ["DÍAS", "HORAS", "MIN"];
  const values = [days, hours, minutes];

  ctx.font = "bold 32px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const boxWidth = 90;
  const boxHeight = 60;
  const spacing = 20;

  for (let i = 0; i < values.length; i++) {
    const x = i * (boxWidth + spacing) + 20;
    const y = 20;

    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(x, y, boxWidth, boxHeight);

    ctx.fillStyle = "#003B42";
    ctx.fillText(values[i], x + boxWidth / 2, y + boxHeight / 2);

    ctx.font = "bold 12px Arial";
    ctx.fillStyle = "#777";
    ctx.fillText(labels[i], x + boxWidth / 2, y + boxHeight + 20);

    ctx.font = "bold 32px Arial";
  }

  res.setHeader("Content-Type", "image/png");
  canvas.pngStream().pipe(res);
});

app.get("/", (req, res) => {
  res.send("Contador estilo promofeatures funcionando.");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
