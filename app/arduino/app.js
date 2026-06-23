const DIGITAL_PINS = Array.from({ length: 14 }, (_, index) => index);
const ANALOG_PINS = Array.from({ length: 6 }, (_, index) => `A${index}`);
const PWM_PINS = new Set([3, 5, 6, 9, 10, 11]);
const HIGH = 1;
const LOW = 0;
const INPUT = "INPUT";
const OUTPUT = "OUTPUT";
const INPUT_PULLUP = "INPUT_PULLUP";

const els = {
  codeEditor: document.querySelector("#codeEditor"),
  lineNumbers: document.querySelector("#lineNumbers"),
  compilerMessage: document.querySelector("#compilerMessage"),
  fileInput: document.querySelector("#fileInput"),
  runBtn: document.querySelector("#runBtn"),
  pauseBtn: document.querySelector("#pauseBtn"),
  stepBtn: document.querySelector("#stepBtn"),
  resetBtn: document.querySelector("#resetBtn"),
  exampleBtn: document.querySelector("#exampleBtn"),
  formatBtn: document.querySelector("#formatBtn"),
  speedRange: document.querySelector("#speedRange"),
  speedLabel: document.querySelector("#speedLabel"),
  loopLimit: document.querySelector("#loopLimit"),
  boardStatus: document.querySelector("#boardStatus"),
  runStatus: document.querySelector("#runStatus"),
  clockStatus: document.querySelector("#clockStatus"),
  phaseValue: document.querySelector("#phaseValue"),
  lineValue: document.querySelector("#lineValue"),
  loopValue: document.querySelector("#loopValue"),
  breakpointValue: document.querySelector("#breakpointValue"),
  breakpointInput: document.querySelector("#breakpointInput"),
  addBreakpointBtn: document.querySelector("#addBreakpointBtn"),
  clearBreakpointsBtn: document.querySelector("#clearBreakpointsBtn"),
  breakpointList: document.querySelector("#breakpointList"),
  pinBoard: document.querySelector("#pinBoard"),
  benchCanvas: document.querySelector("#benchCanvas"),
  wireLayer: document.querySelector("#wireLayer"),
  wireHint: document.querySelector("#wireHint"),
  digitalHeader: document.querySelector("#digitalHeader"),
  analogHeader: document.querySelector("#analogHeader"),
  powerHeader: document.querySelector("#powerHeader"),
  leftModules: document.querySelector("#leftModules"),
  rightModules: document.querySelector("#rightModules"),
  componentTemplate: document.querySelector("#componentTemplate"),
  addLedBtn: document.querySelector("#addLedBtn"),
  addSensorBtn: document.querySelector("#addSensorBtn"),
  clearWiresBtn: document.querySelector("#clearWiresBtn"),
  analogInputs: document.querySelector("#analogInputs"),
  serialOutput: document.querySelector("#serialOutput"),
  clearSerialBtn: document.querySelector("#clearSerialBtn"),
  serialInput: document.querySelector("#serialInput"),
  sendSerialBtn: document.querySelector("#sendSerialBtn")
};

const starterSketch = `#include <Servo.h>

Servo sweepServo;
const int ledPin = 13;
const int pwmLed = 9;
int brightness = 0;
int stepSize = 32;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  pinMode(pwmLed, OUTPUT);
  sweepServo.attach(6);
}

void loop() {
  int sensor = analogRead(A0);
  digitalWrite(ledPin, HIGH);
  analogWrite(pwmLed, brightness);
  sweepServo.write(map(sensor, 0, 1023, 0, 180));
  Serial.print("A0=");
  Serial.print(sensor);
  Serial.print(" brightness=");
  Serial.println(brightness);
  delay(300);

  digitalWrite(ledPin, LOW);
  delay(300);
  brightness = brightness + stepSize;
  if (brightness >= 255 || brightness <= 0) {
    stepSize = -stepSize;
  }
}`;

const state = {
  pins: new Map(),
  analog: new Map(),
  components: [],
  connections: [],
  selectedEndpoint: null,
  nextComponentId: 1,
  breakpoints: new Set(),
  compiled: null,
  context: null,
  running: false,
  paused: false,
  phase: "idle",
  currentLine: null,
  loops: 0,
  time: 0,
  timer: null,
  serialBuffer: "",
  serialInput: []
};

function initPins() {
  DIGITAL_PINS.forEach((pin) => {
    state.pins.set(pin, {
      name: `D${pin}`,
      mode: INPUT,
      value: LOW,
      analogValue: 0,
      tone: null
    });
  });
  ANALOG_PINS.forEach((pin) => state.analog.set(pin, 0));
}

function pinKey(pin) {
  if (typeof pin === "string") {
    const normalized = pin.toUpperCase();
    if (/^A[0-5]$/.test(normalized)) return normalized;
  }
  if (Number.isFinite(Number(pin))) return Number(pin);
  return pin;
}

function setMessage(message, type = "") {
  els.compilerMessage.textContent = message;
  els.compilerMessage.className = `compiler-message ${type}`.trim();
}

function appendSerial(text) {
  state.serialBuffer += String(text);
  if (state.serialBuffer.length > 18000) {
    state.serialBuffer = state.serialBuffer.slice(-14000);
  }
  els.serialOutput.textContent = state.serialBuffer;
  els.serialOutput.scrollTop = els.serialOutput.scrollHeight;
}

function resetRuntime({ keepMessage = false } = {}) {
  window.clearTimeout(state.timer);
  state.timer = null;
  state.running = false;
  state.paused = false;
  state.phase = "idle";
  state.currentLine = null;
  state.loops = 0;
  state.time = 0;
  state.context = null;
  DIGITAL_PINS.forEach((pin) => {
    const record = state.pins.get(pin);
    record.mode = INPUT;
    record.value = LOW;
    record.analogValue = 0;
    record.tone = null;
    delete record.servoAngle;
  });
  if (!keepMessage) setMessage("已复位。", "ok");
  updateUi();
}

function createArduinoApi() {
  const servos = new Set();
  const api = {
    HIGH,
    LOW,
    INPUT,
    OUTPUT,
    INPUT_PULLUP,
    A0: "A0",
    A1: "A1",
    A2: "A2",
    A3: "A3",
    A4: "A4",
    A5: "A5",
    PI: Math.PI,
    TWO_PI: Math.PI * 2,
    HALF_PI: Math.PI / 2,
    DEG_TO_RAD: Math.PI / 180,
    RAD_TO_DEG: 180 / Math.PI,
    Serial: {
      baud: 0,
      begin(rate) {
        this.baud = Number(rate) || 0;
        appendSerial(`[Serial ${this.baud} baud]\n`);
      },
      print(value = "") {
        appendSerial(value);
      },
      println(value = "") {
        appendSerial(`${value}\n`);
      },
      write(value = "") {
        appendSerial(typeof value === "number" ? String.fromCharCode(value) : value);
      },
      available() {
        return state.serialInput.length;
      },
      read() {
        return state.serialInput.length ? state.serialInput.shift().charCodeAt(0) : -1;
      },
      readString() {
        const text = state.serialInput.join("");
        state.serialInput = [];
        return text;
      }
    },
    Servo: class Servo {
      constructor() {
        this.pin = null;
        this.angle = 0;
        servos.add(this);
      }
      attach(pin) {
        this.pin = Number(pin);
        return this.pin;
      }
      detach() {
        this.pin = null;
      }
      write(angle) {
        this.angle = constrain(Number(angle) || 0, 0, 180);
        if (this.pin !== null && state.pins.has(this.pin)) {
          state.pins.get(this.pin).servoAngle = this.angle;
        }
      }
      read() {
        return this.angle;
      }
      attached() {
        return this.pin !== null;
      }
    },
    pinMode(pin, mode) {
      const key = Number(pin);
      if (state.pins.has(key)) state.pins.get(key).mode = mode;
    },
    digitalWrite(pin, value) {
      const key = Number(pin);
      if (!state.pins.has(key)) return;
      const record = state.pins.get(key);
      record.value = value ? HIGH : LOW;
      record.analogValue = record.value ? 255 : 0;
    },
    digitalRead(pin) {
      const key = pinKey(pin);
      if (typeof key === "string") return (state.analog.get(key) || 0) > 511 ? HIGH : LOW;
      return state.pins.has(key) ? state.pins.get(key).value : LOW;
    },
    analogWrite(pin, value) {
      const key = Number(pin);
      if (!state.pins.has(key)) return;
      const record = state.pins.get(key);
      record.analogValue = constrain(Number(value) || 0, 0, 255);
      record.value = record.analogValue > 0 ? HIGH : LOW;
    },
    analogRead(pin) {
      const key = pinKey(pin);
      return state.analog.get(key) || 0;
    },
    delay(ms) {
      state.time += Math.max(0, Number(ms) || 0);
    },
    delayMicroseconds(us) {
      state.time += Math.max(0, (Number(us) || 0) / 1000);
    },
    millis() {
      return Math.floor(state.time);
    },
    micros() {
      return Math.floor(state.time * 1000);
    },
    tone(pin, frequency, duration = null) {
      const key = Number(pin);
      if (state.pins.has(key)) {
        state.pins.get(key).tone = { frequency: Number(frequency) || 0, duration };
      }
    },
    noTone(pin) {
      const key = Number(pin);
      if (state.pins.has(key)) state.pins.get(key).tone = null;
    },
    pulseIn(pin) {
      return api.digitalRead(pin) ? 1000 : 0;
    },
    map,
    constrain,
    min: Math.min,
    max: Math.max,
    abs: Math.abs,
    pow: Math.pow,
    sq(value) {
      return value * value;
    },
    sqrt: Math.sqrt,
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    random(minValue, maxValue) {
      if (maxValue === undefined) return Math.floor(Math.random() * minValue);
      return Math.floor(minValue + Math.random() * (maxValue - minValue));
    }
  };
  return api;
}

function constrain(value, minValue, maxValue) {
  return Math.min(Math.max(value, minValue), maxValue);
}

function map(value, inMin, inMax, outMin, outMax) {
  return Math.round((value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin);
}

function stripComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

function extractFunction(code, name) {
  const signature = new RegExp(`\\bvoid\\s+${name}\\s*\\(\\s*\\)\\s*\\{`, "m");
  const match = signature.exec(code);
  if (!match) return null;
  let index = match.index + match[0].length;
  let depth = 1;
  while (index < code.length && depth > 0) {
    const char = code[index++];
    if (char === "{") depth++;
    if (char === "}") depth--;
  }
  if (depth !== 0) throw new Error(`${name}() 的花括号不完整`);
  const bodyStart = match.index + match[0].length;
  return {
    body: code.slice(bodyStart, index - 1),
    startLine: code.slice(0, bodyStart).split("\n").length,
    startIndex: match.index,
    endIndex: index
  };
}

function removeKnownFunctions(code) {
  const ranges = ["setup", "loop"]
    .map((name) => extractFunction(code, name))
    .filter(Boolean)
    .sort((a, b) => b.startIndex - a.startIndex);
  return ranges.reduce((current, range) => {
    return `${current.slice(0, range.startIndex)}\n${current.slice(range.endIndex)}`;
  }, code);
}

function removeArduinoDirectives(code) {
  return code
    .replace(/^\s*#.*$/gm, "")
    .replace(/\b(?:unsigned\s+)?(?:long|int|float|double|bool|boolean|byte|char|String)\s+([A-Za-z_$][\w$]*)/g, "let $1")
    .replace(/\bconst\s+let\b/g, "const")
    .replace(/\bString\b/g, "String")
    .replace(/\btrue\b/g, "true")
    .replace(/\bfalse\b/g, "false");
}

function transformGlobals(code) {
  const withoutFunctions = removeKnownFunctions(code);
  return removeArduinoDirectives(withoutFunctions)
    .replace(/\bServo\s+([A-Za-z_$][\w$]*)\s*;/g, "let $1 = new Servo();")
    .trim();
}

function instrumentBody(body, startLine) {
  const lines = body.split("\n");
  return lines.map((line, offset) => {
    const lineNo = startLine + offset;
    if (!line.trim()) return line;
    return `__trace(${lineNo});\n${removeArduinoDirectives(line)}`;
  }).join("\n");
}

function compileSketch() {
  const source = els.codeEditor.value;
  const cleanSource = stripComments(source);
  const setup = extractFunction(cleanSource, "setup");
  const loop = extractFunction(cleanSource, "loop");
  if (!loop) throw new Error("没有找到 void loop()。");
  const globals = transformGlobals(cleanSource);
  const setupBody = setup ? instrumentBody(setup.body, setup.startLine) : "";
  const loopBody = instrumentBody(loop.body, loop.startLine);
  const js = `"use strict";\n${globals}\nreturn { setup: function(){\n${setupBody}\n}, loop: function(){\n${loopBody}\n} };`;
  const api = createArduinoApi();
  const names = Object.keys(api).concat("__trace");
  const values = Object.values(api);
  const trace = (line) => {
    state.currentLine = line;
    if (state.breakpoints.has(line)) {
      state.paused = true;
      state.running = false;
      throw new BreakpointHit(line);
    }
  };
  const factory = Function(...names, js);
  return factory(...values, trace);
}

class BreakpointHit extends Error {
  constructor(line) {
    super(`命中断点：第 ${line} 行`);
    this.line = line;
  }
}

function startRun() {
  try {
    if (!state.compiled || !state.context) {
      resetRuntime({ keepMessage: true });
      state.context = compileSketch();
      state.compiled = true;
      state.phase = "setup";
      state.context.setup();
      state.phase = "loop";
    }
    state.running = true;
    state.paused = false;
    setMessage("编译成功，正在运行。", "ok");
    scheduleTick(0);
  } catch (error) {
    handleRuntimeError(error);
  }
  updateUi();
}

function scheduleTick(delay = null) {
  window.clearTimeout(state.timer);
  if (!state.running || state.paused) return;
  const speed = Number(els.speedRange.value) || 1;
  const wait = delay === null ? Math.max(12, 180 / speed) : delay;
  state.timer = window.setTimeout(runLoopChunk, wait);
}

function runLoopChunk() {
  if (!state.running || state.paused || !state.context) return;
  const limit = constrain(Number(els.loopLimit.value) || 250, 1, 5000);
  try {
    const speed = Number(els.speedRange.value) || 1;
    const iterations = Math.max(1, Math.round(speed));
    for (let i = 0; i < iterations && i < limit; i += 1) {
      state.phase = "loop";
      state.context.loop();
      state.loops += 1;
    }
    updateUi();
    scheduleTick();
  } catch (error) {
    handleRuntimeError(error);
  }
}

function stepOnce() {
  try {
    if (!state.context) {
      resetRuntime({ keepMessage: true });
      state.context = compileSketch();
      state.compiled = true;
      state.phase = "setup";
      state.context.setup();
      setMessage("已执行 setup()，再次单步将执行 loop()。", "ok");
    } else {
      state.phase = "loop";
      state.context.loop();
      state.loops += 1;
      setMessage("已执行一次 loop()。", "ok");
    }
    state.running = false;
    state.paused = true;
  } catch (error) {
    handleRuntimeError(error);
  }
  updateUi();
}

function pauseRun() {
  state.running = false;
  state.paused = true;
  window.clearTimeout(state.timer);
  setMessage("已暂停。", "ok");
  updateUi();
}

function handleRuntimeError(error) {
  state.running = false;
  window.clearTimeout(state.timer);
  if (error instanceof BreakpointHit) {
    setMessage(error.message, "ok");
  } else {
    setMessage(`错误：${error.message}`, "error");
    console.error(error);
  }
  updateUi();
}

function endpointId(endpoint) {
  if (!endpoint) return "";
  return `${endpoint.type}:${endpoint.id}:${endpoint.port}`;
}

function endpointLabel(endpoint) {
  if (!endpoint) return "";
  if (endpoint.type === "board") return endpoint.port;
  const component = state.components.find((item) => item.id === endpoint.id);
  return component ? `${component.name} ${endpoint.port}` : endpoint.port;
}

function getPinEndpointName(endpoint) {
  if (!endpoint || endpoint.type !== "board") return null;
  if (/^D\d+$/.test(endpoint.port)) return Number(endpoint.port.slice(1));
  if (/^A\d+$/.test(endpoint.port)) return endpoint.port;
  return endpoint.port;
}

function selectEndpoint(endpoint) {
  const current = endpointId(state.selectedEndpoint);
  const next = endpointId(endpoint);
  if (current === next) {
    state.selectedEndpoint = null;
    updateUi();
    return;
  }
  if (!state.selectedEndpoint) {
    state.selectedEndpoint = endpoint;
    updateUi();
    return;
  }
  if (state.selectedEndpoint.type !== endpoint.type) {
    const boardEndpoint = state.selectedEndpoint.type === "board" ? state.selectedEndpoint : endpoint;
    const moduleEndpoint = state.selectedEndpoint.type === "module" ? state.selectedEndpoint : endpoint;
    const exists = state.connections.some((connection) => {
      return endpointId(connection.board) === endpointId(boardEndpoint)
        && endpointId(connection.module) === endpointId(moduleEndpoint);
    });
    if (!exists) {
      state.connections.push({ board: boardEndpoint, module: moduleEndpoint });
    }
    state.selectedEndpoint = null;
    updateUi();
    return;
  }
  state.selectedEndpoint = endpoint;
  updateUi();
}

function updateWireHint() {
  if (!els.wireHint) return;
  if (!state.selectedEndpoint) {
    els.wireHint.textContent = "选择一个板子引脚开始连线。";
    return;
  }
  els.wireHint.textContent = `已选择 ${endpointLabel(state.selectedEndpoint)}，请选择另一侧端口。`;
}

function renderBoardHeaders() {
  const selected = endpointId(state.selectedEndpoint);
  const makePin = (name, label = name) => {
    const pinName = getPinEndpointName({ type: "board", port: name });
    const record = state.pins.get(pinName);
    const button = document.createElement("button");
    button.type = "button";
    button.className = [
      "board-pin",
      record && record.value ? "high" : "",
      typeof pinName === "number" && PWM_PINS.has(pinName) && record && record.analogValue > 0 && record.analogValue < 255 ? "pwm" : "",
      selected === endpointId({ type: "board", id: "uno", port: name }) ? "selected" : ""
    ].filter(Boolean).join(" ");
    button.dataset.endpoint = endpointId({ type: "board", id: "uno", port: name });
    button.innerHTML = `<span>${label}</span>`;
    button.title = `${name} 引脚`;
    button.addEventListener("click", () => selectEndpoint({ type: "board", id: "uno", port: name }));
    return button;
  };

  els.digitalHeader.replaceChildren(...DIGITAL_PINS.slice().reverse().map((pin) => makePin(`D${pin}`, pin)));
  els.analogHeader.replaceChildren(...ANALOG_PINS.map((pin) => makePin(pin, pin)));
  els.powerHeader.replaceChildren(
    makePin("VIN", "VIN"),
    makePin("GND", "GND"),
    makePin("5V", "5V"),
    makePin("3V3", "3V3")
  );
}

function renderPins() {
  els.pinBoard.innerHTML = "";
  DIGITAL_PINS.forEach((pin) => {
    const record = state.pins.get(pin);
    const card = document.createElement("article");
    card.className = [
      "pin",
      record.value ? "high" : "",
      PWM_PINS.has(pin) && record.analogValue > 0 && record.analogValue < 255 ? "pwm" : "",
      record.mode === INPUT || record.mode === INPUT_PULLUP ? "input" : ""
    ].filter(Boolean).join(" ");
    const percent = Math.round(record.analogValue / 255 * 100);
    card.innerHTML = `
      <div class="pin-name"><span>D${pin}</span><span>${record.value ? "HIGH" : "LOW"}</span></div>
      <div class="pin-mode">${record.mode}${PWM_PINS.has(pin) ? " · PWM" : ""}</div>
      <div class="pin-value">值 ${record.analogValue}${record.tone ? ` · ${record.tone.frequency} Hz` : ""}${record.servoAngle !== undefined ? ` · ${record.servoAngle}°` : ""}</div>
      <div class="pin-meter"><span style="width:${percent}%"></span></div>
    `;
    els.pinBoard.append(card);
  });
}

function renderAnalogInputs() {
  els.analogInputs.innerHTML = "";
  ANALOG_PINS.forEach((pin) => {
    const row = document.createElement("label");
    row.className = "analog-row";
    row.innerHTML = `<span>${pin}</span><input type="range" min="0" max="1023" value="${state.analog.get(pin)}"><strong>${state.analog.get(pin)}</strong>`;
    const input = row.querySelector("input");
    const value = row.querySelector("strong");
    input.addEventListener("input", () => {
      state.analog.set(pin, Number(input.value));
      value.textContent = input.value;
    });
    els.analogInputs.append(row);
  });
}

function renderComponents() {
  els.leftModules.innerHTML = "";
  els.rightModules.innerHTML = "";
  state.components.forEach((component, index) => {
    const node = document.createElement("article");
    const pin = Number(component.pin);
    const record = state.pins.get(pin);
    const active = component.type === "sensor" ? true : record && (record.value || record.tone || record.servoAngle !== undefined);
    const selected = endpointId(state.selectedEndpoint);
    node.className = `sensor-module ${active ? "active" : ""}`;
    if (component.type === "servo" && record) {
      node.style.setProperty("--angle", `${record.servoAngle || 0}deg`);
    }

    const visualClass = {
      led: "light-icon",
      servo: "servo-icon",
      buzzer: "buzzer-icon",
      sensor: "sensor-icon"
    }[component.type] || "light-icon";
    const kindText = {
      led: "LED",
      servo: "Servo",
      buzzer: "Buzzer",
      sensor: "Analog Sensor"
    }[component.type] || "Module";
    const ports = component.type === "sensor" ? ["VCC", "OUT", "GND"] : ["SIG", "5V", "GND"];

    node.innerHTML = `
      <div class="module-head">
        <strong>${component.name}</strong>
        <span class="module-kind">${kindText}</span>
      </div>
      <div class="module-visual"><div class="${visualClass}"></div></div>
      <div class="module-ports"></div>
      <div class="module-actions"><button type="button">删除</button></div>
    `;

    const portWrap = node.querySelector(".module-ports");
    ports.forEach((port) => {
      const endpoint = { type: "module", id: component.id, port };
      const button = document.createElement("button");
      button.type = "button";
      button.className = `module-port ${selected === endpointId(endpoint) ? "selected" : ""}`;
      button.dataset.endpoint = endpointId(endpoint);
      button.textContent = port;
      button.title = `${component.name} ${port}`;
      button.addEventListener("click", () => selectEndpoint(endpoint));
      portWrap.append(button);
    });

    node.querySelector(".module-actions button").addEventListener("click", () => {
      state.connections = state.connections.filter((connection) => connection.module.id !== component.id);
      state.components.splice(index, 1);
      updateUi();
    });

    if (index % 2 === 0) els.leftModules.append(node);
    else els.rightModules.append(node);
  });
}

function syncComponentPinsFromConnections() {
  state.connections.forEach((connection) => {
    const component = state.components.find((item) => item.id === connection.module.id);
    if (!component) return;
    const pin = getPinEndpointName(connection.board);
    const signalPorts = ["SIG", "OUT"];
    if (signalPorts.includes(connection.module.port) && typeof pin === "number") {
      component.pin = pin;
    }
    if (signalPorts.includes(connection.module.port) && typeof pin === "string" && /^A\d+$/.test(pin)) {
      component.pin = pin;
    }
  });
}

function renderWires() {
  if (!els.wireLayer || !els.benchCanvas) return;
  const canvasRect = els.benchCanvas.getBoundingClientRect();
  const paths = state.connections.map((connection, index) => {
    const boardNode = document.querySelector(`[data-endpoint="${endpointId(connection.board)}"]`);
    const moduleNode = document.querySelector(`[data-endpoint="${endpointId(connection.module)}"]`);
    if (!boardNode || !moduleNode) return "";
    const a = boardNode.getBoundingClientRect();
    const b = moduleNode.getBoundingClientRect();
    const x1 = a.left + a.width / 2 - canvasRect.left;
    const y1 = a.top + a.height / 2 - canvasRect.top;
    const x2 = b.left + b.width / 2 - canvasRect.left;
    const y2 = b.top + b.height / 2 - canvasRect.top;
    const curve = Math.max(50, Math.abs(x2 - x1) * .32);
    const c1 = x1 < x2 ? x1 + curve : x1 - curve;
    const c2 = x1 < x2 ? x2 - curve : x2 + curve;
    const colors = ["#d64a35", "#ef9b20", "#3478f6", "#169b62", "#7b61ff"];
    return `<path d="M ${x1} ${y1} C ${c1} ${y1}, ${c2} ${y2}, ${x2} ${y2}" stroke="${colors[index % colors.length]}"></path>`;
  });
  els.wireLayer.innerHTML = paths.join("");
}

function renderLineNumbers() {
  const count = els.codeEditor.value.split("\n").length;
  const fragment = document.createDocumentFragment();
  for (let index = 1; index <= count; index += 1) {
    const line = document.createElement("span");
    line.textContent = state.breakpoints.has(index) ? `● ${index}` : index;
    line.className = [
      state.currentLine === index ? "active" : "",
      state.breakpoints.has(index) ? "breakpoint" : ""
    ].filter(Boolean).join(" ");
    line.title = `第 ${index} 行`;
    line.addEventListener("click", () => toggleBreakpoint(index));
    fragment.append(line);
  }
  els.lineNumbers.replaceChildren(fragment);
}

function renderBreakpoints() {
  els.breakpointList.innerHTML = "";
  Array.from(state.breakpoints).sort((a, b) => a - b).forEach((line) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `第 ${line} 行 ×`;
    button.addEventListener("click", () => toggleBreakpoint(line));
    item.append(button);
    els.breakpointList.append(item);
  });
}

function updateUi() {
  syncComponentPinsFromConnections();
  els.runStatus.textContent = state.running ? "运行中" : state.paused ? "已暂停" : "已停止";
  els.clockStatus.textContent = `${Math.floor(state.time)} ms`;
  els.phaseValue.textContent = state.phase;
  els.lineValue.textContent = state.currentLine || "-";
  els.loopValue.textContent = state.loops;
  els.breakpointValue.textContent = state.breakpoints.size;
  els.pauseBtn.disabled = !state.running;
  els.speedLabel.textContent = `${Number(els.speedRange.value).toFixed(1)}x`;
  updateWireHint();
  renderBoardHeaders();
  renderPins();
  renderComponents();
  renderLineNumbers();
  renderBreakpoints();
  requestAnimationFrame(renderWires);
}

function toggleBreakpoint(line) {
  if (state.breakpoints.has(line)) state.breakpoints.delete(line);
  else state.breakpoints.add(line);
  updateUi();
}

function addComponent(type = "led", pin = 13, name = null) {
  const labels = {
    led: "LED",
    servo: "舵机",
    buzzer: "蜂鸣器",
    sensor: "超声波"
  };
  state.components.push({
    id: state.nextComponentId++,
    type,
    pin,
    name: name || `${labels[type] || "模块"} ${state.nextComponentId - 1}`
  });
  updateUi();
}

function connect(boardPort, componentId, modulePort) {
  state.connections.push({
    board: { type: "board", id: "uno", port: boardPort },
    module: { type: "module", id: componentId, port: modulePort }
  });
}

function basicFormat(code) {
  let indent = 0;
  return code.split("\n").map((raw) => {
    const line = raw.trim();
    if (!line) return "";
    if (line.startsWith("}")) indent = Math.max(0, indent - 1);
    const formatted = `${"  ".repeat(indent)}${line}`;
    if (line.endsWith("{")) indent += 1;
    return formatted;
  }).join("\n");
}

els.codeEditor.value = starterSketch;
initPins();
renderAnalogInputs();
addComponent("led", 13, "板载 LED 实验");
addComponent("led", 9, "PWM 调光 LED");
addComponent("servo", 6, "180° 舵机");
addComponent("sensor", "A0", "模拟传感器");
connect("D13", 1, "SIG");
connect("D9", 2, "SIG");
connect("D6", 3, "SIG");
connect("A0", 4, "OUT");
connect("5V", 4, "VCC");
connect("GND", 4, "GND");
setMessage("已载入示例。点击运行开始仿真。", "ok");

els.runBtn.addEventListener("click", startRun);
els.pauseBtn.addEventListener("click", pauseRun);
els.stepBtn.addEventListener("click", stepOnce);
els.resetBtn.addEventListener("click", () => resetRuntime());
els.exampleBtn.addEventListener("click", () => {
  els.codeEditor.value = starterSketch;
  state.compiled = null;
  resetRuntime({ keepMessage: true });
  setMessage("已重新载入示例。", "ok");
  updateUi();
});
els.formatBtn.addEventListener("click", () => {
  els.codeEditor.value = basicFormat(els.codeEditor.value);
  updateUi();
});
els.fileInput.addEventListener("change", async () => {
  const [file] = els.fileInput.files;
  if (!file) return;
  els.codeEditor.value = await file.text();
  state.compiled = null;
  resetRuntime({ keepMessage: true });
  setMessage(`已上传 ${file.name}。`, "ok");
  updateUi();
});
els.speedRange.addEventListener("input", updateUi);
els.codeEditor.addEventListener("input", () => {
  state.compiled = null;
  updateUi();
});
els.codeEditor.addEventListener("scroll", () => {
  els.lineNumbers.scrollTop = els.codeEditor.scrollTop;
});
els.codeEditor.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    const start = els.codeEditor.selectionStart;
    const end = els.codeEditor.selectionEnd;
    els.codeEditor.value = `${els.codeEditor.value.slice(0, start)}  ${els.codeEditor.value.slice(end)}`;
    els.codeEditor.selectionStart = els.codeEditor.selectionEnd = start + 2;
    updateUi();
  }
});
els.addBreakpointBtn.addEventListener("click", () => {
  const line = Number(els.breakpointInput.value);
  if (line > 0) {
    state.breakpoints.add(line);
    els.breakpointInput.value = "";
    updateUi();
  }
});
els.clearBreakpointsBtn.addEventListener("click", () => {
  state.breakpoints.clear();
  updateUi();
});
els.addLedBtn.addEventListener("click", () => addComponent("led", 13));
els.addSensorBtn.addEventListener("click", () => addComponent("sensor", "A0"));
els.clearWiresBtn.addEventListener("click", () => {
  state.connections = [];
  state.selectedEndpoint = null;
  updateUi();
});
window.addEventListener("resize", () => requestAnimationFrame(renderWires));
els.clearSerialBtn.addEventListener("click", () => {
  state.serialBuffer = "";
  els.serialOutput.textContent = "";
});
els.sendSerialBtn.addEventListener("click", () => {
  const text = els.serialInput.value;
  state.serialInput.push(...text.split(""), "\n");
  appendSerial(`> ${text}\n`);
  els.serialInput.value = "";
});
els.serialInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") els.sendSerialBtn.click();
});

updateUi();
