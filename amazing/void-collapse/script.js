const canvas = document.querySelector("#void-canvas");
const ctx = canvas.getContext("2d", { alpha: true });
const page = document.querySelector(".void-page");
const massReadout = document.querySelector("#mass-readout");
const gravityElements = [...document.querySelectorAll(".gravity-ui")];

const state = {
  width: 1,
  height: 1,
  dpr: 1,
  cx: 0,
  cy: 0,
  mouseX: 0,
  mouseY: 0,
  targetX: 0,
  targetY: 0,
  collapse: 0,
  targetCollapse: 0,
  spin: 0,
  particles: [],
  gravityTargets: [],
  lastMove: 0,
  hasPointer: false,
  start: performance.now(),
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const TWO_PI = Math.PI * 2;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function resize() {
  state.dpr = Math.min(window.devicePixelRatio || 1, 2);
  state.width = Math.floor(window.innerWidth * state.dpr);
  state.height = Math.floor(window.innerHeight * state.dpr);
  canvas.width = state.width;
  canvas.height = state.height;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  state.cx = state.width * 0.5;
  state.cy = state.height * 0.5;
  state.mouseX = state.cx - state.width * 0.45;
  state.mouseY = state.cy - state.height * 0.45;
  state.targetX = state.mouseX;
  state.targetY = state.mouseY;
  buildParticles();
  placeGravityElements();
}

function buildParticles() {
  const offscreen = document.createElement("canvas");
  const octx = offscreen.getContext("2d", { willReadFrequently: true });
  offscreen.width = state.width;
  offscreen.height = state.height;

  const fontSize = clamp(state.width * 0.17, 92 * state.dpr, 230 * state.dpr);
  octx.fillStyle = "#fff";
  octx.textAlign = "center";
  octx.textBaseline = "middle";
  octx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
  octx.fillText("VOID", state.cx, state.cy);

  const data = octx.getImageData(0, 0, state.width, state.height).data;
  const gap = Math.max(5, Math.floor(7 * state.dpr));
  const particles = [];

  for (let y = 0; y < state.height; y += gap) {
    for (let x = 0; x < state.width; x += gap) {
      const alpha = data[(y * state.width + x) * 4 + 3];
      if (alpha > 40 && Math.random() > 0.14) {
        const dx = x - state.cx;
        const dy = y - state.cy;
        particles.push({
          x,
          y,
          px: x,
          py: y,
          bx: x,
          by: y,
          dx,
          dy,
          angle: Math.atan2(dy, dx),
          radius: Math.hypot(dx, dy),
          seed: Math.random(),
        });
      }
    }
  }

  state.particles = particles.slice(0, 8200);
}

function placeGravityElements() {
  state.gravityTargets = gravityElements.map((element, index) => {
    const rect = element.getBoundingClientRect();
    const ex = (rect.left + rect.width * 0.5 - window.innerWidth * 0.5) * -1;
    const ey = (rect.top + rect.height * 0.5 - window.innerHeight * 0.5) * -1;
    element.style.setProperty("--twist", `${index % 2 ? -72 : 64}deg`);
    element.style.setProperty("--gx", "0px");
    element.style.setProperty("--gy", "0px");
    return { element, ex, ey };
  });
}

function updateGravityElements(collapse) {
  const eased = easeOutCubic(collapse);
  state.gravityTargets.forEach(({ element, ex, ey }) => {
    element.style.setProperty("--gx", `${(ex * eased).toFixed(2)}px`);
    element.style.setProperty("--gy", `${(ey * eased).toFixed(2)}px`);
  });
}

function setPointer(clientX, clientY) {
  state.targetX = clientX * state.dpr;
  state.targetY = clientY * state.dpr;
  state.lastMove = performance.now();
  state.hasPointer = true;
  state.collapse = Math.max(state.collapse, 0.22);
}

function getIdlePreview(now) {
  if (reducedMotion) return 0;

  const seconds = (now - state.start) * 0.001;
  if (seconds < 1.4 || seconds > 6.2) return 0;

  const phase = (seconds - 1.4) / 4.8;
  return Math.sin(phase * Math.PI) * 0.74;
}

function drawStars(now, collapse) {
  const count = 140;
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < count; i += 1) {
    const seed = i * 97.37;
    const angle = seed + now * 0.00004 * (1 + collapse * 8);
    const radius = ((seed * 43.1) % Math.max(state.width, state.height)) * 0.54;
    const eased = easeOutCubic(collapse);
    const pull = eased * radius * 0.72;
    const x = state.cx + Math.cos(angle) * (radius - pull);
    const y = state.cy + Math.sin(angle) * (radius - pull);
    const alpha = 0.055 + collapse * 0.34;
    if (collapse > 0.15 && i % 3 === 0) {
      const tail = (18 + collapse * 82) * state.dpr;
      ctx.strokeStyle = `rgba(150,165,255,${alpha * 0.52})`;
      ctx.lineWidth = 0.7 * state.dpr;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle) * tail, y + Math.sin(angle) * tail);
      ctx.stroke();
    } else {
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fillRect(x, y, 1.15 * state.dpr, 1.15 * state.dpr);
    }
  }
  ctx.restore();
}

function drawGravityWell(collapse) {
  if (collapse < 0.02) return;

  const eased = easeOutCubic(collapse);
  const outer = (150 + eased * 340) * state.dpr;
  const halo = ctx.createRadialGradient(state.cx, state.cy, 8 * state.dpr, state.cx, state.cy, outer);
  halo.addColorStop(0, `rgba(0,0,0,${0.96 * eased})`);
  halo.addColorStop(0.16, `rgba(0,0,0,${0.72 * eased})`);
  halo.addColorStop(0.31, `rgba(255,255,255,${0.08 * eased})`);
  halo.addColorStop(0.47, `rgba(78,94,255,${0.08 * eased})`);
  halo.addColorStop(1, "rgba(0,0,0,0)");

  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, state.width, state.height);
  ctx.restore();
}

function strokeEllipseArc(radius, scaleY, start, end, color, width, rotation, blur = 0) {
  ctx.save();
  ctx.translate(state.cx, state.cy);
  ctx.rotate(rotation);
  ctx.scale(1, scaleY);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
  ctx.beginPath();
  ctx.arc(0, 0, radius, start, end);
  ctx.stroke();
  ctx.restore();
}

function drawPhotonRing(collapse, time) {
  const eased = easeOutCubic(collapse);
  const radius = (34 + eased * 52) * state.dpr;
  const rotation = time * 0.0018;

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  strokeEllipseArc(
    radius,
    0.82,
    -0.08 * Math.PI,
    1.08 * Math.PI,
    `rgba(255,255,255,${0.42 * eased})`,
    (1.2 + 2.4 * eased) * state.dpr,
    rotation,
    16 * eased * state.dpr,
  );
  strokeEllipseArc(
    radius * 1.08,
    0.72,
    0.92 * Math.PI,
    1.92 * Math.PI,
    `rgba(113,132,255,${0.34 * eased})`,
    (0.9 + 1.8 * eased) * state.dpr,
    rotation + 0.18,
    18 * eased * state.dpr,
  );
  ctx.restore();
}

function drawLensArcs(collapse, time) {
  if (collapse < 0.08) return;

  const eased = easeOutCubic(collapse);
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < 9; i += 1) {
    const radius = (78 + i * 25 + Math.sin(time * 0.001 + i) * 7) * state.dpr;
    const scaleY = 0.38 + i * 0.025;
    const start = -0.84 + i * 0.19 + Math.sin(time * 0.0007 + i) * 0.06;
    const length = 0.42 + eased * 0.34 + (i % 3) * 0.08;
    const alpha = (0.1 + i * 0.018) * eased;
    const color =
      i % 3 === 0
        ? `rgba(255,219,176,${alpha})`
        : `rgba(180,190,255,${alpha * 1.15})`;
    strokeEllipseArc(
      radius,
      scaleY,
      start,
      start + length,
      color,
      (0.65 + eased * 1.4) * state.dpr,
      time * 0.00035 + i * 0.28,
      8 * eased * state.dpr,
    );
  }
  ctx.restore();
}

function drawAccretion(collapse, time) {
  if (collapse < 0.04) return;

  const eased = easeOutCubic(collapse);
  const baseRadius = (54 + eased * 126) * state.dpr;
  const rotation = time * 0.00135 + state.spin * 0.002;

  drawLensArcs(collapse, time);

  const diskGlow = ctx.createRadialGradient(
    state.cx,
    state.cy,
    18 * state.dpr,
    state.cx,
    state.cy,
    (190 + eased * 180) * state.dpr,
  );
  diskGlow.addColorStop(0, "rgba(0,0,0,0)");
  diskGlow.addColorStop(0.25, `rgba(255,255,255,${0.12 * eased})`);
  diskGlow.addColorStop(0.48, `rgba(105,122,255,${0.15 * eased})`);
  diskGlow.addColorStop(0.72, `rgba(255,176,94,${0.08 * eased})`);
  diskGlow.addColorStop(1, "rgba(0,0,0,0)");

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = diskGlow;
  ctx.fillRect(0, 0, state.width, state.height);
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.lineCap = "round";
  ctx.translate(state.cx, state.cy);
  ctx.rotate(rotation);
  ctx.scale(1, 0.31 + eased * 0.04);

  for (let i = 0; i < 48; i += 1) {
    const lane = i % 8;
    const radius =
      baseRadius +
      (lane - 3.5) * (6.8 + eased * 2.8) * state.dpr +
      Math.sin(time * 0.0012 + i * 1.7) * 4 * state.dpr;
    const start = i * 0.74 + time * (0.0018 + lane * 0.00013);
    const length = 0.26 + eased * 0.72 + (i % 5) * 0.055;
    const hotSide = Math.cos(start + rotation) > -0.25 ? 1 : 0.52;
    const alpha = (0.08 + eased * 0.28) * hotSide * (1 - lane * 0.045);
    const palette =
      i % 5 === 0
        ? `rgba(255,184,105,${alpha})`
        : i % 3 === 0
          ? `rgba(120,138,255,${alpha * 1.12})`
          : `rgba(255,255,255,${alpha})`;

    ctx.strokeStyle = palette;
    ctx.lineWidth = (0.9 + eased * 3.6 + (lane % 3) * 0.55) * state.dpr;
    ctx.shadowColor = palette;
    ctx.shadowBlur = (10 + eased * 28) * state.dpr;
    ctx.beginPath();
    ctx.arc(0, 0, radius, start, start + length);
    ctx.stroke();
  }
  ctx.restore();

  drawPhotonRing(collapse, time);

  ctx.save();
  const coreRadius = (20 + eased * 58) * state.dpr;
  const shadow = ctx.createRadialGradient(
    state.cx,
    state.cy,
    coreRadius * 0.15,
    state.cx,
    state.cy,
    coreRadius * 1.75,
  );
  shadow.addColorStop(0, "#000");
  shadow.addColorStop(0.52, "#000");
  shadow.addColorStop(0.68, `rgba(0,0,0,${0.92 * eased})`);
  shadow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = shadow;
  ctx.shadowColor = "#000";
  ctx.shadowBlur = 84 * eased * state.dpr;
  ctx.beginPath();
  ctx.arc(state.cx, state.cy, coreRadius * 1.72, 0, TWO_PI);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = `rgba(255,255,255,${0.24 * eased})`;
  ctx.lineWidth = (1 + eased * 2) * state.dpr;
  ctx.shadowColor = `rgba(180,190,255,${0.55 * eased})`;
  ctx.shadowBlur = 22 * eased * state.dpr;
  ctx.beginPath();
  ctx.arc(state.cx, state.cy, (34 + eased * 56) * state.dpr, 0, TWO_PI);
  ctx.stroke();
  ctx.restore();
}

function drawParticles(now) {
  const collapse = state.collapse;
  const pullX = (state.mouseX - state.cx) / state.dpr;
  const pullY = (state.mouseY - state.cy) / state.dpr;
  const wobble = state.hasPointer
    ? Math.hypot(pullX, pullY) / Math.max(window.innerWidth, window.innerHeight)
    : 0;
  const distortion = clamp(collapse * 1.35 + wobble * 0.75, 0, 1);
  const core = 8 * state.dpr;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  for (const point of state.particles) {
    point.px = point.x;
    point.py = point.y;
    const collapseEase = easeOutCubic(collapse);
    const spin = collapseEase * 4.7 + distortion * 0.9 + point.seed * 0.7;
    const radius = point.radius * (1 - collapseEase * 0.96) + core * (0.6 + point.seed);
    const angle = point.angle + spin + now * 0.00025 * collapseEase;
    const mouseAngle = Math.atan2(state.mouseY - point.by, state.mouseX - point.bx);
    const stretch = distortion * Math.sin(point.seed * 18 + now * 0.003) * 48 * state.dpr;
    const lensX = Math.cos(mouseAngle) * stretch;
    const lensY = Math.sin(mouseAngle) * stretch;
    const targetX = state.cx + Math.cos(angle) * radius + lensX * (1 - collapseEase);
    const targetY = state.cy + Math.sin(angle) * radius + lensY * (1 - collapseEase);

    point.x += (targetX - point.x) * (0.055 + collapse * 0.09);
    point.y += (targetY - point.y) * (0.055 + collapse * 0.09);

    const alpha = clamp(0.4 + distortion * 0.48 - collapse * 0.08, 0.08, 0.96);
    const size = (1.05 + point.seed * 1.15 + collapse * 1.4) * state.dpr;

    if (collapse > 0.08) {
      const trailAlpha = clamp(collapse * (0.18 + point.seed * 0.2), 0, 0.34);
      ctx.strokeStyle =
        point.seed > 0.58
          ? `rgba(140,156,255,${trailAlpha})`
          : `rgba(255,255,255,${trailAlpha})`;
      ctx.lineWidth = (0.55 + collapse * 1.1) * state.dpr;
      ctx.beginPath();
      ctx.moveTo(point.px, point.py);
      ctx.lineTo(
        point.x + (point.x - point.px) * (1.4 + collapse * 4.5),
        point.y + (point.y - point.py) * (1.4 + collapse * 4.5),
      );
      ctx.stroke();
    }

    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fillRect(point.x, point.y, size, size);

    if (distortion > 0.18 && point.seed > 0.76) {
      ctx.strokeStyle = `rgba(150,165,255,${0.2 * distortion})`;
      ctx.lineWidth = 0.7 * state.dpr;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.x - lensX * 0.38, point.y - lensY * 0.38);
      ctx.stroke();
    }
  }

  ctx.restore();
}

function render(now) {
  state.mouseX += (state.targetX - state.mouseX) * 0.075;
  state.mouseY += (state.targetY - state.mouseY) * 0.075;

  const dx = state.mouseX - state.cx;
  const dy = state.mouseY - state.cy;
  const distance = Math.hypot(dx, dy) / Math.hypot(state.cx, state.cy);
  const movingRecently = state.hasPointer && now - state.lastMove < 2600;
  const pointerCollapse = movingRecently ? clamp(1 - distance * 1.55, 0, 1) : 0;
  state.targetCollapse = reducedMotion ? 0.12 : Math.max(pointerCollapse, getIdlePreview(now));
  const settle = state.targetCollapse > state.collapse ? 0.076 : 0.045;
  state.collapse += (state.targetCollapse - state.collapse) * settle;
  state.spin += 1.2 + state.collapse * 8;

  const cssPullX = ((state.mouseX - state.cx) / state.dpr) * state.collapse * -0.09;
  const cssPullY = ((state.mouseY - state.cy) / state.dpr) * state.collapse * -0.09;
  page.style.setProperty("--collapse", state.collapse.toFixed(4));
  page.style.setProperty("--spin", state.spin.toFixed(2));
  page.style.setProperty("--pull-x", `${cssPullX.toFixed(2)}px`);
  page.style.setProperty("--pull-y", `${cssPullY.toFixed(2)}px`);
  updateGravityElements(state.collapse);
  massReadout.textContent = state.collapse.toFixed(2);

  ctx.clearRect(0, 0, state.width, state.height);
  ctx.fillStyle = `rgba(2,2,2,${0.28 + state.collapse * 0.42})`;
  ctx.fillRect(0, 0, state.width, state.height);
  drawStars(now, state.collapse);
  drawGravityWell(state.collapse);
  drawParticles(now);
  drawAccretion(state.collapse, now);

  requestAnimationFrame(render);
}

function bindPointer(type) {
  document.addEventListener(type, (event) => setPointer(event.clientX, event.clientY), {
    capture: true,
    passive: true,
  });
}

window.addEventListener("resize", resize);
["pointermove", "pointerdown", "mousemove", "mousedown", "click"].forEach(bindPointer);

resize();
requestAnimationFrame(render);
