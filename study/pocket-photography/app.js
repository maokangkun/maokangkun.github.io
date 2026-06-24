const days = [
  {
    title: "第 1 天：认识相机语言",
    goal: "知道曝光、帧率、快门、ISO、白平衡、焦点和防抖各自解决什么问题。",
    tasks: [
      "用自动模式拍 10 条同一场景素材，观察机器如何处理亮暗。",
      "切到手动或专业模式，固定白平衡，拍一组室内和室外对比。",
      "练习 25/30fps 与 50/60fps 的差别，记录慢动作素材适合什么题材。",
      "晚上把素材按好、中、差分成三组，写下差的原因。"
    ],
    output: "今日成品：30 秒“我的桌面/房间/楼下”观察短片。重点不是好看，而是清楚、稳定、曝光不乱跳。"
  },
  {
    title: "第 2 天：曝光与色彩控制",
    goal: "学会在拍摄前判断光线，理解 180 度快门、动态范围、白平衡和色彩模式的关系。",
    tasks: [
      "白天用不同 ND 或不同快门拍移动的人，比较运动模糊。",
      "夜晚拍同一条街，比较 ISO 400、800、1600 的噪点。",
      "固定白平衡拍暖光、冷光、混合光三个场景，观察自动白平衡为什么会漂。",
      "用 Normal 和 D-Log/D-Log M 各拍一段高反差场景，比较天空和阴影细节。",
      "剪辑时先做技术还原 LUT 或手动还原，再做基础校正，不直接套风格滤镜。"
    ],
    output: "今日成品：20 秒光线对比短片，至少包含明亮、背光、夜景三个镜头。"
  },
  {
    title: "第 3 天：构图与镜头语言",
    goal: "能用主体、前景、背景、方向线和留白，明确告诉观众看哪里。",
    tasks: [
      "同一主体分别用居中、三分法、前景遮挡、引导线拍 4 条。",
      "每条素材开拍前先说出主体和情绪，不清楚就不按录制。",
      "练习近景、中景、远景三种景别，剪成一个完整动作。",
      "删掉所有“没有信息”的镜头，保留能推进观察的镜头。"
    ],
    output: "今日成品：45 秒“一个人/一个物件”的观察短片。"
  },
  {
    title: "第 4 天：稳定运镜",
    goal: "把运动变成叙事手段，而不是为了动而动。",
    tasks: [
      "练习推、拉、横移、跟随、环绕，每种拍 5 条。",
      "每条运镜前后都留 2 秒静止，方便剪辑接点。",
      "移动时放慢脚步，肘部贴近身体，转身用腰带动。",
      "剪辑时对比静态镜头和运动镜头，判断哪个更有信息。"
    ],
    output: "今日成品：30 秒“从门口到目标”的空间短片。"
  },
  {
    title: "第 5 天：声音与故事",
    goal: "明白短片不是镜头堆叠，而是声音、动作和信息的排序。",
    tasks: [
      "录 5 条环境声：脚步、风声、门声、街声、室内底噪。",
      "拍一个 3 段结构：开始状态、变化动作、结束结果。",
      "给每段素材写一句功能：交代环境、展示动作、制造情绪。",
      "剪辑时先铺声音，再放画面，感受节奏变化。"
    ],
    output: "今日成品：45 秒有环境声的生活片段，开头 3 秒必须能抓住主题。"
  },
  {
    title: "第 6 天：剪辑与调色",
    goal: "建立固定剪辑流水线：导入、筛选、粗剪、精剪、声音、技术还原、校正、风格、导出。",
    tasks: [
      "素材导入后先重命名或分文件夹，不在时间线上迷路。",
      "粗剪只决定顺序，精剪才处理节奏和卡点。",
      "每个镜头只问一个问题：它是否提供新信息。",
      "Log 素材先转 Rec.709 或套官方技术 LUT，再调曝光、对比和白平衡。",
      "风格 LUT 放在校正之后，并降低强度；先保证肤色、白色和天空正常。"
    ],
    output: "今日成品：用前 5 天素材剪一个 60 秒版本，并导出复看。"
  },
  {
    title: "第 7 天：完成一个迷你项目",
    goal: "独立完成一条 1 到 2 分钟短片，包含明确主题、稳定画面、基本声音和统一色彩。",
    tasks: [
      "写 5 句脚本：主题、开头、中段、结尾、观众感受。",
      "按远景、中景、近景、细节、环境声列拍摄清单。",
      "拍摄时每个关键镜头至少保留 2 个可用版本。",
      "成片后写复盘：最好的 3 个镜头，最想重拍的 3 个镜头。"
    ],
    output: "今日成品：一条完整短片。主题可以是“一次早餐”“一次散步”“一家店”“一段夜路”。"
  }
];

const compositions = [
  { id: "thirds", label: "三分法", note: "把主体放在线或交点上，画面会更稳定。适合人物、街景和旅行记录。" },
  { id: "center", label: "居中", note: "主体在正中，秩序感强。适合对称空间、产品、仪式感动作。" },
  { id: "leading", label: "引导线", note: "用道路、栏杆、光影把视线带向主体。适合建立空间方向。" },
  { id: "layers", label: "前中后景", note: "前景增加深度，中景放主体，背景交代环境。适合生活感短片。" }
];

const movements = [
  { id: "push", label: "推镜", title: "推近主体", text: "用于进入细节或加强情绪。速度要慢，结尾停住 1 到 2 秒。" },
  { id: "pull", label: "拉镜", title: "退出环境", text: "用于揭示空间或结束段落。不要边拉边找构图，先定终点再走。" },
  { id: "track", label: "跟随", title: "跟随动作", text: "用于人物行走、端咖啡、开门等连续动作。距离稳定比速度更重要。" },
  { id: "pan", label: "横摇", title: "扫过空间", text: "用于从 A 信息转到 B 信息。一个镜头只转一次，别来回犹豫。" },
  { id: "orbit", label: "环绕", title: "制造立体感", text: "用于产品、建筑、人物静止状态。半圈就够，注意背景别太乱。" }
];

const knowledgeTopics = [
  {
    id: "dynamic",
    title: "动态范围 Dynamic Range",
    tag: "亮部与暗部",
    body:
      "动态范围是相机同时保留亮部和暗部细节的能力。晴天白墙、天空、窗边人脸、夜景招牌都属于高反差场景。动态范围不够时，要么天空死白，要么阴影死黑。",
    practice:
      "实战做法：拍之前先保护重要高光。人像优先保脸，风景优先保天空层次。高反差场景尽量用 Log，必要时换角度、等光线、补光或降低曝光补偿。",
    mistake: "常见错误：为了让阴影看清，把曝光拉太亮，结果天空和脸部高光完全过曝，后期救不回来。"
  },
  {
    id: "log",
    title: "D-Log / D-Log M",
    tag: "灰不是坏",
    body:
      "Log 是一种把亮部和暗部压进文件里的色调曲线。画面看起来灰、低饱和，是因为它把可调整空间留给后期。D-Log M 通常比完整电影机 Log 更容易处理，适合轻量设备和新手进阶。",
    practice:
      "实战做法：白天、高反差、想认真调色时用 Log；只想快速直出、夜景很暗、交付很急时用 Normal。Log 素材要固定白平衡，并尽量不要欠曝。",
    mistake: "常见错误：以为 Log 自动更电影。Log 只是保留信息，没正确还原和校正时反而会灰、脏、肤色怪。"
  },
  {
    id: "lut",
    title: "LUT",
    tag: "查找表",
    body:
      "LUT 可以理解成一张颜色映射表：输入某个亮度和颜色，输出另一组亮度和颜色。技术 LUT 用来把 Log 还原到 Rec.709；风格 LUT 用来制造某种色彩倾向。",
    practice:
      "实战做法：先套官方或匹配相机的技术 LUT，再做曝光、白平衡、对比和饱和度校正。风格 LUT 放后面，并把强度降到 20% 到 60% 观察。",
    mistake: "常见错误：把风格 LUT 当万能滤镜，一键套满。素材曝光和白平衡没校正时，任何 LUT 都会放大问题。"
  },
  {
    id: "bitdepth",
    title: "10-bit 与码率",
    tag: "颜色余量",
    body:
      "8-bit 每个颜色通道层级少，重度调色时容易断层；10-bit 层级多，天空、墙面、肤色渐变更耐调。码率越高，压缩痕迹越少，但文件更大。",
    practice:
      "实战做法：重要项目、Log、天空多、渐变多的场景优先 10-bit 和较高码率。日常记录、无需重度调色时可以用普通模式节省空间。",
    mistake: "常见错误：拍了 10-bit 就随便曝光。位深提供的是后期余量，不会修复严重过曝、失焦和抖动。"
  },
  {
    id: "rec709",
    title: "Rec.709",
    tag: "常规交付",
    body:
      "Rec.709 是大多数普通视频交付会落到的标准动态范围和色彩空间。你在手机、网页、普通显示器上看的大部分 SDR 视频，都应该看起来接近 Rec.709。",
    practice:
      "实战做法：Log 素材最终通常要转换到 Rec.709 再导出 SDR。检查肤色、白色物体、天空和黑位，不要只看滤镜氛围。",
    mistake: "常见错误：在 Log 灰画面上直接导出，或者在没色彩管理的时间线上混用 Log、HDR、普通素材。"
  },
  {
    id: "scope",
    title: "波形图与直方图",
    tag: "别只靠眼睛",
    body:
      "屏幕亮度会骗你，环境光也会骗你。直方图看亮暗分布，波形图能更直观看哪里压黑、哪里过曝。新手至少要学会看高光有没有顶死。",
    practice:
      "实战做法：拍摄时打开斑马纹或过曝提示；剪辑时看波形，让主体亮度稳定。不同镜头之间，先统一亮度，再谈风格。",
    mistake: "常见错误：在很亮的户外看屏幕，以为素材偏暗，回家发现其实已经过曝。"
  }
];

const lutModes = [
  {
    id: "log",
    label: "Log 原片",
    title: "灰、低对比、低饱和",
    advice: "这是为了保留调整空间，不是最终观感。先别急着加饱和，确认曝光和白平衡是否可靠。"
  },
  {
    id: "technical",
    label: "技术 LUT",
    title: "还原到 Rec.709",
    advice: "技术 LUT 的任务是把 Log 变成正常显示状态。它不是风格滤镜，套完仍然要校正曝光、对比和肤色。"
  },
  {
    id: "creative",
    label: "风格 LUT",
    title: "在校正后加氛围",
    advice: "风格 LUT 最好低强度使用。强度太高会让肤色偏、暗部脏、高光染色。"
  }
];

const editSteps = [
  ["01", "导入与备份", "按日期和主题建文件夹，先保留原片，再进入剪辑软件。"],
  ["02", "筛选素材", "只标记可用镜头：清晰、稳定、有信息、声音可接受。"],
  ["03", "搭建结构", "先排开头、中段、结尾。别急着卡音乐，先保证内容成立。"],
  ["04", "精剪节奏", "删重复信息，保留动作接点。每个镜头问：它让观众知道了什么？"],
  ["05", "技术还原", "Log 素材先用官方技术 LUT 或色彩空间转换还原到 Rec.709，Normal 素材跳过这步。"],
  ["06", "一级校正", "统一曝光、白平衡、对比、饱和度和黑白场，让镜头之间看起来属于同一天。"],
  ["07", "二级调整", "只对脸、天空、局部颜色做轻微修正。不要在问题素材上猛套风格。"],
  ["08", "声音与导出", "环境声先铺平，音乐不盖过主体声音。手机全屏复看曝光跳变、声音突兀和节奏拖沓。"]
];

const checklist = [
  "镜头干净，屏幕和云台没有灰尘。",
  "电量、存储卡、手机备份空间足够。",
  "帧率、分辨率、快门速度符合今天主题。",
  "白平衡固定，避免一个镜头里颜色漂移。",
  "确认色彩模式：快速直出用 Normal，想保留高光和调色空间用 D-Log/D-Log M。",
  "Log 拍摄时检查过曝提示，不要让重要高光顶死。",
  "曝光不过曝，人物脸和天空保留细节。",
  "开拍前确认主体、运动方向和结尾构图。",
  "每个重要镜头前后多录 2 秒。",
  "补录 5 条环境声和 5 条细节镜头。",
  "回家立刻筛选素材并写 3 条复盘。"
];

const quiz = [
  {
    q: "视频里常说快门约等于帧率 2 倍，主要为了什么？",
    options: ["让运动模糊更自然", "让文件更小", "让镜头自动对焦更快"],
    answer: 0
  },
  {
    q: "白天画面太亮，但你想保持 1/50 快门，最优先考虑什么？",
    options: ["加 ND 滤镜", "把 ISO 拉到更高", "随便改变白平衡"],
    answer: 0
  },
  {
    q: "剪辑时判断一个镜头该不该留下，最重要的问题是？",
    options: ["它是否提供新信息", "它是不是拍得最久", "它是不是颜色最鲜艳"],
    answer: 0
  },
  {
    q: "运镜前后各留 2 秒静止，主要是为了什么？",
    options: ["给剪辑留下接点", "让文件更容易命名", "提高分辨率"],
    answer: 0
  },
  {
    q: "新手调色最应该先追求什么？",
    options: ["统一、自然、不过曝", "极端电影滤镜", "所有画面都偏同一种颜色"],
    answer: 0
  },
  {
    q: "夜景噪点明显时，通常不应该第一时间做什么？",
    options: ["继续大幅提高 ISO", "寻找补光或更亮的位置", "减少高速运动镜头"],
    answer: 0
  },
  {
    q: "D-Log/D-Log M 画面看起来灰，主要原因是什么？",
    options: ["为了保留更多后期调整空间", "相机坏了", "白平衡一定设置错了"],
    answer: 0
  },
  {
    q: "技术 LUT 最主要的用途是什么？",
    options: ["把 Log 素材还原到正常显示空间", "自动剪出节奏", "修复失焦和抖动"],
    answer: 0
  },
  {
    q: "动态范围不足时最常见的问题是？",
    options: ["亮部死白或暗部死黑", "镜头自动变广角", "声音延迟"],
    answer: 0
  },
  {
    q: "风格 LUT 更适合放在调色流程的哪个阶段？",
    options: ["曝光和白平衡校正之后", "素材导入前", "收音之前"],
    answer: 0
  }
];

const state = {
  day: Number(localStorage.getItem("pocketDay") || 0),
  checks: JSON.parse(localStorage.getItem("pocketChecks") || "{}"),
  tasks: JSON.parse(localStorage.getItem("pocketTasks") || "{}"),
  quiz: JSON.parse(localStorage.getItem("pocketQuiz") || "{}"),
  composition: localStorage.getItem("pocketComposition") || "thirds",
  movement: localStorage.getItem("pocketMovement") || "push",
  knowledge: localStorage.getItem("pocketKnowledge") || "dynamic",
  lut: localStorage.getItem("pocketLut") || "log"
};

const $ = (selector) => document.querySelector(selector);
let roughCanvas = null;

function getRough(canvas) {
  if (window.rough) return window.rough.canvas(canvas);
  return null;
}

function drawFallbackRect(ctx, x, y, w, h) {
  ctx.strokeRect(x, y, w, h);
}

function renderHeroCamera() {
  const canvas = $("#heroCamera");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const rc = getRough(canvas);
  ctx.fillStyle = "#fffaf0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (rc) {
    rc.rectangle(170, 70, 180, 235, { stroke: "#172128", strokeWidth: 2.4, roughness: 1.2, fill: "#f1eadc", fillStyle: "hachure" });
    rc.rectangle(208, 112, 104, 82, { stroke: "#172128", fill: "#ddebf0", fillStyle: "solid", roughness: 1.1 });
    rc.circle(260, 153, 62, { stroke: "#172128", strokeWidth: 2.2, fill: "#28617d", fillStyle: "zigzag" });
    rc.circle(260, 153, 26, { stroke: "#172128", strokeWidth: 2, fill: "#172128", fillStyle: "solid" });
    rc.rectangle(221, 212, 78, 72, { stroke: "#172128", fill: "#ffffff", fillStyle: "solid" });
    rc.line(120, 300, 405, 300, { stroke: "#a9483d", strokeWidth: 2 });
    rc.path("M126 118 C84 135, 74 198, 106 244", { stroke: "#46715b", strokeWidth: 2 });
    rc.path("M398 117 C444 137, 451 207, 410 249", { stroke: "#46715b", strokeWidth: 2 });
  } else {
    ctx.strokeStyle = "#172128";
    drawFallbackRect(ctx, 170, 70, 180, 235);
    drawFallbackRect(ctx, 208, 112, 104, 82);
    ctx.beginPath();
    ctx.arc(260, 153, 31, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = "#172128";
  ctx.font = "700 18px Inter, sans-serif";
  ctx.fillText("Pocket practice loop", 160, 334);
}

function renderDays() {
  const tabs = $("#dayTabs");
  tabs.innerHTML = "";
  days.forEach((day, index) => {
    const button = document.createElement("button");
    button.className = `day-tab${index === state.day ? " active" : ""}`;
    button.type = "button";
    button.textContent = `Day ${index + 1}`;
    button.addEventListener("click", () => {
      state.day = index;
      localStorage.setItem("pocketDay", String(index));
      renderDays();
    });
    tabs.appendChild(button);
  });

  const day = days[state.day];
  const detail = $("#dayDetail");
  detail.innerHTML = `
    <span class="tag">${day.goal}</span>
    <h3>${day.title}</h3>
    <div class="task-grid">
      ${day.tasks
        .map((task, index) => {
          const id = `d${state.day}-t${index}`;
          return `<label class="task"><input type="checkbox" data-task="${id}" ${state.tasks[id] ? "checked" : ""} /><span>${task}</span></label>`;
        })
        .join("")}
    </div>
    <div class="code">${day.output}</div>
  `;
  detail.querySelectorAll("[data-task]").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.tasks[event.target.dataset.task] = event.target.checked;
      save();
    });
  });
}

function renderExposure() {
  const canvas = $("#exposureCanvas");
  const ctx = canvas.getContext("2d");
  const rc = getRough(canvas);
  const shutter = Number($("#shutter").value);
  const iso = Number($("#iso").value);
  const nd = Number($("#nd").value);
  const brightness = Math.max(0.05, Math.min(1, (iso / 400) * (120 / shutter) / Math.pow(2, nd - 1)));
  const blur = Math.max(0.05, Math.min(1, 120 / shutter));
  const noise = Math.max(0.05, Math.min(1, iso / 3200));

  $("#shutterValue").textContent = `1/${shutter}`;
  $("#isoValue").textContent = String(iso);
  $("#ndValue").textContent = nd === 0 ? "无 ND" : `ND ${Math.pow(2, nd)}`;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fffdf8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (rc) {
    rc.polygon(
      [
        [380, 58],
        [90, 385],
        [670, 385]
      ],
      { stroke: "#172128", strokeWidth: 2.4, roughness: 1.1, fill: "#f1eadc", fillStyle: "hachure" }
    );
    rc.circle(380, 58, 70 + iso / 80, { stroke: "#a9483d", strokeWidth: 2, fill: "#f5d9d4", fillStyle: "dots" });
    rc.circle(90, 385, 80 + blur * 70, { stroke: "#28617d", strokeWidth: 2, fill: "#dcebf1", fillStyle: "zigzag" });
    rc.circle(670, 385, 80 + nd * 15, { stroke: "#46715b", strokeWidth: 2, fill: "#deebe3", fillStyle: "cross-hatch" });
    rc.rectangle(286, 210, 188, 104, { stroke: "#172128", fill: `rgba(182, 132, 46, ${0.25 + brightness * 0.55})`, fillStyle: "solid" });
  }

  ctx.fillStyle = "#172128";
  ctx.font = "800 20px Inter, sans-serif";
  ctx.fillText("ISO 噪点", 336, 62);
  ctx.fillText("快门 / 运动模糊", 42, 422);
  ctx.fillText("ND / 控光", 622, 422);
  ctx.font = "700 18px Inter, sans-serif";
  ctx.fillText(`亮度 ${Math.round(brightness * 100)}%`, 312, 268);
  ctx.fillText(`噪点 ${Math.round(noise * 100)}%`, 314, 96);
  ctx.fillText(`模糊 ${Math.round(blur * 100)}%`, 42, 332);

  const title = $("#exposureTitle");
  const advice = $("#exposureAdvice");
  if (iso >= 1600) {
    title.textContent = "ISO 已经偏高";
    advice.textContent = "画面会更亮，但噪点和涂抹感会上升。优先找光、补光、降低帧率或接受更暗的氛围。";
  } else if (shutter > 250) {
    title.textContent = "快门偏快，动作会变硬";
    advice.textContent = "高速快门适合运动分析或强光应急，但生活视频会缺少自然拖影。想保持自然感，优先加 ND。";
  } else if (brightness > 0.85) {
    title.textContent = "亮度偏高，注意高光";
    advice.textContent = "天空、白墙和脸部可能过曝。用 ND、降低 ISO 或换角度，让重要区域保留细节。";
  } else {
    title.textContent = "参数比较均衡";
    advice.textContent = "这组设置适合练习稳定画面。拍摄时继续留意白平衡、对焦和主体脸部亮度。";
  }
}

function renderComposition() {
  const canvas = $("#compositionCanvas");
  const ctx = canvas.getContext("2d");
  const rc = getRough(canvas);
  const mode = state.composition;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fffdf8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (rc) {
    rc.rectangle(48, 46, 804, 428, { stroke: "#172128", strokeWidth: 2.4, roughness: 1 });
    rc.rectangle(86, 90, 232, 334, { stroke: "#28617d", fill: "#dcebf1", fillStyle: "hachure" });
    rc.circle(585, 253, 86, { stroke: "#a9483d", strokeWidth: 2, fill: "#f3dfd9", fillStyle: "dots" });
    rc.rectangle(598, 298, 132, 84, { stroke: "#46715b", fill: "#deebe3", fillStyle: "zigzag" });
  }

  ctx.strokeStyle = "#172128";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 7]);
  if (mode === "thirds") {
    [316, 584].forEach((x) => {
      ctx.beginPath();
      ctx.moveTo(x, 46);
      ctx.lineTo(x, 474);
      ctx.stroke();
    });
    [189, 331].forEach((y) => {
      ctx.beginPath();
      ctx.moveTo(48, y);
      ctx.lineTo(852, y);
      ctx.stroke();
    });
  }
  if (mode === "center") {
    ctx.beginPath();
    ctx.moveTo(450, 46);
    ctx.lineTo(450, 474);
    ctx.moveTo(48, 260);
    ctx.lineTo(852, 260);
    ctx.stroke();
  }
  if (mode === "leading") {
    ctx.beginPath();
    ctx.moveTo(80, 474);
    ctx.lineTo(585, 253);
    ctx.moveTo(820, 474);
    ctx.lineTo(585, 253);
    ctx.moveTo(48, 110);
    ctx.lineTo(585, 253);
    ctx.stroke();
  }
  if (mode === "layers") {
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(40, 97, 125, 0.12)";
    ctx.fillRect(48, 46, 804, 128);
    ctx.fillStyle = "rgba(70, 113, 91, 0.12)";
    ctx.fillRect(48, 174, 804, 164);
    ctx.fillStyle = "rgba(169, 72, 61, 0.12)";
    ctx.fillRect(48, 338, 804, 136);
  }
  ctx.setLineDash([]);

  ctx.fillStyle = "#172128";
  ctx.font = "800 20px Inter, sans-serif";
  const current = compositions.find((item) => item.id === mode);
  ctx.fillText(current.label, 68, 82);
  ctx.font = "500 16px Inter, sans-serif";
  wrapText(ctx, current.note, 68, 112, 430, 24);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split("");
  let line = "";
  for (const word of words) {
    const test = line + word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = word;
      y += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, y);
}

function renderCompositionButtons() {
  const box = $("#compositionModes");
  box.innerHTML = "";
  compositions.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = item.id === state.composition ? "active" : "";
    button.textContent = item.label;
    button.addEventListener("click", () => {
      state.composition = item.id;
      localStorage.setItem("pocketComposition", item.id);
      renderCompositionButtons();
      renderComposition();
    });
    box.appendChild(button);
  });
}

function renderKnowledge() {
  const tabs = $("#knowledgeTabs");
  tabs.innerHTML = "";
  knowledgeTopics.forEach((topic) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = topic.id === state.knowledge ? "active" : "";
    button.textContent = topic.title;
    button.addEventListener("click", () => {
      state.knowledge = topic.id;
      localStorage.setItem("pocketKnowledge", topic.id);
      renderKnowledge();
    });
    tabs.appendChild(button);
  });

  const current = knowledgeTopics.find((topic) => topic.id === state.knowledge) || knowledgeTopics[0];
  $("#knowledgeCard").innerHTML = `
    <span class="tag">${current.tag}</span>
    <h3>${current.title}</h3>
    <p>${current.body}</p>
    <div class="knowledge-note">
      <strong>怎么用在 Pocket 拍摄里</strong>
      <p>${current.practice}</p>
    </div>
    <div class="knowledge-note warning">
      <strong>新手最容易踩的坑</strong>
      <p>${current.mistake}</p>
    </div>
  `;
}

function renderLutModes() {
  const box = $("#lutModes");
  box.innerHTML = "";
  lutModes.forEach((mode) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = mode.id === state.lut ? "active" : "";
    button.textContent = mode.label;
    button.addEventListener("click", () => {
      state.lut = mode.id;
      localStorage.setItem("pocketLut", mode.id);
      renderLutModes();
      renderLutCanvas();
    });
    box.appendChild(button);
  });
}

function drawColorStrip(ctx, x, y, width, height, colors) {
  const step = width / colors.length;
  colors.forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.fillRect(x + index * step, y, step + 1, height);
  });
}

function renderLutCanvas() {
  const canvas = $("#lutCanvas");
  const ctx = canvas.getContext("2d");
  const rc = getRough(canvas);
  const current = lutModes.find((mode) => mode.id === state.lut) || lutModes[0];
  const palettes = {
    log: ["#8c8c82", "#a0a197", "#b4b1a5", "#c2bbb0", "#9fa9a3", "#8f9a9e"],
    technical: ["#263845", "#4d765e", "#d8b76f", "#dfc5a6", "#7299a9", "#f2e5cf"],
    creative: ["#182833", "#2c5b55", "#d79b45", "#c06452", "#6f7e9a", "#f1d9bd"]
  };
  const palette = palettes[current.id];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fffdf8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawColorStrip(ctx, 54, 58, 652, 56, palette);
  if (rc) {
    rc.rectangle(54, 142, 652, 184, { stroke: "#172128", strokeWidth: 2, roughness: 1.1, fill: "#f1eadc", fillStyle: "hachure" });
    rc.rectangle(82, 174, 152, 112, { stroke: "#172128", fill: palette[1], fillStyle: "solid" });
    rc.circle(377, 232, 104, { stroke: "#172128", fill: palette[3], fillStyle: "solid" });
    rc.rectangle(520, 184, 134, 92, { stroke: "#172128", fill: palette[4], fillStyle: "solid" });
    rc.line(74, 310, 686, 310, { stroke: current.id === "log" ? "#8c8c82" : "#a9483d", strokeWidth: current.id === "creative" ? 4 : 2 });
  } else {
    ctx.strokeStyle = "#172128";
    ctx.strokeRect(54, 142, 652, 184);
  }

  const contrast = current.id === "log" ? 0.35 : current.id === "technical" ? 0.72 : 0.86;
  const saturation = current.id === "log" ? 0.28 : current.id === "technical" ? 0.68 : 0.82;
  const highlight = current.id === "creative" ? 0.76 : 0.9;
  const meters = [
    ["对比", contrast],
    ["饱和", saturation],
    ["高光余量", highlight]
  ];
  meters.forEach(([label, value], index) => {
    const y = 344 + index * 18;
    ctx.fillStyle = "#5e6871";
    ctx.font = "700 13px Inter, sans-serif";
    ctx.fillText(label, 54, y);
    ctx.fillStyle = "#e7dfd0";
    ctx.fillRect(128, y - 10, 210, 8);
    ctx.fillStyle = index === 2 ? "#46715b" : "#28617d";
    ctx.fillRect(128, y - 10, 210 * value, 8);
  });

  ctx.fillStyle = "#172128";
  ctx.font = "800 22px Inter, sans-serif";
  ctx.fillText(current.title, 54, 38);
  $("#lutAdvice").textContent = current.advice;
}

function renderMovements() {
  const buttons = $("#movementButtons");
  buttons.innerHTML = "";
  movements.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = item.id === state.movement ? "active" : "";
    button.textContent = item.label;
    button.addEventListener("click", () => {
      state.movement = item.id;
      localStorage.setItem("pocketMovement", item.id);
      renderMovements();
    });
    buttons.appendChild(button);
  });
  const current = movements.find((item) => item.id === state.movement);
  $("#movementOutput").innerHTML = `<strong>${current.title}</strong><p>${current.text}</p>`;
}

function renderTimeline() {
  $("#editTimeline").innerHTML = editSteps
    .map(
      ([num, title, text]) => `
        <article class="timeline-step">
          <span>${num}</span>
          <div>
            <h3>${title}</h3>
            <p>${text}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderPace() {
  const value = Number($("#shotLength").value);
  $("#shotLengthValue").textContent = `${value.toFixed(1)} 秒`;
  const canvas = $("#paceCanvas");
  const ctx = canvas.getContext("2d");
  const rc = getRough(canvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fffdf8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const count = Math.max(4, Math.round(24 / value));
  let x = 28;
  for (let i = 0; i < count; i += 1) {
    const width = Math.max(28, value * 26 + (i % 3) * 8);
    const color = ["#dcebf1", "#deebe3", "#f1eadc", "#f3dfd9"][i % 4];
    if (rc) {
      rc.rectangle(x, 88, width, 70, { stroke: "#172128", fill: color, fillStyle: "solid", roughness: 1.1 });
    } else {
      ctx.strokeRect(x, 88, width, 70);
    }
    x += width + 10;
    if (x > canvas.width - 54) break;
  }
  ctx.fillStyle = "#172128";
  ctx.font = "800 18px Inter, sans-serif";
  ctx.fillText(`${count} 个镜头 / 约 24 秒片段`, 28, 48);
  if (value <= 2) {
    $("#paceAdvice").textContent = "节奏很快，适合动作、转场、音乐卡点，但观众可能来不及看清空间。";
  } else if (value >= 6) {
    $("#paceAdvice").textContent = "节奏很慢，适合安静观察和情绪镜头，但需要更强构图和声音支撑。";
  } else {
    $("#paceAdvice").textContent = "3 秒左右适合城市记录、旅行短片和生活 vlog，节奏清楚又不会太碎。";
  }
}

function renderChecklist() {
  $("#checklist").innerHTML = checklist
    .map(
      (item, index) => `
        <label class="check-item">
          <input type="checkbox" data-check="${index}" ${state.checks[index] ? "checked" : ""} />
          <span>${item}</span>
        </label>
      `
    )
    .join("");
  document.querySelectorAll("[data-check]").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.checks[event.target.dataset.check] = event.target.checked;
      save();
    });
  });
}

function renderQuiz() {
  $("#quizBox").innerHTML = quiz
    .map(
      (item, questionIndex) => `
        <article class="quiz-card">
          <h3>${questionIndex + 1}. ${item.q}</h3>
          <div class="quiz-options">
            ${item.options
              .map((option, optionIndex) => {
                const selected = state.quiz[questionIndex];
                const cls =
                  selected === undefined
                    ? ""
                    : optionIndex === item.answer
                      ? "correct"
                      : selected === optionIndex
                        ? "wrong"
                        : "";
                return `<button class="${cls}" type="button" data-question="${questionIndex}" data-option="${optionIndex}">${option}</button>`;
              })
              .join("")}
          </div>
        </article>
      `
    )
    .join("");
  document.querySelectorAll("[data-question]").forEach((button) => {
    button.addEventListener("click", (event) => {
      state.quiz[event.target.dataset.question] = Number(event.target.dataset.option);
      save();
      renderQuiz();
    });
  });
}

function updateProgress() {
  localStorage.setItem("pocketChecks", JSON.stringify(state.checks));
  localStorage.setItem("pocketTasks", JSON.stringify(state.tasks));
  localStorage.setItem("pocketQuiz", JSON.stringify(state.quiz));

  const doneChecks = Object.values(state.checks).filter(Boolean).length;
  const doneTasks = Object.values(state.tasks).filter(Boolean).length;
  const answered = Object.keys(state.quiz).length;
  const correct = Object.entries(state.quiz).filter(([q, a]) => quiz[Number(q)].answer === a).length;
  const totalWork = checklist.length + days.reduce((sum, day) => sum + day.tasks.length, 0) + quiz.length;
  const doneWork = doneChecks + doneTasks + correct;
  const percent = Math.round((doneWork / totalWork) * 100);
  $("#doneCount").textContent = String(doneChecks + doneTasks);
  $("#quizScore").textContent = answered ? `${Math.round((correct / quiz.length) * 100)}%` : "0%";
  $("#progressBar").style.width = `${percent}%`;
}

function save() {
  updateProgress();
}

function bindControls() {
  ["#shutter", "#iso", "#nd"].forEach((selector) => {
    $(selector).addEventListener("input", renderExposure);
  });
  $("#shotLength").addEventListener("input", renderPace);
  $("#resetProgress").addEventListener("click", () => {
    ["pocketChecks", "pocketTasks", "pocketQuiz", "pocketDay"].forEach((key) => localStorage.removeItem(key));
    state.day = 0;
    state.checks = {};
    state.tasks = {};
    state.quiz = {};
    renderDays();
    renderChecklist();
    renderQuiz();
    updateProgress();
  });
}

function init() {
  roughCanvas = window.rough ? true : null;
  renderHeroCamera();
  renderDays();
  renderExposure();
  renderKnowledge();
  renderLutModes();
  renderLutCanvas();
  renderCompositionButtons();
  renderComposition();
  renderMovements();
  renderTimeline();
  renderPace();
  renderChecklist();
  renderQuiz();
  bindControls();
  updateProgress();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
