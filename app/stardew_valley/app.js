const canvas2d = document.querySelector("#gameCanvas2d");
const canvas3d = document.querySelector("#gameCanvas3d");
const ctx2d = canvas2d.getContext("2d");
const ctx3d = canvas3d.getContext("2d");
const viewportWrap = document.querySelector(".viewport-wrap");
const dayText = document.querySelector("#dayText");
const coinText = document.querySelector("#coinText");
const energyText = document.querySelector("#energyText");
const bagText = document.querySelector("#bagText");
const seedText = document.querySelector("#seedText");
const messageLog = document.querySelector("#messageLog");
const toolGrid = document.querySelector("#toolGrid");
const viewSwitch = document.querySelector("#viewSwitch");
const useBtn = document.querySelector("#useBtn");
const sleepBtn = document.querySelector("#sleepBtn");
const mobilePad = document.querySelector(".mobile-pad");

const ROOT = "asset";
const TILE = 32;
const MAP_W = 46;
const MAP_H = 32;
const DAY_LENGTH = 220;
const CROP_PRICE = 18;
const GROW_DAYS = 4;

const ASSET_PATHS = {
  outdoors: `${ROOT}/Maps/spring_outdoorsTileSheet..png`,
  objects: `${ROOT}/Maps/springobjects..png`,
  crops: `${ROOT}/TileSheets/crops..png`,
  player: `${ROOT}/Characters/Abigail..png`,
  npc: `${ROOT}/Characters/Leah..png`,
  houses: `${ROOT}/Buildings/houses..png`,
  cursors: `${ROOT}/LooseSprites/Cursors..png`,
  dialog: `${ROOT}/LooseSprites/DialogBoxGreen..png`,
  tools: `${ROOT}/TileSheets/tools..png`
};

const TILE_SRC = {
  grass: [0, 96],
  grassAlt: [16, 96],
  grassFlower: [32, 96],
  water: [0, 704],
  waterAlt: [16, 704],
  path: [128, 272],
  pathAlt: [144, 272],
  soil: [80, 224],
  wood: [96, 224],
  fence: [80, 176]
};

const tools = ["hoe", "seed", "water", "pick"];
const keys = new Set();
const moveTouches = new Set();
const assets = {};
const plots = new Map();

const state = {
  mode: "2d",
  day: 1,
  minute: 6 * 60,
  dayTimer: 0,
  coins: 80,
  energy: 100,
  seeds: 12,
  bag: 0,
  tool: "hoe",
  selected: "22,20",
  messageTimer: 0,
  loaded: false,
  dialogOpen: false,
  player: {
    x: 22,
    y: 20,
    dir: 0,
    walk: 0
  }
};

const camera = { x: 0, y: 0 };
const ui = {
  npc: { x: 30, y: 18, name: "林间旅人", line: "今年春天的土很软，浇过水的作物会在夜里长高。" },
  farmRect: { x: 17, y: 15, w: 11, h: 7 }
};

init();

async function init() {
  resize();
  bindEvents();
  buildFarm();
  showMessage("正在载入本地素材...");
  await loadAssets();
  state.loaded = true;
  showMessage("农场准备好了。WASD 移动，空格使用工具。");
  updateMode();
  updateHud();
  requestAnimationFrame(tick);
}

function bindEvents() {
  window.addEventListener("resize", resize);
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", (event) => keys.delete(event.key.toLowerCase()));
  canvas2d.addEventListener("pointerdown", handlePointer);
  canvas3d.addEventListener("pointerdown", handlePointer);
  toolGrid.addEventListener("click", chooseTool);
  viewSwitch.addEventListener("click", chooseMode);
  useBtn.addEventListener("click", useTool);
  sleepBtn.addEventListener("click", sleep);
  mobilePad.addEventListener("pointerdown", setMobileMove);
  mobilePad.addEventListener("pointerup", clearMobileMove);
  mobilePad.addEventListener("pointercancel", clearMobileMove);
  mobilePad.addEventListener("pointerleave", clearMobileMove);
}

function loadAssets() {
  const entries = Object.entries(ASSET_PATHS);
  return Promise.all(entries.map(([key, src]) => loadImage(src).then((image) => {
    assets[key] = image;
  })));
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`素材载入失败: ${src}`));
    image.src = src;
  });
}

function buildFarm() {
  const { x, y, w, h } = ui.farmRect;
  for (let py = y; py < y + h; py++) {
    for (let px = x; px < x + w; px++) {
      plots.set(keyOf(px, py), {
        x: px,
        y: py,
        tilled: false,
        watered: false,
        crop: null
      });
    }
  }
  [
    [18, 16, 1],
    [19, 16, 2],
    [20, 16, 2],
    [18, 17, 1],
    [19, 17, 3],
    [20, 17, 3],
    [25, 16, 4],
    [26, 16, 4],
    [25, 17, 2],
    [26, 17, 2]
  ].forEach(([x, y, age]) => {
    const plot = plots.get(keyOf(x, y));
    if (!plot) return;
    plot.tilled = true;
    plot.crop = { age, wateredToday: false, mature: age >= GROW_DAYS };
  });
}

function tick(time) {
  const delta = Math.min(0.04, (time - (tick.last || time)) / 1000);
  tick.last = time;
  update(delta);
  draw();
  requestAnimationFrame(tick);
}

function update(delta) {
  updateMovement(delta);
  updateClock(delta);
  updateMessage(delta);
  updateHud();
}

function updateMovement(delta) {
  const player = state.player;
  let dx = 0;
  let dy = 0;
  if (keys.has("w") || keys.has("arrowup") || moveTouches.has("up")) dy -= 1;
  if (keys.has("s") || keys.has("arrowdown") || moveTouches.has("down")) dy += 1;
  if (keys.has("a") || keys.has("arrowleft") || moveTouches.has("left")) dx -= 1;
  if (keys.has("d") || keys.has("arrowright") || moveTouches.has("right")) dx += 1;

  if (dx || dy) {
    const length = Math.hypot(dx, dy);
    dx /= length;
    dy /= length;
    player.x = clamp(player.x + dx * delta * 4.6, 3.2, MAP_W - 3.2);
    player.y = clamp(player.y + dy * delta * 4.6, 4.2, MAP_H - 3.2);
    player.walk += delta * 9;
    if (Math.abs(dx) > Math.abs(dy)) player.dir = dx > 0 ? 2 : 1;
    else player.dir = dy > 0 ? 0 : 3;
    const plot = nearestPlot();
    if (plot && distance(player.x, player.y, plot.x + 0.5, plot.y + 0.5) < 1.4) {
      state.selected = keyOf(plot.x, plot.y);
    }
  }
}

function updateClock(delta) {
  state.dayTimer += delta;
  state.minute = 6 * 60 + (state.dayTimer / DAY_LENGTH) * 18 * 60;
  if (state.minute >= 24 * 60) nextDay();
}

function handleKeyDown(event) {
  const key = event.key.toLowerCase();
  if ([" ", "enter"].includes(key)) {
    event.preventDefault();
    useTool();
    return;
  }
  if (key === "e") {
    talk();
    return;
  }
  const number = Number(key);
  if (number >= 1 && number <= 4) {
    state.tool = tools[number - 1];
    updateToolButtons();
    return;
  }
  keys.add(key);
}

function handlePointer(event) {
  const canvas = state.mode === "2d" ? canvas2d : canvas3d;
  const rect = canvas.getBoundingClientRect();
  const scale = getCanvasScale(canvas);
  const screen = {
    x: (event.clientX - rect.left) * scale.x,
    y: (event.clientY - rect.top) * scale.y
  };
  const world = state.mode === "2d" ? screenToWorld2d(screen.x, screen.y) : screenToWorld3d(screen.x, screen.y);
  const tileX = Math.floor(world.x);
  const tileY = Math.floor(world.y);
  const plot = plots.get(keyOf(tileX, tileY));
  if (plot) {
    state.selected = keyOf(plot.x, plot.y);
    return;
  }
  if (distance(world.x, world.y, ui.npc.x + 0.5, ui.npc.y + 0.8) < 1.2) {
    talk();
  }
}

function chooseTool(event) {
  const button = event.target.closest("[data-tool]");
  if (!button) return;
  state.tool = button.dataset.tool;
  updateToolButtons();
}

function chooseMode(event) {
  const button = event.target.closest("[data-mode]");
  if (!button) return;
  state.mode = button.dataset.mode;
  updateMode();
  resize();
}

function setMobileMove(event) {
  const button = event.target.closest("[data-move]");
  if (!button) return;
  button.setPointerCapture(event.pointerId);
  moveTouches.add(button.dataset.move);
}

function clearMobileMove(event) {
  const button = event.target.closest("[data-move]");
  if (button) moveTouches.delete(button.dataset.move);
}

function useTool() {
  if (!state.loaded) return;
  if (state.dialogOpen) {
    state.dialogOpen = false;
    return;
  }
  const selected = plots.get(state.selected);
  const nearby = nearestPlot();
  let plot = selected || nearby;
  if (selected && nearby && distanceToPlot(selected) > 1.55 && distanceToPlot(nearby) < 1.55) {
    plot = nearby;
    state.selected = keyOf(plot.x, plot.y);
  }
  if (!plot || distanceToPlot(plot) > 1.65) {
    showMessage("靠近农田格子后再使用工具。");
    return;
  }
  if (state.energy <= 0) {
    showMessage("体力空了，睡一觉吧。");
    return;
  }
  const cost = performTool(plot);
  if (cost) state.energy = Math.max(0, state.energy - cost);
}

function performTool(plot) {
  if (state.tool === "hoe") {
    if (plot.tilled) return say("这块地已经翻好了。", 0);
    plot.tilled = true;
    plot.watered = false;
    showMessage("你翻开了湿润的春土。");
    return 3;
  }
  if (state.tool === "seed") {
    if (!plot.tilled) return say("先锄地，再播种。", 0);
    if (plot.crop) return say("这里已经有作物了。", 0);
    if (state.seeds <= 0) return say("种子用完了。", 0);
    state.seeds -= 1;
    plot.crop = { age: 0, wateredToday: false, mature: false };
    showMessage("防风草种子落进土里。");
    return 2;
  }
  if (state.tool === "water") {
    if (!plot.tilled) return say("这块地还没翻开。", 0);
    if (plot.watered) return say("这块地已经浇过水了。", 0);
    plot.watered = true;
    if (plot.crop) plot.crop.wateredToday = true;
    showMessage("水壶里的水闪了一下。");
    return 2;
  }
  if (state.tool === "pick") {
    if (!plot.crop) return say("这里没有作物。", 0);
    if (!plot.crop.mature) return say("还没成熟，再等几天。", 0);
    plot.crop = null;
    plot.watered = false;
    state.bag += 1;
    state.coins += CROP_PRICE;
    showMessage(`收获成功，卖出 ${CROP_PRICE} 金。`);
    return 3;
  }
  return 0;
}

function sleep() {
  nextDay();
  showMessage(`第 ${state.day} 天，清晨 6:00。`);
}

function nextDay() {
  state.day += 1;
  state.minute = 6 * 60;
  state.dayTimer = 0;
  state.energy = 100;
  state.seeds += 3;
  plots.forEach((plot) => {
    if (plot.crop && plot.crop.wateredToday) {
      plot.crop.age += 1;
      plot.crop.mature = plot.crop.age >= GROW_DAYS;
    }
    if (plot.crop) plot.crop.wateredToday = false;
    plot.watered = false;
  });
}

function talk() {
  if (distance(state.player.x, state.player.y, ui.npc.x + 0.5, ui.npc.y + 0.8) > 2.2) {
    showMessage("走近一点再交谈。");
    return;
  }
  state.dialogOpen = true;
}

function draw() {
  if (!state.loaded) {
    drawLoading(ctx2d, canvas2d);
    drawLoading(ctx3d, canvas3d);
    return;
  }
  if (state.mode === "2d") draw2d(ctx2d, canvas2d);
  else draw3d(ctx3d, canvas3d);
}

function drawLoading(ctx, canvas) {
  const { width, height } = logicalSize(canvas);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#263124";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#fff8df";
  ctx.font = "700 18px system-ui";
  ctx.fillText("Loading farm assets...", 24, 42);
}

function draw2d(ctx, canvas) {
  const size = logicalSize(canvas);
  updateCamera(size.width, size.height);
  ctx.clearRect(0, 0, size.width, size.height);
  drawTileWorld(ctx, false);
  drawSceneSprites(ctx, false);
  drawEntities(ctx, false);
  drawCanvasHud(ctx, size.width, size.height);
  drawDialog(ctx, size.width, size.height);
}

function draw3d(ctx, canvas) {
  const size = logicalSize(canvas);
  updateCamera(size.width, size.height);
  ctx.clearRect(0, 0, size.width, size.height);
  ctx.save();
  ctx.translate(size.width * 0.5, size.height * 0.18);
  ctx.scale(1, 0.72);
  ctx.translate(-size.width * 0.5, 0);
  drawTileWorld(ctx, true);
  drawSceneSprites(ctx, true);
  drawEntities(ctx, true);
  ctx.restore();
  drawCanvasHud(ctx, size.width, size.height);
  drawDialog(ctx, size.width, size.height);
}

function drawTileWorld(ctx, projected) {
  const bounds = visibleBounds();
  for (let y = bounds.y0; y <= bounds.y1; y++) {
    for (let x = bounds.x0; x <= bounds.x1; x++) {
      const tile = baseTileAt(x, y);
      drawBaseTile(ctx, x, y, tile);
    }
  }
  plots.forEach((plot) => drawPlot(ctx, plot));
  if (projected) drawVignette(ctx);
}

function drawSceneSprites(ctx) {
  drawHouse(ctx, 20, 10);
  drawShippingBin(ctx, 30, 21);
  drawPond(ctx, 10, 24, 6, 4);
  drawFarmSign(ctx, 16, 13);
  drawFenceLoop(ctx);
  drawTree(ctx, 9, 8, 0);
  drawTree(ctx, 12, 10, 1);
  drawTree(ctx, 36, 10, 2);
  drawTree(ctx, 38, 24, 1);
  drawTree(ctx, 12, 29, 0);
  drawTree(ctx, 34, 29, 2);
  drawGrassPatches(ctx);
}

function drawEntities(ctx) {
  const ordered = [
    { y: ui.npc.y + 1, draw: () => drawCharacter(ctx, assets.npc, ui.npc.x, ui.npc.y, 0) },
    { y: state.player.y + 1, draw: () => drawCharacter(ctx, assets.player, state.player.x, state.player.y, state.player.dir) }
  ].sort((a, b) => a.y - b.y);
  ordered.forEach((entry) => entry.draw());
}

function drawBaseTile(ctx, x, y, type) {
  const screen = worldToScreen2d(x, y);
  ctx.fillStyle = type === "water" ? "#4e9fc8" : type === "path" ? "#c79a5d" : "#65a950";
  ctx.fillRect(screen.x, screen.y, TILE, TILE);
  if (type === "water") drawWaterTile(ctx, screen.x, screen.y, x, y);
  else if (type === "path") drawPathTile(ctx, screen.x, screen.y, x, y);
  else drawSheetTile(ctx, assets.outdoors, (x + y) % 3 ? TILE_SRC.grass : TILE_SRC.grassAlt, screen.x, screen.y);
}

function drawPlot(ctx, plot) {
  const screen = worldToScreen2d(plot.x, plot.y);
  const selected = state.selected === keyOf(plot.x, plot.y);
  if (plot.tilled) {
    ctx.fillStyle = plot.watered ? "#5a382c" : "#8d5632";
  } else {
    ctx.fillStyle = "#8a5b34";
  }
  ctx.fillRect(screen.x + 2, screen.y + 2, TILE - 4, TILE - 4);
  ctx.strokeStyle = plot.watered ? "#3f2c27" : "#724626";
  ctx.lineWidth = 2;
  ctx.strokeRect(screen.x + 2, screen.y + 2, TILE - 4, TILE - 4);
  if (selected) {
    ctx.strokeStyle = "#fff3a4";
    ctx.lineWidth = 3;
    ctx.strokeRect(screen.x - 1, screen.y - 1, TILE + 2, TILE + 2);
  }
  if (plot.crop) drawCrop(ctx, plot, screen.x, screen.y);
}

function drawCrop(ctx, plot, x, y) {
  const age = Math.min(plot.crop.age, GROW_DAYS);
  const sx = age * 16;
  const sy = plot.crop.mature ? 544 : 0;
  if (plot.crop.mature) {
    drawSheet(ctx, assets.crops, 176, 480, 16, 32, x, y - 20, 32, 64);
    return;
  }
  drawSheet(ctx, assets.crops, sx, sy, 16, 32, x + 2, y - 18, 28, 56);
}

function drawHouse(ctx, x, y) {
  const screen = worldToScreen2d(x, y);
  drawSheet(ctx, assets.houses, 0, 4, 128, 112, screen.x - 72, screen.y - 78, 256, 224);
}

function drawShippingBin(ctx, x, y) {
  const screen = worldToScreen2d(x, y);
  drawSheet(ctx, assets.outdoors, 272, 80, 42, 48, screen.x, screen.y - 36, 84, 96);
}

function drawFarmSign(ctx, x, y) {
  const screen = worldToScreen2d(x, y);
  ctx.fillStyle = "#7a4e2c";
  ctx.fillRect(screen.x + 14, screen.y + 12, 6, 24);
  ctx.fillStyle = "#c99250";
  ctx.fillRect(screen.x, screen.y, 36, 18);
  ctx.strokeStyle = "#6a3d24";
  ctx.lineWidth = 3;
  ctx.strokeRect(screen.x, screen.y, 36, 18);
  ctx.fillStyle = "#4f2f1e";
  ctx.fillRect(screen.x + 8, screen.y + 7, 20, 3);
}

function drawPathTile(ctx, x, y, tx, ty) {
  ctx.fillStyle = "#d1a05c";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "rgba(117, 78, 42, 0.22)";
  if ((tx + ty) % 2 === 0) ctx.fillRect(x + 4, y + 6, 10, 4);
  if ((tx * 3 + ty) % 4 === 0) ctx.fillRect(x + 20, y + 18, 7, 4);
  ctx.fillStyle = "rgba(255, 225, 139, 0.28)";
  ctx.fillRect(x + 2, y + 2, TILE - 4, 2);
}

function drawWaterTile(ctx, x, y, tx, ty) {
  ctx.fillStyle = "#3f96bd";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "#2c7fa5";
  ctx.fillRect(x, y + TILE - 4, TILE, 4);
  ctx.fillStyle = "rgba(214, 247, 255, 0.34)";
  if ((tx + ty) % 2 === 0) ctx.fillRect(x + 5, y + 10, 18, 3);
  if ((tx * 2 + ty) % 3 === 0) ctx.fillRect(x + 13, y + 22, 12, 2);
}

function drawPond(ctx, x, y, width, height) {
  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      const screen = worldToScreen2d(x + px, y + py);
      drawWaterTile(ctx, screen.x, screen.y, x + px, y + py);
    }
  }
  ctx.strokeStyle = "#6f8f45";
  ctx.lineWidth = 4;
  const edge = worldToScreen2d(x, y);
  ctx.strokeRect(edge.x - 2, edge.y - 2, width * TILE + 4, height * TILE + 4);
}

function drawFenceLoop(ctx) {
  for (let x = 16; x <= 28; x++) {
    if (x !== 22 && x !== 23) drawFence(ctx, x, 14);
    if (x !== 22 && x !== 23) drawFence(ctx, x, 22);
  }
  for (let y = 15; y <= 21; y++) {
    drawFence(ctx, 16, y);
    drawFence(ctx, 29, y);
  }
}

function drawFence(ctx, x, y) {
  const screen = worldToScreen2d(x, y);
  drawSheet(ctx, assets.outdoors, 80, 176, 16, 32, screen.x, screen.y - 20, 32, 64);
}

function drawTree(ctx, x, y, variant) {
  const screen = worldToScreen2d(x, y);
  const sx = variant === 0 ? 0 : variant === 1 ? 80 : 160;
  drawSheet(ctx, assets.outdoors, sx, 0, 72, 112, screen.x - 36, screen.y - 96, 144, 224);
}

function drawGrassPatches(ctx) {
  [
    [8, 13],
    [10, 14],
    [31, 15],
    [33, 16],
    [39, 16],
    [14, 27],
    [27, 12],
    [35, 25]
  ].forEach(([x, y]) => {
    const screen = worldToScreen2d(x, y);
    drawSheet(ctx, assets.outdoors, 0, 128, 32, 32, screen.x, screen.y, 64, 64);
  });
}

function drawCharacter(ctx, image, x, y, dir) {
  const screen = worldToScreen2d(x - 0.5, y - 1);
  const frame = Math.floor(state.player.walk) % 4;
  const row = dir === 0 ? 0 : dir === 3 ? 2 : dir === 1 ? 1 : 1;
  const sx = frame * 16;
  const sy = row * 32;
  ctx.fillStyle = "rgba(20, 30, 20, 0.22)";
  ctx.fillRect(screen.x + 8, screen.y + 56, 34, 10);
  drawSheet(ctx, image, sx, sy, 16, 32, screen.x, screen.y, 48, 96);
}

function drawDialog(ctx, width, height) {
  if (!state.dialogOpen) return;
  const boxW = Math.min(620, width - 38);
  const boxH = 126;
  const x = (width - boxW) / 2;
  const y = height - boxH - 24;
  drawNinePatch(ctx, assets.dialog, x, y, boxW, boxH);
  drawSheet(ctx, assets.npc, 0, 0, 16, 32, x + 18, y + 14, 54, 108);
  ctx.fillStyle = "#3b2418";
  ctx.font = "800 18px system-ui, sans-serif";
  ctx.fillText(ui.npc.name, x + 88, y + 36);
  ctx.font = "700 16px system-ui, sans-serif";
  wrapText(ctx, ui.npc.line, x + 88, y + 66, boxW - 114, 23);
}

function drawCanvasHud(ctx, width, height) {
  const slots = tools.length;
  const slotSize = 48;
  const gap = 8;
  const barW = slots * slotSize + (slots - 1) * gap + 24;
  const x = Math.round((width - barW) / 2);
  const y = height - 76;
  ctx.fillStyle = "rgba(255, 239, 190, 0.92)";
  ctx.fillRect(x, y, barW, 62);
  ctx.strokeStyle = "#7b4d2f";
  ctx.lineWidth = 3;
  ctx.strokeRect(x + 1, y + 1, barW - 2, 60);
  tools.forEach((tool, index) => {
    const sx = x + 12 + index * (slotSize + gap);
    const active = state.tool === tool;
    ctx.fillStyle = active ? "#e8d481" : "#fff5cf";
    ctx.fillRect(sx, y + 8, slotSize, slotSize);
    ctx.strokeStyle = active ? "#436f45" : "#b9854d";
    ctx.lineWidth = active ? 4 : 2;
    ctx.strokeRect(sx + 1, y + 9, slotSize - 2, slotSize - 2);
    drawToolIcon(ctx, tool, sx + 8, y + 16);
  });
}

function drawToolIcon(ctx, tool, x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.lineWidth = 4;
  ctx.lineCap = "square";
  if (tool === "hoe") {
    ctx.strokeStyle = "#6b4327";
    ctx.beginPath();
    ctx.moveTo(20, 8);
    ctx.lineTo(12, 28);
    ctx.stroke();
    ctx.strokeStyle = "#b7b7a4";
    ctx.beginPath();
    ctx.moveTo(12, 8);
    ctx.lineTo(25, 8);
    ctx.stroke();
  } else if (tool === "seed") {
    ctx.fillStyle = "#6b4327";
    ctx.fillRect(13, 18, 7, 9);
    ctx.fillStyle = "#3f8e48";
    ctx.fillRect(8, 12, 10, 6);
    ctx.fillRect(18, 9, 8, 7);
  } else if (tool === "water") {
    ctx.fillStyle = "#8fb5c8";
    ctx.fillRect(8, 12, 18, 14);
    ctx.fillRect(20, 8, 6, 6);
    ctx.fillStyle = "#5f879b";
    ctx.fillRect(5, 16, 5, 8);
    ctx.fillStyle = "#4e9fc8";
    ctx.fillRect(9, 28, 4, 4);
    ctx.fillRect(18, 29, 4, 3);
  } else if (tool === "pick") {
    ctx.strokeStyle = "#6b4327";
    ctx.beginPath();
    ctx.moveTo(18, 9);
    ctx.lineTo(15, 29);
    ctx.stroke();
    ctx.strokeStyle = "#b7b7a4";
    ctx.beginPath();
    ctx.moveTo(8, 11);
    ctx.lineTo(26, 8);
    ctx.stroke();
  }
  ctx.restore();
}

function drawNinePatch(ctx, image, x, y, width, height) {
  ctx.fillStyle = "#fff1c8";
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = "#7d4a2e";
  ctx.lineWidth = 4;
  ctx.strokeRect(x + 2, y + 2, width - 4, height - 4);
  if (!image) return;
  drawSheet(ctx, image, 0, 0, 64, 64, x, y, 64, 64);
  drawSheet(ctx, image, 128, 0, 64, 64, x + width - 64, y, 64, 64);
  drawSheet(ctx, image, 0, 128, 64, 64, x, y + height - 64, 64, 64);
  drawSheet(ctx, image, 128, 128, 64, 64, x + width - 64, y + height - 64, 64, 64);
}

function drawVignette(ctx) {
  const size = logicalSize(canvas3d);
  const gradient = ctx.createLinearGradient(0, 0, 0, size.height);
  gradient.addColorStop(0, "rgba(255, 244, 190, 0.08)");
  gradient.addColorStop(1, "rgba(35, 25, 20, 0.22)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size.width, size.height / 0.72);
}

function drawSheetTile(ctx, image, src, x, y) {
  drawSheet(ctx, image, src[0], src[1], 16, 16, x, y, TILE, TILE);
}

function drawSheet(ctx, image, sx, sy, sw, sh, dx, dy, dw, dh) {
  if (!image) return;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, sx, sy, sw, sh, Math.round(dx), Math.round(dy), Math.round(dw), Math.round(dh));
}

function baseTileAt(x, y) {
  if (x < 3 || (x >= 10 && x < 16 && y >= 24 && y < 28)) return "water";
  if ((x >= 18 && x <= 24 && y >= 13 && y <= 14) || (x >= 21 && x <= 23 && y >= 14 && y <= 23)) return "path";
  if ((x >= 24 && x <= 34 && y === 22) || (x >= 29 && x <= 32 && y >= 18 && y <= 22)) return "path";
  if ((x >= 8 && x <= 14 && y === 28) || (x === 14 && y >= 24 && y <= 28)) return "path";
  return "grass";
}

function visibleBounds() {
  const size = logicalSize(activeCanvas());
  return {
    x0: Math.max(0, Math.floor(camera.x / TILE) - 2),
    y0: Math.max(0, Math.floor(camera.y / TILE) - 2),
    x1: Math.min(MAP_W - 1, Math.ceil((camera.x + size.width) / TILE) + 2),
    y1: Math.min(MAP_H - 1, Math.ceil((camera.y + size.height) / TILE) + 2)
  };
}

function worldToScreen2d(x, y) {
  return {
    x: Math.round(x * TILE - camera.x),
    y: Math.round(y * TILE - camera.y)
  };
}

function screenToWorld2d(x, y) {
  return {
    x: (x + camera.x) / TILE,
    y: (y + camera.y) / TILE
  };
}

function screenToWorld3d(x, y) {
  const size = logicalSize(canvas3d);
  const unscaledY = (y - size.height * 0.18) / 0.72;
  return screenToWorld2d(x, unscaledY);
}

function updateCamera(width, height) {
  const targetX = state.player.x * TILE - width * 0.5;
  const targetY = state.player.y * TILE - height * (state.mode === "3d" ? 0.56 : 0.5);
  camera.x += (clamp(targetX, 0, MAP_W * TILE - width) - camera.x) * 0.12;
  camera.y += (clamp(targetY, 0, MAP_H * TILE - height) - camera.y) * 0.12;
}

function nearestPlot() {
  let best = null;
  let bestDistance = Infinity;
  plots.forEach((plot) => {
    const current = distanceToPlot(plot);
    if (current < bestDistance) {
      best = plot;
      bestDistance = current;
    }
  });
  return best;
}

function distanceToPlot(plot) {
  return distance(state.player.x, state.player.y, plot.x + 0.5, plot.y + 0.5);
}

function keyOf(x, y) {
  return `${x},${y}`;
}

function say(message, cost) {
  showMessage(message);
  return cost;
}

function showMessage(message) {
  messageLog.textContent = message;
  state.messageTimer = 4.5;
}

function updateMessage(delta) {
  if (state.messageTimer <= 0) return;
  state.messageTimer -= delta;
  if (state.messageTimer <= 0) {
    messageLog.textContent = "1-4 切换工具，E 与附近角色交谈。";
  }
}

function updateHud() {
  const hour = Math.floor(state.minute / 60) % 24;
  const minute = Math.floor(state.minute % 60);
  dayText.textContent = `第 ${state.day} 天 ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  coinText.textContent = state.coins;
  energyText.textContent = state.energy;
  bagText.textContent = state.bag;
  seedText.textContent = state.seeds;
}

function updateToolButtons() {
  toolGrid.querySelectorAll("[data-tool]").forEach((button) => {
    button.classList.toggle("active", button.dataset.tool === state.tool);
  });
}

function updateMode() {
  viewportWrap.classList.toggle("mode-2d", state.mode === "2d");
  viewportWrap.classList.toggle("mode-3d", state.mode === "3d");
  viewSwitch.querySelectorAll("[data-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === state.mode);
  });
}

function resize() {
  [canvas2d, canvas3d].forEach((canvas) => {
    const rect = viewportWrap.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * pixelRatio));
    canvas.height = Math.max(1, Math.floor(rect.height * pixelRatio));
    const ctx = canvas.getContext("2d");
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = false;
  });
}

function activeCanvas() {
  return state.mode === "2d" ? canvas2d : canvas3d;
}

function logicalSize(canvas) {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  return { width: canvas.width / ratio, height: canvas.height / ratio };
}

function getCanvasScale(canvas) {
  const rect = canvas.getBoundingClientRect();
  const size = logicalSize(canvas);
  return {
    x: size.width / rect.width,
    y: size.height / rect.height
  };
}

function distance(ax, ay, bx, by) {
  return Math.hypot(ax - bx, ay - by);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split("");
  let line = "";
  for (const word of words) {
    const next = line + word;
    if (ctx.measureText(next).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = word;
      y += lineHeight;
    } else {
      line = next;
    }
  }
  if (line) ctx.fillText(line, x, y);
}
