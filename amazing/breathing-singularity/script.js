const canvas = document.querySelector("#singularity");
const root = document.querySelector(".experience");
const hit = document.querySelector(".singularity-hit");
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
uniform float u_near;
uniform float u_click;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
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
  float value = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amp * noise(p);
    p *= 2.03;
    amp *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 center = vec2(0.5);
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 p = (uv - center) * aspect;
  vec2 mouse = (u_mouse - center) * aspect;

  float breath = 0.5 + 0.5 * sin(u_time * 0.72);
  float slowBreath = smoothstep(0.0, 1.0, breath);
  vec2 toCenter = p;
  float d = length(toCenter);
  float mouseDistance = length(p - mouse);
  float gravity = u_near * exp(-mouseDistance * 3.2);
  float lens = (0.045 * gravity) / (d * d + 0.026);
  vec2 warped = p - normalize(toCenter + 0.0001) * lens * (u_near * 0.12);
  warped += normalize(mouse - p + 0.0001) * gravity * 0.024;

  float r = length(warped);
  float coreRadius = mix(0.0022, 0.0058, slowBreath) + u_click * 1.42;
  float core = smoothstep(coreRadius, 0.0, r);
  float corona = exp(-r * mix(260.0, 132.0, slowBreath)) * (0.46 + slowBreath * 0.58);
  float bloom = exp(-r * 34.0) * (0.028 + slowBreath * 0.07 + gravity * 0.48);
  float ring = sin((r - u_time * 0.012) * 92.0 - lens * 5.0);
  ring = smoothstep(0.82, 1.0, ring) * exp(-r * 13.0) * gravity * 0.22;

  float grain = hash(gl_FragCoord.xy + floor(u_time * 48.0));
  float dust = fbm(uv * vec2(190.0, 130.0) + u_time * 0.025);
  float dustMask = smoothstep(0.62, 1.0, dust) * (0.018 + gravity * 0.075);
  float vignette = smoothstep(1.12, 0.08, length(p));
  float pullLines = abs(sin(atan(warped.y, warped.x) * 20.0 + u_time * 0.28));
  pullLines = pow(pullLines, 24.0) * exp(-r * 5.6) * gravity * 0.22;

  vec3 blueEdge = vec3(0.54, 0.66, 1.0) * bloom * gravity;
  vec3 warmEdge = vec3(1.0, 0.88, 0.72) * ring;
  vec3 white = vec3(core * 1.45 + corona + bloom + pullLines);
  vec3 color = white + blueEdge + warmEdge + dustMask;
  color += (grain - 0.5) * (0.034 + gravity * 0.06);
  color *= vignette;

  float flash = smoothstep(0.02, 0.95, u_click);
  color = mix(color, vec3(1.0), flash);
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
  root.classList.add("is-open");
} else {
  const program = createProgram();
  const positionBuffer = gl.createBuffer();
  const locations = {
    position: gl.getAttribLocation(program, "a_position"),
    resolution: gl.getUniformLocation(program, "u_resolution"),
    mouse: gl.getUniformLocation(program, "u_mouse"),
    time: gl.getUniformLocation(program, "u_time"),
    near: gl.getUniformLocation(program, "u_near"),
    click: gl.getUniformLocation(program, "u_click"),
  };

  const state = {
    width: 1,
    height: 1,
    mouseX: -0.25,
    mouseY: -0.25,
    targetX: -0.25,
    targetY: -0.25,
    near: 0,
    click: 0,
    opened: false,
    hasPointer: false,
    start: performance.now(),
  };

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    state.width = Math.floor(window.innerWidth * ratio);
    state.height = Math.floor(window.innerHeight * ratio);
    canvas.width = state.width;
    canvas.height = state.height;
    gl.viewport(0, 0, state.width, state.height);
  }

  function setPointer(clientX, clientY) {
    state.targetX = clientX / window.innerWidth;
    state.targetY = 1 - clientY / window.innerHeight;
    state.hasPointer = true;
  }

  function render(now) {
    const seconds = (now - state.start) * 0.001;
    state.mouseX += (state.targetX - state.mouseX) * 0.055;
    state.mouseY += (state.targetY - state.mouseY) * 0.055;

    const dx = state.mouseX - 0.5;
    const dy = state.mouseY - 0.5;
    const distance = Math.hypot(dx, dy);
    const targetNear = state.hasPointer ? Math.max(0, Math.min(1, 1 - distance * 2.4)) : 0;
    state.near += (targetNear - state.near) * 0.07;
    if (state.opened) {
      state.click += (1 - state.click) * 0.045;
    }

    const pullX = (state.mouseX - 0.5) * state.near * 44;
    const pullY = -(state.mouseY - 0.5) * state.near * 44;
    const breath = 0.5 + 0.5 * Math.sin(seconds * 0.72);
    root.style.setProperty("--pull-x", `${pullX.toFixed(3)}px`);
    root.style.setProperty("--pull-y", `${pullY.toFixed(3)}px`);
    root.style.setProperty("--near", state.near.toFixed(4));
    root.style.setProperty("--breath", breath.toFixed(4));
    root.style.setProperty("--flash", state.click.toFixed(4));

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(locations.position);
    gl.vertexAttribPointer(locations.position, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(locations.resolution, state.width, state.height);
    gl.uniform2f(locations.mouse, state.mouseX, state.mouseY);
    gl.uniform1f(locations.time, seconds);
    gl.uniform1f(locations.near, state.near);
    gl.uniform1f(locations.click, state.click);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (event) => setPointer(event.clientX, event.clientY));
  window.addEventListener("pointerdown", (event) => setPointer(event.clientX, event.clientY));

  hit.addEventListener("click", () => {
    state.opened = true;
    root.classList.add("is-open");
  });

  resize();
  requestAnimationFrame(render);
}
