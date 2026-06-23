const audio = document.getElementById("audio");
const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");
const progress = document.getElementById("progress");
const progressShell = document.querySelector(".progress-shell");
const currentLyric = document.getElementById("currentLyric");
const prevLyric = document.getElementById("prevLyric");
const nextLyric = document.getElementById("nextLyric");

const artAssets = {
  gongXian: makeImage("./res/met-landscape-gong-xian.jpg"),
  monkJie: makeImage("./res/met-landscape-monk-jie.jpg"),
  robe: makeImage("./res/met-robe-peonies.jpg"),
  riverWillows: makeImage("./res/met-river-willows-bi-chang.jpg"),
  incenseScholar: makeImage("./res/met-incense-scholar.jpg"),
  peonyScroll: makeImage("./res/met-peony-scroll-bottle.jpg"),
  plumMoon: makeImage("./res/met-plum-moon.jpg"),
  tangHorse: makeImage("./res/met-tang-horse.jpg")
};

const fallbackLyrics = [
  { time: 1.83, text: "袅青丝吹来闲庭院" },
  { time: 29.85, text: "秋风送走夏叶 轻拂来冬雪" },
  { time: 36.81, text: "关外山河似墨 我提笔风月" },
  { time: 43.53, text: "城外河 水上阁" },
  { time: 46.97, text: "笑语盈盈雨未歇" },
  { time: 51.29, text: "燃灯心事谁含泪吹灭" },
  { time: 57.39, text: "当年长安飞柳 你撑伞桥头" },
  { time: 64.2, text: "霓裳羽衣起舞 我抚琴合奏" },
  { time: 71.01, text: "而弦断 你莞尔" },
  { time: 74.37, text: "谁恍然于你眼眸" },
  { time: 78.75, text: "暗藏一缕青丝在心头" },
  { time: 84.29, text: "红雨落下 我设法 藏你一缕发" },
  { time: 91.14, text: "远在天涯 携着它 似你的记挂" },
  { time: 97.92, text: "我已白发 你现下 过得还好吗" },
  { time: 105.24, text: "是否嫁了人家  带雨梨花" },
  { time: 112.65, text: "关外流传着一首歌谣" },
  { time: 114.71, text: "孩童相传得热闹" },
  { time: 116.49, text: "京城琴师艺惊天下" },
  { time: 118.2, text: "却不为权贵折腰" },
  { time: 119.84, text: "王侯将相被惹恼" },
  { time: 121.65, text: "放逐他远去边疆" },
  { time: 123.29, text: "心上人在长安苦等" },
  { time: 125.09, text: "到岁末方知噩耗" },
  { time: 126.75, text: "琴师藏了一丝佳人头发" },
  { time: 128.75, text: "随他浪迹荒漠行过流霞" },
  { time: 130.5, text: "来年佳人病逝长安桥头柳下" },
  { time: 133.46, text: "他却不知白发送走了黑发" },
  { time: 139.62, text: "当年长安飞柳 你撑伞桥头" },
  { time: 146.4, text: "霓裳羽衣起舞 我抚琴合奏" },
  { time: 153.27, text: "而弦断 你莞尔" },
  { time: 156.65, text: "谁恍然于你眼眸" },
  { time: 161.06, text: "暗藏一缕青丝在心头" },
  { time: 166.65, text: "红雨落下 我设法 藏你一缕发" },
  { time: 173.45, text: "远在天涯 携着它 似你的记挂" },
  { time: 180.3, text: "我已白发 你现下 过得还好吗" },
  { time: 187.53, text: "是否嫁了人家  带雨梨花" },
  { time: 194.06, text: "红雨落下 我设法 藏你一缕发" },
  { time: 200.75, text: "那年月下 风轻刮 吻了你脸颊" },
  { time: 207.68, text: "岁月荏苒 这风沙 刮不回长安门下" },
  { time: 215.49, text: "一缕情丝缠绕 一生牵挂" },
  { time: 223.25, text: "来生吾往" }
];

let width = 0;
let height = 0;
let dpr = 1;
let lyrics = fallbackLyrics;
let lyricIndex = -1;
let particles = [];
let inkDrops = [];
let silkThreads = [];
let lastTime = performance.now();
let softLayer = document.createElement("canvas");
let softCtx = softLayer.getContext("2d");

const scenes = [
  { at: 0, name: "courtyard" },
  { at: 29.85, name: "seasons" },
  { at: 36.81, name: "ink" },
  { at: 43.53, name: "river" },
  { at: 51.29, name: "lantern" },
  { at: 57.39, name: "bridge" },
  { at: 71.01, name: "qin" },
  { at: 84.29, name: "redRain" },
  { at: 112.65, name: "ballad" },
  { at: 126.75, name: "desert" },
  { at: 139.62, name: "bridge" },
  { at: 166.65, name: "redRain" },
  { at: 187.68, name: "desert" },
  { at: 215.49, name: "thread" },
  { at: 223.25, name: "afterlife" }
];

const palettes = {
  courtyard: ["#14202a", "#263b3d", "#c8a96b"],
  seasons: ["#19242a", "#703d2d", "#e8dbc2"],
  ink: ["#11171b", "#2b3c43", "#d8d1c4"],
  river: ["#13212b", "#31505a", "#c7b17a"],
  lantern: ["#15191f", "#7c332b", "#e4b05d"],
  bridge: ["#171d25", "#566877", "#e7dac4"],
  qin: ["#101418", "#3d2b28", "#d5b16a"],
  redRain: ["#17181e", "#7e2f35", "#e5c6bd"],
  ballad: ["#121c20", "#4c5460", "#d2b36e"],
  desert: ["#17181b", "#8c7457", "#e3d2ad"],
  thread: ["#11161d", "#67433f", "#dcb9ad"],
  afterlife: ["#101923", "#596f77", "#f1eadc"]
};

function makeImage(src) {
  const image = new Image();
  image.decoding = "async";
  image.src = src;
  return image;
}

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  softLayer.width = Math.floor(width * dpr);
  softLayer.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  softCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  seedParticles();
}

function seedParticles() {
  const count = Math.round(Math.min(170, Math.max(90, width / 8)));
  particles = Array.from({ length: count }, (_, i) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: 0.8 + Math.random() * 4.2,
    a: 0.08 + Math.random() * 0.34,
    s: 0.2 + Math.random() * 1.2,
    drift: -0.7 + Math.random() * 1.4,
    phase: Math.random() * Math.PI * 2,
    depth: 0.35 + Math.random() * 0.9,
    kind: i % 5 === 0 ? "petal" : i % 4 === 0 ? "snow" : "dust"
  }));
  inkDrops = Array.from({ length: 22 }, () => ({
    x: Math.random() * width,
    y: height * (0.12 + Math.random() * 0.56),
    r: 36 + Math.random() * 150,
    a: 0.018 + Math.random() * 0.065,
    wobble: Math.random() * Math.PI * 2
  }));
  silkThreads = Array.from({ length: 9 }, (_, i) => ({
    y: height * (0.32 + i * 0.052),
    amp: 24 + Math.random() * 42,
    speed: 0.0007 + Math.random() * 0.0007,
    phase: Math.random() * Math.PI * 2,
    weight: i === 4 ? 1.8 : 0.8 + Math.random() * 0.8
  }));
}

function parseTime(value) {
  const parts = value.split(":");
  return Number(parts[0]) * 60 + Number(parts[1]);
}

function parseLrc(text) {
  const creditPattern = /^(作词|作曲|演唱|编曲|录音|配唱|二胡|混音|母带|制作人|OP)：|藏发琴师/;
  return text
    .split(/\r?\n/)
    .flatMap((line) => {
      const stamps = [...line.matchAll(/\[(\d{2}:\d{2}\.\d{2})\]/g)];
      const textValue = line.replace(/\[[^\]]+\]/g, "").trim();
      if (!stamps.length || !textValue || textValue.includes("未经著作权人许可") || creditPattern.test(textValue)) return [];
      return stamps.map((stamp) => ({ time: parseTime(stamp[1]), text: textValue }));
    })
    .sort((a, b) => a.time - b.time);
}

async function loadLyrics() {
  try {
    const response = await fetch("./res/藏发琴师.lrc");
    const parsed = parseLrc(await response.text());
    lyrics = parsed.length ? parsed : fallbackLyrics;
  } catch {
    lyrics = fallbackLyrics;
  }
}

function getSceneName(t) {
  let found = scenes[0].name;
  for (const scene of scenes) {
    if (t >= scene.at) found = scene.name;
  }
  return found;
}

function updateLyrics() {
  const t = audio.currentTime || 0;
  let index = -1;
  for (let i = 0; i < lyrics.length; i += 1) {
    if (t >= lyrics[i].time) index = i;
    else break;
  }
  const displayIndex = index >= 0 ? index : 0;
  if (displayIndex !== lyricIndex) {
    lyricIndex = displayIndex;
    prevLyric.textContent = lyrics[displayIndex - 1]?.text || "";
    currentLyric.textContent = lyrics[displayIndex]?.text || "听一曲长安旧梦";
    nextLyric.textContent = lyrics[displayIndex + 1]?.text || "";
    currentLyric.animate(
      [
        { opacity: 0, transform: "translateY(12px)", filter: "blur(8px)" },
        { opacity: 1, transform: "translateY(0)", filter: "blur(0)" }
      ],
      { duration: 520, easing: "cubic-bezier(.2,.8,.2,1)" }
    );
  }
  if (audio.duration) {
    progress.style.width = `${(t / audio.duration) * 100}%`;
  }
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16)
  };
}

function rgba(hex, alpha) {
  const color = hexToRgb(hex);
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

function drawImageCover(image, x, y, w, h) {
  if (!image.complete || !image.naturalWidth) return;
  const scale = Math.max(w / image.naturalWidth, h / image.naturalHeight);
  const sw = w / scale;
  const sh = h / scale;
  const sx = (image.naturalWidth - sw) / 2;
  const sy = (image.naturalHeight - sh) / 2;
  ctx.drawImage(image, sx, sy, sw, sh, x, y, w, h);
}

function drawImageContain(image, x, y, w, h) {
  if (!image.complete || !image.naturalWidth) return;
  const scale = Math.min(w / image.naturalWidth, h / image.naturalHeight);
  const dw = image.naturalWidth * scale;
  const dh = image.naturalHeight * scale;
  ctx.drawImage(image, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

function drawSoftArtwork(image, x, y, w, h, alpha, mode = "screen", filter = "contrast(1.05) saturate(0.55)") {
  ctx.save();
  ctx.globalCompositeOperation = mode;
  ctx.globalAlpha = alpha;
  ctx.filter = filter;
  drawImageContain(image, x, y, w, h);
  ctx.restore();
}

function drawArtBackdrop(sceneName, t) {
  ctx.save();
  ctx.globalCompositeOperation = "luminosity";
  ctx.globalAlpha = sceneName === "courtyard" || sceneName === "ink" || sceneName === "river" ? 0.22 : 0.16;
  ctx.filter = "contrast(1.12) saturate(0.5) brightness(0.92)";
  drawImageCover(artAssets.gongXian, 0, 0, width, height);
  ctx.restore();

  ctx.save();
  const fade = ctx.createRadialGradient(width * 0.62, height * 0.36, 0, width * 0.62, height * 0.36, Math.max(width, height) * 0.72);
  fade.addColorStop(0, "rgba(16, 25, 28, 0)");
  fade.addColorStop(0.58, "rgba(16, 25, 28, 0.16)");
  fade.addColorStop(1, "rgba(6, 9, 11, 0.62)");
  ctx.fillStyle = fade;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  if (sceneName === "river" || sceneName === "lantern" || sceneName === "seasons") {
    const drift = Math.sin(t * 0.00025) * 12;
    drawSoftArtwork(
      artAssets.riverWillows,
      width * 0.58 + drift,
      height * 0.05,
      width * 0.24,
      height * 0.72,
      0.24,
      "screen",
      "contrast(1.08) saturate(0.6)"
    );
  }

  if (sceneName === "lantern" || sceneName === "qin" || sceneName === "bridge") {
    const pulse = 0.18 + Math.sin(t * 0.0011) * 0.035;
    drawSoftArtwork(
      artAssets.incenseScholar,
      width * 0.58,
      height * 0.18,
      width * 0.32,
      height * 0.36,
      pulse,
      "soft-light",
      "contrast(1.18) saturate(0.42)"
    );
  }

  if (sceneName === "bridge" || sceneName === "qin" || sceneName === "redRain" || sceneName === "afterlife") {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = 0.18;
    ctx.filter = "contrast(1.15) saturate(0.72)";
    drawImageContain(artAssets.monkJie, width * 0.68 + Math.sin(t * 0.00018) * 8, height * 0.02, width * 0.28, height * 0.86);
    ctx.restore();
  }

  if (sceneName === "desert" || sceneName === "ballad") {
    const horseX = width * 0.67 + Math.sin(t * 0.00035) * 16;
    drawSoftArtwork(
      artAssets.tangHorse,
      horseX,
      height * 0.22,
      width * 0.2,
      height * 0.45,
      0.2,
      "soft-light",
      "contrast(1.18) saturate(0.38) sepia(0.25)"
    );
  }

  if (sceneName === "afterlife" || sceneName === "thread") {
    drawSoftArtwork(
      artAssets.plumMoon,
      width * 0.58,
      height * 0.04,
      width * 0.26,
      height * 0.56,
      0.22,
      "screen",
      "contrast(1.05) saturate(0.45)"
    );
  }

  if (sceneName === "redRain" || sceneName === "thread" || sceneName === "afterlife") {
    ctx.save();
    ctx.globalCompositeOperation = "soft-light";
    ctx.globalAlpha = 0.24;
    ctx.filter = "contrast(1.25)";
    drawImageCover(artAssets.robe, 0, 0, width, height);
    ctx.restore();
  }

  if (sceneName === "redRain" || sceneName === "thread" || sceneName === "lantern") {
    const scrollAlpha = sceneName === "lantern" ? 0.12 : 0.18;
    drawSoftArtwork(
      artAssets.peonyScroll,
      width * 0.06 + Math.sin(t * 0.0002) * 8,
      height * 0.12,
      width * 0.18,
      height * 0.5,
      scrollAlpha,
      "soft-light",
      "contrast(1.22) saturate(0.45)"
    );
  }
}

function clearSoftLayer() {
  softCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  softCtx.clearRect(0, 0, width, height);
}

function paintSoftBlob(x, y, rx, ry, color, alpha, rotation = 0) {
  const gradient = softCtx.createRadialGradient(x, y, 0, x, y, Math.max(rx, ry));
  gradient.addColorStop(0, rgba(color, alpha));
  gradient.addColorStop(0.46, rgba(color, alpha * 0.62));
  gradient.addColorStop(1, rgba(color, 0));
  softCtx.save();
  softCtx.translate(x, y);
  softCtx.rotate(rotation);
  softCtx.scale(rx / Math.max(rx, ry), ry / Math.max(rx, ry));
  softCtx.fillStyle = gradient;
  softCtx.beginPath();
  softCtx.arc(0, 0, Math.max(rx, ry), 0, Math.PI * 2);
  softCtx.fill();
  softCtx.restore();
}

function brushStroke(points, color, alpha, widthValue, blur = 0, target = ctx) {
  target.save();
  target.lineCap = "round";
  target.lineJoin = "round";
  target.filter = blur ? `blur(${blur}px)` : "none";
  target.strokeStyle = color.startsWith("#") ? rgba(color, alpha) : color;
  target.lineWidth = widthValue;
  target.beginPath();
  target.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length - 1; i += 1) {
    const midX = (points[i].x + points[i + 1].x) / 2;
    const midY = (points[i].y + points[i + 1].y) / 2;
    target.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
  }
  const last = points[points.length - 1];
  target.lineTo(last.x, last.y);
  target.stroke();
  target.restore();
}

function drawPaperGrain(t) {
  ctx.save();
  ctx.globalCompositeOperation = "soft-light";
  for (let i = 0; i < 90; i += 1) {
    const x = (i * 137 + Math.sin(t * 0.0002 + i) * 18) % width;
    const y = (i * 89 + Math.cos(t * 0.00018 + i) * 14) % height;
    ctx.fillStyle = i % 2 ? "rgba(244, 238, 225, 0.025)" : "rgba(18, 24, 27, 0.05)";
    ctx.fillRect(x, y, 1 + (i % 5), height * (0.08 + (i % 7) * 0.015));
  }
  ctx.restore();
}

function setGradient(sceneName, t) {
  const [top, mid, glow] = palettes[sceneName] || palettes.courtyard;
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, top);
  gradient.addColorStop(0.58 + Math.sin(t * 0.0002) * 0.08, mid);
  gradient.addColorStop(1, "#0b0f13");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const moonX = width * (sceneName === "desert" ? 0.82 : 0.73);
  const moonY = height * (sceneName === "bridge" || sceneName === "afterlife" ? 0.16 : 0.2);
  const moon = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, Math.min(width, height) * 0.36);
  moon.addColorStop(0, rgba(glow, 0.3));
  moon.addColorStop(0.18, rgba(glow, 0.12));
  moon.addColorStop(1, "transparent");
  ctx.fillStyle = moon;
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = sceneName === "redRain" ? 0.2 : 0.38;
  ctx.fillStyle = "rgba(248, 235, 199, 0.45)";
  ctx.beginPath();
  ctx.arc(moonX, moonY, Math.min(width, height) * 0.055, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  drawPaperGrain(t);
}

function drawMountains(t, intensity = 1) {
  clearSoftLayer();
  const colors = ["#213237", "#263b40", "#30484c", "#182327"];
  for (let layer = 0; layer < 5; layer += 1) {
    const baseY = height * (0.42 + layer * 0.095);
    const color = colors[layer % colors.length];
    for (let i = 0; i < 7; i += 1) {
      const x = width * (-0.08 + i * 0.19) + Math.sin(t * 0.00012 + i + layer) * 16;
      const y = baseY + Math.sin(i * 1.2 + layer) * 28;
      paintSoftBlob(x, y, width * (0.18 + layer * 0.025), height * (0.11 + layer * 0.018), color, (0.19 + layer * 0.042) * intensity, -0.18 + i * 0.02);
    }
  }
  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(softLayer, 0, 0, width, height);
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let layer = 0; layer < 5; layer += 1) {
    const baseY = height * (0.39 + layer * 0.095);
    const points = [];
    for (let x = -80; x <= width + 120; x += 110) {
      points.push({
        x,
        y: baseY + Math.sin(x * 0.006 + layer + t * 0.00012) * (22 + layer * 6)
      });
    }
    brushStroke(points, `rgba(236, 225, 198, ${0.07 + layer * 0.012})`, 1, 1.4, 0.6);
  }
  ctx.restore();
}

function drawWillow(t, x = width * 0.14, y = height * 0.02, alpha = 0.55) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.lineCap = "round";
  for (let i = 0; i < 18; i += 1) {
    const startX = x + i * 18;
    const sway = Math.sin(t * 0.001 + i) * 16;
    ctx.beginPath();
    ctx.moveTo(startX, y - 30);
    ctx.bezierCurveTo(startX - 12, y + 90, startX + sway, y + 170, startX - 16 + sway * 0.7, y + 260);
    ctx.strokeStyle = `rgba(108, 139, 122, ${0.18 + (i % 4) * 0.05})`;
    ctx.lineWidth = 1.1 + (i % 3) * 0.4;
    ctx.stroke();
    for (let k = 0; k < 5; k += 1) {
      const leafY = y + 62 + k * 34;
      ctx.fillStyle = `rgba(137, 160, 130, ${0.16 + k * 0.025})`;
      ctx.beginPath();
      ctx.ellipse(startX - 8 + Math.sin(t * 0.0014 + k + i) * 12, leafY, 3, 11, 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawRiver(t) {
  const y = height * 0.69;
  clearSoftLayer();
  paintSoftBlob(width * 0.55, y + 70, width * 0.58, height * 0.18, "#6e9a9a", 0.12, -0.04);
  ctx.drawImage(softLayer, 0, 0, width, height);
  ctx.save();
  ctx.globalAlpha = 0.72;
  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < 18; i += 1) {
    ctx.beginPath();
    const offset = i * 18 + Math.sin(t * 0.001 + i) * 10;
    ctx.moveTo(width * -0.02, y + offset);
    ctx.bezierCurveTo(width * 0.25, y - 42 + offset, width * 0.6, y + 34 + offset, width * 1.02, y - 10 + offset);
    ctx.strokeStyle = `rgba(207, 224, 216, ${0.055 + i * 0.004})`;
    ctx.lineWidth = i % 4 === 0 ? 2.2 : 1;
    ctx.stroke();
  }
  ctx.globalCompositeOperation = "source-over";
  for (let i = 0; i < 6; i += 1) {
    const x = width * (0.32 + i * 0.1) + Math.sin(t * 0.0009 + i) * 10;
    const yy = y + 18 + i * 13;
    ctx.fillStyle = `rgba(244, 238, 225, ${0.06 - i * 0.005})`;
    ctx.beginPath();
    ctx.ellipse(x, yy, 48, 6, -0.1, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawPavilion(t) {
  const x = width * 0.72;
  const y = height * 0.56;
  ctx.save();
  ctx.translate(x, y + Math.sin(t * 0.001) * 4);
  ctx.shadowColor = "rgba(228, 176, 93, 0.28)";
  ctx.shadowBlur = 22;
  const roof = ctx.createLinearGradient(0, -64, 0, -6);
  roof.addColorStop(0, "rgba(238, 218, 172, 0.7)");
  roof.addColorStop(0.35, "rgba(91, 52, 41, 0.86)");
  roof.addColorStop(1, "rgba(13, 18, 18, 0.82)");
  ctx.fillStyle = roof;
  ctx.strokeStyle = "rgba(238, 218, 172, 0.42)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-90, -18);
  ctx.bezierCurveTo(-52, -48, -18, -64, 0, -66);
  ctx.bezierCurveTo(24, -64, 60, -46, 92, -18);
  ctx.bezierCurveTo(50, -24, 16, -24, 0, -22);
  ctx.bezierCurveTo(-22, -25, -54, -24, -90, -18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;
  const body = ctx.createLinearGradient(0, -8, 0, 86);
  body.addColorStop(0, "rgba(238, 218, 172, 0.28)");
  body.addColorStop(0.12, "rgba(28, 30, 29, 0.82)");
  body.addColorStop(1, "rgba(9, 12, 13, 0.46)");
  ctx.fillStyle = body;
  ctx.fillRect(-58, -8, 116, 91);
  for (let i = -2; i <= 2; i += 1) {
    brushStroke([{ x: i * 24, y: -6 }, { x: i * 20, y: 84 }], "rgba(238, 218, 172, 0.5)", 1, 1.2);
  }
  ctx.strokeStyle = "rgba(238, 218, 172, 0.42)";
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    ctx.moveTo(-48, 8 + i * 16);
    ctx.lineTo(48, 4 + i * 17);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(-66, 82);
  ctx.lineTo(66, 82);
  ctx.stroke();
  ctx.restore();
}

function drawBridge(t) {
  const y = height * 0.64;
  ctx.save();
  ctx.lineCap = "round";
  brushStroke(
    [
      { x: width * 0.08, y: y + 9 },
      { x: width * 0.28, y: y - height * 0.09 },
      { x: width * 0.5, y: y - height * 0.18 },
      { x: width * 0.72, y: y - height * 0.08 },
      { x: width * 0.92, y: y + 9 }
    ],
    "rgba(239, 221, 190, 0.2)",
    1,
    16,
    2.2
  );
  brushStroke(
    [
      { x: width * 0.1, y },
      { x: width * 0.3, y: y - height * 0.1 },
      { x: width * 0.5, y: y - height * 0.17 },
      { x: width * 0.7, y: y - height * 0.1 },
      { x: width * 0.9, y }
    ],
    "rgba(239, 221, 190, 0.72)",
    1,
    3.2,
    0
  );
  for (let i = 0; i < 18; i += 1) {
    const x = width * (0.13 + i * 0.044);
    const postY = y - Math.sin((i / 17) * Math.PI) * height * 0.16;
    brushStroke([{ x, y: postY }, { x: x + Math.sin(i) * 2, y: postY - 42 }], `rgba(239, 221, 190, ${0.32 + Math.sin(i) * 0.06})`, 1, 1.1);
  }
  drawUmbrella(width * 0.45 + Math.sin(t * 0.0009) * 10, y - height * 0.17);
  drawQinPlayer(width * 0.57, y - height * 0.13, t);
  ctx.restore();
}

function drawUmbrella(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.shadowColor = "rgba(184, 74, 62, 0.34)";
  ctx.shadowBlur = 18;
  const canopy = ctx.createRadialGradient(0, -18, 4, 0, -8, 72);
  canopy.addColorStop(0, "rgba(229, 126, 100, 0.92)");
  canopy.addColorStop(0.46, "rgba(166, 51, 50, 0.9)");
  canopy.addColorStop(1, "rgba(77, 29, 31, 0.72)");
  ctx.fillStyle = canopy;
  ctx.strokeStyle = "rgba(252, 232, 195, 0.72)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-66, 3);
  ctx.bezierCurveTo(-38, -42, -4, -58, 0, -54);
  ctx.bezierCurveTo(16, -58, 50, -38, 66, 3);
  ctx.bezierCurveTo(42, -4, 18, -2, 0, 1);
  ctx.bezierCurveTo(-20, -4, -43, -4, -66, 3);
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;
  for (let i = -2; i <= 2; i += 1) {
    brushStroke([{ x: 0, y: -48 }, { x: i * 23, y: 0 }], "rgba(255, 231, 190, 0.22)", 1, 0.8);
  }
  brushStroke([{ x: 0, y: 0 }, { x: 2, y: 86 }], "rgba(252, 232, 195, 0.62)", 1, 1);
  ctx.fillStyle = "rgba(244, 238, 225, 0.68)";
  ctx.beginPath();
  ctx.ellipse(-8, 38, 8, 10, 0.1, 0, Math.PI * 2);
  ctx.fill();
  const robe = ctx.createLinearGradient(-16, 48, 16, 112);
  robe.addColorStop(0, "rgba(55, 42, 39, 0.9)");
  robe.addColorStop(1, "rgba(20, 18, 20, 0.55)");
  ctx.fillStyle = robe;
  ctx.beginPath();
  ctx.moveTo(-18, 49);
  ctx.bezierCurveTo(-24, 72, -20, 96, -16, 112);
  ctx.bezierCurveTo(-2, 118, 12, 112, 16, 102);
  ctx.bezierCurveTo(10, 78, 8, 60, 2, 49);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawQinPlayer(x, y, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
  ctx.shadowBlur = 10;
  ctx.fillStyle = "rgba(225, 211, 187, 0.72)";
  ctx.beginPath();
  ctx.ellipse(0, 16, 9, 11, 0.05, 0, Math.PI * 2);
  ctx.fill();
  const robe = ctx.createLinearGradient(-16, 26, 18, 100);
  robe.addColorStop(0, "rgba(66, 52, 48, 0.9)");
  robe.addColorStop(0.55, "rgba(28, 24, 24, 0.86)");
  robe.addColorStop(1, "rgba(16, 15, 17, 0.42)");
  ctx.fillStyle = robe;
  ctx.beginPath();
  ctx.moveTo(-12, 28);
  ctx.bezierCurveTo(-28, 50, -24, 82, -14, 100);
  ctx.bezierCurveTo(0, 108, 20, 98, 22, 84);
  ctx.bezierCurveTo(17, 54, 10, 34, 4, 28);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(215, 181, 109, 0.78)";
  ctx.lineWidth = 3.2;
  brushStroke([{ x: -68, y: 78 }, { x: -16, y: 58 + Math.sin(t * 0.006) * 3 }, { x: 78, y: 74 }], "rgba(215, 181, 109, 0.76)", 1, 4, 0.4);
  for (let i = 0; i < 5; i += 1) {
    const tremble = Math.sin(t * 0.009 + i) * (i === 2 ? 4 : 1.8);
    brushStroke(
      [{ x: -58, y: 70 + i * 3 }, { x: 0, y: 66 + i * 2.5 + tremble }, { x: 70, y: 70 + i * 2.3 }],
      `rgba(244, 238, 225, ${0.18 + i * 0.08})`,
      1,
      i === 2 ? 1.1 : 0.75
    );
  }
  ctx.restore();
}

function drawLanterns(t, strong = false) {
  const count = strong ? 18 : 9;
  for (let i = 0; i < count; i += 1) {
    const x = ((i * 113 + t * 0.018) % (width + 180)) - 90;
    const y = height * (0.18 + ((i * 37) % 48) / 100) + Math.sin(t * 0.0012 + i) * 14;
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = strong ? 0.82 : 0.48;
    ctx.rotate(Math.sin(t * 0.001 + i) * 0.04);
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 48);
    glow.addColorStop(0, "rgba(231, 149, 78, 0.42)");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(-55, -55, 110, 110);
    ctx.strokeStyle = "rgba(246, 217, 154, 0.38)";
    brushStroke([{ x: 0, y: -44 }, { x: 0, y: -22 }], "rgba(246, 217, 154, 0.38)", 1, 0.8);
    const lamp = ctx.createRadialGradient(-4, -6, 2, 0, 0, 26);
    lamp.addColorStop(0, "rgba(244, 154, 96, 0.96)");
    lamp.addColorStop(0.58, "rgba(177, 61, 48, 0.88)");
    lamp.addColorStop(1, "rgba(77, 25, 24, 0.58)");
    ctx.fillStyle = lamp;
    ctx.beginPath();
    ctx.ellipse(0, 0, 14, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(246, 217, 154, 0.46)";
    ctx.beginPath();
    ctx.ellipse(0, 0, 9, 21, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "rgba(246, 217, 154, 0.6)";
    ctx.fillRect(-5, 22, 10, 3);
    ctx.restore();
  }
}

function drawDesert(t) {
  ctx.save();
  clearSoftLayer();
  for (let i = 0; i < 8; i += 1) {
    const y = height * (0.58 + i * 0.055);
    paintSoftBlob(width * (0.18 + i * 0.09), y + 36, width * 0.32, height * 0.12, "#a3865c", 0.06 + i * 0.018, -0.12);
  }
  ctx.drawImage(softLayer, 0, 0, width, height);
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = "rgba(239, 222, 188, 0.18)";
  ctx.lineCap = "round";
  for (let i = 0; i < 54; i += 1) {
    const y = height * (0.28 + ((i * 19) % 62) / 100);
    const x = (i * 79 + t * (0.07 + i * 0.002)) % (width + 200) - 100;
    brushStroke(
      [
        { x, y },
        { x: x + 38, y: y - 8 },
        { x: x + 86, y: y + Math.sin(t * 0.002 + i) * 14 },
        { x: x + 136, y: y + Math.sin(t * 0.001 + i) * 9 }
      ],
      `rgba(239, 222, 188, ${i % 7 === 0 ? 0.18 : 0.1})`,
      1,
      i % 7 === 0 ? 2.2 : 0.8,
      i % 7 === 0 ? 1.4 : 0
    );
  }
  ctx.restore();
}

function drawThreads(t) {
  ctx.save();
  ctx.globalAlpha = 0.88;
  ctx.lineCap = "round";
  for (let i = 0; i < silkThreads.length; i += 1) {
    const thread = silkThreads[i];
    ctx.beginPath();
    const startY = thread.y;
    ctx.moveTo(width * 0.18, startY);
    for (let p = 0; p < 6; p += 1) {
      const x = width * (0.22 + p * 0.13);
      const y = startY + Math.sin(t * thread.speed + thread.phase + p * 0.9) * thread.amp;
      if (p === 0) ctx.lineTo(x, y);
      else ctx.quadraticCurveTo(x - width * 0.05, y - 18, x, y);
    }
    ctx.shadowColor = i === 4 ? "rgba(235, 210, 185, 0.38)" : "rgba(184, 74, 62, 0.18)";
    ctx.shadowBlur = i === 4 ? 10 : 4;
    ctx.strokeStyle = i === 4 ? "rgba(235, 210, 185, 0.82)" : "rgba(184, 74, 62, 0.42)";
    ctx.lineWidth = thread.weight;
    ctx.stroke();
  }
  ctx.restore();
}

function drawAfterlife(t) {
  drawBridge(t);
  drawThreads(t);
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = "rgba(244, 238, 225, 0.13)";
  for (let i = 0; i < 26; i += 1) {
    const x = width * (0.2 + ((i * 23) % 68) / 100);
    const y = height * (0.16 + ((i * 31) % 58) / 100);
    const r = 2 + Math.sin(t * 0.002 + i) * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, Math.max(0.8, r), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawInkDrops(t) {
  ctx.save();
  ctx.filter = "blur(10px)";
  ctx.globalCompositeOperation = "screen";
  for (const drop of inkDrops) {
    drop.wobble += 0.002;
    ctx.beginPath();
    ctx.fillStyle = `rgba(235, 231, 218, ${drop.a * 0.75})`;
    ctx.ellipse(
      drop.x + Math.sin(t * 0.0002 + drop.wobble) * 22,
      drop.y,
      drop.r * (1 + Math.sin(drop.wobble) * 0.12),
      drop.r * 0.58,
      Math.sin(drop.wobble) * 0.5,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  ctx.filter = "none";
  ctx.restore();
}

function drawCourtyard(t) {
  drawWillow(t, width * 0.06, -18, 0.45);
  ctx.save();
  clearSoftLayer();
  const groundY = height * 0.76;
  paintSoftBlob(width * 0.44, groundY + 20, width * 0.52, height * 0.13, "#39433e", 0.16, 0.02);
  paintSoftBlob(width * 0.78, groundY - 20, width * 0.28, height * 0.08, "#6a5540", 0.07, -0.08);
  ctx.drawImage(softLayer, 0, 0, width, height);
  ctx.globalAlpha = 0.24;
  for (let i = 0; i < 7; i += 1) {
    brushStroke(
      [
        { x: width * (0.05 + i * 0.1), y: groundY + i * 7 },
        { x: width * 0.32, y: groundY - 18 },
        { x: width * 0.58, y: groundY + 18 },
        { x: width * 0.94, y: groundY - 8 + i * 5 }
      ],
      "rgba(229, 211, 176, 0.44)",
      1,
      1.3,
      0.5
    );
  }
  ctx.restore();
}

function drawSeasonVeil(t) {
  drawWillow(t, width * 0.02, -8, 0.3);
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const veil = ctx.createLinearGradient(width * 0.2, height * 0.1, width * 0.86, height * 0.86);
  veil.addColorStop(0, "rgba(184, 74, 62, 0.12)");
  veil.addColorStop(0.45, "rgba(244, 238, 225, 0.08)");
  veil.addColorStop(1, "rgba(118, 168, 156, 0.08)");
  ctx.fillStyle = veil;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function drawBirds(t, alpha = 0.28) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = "rgba(238, 226, 197, 0.72)";
  ctx.lineWidth = 1.1;
  ctx.lineCap = "round";
  for (let i = 0; i < 7; i += 1) {
    const x = (width * 0.52 + i * 46 + t * 0.018) % (width + 160) - 80;
    const y = height * (0.18 + (i % 4) * 0.045) + Math.sin(t * 0.001 + i) * 10;
    const wing = 5 + Math.sin(t * 0.006 + i) * 2.4;
    ctx.beginPath();
    ctx.moveTo(x - wing * 1.8, y);
    ctx.quadraticCurveTo(x - wing, y - wing, x, y);
    ctx.quadraticCurveTo(x + wing, y - wing, x + wing * 1.8, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBoatAndRipples(t) {
  const x = (width * 0.18 + t * 0.012) % (width * 0.78);
  const y = height * 0.74 + Math.sin(t * 0.001) * 5;
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = "rgba(238, 222, 188, 0.28)";
  ctx.fillStyle = "rgba(31, 31, 28, 0.54)";
  ctx.beginPath();
  ctx.moveTo(x - 46, y);
  ctx.quadraticCurveTo(x, y + 20, x + 54, y - 2);
  ctx.quadraticCurveTo(x + 20, y + 8, x - 46, y);
  ctx.fill();
  brushStroke([{ x: x - 72, y: y + 20 }, { x, y: y + 30 }, { x: x + 98, y: y + 14 }], "rgba(218, 232, 224, 0.22)", 1, 1.2, 0.8);
  brushStroke([{ x: x - 46, y: y + 32 }, { x: x + 28, y: y + 38 }, { x: x + 136, y: y + 28 }], "rgba(218, 232, 224, 0.14)", 1, 0.9, 0.6);
  ctx.restore();
}

function drawPetalGust(t) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < 34; i += 1) {
    const x = (width * 0.1 + i * 74 + t * (0.035 + i * 0.0008)) % (width + 180) - 90;
    const y = height * (0.18 + ((i * 17) % 62) / 100) + Math.sin(t * 0.002 + i) * 34;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.sin(t * 0.003 + i) * 1.2);
    const petal = ctx.createRadialGradient(0, 0, 0, 0, 0, 18);
    petal.addColorStop(0, "rgba(230, 118, 104, 0.34)");
    petal.addColorStop(1, "rgba(117, 31, 36, 0)");
    ctx.fillStyle = petal;
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

function drawSandCurtain(t) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < 10; i += 1) {
    const y = height * (0.24 + i * 0.055);
    const points = [];
    for (let p = 0; p < 6; p += 1) {
      points.push({
        x: width * (-0.08 + p * 0.24) + ((t * 0.018 + i * 37) % 90),
        y: y + Math.sin(t * 0.0015 + i + p) * 28
      });
    }
    brushStroke(points, `rgba(229, 203, 158, ${0.08 + i * 0.008})`, 1, i % 3 === 0 ? 3 : 1.2, 1.2);
  }
  ctx.restore();
}

function drawMoonBreath(t, sceneName) {
  const active = sceneName === "bridge" || sceneName === "qin" || sceneName === "afterlife" || sceneName === "thread";
  if (!active) return;
  const x = width * 0.73;
  const y = height * 0.17;
  const r = Math.min(width, height) * (0.1 + Math.sin(t * 0.001) * 0.012);
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const halo = ctx.createRadialGradient(x, y, 0, x, y, r * 2.8);
  halo.addColorStop(0, "rgba(244, 238, 225, 0.12)");
  halo.addColorStop(0.48, "rgba(215, 181, 109, 0.055)");
  halo.addColorStop(1, "rgba(244, 238, 225, 0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function drawParticles(sceneName, dt) {
  const red = sceneName === "redRain";
  const snow = sceneName === "seasons" || sceneName === "afterlife";
  const sand = sceneName === "desert" || sceneName === "ballad";
  for (const p of particles) {
    const sway = Math.sin((performance.now() * 0.001 + p.phase) * p.depth) * 0.35;
    p.x += (sand ? 2.8 : p.drift + sway) * dt * 0.06 * p.depth;
    p.y += (red ? 2.9 : snow ? 0.85 : 0.42) * p.s * dt * 0.06 * p.depth;
    if (p.y > height + 30) p.y = -30;
    if (p.x > width + 40) p.x = -40;
    if (p.x < -40) p.x = width + 40;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.x + p.y) * 0.01 + p.phase);
    if (red || p.kind === "petal") {
      ctx.shadowColor = red ? "rgba(196, 66, 70, 0.28)" : "rgba(184, 74, 62, 0.18)";
      ctx.shadowBlur = red ? 8 : 4;
      const petal = ctx.createRadialGradient(-p.r * 0.4, -p.r * 0.2, 0, 0, 0, p.r * 3);
      petal.addColorStop(0, red ? `rgba(226, 112, 104, ${p.a})` : `rgba(206, 93, 76, ${p.a * 0.8})`);
      petal.addColorStop(1, red ? `rgba(126, 35, 42, ${p.a * 0.18})` : `rgba(116, 42, 38, ${p.a * 0.14})`);
      ctx.fillStyle = petal;
      ctx.beginPath();
      ctx.moveTo(-p.r * 2.2, 0);
      ctx.bezierCurveTo(-p.r * 0.8, -p.r * 1.6, p.r * 1.6, -p.r * 1.3, p.r * 2.4, 0);
      ctx.bezierCurveTo(p.r * 1.2, p.r * 1.2, -p.r * 0.8, p.r * 1.5, -p.r * 2.2, 0);
      ctx.fill();
    } else if (sand) {
      brushStroke(
        [{ x: -p.r * 4, y: 0 }, { x: p.r * 1, y: -p.r * 0.6 }, { x: p.r * 7, y: 0 }],
        `rgba(229, 203, 158, ${p.a * 0.38})`,
        1,
        0.8,
        0.4
      );
    } else {
      const mote = ctx.createRadialGradient(0, 0, 0, 0, 0, p.r * 2.2);
      mote.addColorStop(0, `rgba(244, 238, 225, ${p.a * 0.26})`);
      mote.addColorStop(1, "rgba(244, 238, 225, 0)");
      ctx.fillStyle = mote;
      ctx.beginPath();
      ctx.arc(0, 0, p.r * 1.75, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function drawScene(now) {
  const dt = Math.min(40, now - lastTime);
  lastTime = now;
  const t = audio.currentTime || 0;
  const sceneName = getSceneName(t);

  setGradient(sceneName, now);
  drawArtBackdrop(sceneName, now);
  drawInkDrops(now);
  drawMountains(now, sceneName === "ink" ? 1.4 : 1);
  drawMoonBreath(now, sceneName);

  if (sceneName === "courtyard") drawCourtyard(now);
  if (sceneName === "seasons") drawSeasonVeil(now);
  if (sceneName === "ink") {
    drawWillow(now, width * 0.08, -24, 0.28);
    drawThreads(now);
    drawBirds(now, 0.22);
  }
  if (sceneName === "river" || sceneName === "lantern") {
    drawRiver(now);
    drawPavilion(now);
    drawBoatAndRipples(now);
  }
  if (sceneName === "lantern") drawLanterns(now, true);
  if (sceneName === "bridge" || sceneName === "qin") {
    drawWillow(now, width * 0.03, -28, 0.38);
    drawBirds(now, 0.18);
    drawBridge(now);
  }
  if (sceneName === "qin") drawThreads(now);
  if (sceneName === "redRain") {
    drawWillow(now, width * 0.02, -32, 0.26);
    drawBridge(now);
    drawLanterns(now, false);
    drawPetalGust(now);
  }
  if (sceneName === "ballad" || sceneName === "desert") {
    drawDesert(now);
    drawSandCurtain(now);
  }
  if (sceneName === "thread") {
    drawDesert(now);
    drawThreads(now);
    drawPetalGust(now);
  }
  if (sceneName === "afterlife") {
    drawAfterlife(now);
    drawBirds(now, 0.2);
  }
  if (sceneName === "courtyard" || sceneName === "seasons" || sceneName === "ink") drawLanterns(now, false);

  drawParticles(sceneName, dt);
  if (sceneName === "thread" || sceneName === "afterlife") drawThreads(now);
  updateLyrics();
  requestAnimationFrame(drawScene);
}

async function startAudio() {
  audio.loop = true;
  try {
    await audio.play();
  } catch {
    document.body.addEventListener("pointerdown", startAudio, { once: true });
    document.body.addEventListener("keydown", startAudio, { once: true });
  }
}

progressShell.addEventListener("click", (event) => {
  if (!audio.duration) return;
  const rect = progressShell.getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
  audio.currentTime = ratio * audio.duration;
  updateLyrics();
});

audio.addEventListener("loadedmetadata", updateLyrics);
audio.addEventListener("timeupdate", updateLyrics);
window.addEventListener("resize", resize);

resize();
loadLyrics().then(updateLyrics);
startAudio();
requestAnimationFrame(drawScene);
