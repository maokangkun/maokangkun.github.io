const stateKey = "aiDrugDiscoveryProgress.v1";

const days = [
  {
    title: "第 1 天：药物研发全景与医学问题",
    focus: ["疾病机制", "靶点", "候选药物", "临床终点"],
    goal: "建立从疾病到药物上市的全流程地图，知道 AI 介入的是哪些决策点。",
    learn: [
      "药物研发阶段：靶点发现、苗头化合物、先导优化、临床前、IND、I/II/III 期、上市后监测。",
      "核心概念：靶点、适应症、作用机制、疗效终点、生物标志物、患者分层、标准治疗。",
      "为什么药物项目失败：疾病生物学假设错误、动物模型外推失败、毒性、安全窗口不足、临床终点选错。"
    ],
    practice: "选一个疾病，如阿尔茨海默病或肺癌，写出疾病机制、潜在靶点、现有疗法、未满足需求各 3 条。"
  },
  {
    title: "第 2 天：数据类型与靶点发现",
    focus: ["组学", "遗传学", "知识图谱", "因果证据"],
    goal: "理解 AI 如何从生物医学数据中提出靶点，但也知道相关性证据的边界。",
    learn: [
      "数据来源：基因组、转录组、蛋白组、单细胞、CRISPR 筛选、电子病历、文献、专利、PDB 结构。",
      "方法：差异表达、网络传播、图神经网络、文献挖掘、因果推断、Mendelian randomization。",
      "证据等级：人类遗传学证据通常更强；体外表达变化只是线索，不等于可成药靶点。"
    ],
    practice: "画一个靶点证据表：证据来源、支持方向、反例、实验验证方式、转化风险。"
  },
  {
    title: "第 3 天：分子表示与性质预测",
    focus: ["SMILES", "指纹", "分子图", "QSAR", "GNN"],
    goal: "知道模型如何把分子变成数字，以及不同表示会带来什么偏差。",
    learn: [
      "SMILES 是线性字符串，适合语言模型，但同一分子可有多种 SMILES。",
      "Morgan fingerprint 把局部化学环境编码成位向量，适合传统 ML 和相似性搜索。",
      "分子图把原子当节点、化学键当边；GNN 能学习局部结构，但 3D 构象和蛋白环境仍可能缺失。"
    ],
    practice: "找 5 个常见药物，记录 SMILES、分子量、LogP、氢键供受体，并猜测口服性风险。"
  },
  {
    title: "第 4 天：结构基础方法与虚拟筛选",
    focus: ["蛋白结构", "口袋", "Docking", "药效团"],
    goal: "理解分子对接和结构预测能帮什么，不能保证什么。",
    learn: [
      "结构信息来自晶体、冷冻电镜、NMR、同源建模和结构预测。",
      "Docking 估计配体姿势和结合评分，但打分函数常有假阳性，水分子、诱导契合、熵效应很难处理。",
      "虚拟筛选要结合实验反馈；主动学习会根据新实验结果更新模型，逐轮缩小搜索空间。"
    ],
    practice: "用页面里的筛选漏斗调整阈值，解释为什么阈值越严格不一定越好。"
  },
  {
    title: "第 5 天：生成模型与先导优化",
    focus: ["VAE", "扩散模型", "强化学习", "多目标优化"],
    goal: "把“生成分子”理解成受约束的多目标搜索，而不是无限创造。",
    learn: [
      "生成模型目标：提出新分子、保持活性片段、优化性质、避开专利空间。",
      "常见约束：合成可行性、选择性、溶解度、代谢稳定性、毒性、结构新颖性、可解释性。",
      "奖励黑客问题：模型可能生成看似高分但不可合成、不稳定或落在预测器盲区的分子。"
    ],
    practice: "为一个假想激酶项目设计 5 个优化目标，并说明哪些目标可能互相冲突。"
  },
  {
    title: "第 6 天：ADMET、安全性与实验闭环",
    focus: ["PK/PD", "毒理", "hERG", "CYP", "体内外转化"],
    goal: "知道药物失败往往不是因为没有活性，而是无法安全有效地进入人体。",
    learn: [
      "ADMET：吸收、分布、代谢、排泄、毒性；它们共同决定暴露量、安全窗口和给药方案。",
      "常见风险：低溶解度、快速清除、CYP 抑制、药物相互作用、hERG 心脏毒性、肝毒性、免疫原性。",
      "实验闭环：模型预测只是排序工具，真正的学习来自高质量实验设计和失败样本记录。"
    ],
    practice: "调整 ADMET 雷达图参数，写出一个强效但不适合口服的小分子为什么会失败。"
  },
  {
    title: "第 7 天：读论文、评估公司与制定后续路线",
    focus: ["基准评估", "数据泄漏", "临床价值", "产业判断"],
    goal: "具备初步判断 AI 制药论文和公司宣传的能力，并规划后续学习。",
    learn: [
      "论文评估：是否有外部验证、时间切分、真实实验、ablation、失败分析、与强基线比较。",
      "产业评估：管线阶段、靶点质量、实验平台、数据壁垒、合作对象、临床策略、现金消耗。",
      "继续学习路线：机器学习、药物化学、结构生物学、药代毒理、临床试验和监管科学。"
    ],
    practice: "找一篇 AI 制药论文或公司管线介绍，用本页的 8 个问题写一页评估备忘录。"
  }
];

const pipeline = [
  {
    id: "target",
    label: "靶点发现",
    x: 110,
    y: 120,
    color: "#dceee9",
    desc: "从疾病机制、组学数据、遗传证据和文献中提出可干预的蛋白、RNA 或通路。",
    ai: "知识图谱、组学建模、文献挖掘、因果推断、网络传播。",
    metric: "人类遗传学支持、疾病相关性、可成药性、选择性、安全窗口。",
    risk: "相关性伪装成因果；模型发现的是数据偏差，不是疾病驱动机制。"
  },
  {
    id: "hit",
    label: "苗头发现",
    x: 300,
    y: 120,
    color: "#edf0db",
    desc: "找到对靶点有初步活性的化合物、抗体、核酸药物或其他 modality。",
    ai: "虚拟筛选、相似性搜索、分子对接、药效团、主动学习。",
    metric: "hit rate、IC50/EC50、选择性、结构新颖性、可合成性。",
    risk: "对接分数不等于真实结合；训练集相似物会制造虚假的模型优势。"
  },
  {
    id: "lead",
    label: "先导优化",
    x: 490,
    y: 120,
    color: "#f1e5d0",
    desc: "围绕活性、选择性、ADMET、安全性和合成可行性迭代分子。",
    ai: "QSAR、GNN、生成模型、多目标贝叶斯优化、反应预测。",
    metric: "pIC50、LogP、溶解度、清除率、hERG、CYP、合成步骤。",
    risk: "单一指标优化导致分子不可用；预测模型在新化学空间失效。"
  },
  {
    id: "preclinical",
    label: "临床前",
    x: 680,
    y: 120,
    color: "#eadde7",
    desc: "在细胞、类器官、动物和安全性实验中建立进入人体前的证据包。",
    ai: "毒性预测、PK/PD 建模、转化模型、病理图像分析。",
    metric: "NOAEL、暴露量、半衰期、有效剂量、安全倍数、体内药效。",
    risk: "动物模型外推失败；体外强效但体内暴露不足。"
  },
  {
    id: "clinical",
    label: "临床试验",
    x: 870,
    y: 120,
    color: "#dce6f3",
    desc: "在人群中验证安全性、剂量、疗效和相对现有治疗的价值。",
    ai: "患者分层、试验设计、真实世界数据、药物警戒、终点预测。",
    metric: "安全性、ORR/PFS/OS、HbA1c 等终点、统计显著性、临床意义。",
    risk: "替代终点不代表患者获益；人群选择和标准治疗变化会改变结果。"
  }
];

const representations = [
  {
    id: "smiles",
    label: "SMILES",
    title: "SMILES：把分子写成字符串",
    body: "适合语言模型和序列生成，但同一分子可以有多个合法 SMILES。模型可能学到语法模式，却不一定理解 3D 构象和结合口袋。",
    example: "CC(=O)OC1=CC=CC=C1C(=O)O  (阿司匹林)"
  },
  {
    id: "fingerprint",
    label: "分子指纹",
    title: "Morgan Fingerprint：局部化学环境的位向量",
    body: "常用于相似性搜索、随机森林、XGBoost 和传统 QSAR。优点是稳健、便宜、可解释性较好；缺点是会丢掉部分空间结构。",
    example: "bit 124 = 某类芳香环邻域出现；bit 927 = 某个羧酸片段出现"
  },
  {
    id: "graph",
    label: "分子图",
    title: "Graph：原子是节点，化学键是边",
    body: "图神经网络能从结构中学习局部和全局模式，适合性质预测。要注意数据量、化学空间外推和立体化学信息是否被正确编码。",
    example: "node: C, O, N, charge, hybridization; edge: single, double, aromatic"
  },
  {
    id: "shape3d",
    label: "3D 构象",
    title: "3D Conformer：分子在空间中的形状",
    body: "结合、选择性和毒性常受 3D 形状、电荷分布和柔性影响。难点是一个分子有多个低能构象，生物环境下构象还会变化。",
    example: "distance matrix, torsion angle, electrostatic surface, pharmacophore"
  }
];

const concepts = [
  ["靶点可成药性", "靶点是否有可结合口袋、可调控机制、组织表达窗口和可接受安全性。"],
  ["因果证据", "疾病中观察到变化不等于驱动疾病。遗传学、扰动实验和剂量反应能提高因果可信度。"],
  ["生物标志物", "用于选择患者、监测药效或预测响应的可测量指标，是临床转化的关键工具。"],
  ["选择性", "药物对目标靶点有效，同时少影响相似蛋白。选择性不足常带来毒性。"]
];

const models = [
  ["QSAR", "性质预测", "用结构特征预测活性、溶解度、毒性等性质。经典方法仍然很有用，尤其在数据较少时。"],
  ["GNN", "分子图学习", "把原子和化学键作为图结构学习，适合分子性质预测和结构模式识别。"],
  ["Docking", "结构筛选", "预测小分子在蛋白口袋中的姿势和粗略结合评分，适合排序但假阳性很多。"],
  ["Protein LM", "蛋白表示", "从蛋白序列学习保守性、功能和突变效应，可用于靶点、抗体和酶工程。"],
  ["Knowledge Graph", "靶点发现", "连接疾病、基因、通路、药物、文献和临床证据，用于推理和假设生成。"],
  ["Diffusion Model", "生成设计", "在分子图或 3D 空间中逐步生成候选，可加入口袋、片段或性质约束。"],
  ["Active Learning", "实验闭环", "模型选择最有信息量的下一批实验，让数据采集和模型训练互相促进。"],
  ["PK/PD Model", "转化建模", "连接剂量、暴露、靶点占有率和药效，帮助估计人体剂量与安全窗口。"]
];

const cards = [
  ["biology", "靶点 Target", "药物希望调控的生物分子或通路。好靶点需要疾病相关、可干预、可测量，并有安全窗口。", "例：EGFR、PCSK9、TNF-alpha"],
  ["chemistry", "先导化合物 Lead", "从苗头化合物优化而来的候选结构，具备更好的活性、选择性和初步药代性质。", "Hit -> Lead -> Candidate"],
  ["ml", "数据泄漏 Leakage", "训练集中间接包含测试信息，导致离线指标很好但真实项目无效。药物数据常见相似骨架泄漏和时间泄漏。", "随机切分 < scaffold split < time split"],
  ["admet", "hERG 风险", "hERG 钾通道抑制可能导致心律失常，是小分子安全性评估中的重要红旗。", "高活性 + hERG 强抑制 = 需要谨慎"],
  ["clinical", "临床终点 Endpoint", "临床试验用来判断药物是否有效的指标。替代终点方便，但必须能合理代表患者获益。", "OS, PFS, HbA1c, LDL-C, symptom score"],
  ["strategy", "多目标优化", "药物优化要同时考虑活性、选择性、溶解度、代谢、毒性、合成和专利空间。", "单指标最优通常不是项目最优"]
];

const checklist = [
  ["画全流程图", "能从靶点到临床讲清每一步的输入、输出和失败点。"],
  ["复述 20 个术语", "用自己的话解释靶点、hit、lead、ADMET、PK/PD、biomarker 等。"],
  ["读一篇论文摘要", "标出数据、模型、实验验证、指标和结论是否匹配。"],
  ["做一次模型批判", "指出一个 AI 制药结果可能的数据泄漏、外推失败或指标幻觉。"],
  ["拆一个药物案例", "选已上市药物，查靶点、适应症、机制、给药方式和主要安全风险。"],
  ["写一页项目判断", "用 8 个问题评估一个 AI 制药公司或论文案例。"],
  ["整理后续路线", "列出机器学习、药化、结构生物学、毒理和临床试验的继续学习资料。"],
  ["建立错题本", "记录自己混淆的概念，尤其是相关性/因果、活性/疗效、预测/验证。"]
];

const quiz = [
  {
    q: "AI 制药项目中，靶点发现最需要警惕哪类误区？",
    options: ["把相关性当成因果", "分子量超过 300", "模型参数太少", "没有使用生成模型"],
    answer: 0,
    explain: "靶点发现的核心是疾病因果和可干预性。表达变化、文献共现或图谱关联都只能提供线索。"
  },
  {
    q: "为什么随机切分分子数据集可能高估模型能力？",
    options: ["随机切分无法训练神经网络", "相似骨架可能同时出现在训练和测试中", "测试集一定太小", "只能用于蛋白序列"],
    answer: 1,
    explain: "相似化合物泄漏会让模型看似泛化，实际上只是识别了接近训练集的结构。scaffold split 和 time split 更接近真实场景。"
  },
  {
    q: "分子对接分数高，最合理的解读是？",
    options: ["该分子一定能成药", "可以作为排序线索，但需要实验验证", "毒性一定很低", "临床成功率很高"],
    answer: 1,
    explain: "Docking 是筛选工具，不是证据终点。打分函数、蛋白柔性、水分子和熵效应都会制造假阳性。"
  },
  {
    q: "ADMET 中的 T 主要指什么？",
    options: ["转录组 Transcriptome", "治疗窗口 Therapy", "毒性 Toxicity", "温度 Temperature"],
    answer: 2,
    explain: "ADMET 是 Absorption, Distribution, Metabolism, Excretion, Toxicity。毒性常决定项目能否继续推进。"
  },
  {
    q: "生成模型设计分子时，最专业的目标描述是？",
    options: ["生成越新越好", "最大化单一活性预测分数", "在活性、ADMET、安全性和合成可行性之间做多目标优化", "只要不像训练集即可"],
    answer: 2,
    explain: "真实药物优化是受约束的多目标搜索。单纯追求新颖性或预测活性容易生成不可用分子。"
  },
  {
    q: "判断 AI 制药论文是否可靠，以下哪项最重要？",
    options: ["图画得是否好看", "是否使用最新大模型", "是否有强基线、外部验证和实验闭环", "标题是否提到 foundation model"],
    answer: 2,
    explain: "可靠性来自任务定义、数据切分、强基线、外部验证、实验结果和失败分析，而不是模型名字。"
  }
];

const fallbackRough = {
  canvas(canvas) {
    const ctx = canvas.getContext("2d");
    return {
      rectangle(x, y, w, h, opts = {}) {
        ctx.save();
        ctx.strokeStyle = opts.stroke || "#172126";
        ctx.fillStyle = opts.fill || "transparent";
        ctx.lineWidth = opts.strokeWidth || 2;
        if (opts.fill) ctx.fillRect(x, y, w, h);
        ctx.strokeRect(x, y, w, h);
        ctx.restore();
      },
      circle(x, y, d, opts = {}) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, d / 2, 0, Math.PI * 2);
        ctx.fillStyle = opts.fill || "transparent";
        ctx.strokeStyle = opts.stroke || "#172126";
        if (opts.fill) ctx.fill();
        ctx.stroke();
        ctx.restore();
      },
      line(x1, y1, x2, y2, opts = {}) {
        ctx.save();
        ctx.strokeStyle = opts.stroke || "#172126";
        ctx.lineWidth = opts.strokeWidth || 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
      },
      polygon(points, opts = {}) {
        ctx.save();
        ctx.beginPath();
        points.forEach(([x, y], index) => (index ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.closePath();
        ctx.fillStyle = opts.fill || "transparent";
        ctx.strokeStyle = opts.stroke || "#172126";
        if (opts.fill) ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    };
  }
};

let progress = loadProgress();
let activeDay = 0;
let activePipeline = pipeline[0];
let activeRepresentation = representations[0];
let cardIndex = 0;

function $(selector) {
  return document.querySelector(selector);
}

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(stateKey)) || { checks: {}, quiz: {}, models: {} };
  } catch {
    return { checks: {}, quiz: {}, models: {} };
  }
}

function saveProgress() {
  localStorage.setItem(stateKey, JSON.stringify(progress));
  updateProgress();
}

function roughCanvas(canvas) {
  const lib = window.rough || fallbackRough;
  return lib.canvas(canvas);
}

function clear(canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fbfaf6";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function text(canvas, value, x, y, size = 16, color = "#172126", weight = "700", align = "center") {
  const ctx = canvas.getContext("2d");
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px ui-sans-serif, system-ui, -apple-system`;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(value, x, y);
  ctx.restore();
}

function wrapText(canvas, value, x, y, maxWidth, lineHeight, size = 14, color = "#5b6870") {
  const ctx = canvas.getContext("2d");
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `600 ${size}px ui-sans-serif, system-ui, -apple-system`;
  ctx.textAlign = "left";
  const words = value.split("");
  let line = "";
  let offset = 0;
  words.forEach((char) => {
    const next = line + char;
    if (ctx.measureText(next).width > maxWidth && line) {
      ctx.fillText(line, x, y + offset);
      line = char;
      offset += lineHeight;
    } else {
      line = next;
    }
  });
  ctx.fillText(line, x, y + offset);
  ctx.restore();
}

function initDays() {
  const tabs = $("#dayTabs");
  tabs.innerHTML = days
    .map((day, index) => `<button class="day-tab" type="button" data-day="${index}">Day ${index + 1}<br>${day.focus[0]}</button>`)
    .join("");
  tabs.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-day]");
    if (!btn) return;
    activeDay = Number(btn.dataset.day);
    renderDay();
  });
  renderDay();
}

function renderDay() {
  document.querySelectorAll(".day-tab").forEach((btn, index) => btn.classList.toggle("active", index === activeDay));
  const day = days[activeDay];
  $("#dayDetail").innerHTML = `
    <h3>${day.title}</h3>
    <p class="muted">${day.goal}</p>
    <div class="pill-row">${day.focus.map((item) => `<span class="pill">${item}</span>`).join("")}</div>
    <h4>今天必须掌握</h4>
    <ul class="dense-list">${day.learn.map((item) => `<li>${item}</li>`).join("")}</ul>
    <h4>输出练习</h4>
    <p>${day.practice}</p>
  `;
}

function drawHero() {
  const canvas = $("#heroCanvas");
  clear(canvas);
  const rc = roughCanvas(canvas);
  const nodes = [
    [86, 86, "Biology", "#dceee9"],
    [282, 80, "Data", "#dce6f3"],
    [470, 86, "Model", "#eadde7"],
    [150, 252, "Experiment", "#f1e5d0"],
    [390, 256, "Clinical", "#edf0db"]
  ];
  nodes.forEach(([x, y, label, fill]) => {
    rc.circle(x, y, 104, { fill, stroke: "#172126", strokeWidth: 2, roughness: 1.5 });
    text(canvas, label, x, y, 18);
  });
  [
    [138, 86, 230, 82],
    [334, 82, 418, 86],
    [438, 132, 396, 206],
    [346, 256, 205, 252],
    [146, 200, 92, 136],
    [190, 224, 264, 126],
    [430, 215, 318, 116]
  ].forEach((line) => rc.line(...line, { stroke: "#47724d", strokeWidth: 2 }));
  rc.rectangle(152, 158, 250, 54, { fill: "#ffffff", stroke: "#172126", roughness: 1.2 });
  text(canvas, "Evidence loop", 277, 186, 18, "#172126", "850");
  wrapText(canvas, "AI 的价值在于缩短假设、预测、实验、修正之间的循环。", 66, 330, 430, 21, 14);
}

function drawPipeline() {
  const canvas = $("#pipelineCanvas");
  clear(canvas);
  const rc = roughCanvas(canvas);
  pipeline.forEach((node, index) => {
    if (index < pipeline.length - 1) {
      const next = pipeline[index + 1];
      rc.line(node.x + 70, node.y, next.x - 70, next.y, { stroke: "#47724d", strokeWidth: 3 });
      text(canvas, "→", (node.x + next.x) / 2, node.y - 4, 22, "#47724d");
    }
    rc.rectangle(node.x - 72, node.y - 46, 144, 92, {
      fill: node.id === activePipeline.id ? "#e8f0ec" : node.color,
      stroke: node.id === activePipeline.id ? "#172126" : "#5b6870",
      strokeWidth: node.id === activePipeline.id ? 3 : 1.5,
      roughness: 1.4
    });
    text(canvas, node.label, node.x, node.y, 17);
  });
  const swimlanes = [
    ["生物假设", 80, "#dceee9"],
    ["化学空间", 205, "#f1e5d0"],
    ["实验验证", 330, "#eadde7"],
    ["临床价值", 455, "#dce6f3"]
  ];
  swimlanes.forEach(([label, y, color]) => {
    rc.rectangle(58, y, 864, 62, { fill: color, stroke: "#d8d1c2", roughness: 1.7 });
    text(canvas, label, 112, y + 31, 15, "#172126", "850");
  });
  wrapText(canvas, "每一层都必须形成证据：模型分数只是排序信号，不能替代机制、实验和临床获益。", 185, 488, 620, 22, 15);
}

function updatePipelineInspector() {
  $("#pipelineInspector").innerHTML = `
    <span class="tag">当前阶段</span>
    <h3>${activePipeline.label}</h3>
    <p>${activePipeline.desc}</p>
    <dl>
      <dt>AI 任务</dt><dd>${activePipeline.ai}</dd>
      <dt>关键指标</dt><dd>${activePipeline.metric}</dd>
      <dt>常见风险</dt><dd>${activePipeline.risk}</dd>
    </dl>
  `;
}

function initPipeline() {
  const canvas = $("#pipelineCanvas");
  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);
    const hit = pipeline.find((node) => Math.abs(x - node.x) < 78 && Math.abs(y - node.y) < 52);
    if (!hit) return;
    activePipeline = hit;
    drawPipeline();
    updatePipelineInspector();
  });
  drawPipeline();
  updatePipelineInspector();
}

function drawMolecule() {
  const canvas = $("#moleculeCanvas");
  clear(canvas);
  const rc = roughCanvas(canvas);
  const atoms = [
    [190, 210, "C"], [270, 164, "C"], [350, 210, "C"], [350, 302, "C"], [270, 348, "C"], [190, 302, "C"],
    [450, 210, "O"], [536, 250, "OH"], [112, 164, "CH3"]
  ];
  [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [2, 6], [6, 7], [0, 8]].forEach(([a, b]) => {
    rc.line(atoms[a][0], atoms[a][1], atoms[b][0], atoms[b][1], { stroke: "#172126", strokeWidth: 3 });
  });
  atoms.forEach(([x, y, label]) => {
    rc.circle(x, y, 46, { fill: label.includes("O") ? "#eadde7" : "#dceee9", stroke: "#172126", roughness: 1.6 });
    text(canvas, label, x, y, 15);
  });
  if (activeRepresentation.id === "smiles") {
    rc.rectangle(88, 62, 650, 48, { fill: "#ffffff", stroke: "#172126" });
    text(canvas, "CC(=O)OC1=CC=CC=C1C(=O)O", 413, 86, 18, "#172126", "850");
  }
  if (activeRepresentation.id === "fingerprint") {
    for (let i = 0; i < 28; i += 1) {
      const on = [2, 5, 6, 10, 13, 18, 22, 24].includes(i);
      rc.rectangle(92 + i * 22, 66, 16, 28, { fill: on ? "#47724d" : "#ffffff", stroke: "#172126" });
    }
    text(canvas, "bit vector: local chemical environments", 410, 126, 15, "#5b6870", "700");
  }
  if (activeRepresentation.id === "graph") {
    rc.rectangle(74, 60, 180, 62, { fill: "#ffffff", stroke: "#172126" });
    wrapText(canvas, "节点特征：原子类型、电荷、杂化、芳香性", 90, 82, 150, 18, 13);
    rc.rectangle(570, 60, 180, 62, { fill: "#ffffff", stroke: "#172126" });
    wrapText(canvas, "边特征：键类型、共轭、环、立体化学", 586, 82, 150, 18, 13);
  }
  if (activeRepresentation.id === "shape3d") {
    rc.circle(272, 256, 258, { stroke: "#2d5f95", strokeWidth: 2, fill: "rgba(45,95,149,0.08)" });
    rc.line(170, 395, 610, 100, { stroke: "#2d5f95", strokeWidth: 2 });
    text(canvas, "3D shape / electrostatics / conformers", 430, 440, 17, "#2d5f95");
  }
}

function initRepresentation() {
  const box = $("#representationModes");
  box.innerHTML = representations.map((item) => `<button class="segment" type="button" data-rep="${item.id}">${item.label}</button>`).join("");
  box.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-rep]");
    if (!btn) return;
    activeRepresentation = representations.find((item) => item.id === btn.dataset.rep);
    renderRepresentation();
  });
  renderRepresentation();
}

function renderRepresentation() {
  document.querySelectorAll("[data-rep]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.rep === activeRepresentation.id);
  });
  $("#representationCard").innerHTML = `
    <span class="tag">表示方式</span>
    <h3>${activeRepresentation.title}</h3>
    <p>${activeRepresentation.body}</p>
    <code>${activeRepresentation.example}</code>
  `;
  drawMolecule();
}

function drawNetwork() {
  const canvas = $("#networkCanvas");
  clear(canvas);
  const rc = roughCanvas(canvas);
  const nodes = [
    [424, 242, "Disease", "#eadde7", 112],
    [190, 135, "Target A", "#dceee9", 92],
    [655, 135, "Pathway", "#edf0db", 94],
    [210, 365, "Biomarker", "#dce6f3", 102],
    [645, 365, "Safety", "#f1e5d0", 96],
    [424, 78, "Genetics", "#ffffff", 82],
    [424, 420, "Patient", "#ffffff", 82]
  ];
  [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 2], [3, 6], [4, 6]].forEach(([a, b]) => {
    rc.line(nodes[a][0], nodes[a][1], nodes[b][0], nodes[b][1], { stroke: "#5b6870", strokeWidth: 2 });
  });
  nodes.forEach(([x, y, label, fill, d]) => {
    rc.circle(x, y, d, { fill, stroke: "#172126", roughness: 1.7 });
    text(canvas, label, x, y, 15);
  });
  wrapText(canvas, "强靶点 = 疾病因果 + 可干预机制 + 可测量药效 + 可接受安全窗口", 176, 470, 520, 22, 15);
}

function renderConcepts() {
  $("#conceptStack").innerHTML = concepts
    .map(([title, body]) => `<article class="concept-card"><h3>${title}</h3><p>${body}</p></article>`)
    .join("");
}

function drawScreening() {
  const libraryPower = Number($("#librarySize").value);
  const strictness = Number($("#modelStrictness").value);
  const structure = Number($("#structureQuality").value);
  const library = 10 ** libraryPower;
  const afterRules = Math.round(library * 0.22);
  const afterModel = Math.max(80, Math.round(afterRules * (0.42 - strictness * 0.028)));
  const afterDocking = Math.max(18, Math.round(afterModel * (0.25 + structure * 0.018)));
  const tested = Math.max(8, Math.round(afterDocking * 0.18));
  const falseRisk = Math.max(12, Math.round(72 - structure * 4 + strictness * 1.8));
  const novelty = Math.max(18, Math.min(91, Math.round(42 + (10 - strictness) * 3 + libraryPower * 4 - structure)));
  $("#libraryValue").textContent = library.toLocaleString("en-US");
  $("#strictnessValue").textContent = `${strictness} / 10`;
  $("#structureValue").textContent = `${structure} / 10`;
  $("#hitCount").textContent = tested.toLocaleString("en-US");
  $("#falsePositive").textContent = `${falseRisk}%`;
  $("#noveltyScore").textContent = `${novelty}%`;

  const canvas = $("#screeningCanvas");
  clear(canvas);
  const rc = roughCanvas(canvas);
  const rows = [
    ["化合物库", library, 120, "#dce6f3"],
    ["规则过滤", afterRules, 205, "#dceee9"],
    ["QSAR / GNN 排序", afterModel, 290, "#edf0db"],
    ["Docking / 药效团", afterDocking, 375, "#f1e5d0"],
    ["实验测试", tested, 460, "#eadde7"]
  ];
  rows.forEach(([label, count, y, fill], index) => {
    const width = 720 - index * 125;
    const x = (canvas.width - width) / 2;
    rc.rectangle(x, y - 34, width, 58, { fill, stroke: "#172126", roughness: 1.5 });
    text(canvas, label, x + 110, y - 4, 16, "#172126", "850", "left");
    text(canvas, count.toLocaleString("en-US"), x + width - 120, y - 4, 18, "#172126", "850");
  });
  wrapText(canvas, "漏斗越窄，实验成本越低；但过严阈值会丢掉新颖结构，过松阈值会带来假阳性。", 120, 40, 610, 22, 15);
}

function drawAdmet() {
  const logp = Number($("#logp").value);
  const mw = Number($("#mw").value);
  const tpsa = Number($("#tpsa").value);
  const potency = Number($("#potency").value);
  $("#logpValue").textContent = logp.toFixed(1);
  $("#mwValue").textContent = mw.toFixed(0);
  $("#tpsaValue").textContent = tpsa.toFixed(0);
  $("#potencyValue").textContent = potency.toFixed(1);
  const scores = [
    ["活性", Math.min(1, (potency - 5) / 5)],
    ["溶解度", Math.max(0.1, 1 - Math.abs(logp - 2.2) / 4.2)],
    ["口服性", Math.max(0.1, 1 - Math.max(0, mw - 500) / 260 - Math.max(0, tpsa - 120) / 120)],
    ["代谢稳定", Math.max(0.1, 1 - Math.abs(logp - 3) / 5 - Math.max(0, mw - 560) / 500)],
    ["安全性", Math.max(0.08, 1 - Math.max(0, logp - 3.5) / 3 - Math.max(0, potency - 8.5) / 5)],
    ["合成友好", Math.max(0.15, 1 - Math.max(0, mw - 450) / 450)]
  ];
  const canvas = $("#admetCanvas");
  clear(canvas);
  const rc = roughCanvas(canvas);
  const cx = 380;
  const cy = 280;
  const maxR = 185;
  for (let ring = 1; ring <= 4; ring += 1) {
    const points = scores.map((_, index) => {
      const angle = -Math.PI / 2 + (index / scores.length) * Math.PI * 2;
      const r = (maxR * ring) / 4;
      return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
    });
    rc.polygon(points, { stroke: "#d8d1c2", fill: "transparent", roughness: 1.5 });
  }
  scores.forEach(([label], index) => {
    const angle = -Math.PI / 2 + (index / scores.length) * Math.PI * 2;
    rc.line(cx, cy, cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR, { stroke: "#d8d1c2" });
    text(canvas, label, cx + Math.cos(angle) * (maxR + 44), cy + Math.sin(angle) * (maxR + 30), 15);
  });
  const area = scores.map(([, score], index) => {
    const angle = -Math.PI / 2 + (index / scores.length) * Math.PI * 2;
    const r = maxR * score;
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
  });
  rc.polygon(area, { fill: "rgba(31,111,120,0.25)", stroke: "#1f6f78", strokeWidth: 3, roughness: 1.2 });
  text(canvas, "ADMET 多目标雷达", cx, 42, 22);

  const warnings = [];
  if (logp > 4) warnings.push("LogP 偏高：溶解度、非特异性结合和毒性风险上升。");
  if (mw > 500) warnings.push("分子量偏大：口服吸收和组织分布可能变差。");
  if (tpsa > 120) warnings.push("TPSA 偏高：被动膜通透性可能受限。");
  if (potency < 6.5) warnings.push("活性偏弱：可能需要更高暴露量，安全窗口变窄。");
  if (!warnings.length) warnings.push("当前参数较均衡，但真实项目仍要看选择性、体内暴露、毒理和合成路线。");
  $("#admetAdvice").innerHTML = `<strong>判断：</strong><p>${warnings.join("</p><p>")}</p>`;
}

function renderModels() {
  $("#modelGrid").innerHTML = models
    .map(([title, tag, body], index) => `
      <article class="model-card ${progress.models[index] ? "read" : ""}" data-model="${index}">
        <span class="tag">${tag}</span>
        <h3>${title}</h3>
        <p>${body}</p>
      </article>
    `)
    .join("");
  $("#modelGrid").addEventListener("click", (event) => {
    const card = event.target.closest("[data-model]");
    if (!card) return;
    const index = card.dataset.model;
    progress.models[index] = !progress.models[index];
    card.classList.toggle("read", progress.models[index]);
    saveProgress();
  });
}

function renderCard() {
  const [tag, title, body, example] = cards[cardIndex % cards.length];
  $("#cardTag").textContent = tag;
  $("#cardTitle").textContent = title;
  $("#cardBody").textContent = body;
  $("#cardExample").textContent = example;
}

function renderChecklist() {
  $("#checklist").innerHTML = checklist
    .map(([title, body], index) => `
      <label class="check-item">
        <input type="checkbox" data-check="${index}" ${progress.checks[index] ? "checked" : ""} />
        <span><strong>${title}</strong><span>${body}</span></span>
      </label>
    `)
    .join("");
  $("#checklist").addEventListener("change", (event) => {
    const input = event.target.closest("[data-check]");
    if (!input) return;
    progress.checks[input.dataset.check] = input.checked;
    saveProgress();
  });
}

function renderQuiz() {
  $("#quizBox").innerHTML = quiz
    .map((item, index) => `
      <article class="quiz-card">
        <h3>${index + 1}. ${item.q}</h3>
        <div class="quiz-options">
          ${item.options
            .map((option, optionIndex) => {
              const answered = progress.quiz[index];
              const cls = answered == null ? "" : optionIndex === item.answer ? "correct" : Number(answered) === optionIndex ? "wrong" : "";
              return `<button class="quiz-option ${cls}" type="button" data-q="${index}" data-a="${optionIndex}">${option}</button>`;
            })
            .join("")}
        </div>
        <p class="explain ${progress.quiz[index] == null ? "" : "visible"}">${item.explain}</p>
      </article>
    `)
    .join("");
  $("#quizBox").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-q]");
    if (!btn) return;
    progress.quiz[btn.dataset.q] = Number(btn.dataset.a);
    saveProgress();
    renderQuiz();
  });
}

function updateProgress() {
  const done = Object.values(progress.checks).filter(Boolean).length;
  const read = Object.values(progress.models).filter(Boolean).length;
  const answered = Object.keys(progress.quiz).length;
  const correct = Object.entries(progress.quiz).filter(([q, a]) => quiz[Number(q)].answer === Number(a)).length;
  const totalItems = checklist.length + models.length + quiz.length;
  const completed = done + read + correct;
  $("#doneCount").textContent = done;
  $("#conceptCount").textContent = read;
  $("#quizScore").textContent = answered ? `${Math.round((correct / answered) * 100)}%` : "0%";
  $("#progressBar").style.width = `${Math.round((completed / totalItems) * 100)}%`;
}

function bindControls() {
  ["librarySize", "modelStrictness", "structureQuality"].forEach((id) => {
    $(`#${id}`).addEventListener("input", drawScreening);
  });
  ["logp", "mw", "tpsa", "potency"].forEach((id) => {
    $(`#${id}`).addEventListener("input", drawAdmet);
  });
  $("#nextCard").addEventListener("click", () => {
    cardIndex += 1;
    renderCard();
  });
  $("#resetProgress").addEventListener("click", () => {
    progress = { checks: {}, quiz: {}, models: {} };
    saveProgress();
    renderChecklist();
    renderQuiz();
    renderModels();
  });
}

function init() {
  initDays();
  drawHero();
  initPipeline();
  initRepresentation();
  drawNetwork();
  renderConcepts();
  drawScreening();
  drawAdmet();
  renderModels();
  renderCard();
  renderChecklist();
  renderQuiz();
  bindControls();
  updateProgress();
}

window.addEventListener("DOMContentLoaded", init);
