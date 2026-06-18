const lessons = [
  {
    title: "机场与问候",
    scene: "airport",
    goal: "先学会打招呼、感谢、求助，以及入境时最常用的句子。",
    tasks: ["会说 6 个礼貌开场白", "能请求对方说慢一点", "能问洗手间和出口"],
    vocab: [
      ["空港", "くうこう", "机场"], ["出口", "でぐち", "出口"], ["入口", "いりぐち", "入口"], ["手荷物", "てにもつ", "随身行李"],
      ["パスポート", "パスポート", "护照"], ["入国", "にゅうこく", "入境"], ["案内", "あんない", "问讯/指引"], ["両替", "りょうがえ", "换钱"]
    ],
    grammar: {
      pattern: "A は どこですか",
      note: "は 标记你正在问的主题，どこ 是“哪里”，ですか 是礼貌疑问。把 A 换成地点名词即可。",
      examples: ["トイレはどこですか。洗手间在哪里？", "出口はどこですか。出口在哪里？", "案内所はどこですか。问讯处在哪里？"]
    },
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
    vocab: [
      ["駅", "えき", "车站"], ["電車", "でんしゃ", "电车"], ["地下鉄", "ちかてつ", "地铁"], ["切符", "きっぷ", "车票"],
      ["改札", "かいさつ", "检票口"], ["番線", "ばんせん", "站台线"], ["乗り換え", "のりかえ", "换乘"], ["次", "つぎ", "下一站"]
    ],
    grammar: {
      pattern: "場所 まで お願いします",
      note: "まで 表示“到……为止”。买票、打车、问路时，把地名放在前面，再加 お願いします。",
      examples: ["東京までお願いします。请到东京。", "新宿までお願いします。请到新宿。", "空港までお願いします。请到机场。"]
    },
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
    vocab: [
      ["予約", "よやく", "预约"], ["部屋", "へや", "房间"], ["鍵", "かぎ", "钥匙"], ["荷物", "にもつ", "行李"],
      ["朝食", "ちょうしょく", "早餐"], ["受付", "うけつけ", "前台"], ["禁煙", "きんえん", "禁烟"], ["喫煙", "きつえん", "吸烟"]
    ],
    grammar: {
      pattern: "て も いいですか",
      note: "这是“可以……吗”的礼貌句型。动词て形 + もいいですか，用来请求允许。",
      examples: ["荷物を預けてもいいですか。可以寄存行李吗？", "ここで待ってもいいですか。可以在这里等吗？", "写真を撮ってもいいですか。可以拍照吗？"]
    },
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
    vocab: [
      ["水", "みず", "水"], ["お茶", "おちゃ", "茶"], ["ご飯", "ごはん", "米饭/饭"], ["肉", "にく", "肉"],
      ["魚", "さかな", "鱼"], ["野菜", "やさい", "蔬菜"], ["卵", "たまご", "鸡蛋"], ["会計", "かいけい", "结账"]
    ],
    grammar: {
      pattern: "これ を ください",
      note: "これ 是“这个”，を 标记动作对象，ください 表示“请给我”。点餐时指着菜单说很自然。",
      examples: ["これをください。请给我这个。", "水をください。请给我水。", "メニューをください。请给我菜单。"]
    },
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
    vocab: [
      ["円", "えん", "日元"], ["値段", "ねだん", "价格"], ["カード", "カード", "卡"], ["現金", "げんきん", "现金"],
      ["袋", "ふくろ", "袋子"], ["免税", "めんぜい", "免税"], ["サイズ", "サイズ", "尺寸"], ["試着", "しちゃく", "试穿"]
    ],
    grammar: {
      pattern: "A は いくらですか",
      note: "いくら 是“多少钱”。A は いくらですか 可以用于商品、票价、套餐价格。",
      examples: ["これはいくらですか。这个多少钱？", "切符はいくらですか。车票多少钱？", "全部でいくらですか。一共多少钱？"]
    },
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
    vocab: [
      ["道", "みち", "路"], ["右", "みぎ", "右"], ["左", "ひだり", "左"], ["前", "まえ", "前面"],
      ["後ろ", "うしろ", "后面"], ["病院", "びょういん", "医院"], ["薬", "くすり", "药"], ["警察", "けいさつ", "警察"]
    ],
    grammar: {
      pattern: "動詞 たいです",
      note: "动词ます形去掉ます，加たいです，表示“想……”。旅行中最常用的是 行きたいです。",
      examples: ["病院に行きたいです。我想去医院。", "駅に行きたいです。我想去车站。", "水を買いたいです。我想买水。"]
    },
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
    vocab: [
      ["日本語", "にほんご", "日语"], ["英語", "えいご", "英语"], ["中国語", "ちゅうごくご", "中文"], ["少し", "すこし", "一点"],
      ["写真", "しゃしん", "照片"], ["場所", "ばしょ", "地方"], ["おすすめ", "おすすめ", "推荐"], ["大丈夫", "だいじょうぶ", "没关系"]
    ],
    grammar: {
      pattern: "名詞 が ありますか",
      note: "ありますか 用来问“有没有”。找地点、服务、推荐、空房时都可以套用。",
      examples: ["おすすめはありますか。有推荐吗？", "空いている部屋がありますか。有空房吗？", "近くに駅がありますか。附近有车站吗？"]
    },
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
const vocabGrid = $("#vocabGrid");
const grammarPanel = $("#grammarPanel");
const aiStatus = $("#aiStatus");
const aiResult = $("#aiResult");
const modelSelect = $("#openrouterModel");
const defaultModel = "deepseek/deepseek-chat-v3-0324:free";
let speechVoices = [];

function getAiSettings() {
  const proxyUrl = window.JAPANESE_TUTOR_AI_PROXY_URL || "";
  const privateKey = window.JAPANESE_TUTOR_OPENROUTER_KEY || "";
  const privateModel = window.JAPANESE_TUTOR_OPENROUTER_MODEL || "";
  return {
    proxyUrl: localStorage.getItem("aiProxyUrl") || proxyUrl,
    key: localStorage.getItem("openrouterKey") || privateKey,
    model: localStorage.getItem("openrouterModel") || privateModel || defaultModel
  };
}

function setAiStatus(text) {
  aiStatus.textContent = text;
}

function setSpeechStatus(text) {
  const node = $("#speechStatus");
  if (node) node.textContent = text;
}

function restoreAiSettings() {
  const settings = getAiSettings();
  const hasPrivateKey = Boolean(window.JAPANESE_TUTOR_OPENROUTER_KEY);
  const hasProxy = Boolean(settings.proxyUrl);
  $("#aiProxyUrl").value = localStorage.getItem("aiProxyUrl") || window.JAPANESE_TUTOR_AI_PROXY_URL || "";
  $("#openrouterKey").value = localStorage.getItem("openrouterKey") || "";
  $("#openrouterKey").placeholder = hasPrivateKey ? "已从私有配置读取默认 Key" : "sk-or-v1-...";
  if (![...modelSelect.options].some((option) => option.value === settings.model)) {
    modelSelect.add(new Option(settings.model, settings.model));
  }
  modelSelect.value = settings.model;
  if (hasProxy) setAiStatus("已配置 AI 代理");
  else setAiStatus(settings.key ? (hasPrivateKey ? "已读取私有 Key" : "已保存 Key") : "未连接");
}

function saveProgress() {
  localStorage.setItem("learnedPhrases", JSON.stringify([...state.learned]));
  const total = lessons.reduce((sum, lesson) => sum + lesson.phrases.length, 0);
  const pct = Math.round((state.learned.size / total) * 100);
  $("#progressText").textContent = `${pct}%`;
  $("#progressBar").style.width = `${pct}%`;
}

function speak(text) {
  if (!text) return;
  if (!("speechSynthesis" in window)) {
    setSpeechStatus("当前浏览器不支持朗读");
    return;
  }

  speechVoices = speechSynthesis.getVoices();
  const voice =
    speechVoices.find((item) => item.lang && item.lang.toLowerCase().startsWith("ja")) ||
    speechVoices.find((item) => item.name && /japanese|kyoko|otoya|haruka|ichiro/i.test(item.name));

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  if (voice) utterance.voice = voice;
  utterance.rate = 0.82;
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.onstart = () => setSpeechStatus(`正在朗读：${text}`);
  utterance.onend = () => setSpeechStatus("朗读完成");
  utterance.onerror = () => setSpeechStatus("朗读失败，请检查系统声音或浏览器语音权限");

  if (speechSynthesis.paused) speechSynthesis.resume();
  speechSynthesis.cancel();
  setTimeout(() => {
    speechSynthesis.speak(utterance);
    if (!voice) setSpeechStatus("未找到日语语音，正在用默认语音朗读");
  }, 80);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

  vocabGrid.innerHTML = lesson.vocab
    .map(([word, reading, meaning]) => `
      <button class="vocab-card" data-vocab="${word}">
        <span class="vocab-word">${word}</span>
        <span class="vocab-reading">${reading}</span>
        <span class="vocab-meaning">${meaning}</span>
      </button>
    `)
    .join("");

  grammarPanel.innerHTML = `
    <div class="pattern-box">
      <span class="pattern-label">Pattern</span>
      <p class="pattern-text">${lesson.grammar.pattern}</p>
    </div>
    <p class="grammar-note">${lesson.grammar.note}</p>
    <div class="grammar-examples">
      ${lesson.grammar.examples.map((example) => `<p class="grammar-example">${example}</p>`).join("")}
    </div>
  `;

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

function allVocab() {
  return lessons.flatMap((lesson) =>
    lesson.vocab.map(([word, reading, meaning]) => ({
      word,
      reading,
      meaning
    }))
  );
}

function extractJson(text) {
  const trimmed = text.trim();
  if (trimmed.startsWith("{")) return JSON.parse(trimmed);
  const match = trimmed.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("AI 没有返回 JSON。");
  return JSON.parse(match[0]);
}

function normalizeAiLesson(raw) {
  return {
    title: String(raw.title || "AI 随机旅行日语"),
    phrases: Array.isArray(raw.phrases) ? raw.phrases.slice(0, 6) : [],
    vocab: Array.isArray(raw.vocab) ? raw.vocab.slice(0, 10) : [],
    grammar: raw.grammar || {},
    dialog: raw.dialog || {}
  };
}

function pickMany(items, count) {
  return [...items].sort(() => Math.random() - 0.5).slice(0, count);
}

function buildLocalLesson() {
  const scenario = $("#aiScenario").value;
  const level = $("#aiLevel").value;
  const destinations = ["駅", "空港", "ホテル", "レストラン", "薬局", "コンビニ", "新宿", "浅草"];
  const needs = [
    ["水", "みず", "水"], ["地図", "ちず", "地图"], ["薬", "くすり", "药"], ["領収書", "りょうしゅうしょ", "收据"],
    ["おすすめ", "おすすめ", "推荐"], ["席", "せき", "座位"], ["予約", "よやく", "预约"], ["入口", "いりぐち", "入口"],
    ["出口", "でぐち", "出口"], ["現金", "げんきん", "现金"], ["カード", "カード", "银行卡"], ["近く", "ちかく", "附近"]
  ];
  const phraseSeeds = [
    (place) => [`${place}は近いですか`, `${place}は ちかいですか`, `${place} wa chikai desu ka`, `${place}近吗？`, "确认距离，适合问路前先判断是否要坐车。"],
    (place) => [`${place}まで歩けますか`, `${place}まで あるけますか`, `${place} made arukemasu ka`, `可以走到${place}吗？`, "歩けますか = 能走到吗。"],
    (place) => [`${place}に行きたいです`, `${place}に いきたいです`, `${place} ni ikitai desu`, `我想去${place}`, "最稳的目的地表达。"],
    (item) => [`${item[0]}をください`, `${item[1]}を ください`, `${item[1]} o kudasai`, `请给我${item[2]}`, "点餐、购物、求助都能套。"],
    (item) => [`${item[0]}はありますか`, `${item[1]}は ありますか`, `${item[1]} wa arimasu ka`, `有${item[2]}吗？`, "ありますか = 有吗。"],
    (item) => [`${item[0]}はいくらですか`, `${item[1]}は いくらですか`, `${item[1]} wa ikura desu ka`, `${item[2]}多少钱？`, "いくら = 多少钱。"]
  ];

  const places = pickMany(destinations, 3);
  const words = pickMany(needs, 10);
  const phraseArgs = [...places, ...words].sort(() => Math.random() - 0.5);
  const phrases = pickMany(phraseSeeds, 6).map((factory, index) => {
    const value = phraseArgs[index % phraseArgs.length];
    const [jp, kanaText, romaji, zh, tip] = factory(value);
    return { jp, kana: kanaText, romaji, zh, tip };
  });

  const patterns = [
    { pattern: "名詞 は ありますか", note: "询问有没有某物或服务。把名词放在前面即可。", example: "薬はありますか。有药吗？" },
    { pattern: "場所 に 行きたいです", note: "表达想去某个地方。旅行中比完整动词变形更实用。", example: "駅に行きたいです。我想去车站。" },
    { pattern: "名詞 を ください", note: "请求对方给你某物。点餐和购物都很常用。", example: "水をください。请给我水。" },
    { pattern: "場所 まで 歩けますか", note: "询问能不能步行到某地，适合问距离。", example: "ホテルまで歩けますか。可以走到酒店吗？" }
  ];
  const grammar = patterns[Math.floor(Math.random() * patterns.length)];

  const dialogPlace = places[0] || "駅";
  return {
    title: `本地随机：${scenario}（${level}）`,
    phrases,
    vocab: words.map(([word, reading, zh]) => ({ word, reading, zh })),
    grammar,
    dialog: {
      turns: [
        { speaker: "游客", jp: "すみません。", zh: "不好意思。" },
        { speaker: "店员", jp: "はい、どうぞ。", zh: "您好，请说。" },
        { speaker: "游客", jp: `${dialogPlace}に行きたいです。`, zh: `我想去${dialogPlace}。` },
        { speaker: "店员", jp: "まっすぐ行って、右です。", zh: "请直走，然后在右边。" }
      ]
    }
  };
}

function renderAiLesson(data) {
  const phrases = data.phrases
    .map((item) => `
      <article class="phrase-card">
        <div class="jp">${escapeHtml(item.jp || "")}</div>
        <p class="kana">${escapeHtml(item.kana || "")}</p>
        <p class="romaji">${escapeHtml(item.romaji || "")}</p>
        <p class="meaning">${escapeHtml(item.zh || "")}</p>
        <p class="tip">${escapeHtml(item.tip || "")}</p>
        <div class="phrase-actions">
          <button data-ai-speak="${escapeHtml(item.jp || "")}">▶</button>
        </div>
      </article>
    `)
    .join("");

  const vocab = data.vocab
    .map((item) => `
      <button class="ai-chip" data-ai-speak="${escapeHtml(item.word || "")}">
        ${escapeHtml(item.word || "")} · ${escapeHtml(item.reading || "")} · ${escapeHtml(item.zh || "")}
      </button>
    `)
    .join("");

  const dialogTurns = Array.isArray(data.dialog.turns) ? data.dialog.turns : [];
  const dialog = dialogTurns
    .map((turn) => `<p><strong>${escapeHtml(turn.speaker || "A")}：</strong>${escapeHtml(turn.jp || "")}<br>${escapeHtml(turn.zh || "")}</p>`)
    .join("");

  aiResult.innerHTML = `
    <div class="ai-result-grid">
      <div class="ai-block">
        <h3>${escapeHtml(data.title)}</h3>
        <div class="phrase-grid">${phrases}</div>
      </div>
      <div class="ai-block">
        <h3>AI 单词</h3>
        <div class="ai-chip-list">${vocab}</div>
        <h3>AI 语法</h3>
        <div class="pattern-box">
          <span class="pattern-label">Pattern</span>
          <p class="pattern-text">${escapeHtml(data.grammar.pattern || "")}</p>
        </div>
        <p class="grammar-note">${escapeHtml(data.grammar.note || "")}</p>
        <p class="grammar-example">${escapeHtml(data.grammar.example || "")}</p>
        <h3>AI 对话</h3>
        <div class="ai-dialog">${dialog}</div>
      </div>
    </div>
  `;
}

async function callOpenRouter(messages, options = {}) {
  const settings = getAiSettings();
  if (!settings.proxyUrl && !settings.key) throw new Error("请先配置 AI 代理地址，或填写本机 OpenRouter API Key。");

  const endpoint = settings.proxyUrl || "https://openrouter.ai/api/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json"
  };
  if (!settings.proxyUrl) {
    headers.Authorization = `Bearer ${settings.key}`;
    headers["HTTP-Referer"] = window.location.href;
    headers["X-OpenRouter-Title"] = "一周旅行日语交互教程";
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: settings.model,
      messages,
      temperature: options.temperature ?? 0.95,
      max_tokens: options.maxTokens ?? 1400,
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenRouter 请求失败：${response.status} ${detail.slice(0, 160)}`);
  }

  const payload = await response.json();
  return payload.choices?.[0]?.message?.content || "";
}

async function loadFreeModels() {
  setAiStatus("正在加载模型...");
  const response = await fetch("https://openrouter.ai/api/v1/models");
  if (!response.ok) throw new Error("免费模型列表加载失败。");
  const payload = await response.json();
  const freeModels = (payload.data || [])
    .filter((model) => {
      const prompt = Number(model.pricing?.prompt || 0);
      const completion = Number(model.pricing?.completion || 0);
      return model.id?.includes(":free") || (prompt === 0 && completion === 0);
    })
    .sort((a, b) => a.id.localeCompare(b.id));

  if (!freeModels.length) throw new Error("没有找到免费模型，请手动输入 :free 模型名。");
  modelSelect.innerHTML = freeModels
    .map((model) => `<option value="${escapeHtml(model.id)}">${escapeHtml(model.id)}</option>`)
    .join("");
  const saved = localStorage.getItem("openrouterModel");
  modelSelect.value = saved && freeModels.some((model) => model.id === saved) ? saved : freeModels[0].id;
  localStorage.setItem("openrouterModel", modelSelect.value);
  setAiStatus(`已加载 ${freeModels.length} 个免费模型`);
}

async function generateAiLesson() {
  const lesson = lessons[state.day];
  const scenario = $("#aiScenario").value;
  const level = $("#aiLevel").value;
  const settings = getAiSettings();
  if (!settings.proxyUrl && !settings.key) {
    renderAiLesson(buildLocalLesson());
    setAiStatus("本地随机生成完成");
    return;
  }
  setAiStatus("AI 生成中...");
  aiResult.innerHTML = `<p class="empty-state">正在生成 ${escapeHtml(scenario)} 的随机练习...</p>`;

  const prompt = `
请为中文母语、零基础到入门水平的日本旅行者生成一组新的日语学习内容。
当前课程：Day ${state.day + 1}「${lesson.title}」
目标场景：${scenario}
难度：${level}

要求：
1. 内容必须和已有固定短句不同，尽量多元化、贴近日常旅行。
2. 日语要自然、礼貌、短小，适合游客直接说。
3. 返回严格 JSON，不要 Markdown。
4. JSON 结构必须是：
{
  "title": "中文标题",
  "phrases": [
    {"jp":"日语", "kana":"假名读法", "romaji":"罗马音", "zh":"中文意思", "tip":"使用提示"}
  ],
  "vocab": [
    {"word":"日语单词", "reading":"读法", "zh":"中文意思"}
  ],
  "grammar": {"pattern":"句型", "note":"中文解释", "example":"日语例句 + 中文意思"},
  "dialog": {
    "turns": [
      {"speaker":"游客", "jp":"日语", "zh":"中文"},
      {"speaker":"店员", "jp":"日语", "zh":"中文"}
    ]
  }
}
数量：phrases 6 条，vocab 10 个，dialog 4 轮。
`;

  const content = await callOpenRouter([
    { role: "system", content: "你是耐心、准确的日语旅行会话老师。只输出合法 JSON。" },
    { role: "user", content: prompt }
  ]);
  const data = normalizeAiLesson(extractJson(content));
  renderAiLesson(data);
  setAiStatus("生成完成");
}

function makeQuiz() {
  const phrases = allPhrases().map((item) => ({
    prompt: `短句「${item.jp}」是什么意思？`,
    answer: item.meaning,
    pool: allPhrases().map((phrase) => phrase.meaning),
    speak: item.jp
  }));
  const vocabItems = allVocab().map((item) => ({
    prompt: `单词「${item.word}」是什么意思？`,
    answer: item.meaning,
    pool: allVocab().map((word) => word.meaning),
    speak: item.word
  }));
  const grammarItems = lessons.map((lesson) => ({
    prompt: `语法「${lesson.grammar.pattern}」主要表达什么？`,
    answer: lesson.grammar.note.split("。")[0],
    pool: lessons.map((item) => item.grammar.note.split("。")[0]),
    speak: lesson.grammar.examples[0].split("。")[0]
  }));
  const items = [...phrases, ...vocabItems, ...grammarItems];
  const item = items[state.quiz % items.length];
  const choices = [item.answer];
  while (choices.length < 3) {
    const random = item.pool[Math.floor(Math.random() * item.pool.length)];
    if (!choices.includes(random)) choices.push(random);
  }
  choices.sort(() => Math.random() - 0.5);
  $("#quizQuestion").textContent = item.prompt;
  $("#quizChoices").innerHTML = choices
    .map((choice) => `<button data-quiz="${choice}" data-answer="${item.answer}" data-speak-answer="${item.speak}">${choice}</button>`)
    .join("");
  $("#quizFeedback").textContent = "题目会混合考短句、单词和语法用途。";
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
  if (correct) speak(button.dataset.speakAnswer || button.dataset.answer);
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

vocabGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-vocab]");
  if (card) speak(card.dataset.vocab);
});

$("#vocabReview").addEventListener("click", () => {
  const words = lessons[state.day].vocab;
  const [word, reading, meaning] = words[Math.floor(Math.random() * words.length)];
  const pool = allVocab().map((item) => item.meaning).filter((item) => item !== meaning);
  const choices = [meaning];
  while (choices.length < 3) {
    const random = pool[Math.floor(Math.random() * pool.length)];
    if (!choices.includes(random)) choices.push(random);
  }
  choices.sort(() => Math.random() - 0.5);
  $("#quizQuestion").textContent = `复习单词：「${word} / ${reading}」是什么意思？`;
  $("#quizChoices").innerHTML = choices
    .map((choice) => `<button data-quiz="${choice}" data-answer="${meaning}" data-speak-answer="${word}">${choice}</button>`)
    .join("");
  $("#quizFeedback").textContent = "这题来自今天的单词表。";
  speak(word);
});

$("#grammarSpeak").addEventListener("click", () => {
  const example = lessons[state.day].grammar.examples[0].split("。")[0];
  speak(example);
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

$("#saveAiSettings").addEventListener("click", () => {
  const proxyUrl = $("#aiProxyUrl").value.trim();
  const key = $("#openrouterKey").value.trim();
  const model = modelSelect.value.trim() || defaultModel;
  if (proxyUrl) localStorage.setItem("aiProxyUrl", proxyUrl);
  else localStorage.removeItem("aiProxyUrl");
  if (key) localStorage.setItem("openrouterKey", key);
  else localStorage.removeItem("openrouterKey");
  localStorage.setItem("openrouterModel", model);
  setAiStatus(proxyUrl ? "代理设置已保存" : key ? "本机 Key 已保存" : "已清除 AI 设置");
});

modelSelect.addEventListener("change", () => {
  localStorage.setItem("openrouterModel", modelSelect.value);
});

$("#loadFreeModels").addEventListener("click", async () => {
  try {
    await loadFreeModels();
  } catch (error) {
    setAiStatus("模型加载失败");
    aiResult.innerHTML = `<p class="empty-state">${escapeHtml(error.message)}</p>`;
  }
});

$("#generateAiLesson").addEventListener("click", async () => {
  try {
    await generateAiLesson();
  } catch (error) {
    setAiStatus("生成失败");
    aiResult.innerHTML = `<p class="empty-state">${escapeHtml(error.message)}</p>`;
  }
});

aiResult.addEventListener("click", (event) => {
  const button = event.target.closest("[data-ai-speak]");
  if (button) speak(button.dataset.aiSpeak);
});

$("#resetBtn").addEventListener("click", () => {
  state.learned.clear();
  localStorage.removeItem("learnedPhrases");
  renderLesson();
});

window.addEventListener("resize", () => drawScene(lessons[state.day].scene));

if ("speechSynthesis" in window) {
  speechVoices = speechSynthesis.getVoices();
  speechSynthesis.onvoiceschanged = () => {
    speechVoices = speechSynthesis.getVoices();
    const hasJapaneseVoice = speechVoices.some((voice) => voice.lang && voice.lang.toLowerCase().startsWith("ja"));
    setSpeechStatus(hasJapaneseVoice ? "日语朗读已就绪" : "朗读可用，但未检测到日语语音");
  };
} else {
  setSpeechStatus("当前浏览器不支持朗读");
}

renderTabs();
restoreAiSettings();
renderLesson();
renderKana();
makeDialog();
makeQuiz();
