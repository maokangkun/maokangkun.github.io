const canvas = document.querySelector("#ink");
const root = document.querySelector(".experience");
const resetButton = document.querySelector(".reset-button");
const ctx = canvas.getContext("2d", {
  alpha: false,
  desynchronized: true,
});

const hiddenCanvas = document.createElement("canvas");
const hiddenCtx = hiddenCanvas.getContext("2d", { willReadFrequently: true });

const maskCanvas = document.createElement("canvas");
const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });

const inkCanvas = document.createElement("canvas");
const inkCtx = inkCanvas.getContext("2d");

const bloomCanvas = document.createElement("canvas");
const bloomCtx = bloomCanvas.getContext("2d");

const pointer = {
  x: 0,
  y: 0,
};

const state = {
  width: 1,
  height: 1,
  ratio: 1,
  drops: [],
  particles: [],
  stars: [],
  coverage: 0,
  lastCoverageCheck: 0,
  start: performance.now(),
  seeded: false,
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function random(min, max) {
  return min + Math.random() * (max - min);
}

function resizeCanvas(target, width, height) {
  target.width = width;
  target.height = height;
}

function drawHiddenMap() {
  hiddenCtx.clearRect(0, 0, state.width, state.height);

  const cx = state.width * 0.5;
  const cy = state.height * 0.48;
  const shortSide = Math.min(state.width, state.height);

  hiddenCtx.save();
  hiddenCtx.translate(cx, cy);
  hiddenCtx.rotate(-0.36);
  hiddenCtx.globalCompositeOperation = "source-over";

  const galaxyGradient = hiddenCtx.createRadialGradient(0, 0, 0, 0, 0, shortSide * 0.58);
  galaxyGradient.addColorStop(0, "rgba(255, 255, 255, 0.92)");
  galaxyGradient.addColorStop(0.22, "rgba(218, 232, 255, 0.62)");
  galaxyGradient.addColorStop(0.54, "rgba(255, 255, 255, 0.2)");
  galaxyGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  hiddenCtx.fillStyle = galaxyGradient;
  hiddenCtx.beginPath();
  hiddenCtx.ellipse(0, 0, shortSide * 0.46, shortSide * 0.14, 0, 0, Math.PI * 2);
  hiddenCtx.fill();

  for (let arm = 0; arm < 2; arm += 1) {
    hiddenCtx.save();
    hiddenCtx.rotate(arm * Math.PI);
    for (let i = 0; i < 90; i += 1) {
      const t = i / 89;
      const angle = t * 3.35;
      const radius = shortSide * (0.04 + t * 0.44);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.33;
      const size = lerp(shortSide * 0.07, shortSide * 0.015, t);
      const alpha = lerp(0.36, 0.02, t);
      hiddenCtx.fillStyle = `rgba(238, 244, 255, ${alpha})`;
      hiddenCtx.beginPath();
      hiddenCtx.ellipse(x, y, size, size * 0.38, angle * 0.24, 0, Math.PI * 2);
      hiddenCtx.fill();
    }
    hiddenCtx.restore();
  }

  hiddenCtx.restore();

  hiddenCtx.save();
  hiddenCtx.textAlign = "center";
  hiddenCtx.textBaseline = "middle";
  hiddenCtx.fillStyle = "rgba(255, 255, 255, 0.72)";
  hiddenCtx.shadowColor = "rgba(255, 255, 255, 0.42)";
  hiddenCtx.shadowBlur = shortSide * 0.022;
  hiddenCtx.font = `700 ${Math.max(38, shortSide * 0.1)}px Georgia, "Songti SC", serif`;
  hiddenCtx.fillText("宇宙", cx, cy + shortSide * 0.23);
  hiddenCtx.font = `500 ${Math.max(12, shortSide * 0.021)}px Inter, sans-serif`;
  hiddenCtx.fillStyle = "rgba(255, 255, 255, 0.5)";
  hiddenCtx.fillText("THE UNIVERSE WAS ALWAYS IN THE INK", cx, cy + shortSide * 0.31);
  hiddenCtx.shadowBlur = 0;
  hiddenCtx.restore();

  state.stars = [];
  for (let i = 0; i < 420; i += 1) {
    const angle = random(0, Math.PI * 2);
    const radius = Math.pow(Math.random(), 0.62) * shortSide * 0.52;
    const armWave = Math.sin(angle * 2 + radius * 0.013) * shortSide * 0.06;
    const x = cx + Math.cos(angle - 0.36) * radius * 1.28 + Math.cos(angle + Math.PI * 0.5) * armWave;
    const y = cy + Math.sin(angle - 0.36) * radius * 0.48 + Math.sin(angle + Math.PI * 0.5) * armWave * 0.35;

    state.stars.push({
      x,
      y,
      r: random(0.45, 1.75) * state.ratio,
      alpha: random(0.1, 0.72),
      twinkle: random(0.6, 2.4),
      phase: random(0, Math.PI * 2),
    });
  }
}

function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  state.ratio = ratio;
  state.width = Math.max(1, Math.floor(window.innerWidth * ratio));
  state.height = Math.max(1, Math.floor(window.innerHeight * ratio));

  for (const target of [canvas, hiddenCanvas, maskCanvas, inkCanvas, bloomCanvas]) {
    resizeCanvas(target, state.width, state.height);
    target.style.width = `${window.innerWidth}px`;
    target.style.height = `${window.innerHeight}px`;
  }

  drawHiddenMap();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  maskCtx.clearRect(0, 0, state.width, state.height);
  state.drops = [];
  state.particles = [];
  state.coverage = 0;
  state.seeded = false;
  root.classList.remove("has-ink", "is-revealed");
  seedFirstDrop();
}

function addParticle(x, y, radius, count, force) {
  for (let i = 0; i < count; i += 1) {
    const angle = random(0, Math.PI * 2);
    const speed = random(0.08, force);
    const distance = Math.pow(Math.random(), 0.8) * radius;
    state.particles.push({
      x: x + Math.cos(angle) * distance * 0.28,
      y: y + Math.sin(angle) * distance * 0.28,
      vx: Math.cos(angle) * speed * state.ratio,
      vy: Math.sin(angle) * speed * state.ratio,
      r: random(radius * 0.018, radius * 0.085),
      age: 0,
      life: random(260, 760),
      wobble: random(0.002, 0.012),
      phase: random(0, Math.PI * 2),
    });
  }
}

function addDrop(x, y, strength = 1) {
  const shortSide = Math.min(state.width, state.height);
  const baseRadius = shortSide * random(0.028, 0.048) * strength;
  const points = [];
  const count = 104;

  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2;
    points.push({
      angle,
      amp: random(0.82, 1.24),
      phase: random(0, Math.PI * 2),
      drift: random(-0.4, 0.4),
    });
  }

  state.drops.push({
    x,
    y,
    born: performance.now(),
    baseRadius,
    targetRadius: shortSide * random(0.22, 0.36) * strength,
    points,
    seed: random(0, 1000),
    alpha: random(0.78, 0.94),
    bleed: random(0.9, 1.25),
  });

  addParticle(x, y, baseRadius * 2.6, Math.round(44 * strength), random(0.95, 2.4));
  root.classList.add("has-ink");
}

function seedFirstDrop() {
  if (state.seeded) {
    return;
  }

  state.seeded = true;
  window.setTimeout(() => {
    addDrop(state.width * 0.5, state.height * 0.38, 1.12);
  }, 420);
}

function drawDropPath(targetCtx, drop, now, scale = 1) {
  const age = (now - drop.born) * 0.001;
  const grow = 1 - Math.exp(-age * 0.38 * drop.bleed);
  const pulse = Math.sin(age * 1.7 + drop.seed) * 0.025;
  const radius = lerp(drop.baseRadius, drop.targetRadius, grow) * scale * (1 + pulse);

  targetCtx.beginPath();
  for (let i = 0; i <= drop.points.length; i += 1) {
    const point = drop.points[i % drop.points.length];
    const wave =
      Math.sin(point.angle * 3 + age * 0.66 + point.phase) * 0.07 +
      Math.sin(point.angle * 7 - age * 0.34 + drop.seed) * 0.04 +
      Math.sin(point.angle * 13 + age * 0.18 + point.phase) * 0.025;
    const localRadius = radius * (point.amp + wave + point.drift * grow * 0.14);
    const x = drop.x + Math.cos(point.angle) * localRadius;
    const y = drop.y + Math.sin(point.angle) * localRadius;

    if (i === 0) {
      targetCtx.moveTo(x, y);
    } else {
      const prev = drop.points[(i - 1) % drop.points.length];
      const prevRadius = radius * prev.amp;
      const px = drop.x + Math.cos(prev.angle) * prevRadius;
      const py = drop.y + Math.sin(prev.angle) * prevRadius;
      targetCtx.quadraticCurveTo(px, py, (x + px) * 0.5, (y + py) * 0.5);
    }
  }
  targetCtx.closePath();
}

function updateParticles(now) {
  for (let i = state.particles.length - 1; i >= 0; i -= 1) {
    const p = state.particles[i];
    p.age += 1;
    p.x += p.vx + Math.sin(now * p.wobble + p.phase) * 0.32 * state.ratio;
    p.y += p.vy + Math.cos(now * p.wobble * 0.8 + p.phase) * 0.24 * state.ratio;
    p.vx *= 0.992;
    p.vy *= 0.992;
    p.r *= 1.0025;

    if (p.age > p.life) {
      state.particles.splice(i, 1);
    }
  }
}

function paintInk(now) {
  inkCtx.clearRect(0, 0, state.width, state.height);
  inkCtx.fillStyle = "#fff";
  inkCtx.fillRect(0, 0, state.width, state.height);

  maskCtx.clearRect(0, 0, state.width, state.height);

  inkCtx.save();
  inkCtx.globalCompositeOperation = "source-over";
  maskCtx.save();
  maskCtx.globalCompositeOperation = "source-over";

  for (const drop of state.drops) {
    const age = (now - drop.born) * 0.001;
    const fringe = clamp(0.9 - age * 0.03, 0.22, 0.88);

    inkCtx.fillStyle = `rgba(0, 0, 0, ${drop.alpha})`;
    drawDropPath(inkCtx, drop, now, 1);
    inkCtx.fill();

    maskCtx.fillStyle = "rgba(0, 0, 0, 0.98)";
    drawDropPath(maskCtx, drop, now, 1.012);
    maskCtx.fill();

    inkCtx.strokeStyle = `rgba(0, 0, 0, ${fringe * 0.16})`;
    inkCtx.lineWidth = Math.max(1, state.ratio * 2.2);
    drawDropPath(inkCtx, drop, now + 18, 1.018);
    inkCtx.stroke();

    inkCtx.strokeStyle = `rgba(0, 0, 0, ${fringe * 0.08})`;
    inkCtx.lineWidth = Math.max(1, state.ratio * 5.5);
    drawDropPath(inkCtx, drop, now + 48, 1.05);
    inkCtx.stroke();

    maskCtx.strokeStyle = "rgba(0, 0, 0, 0.38)";
    maskCtx.lineWidth = Math.max(1, state.ratio * 8);
    drawDropPath(maskCtx, drop, now + 48, 1.055);
    maskCtx.stroke();
  }

  for (const p of state.particles) {
    const life = 1 - p.age / p.life;
    const gradient = inkCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4.2);
    gradient.addColorStop(0, `rgba(0, 0, 0, ${0.32 * life})`);
    gradient.addColorStop(0.44, `rgba(0, 0, 0, ${0.11 * life})`);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    inkCtx.fillStyle = gradient;
    inkCtx.beginPath();
    inkCtx.arc(p.x, p.y, p.r * 4.2, 0, Math.PI * 2);
    inkCtx.fill();

    const maskGradient = maskCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5.2);
    maskGradient.addColorStop(0, `rgba(0, 0, 0, ${0.7 * life})`);
    maskGradient.addColorStop(0.58, `rgba(0, 0, 0, ${0.26 * life})`);
    maskGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    maskCtx.fillStyle = maskGradient;
    maskCtx.beginPath();
    maskCtx.arc(p.x, p.y, p.r * 5.2, 0, Math.PI * 2);
    maskCtx.fill();
  }

  maskCtx.restore();
  inkCtx.restore();
}

function measureCoverage(now) {
  if (now - state.lastCoverageCheck < 420 || state.drops.length === 0) {
    return;
  }

  state.lastCoverageCheck = now;
  const sampleWidth = 96;
  const sampleHeight = Math.max(54, Math.round((state.height / state.width) * sampleWidth));
  const sample = document.createElement("canvas");
  sample.width = sampleWidth;
  sample.height = sampleHeight;
  const sampleCtx = sample.getContext("2d", { willReadFrequently: true });
  sampleCtx.drawImage(maskCanvas, 0, 0, sampleWidth, sampleHeight);
  const data = sampleCtx.getImageData(0, 0, sampleWidth, sampleHeight).data;
  let dark = 0;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] > 18) {
      dark += 1;
    }
  }

  state.coverage += ((dark / (sampleWidth * sampleHeight)) - state.coverage) * 0.28;
  const reveal = clamp((state.coverage - 0.23) / 0.3, 0, 1);
  root.style.setProperty("--veil", reveal.toFixed(3));

  if (reveal > 0.55) {
    root.classList.add("is-revealed");
  }
}

function composite(now) {
  const seconds = (now - state.start) * 0.001;
  const reveal = clamp((state.coverage - 0.18) / 0.32, 0, 1);

  ctx.clearRect(0, 0, state.width, state.height);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, state.width, state.height);
  ctx.drawImage(inkCanvas, 0, 0);

  bloomCtx.clearRect(0, 0, state.width, state.height);
  bloomCtx.save();
  bloomCtx.globalCompositeOperation = "source-over";
  bloomCtx.drawImage(hiddenCanvas, 0, 0);
  bloomCtx.globalCompositeOperation = "destination-in";
  bloomCtx.drawImage(maskCanvas, 0, 0);
  bloomCtx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = 0.18 + reveal * 0.82;
  ctx.filter = `blur(${state.ratio * 8}px)`;
  ctx.drawImage(bloomCanvas, 0, 0);
  ctx.filter = "none";
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 0.32 + reveal * 0.68;
  ctx.drawImage(bloomCanvas, 0, 0);
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  for (const star of state.stars) {
    const twinkle = 0.64 + Math.sin(seconds * star.twinkle + star.phase) * 0.36;
    ctx.fillStyle = `rgba(255, 255, 255, ${reveal * star.alpha * twinkle})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  ctx.globalAlpha = 0.07;
  for (const drop of state.drops) {
    ctx.beginPath();
    ctx.arc(drop.x, drop.y, Math.min(state.width, state.height) * 0.012, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
  }
  ctx.restore();
}

function render(now) {
  updateParticles(now);
  paintInk(now);
  measureCoverage(now);
  composite(now);
  requestAnimationFrame(render);
}

function setPointer(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = (event.clientX - rect.left) * state.ratio;
  pointer.y = (event.clientY - rect.top) * state.ratio;
}

canvas.addEventListener("pointerdown", (event) => {
  setPointer(event);
  canvas.setPointerCapture(event.pointerId);
  addDrop(pointer.x, pointer.y, random(0.78, 1.16));
});

canvas.addEventListener("pointermove", (event) => {
  setPointer(event);
  if (event.buttons === 1 && Math.random() > 0.82) {
    addParticle(pointer.x, pointer.y, Math.min(state.width, state.height) * 0.035, 8, 1.35);
  }
});

resetButton.addEventListener("click", () => {
  state.drops = [];
  state.particles = [];
  state.coverage = 0;
  state.seeded = false;
  maskCtx.clearRect(0, 0, state.width, state.height);
  root.style.setProperty("--veil", "0");
  root.classList.remove("has-ink", "is-revealed");
  seedFirstDrop();
});

window.addEventListener("resize", resize);

resize();
requestAnimationFrame(render);
