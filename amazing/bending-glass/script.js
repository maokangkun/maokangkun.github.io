const canvas = document.querySelector("#glass");
const sourceCanvas = document.querySelector("#source");
const stage = document.querySelector(".glass-stage");
const wordButtons = Array.from(document.querySelectorAll(".word-hit"));

const gl = canvas.getContext("webgl", {
  alpha: false,
  antialias: false,
  depth: false,
  stencil: false,
  powerPreference: "high-performance",
});

const vertexSource = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentSource = `
precision highp float;

uniform sampler2D u_scene;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_pressure;
uniform float u_crackCount;
uniform vec4 u_cracks[22];
uniform float u_crackBirth[22];

varying vec2 v_uv;

float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 19.19);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float segmentDistance(vec2 p, vec2 a, vec2 b, out float along) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  along = clamp(dot(pa, ba) / max(dot(ba, ba), 0.00001), 0.0, 1.0);
  return length(pa - ba * along);
}

void main() {
  vec2 uv = v_uv;
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * aspect;
  vec2 m = (u_mouse - 0.5) * aspect;

  float pointerDistance = length(p - m);
  float bowl = exp(-pointerDistance * pointerDistance * 6.2);
  float wave = sin((p.x * 7.0 + p.y * 5.0) + u_time * 0.82) * 0.5 + 0.5;
  float ripple = sin(pointerDistance * 42.0 - u_time * 4.0) * exp(-pointerDistance * 3.3);
  float grainField = noise(uv * 52.0 + u_time * 0.035);

  vec2 normal = normalize(p - m + 0.0001) * bowl * (0.006 + u_pressure * 0.066);
  normal += vec2(
    noise(uv * 4.2 + vec2(u_time * 0.04, 0.0)) - 0.5,
    noise(uv * 4.2 + vec2(5.4, u_time * 0.035)) - 0.5
  ) * 0.013;
  normal += normalize(p + 0.0001) * ripple * 0.006 * u_pressure;

  float crackLight = 0.0;
  float crackShadow = 0.0;
  float fracture = 0.0;

  for (int i = 0; i < 22; i++) {
    if (float(i) >= u_crackCount) {
      break;
    }

    vec4 line = u_cracks[i];
    float age = clamp(u_time - u_crackBirth[i], 0.0, 9.0);
    float grow = smoothstep(0.0, 1.0, age * 1.35);
    vec2 a = (line.xy - 0.5) * aspect;
    vec2 rawB = (line.zw - 0.5) * aspect;
    vec2 b = mix(a, rawB, grow);
    float along = 0.0;
    float d = segmentDistance(p, a, b, along);
    float width = mix(0.0045, 0.0012, along) * (1.0 + line.x * 0.8);
    float hair = smoothstep(width, 0.0, d);
    float shoulder = smoothstep(width * 8.0, 0.0, d) * 0.16;
    vec2 dir = normalize(b - a + 0.0001);
    vec2 side = vec2(-dir.y, dir.x);
    float sideSign = sign(dot(p - a, side));

    normal += side * sideSign * hair * (0.018 + age * 0.001);
    normal += side * sideSign * shoulder * 0.018;
    crackLight += hair * (1.25 + age * 0.04);
    crackShadow += shoulder;
    fracture += smoothstep(width * 15.0, 0.0, d) * (1.0 - along * 0.2);
  }

  float chroma = 0.003 + bowl * 0.006 + fracture * 0.003;
  vec2 warped = uv + normal;
  vec3 refracted;
  refracted.r = texture2D(u_scene, warped + normal * chroma).r;
  refracted.g = texture2D(u_scene, warped).g;
  refracted.b = texture2D(u_scene, warped - normal * chroma).b;

  float edge = smoothstep(0.72, 0.0, length((uv - 0.5) * vec2(1.0, 1.12)));
  float caustic = pow(max(0.0, 1.0 - pointerDistance * 1.7), 3.0) * u_pressure;
  vec3 color = refracted;
  color += vec3(0.52, 0.78, 1.0) * caustic * 0.12;
  color += vec3(1.0, 0.95, 0.86) * pow(wave, 7.0) * bowl * 0.055;
  color += vec3(0.9, 0.98, 1.0) * crackLight * 0.68;
  color -= crackShadow * vec3(0.02, 0.028, 0.035);
  color *= 0.84 + edge * 0.22;
  color += (grainField - 0.5) * 0.035;

  gl_FragColor = vec4(color, 1.0);
}
`;

function createShader(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

function createProgram() {
  const program = gl.createProgram();
  gl.attachShader(program, createShader(gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program));
  }
  return program;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function seededNoise(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function wrapLines(ctx, paragraphs, maxWidth) {
  const lines = [];

  paragraphs.forEach((paragraph) => {
    const words = paragraph.split(" ");
    let line = "";

    words.forEach((word) => {
      const candidate = line ? `${line} ${word}` : word;
      if (ctx.measureText(candidate).width <= maxWidth || !line) {
        line = candidate;
        return;
      }

      lines.push(line);
      line = word;
    });

    if (line) {
      lines.push(line);
    }
  });

  return lines;
}

function drawSource(ctx, width, height, ratio) {
  ctx.clearRect(0, 0, width, height);

  const gradient = ctx.createRadialGradient(width * 0.52, height * 0.48, 0, width * 0.52, height * 0.48, Math.max(width, height) * 0.72);
  gradient.addColorStop(0, "#152129");
  gradient.addColorStop(0.42, "#0a1014");
  gradient.addColorStop(1, "#060708");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const glowA = ctx.createRadialGradient(width * 0.26, height * 0.22, 0, width * 0.26, height * 0.22, width * 0.45);
  glowA.addColorStop(0, "rgba(164, 224, 255, 0.19)");
  glowA.addColorStop(1, "rgba(164, 224, 255, 0)");
  ctx.fillStyle = glowA;
  ctx.fillRect(0, 0, width, height);

  const glowB = ctx.createRadialGradient(width * 0.82, height * 0.72, 0, width * 0.82, height * 0.72, width * 0.44);
  glowB.addColorStop(0, "rgba(255, 223, 190, 0.13)");
  glowB.addColorStop(1, "rgba(255, 223, 190, 0)");
  ctx.fillStyle = glowB;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  const dotSize = Math.max(1, ratio);
  ctx.globalAlpha = 0.14;
  for (let y = 0; y < height; y += 9 * ratio) {
    for (let x = 0; x < width; x += 9 * ratio) {
      const n = seededNoise(x, y);
      if (n > 0.54) {
        ctx.fillStyle = `rgba(255, 255, 255, ${(n - 0.54) * 0.22})`;
        ctx.fillRect(x, y, dotSize, dotSize);
      }
    }
  }
  ctx.globalAlpha = 1;

  const fontSize = clamp(width / 13.8, 27 * ratio, 92 * ratio);
  const lineHeight = fontSize * 1.08;
  const paragraphs = [
    "This page is not a surface.",
    "material remembers pressure.",
    "Move slowly. The letters are seen",
    "through the bend, not moved by it.",
    "Touch one word and the glass",
    "decides where to break.",
  ];

  ctx.font = `500 ${fontSize}px Georgia, "Songti SC", serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(196, 235, 255, 0.32)";
  ctx.shadowBlur = 28 * ratio;

  const lines = wrapLines(ctx, paragraphs, width * 0.9);
  const blockHeight = (lines.length - 1) * lineHeight;
  const startY = height * 0.5 - blockHeight * 0.5;

  lines.forEach((line, index) => {
    const y = startY + index * lineHeight;
    ctx.fillStyle = index % 2 === 0 ? "rgba(235, 246, 255, 0.92)" : "rgba(220, 235, 244, 0.78)";
    ctx.fillText(line, width * 0.5, y);
  });
}

if (!gl) {
  stage.classList.remove("is-webgl");
} else {
  stage.classList.add("is-webgl");

  const program = createProgram();
  const positionBuffer = gl.createBuffer();
  const texture = gl.createTexture();
  const sourceContext = sourceCanvas.getContext("2d");

  const locations = {
    position: gl.getAttribLocation(program, "a_position"),
    scene: gl.getUniformLocation(program, "u_scene"),
    resolution: gl.getUniformLocation(program, "u_resolution"),
    mouse: gl.getUniformLocation(program, "u_mouse"),
    time: gl.getUniformLocation(program, "u_time"),
    pressure: gl.getUniformLocation(program, "u_pressure"),
    crackCount: gl.getUniformLocation(program, "u_crackCount"),
    cracks: gl.getUniformLocation(program, "u_cracks"),
    crackBirth: gl.getUniformLocation(program, "u_crackBirth"),
  };

  const state = {
    width: 1,
    height: 1,
    ratio: 1,
    mouseX: 0.5,
    mouseY: 0.5,
    targetX: 0.5,
    targetY: 0.5,
    pressure: 0,
    hasPointer: false,
    start: performance.now(),
    cracks: [],
  };

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  function uploadScene() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sourceCanvas);
  }

  function resize() {
    state.ratio = Math.min(window.devicePixelRatio || 1, 2);
    state.width = Math.max(2, Math.floor(window.innerWidth * state.ratio));
    state.height = Math.max(2, Math.floor(window.innerHeight * state.ratio));
    canvas.width = state.width;
    canvas.height = state.height;
    sourceCanvas.width = state.width;
    sourceCanvas.height = state.height;
    gl.viewport(0, 0, state.width, state.height);
    drawSource(sourceContext, state.width, state.height, state.ratio);
    uploadScene();
  }

  function setPointer(clientX, clientY) {
    state.targetX = clientX / window.innerWidth;
    state.targetY = 1 - clientY / window.innerHeight;
    state.hasPointer = true;
    stage.style.setProperty("--cursor-x", `${(state.targetX * 100).toFixed(2)}%`);
    stage.style.setProperty("--cursor-y", `${((1 - state.targetY) * 100).toFixed(2)}%`);
  }

  function addCrack(clientX, clientY, seconds) {
    const originX = clientX / window.innerWidth;
    const originY = 1 - clientY / window.innerHeight;
    const total = 16;
    const next = [];

    for (let i = 0; i < total; i++) {
      const main = i < 9;
      const angle = (i / total) * Math.PI * 2 + (Math.random() - 0.5) * 0.54;
      const length = (main ? 0.32 : 0.2) + Math.random() * (main ? 0.42 : 0.26);
      const bend = (Math.random() - 0.5) * 0.22;
      const startShift = main ? 0 : Math.random() * 0.13;
      const sx = originX + Math.cos(angle) * startShift * 0.45;
      const sy = originY + Math.sin(angle) * startShift * 0.45;
      const ex = sx + Math.cos(angle + bend) * length;
      const ey = sy + Math.sin(angle + bend) * length;

      next.push({
        x1: clamp(sx, -0.12, 1.12),
        y1: clamp(sy, -0.12, 1.12),
        x2: clamp(ex, -0.18, 1.18),
        y2: clamp(ey, -0.18, 1.18),
        birth: seconds + i * 0.026,
      });
    }

    state.cracks = next.slice(0, 22);
  }

  function render(now) {
    const seconds = (now - state.start) * 0.001;
    state.mouseX += (state.targetX - state.mouseX) * 0.08;
    state.mouseY += (state.targetY - state.mouseY) * 0.08;

    const speed = Math.hypot(state.targetX - state.mouseX, state.targetY - state.mouseY);
    const targetPressure = state.hasPointer ? clamp(0.52 + speed * 9.0, 0, 1) : 0.02;
    state.pressure += (targetPressure - state.pressure) * 0.055;
    stage.style.setProperty("--glint", state.pressure.toFixed(4));

    const crackData = new Float32Array(22 * 4);
    const crackBirth = new Float32Array(22);
    state.cracks.forEach((crack, index) => {
      const offset = index * 4;
      crackData[offset] = crack.x1;
      crackData[offset + 1] = crack.y1;
      crackData[offset + 2] = crack.x2;
      crackData[offset + 3] = crack.y2;
      crackBirth[index] = crack.birth;
    });

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(locations.position);
    gl.vertexAttribPointer(locations.position, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(locations.scene, 0);
    gl.uniform2f(locations.resolution, state.width, state.height);
    gl.uniform2f(locations.mouse, state.mouseX, state.mouseY);
    gl.uniform1f(locations.time, seconds);
    gl.uniform1f(locations.pressure, state.pressure);
    gl.uniform1f(locations.crackCount, state.cracks.length);
    gl.uniform4fv(locations.cracks, crackData);
    gl.uniform1fv(locations.crackBirth, crackBirth);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (event) => setPointer(event.clientX, event.clientY));
  window.addEventListener("pointerdown", (event) => setPointer(event.clientX, event.clientY));

  wordButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const seconds = (performance.now() - state.start) * 0.001;
      setPointer(event.clientX, event.clientY);
      addCrack(event.clientX, event.clientY, seconds);
    });
  });

  resize();
  requestAnimationFrame(render);
}
