const days = [
  {
    title: "第 1 天：Lean 是什么，命题为什么是类型",
    goal: "建立计算机视角：Lean 不是写数学答案，而是写能被内核检查的证明对象。",
    tasks: [
      "安装或在线体验 Lean 4，知道 `.lean` 文件、Lake、Mathlib 分别是什么。",
      "理解 `def`、`example`、`theorem`、`#check`、`#eval`。",
      "记住 Curry-Howard：命题是类型，证明是这个类型的值。",
      "完成 10 个最小例子：自然数、布尔值、等式、函数。"
    ],
    code: "def x : Nat := 3\n#eval x + 4\n\nexample : 1 + 1 = 2 := by\n  norm_num"
  },
  {
    title: "第 2 天：目标状态与 tactic 证明",
    goal: "学会看 goal：上下文里有什么，冒号右边要证明什么。",
    tasks: [
      "练习 `intro`、`exact`、`apply`、`rw`、`simp`。",
      "每次写 tactic 前先用中文说：我要把目标变成什么。",
      "读懂 Lean 报错里的 expected type 与 has type。",
      "证明 15 个关于蕴含、合取、等式对称性的命题。"
    ],
    code: "example (P Q : Prop) (hP : P) (hPQ : P -> Q) : Q := by\n  exact hPQ hP"
  },
  {
    title: "第 3 天：把自然语言题目形式化",
    goal: "把题目拆成变量、假设、目标，先不急着证明。",
    tasks: [
      "区分对象变量 `(n : Nat)` 与命题假设 `(h : n = 0)`。",
      "学习 `∀`、`∃`、`∧`、`∨`、`¬` 的 Lean 写法。",
      "把 5 道简单题只写出 theorem statement。",
      "用 `#check` 搜索相似定理的类型形状。"
    ],
    code: "example : forall n : Nat, n = n := by\n  intro n\n  rfl"
  },
  {
    title: "第 4 天：Mathlib 与定理检索",
    goal: "学会站在库上证明，而不是从零发明数学。",
    tasks: [
      "知道 `import Mathlib` 的意义。",
      "练习 `#check Nat.add_comm`、`#check add_assoc`。",
      "学会用定理类型匹配当前目标。",
      "读 3 个 Mathlib 小证明，标出每一步 tactic 的作用。"
    ],
    code: "import Mathlib\n\nexample (a b : Nat) : a + b = b + a := by\n  exact Nat.add_comm a b"
  },
  {
    title: "第 5 天：证明工程与调试",
    goal: "像调程序一样调证明：缩小目标、检查类型、局部验证。",
    tasks: [
      "使用 `have` 建立中间 lemma。",
      "用 `calc` 写等式链。",
      "遇到失败先 `#check`、再简化目标、再换定理。",
      "总结 10 条常见错误及修复方式。"
    ],
    code: "example (a b c : Nat) (h : a = b) : a + c = b + c := by\n  rw [h]"
  },
  {
    title: "第 6 天：AI 如何参与证明",
    goal: "理解大模型、检索器、Lean checker 之间的闭环。",
    tasks: [
      "把 Lean 状态看成给模型的结构化 prompt。",
      "理解 tactic 生成、premise selection、tree search。",
      "对同一题生成 5 种 tactic 尝试，并记录哪种通过。",
      "建立错误分类：语法错、类型错、缺定理、搜索方向错。"
    ],
    code: "-- AI loop sketch\n-- state -> propose tactic -> Lean checks -> feedback -> retry"
  },
  {
    title: "第 7 天：迷你项目",
    goal: "完成一个小型 AI + Lean 研究原型，哪怕很粗糙。",
    tasks: [
      "选 20 个简单 theorem statement 作为数据集。",
      "为每题记录人类证明、模型候选、Lean 检查结果。",
      "统计通过率、平均尝试次数、常见失败原因。",
      "写一页 research note：问题、方法、实验、下一步。"
    ],
    code: "theorem mini_project_goal (P Q : Prop) : P ∧ Q -> Q ∧ P := by\n  intro h\n  exact And.intro h.right h.left"
  }
];

const examples = [
  {
    name: "最小定理：rfl",
    code: "example : 2 = 2 := by\n  rfl",
    output: "目标 `2 = 2` 两边计算后相同，`rfl` 可以直接构造证明。\n\n你学到：等式证明很多时候是“化简后同一”。"
  },
  {
    name: "函数应用：exact",
    code: "example (P Q : Prop) (hP : P) (h : P -> Q) : Q := by\n  exact h hP",
    output: "上下文有 `h : P -> Q` 和 `hP : P`。\n`h hP` 的类型是 `Q`，正好匹配目标，所以 `exact` 成功。\n\n你学到：`exact` 就是交出一个类型完全匹配的证明项。"
  },
  {
    name: "引入变量：intro",
    code: "example : forall n : Nat, n = n := by\n  intro n\n  rfl",
    output: "`forall n : Nat, ...` 是一个函数式目标。\n`intro n` 把任意的 `n` 放入上下文，目标变成 `n = n`。\n`rfl` 完成自反等式。\n\n你学到：证明全称命题像写一个接收任意输入的函数。"
  },
  {
    name: "改写：rw",
    code: "example (a b c : Nat) (h : a = b) : a + c = b + c := by\n  rw [h]",
    output: "`rw [h]` 用假设 `h : a = b` 把目标中的 `a` 改写成 `b`。\n目标变为 `b + c = b + c`，Lean 可自动关闭。\n\n你学到：等式假设是可执行的重写规则。"
  },
  {
    name: "合取拆装：And",
    code: "example (P Q : Prop) : P ∧ Q -> Q ∧ P := by\n  intro h\n  exact And.intro h.right h.left",
    output: "`intro h` 得到 `h : P ∧ Q`。\n`h.right` 是 `Q` 的证明，`h.left` 是 `P` 的证明。\n`And.intro` 把两个证明装成 `Q ∧ P`。\n\n你学到：逻辑连接词也有构造器和投影。"
  }
];

const mapNodes = [
  { id: "type", label: "Type", x: 140, y: 94, color: "#245c73", text: "所有 Lean 表达式都有类型。命题也是类型，证明是值。", code: "def n : Nat := 3" },
  { id: "term", label: "Term", x: 330, y: 94, color: "#3f704d", text: "项是程序，也是证明对象。`fun x => x` 既是函数也是构造证明的方式。", code: "#check fun x : Nat => x" },
  { id: "prop", label: "Prop", x: 550, y: 94, color: "#a74d43", text: "`Prop` 是命题所在的宇宙。`P : Prop` 表示 P 是一个可被证明或无法证明的命题。", code: "variable (P : Prop)" },
  { id: "goal", label: "Goal", x: 150, y: 260, color: "#b37b22", text: "目标状态由上下文和待证明命题组成。写 tactic 就是在改造目标。", code: "P Q : Prop\nh : P\n⊢ Q" },
  { id: "tactic", label: "Tactic", x: 360, y: 270, color: "#62528f", text: "tactic 是生成证明项的小程序，例如 `intro`、`rw`、`simp`。", code: "by\n  intro h\n  exact h" },
  { id: "mathlib", label: "Mathlib", x: 590, y: 270, color: "#245c73", text: "Mathlib 是大型数学定理库。AI 证明常常是找对 lemma 并组合。", code: "#check Nat.add_comm" },
  { id: "ai", label: "AI Loop", x: 370, y: 430, color: "#3f704d", text: "AI 系统根据 goal 生成 tactic，Lean 检查，通过则推进，失败则用错误反馈重试。", code: "state -> tactic -> checker -> feedback" }
];

const mapEdges = [
  ["type", "term"],
  ["type", "prop"],
  ["prop", "goal"],
  ["goal", "tactic"],
  ["mathlib", "tactic"],
  ["tactic", "ai"],
  ["goal", "ai"]
];

const proofSteps = [
  {
    goal: "P Q : Prop\nh : P ∧ Q\n⊢ Q ∧ P",
    answer: "exact And.intro h.right h.left",
    ok: "正确。`h.right` 取出 Q，`h.left` 取出 P，`And.intro` 构造合取。",
    bad: "还不行。当前目标是构造 `Q ∧ P`，需要一个 Q 的证明和一个 P 的证明。"
  },
  {
    goal: "a b : Nat\nh : a = b\n⊢ b = a",
    answer: "exact h.symm",
    ok: "正确。等式证明有 `.symm`，能把 `a = b` 翻转成 `b = a`。",
    bad: "这个目标不是化简或引入变量，而是把等式方向翻过来。"
  },
  {
    goal: "⊢ forall n : Nat, n = n",
    answer: "intro n",
    ok: "正确。全称命题先引入任意变量，目标会变成 `n = n`。",
    bad: "先别急着 `rfl`，现在目标最外层还是 `forall`。"
  }
];

const tactics = ["intro n", "rfl", "rw [h]", "exact h.symm", "simp", "exact And.intro h.right h.left"];

const cards = [
  { title: "命题即类型", body: "在 Lean 中，`P : Prop` 是一个类型。证明 `P` 就是构造一个属于 `P` 的值。", code: "example (P : Prop) (h : P) : P := h" },
  { title: "目标驱动", body: "先看 `⊢` 右边要什么，再看上下文里有什么。Lean 证明像类型驱动编程。", code: "h : A -> B\nha : A\n⊢ B" },
  { title: "rewrite 思维", body: "`rw [h]` 把等式假设当成替换规则，常用于代数题和等式链。", code: "rw [Nat.add_comm]" },
  { title: "simp 不是魔法", body: "`simp` 使用一组标记过的简化定理。科研中要记录它成功或失败的状态。", code: "simp [Nat.succ_eq_add_one]" },
  { title: "AI 的角色", body: "大模型擅长提出候选 tactic，Lean 内核负责验证。可靠性来自 checker，不来自模型自信。", code: "candidate -> Lean.check -> pass/fail" }
];

const quizQuestions = [
  {
    q: "Lean 中 `example : P := by ...` 的核心含义是什么？",
    options: ["构造一个类型为 P 的证明值", "打印命题 P 的真假", "把 P 加入 Mathlib"],
    answer: 0
  },
  {
    q: "`intro h` 通常适合处理哪类目标？",
    options: ["蕴含或全称量词", "已经完全相同的等式", "搜索数据库里的定理"],
    answer: 0
  },
  {
    q: "为什么 AI 证明系统要调用 Lean checker？",
    options: ["验证生成证明是否真的类型正确", "让输出更像自然语言", "自动把所有数学题变简单"],
    answer: 0
  },
  {
    q: "看到目标 `a + b = b + a`，最可能先查哪个定理？",
    options: ["Nat.add_comm", "And.intro", "False.elim"],
    answer: 0
  }
];

const checklistItems = [
  "今天至少手写 5 个 theorem statement。",
  "今天至少运行或模拟分析 5 段 Lean 代码。",
  "今天记录 3 个 Lean 报错和修复方式。",
  "今天用中文解释 3 个 tactic 的目标变化。",
  "今天查 5 次 `#check` 或 Mathlib 定理。",
  "今天把 1 道自然语言题形式化。",
  "今天复盘 AI 可以在哪一步帮忙。",
  "今天整理 1 条明天要继续验证的问题。",
  "今天把完成内容写成研究笔记。"
];

const state = {
  selectedDay: Number(localStorage.getItem("leanTutorDay") || 0),
  checks: JSON.parse(localStorage.getItem("leanTutorChecks") || "{}"),
  quiz: JSON.parse(localStorage.getItem("leanTutorQuiz") || "{}"),
  proofIndex: 0,
  cardIndex: 0
};

const $ = (selector) => document.querySelector(selector);

function save() {
  localStorage.setItem("leanTutorDay", String(state.selectedDay));
  localStorage.setItem("leanTutorChecks", JSON.stringify(state.checks));
  localStorage.setItem("leanTutorQuiz", JSON.stringify(state.quiz));
  updateProgress();
}

function renderDays() {
  const tabs = $("#dayTabs");
  tabs.innerHTML = "";
  days.forEach((day, index) => {
    const button = document.createElement("button");
    button.className = `day-tab${index === state.selectedDay ? " active" : ""}`;
    button.type = "button";
    button.role = "tab";
    button.textContent = `Day ${index + 1}`;
    button.addEventListener("click", () => {
      state.selectedDay = index;
      save();
      renderDays();
    });
    tabs.appendChild(button);
  });

  const day = days[state.selectedDay];
  $("#dayDetail").innerHTML = `
    <span class="tag">Day ${state.selectedDay + 1}</span>
    <h3>${day.title}</h3>
    <p><strong>目标：</strong>${day.goal}</p>
    <h4>任务</h4>
    ${day.tasks.map((task, i) => taskCheckbox(`day-${state.selectedDay}-${i}`, task)).join("")}
    <h4>今日核心代码</h4>
    <pre>${escapeHtml(day.code)}</pre>
  `;
  bindTaskInputs();
}

function taskCheckbox(id, label) {
  const checked = state.checks[id] ? "checked" : "";
  return `<label class="task-row"><input type="checkbox" data-check="${id}" ${checked}> <span>${label}</span></label>`;
}

function bindTaskInputs() {
  document.querySelectorAll("[data-check]").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.checks[event.target.dataset.check] = event.target.checked;
      save();
    });
  });
}

function renderChecklist() {
  $("#checklist").innerHTML = checklistItems.map((item, index) => taskCheckbox(`daily-${index}`, item)).join("");
  bindTaskInputs();
}

function renderPlayground() {
  const select = $("#exampleSelect");
  select.innerHTML = examples.map((item, index) => `<option value="${index}">${item.name}</option>`).join("");
  const loadExample = () => {
    $("#leanEditor").value = examples[Number(select.value)].code;
    analyzeLean();
  };
  select.addEventListener("change", loadExample);
  $("#runLean").addEventListener("click", analyzeLean);
  loadExample();
}

function analyzeLean() {
  const code = $("#leanEditor").value;
  const selected = examples.find((item) => normalize(item.code) === normalize(code));
  if (selected) {
    $("#leanOutput").textContent = selected.output;
    return;
  }

  const hints = [];
  if (code.includes("theorem") || code.includes("example")) hints.push("检测到定理或例子声明：先确认冒号右边是不是你真正想证明的命题。");
  if (code.includes("intro")) hints.push("检测到 `intro`：它通常处理 `->` 或 `forall`，会把变量或假设放进上下文。");
  if (code.includes("rw")) hints.push("检测到 `rw`：请检查方括号里的定理是否是等式或可改写规则。");
  if (code.includes("simp")) hints.push("检测到 `simp`：它会尝试用简化定理关闭目标，失败时需要给它更多 lemma。");
  if (code.includes("exact")) hints.push("检测到 `exact`：Lean 会检查你交出的项是否精确匹配当前目标类型。");
  if (code.includes("#check")) hints.push("检测到 `#check`：这是学习 Mathlib 最重要的动作之一，用类型来理解定理。");
  if (code.includes("sorry")) hints.push("检测到 `sorry`：它是临时占位符，科研实验里必须统计并最终消除。");

  $("#leanOutput").textContent = hints.length
    ? hints.join("\n\n")
    : "还没识别到典型 Lean 结构。试着加入 `example : ... := by`、`intro`、`exact`、`rw` 或 `#check`。";
}

function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

function renderProofGame() {
  const step = proofSteps[state.proofIndex];
  $("#goalState").textContent = step.goal;
  $("#tacticGrid").innerHTML = tactics.map((tactic) => `<button class="tactic-btn" type="button">${tactic}</button>`).join("");
  $("#tacticFeedback").className = "feedback";
  $("#tacticFeedback").textContent = "选择一个 tactic。";
  document.querySelectorAll(".tactic-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const correct = button.textContent === step.answer;
      $("#tacticFeedback").className = `feedback ${correct ? "good" : "bad"}`;
      $("#tacticFeedback").textContent = correct ? step.ok : step.bad;
      if (correct) {
        window.setTimeout(() => {
          state.proofIndex = (state.proofIndex + 1) % proofSteps.length;
          renderProofGame();
        }, 1200);
      }
    });
  });
}

function renderCards() {
  const card = cards[state.cardIndex];
  $("#cardTitle").textContent = card.title;
  $("#cardBody").textContent = card.body;
  $("#cardCode").textContent = card.code;
  $("#nextCard").addEventListener("click", () => {
    state.cardIndex = (state.cardIndex + 1) % cards.length;
    renderCards();
  }, { once: true });
}

function renderQuiz() {
  $("#quiz").innerHTML = quizQuestions.map((item, qi) => `
    <article class="quiz-card">
      <h3>${qi + 1}. ${item.q}</h3>
      <div class="quiz-options">
        ${item.options.map((option, oi) => `<button type="button" data-q="${qi}" data-o="${oi}">${option}</button>`).join("")}
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-q]").forEach((button) => {
    const qi = button.dataset.q;
    const chosen = state.quiz[qi];
    if (chosen !== undefined) markQuizButton(button, Number(qi), Number(button.dataset.o), Number(chosen));
    button.addEventListener("click", () => {
      state.quiz[qi] = Number(button.dataset.o);
      save();
      renderQuiz();
    });
  });
}

function markQuizButton(button, qi, oi, chosen) {
  if (oi === quizQuestions[qi].answer) button.classList.add("correct");
  if (oi === chosen && oi !== quizQuestions[qi].answer) button.classList.add("wrong");
}

function drawConceptMap() {
  const canvas = $("#conceptMap");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  ctx.font = "18px ui-sans-serif, system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  mapEdges.forEach(([from, to]) => {
    const a = mapNodes.find((node) => node.id === from);
    const b = mapNodes.find((node) => node.id === to);
    roughLine(ctx, a.x, a.y, b.x, b.y, "#8d8576");
  });

  mapNodes.forEach((node) => {
    roughEllipse(ctx, node.x, node.y, 132, 70, node.color);
    ctx.fillStyle = node.color;
    ctx.fillText(node.label, node.x, node.y);
  });

  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    const hit = mapNodes.find((node) => Math.hypot(node.x - x, node.y - y) < 74);
    if (hit) updateInspector(hit);
  });
}

function roughLine(ctx, x1, y1, x2, y2, color) {
  ctx.strokeStyle = color;
  for (let i = 0; i < 2; i += 1) {
    ctx.beginPath();
    ctx.moveTo(x1 + jitter(), y1 + jitter());
    ctx.lineTo(x2 + jitter(), y2 + jitter());
    ctx.stroke();
  }
}

function roughEllipse(ctx, x, y, w, h, color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = "rgba(255,255,255,0.88)";
  for (let i = 0; i < 3; i += 1) {
    ctx.beginPath();
    ctx.ellipse(x + jitter(), y + jitter(), w / 2, h / 2, jitter() * 0.02, 0, Math.PI * 2);
    if (i === 0) ctx.fill();
    ctx.stroke();
  }
}

function jitter() {
  return (Math.random() - 0.5) * 5;
}

function updateInspector(node) {
  $("#mapInspector").innerHTML = `
    <span class="tag">当前节点</span>
    <h3>${node.label}</h3>
    <p>${node.text}</p>
    <code>${escapeHtml(node.code)}</code>
  `;
}

function updateProgress() {
  const done = Object.values(state.checks).filter(Boolean).length;
  const totalChecks = days.reduce((sum, day) => sum + day.tasks.length, 0) + checklistItems.length;
  const quizDone = Object.keys(state.quiz).length;
  const quizCorrect = Object.entries(state.quiz).filter(([qi, oi]) => quizQuestions[Number(qi)].answer === Number(oi)).length;
  const percent = Math.round(((done + quizCorrect) / (totalChecks + quizQuestions.length)) * 100);
  $("#doneCount").textContent = String(done);
  $("#quizScore").textContent = quizDone ? `${Math.round((quizCorrect / quizDone) * 100)}%` : "0%";
  $("#progressBar").style.width = `${percent}%`;
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

$("#resetProgress").addEventListener("click", () => {
  localStorage.removeItem("leanTutorDay");
  localStorage.removeItem("leanTutorChecks");
  localStorage.removeItem("leanTutorQuiz");
  state.selectedDay = 0;
  state.checks = {};
  state.quiz = {};
  renderDays();
  renderChecklist();
  renderQuiz();
  updateProgress();
});

renderDays();
renderChecklist();
renderPlayground();
renderProofGame();
renderCards();
renderQuiz();
drawConceptMap();
updateProgress();
