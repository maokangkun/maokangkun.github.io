const lessons = [
  {
    title: "机场与问候",
    scene: "airport",
    goal: "先学会打招呼、感谢、求助，以及入境时最常用的句子。",
    tasks: ["会说 6 个礼貌开场白", "能请求对方说慢一点", "能问洗手间和出口"],
    phrases: [
      ["こんにちは", "こんにちは", "konnichiwa", "你好", "白天最常用，进店也可以说。"],
      ["ありがとうございます", "ありがとうございます", "arigatou gozaimasu", "谢谢您", "比 arigatou 更礼貌。"],
      ["すみません", "すみません", "sumimasen", "不好意思 / 请问", "万能开场，问路和点餐都能用。"],
      ["もう一度お願いします", "もういちど おねがいします", "mou ichido onegaishimasu", "请再说一遍", "听不清时很有用。"],
      ["ゆっくりお願いします", "ゆっくり おねがいします", "yukkuri onegaishimasu", "请慢一点", "可以配合手势。"],
      ["トイレはどこですか", "トイレは どこですか", "toire wa doko desu ka", "洗手间在哪里？", "doko = 哪里。"]
    ]
  },
  {
    title: "交通与买票",
    scene: "train",
    goal: "学会问车站、买票、确认方向，避免坐错车。",
    tasks: ["会问某地怎么去", "能确认几号站台", "会说一张票"],
    phrases: [
      ["駅はどこですか", "えきは どこですか", "eki wa doko desu ka", "车站在哪里？", "eki = 车站。"],
      ["新宿までお願いします", "しんじゅくまで おねがいします", "shinjuku made onegaishimasu", "请到新宿", "把地名替换即可。"],
      ["切符を一枚ください", "きっぷを いちまい ください", "kippu o ichimai kudasai", "请给我一张票", "ichimai = 一张。"],
      ["何番線ですか", "なんばんせんですか", "nanbansen desu ka", "几号站台？", "在复杂车站尤其救命。"],
      ["この電車は渋谷に行きますか", "このでんしゃは しぶやに いきますか", "kono densha wa shibuya ni ikimasu ka", "这趟车去涩谷吗？", "kono = 这个。"],
      ["降ります", "おります", "orimasu", "我要下车", "公交或拥挤车厢里可用。"]
    ]
  },
  {
    title: "酒店入住",
    scene: "hotel",
    goal: "掌握入住、寄存行李、询问设施的表达。",
    tasks: ["能说明已预约", "能问入住时间", "能请求寄存行李"],
    phrases: [
      ["予約しています", "よやくしています", "yoyaku shite imasu", "我有预约", "入住第一句。"],
      ["チェックインをお願いします", "チェックインを おねがいします", "chekkuin o onegaishimasu", "请办理入住", "外来语很常见。"],
      ["荷物を預けてもいいですか", "にもつを あずけても いいですか", "nimotsu o azuketemo ii desu ka", "可以寄存行李吗？", "temo ii desu ka = 可以吗。"],
      ["朝食は何時ですか", "ちょうしょくは なんじですか", "choushoku wa nanji desu ka", "早餐几点？", "nanji = 几点。"],
      ["Wi-Fiのパスワードは何ですか", "ワイファイの パスワードは なんですか", "waifai no pasuwaado wa nan desu ka", "Wi-Fi 密码是什么？", "password 日语读作 pasuwaado。"],
      ["部屋を変えられますか", "へやを かえられますか", "heya o kaeraremasu ka", "可以换房间吗？", "遇到噪音或烟味时用。"]
    ]
  },
  {
    title: "餐厅点餐",
    scene: "restaurant",
    goal: "会入座、看菜单、点餐、结账，以及表达忌口。",
    tasks: ["能要英文/图片菜单", "能点这个", "能结账"],
    phrases: [
      ["二人です", "ふたりです", "futari desu", "两个人", "进店时说明人数。"],
      ["メニューをお願いします", "メニューを おねがいします", "menyuu o onegaishimasu", "请给我菜单", "也可说 eigo no menyuu。"],
      ["これをください", "これを ください", "kore o kudasai", "请给我这个", "指着菜单最稳。"],
      ["おすすめは何ですか", "おすすめは なんですか", "osusume wa nan desu ka", "推荐是什么？", "想吃当地特色就问这个。"],
      ["辛くないですか", "からくないですか", "karakunai desu ka", "不辣吗？", "karai = 辣。"],
      ["お会計お願いします", "おかいけい おねがいします", "okaikei onegaishimasu", "请结账", "餐后对店员说。"]
    ]
  },
  {
    title: "购物付款",
    scene: "shop",
    goal: "问价格、试穿、付款和退税时不慌。",
    tasks: ["能问多少钱", "会请求试穿", "会问能否刷卡"],
    phrases: [
      ["これはいくらですか", "これは いくらですか", "kore wa ikura desu ka", "这个多少钱？", "ikura = 多少钱。"],
      ["試着してもいいですか", "しちゃくしても いいですか", "shichaku shitemo ii desu ka", "可以试穿吗？", "服装店常用。"],
      ["カードは使えますか", "カードは つかえますか", "kaado wa tsukaemasu ka", "可以刷卡吗？", "现金店仍然不少。"],
      ["袋はいりません", "ふくろは いりません", "fukuro wa irimasen", "不要袋子", "环保也省钱。"],
      ["免税できますか", "めんぜい できますか", "menzei dekimasu ka", "可以退税吗？", "带护照。"],
      ["これにします", "これにします", "kore ni shimasu", "我选这个", "决定购买时说。"]
    ]
  },
  {
    title: "问路与应急",
    scene: "street",
    goal: "学会方向、求助、身体不适和紧急联系。",
    tasks: ["能问目的地在哪里", "能说迷路了", "能请求帮助"],
    phrases: [
      ["ここはどこですか", "ここは どこですか", "koko wa doko desu ka", "这里是哪里？", "迷路时第一句。"],
      ["道に迷いました", "みちに まよいました", "michi ni mayoimashita", "我迷路了", "mayoimashita = 迷路了。"],
      ["助けてください", "たすけて ください", "tasukete kudasai", "请帮帮我", "紧急情况用。"],
      ["病院に行きたいです", "びょういんに いきたいです", "byouin ni ikitai desu", "我想去医院", "ikitai = 想去。"],
      ["警察を呼んでください", "けいさつを よんでください", "keisatsu o yonde kudasai", "请叫警察", "严重情况使用。"],
      ["まっすぐ行ってください", "まっすぐ いってください", "massugu itte kudasai", "请直走", "听懂方向也重要。"]
    ]
  },
  {
    title: "整合实战",
    scene: "city",
    goal: "把一周短句串成完整旅行流程，形成可随身复习的表达库。",
    tasks: ["完成混合测验", "把 10 句加入已掌握", "能完成一段餐厅对话"],
    phrases: [
      ["日本語は少しだけ話せます", "にほんごは すこしだけ はなせます", "nihongo wa sukoshi dake hanasemasu", "我只会说一点日语", "先降低对方语速预期。"],
      ["英語か中国語は話せますか", "えいごか ちゅうごくごは はなせますか", "eigo ka chuugokugo wa hanasemasu ka", "您会英语或中文吗？", "ka = 或者。"],
      ["写真を撮ってもいいですか", "しゃしんを とっても いいですか", "shashin o tottemo ii desu ka", "可以拍照吗？", "寺院、店内先问。"],
      ["おすすめの場所はありますか", "おすすめの ばしょは ありますか", "osusume no basho wa arimasu ka", "有推荐的地方吗？", "向店员或酒店前台问。"],
      ["大丈夫です", "だいじょうぶです", "daijoubu desu", "没关系 / 可以", "可表示拒绝或确认。"],
      ["また来ます", "また きます", "mata kimasu", "我还会再来", "离店时友好收尾。"]
    ]
  }
];

const kana = [
  ["あ", "a"], ["い", "i"], ["う", "u"], ["え", "e"], ["お", "o"],
  ["か", "ka"], ["き", "ki"], ["く", "ku"], ["け", "ke"], ["こ", "ko"],
  ["さ", "sa"], ["し", "shi"], ["す", "su"], ["せ", "se"], ["そ", "so"],
  ["た", "ta"], ["ち", "chi"], ["つ", "tsu"], ["て", "te"], ["と", "to"],
  ["な", "na"], ["に", "ni"], ["ぬ", "nu"], ["ね", "ne"], ["の", "no"],
  ["ま", "ma"], ["み", "mi"], ["む", "mu"], ["め", "me"], ["も", "mo"],
  ["ら", "ra"], ["り", "ri"], ["る", "ru"], ["れ", "re"], ["ろ", "ro"]
];

const dialogs = [
  {
    prompt: "你刚进餐厅，店员问人数。两个人怎么说？",
    answer: "二人です",
    choices: ["二人です", "駅はどこですか", "お会計お願いします"]
  },
  {
    prompt: "在车站想确认这趟车是否去涩谷。",
    answer: "この電車は渋谷に行きますか",
    choices: ["この電車は渋谷に行きますか", "袋はいりません", "朝食は何時ですか"]
  },
  {
    prompt: "酒店还没到入住时间，你想寄存行李。",
    answer: "荷物を預けてもいいですか",
    choices: ["荷物を預けてもいいですか", "辛くないですか", "また来ます"]
  },
  {
    prompt: "听不懂对方的话，想请对方说慢一点。",
    answer: "ゆっくりお願いします",
    choices: ["ゆっくりお願いします", "これにします", "警察を呼んでください"]
  }
];

const state = {
  day: 0,
  mode: "all",
  learned: new Set(JSON.parse(localStorage.getItem("learnedPhrases") || "[]")),
  dialog: 0,
  quiz: 0
};

const colors = ["#3aa987", "#ef6f61", "#e5aa2f", "#4e8fbd", "#8b5a83"];

const $ = (selector) => document.querySelector(selector);
const tabs = $("#dayTabs");
const phraseGrid = $("#phraseGrid");
const taskList = $("#taskList");

function saveProgress() {
  localStorage.setItem("learnedPhrases", JSON.stringify([...state.learned]));
  const total = lessons.reduce((sum, lesson) => sum + lesson.phrases.length, 0);
  const pct = Math.round((state.learned.size / total) * 100);
  $("#progressText").textContent = `${pct}%`;
  $("#progressBar").style.width = `${pct}%`;
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  utterance.rate = 0.82;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function phraseId(dayIndex, phraseIndex) {
  return `${dayIndex}-${phraseIndex}`;
}

function renderTabs() {
  tabs.innerHTML = lessons
    .map((lesson, index) => `
      <button class="day-tab ${index === state.day ? "active" : ""}" data-day="${index}">
        <strong>Day ${index + 1}</strong>
        <span>${lesson.title}</span>
      </button>
    `)
    .join("");
}

function renderLesson() {
  const lesson = lessons[state.day];
  $("#sceneKicker").textContent = `Day ${state.day + 1}`;
  $("#dayTitle").textContent = lesson.title;
  $("#dayGoal").textContent = lesson.goal;

  taskList.innerHTML = lesson.tasks
    .map((task, index) => `<li class="${hasEnoughLearned(index) ? "done" : ""}">${task}</li>`)
    .join("");

  phraseGrid.innerHTML = lesson.phrases
    .map(([jp, kanaText, romaji, meaning, tip], index) => {
      const id = phraseId(state.day, index);
      const learned = state.learned.has(id);
      return `
        <article class="phrase-card ${learned ? "learned" : ""}">
          <div class="jp">${jp}</div>
          ${state.mode !== "romaji" ? `<p class="kana">${kanaText}</p>` : ""}
          ${state.mode !== "kana" ? `<p class="romaji">${romaji}</p>` : ""}
          <p class="meaning">${meaning}</p>
          <p class="tip">${tip}</p>
          <div class="phrase-actions">
            <button data-speak="${jp}" aria-label="播放 ${jp}">▶</button>
            <button data-learn="${id}">${learned ? "已掌握" : "标记掌握"}</button>
          </div>
        </article>
      `;
    })
    .join("");

  renderTabs();
  drawScene(lesson.scene);
  saveProgress();
}

function hasEnoughLearned(taskIndex) {
  const count = lessons[state.day].phrases.filter((_, index) => state.learned.has(phraseId(state.day, index))).length;
  return count >= taskIndex + 2;
}

function renderKana() {
  const shuffled = [...kana].sort(() => Math.random() - 0.5).slice(0, 15);
  $("#kanaDeck").innerHTML = shuffled
    .map(([char, sound]) => `
      <button class="kana-card" data-kana="${char}">
        <strong>${char}</strong>
        <span>${sound}</span>
      </button>
    `)
    .join("");
}

function allPhrases() {
  return lessons.flatMap((lesson, dayIndex) =>
    lesson.phrases.map((phrase, phraseIndex) => ({
      dayIndex,
      phraseIndex,
      jp: phrase[0],
      kana: phrase[1],
      romaji: phrase[2],
      meaning: phrase[3],
      tip: phrase[4]
    }))
  );
}

function makeQuiz() {
  const phrases = allPhrases();
  const item = phrases[state.quiz % phrases.length];
  const choices = [item.meaning];
  while (choices.length < 3) {
    const random = phrases[Math.floor(Math.random() * phrases.length)].meaning;
    if (!choices.includes(random)) choices.push(random);
  }
  choices.sort(() => Math.random() - 0.5);
  $("#quizQuestion").textContent = `「${item.jp}」是什么意思？`;
  $("#quizChoices").innerHTML = choices
    .map((choice) => `<button data-quiz="${choice}" data-answer="${item.meaning}">${choice}</button>`)
    .join("");
  $("#quizFeedback").textContent = "选出最贴近旅行场景的中文意思。";
}

function makeDialog() {
  const item = dialogs[state.dialog % dialogs.length];
  $("#dialogPrompt").textContent = item.prompt;
  $("#dialogChoices").innerHTML = item.choices
    .map((choice) => `<button data-dialog="${choice}" data-answer="${item.answer}">${choice}</button>`)
    .join("");
  $("#dialogFeedback").textContent = "把自己放进场景里，先想中文意图，再选日语。";
}

function markChoice(button, correct, feedbackSelector) {
  const siblings = [...button.parentElement.querySelectorAll("button")];
  siblings.forEach((item) => {
    item.disabled = true;
    if (item.dataset.answer === item.textContent) item.classList.add("correct");
  });
  button.classList.add(correct ? "correct" : "wrong");
  $(feedbackSelector).textContent = correct ? "答对了。可以点短句里的播放按钮跟读一遍。" : `这题选「${button.dataset.answer}」。`;
  if (correct) speak(button.dataset.answer);
}

function drawScene(type) {
  const canvas = $("#sceneCanvas");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  if (!window.rough) {
    ctx.font = "24px sans-serif";
    ctx.fillText("RoughJS 加载中，请联网后刷新。", 80, 200);
    return;
  }

  const rc = rough.canvas(canvas);
  const stroke = "#24313b";
  rc.rectangle(20, 20, width - 40, height - 40, { stroke, strokeWidth: 2, roughness: 1.4 });
  rc.line(40, height - 70, width - 40, height - 70, { stroke, strokeWidth: 2 });

  const drawPerson = (x, y, fill) => {
    rc.circle(x, y, 34, { stroke, fill, fillStyle: "solid", roughness: 1.1 });
    rc.line(x, y + 20, x, y + 86, { stroke, strokeWidth: 3 });
    rc.line(x - 32, y + 48, x + 32, y + 48, { stroke, strokeWidth: 3 });
    rc.line(x, y + 86, x - 30, y + 130, { stroke, strokeWidth: 3 });
    rc.line(x, y + 86, x + 30, y + 130, { stroke, strokeWidth: 3 });
  };

  const sign = (text, x, y, w, fill) => {
    rc.rectangle(x, y, w, 58, { stroke, fill, fillStyle: "hachure", hachureGap: 8 });
    ctx.fillStyle = stroke;
    ctx.font = "bold 24px sans-serif";
    ctx.fillText(text, x + 18, y + 38);
  };

  if (type === "airport") {
    sign("ARRIVAL", 610, 72, 210, "#dff8e9");
    rc.rectangle(640, 182, 150, 92, { stroke, fill: "#d9ecff", fillStyle: "solid" });
    rc.circle(742, 286, 28, { stroke, fill: "#ffffff", fillStyle: "solid" });
    rc.line(645, 222, 560, 180, { stroke, strokeWidth: 3 });
    drawPerson(520, 185, "#ef6f61");
  } else if (type === "train") {
    sign("駅  Station", 585, 58, 245, "#fff1bc");
    rc.rectangle(500, 165, 330, 108, { stroke, fill: "#d9ecff", fillStyle: "solid" });
    rc.rectangle(530, 188, 70, 52, { stroke, fill: "#ffffff", fillStyle: "solid" });
    rc.rectangle(620, 188, 70, 52, { stroke, fill: "#ffffff", fillStyle: "solid" });
    rc.circle(565, 286, 28, { stroke });
    rc.circle(765, 286, 28, { stroke });
    rc.line(470, 318, 855, 318, { stroke, strokeWidth: 4 });
  } else if (type === "hotel") {
    sign("HOTEL", 590, 70, 210, "#e9def0");
    rc.rectangle(560, 140, 260, 170, { stroke, fill: "#fffdf8", fillStyle: "solid" });
    rc.rectangle(596, 178, 54, 52, { stroke, fill: "#d9ecff", fillStyle: "solid" });
    rc.rectangle(690, 178, 54, 52, { stroke, fill: "#d9ecff", fillStyle: "solid" });
    rc.rectangle(660, 244, 58, 66, { stroke, fill: "#fff1bc", fillStyle: "solid" });
    rc.rectangle(498, 260, 52, 45, { stroke, fill: "#ef6f61", fillStyle: "solid" });
  } else if (type === "restaurant") {
    sign("ごはん", 600, 66, 190, "#fff1bc");
    rc.rectangle(570, 220, 260, 24, { stroke, fill: "#8b5a83", fillStyle: "solid" });
    rc.line(610, 244, 585, 310, { stroke, strokeWidth: 3 });
    rc.line(790, 244, 820, 310, { stroke, strokeWidth: 3 });
    rc.circle(660, 190, 42, { stroke, fill: "#ffffff", fillStyle: "solid" });
    rc.circle(750, 190, 42, { stroke, fill: "#ffffff", fillStyle: "solid" });
    drawPerson(500, 175, "#3aa987");
  } else if (type === "shop") {
    sign("SHOP", 620, 62, 190, "#dff8e9");
    rc.rectangle(575, 140, 260, 170, { stroke, fill: "#fffdf8", fillStyle: "solid" });
    rc.rectangle(600, 172, 70, 92, { stroke, fill: "#ef6f61", fillStyle: "zigzag" });
    rc.rectangle(708, 172, 70, 92, { stroke, fill: "#4e8fbd", fillStyle: "zigzag" });
    rc.rectangle(500, 250, 52, 58, { stroke, fill: "#fff1bc", fillStyle: "solid" });
  } else if (type === "street") {
    sign("交番", 640, 70, 150, "#d9ecff");
    rc.line(590, 118, 590, 308, { stroke, strokeWidth: 4 });
    rc.polygon([[590, 132], [708, 162], [590, 192]], { stroke, fill: "#ef6f61", fillStyle: "solid" });
    rc.polygon([[590, 205], [478, 236], [590, 268]], { stroke, fill: "#3aa987", fillStyle: "solid" });
    drawPerson(790, 178, "#e5aa2f");
  } else {
    sign("TOKYO", 620, 68, 190, "#d9ecff");
    rc.rectangle(500, 188, 62, 120, { stroke, fill: "#fff1bc", fillStyle: "solid" });
    rc.rectangle(590, 148, 78, 160, { stroke, fill: "#dff8e9", fillStyle: "solid" });
    rc.rectangle(700, 116, 88, 192, { stroke, fill: "#e9def0", fillStyle: "solid" });
    rc.circle(835, 102, 46, { stroke, fill: "#ef6f61", fillStyle: "solid" });
  }

  colors.forEach((fill, index) => {
    rc.circle(80 + index * 54, 315 + (index % 2) * 10, 20, { stroke, fill, fillStyle: "solid" });
  });
}

tabs.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-day]");
  if (!tab) return;
  state.day = Number(tab.dataset.day);
  renderLesson();
});

phraseGrid.addEventListener("click", (event) => {
  const speakBtn = event.target.closest("[data-speak]");
  const learnBtn = event.target.closest("[data-learn]");
  if (speakBtn) speak(speakBtn.dataset.speak);
  if (learnBtn) {
    const id = learnBtn.dataset.learn;
    if (state.learned.has(id)) state.learned.delete(id);
    else state.learned.add(id);
    renderLesson();
  }
});

document.querySelectorAll(".mode").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".mode").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.mode = button.dataset.mode;
    renderLesson();
  });
});

$("#kanaShuffle").addEventListener("click", renderKana);
$("#kanaDeck").addEventListener("click", (event) => {
  const card = event.target.closest("[data-kana]");
  if (card) speak(card.dataset.kana);
});

$("#dialogNext").addEventListener("click", () => {
  state.dialog += 1;
  makeDialog();
});

$("#dialogChoices").addEventListener("click", (event) => {
  const button = event.target.closest("[data-dialog]");
  if (!button) return;
  markChoice(button, button.dataset.dialog === button.dataset.answer, "#dialogFeedback");
});

$("#quizNext").addEventListener("click", () => {
  state.quiz += 1;
  makeQuiz();
});

$("#quizChoices").addEventListener("click", (event) => {
  const button = event.target.closest("[data-quiz]");
  if (!button) return;
  markChoice(button, button.dataset.quiz === button.dataset.answer, "#quizFeedback");
});

$("#resetBtn").addEventListener("click", () => {
  state.learned.clear();
  localStorage.removeItem("learnedPhrases");
  renderLesson();
});

window.addEventListener("resize", () => drawScene(lessons[state.day].scene));

renderTabs();
renderLesson();
renderKana();
makeDialog();
makeQuiz();
