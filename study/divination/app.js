const stems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const elements = {
  甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土", 己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水",
  子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火", 午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水"
};

const modules = [
  {
    id: "wuxing",
    tag: "基础",
    title: "阴阳五行",
    intro: "阴阳看对待，五行看流转。它是大多数命理系统的共同语言：木火土金水不是物品清单，而是生长、发散、承载、收敛、润下的关系模型。",
    input: "事物状态、季节、方位、颜色、性情",
    use: "建立象意词典，理解生克制化",
    goal: "能画出生克图，并解释一个日常现象",
    draw: drawWuxing
  },
  {
    id: "bazi",
    tag: "命盘",
    title: "四柱八字",
    intro: "以出生年月日时对应天干地支，观察日主、月令、十神、五行旺衰和大运流年。入门先读结构，不急着断细节。",
    input: "出生年月日时、出生地、节气校正",
    use: "性格倾向、资源模式、阶段性主题",
    goal: "认识四柱、日主、十神和五行分布",
    draw: drawBaziModule
  },
  {
    id: "iching",
    tag: "占问",
    title: "六十四卦",
    intro: "易占强调问题、时机和变化。六爻从下往上成卦，读卦名、卦辞、爻位、变爻和互卦，适合做决策前的反思框架。",
    input: "一个明确问题、起卦方式、当下时间",
    use: "选择、趋势、关系变化",
    goal: "会用硬币起卦，并写下三句象意",
    draw: drawIchingModule
  },
  {
    id: "ziwei",
    tag: "命盘",
    title: "紫微斗数",
    intro: "以十二宫位和星曜组合讲人生场景。先理解命、兄、夫、子、财、疾、迁、友、官、田、福、父十二宫，再学主星性质。",
    input: "农历生日、时辰、性别",
    use: "人生领域分布、关系与职业主题",
    goal: "背熟十二宫位的含义",
    draw: drawZiweiModule
  },
  {
    id: "qimen",
    tag: "时空",
    title: "奇门遁甲",
    intro: "奇门用九宫、八门、九星、八神描述特定时间的局势。入门只需先练会看宫位、方向、门的行动含义。",
    input: "占问时间、地点、事项",
    use: "行动方位、沟通策略、局势判断",
    goal: "能读九宫格和八门基本象意",
    draw: drawQimenModule
  },
  {
    id: "forms",
    tag: "观察",
    title: "手相面相",
    intro: "它更像观察学：手纹、掌丘、气色、骨相、神态与生活习惯互相参照。学习重点是描述准确，不是单点定论。",
    input: "手掌纹路、面部比例、气色神态",
    use: "观察习惯、状态提醒、沟通线索",
    goal: "能区分观察、推测和结论",
    draw: drawFormsModule
  },
  {
    id: "fengshui",
    tag: "空间",
    title: "风水",
    intro: "风水关注人和空间的关系。先从采光、通风、动线、靠山、明堂和方位开始，传统术语要落到可感知的居住体验。",
    input: "户型、门窗、坐向、用途、动线",
    use: "居住舒适度、专注与休息环境",
    goal: "能画房间动线并提出三条调整",
    draw: drawFengshuiModule
  }
];

const moduleLearning = {
  wuxing: {
    concepts: [
      "阴阳：任何判断都要先看相对关系，如动静、寒热、内外、强弱。",
      "五行：木主生发，火主显明，土主承载，金主收敛，水主流动。",
      "生克制化：相生提供资源，相克提供边界；过旺、过弱都要看平衡。"
    ],
    steps: [
      "先判断对象处在阴还是阳、动还是静、上升还是下降。",
      "把现象归入五行象意，再看它与环境的生克关系。",
      "用一句现实语言翻译象意，例如“水旺”可翻译为信息多、流动快、边界弱。"
    ],
    pitfalls: [
      "不要把五行当成固定物品表，重点是关系和状态。",
      "不要见克就说坏，克也代表规则、管理和成形。",
      "不要只看单一五行，必须看季节、位置和对象。"
    ]
  },
  bazi: {
    concepts: [
      "四柱：年、月、日、时四组干支，分别对应背景、季节、主体和行动出口。",
      "日主：日柱天干，是八字分析的中心参照点。",
      "十神：以日主为中心看其他干支，形成比劫、食伤、财、官杀、印等关系。"
    ],
    steps: [
      "排出四柱，先确认日主和月令，不急着看神煞。",
      "统计五行分布，观察哪类资源多、哪类资源少。",
      "用十神语言翻译现实主题：资源、表达、责任、财富、同伴。"
    ],
    pitfalls: [
      "不做“一个字决定一生”的断语。",
      "正式排盘需要节气，不是简单按农历或公历月份切换。",
      "喜忌需要结合旺衰、格局和运势，入门阶段先练结构观察。"
    ]
  },
  iching: {
    concepts: [
      "本卦：当前问题的结构和主要张力。",
      "动爻：变化发生的位置，常提示需要调整的层次。",
      "变卦：变化后的可能状态，用来观察趋势而非绝对结果。"
    ],
    steps: [
      "把问题写成具体、可复盘的一句话。",
      "起卦后从下往上画六爻，记录阴阳和动爻。",
      "按“卦名第一印象、爻位、现实行动”三步写解释。"
    ],
    pitfalls: [
      "不要连续问同一个问题来追求喜欢的结果。",
      "不要把卦辞机械套用，要回到问题上下文。",
      "不要问无法行动的问题，例如“我命中注定如何”。"
    ]
  },
  ziwei: {
    concepts: [
      "十二宫：把人生分成十二个观察场景，如命宫、财帛、官禄、迁移。",
      "主星：紫微、天府、武曲、天相等星曜代表不同风格。",
      "三方四正：一个宫位要和相关宫位一起看，不能孤立判断。"
    ],
    steps: [
      "先熟悉十二宫各自对应的现实领域。",
      "再看命宫、身宫和三方四正的组合。",
      "最后才学习主星、辅星、四化和大限流年。"
    ],
    pitfalls: [
      "不要只看命宫就评价一个人。",
      "不要把星曜名称按字面理解，例如“破军”不等于一定坏。",
      "不要忽略宫位之间的互相牵动。"
    ]
  },
  qimen: {
    concepts: [
      "九宫：把空间和局势放入九个位置，形成时空棋盘。",
      "八门：开、休、生、伤、杜、景、死、惊，代表行动入口和阻力。",
      "九星八神：补充环境氛围、资源状态和不可见因素。"
    ],
    steps: [
      "先明确事项类型：求财、沟通、出行、学习或项目。",
      "找到与事项相关的门、宫和方向，判断顺逆。",
      "把判断落成行动建议：先做什么、避开什么、何处保守。"
    ],
    pitfalls: [
      "不要把有利方向理解成万能答案。",
      "不要脱离事项类型读八门，同一门在不同问题里含义不同。",
      "不要忽略现实约束，奇门更适合辅助策略选择。"
    ]
  },
  forms: {
    concepts: [
      "手相：掌形、三大主线、掌丘、纹色和手感共同观察。",
      "面相：骨相、五官比例、气色、神态和动态表情共同观察。",
      "观察链：事实描述、可能解释、后续验证三步分开。"
    ],
    steps: [
      "先写可见事实，不急着下判断。",
      "把特征和生活习惯、压力状态、表达方式联系起来。",
      "隔一段时间复看，区分稳定特征和短期状态。"
    ],
    pitfalls: [
      "不要用单一纹路判断寿命、财富或婚姻。",
      "不要把外貌特征变成价值评判。",
      "不要忽略光线、疲劳、年龄和生活习惯的影响。"
    ]
  },
  fengshui: {
    concepts: [
      "气：可以先理解为空气、光线、动线、声音和心理感受的综合。",
      "明堂：前方开阔、可停留、能聚焦的空间感。",
      "靠山：背后稳定支持，落到室内就是座位、床位和墙面的安全感。"
    ],
    steps: [
      "先画户型和门窗，再标出人最常走的路线。",
      "观察采光、通风、噪音、收纳和视线冲突。",
      "提出小调整：移桌、遮挡、补光、清理、改变动线。"
    ],
    pitfalls: [
      "不要只谈方位而忽略居住体验。",
      "不要用摆件替代清洁、通风和合理布局。",
      "不要把风水建议用于制造焦虑，先从可验证的舒适度开始。"
    ]
  }
};

modules.forEach(item => Object.assign(item, moduleLearning[item.id]));

const lessons = [
  {
    title: "阴阳五行与象意词典",
    summary: "先学共同语言。把阴阳理解为相对关系，把五行理解为运动阶段，建立自己的象意卡片。",
    know: ["阴阳：动静、内外、显隐、寒热", "五行相生：木火土金水循环", "五行相克：约束不是破坏，而是形成边界"],
    practice: ["观察今天的天气、情绪和工作状态，用五行各写一个词", "画一张生克图，给每个元素配一个生活例子"]
  },
  {
    title: "天干地支与四柱八字",
    summary: "认识十天干、十二地支、六十甲子和四柱结构。今天只做排盘入门，不做复杂断语。",
    know: ["天干偏外显，地支偏内藏", "日干常被称为日主，是读盘中心", "月令代表季节气势，影响五行强弱"],
    practice: ["用练习台生成一个教学盘", "写下五行最强和最弱的两个观察"]
  },
  {
    title: "六十四卦与问题设计",
    summary: "易占的第一课不是背卦辞，而是提出清楚的问题。问题越具体，复盘越有价值。",
    know: ["六爻从下往上画", "阳爻为连续线，阴爻为断线", "本卦看当前结构，变爻看变化方向"],
    practice: ["用三枚硬币起一卦", "把结果写成：现状、提醒、下一步三句话"]
  },
  {
    title: "紫微斗数十二宫",
    summary: "紫微像一张人生场景地图。先熟悉十二宫，不急着背大量星曜组合。",
    know: ["命宫看核心气质和自我风格", "财帛、官禄、迁移常用于工作与资源分析", "宫位之间要互相参照"],
    practice: ["选择三个宫位，写下它们对应的现实问题", "把一个近期困扰放进对应宫位"]
  },
  {
    title: "奇门遁甲九宫与八门",
    summary: "奇门适合练习局势感。入门阶段只需要知道九宫方位和门的行动倾向。",
    know: ["开、休、生多偏顺势", "伤、杜、惊、死需谨慎读", "同一门在不同事项里含义会变化"],
    practice: ["选择一个日常场景换一局", "写下有利方向、阻力点和一个保守行动"]
  },
  {
    title: "手相面相与观察边界",
    summary: "今天训练观察语言。先描述事实，再提出假设，最后等待验证。",
    know: ["手相看纹路、掌形、掌丘和气色", "面相看比例、气色、神态和动态表情", "单一特征不能直接推出命运结论"],
    practice: ["选择一个观察点，写三条不带评判的描述", "把描述和生活习惯联系起来"]
  },
  {
    title: "风水、整合与复盘",
    summary: "最后把术数变成一套日常记录法。任何判断都要留下上下文、解释路径和后续验证。",
    know: ["风水先看光、风、水、路、用途", "占卜结果要记录问题和时间", "学习重点是提高观察与决策质量"],
    practice: ["画一张房间动线图", "整理本周最有用的五个概念"]
  }
];

const lessonExtras = [
  {
    reading: ["阴阳不是好坏，而是相对属性：白天相对为阳，夜晚相对为阴。", "五行象意可从季节理解：春木、夏火、长夏土、秋金、冬水。", "生克关系用于描述系统如何维持平衡。"],
    check: ["为什么“相克”不一定是坏事？", "你能把今天的一个事件翻译成五行语言吗？", "五行和颜色、方位、情绪之间为什么只是象意关联？"]
  },
  {
    reading: ["十天干分阴阳五行：甲乙木、丙丁火、戊己土、庚辛金、壬癸水。", "十二地支既代表时辰，也代表月份、方位和藏干。", "六十甲子来自天干地支依序组合，是传统历法和术数的基础。"],
    check: ["四柱分别是哪四柱？", "日主为什么是读盘中心？", "为什么正式八字不能只按公历月份判断月柱？"]
  },
  {
    reading: ["八卦为乾、坤、震、巽、坎、离、艮、兑。", "六十四卦由上下两个三爻卦组合而成。", "好的占问通常聚焦一个近期、可行动、可复盘的问题。"],
    check: ["阳爻和阴爻怎么画？", "动爻提示什么？", "把“我会不会成功”改写成一个更好的问题。"]
  },
  {
    reading: ["十二宫不是十二个孤岛，而是相互牵动的人生领域。", "命宫看自我风格，官禄看职业角色，财帛看资源方式。", "紫微学习顺序宜为宫位、主星、三方四正、四化。"],
    check: ["命宫和官禄宫有什么区别？", "为什么不能只看一个宫位？", "你最近的一个问题更像落在哪个宫位？"]
  },
  {
    reading: ["九宫来自洛书结构，中宫统摄，其余八宫对应方向。", "八门可以先记成行动入口：开门开通，休门休整，生门生发。", "奇门局要结合事项，不能只按吉凶标签读。"],
    check: ["开、休、生三门为什么常被视为顺势？", "同一门为什么在不同问题里会变义？", "把一个项目问题拆成方向、阻力、行动三项。"]
  },
  {
    reading: ["手相三大主线常指生命线、智慧线、感情线。", "面相观察应包含动态神态，不只看静态五官。", "观察语言要避免把人固定成标签。"],
    check: ["事实、推测、结论有什么区别？", "为什么线长短不能直接等于寿命长短？", "如何写一句不带评判的观察？"]
  },
  {
    reading: ["风水入门先看可感知因素：光、风、水、路、声、洁净度。", "桌椅床位的安全感常来自背后稳定和前方开阔。", "复盘表应记录时间、问题、术数、结果、解释和验证。"],
    check: ["明堂和靠山如何翻译成现代空间语言？", "一个房间最先应该检查哪三件事？", "本周你最想继续深入哪一门？"]
  }
];

lessons.forEach((lesson, index) => Object.assign(lesson, lessonExtras[index]));

const terms = [
  ["阴阳", "描述相对关系的基本框架，如动静、内外、明暗、寒热。入门要避免把阴阳理解成绝对好坏。", "基础"],
  ["五行", "木火土金水五种象意系统，用来描述生发、显明、承载、收敛、流动等状态。", "基础"],
  ["天干", "甲乙丙丁戊己庚辛壬癸，常用于表示外显、主动、天时层面的五行气。", "四柱八字"],
  ["地支", "子丑寅卯辰巳午未申酉戌亥，常用于表示月份、时辰、方位和内藏信息。", "四柱八字"],
  ["日主", "八字日柱的天干，是分析十神和五行关系的中心参照。", "四柱八字"],
  ["十神", "以日主为中心形成的关系语言，包括比劫、食伤、财、官杀、印。", "四柱八字"],
  ["月令", "出生月份对应的季节气势，是判断五行旺衰的重要依据。", "四柱八字"],
  ["本卦", "起卦得到的原始卦象，用来看当前问题结构。", "六十四卦"],
  ["动爻", "起卦时发生变化的爻，提示变化位置和需要特别关注的层次。", "六十四卦"],
  ["变卦", "动爻阴阳变化后形成的卦，用来观察变化趋势。", "六十四卦"],
  ["命宫", "紫微斗数十二宫之一，观察核心气质、自我风格和人生底色。", "紫微斗数"],
  ["三方四正", "紫微斗数中一个宫位与相关宫位构成的参照网络，避免孤立读宫。", "紫微斗数"],
  ["八门", "奇门遁甲的行动象意：开、休、生、伤、杜、景、死、惊。", "奇门遁甲"],
  ["九宫", "奇门和风水常用的空间结构，把方位、时间和事项放入九格观察。", "奇门遁甲"],
  ["掌丘", "手掌隆起区域，不同掌丘常被联想到行动力、情感、审美、沟通等倾向。", "手相面相"],
  ["气色", "面部或手掌呈现的短期状态，常受睡眠、压力、饮食和情绪影响。", "手相面相"],
  ["明堂", "风水中前方开阔、聚气、可停留的空间感，现代可理解为视野和缓冲区。", "风水"],
  ["靠山", "背后稳定支持的格局，现代室内可理解为座位或床位背后的安全感。", "风水"]
];

const cases = [
  {
    category: "占问设计",
    title: "如何提出一个好问题",
    intro: "初学占卜最容易输在问题上。好问题应该具体、近期、和自己行动有关，并且方便之后复盘。",
    steps: ["差问题：我以后会不会发财？", "好问题：接下来三个月，我是否适合把副业预算提高到每月 2000 元？", "解释时写下：当前条件、最大阻力、下一步行动。"]
  },
  {
    category: "八字入门",
    title: "先看日主，再看资源结构",
    intro: "八字初学不要急着找神煞。先把日主、月令、五行分布和十神关系看清楚。",
    steps: ["日主回答“以谁为中心看关系”。", "月令回答“出生季节给了哪种气势”。", "五行分布回答“资源、表达、约束是否偏多或偏少”。"]
  },
  {
    category: "易卦解读",
    title: "把卦象翻译成三句话",
    intro: "起卦后不要急着背诵整段卦辞。先用三句话把卦落地到现实。",
    steps: ["现状：这个卦像在描述什么结构？", "提醒：动爻提示哪一层正在变化？", "行动：我可以做一个什么小调整？"]
  },
  {
    category: "风水观察",
    title: "一个书桌位怎么判断",
    intro: "现代风水入门可以先看体验：是否安稳、明亮、通风、少干扰。",
    steps: ["背后是否有稳定支撑，还是门窗过道直冲？", "前方是否开阔，还是堆满杂物造成压迫？", "光线是否舒服，是否能支持长时间专注？"]
  }
];

const hexagrams = [
  "乾为天", "坤为地", "水雷屯", "山水蒙", "水天需", "天水讼", "地水师", "水地比",
  "风天小畜", "天泽履", "地天泰", "天地否", "天火同人", "火天大有", "地山谦", "雷地豫",
  "泽雷随", "山风蛊", "地泽临", "风地观", "火雷噬嗑", "山火贲", "山地剥", "地雷复",
  "天雷无妄", "山天大畜", "山雷颐", "泽风大过", "坎为水", "离为火", "泽山咸", "雷风恒",
  "天山遁", "雷天大壮", "火地晋", "地火明夷", "风火家人", "火泽睽", "水山蹇", "雷水解",
  "山泽损", "风雷益", "泽天夬", "天风姤", "泽地萃", "地风升", "泽水困", "水风井",
  "泽火革", "火风鼎", "震为雷", "艮为山", "风山渐", "雷泽归妹", "雷火丰", "火山旅",
  "巽为风", "兑为泽", "风水涣", "水泽节", "风泽中孚", "雷山小过", "水火既济", "火水未济"
];

const palaceData = [
  ["命宫", "核心气质、自我风格、人生底色。先问：我通常如何回应世界？"],
  ["兄弟", "同辈、合作、竞争和手足关系。先看互动模式。"],
  ["夫妻", "亲密关系、承诺方式、伴侣画像。避免只看单宫下结论。"],
  ["子女", "创造物、晚辈、表达延续。也可观察作品和项目。"],
  ["财帛", "资源、收入方式、花钱习惯。重点是流入与流出。"],
  ["疾厄", "身心状态、压力反应。健康问题请咨询专业人士。"],
  ["迁移", "外部环境、出行、跨圈机会。看离开熟悉环境后的表现。"],
  ["交友", "朋友、团队、下属和协作网络。"],
  ["官禄", "职业角色、责任、成就路径。"],
  ["田宅", "居住、资产、家庭空间和安全感。"],
  ["福德", "精神满足、休息方式、内在余裕。"],
  ["父母", "长辈、制度、文书、支持来源。"]
];

const formChoices = [
  ["生命线", "观察体力、生活节奏和安全感。线长短不等于寿命长短。"],
  ["智慧线", "观察思考方式、专注和判断风格。"],
  ["感情线", "观察情绪表达、关系期待和敏感点。"],
  ["掌丘", "观察掌肉饱满处，联想行动力、审美、沟通和稳定感。"],
  ["眉眼", "观察精神状态和表达强弱，先描述神态，不贴标签。"],
  ["气色", "观察睡眠、压力、饮食后的短期变化。"]
];

let activeModule = 0;
let activeLesson = 0;
let activeCase = 0;
let completedLessons = new Set(JSON.parse(localStorage.getItem("divinationDone") || "[]"));
let currentHexLines = [1, 0, 1, 0, 1, 0];
let qimenSeed = 0;

function roughCanvas(canvas) {
  if (!window.rough) {
    const ctx = canvas.getContext("2d");
    return {
      circle: (x, y, d) => ctx.strokeRect(x - d / 2, y - d / 2, d, d),
      ellipse: (x, y, w, h) => { ctx.beginPath(); ctx.ellipse(x, y, w / 2, h / 2, 0, 0, Math.PI * 2); ctx.stroke(); },
      rectangle: (x, y, w, h) => ctx.strokeRect(x, y, w, h),
      line: (x1, y1, x2, y2) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); },
      arc: (x, y, w, h, start, stop) => { ctx.beginPath(); ctx.ellipse(x, y, w / 2, h / 2, 0, start, stop); ctx.stroke(); },
      path: () => {}
    };
  }
  return rough.canvas(canvas);
}

function clear(canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fffdf8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function text(canvas, value, x, y, size = 18, color = "#1c1c1a", align = "center") {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.font = `700 ${size}px system-ui, sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(value, x, y);
}

function initHero() {
  const canvas = document.getElementById("heroCanvas");
  const resize = () => {
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    drawHero(canvas, ctx);
  };
  window.addEventListener("resize", resize);
  resize();
  const focus = lessons[new Date().getDay() % lessons.length].title.split("与")[0];
  document.getElementById("todayFocus").textContent = focus;
}

function drawHero(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  if (!window.rough) return;
  const rc = rough.canvas(canvas);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  rc.circle(w * 0.68, h * 0.42, Math.min(w, h) * 0.74, { stroke: "#c7b98f", strokeWidth: 2, roughness: 1.8, fill: "rgba(255,255,255,0.28)", fillStyle: "hachure" });
  rc.circle(w * 0.68, h * 0.42, Math.min(w, h) * 0.42, { stroke: "#a5422e", strokeWidth: 1.5, roughness: 1.2 });
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI * 2 * i) / 8 - Math.PI / 2;
    const x = w * 0.68 + Math.cos(a) * Math.min(w, h) * 0.31;
    const y = h * 0.42 + Math.sin(a) * Math.min(w, h) * 0.31;
    rc.line(w * 0.68, h * 0.42, x, y, { stroke: i % 2 ? "#1e6f68" : "#b98223", strokeWidth: 1.6, roughness: 1.5 });
  }
  rc.path(`M ${w * 0.08} ${h * 0.78} C ${w * 0.24} ${h * 0.63}, ${w * 0.38} ${h * 0.87}, ${w * 0.56} ${h * 0.72} S ${w * 0.86} ${h * 0.66}, ${w * 0.96} ${h * 0.82}`, { stroke: "#59764a", strokeWidth: 2, roughness: 2.4 });
}

function renderModules() {
  const list = document.getElementById("moduleList");
  list.innerHTML = modules.map((item, index) => `
    <button class="module-item ${index === activeModule ? "active" : ""}" type="button" data-module="${index}">
      <strong>${item.title}</strong>
      <span>${item.tag} · ${item.use}</span>
    </button>
  `).join("");
  list.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      activeModule = Number(button.dataset.module);
      renderModules();
      renderModuleDetail();
    });
  });
}

function renderModuleDetail() {
  const item = modules[activeModule];
  document.getElementById("moduleTag").textContent = item.tag;
  document.getElementById("moduleTitle").textContent = item.title;
  document.getElementById("moduleIntro").textContent = item.intro;
  document.getElementById("moduleInput").textContent = item.input;
  document.getElementById("moduleUse").textContent = item.use;
  document.getElementById("moduleGoal").textContent = item.goal;
  document.getElementById("moduleConcepts").innerHTML = item.concepts.map(value => `<li>${value}</li>`).join("");
  document.getElementById("moduleSteps").innerHTML = item.steps.map(value => `<li>${value}</li>`).join("");
  document.getElementById("modulePitfalls").innerHTML = item.pitfalls.map(value => `<li>${value}</li>`).join("");
  item.draw(document.getElementById("moduleCanvas"));
}

function renderTerms(filter = "") {
  const keyword = filter.trim().toLowerCase();
  const visibleTerms = terms.filter(([name, body, group]) => {
    const textValue = `${name} ${body} ${group}`.toLowerCase();
    return !keyword || textValue.includes(keyword);
  });
  document.getElementById("termList").innerHTML = visibleTerms.length ? visibleTerms.map(([name, body, group]) => `
    <article class="term-card">
      <small>${group}</small>
      <h4>${name}</h4>
      <p>${body}</p>
    </article>
  `).join("") : `<div class="result-box">没有找到相关术语。可以换一个关键词，比如“五行”“动爻”“命宫”。</div>`;
}

function renderCase() {
  const item = cases[activeCase];
  document.getElementById("caseCategory").textContent = item.category;
  document.getElementById("caseTitle").textContent = item.title;
  document.getElementById("caseIntro").textContent = item.intro;
  document.getElementById("caseSteps").innerHTML = item.steps.map((step, index) => `
    <div class="case-step">
      <span>${index + 1}</span>
      <p>${step}</p>
    </div>
  `).join("");
}

function setupLibrary() {
  document.getElementById("termSearch").addEventListener("input", event => renderTerms(event.target.value));
  document.getElementById("nextCase").addEventListener("click", () => {
    activeCase = (activeCase + 1) % cases.length;
    renderCase();
  });
  renderTerms();
  renderCase();
}

function drawWuxing(canvas) {
  clear(canvas);
  const rc = roughCanvas(canvas);
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const names = ["木", "火", "土", "金", "水"];
  const colors = ["#59764a", "#a5422e", "#b98223", "#8b8f8d", "#1e6f68"];
  const points = names.map((_, i) => {
    const a = -Math.PI / 2 + i * Math.PI * 2 / 5;
    return [cx + Math.cos(a) * 122, cy + Math.sin(a) * 122];
  });
  points.forEach(([x, y], i) => {
    rc.circle(x, y, 74, { stroke: colors[i], fill: colors[i], fillStyle: "hachure", fillWeight: 1.4, hachureGap: 8 });
    text(canvas, names[i], x, y, 26, "#1c1c1a");
  });
  points.forEach(([x, y], i) => {
    const [nx, ny] = points[(i + 1) % 5];
    rc.line(x, y, nx, ny, { stroke: "#1e6f68", strokeWidth: 2 });
  });
  [[0, 2], [2, 4], [4, 1], [1, 3], [3, 0]].forEach(([a, b]) => {
    rc.line(points[a][0], points[a][1], points[b][0], points[b][1], { stroke: "#a5422e", strokeWidth: 1.4, strokeLineDash: [8, 6] });
  });
  text(canvas, "实线相生，虚线相克", cx, 326, 16, "#5d615e");
}

function drawBaziModule(canvas) {
  clear(canvas);
  const rc = roughCanvas(canvas);
  const labels = ["年柱", "月柱", "日柱", "时柱"];
  labels.forEach((label, i) => {
    const x = 98 + i * 185;
    rc.rectangle(x - 58, 74, 116, 190, { stroke: "#1c1c1a", fill: "#fbf8ef", fillStyle: "solid" });
    text(canvas, label, x, 48, 18, "#a5422e");
    text(canvas, stems[i * 2], x, 130, 34);
    text(canvas, branches[i * 2 + 2], x, 206, 34);
  });
  text(canvas, "四柱 = 年、月、日、时；日干是读盘中心", canvas.width / 2, 318, 16, "#5d615e");
}

function drawIchingModule(canvas) {
  clear(canvas);
  drawHexagramLines(canvas, [1, 1, 1, 0, 0, 0], "泰卦示例");
}

function drawZiweiModule(canvas) {
  clear(canvas);
  drawPalaceGrid(canvas, 0);
}

function drawQimenModule(canvas) {
  clear(canvas);
  drawQimenGrid(canvas, "meeting", 0);
}

function drawFormsModule(canvas) {
  clear(canvas);
  drawPalmFace(canvas, "生命线");
}

function drawFengshuiModule(canvas) {
  clear(canvas);
  drawRoom(canvas, 0);
}

function renderLessons() {
  const tabs = document.getElementById("dayTabs");
  tabs.innerHTML = lessons.map((lesson, index) => `
    <button class="day-tab ${index === activeLesson ? "active" : ""} ${completedLessons.has(index) ? "done" : ""}" type="button" data-day="${index}">
      <span>Day ${index + 1}</span>
      <strong>${lesson.title.slice(0, 8)}</strong>
    </button>
  `).join("");
  tabs.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      activeLesson = Number(button.dataset.day);
      renderLessons();
      renderLessonDetail();
    });
  });
}

function renderLessonDetail() {
  const lesson = lessons[activeLesson];
  document.getElementById("lessonDay").textContent = `Day ${activeLesson + 1}`;
  document.getElementById("lessonTitle").textContent = lesson.title;
  document.getElementById("lessonSummary").textContent = lesson.summary;
  document.getElementById("lessonKnow").innerHTML = lesson.know.map(item => `<li>${item}</li>`).join("");
  document.getElementById("lessonPractice").innerHTML = lesson.practice.map(item => `<li>${item}</li>`).join("");
  document.getElementById("lessonReading").innerHTML = lesson.reading.map(item => `<li>${item}</li>`).join("");
  document.getElementById("lessonCheck").innerHTML = lesson.check.map(item => `<li>${item}</li>`).join("");
  document.getElementById("lessonReflection").value = localStorage.getItem(`lessonNote-${activeLesson}`) || "";
}

function setupLessons() {
  document.getElementById("completeLesson").addEventListener("click", () => {
    completedLessons.add(activeLesson);
    localStorage.setItem("divinationDone", JSON.stringify([...completedLessons]));
    renderLessons();
  });
  document.getElementById("lessonReflection").addEventListener("input", event => {
    localStorage.setItem(`lessonNote-${activeLesson}`, event.target.value);
  });
}

function setupPracticeTabs() {
  document.querySelectorAll(".practice-tabs .tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".practice-tabs .tab").forEach(item => item.classList.remove("active"));
      document.querySelectorAll(".practice-panel").forEach(item => item.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(`${tab.dataset.practice}Panel`).classList.add("active");
    });
  });
}

function lineToNumber(lines) {
  return lines.reduce((sum, line, index) => sum + (line ? 2 ** index : 0), 0);
}

function drawHexagramLines(canvas, lines, caption) {
  clear(canvas);
  const rc = roughCanvas(canvas);
  const cx = canvas.width / 2;
  const top = 76;
  for (let i = 0; i < 6; i++) {
    const y = top + (5 - i) * 44;
    if (lines[i]) {
      rc.line(cx - 120, y, cx + 120, y, { stroke: "#1c1c1a", strokeWidth: 8, roughness: 1.2 });
    } else {
      rc.line(cx - 120, y, cx - 28, y, { stroke: "#1c1c1a", strokeWidth: 8, roughness: 1.2 });
      rc.line(cx + 28, y, cx + 120, y, { stroke: "#1c1c1a", strokeWidth: 8, roughness: 1.2 });
    }
    text(canvas, `${i + 1}`, cx - 158, y, 14, "#b98223");
  }
  rc.rectangle(cx - 170, top - 32, 340, 306, { stroke: "#d5cbb5", roughness: 2 });
  text(canvas, caption, cx, 354, 20, "#a5422e");
}

function castHexagram() {
  const throws = Array.from({ length: 6 }, () => {
    const coins = [0, 0, 0].map(() => Math.random() > 0.5 ? 3 : 2);
    const sum = coins.reduce((a, b) => a + b, 0);
    return { sum, yang: sum === 7 || sum === 9, changing: sum === 6 || sum === 9 };
  });
  currentHexLines = throws.map(item => item.yang ? 1 : 0);
  const index = lineToNumber(currentHexLines) % 64;
  const changing = throws.map((item, index) => item.changing ? index + 1 : null).filter(Boolean);
  const question = document.getElementById("questionInput").value.trim() || "未填写问题";
  document.getElementById("hexagramResult").innerHTML = `
    <strong>${hexagrams[index]}</strong><br>
    问题：${question}<br>
    动爻：${changing.length ? changing.join("、") : "无明显动爻"}。<br>
    学习读法：先看卦名给你的第一印象，再把六爻当成从基础到结果的六个层次。今天只写三句：现状、提醒、下一步。
  `;
  drawHexagramLines(document.getElementById("hexagramCanvas"), currentHexLines, hexagrams[index]);
}

function ganzhi(index) {
  return stems[((index % 10) + 10) % 10] + branches[((index % 12) + 12) % 12];
}

function calcBazi() {
  const dateValue = document.getElementById("birthDate").value;
  const hour = Number(document.getElementById("birthHour").value || 0);
  const date = new Date(`${dateValue}T${String(hour).padStart(2, "0")}:00:00`);
  if (Number.isNaN(date.getTime())) return;
  const year = date.getFullYear();
  const yearPillar = ganzhi(year - 1984);
  const monthPillar = ganzhi((year - 1984) * 12 + date.getMonth() + 2);
  const base = new Date("1900-01-31T00:00:00");
  const dayIndex = Math.floor((date - base) / 86400000) + 40;
  const dayPillar = ganzhi(dayIndex);
  const hourBranchIndex = Math.floor(((hour + 1) % 24) / 2);
  const hourPillar = stems[(dayIndex * 2 + hourBranchIndex) % 10] + branches[hourBranchIndex];
  const pillars = [yearPillar, monthPillar, dayPillar, hourPillar];
  const counts = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  pillars.join("").split("").forEach(char => {
    if (elements[char]) counts[elements[char]] += 1;
  });
  const strongest = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  document.getElementById("baziResult").innerHTML = `
    <strong>${pillars.join("　")}</strong><br>
    日主：${dayPillar[0]}${elements[dayPillar[0]]}。五行计数：${Object.entries(counts).map(([k, v]) => `${k}${v}`).join("、")}。<br>
    学习读法：先观察日主和季节，再看哪一行偏多。当前教学盘显示“${strongest}”最显眼，可把它当作本次练习的主题。
  `;
  drawBaziPractice(document.getElementById("baziCanvas"), pillars, counts);
}

function drawBaziPractice(canvas, pillars, counts) {
  clear(canvas);
  const rc = roughCanvas(canvas);
  pillars.forEach((pillar, index) => {
    const x = 88 + index * 128;
    rc.rectangle(x - 42, 58, 84, 150, { stroke: "#1c1c1a", fill: "#fbf8ef", fillStyle: "solid" });
    text(canvas, ["年", "月", "日", "时"][index], x, 34, 18, index === 2 ? "#a5422e" : "#5d615e");
    text(canvas, pillar[0], x, 110, 30);
    text(canvas, pillar[1], x, 168, 30);
  });
  const max = Math.max(...Object.values(counts), 1);
  Object.entries(counts).forEach(([name, count], index) => {
    const x = 70 + index * 100;
    const h = 24 + (count / max) * 100;
    rc.rectangle(x, 350 - h, 46, h, { stroke: "#1e6f68", fill: "#dcefe9", fillStyle: "hachure" });
    text(canvas, name, x + 23, 374, 18);
    text(canvas, String(count), x + 23, 326 - h, 16, "#a5422e");
  });
}

function drawPalaceGrid(canvas, active) {
  clear(canvas);
  const rc = roughCanvas(canvas);
  const startX = 78;
  const startY = 42;
  const size = 102;
  palaceData.forEach(([name], index) => {
    const pos = palacePosition(index);
    const x = startX + pos[0] * size;
    const y = startY + pos[1] * size;
    rc.rectangle(x, y, size, size, { stroke: index === active ? "#a5422e" : "#1c1c1a", strokeWidth: index === active ? 2.6 : 1.2, fill: index === active ? "#fff1e6" : "#fffdf8", fillStyle: "solid" });
    text(canvas, name, x + size / 2, y + size / 2, 17, index === active ? "#a5422e" : "#1c1c1a");
  });
  text(canvas, "十二宫顺序练习", canvas.width / 2, 386, 16, "#5d615e");
}

function palacePosition(index) {
  const positions = [[1, 2], [0, 2], [0, 1], [0, 0], [1, 0], [2, 0], [3, 0], [3, 1], [3, 2], [3, 3], [2, 3], [1, 3]];
  return positions[index];
}

function updateZiwei() {
  const index = Number(document.getElementById("palaceRange").value);
  const [name, intro] = palaceData[index];
  document.getElementById("palaceName").textContent = name;
  document.getElementById("ziweiResult").innerHTML = `<strong>${name}</strong><br>${intro}<br>练习：把最近一个具体问题放入这个宫位，再想它会牵动哪两个相邻领域。`;
  drawPalaceGrid(document.getElementById("ziweiCanvas"), index);
}

function drawQimenGrid(canvas, scenario, seed) {
  clear(canvas);
  const rc = roughCanvas(canvas);
  const doors = ["开门", "休门", "生门", "伤门", "杜门", "景门", "死门", "惊门", "中宫"];
  const stars = ["天心", "天蓬", "天任", "天冲", "天辅", "天英", "天芮", "天柱", "天禽"];
  const startX = 88;
  const startY = 48;
  const size = 118;
  for (let i = 0; i < 9; i++) {
    const x = startX + (i % 3) * size;
    const y = startY + Math.floor(i / 3) * size;
    const value = (i + seed) % 9;
    const good = ["开门", "休门", "生门"].includes(doors[value]);
    rc.rectangle(x, y, size, size, { stroke: good ? "#1e6f68" : "#1c1c1a", fill: good ? "#eef8f5" : "#fffdf8", fillStyle: "solid" });
    text(canvas, doors[value], x + size / 2, y + 44, 19, good ? "#1e6f68" : "#1c1c1a");
    text(canvas, stars[(value + 2) % 9], x + size / 2, y + 78, 15, "#b98223");
  }
  text(canvas, scenarioLabel(scenario), canvas.width / 2, 394, 16, "#5d615e");
}

function scenarioLabel(value) {
  return { meeting: "沟通会议：先找开门、生门、休门", travel: "短途出行：看方向与阻滞", study: "学习备考：看专注与节奏", project: "项目推进：看资源与风险" }[value];
}

function updateQimen() {
  const scenario = document.getElementById("qimenScenario").value;
  qimenSeed = (qimenSeed + 1) % 9;
  document.getElementById("qimenResult").innerHTML = `
    <strong>${scenarioLabel(scenario)}</strong><br>
    学习读法：绿色宫位代表较顺的行动入口。选一个方向作为“先做的小动作”，再选一个非绿色宫位写下需要防范的沟通或时间成本。
  `;
  drawQimenGrid(document.getElementById("qimenCanvas"), scenario, qimenSeed);
}

function drawPalmFace(canvas, focus) {
  clear(canvas);
  const rc = roughCanvas(canvas);
  rc.ellipse(170, 210, 160, 235, { stroke: "#1c1c1a", fill: "#fff6ed", fillStyle: "hachure" });
  rc.line(118, 168, 220, 248, { stroke: focus === "生命线" ? "#a5422e" : "#1c1c1a", strokeWidth: focus === "生命线" ? 4 : 2 });
  rc.line(104, 218, 230, 206, { stroke: focus === "智慧线" ? "#a5422e" : "#1c1c1a", strokeWidth: focus === "智慧线" ? 4 : 2 });
  rc.line(112, 146, 230, 156, { stroke: focus === "感情线" ? "#a5422e" : "#1c1c1a", strokeWidth: focus === "感情线" ? 4 : 2 });
  rc.circle(198, 258, 44, { stroke: focus === "掌丘" ? "#a5422e" : "#b98223", strokeWidth: focus === "掌丘" ? 3 : 1.4 });
  rc.ellipse(392, 196, 150, 190, { stroke: "#1c1c1a", fill: "#fffdf8", fillStyle: "hachure" });
  rc.arc(350, 174, 52, 20, Math.PI, 0, false, { stroke: focus === "眉眼" ? "#a5422e" : "#1c1c1a", strokeWidth: focus === "眉眼" ? 4 : 2 });
  rc.arc(434, 174, 52, 20, Math.PI, 0, false, { stroke: focus === "眉眼" ? "#a5422e" : "#1c1c1a", strokeWidth: focus === "眉眼" ? 4 : 2 });
  rc.circle(392, 230, 54, { stroke: focus === "气色" ? "#a5422e" : "#d5cbb5", strokeWidth: focus === "气色" ? 3 : 1.2 });
  text(canvas, "手", 170, 350, 18, "#5d615e");
  text(canvas, "面", 392, 350, 18, "#5d615e");
}

function setupForms() {
  const grid = document.getElementById("formsChoices");
  grid.innerHTML = formChoices.map(([name]) => `<button type="button" data-form="${name}">${name}</button>`).join("");
  grid.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      const item = formChoices.find(([name]) => name === button.dataset.form);
      document.getElementById("formsResult").innerHTML = `<strong>${item[0]}</strong><br>${item[1]}<br>练习：先写三个肉眼可见的事实，再写一个可能的生活原因。`;
      drawPalmFace(document.getElementById("formsCanvas"), item[0]);
    });
  });
}

function drawRoom(canvas, degree) {
  clear(canvas);
  const rc = roughCanvas(canvas);
  rc.rectangle(86, 62, 370, 260, { stroke: "#1c1c1a", strokeWidth: 2, fill: "#fffdf8", fillStyle: "solid" });
  rc.rectangle(86, 246, 16, 76, { stroke: "#a5422e", fill: "#fff1e6", fillStyle: "solid" });
  rc.rectangle(250, 62, 120, 12, { stroke: "#1e6f68", fill: "#dcefe9", fillStyle: "solid" });
  rc.rectangle(128, 94, 120, 68, { stroke: "#59764a", fill: "#edf4e7", fillStyle: "hachure" });
  rc.rectangle(302, 204, 110, 80, { stroke: "#b98223", fill: "#fff6db", fillStyle: "hachure" });
  rc.path("M 106 284 C 164 256, 214 224, 332 240", { stroke: "#a5422e", strokeWidth: 2.2, strokeLineDash: [7, 7] });
  const cx = 470;
  const cy = 92;
  rc.circle(cx, cy, 78, { stroke: "#1c1c1a" });
  const angle = (degree - 90) * Math.PI / 180;
  rc.line(cx, cy, cx + Math.cos(angle) * 34, cy + Math.sin(angle) * 34, { stroke: "#a5422e", strokeWidth: 3 });
  text(canvas, "北", cx, cy - 54, 14, "#5d615e");
  text(canvas, "门", 122, 292, 15, "#a5422e");
  text(canvas, "窗", 310, 90, 15, "#1e6f68");
  text(canvas, "桌", 188, 128, 18, "#59764a");
  text(canvas, "床", 358, 244, 18, "#b98223");
}

function updateFengshui() {
  const degree = Number(document.getElementById("compassRange").value);
  document.getElementById("compassDegree").textContent = `${degree}°`;
  const advice = degree < 90 ? "先检查入口是否直冲工作位，给视线一点缓冲。" : degree < 180 ? "南向偏明亮，注意休息区避免过强刺激。" : degree < 270 ? "西向关注傍晚光线和热量，桌面保持清爽。" : "北向重在保暖和照明，用稳定光源补足精神感。";
  document.getElementById("fengshuiResult").innerHTML = `<strong>空间观察</strong><br>${advice}<br>练习：写下门、窗、桌、床之间最顺的一条动线，以及最容易分心的一处。`;
  drawRoom(document.getElementById("fengshuiCanvas"), degree);
}

function setupNotes() {
  const form = document.getElementById("noteForm");
  form.addEventListener("submit", event => {
    event.preventDefault();
    const notes = JSON.parse(localStorage.getItem("divinationNotes") || "[]");
    notes.unshift({
      topic: document.getElementById("noteTopic").value,
      question: document.getElementById("noteQuestion").value.trim() || "未命名观察",
      body: document.getElementById("noteBody").value.trim() || "暂无内容",
      time: new Date().toLocaleString("zh-CN")
    });
    localStorage.setItem("divinationNotes", JSON.stringify(notes.slice(0, 20)));
    form.reset();
    renderNotes();
  });
  renderNotes();
}

function renderNotes() {
  const notes = JSON.parse(localStorage.getItem("divinationNotes") || "[]");
  document.getElementById("noteList").innerHTML = notes.length ? notes.map(note => `
    <article class="note-item">
      <small>${note.topic} · ${note.time}</small>
      <h4>${note.question}</h4>
      <p>${note.body}</p>
    </article>
  `).join("") : `<div class="result-box">还没有笔记。做一次练习后，把问题、结果和你的解释保存下来。</div>`;
}

function init() {
  initHero();
  renderModules();
  renderModuleDetail();
  setupLibrary();
  setupLessons();
  renderLessons();
  renderLessonDetail();
  setupPracticeTabs();
  document.getElementById("castHexagram").addEventListener("click", castHexagram);
  document.getElementById("calcBazi").addEventListener("click", calcBazi);
  document.getElementById("palaceRange").addEventListener("input", updateZiwei);
  document.getElementById("qimenScenario").addEventListener("change", updateQimen);
  document.getElementById("shuffleQimen").addEventListener("click", updateQimen);
  document.getElementById("compassRange").addEventListener("input", updateFengshui);
  setupForms();
  setupNotes();
  drawHexagramLines(document.getElementById("hexagramCanvas"), currentHexLines, "点击起卦");
  calcBazi();
  updateZiwei();
  updateQimen();
  drawPalmFace(document.getElementById("formsCanvas"), "生命线");
  document.getElementById("formsResult").innerHTML = `<strong>生命线</strong><br>${formChoices[0][1]}<br>练习：先写三个肉眼可见的事实，再写一个可能的生活原因。`;
  updateFengshui();
}

document.addEventListener("DOMContentLoaded", init);
