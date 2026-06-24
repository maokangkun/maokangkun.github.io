const canvas = document.querySelector("#universe");
const root = document.documentElement;
const gl = canvas.getContext("webgl", {
  alpha: false,
  antialias: false,
  depth: false,
  stencil: false,
  powerPreference: "high-performance",
});

const vertexSource = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentSource = `
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_progress;
uniform float u_near;
uniform float u_reduce;

float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 33.33);
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

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.52;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = r * p * 2.08 + 19.7;
    a *= 0.5;
  }
  return v;
}

vec3 palette(float t) {
  vec3 a = vec3(0.14, 0.09, 0.22);
  vec3 b = vec3(0.46, 0.62, 0.92);
  vec3 c = vec3(1.04, 0.84, 0.58);
  vec3 d = vec3(0.03, 0.44, 0.55);
  return a + b * cos(6.28318 * (c * t + d));
}

float shard(vec2 p, float scale, float speed) {
  vec2 q = p * scale;
  q.x += u_time * speed;
  vec2 cell = floor(q);
  vec2 local = fract(q) - 0.5;
  float rnd = hash(cell);
  float angle = rnd * 6.28318 + u_time * 0.08;
  mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  local = rot * local;
  float strip = smoothstep(0.026, 0.0, abs(local.y + sin(local.x * 7.0 + rnd * 5.0) * 0.022));
  float cut = smoothstep(0.42, 0.08, abs(local.x));
  return strip * cut * smoothstep(0.74, 1.0, rnd);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * aspect;
  vec2 raw = uv - 0.5;

  float open = smoothstep(0.0, 1.0, u_progress);
  float swallow = smoothstep(0.72, 1.0, open);
  float baseWidth = mix(0.0018, 0.34, pow(open, 1.65));
  baseWidth = mix(baseWidth, 1.42, swallow * swallow);

  float y = raw.y;
  float tremor = (u_near * 0.006 + open * 0.004) * (1.0 - u_reduce);
  float tear =
    sin(y * 34.0 + u_time * 1.9) * (0.003 + open * 0.019) +
    sin(y * 89.0 - u_time * 2.7) * (0.001 + u_near * 0.012) +
    (fbm(vec2(y * 5.2, u_time * 0.33)) - 0.5) * (0.006 + open * 0.062) +
    sin((uv.y + u_mouse.y) * 180.0 + u_time * 24.0) * tremor;

  float pinch = 0.74 + 0.26 * sin(y * 8.0 + fbm(vec2(y * 3.0, u_time * 0.06)) * 2.0);
  float width = baseWidth * pinch + open * open * 0.014;
  float dx = abs(raw.x - tear);
  float inside = smoothstep(width + 0.006, width - 0.006, dx);
  float edge = smoothstep(width + 0.012, width, dx) - smoothstep(width, width - 0.016, dx);
  float hairline = smoothstep(0.0037, 0.0, dx);
  float reveal = smoothstep(0.018, 0.12, open);

  vec2 warped = p;
  warped.x -= tear * aspect.x;
  float suction = inside * (0.18 + open * 0.65);
  warped.x *= mix(1.0, 0.42, suction);
  warped.y += sin(warped.x * 17.0 + u_time * 0.72) * open * 0.06;
  warped += vec2(
    fbm(warped * 2.0 + vec2(0.0, u_time * 0.08)),
    fbm(warped.yx * 2.7 - vec2(u_time * 0.06, 4.0))
  ) * (0.18 + open * 0.42);

  float fieldA = fbm(warped * 3.0 + vec2(u_time * 0.05, -u_time * 0.025));
  float fieldB = fbm(warped * 8.0 - vec2(u_time * 0.12, u_time * 0.055));
  float metal = smoothstep(0.38, 0.92, fieldA + fieldB * 0.48);
  float vein = pow(abs(sin((warped.x - warped.y) * 18.0 + fieldB * 7.0 + u_time * 0.72)), 8.0);
  float stars = smoothstep(0.984, 1.0, hash(floor((uv + fieldA * 0.018) * u_resolution.xy * 0.55)));
  stars *= smoothstep(0.06, 0.5, open);
  float fragments = shard(warped + vec2(0.2, -0.1), 5.4, 0.05) + shard(warped.yx, 9.0, -0.035);

  vec3 nebula = palette(fieldA * 0.82 + fieldB * 0.32 + u_time * 0.035);
  vec3 liquid = mix(vec3(0.73, 0.76, 0.82), vec3(0.98, 0.91, 0.72), metal);
  vec3 universe = mix(nebula * (0.54 + fieldB), liquid, metal * 0.44);
  universe += vec3(0.08, 0.42, 0.95) * vein * (0.28 + open * 0.5);
  universe += vec3(1.0, 0.92, 0.74) * fragments * (0.38 + open * 0.35);
  universe += vec3(1.0) * stars * (0.72 + open * 0.8);

  float vignette = smoothstep(1.1, 0.12, length(p));
  float mouthGlow = exp(-dx * mix(70.0, 10.0, open)) * (0.08 + open * 0.42);
  vec3 rim = vec3(1.0) * (edge * (1.15 + u_near * 1.2) + hairline * reveal);
  rim += vec3(0.44, 0.77, 1.0) * mouthGlow * reveal;

  vec3 color = universe * inside * vignette * reveal + rim * reveal;
  color += (hash(gl_FragCoord.xy + floor(u_time * 44.0)) - 0.5) * (0.035 + inside * 0.055);
  color = mix(color, universe + vec3(0.02), swallow);
  color = mix(color, vec3(0.0), 1.0 - max(inside, edge + hairline));

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

if (!gl) {
  document.body.classList.add("is-fallback");
} else {
  const program = createProgram();
  const positionBuffer = gl.createBuffer();
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const locations = {
    position: gl.getAttribLocation(program, "a_position"),
    resolution: gl.getUniformLocation(program, "u_resolution"),
    mouse: gl.getUniformLocation(program, "u_mouse"),
    time: gl.getUniformLocation(program, "u_time"),
    progress: gl.getUniformLocation(program, "u_progress"),
    near: gl.getUniformLocation(program, "u_near"),
    reduce: gl.getUniformLocation(program, "u_reduce"),
  };

  const state = {
    width: 1,
    height: 1,
    mouseX: 0.5,
    mouseY: 0.5,
    targetX: 0.5,
    targetY: 0.5,
    progress: 0,
    targetProgress: 0,
    near: 0,
    start: performance.now(),
    hasPointer: false,
  };

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    state.width = Math.max(1, Math.floor(window.innerWidth * ratio));
    state.height = Math.max(1, Math.floor(window.innerHeight * ratio));
    canvas.width = state.width;
    canvas.height = state.height;
    gl.viewport(0, 0, state.width, state.height);
    updateScroll();
  }

  function updateScroll() {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    state.targetProgress = clamp(window.scrollY / maxScroll, 0, 1);
  }

  function setPointer(clientX, clientY) {
    state.targetX = clientX / window.innerWidth;
    state.targetY = 1 - clientY / window.innerHeight;
    state.hasPointer = true;
  }

  function render(now) {
    const seconds = (now - state.start) * 0.001;
    const reduce = prefersReducedMotion.matches ? 1 : 0;
    const ease = reduce ? 1 : 0.075;

    state.mouseX += (state.targetX - state.mouseX) * 0.12;
    state.mouseY += (state.targetY - state.mouseY) * 0.12;
    state.progress += (state.targetProgress - state.progress) * ease;

    const centerDistance = Math.abs(state.mouseX - 0.5);
    const verticalBias = 0.72 + 0.28 * (1 - Math.abs(state.mouseY - 0.5) * 2);
    const targetNear = state.hasPointer ? clamp(1 - centerDistance * 8.5, 0, 1) * verticalBias : 0;
    state.near += (targetNear - state.near) * 0.08;

    const pulse = reduce ? 0 : Math.sin(seconds * 31.0) * Math.sin(seconds * 17.0);
    const shake = state.near * (0.5 + state.progress * 7.0);
    root.style.setProperty("--progress", state.progress.toFixed(4));
    root.style.setProperty("--near", state.near.toFixed(4));
    root.style.setProperty("--shake-x", `${(pulse * shake).toFixed(3)}px`);
    root.style.setProperty("--shake-y", `${(Math.cos(seconds * 23.0) * shake * 0.35).toFixed(3)}px`);

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(locations.position);
    gl.vertexAttribPointer(locations.position, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(locations.resolution, state.width, state.height);
    gl.uniform2f(locations.mouse, state.mouseX, state.mouseY);
    gl.uniform1f(locations.time, reduce ? 0 : seconds);
    gl.uniform1f(locations.progress, state.progress);
    gl.uniform1f(locations.near, state.near);
    gl.uniform1f(locations.reduce, reduce);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("pointermove", (event) => setPointer(event.clientX, event.clientY));
  window.addEventListener("pointerdown", (event) => setPointer(event.clientX, event.clientY));

  resize();
  updateScroll();
  requestAnimationFrame(render);
}
