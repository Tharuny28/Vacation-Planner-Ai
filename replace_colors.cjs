const fs = require('fs');
let text = fs.readFileSync('src/App.jsx', 'utf8');

const newC = `const C = {
  bg:          "#12090b",
  bg2:         "#180b0f",
  bg3:         "#1c0d12",
  card:        "rgba(255,255,255,0.035)",
  cardHover:   "rgba(255,255,255,0.06)",
  border:      "rgba(255,255,255,0.08)",
  borderHover: "rgba(244,63,94,0.35)",
  emerald:     "#f43f5e",
  emeraldDark: "#e11d48",
  emeraldGlow: "rgba(244,63,94,0.15)",
  mint:        "#fb7185",
  text:        "#fff1f2",
  textMuted:   "#9f878a",
  textSub:     "#d3b5b9",
  success:     "#10b981",
  danger:      "#ef4444",
  warn:        "#f59e0b",
  grad: "linear-gradient(140deg,#12090b 0%,#1a0b10 55%,#14080a 100%)",
};`;

text = text.replace(/const C = \{[\s\S]*?\};/, newC);
text = text.replace(/\/\/ ─── COLOR SYSTEM.*/, '// ─── COLOR SYSTEM — Sunset Crimson & Coral ───────────────────────────────');

text = text.replace(/52,211,153/g, '244,63,94');
text = text.replace(/5,150,105/g, '225,29,72');

fs.writeFileSync('src/App.jsx', text);
console.log('Colors replaced successfully!');
