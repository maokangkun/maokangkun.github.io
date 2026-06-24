const svgNS = "http://www.w3.org/2000/svg";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function createSvg(name, attrs = {}) {
  const node = document.createElementNS(svgNS, name);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
}

function activateTabs() {
  $$(".mode-tab").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.screen;
      $$(".mode-tab").forEach((tab) => tab.classList.toggle("is-active", tab === button));
      $$(".screen").forEach((screen) => screen.classList.toggle("is-active", screen.id === target));
    });
  });
}

function buildOverviewRows() {
  const rows = $("#overviewRows");
  if (!rows) return;
  const data = [
    ["RF-UI5-400TA", "856.2-3A", "17 85 98 23", "3A-AH-33", "550C-H02"],
    ["RF-UI5-400TA", "225.9A0", "82 76 48 23", "WA-6N-68", "550C-H22"],
    ["DEH-US-4F02", "257.88-D", "25 62 45 57", "2H-BF-11", "550C-H03"],
    ["FEN-US-353A", "257.8B-0", "93 18 25 91", "20-3F-05", "550C-H08"],
    ["T0J-US-8520C", "5.257A0", "14 43 60 23", "2E-6N-00", "550C-H12"],
    ["14V-US-A6BDD", "3.88.258.0", "31 64 98 90", "4B-5V-86", "550C-HQ3"],
    ["DEC-UIB-225XL", "6.5834", "17 93 96 21", "EH-AH-45", "550C-HC3"],
    ["38J-US-2825K", "5.10.232.0", "68 92 80 94", "2E-6N-00", "550C-H03"]
  ];
  rows.innerHTML = data.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("");
}

function buildRadarBlips() {
  const group = $(".radar-blips");
  if (!group) return;
  const random = seededRandom(72);
  const points = [];
  for (let i = 0; i < 86; i += 1) {
    const angle = random() * Math.PI * 2;
    const radius = 42 + random() * 150;
    const x = 210 + Math.cos(angle) * radius;
    const y = 210 + Math.sin(angle) * radius;
    points.push([x, y, angle * 57.2958]);
  }
  points.forEach(([x, y, rotation], index) => {
    const size = index % 7 === 0 ? 9 : 6;
    const poly = createSvg("polygon", {
      points: `${x},${y - size} ${x + size * .72},${y + size * .58} ${x - size * .72},${y + size * .58}`,
      transform: `rotate(${rotation} ${x} ${y})`,
      opacity: String(.58 + (index % 5) * .08)
    });
    poly.style.animationDelay = `${(index % 10) * .14}s`;
    group.appendChild(poly);
  });
}

function buildMatrix() {
  const overwrite = $("#overwriteMatrix");
  if (overwrite) {
    overwrite.innerHTML = Array.from({ length: 54 }, () => "<span></span>").join("");
  }
}

function buildJurisdiction() {
  const root = $("#jurisdictionList");
  if (!root) return;
  root.innerHTML = Array.from({ length: 35 }, (_, index) => {
    const letter = index % 3 === 0 ? "I" : index % 3 === 1 ? "D" : "L";
    const suffix = String(index + 1).padStart(2, "0");
    return `<span>SN650_${letter}${suffix} [0.1X]</span>`;
  }).join("");
}

function buildFileTrees() {
  const fileTree = $("#fileTree");
  if (!fileTree) return;
  const lines = [
    "▾ 550W",
    "  ▸ PROPERTIES",
    "  ▸ 引用",
    "  ▸ 信息缓存",
    "  ▸ 同步参考",
    "  ▸ Resources",
    "  ▸ ALLCS",
    "  ▸ 代码输入",
    "  ▸ 脚本",
    "  ▾ dlp_550w_data",
    "    ns1.corprinter.net",
    "    ns2.corprinter.net",
    "    ns3.corprinter.net",
    "    ns4.corprinter.net",
    "    ns5.corprinter.net",
    "    ns6.corprinter.net",
    "    ns7.corprinter.net"
  ];
  fileTree.innerHTML = lines.map((line) => `<p>${line}</p>`).join("");
}

function buildServers() {
  const serverGrid = $("#serverGrid");
  if (serverGrid) {
    serverGrid.innerHTML = Array.from({ length: 112 }, () => `<span class="server-tile"></span>`).join("");
  }
  const miniServers = $("#miniServers");
  if (miniServers) {
    miniServers.innerHTML = Array.from({ length: 21 }, () => `<span class="server-tile"></span>`).join("");
  }
}

function buildNodes() {
  const nodeGrid = $("#nodeGrid");
  if (!nodeGrid) return;
  nodeGrid.innerHTML = Array.from({ length: 242 }, (_, index) => `<span>${index % 5 === 0 ? "◇" : "·"}</span>`).join("");
}

function buildAttackDots() {
  const root = $("#attackDots");
  if (!root) return;
  const random = seededRandom(149);
  const clusters = [
    [210, 250, 92, 34],
    [520, 220, 74, 23],
    [748, 238, 114, 38],
    [578, 426, 82, 28],
    [925, 442, 70, 20],
    [360, 364, 58, 16],
    [160, 330, 52, 18]
  ];
  clusters.forEach(([cx, cy, spread, count]) => {
    for (let i = 0; i < count; i += 1) {
      const angle = random() * Math.PI * 2;
      const distance = random() * spread;
      const x = cx + Math.cos(angle) * distance;
      const y = cy + Math.sin(angle) * distance;
      const r = 4 + random() * 19;
      root.appendChild(createSvg("circle", {
        cx: x.toFixed(2),
        cy: y.toFixed(2),
        r: r.toFixed(2)
      }));
    }
  });
}

function buildCharts() {
  $$(".bar-chart").forEach((chart, chartIndex) => {
    const random = seededRandom(20 + chartIndex);
    chart.innerHTML = Array.from({ length: 12 }, () => {
      const height = 14 + Math.round(random() * 68);
      return `<span style="height:${height}%"></span>`;
    }).join("");
  });
}

function buildTimeline() {
  const root = $("#timeline");
  if (!root) return;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  root.innerHTML = months.map((month, index) => {
    const width = [18, 26, 38, 92, 22, 16, 34, 26, 31, 78, 24, 58][index];
    return `<span class="month">${month}</span><span class="bar" style="--w:${width}%"></span><span>${(index + 1) * 30}</span>`;
  }).join("");
}

function buildOrbitRows() {
  const root = $("#orbitRows");
  if (!root) return;
  const random = seededRandom(390);
  root.innerHTML = Array.from({ length: 20 }, (_, index) => {
    const id = `TA-55${String(index * 9 + 120).slice(-3)}`;
    const device = `UEG-${String(index + 4).padStart(2, "0")}`;
    const host = `B0${Math.floor(random() * 9)}T`;
    const type = index % 3 === 0 ? "SYSTEM" : index % 3 === 1 ? "NODE" : "CTRL";
    return `<tr><td>${id}</td><td>${device}</td><td>${host}</td><td>${type}</td></tr>`;
  }).join("");
}

function buildCabins() {
  const root = $("#cabinGrid");
  if (!root) return;
  root.innerHTML = Array.from({ length: 8 }, (_, index) => {
    const cabin = `CABIN-${String(index + 1).padStart(2, "0")}`;
    const danger = [0, 2, 5].includes(index) ? " danger" : "";
    return `
      <div class="cabin-card${danger}">
        <b>${cabin}</b>
        <svg viewBox="0 0 190 54" aria-hidden="true">
          <rect x="28" y="15" width="134" height="24" fill="none" stroke="currentColor"></rect>
          <circle cx="48" cy="27" r="10" fill="none" stroke="currentColor"></circle>
          <circle cx="142" cy="27" r="10" fill="none" stroke="currentColor"></circle>
          <path d="M76 15 V39 M114 15 V39 M12 27 H28 M162 27 H178" stroke="currentColor"></path>
        </svg>
        <span>${danger ? "FAULT / WARNING" : "NORMAL / STANDBY"}</span>
      </div>`;
  }).join("");
}

function buildTracks() {
  const root = $("#tracks");
  if (!root) return;
  root.innerHTML = Array.from({ length: 9 }, (_, index) => {
    const bottom = [12, 40, 68, 120, 36, 74, 150, 58, 98][index];
    return `<span class="track" style="--bottom:${bottom}px"></span>`;
  }).join("");
}

function buildElevatorBlips() {
  const root = $("#elevatorBlips");
  if (!root) return;
  const random = seededRandom(240);
  for (let i = 0; i < 38; i += 1) {
    const angle = (-150 + random() * 86) * Math.PI / 180;
    const radius = 76 + random() * 220;
    const x = 380 + Math.cos(angle) * radius;
    const y = 210 + Math.sin(angle) * radius;
    const size = 8;
    const poly = createSvg("polygon", {
      points: `${x},${y - size} ${x + size * .7},${y + size * .55} ${x - size * .7},${y + size * .55}`
    });
    poly.style.animationDelay = `${(i % 8) * .18}s`;
    root.appendChild(poly);
  }
}

function boot() {
  activateTabs();
  buildOverviewRows();
  buildRadarBlips();
  buildMatrix();
  buildJurisdiction();
  buildFileTrees();
  buildServers();
  buildNodes();
  buildAttackDots();
  buildCharts();
  buildTimeline();
  buildOrbitRows();
  buildCabins();
  buildTracks();
  buildElevatorBlips();
}

boot();
