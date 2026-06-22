"use strict";

const baseStack = {
  app: "HyperGarden Demo",
  version: 1,
  theme: "hypercard",
  source: {
    kind: "curated-json",
    confidence: 1,
    note: "MVP 内置样本，用来验证复活运行时、脚本子集和考古面板。"
  },
  cards: [
    {
      id: "home",
      name: "Home",
      background: "main-bg",
      elements: [
        {
          id: "title",
          kind: "field",
          name: "title",
          text: "HyperGarden",
          style: "title",
          bounds: [58, 48, 320, 56]
        },
        {
          id: "message",
          kind: "field",
          name: "message",
          text: "一张被重新点亮的卡片。点击 Start 进入这个旧软件的主要循环。",
          style: "note",
          bounds: [62, 128, 390, 88]
        },
        {
          id: "start",
          kind: "button",
          name: "Start",
          label: "Start",
          bounds: [402, 344, 120, 42],
          script: "on mouseUp\n  put \"已进入 Intro card\" into field \"message\"\n  go to card \"Intro\"\nend mouseUp"
        },
        {
          id: "secret",
          kind: "button",
          name: "Secret",
          label: "Secret",
          bounds: [62, 344, 120, 42],
          script: "on mouseUp\n  go to card \"Secret\"\nend mouseUp"
        }
      ]
    },
    {
      id: "intro",
      name: "Intro",
      background: "main-bg",
      elements: [
        {
          id: "title",
          kind: "field",
          name: "title",
          text: "Intro",
          style: "title",
          bounds: [58, 48, 320, 56]
        },
        {
          id: "message",
          kind: "field",
          name: "message",
          text: "这里模拟一个教学 stack：字段保存状态，按钮触发 HyperTalk 子集。",
          style: "note",
          bounds: [62, 128, 420, 94]
        },
        {
          id: "reveal",
          kind: "button",
          name: "Reveal",
          label: "Reveal",
          bounds: [62, 344, 120, 42],
          script: "on mouseUp\n  put \"隐藏字段已恢复。\" into field \"message\"\n  show field \"clue\"\nend mouseUp"
        },
        {
          id: "clue",
          kind: "field",
          name: "clue",
          text: "背景 main-bg 被 Home、Intro、Map 共享。",
          style: "note",
          hidden: true,
          bounds: [252, 270, 268, 46]
        },
        {
          id: "next",
          kind: "button",
          name: "Next",
          label: "Next",
          bounds: [402, 344, 120, 42],
          script: "on mouseUp\n  go next\nend mouseUp"
        }
      ]
    },
    {
      id: "map",
      name: "Map",
      background: "main-bg",
      elements: [
        {
          id: "title",
          kind: "field",
          name: "title",
          text: "Map",
          style: "title",
          bounds: [58, 48, 320, 56]
        },
        {
          id: "message",
          kind: "field",
          name: "message",
          text: "考古面板会把按钮脚本转成状态迁移图。",
          style: "note",
          bounds: [62, 128, 410, 74]
        },
        {
          id: "home",
          kind: "button",
          name: "Home",
          label: "Home",
          bounds: [62, 344, 120, 42],
          script: "on mouseUp\n  go to card \"Home\"\nend mouseUp"
        },
        {
          id: "next",
          kind: "button",
          name: "Next",
          label: "Next",
          bounds: [402, 344, 120, 42],
          script: "on mouseUp\n  go next\nend mouseUp"
        }
      ]
    },
    {
      id: "end",
      name: "End",
      background: "ending",
      elements: [
        {
          id: "title",
          kind: "field",
          name: "title",
          text: "End",
          style: "title",
          bounds: [58, 48, 320, 56]
        },
        {
          id: "message",
          kind: "field",
          name: "message",
          text: "这个版本已经能读取 IR、运行脚本、记录路径，并生成结构解释。",
          style: "note",
          bounds: [62, 128, 410, 96]
        },
        {
          id: "again",
          kind: "button",
          name: "Again",
          label: "Again",
          bounds: [402, 344, 120, 42],
          script: "on mouseUp\n  go to card \"Home\"\nend mouseUp"
        }
      ]
    },
    {
      id: "secret",
      name: "Secret",
      background: "hidden",
      elements: [
        {
          id: "title",
          kind: "field",
          name: "title",
          text: "Secret",
          style: "title",
          bounds: [58, 48, 320, 56]
        },
        {
          id: "message",
          kind: "field",
          name: "message",
          text: "这张 card 只能由 Secret 按钮进入，是报告里会标出的隐藏路径。",
          style: "note",
          bounds: [62, 128, 410, 96]
        },
        {
          id: "back",
          kind: "button",
          name: "Back",
          label: "Back",
          bounds: [402, 344, 120, 42],
          script: "on mouseUp\n  go back\nend mouseUp"
        }
      ]
    },
    {
      id: "orphan",
      name: "Orphan Note",
      background: "archive",
      elements: [
        {
          id: "title",
          kind: "field",
          name: "title",
          text: "Orphan Note",
          style: "title",
          bounds: [58, 48, 360, 56]
        },
        {
          id: "message",
          kind: "field",
          name: "message",
          text: "这张 card 没有任何已知按钮会抵达。它代表残缺 stack 里常见的废弃页面或隐藏作者笔记。",
          style: "note",
          bounds: [62, 128, 438, 104]
        }
      ]
    }
  ]
};

const dosStack = {
  app: "ARCHIVE.EXE 3.1",
  version: 1,
  theme: "dos",
  source: {
    kind: "curated-json",
    format: "DOS interactive menu reconstruction",
    confidence: 0.86,
    note: "根据 DOS 时代菜单式资料库、批处理维护工具和文本模式 UI 的常见交互重建。"
  },
  cards: [
    {
      id: "boot",
      name: "Boot Screen",
      background: "cga-shell",
      elements: [
        {
          id: "title",
          kind: "field",
          name: "title",
          text: "ARCHIVE.EXE 3.1",
          style: "dos-title",
          bounds: [44, 34, 360, 34]
        },
        {
          id: "screen",
          kind: "field",
          name: "screen",
          text: "C:\\ARCHIVE> archive\n\nLoading index tables ... OK\nLoading memo driver .... OK\n\nRecovered from partial manual pages and screen captures.",
          style: "dos-screen",
          bounds: [44, 86, 552, 232]
        },
        {
          id: "status",
          kind: "field",
          name: "status",
          text: "F1 INDEX   F2 SEARCH   F3 RESTORE   F10 QUIT",
          style: "dos-status",
          bounds: [44, 404, 552, 30]
        },
        {
          id: "index",
          kind: "button",
          name: "F1 Index",
          label: "F1 Index",
          style: "dos-key",
          bounds: [58, 340, 116, 34],
          script: "on mouseUp\n  put \"Opening archive index ...\" into field \"status\"\n  go to card \"Index\"\nend mouseUp"
        },
        {
          id: "search",
          kind: "button",
          name: "F2 Search",
          label: "F2 Search",
          style: "dos-key",
          bounds: [190, 340, 116, 34],
          script: "on mouseUp\n  go to card \"Search\"\nend mouseUp"
        },
        {
          id: "restore",
          kind: "button",
          name: "F3 Restore",
          label: "F3 Restore",
          style: "dos-key",
          bounds: [322, 340, 116, 34],
          script: "on mouseUp\n  go to card \"Restore\"\nend mouseUp"
        },
        {
          id: "quit",
          kind: "button",
          name: "F10 Quit",
          label: "F10 Quit",
          style: "dos-key",
          bounds: [454, 340, 116, 34],
          script: "on mouseUp\n  put \"Exit cancelled: revival runtime keeps the session alive.\" into field \"status\"\nend mouseUp"
        }
      ]
    },
    {
      id: "index",
      name: "Index",
      background: "cga-shell",
      elements: [
        {
          id: "title",
          kind: "field",
          name: "title",
          text: "INDEX TABLE",
          style: "dos-title",
          bounds: [44, 34, 360, 34]
        },
        {
          id: "screen",
          kind: "field",
          name: "screen",
          text: "ID   TITLE                 DATE       FLAGS\n001  SALES_1989.DB          89-11-08   OK\n002  SCHOOL-LAB-NOTES       91-02-14   MEMO\n003  MAP-SECTOR-7           92-06-30   LOCK\n004  README.OLD             88-04-01   TEXT\n\nCursor evidence suggests ENTER opened details.",
          style: "dos-screen",
          bounds: [44, 86, 552, 250]
        },
        {
          id: "status",
          kind: "field",
          name: "status",
          text: "ENTER OPEN   ESC BACK   F2 SEARCH",
          style: "dos-status",
          bounds: [44, 404, 552, 30]
        },
        {
          id: "open",
          kind: "button",
          name: "Enter Open",
          label: "Enter",
          style: "dos-key",
          bounds: [58, 348, 104, 34],
          script: "on mouseUp\n  go to card \"Record Detail\"\nend mouseUp"
        },
        {
          id: "search",
          kind: "button",
          name: "F2 Search",
          label: "F2",
          style: "dos-key",
          bounds: [178, 348, 104, 34],
          script: "on mouseUp\n  go to card \"Search\"\nend mouseUp"
        },
        {
          id: "back",
          kind: "button",
          name: "Esc Back",
          label: "Esc",
          style: "dos-key",
          bounds: [466, 348, 104, 34],
          script: "on mouseUp\n  go back\nend mouseUp"
        }
      ]
    },
    {
      id: "detail",
      name: "Record Detail",
      background: "cga-shell",
      elements: [
        {
          id: "title",
          kind: "field",
          name: "title",
          text: "RECORD 002",
          style: "dos-title",
          bounds: [44, 34, 360, 34]
        },
        {
          id: "screen",
          kind: "field",
          name: "screen",
          text: "TITLE : SCHOOL-LAB-NOTES\nOWNER : M. K.\nMEMO  : Observations copied from a 286 lab machine.\n\nLinked resource: NOTEBOOK.DAT\nConfidence: high, because menu labels and field layout repeat across screens.",
          style: "dos-screen",
          bounds: [44, 86, 552, 250]
        },
        {
          id: "status",
          kind: "field",
          name: "status",
          text: "F3 RESTORE   ESC BACK",
          style: "dos-status",
          bounds: [44, 404, 552, 30]
        },
        {
          id: "restore",
          kind: "button",
          name: "F3 Restore",
          label: "F3 Restore",
          style: "dos-key",
          bounds: [58, 348, 128, 34],
          script: "on mouseUp\n  go to card \"Restore\"\nend mouseUp"
        },
        {
          id: "back",
          kind: "button",
          name: "Esc Back",
          label: "Esc",
          style: "dos-key",
          bounds: [466, 348, 104, 34],
          script: "on mouseUp\n  go back\nend mouseUp"
        }
      ]
    },
    {
      id: "search",
      name: "Search",
      background: "cga-shell",
      elements: [
        {
          id: "title",
          kind: "field",
          name: "title",
          text: "SEARCH",
          style: "dos-title",
          bounds: [44, 34, 360, 34]
        },
        {
          id: "screen",
          kind: "field",
          name: "screen",
          text: "Find: _\n\nRecovered behavior:\n- F5 repeats last query\n- Wildcards probably supported\n- Results redraw inside the same text viewport",
          style: "dos-screen",
          bounds: [44, 86, 552, 250]
        },
        {
          id: "status",
          kind: "field",
          name: "status",
          text: "F5 RUN QUERY   ESC BACK",
          style: "dos-status",
          bounds: [44, 404, 552, 30]
        },
        {
          id: "run",
          kind: "button",
          name: "F5 Run",
          label: "F5 Run",
          style: "dos-key",
          bounds: [58, 348, 116, 34],
          script: "on mouseUp\n  put \"Find: LAB\\n\\n002  SCHOOL-LAB-NOTES       91-02-14   MEMO\\n\\n1 match. Press ENTER to open.\" into field \"screen\"\n  show button \"Enter Open\"\nend mouseUp"
        },
        {
          id: "open",
          kind: "button",
          name: "Enter Open",
          label: "Enter",
          style: "dos-key",
          hidden: true,
          bounds: [190, 348, 116, 34],
          script: "on mouseUp\n  go to card \"Record Detail\"\nend mouseUp"
        },
        {
          id: "back",
          kind: "button",
          name: "Esc Back",
          label: "Esc",
          style: "dos-key",
          bounds: [466, 348, 104, 34],
          script: "on mouseUp\n  go back\nend mouseUp"
        }
      ]
    },
    {
      id: "restore",
      name: "Restore",
      background: "cga-shell",
      elements: [
        {
          id: "title",
          kind: "field",
          name: "title",
          text: "RESTORE WIZARD",
          style: "dos-title",
          bounds: [44, 34, 380, 34]
        },
        {
          id: "screen",
          kind: "field",
          name: "screen",
          text: "Target: A:\\RECOVER\\\nMode  : verify only\n\nThis reconstructed command probably mapped to:\nCOPY /V NOTEBOOK.DAT A:\\RECOVER",
          style: "dos-screen",
          bounds: [44, 86, 552, 250]
        },
        {
          id: "status",
          kind: "field",
          name: "status",
          text: "F9 START   ESC BACK",
          style: "dos-status",
          bounds: [44, 404, 552, 30]
        },
        {
          id: "start",
          kind: "button",
          name: "F9 Start",
          label: "F9 Start",
          style: "dos-key",
          bounds: [58, 348, 116, 34],
          script: "on mouseUp\n  put \"VERIFY PASS. No files written in browser revival mode.\" into field \"status\"\nend mouseUp"
        },
        {
          id: "back",
          kind: "button",
          name: "Esc Back",
          label: "Esc",
          style: "dos-key",
          bounds: [466, 348, 104, 34],
          script: "on mouseUp\n  go back\nend mouseUp"
        }
      ]
    },
    {
      id: "sysop",
      name: "SYSOP Hidden Panel",
      background: "maintenance",
      elements: [
        {
          id: "title",
          kind: "field",
          name: "title",
          text: "SYSOP",
          style: "dos-title",
          bounds: [44, 34, 360, 34]
        },
        {
          id: "screen",
          kind: "field",
          name: "screen",
          text: "Undocumented maintenance menu.\n\nNo recovered key path reaches this screen. It may have required a command-line flag such as /SYSOP or a password from the manual appendix.",
          style: "dos-screen",
          bounds: [44, 86, 552, 250]
        }
      ]
    }
  ]
};

const sampleStacks = {
  hypercard: baseStack,
  dos: dosStack
};

const els = {
  samplePicker: document.querySelector("#samplePicker"),
  stackSummary: document.querySelector("#stackSummary"),
  cardCount: document.querySelector("#cardCount"),
  cardList: document.querySelector("#cardList"),
  stage: document.querySelector("#stage"),
  currentCardTitle: document.querySelector("#currentCardTitle"),
  runtimeLog: document.querySelector("#runtimeLog"),
  reportPane: document.querySelector("#reportPane"),
  scriptPane: document.querySelector("#scriptPane"),
  irPane: document.querySelector("#irPane"),
  importFile: document.querySelector("#importFile"),
  resetStack: document.querySelector("#resetStack"),
  exportReport: document.querySelector("#exportReport"),
  backButton: document.querySelector("#backButton"),
  prevButton: document.querySelector("#prevButton"),
  nextButton: document.querySelector("#nextButton"),
  tabs: Array.from(document.querySelectorAll(".tab"))
};

let currentSample = "hypercard";
let state = makeInitialState(sampleStacks[currentSample]);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeName(value) {
  return String(value || "").trim().toLowerCase();
}

function makeInitialState(stack) {
  const copy = clone(stack);
  const firstCard = copy.cards[0]?.id || "";
  return {
    stack: copy,
    currentCardId: firstCard,
    history: [],
    log: ["stack loaded"],
    report: analyzeStack(copy)
  };
}

function getCurrentCard() {
  return state.stack.cards.find((card) => card.id === state.currentCardId) || state.stack.cards[0];
}

function getCardIndex(cardId) {
  return state.stack.cards.findIndex((card) => card.id === cardId);
}

function findCardByName(name) {
  const normalized = normalizeName(name);
  return state.stack.cards.find((card) => normalizeName(card.name) === normalized || normalizeName(card.id) === normalized);
}

function findElement(card, kind, name) {
  const normalized = normalizeName(name);
  return card.elements.find((element) => {
    const kindMatches = !kind || element.kind === kind;
    const nameMatches = normalizeName(element.name) === normalized || normalizeName(element.id) === normalized || normalizeName(element.label) === normalized;
    return kindMatches && nameMatches;
  });
}

function pushLog(message) {
  state.log.unshift(message);
  state.log = state.log.slice(0, 8);
}

function goToCard(cardId, remember = true) {
  const target = state.stack.cards.find((card) => card.id === cardId);
  if (!target) {
    pushLog(`missing card: ${cardId}`);
    render();
    return;
  }
  if (remember && state.currentCardId !== target.id) {
    state.history.push(state.currentCardId);
  }
  state.currentCardId = target.id;
  pushLog(`go to card "${target.name}"`);
  render();
}

function goRelative(direction) {
  const index = getCardIndex(state.currentCardId);
  if (index < 0) return;
  const nextIndex = direction === "next" ? Math.min(index + 1, state.stack.cards.length - 1) : Math.max(index - 1, 0);
  goToCard(state.stack.cards[nextIndex].id);
}

function goBack() {
  const previous = state.history.pop();
  if (!previous) {
    pushLog("history empty");
    render();
    return;
  }
  goToCard(previous, false);
}

function parseHyperTalk(script) {
  const physicalLines = String(script || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !/^on\s+/i.test(line) && !/^end\s+/i.test(line));
  const commands = [];
  let pending = "";

  for (const line of physicalLines) {
    pending = pending ? `${pending}\\n${line}` : line;
    const quoteCount = (pending.match(/(?<!\\)"/g) || []).length;
    if (quoteCount % 2 === 0) {
      commands.push(pending);
      pending = "";
    }
  }

  if (pending) commands.push(pending);
  return commands;
}

function decodeScriptString(value) {
  return String(value).replaceAll("\\n", "\n").replaceAll('\\"', '"').replaceAll("\\\\", "\\");
}

function inferTransition(script, sourceCardId, buttonName, stack) {
  const commands = parseHyperTalk(script);
  for (const command of commands) {
    let match = command.match(/^go\s+to\s+card\s+"([^"]+)"$/i);
    if (match) {
      const target = stack.cards.find((card) => normalizeName(card.name) === normalizeName(match[1]) || normalizeName(card.id) === normalizeName(match[1]));
      return target ? { from: sourceCardId, to: target.id, event: `click(${buttonName})`, command } : null;
    }
    if (/^go\s+next$/i.test(command)) {
      const index = stack.cards.findIndex((card) => card.id === sourceCardId);
      const target = stack.cards[Math.min(index + 1, stack.cards.length - 1)];
      return target ? { from: sourceCardId, to: target.id, event: `click(${buttonName})`, command } : null;
    }
    if (/^go\s+back$/i.test(command)) {
      return { from: sourceCardId, to: "(history)", event: `click(${buttonName})`, command };
    }
  }
  return null;
}

function executeHyperTalk(script, sourceElement) {
  const card = getCurrentCard();
  const commands = parseHyperTalk(script);
  pushLog(`mouseUp -> ${sourceElement.name || sourceElement.label}`);

  for (const command of commands) {
    let match = command.match(/^put\s+"([^"]*)"\s+into\s+field\s+"([^"]+)"$/i);
    if (match) {
      const field = findElement(card, "field", match[2]);
      if (field) {
        field.text = decodeScriptString(match[1]);
        pushLog(`put text into field "${match[2]}"`);
      }
      continue;
    }

    match = command.match(/^go\s+to\s+card\s+"([^"]+)"$/i);
    if (match) {
      const target = findCardByName(match[1]);
      if (target) {
        goToCard(target.id);
        return;
      }
      pushLog(`missing card "${match[1]}"`);
      continue;
    }

    if (/^go\s+next$/i.test(command)) {
      goRelative("next");
      return;
    }

    if (/^go\s+previous$/i.test(command) || /^go\s+prev$/i.test(command)) {
      goRelative("previous");
      return;
    }

    if (/^go\s+back$/i.test(command)) {
      goBack();
      return;
    }

    match = command.match(/^(show|hide)\s+(button|field)\s+"([^"]+)"$/i);
    if (match) {
      const element = findElement(card, match[2].toLowerCase(), match[3]);
      if (element) {
        element.hidden = match[1].toLowerCase() === "hide";
        pushLog(`${match[1].toLowerCase()} ${match[2].toLowerCase()} "${match[3]}"`);
      }
      continue;
    }

    pushLog(`unsupported: ${command}`);
  }

  render();
}

function analyzeStack(stack) {
  const transitions = [];
  const scripts = [];
  const backgroundCounts = new Map();
  let buttonCount = 0;
  let fieldCount = 0;

  for (const card of stack.cards) {
    backgroundCounts.set(card.background || "(none)", (backgroundCounts.get(card.background || "(none)") || 0) + 1);
    for (const element of card.elements || []) {
      if (element.kind === "button") buttonCount += 1;
      if (element.kind === "field") fieldCount += 1;
      if (element.script) {
        scripts.push({
          cardId: card.id,
          cardName: card.name,
          elementName: element.name || element.label || element.id,
          script: element.script,
          commands: parseHyperTalk(element.script)
        });
        const transition = inferTransition(element.script, card.id, element.name || element.label || element.id, stack);
        if (transition) transitions.push(transition);
      }
    }
  }

  const reachable = findReachableCards(stack.cards[0]?.id, transitions);
  const unreachable = stack.cards.filter((card) => !reachable.has(card.id)).map((card) => card.id);
  const sharedBackgrounds = Array.from(backgroundCounts.entries())
    .filter(([, count]) => count > 1)
    .map(([name, count]) => ({ name, count }));

  return {
    cardCount: stack.cards.length,
    buttonCount,
    fieldCount,
    scriptCount: scripts.length,
    transitions,
    scripts,
    reachable: Array.from(reachable),
    unreachable,
    sharedBackgrounds,
    findings: buildFindings(stack, transitions, unreachable, sharedBackgrounds)
  };
}

function findReachableCards(startCardId, transitions) {
  const reachable = new Set(startCardId ? [startCardId] : []);
  let changed = true;
  while (changed) {
    changed = false;
    for (const transition of transitions) {
      if (reachable.has(transition.from) && transition.to !== "(history)" && !reachable.has(transition.to)) {
        reachable.add(transition.to);
        changed = true;
      }
    }
  }
  return reachable;
}

function buildFindings(stack, transitions, unreachable, sharedBackgrounds) {
  const findings = [
    {
      tone: "good",
      title: "入口结构已识别",
      body: `入口 card 是 "${stack.cards[0]?.name || "unknown"}"，当前样本包含 ${stack.cards.length} 张 card。`
    },
    {
      tone: "good",
      title: "交互路径已恢复",
      body: `从按钮脚本中恢复了 ${transitions.length} 条状态迁移。`
    }
  ];

  if (stack.source?.format) {
    findings.push({
      tone: "good",
      title: "识别来源格式",
      body: `${stack.source.format}，置信度 ${Math.round((stack.source.confidence || 0) * 100)}%。`
    });
  }

  if (unreachable.length) {
    findings.push({
      tone: "warn",
      title: "发现不可达 card",
      body: `${unreachable.join(", ")} 无法从入口沿已知脚本抵达，可能是隐藏内容、废弃页面或依赖缺失脚本。`
    });
  }

  if (sharedBackgrounds.length) {
    findings.push({
      tone: "good",
      title: "发现共享 background",
      body: sharedBackgrounds.map((item) => `${item.name} × ${item.count}`).join("，")
    });
  }

  const hiddenElements = stack.cards.flatMap((card) => (card.elements || []).filter((element) => element.hidden).map((element) => `${card.name}.${element.name || element.id}`));
  if (hiddenElements.length) {
    findings.push({
      tone: "warn",
      title: "发现默认隐藏元素",
      body: hiddenElements.join("，")
    });
  }

  return findings;
}

function renderCardList() {
  els.cardCount.textContent = String(state.stack.cards.length);
  els.cardList.innerHTML = "";
  for (const card of state.stack.cards) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `card-row${card.id === state.currentCardId ? " is-active" : ""}`;
    button.innerHTML = `<span class="card-thumb" aria-hidden="true"></span><span><strong></strong><span></span></span>`;
    button.querySelector("strong").textContent = card.name;
    button.querySelector("span span").textContent = card.id;
    button.addEventListener("click", () => goToCard(card.id));
    els.cardList.appendChild(button);
  }
}

function scaleBounds(bounds) {
  const [x, y, width, height] = bounds;
  return {
    left: `${(x / 640) * 100}%`,
    top: `${(y / 480) * 100}%`,
    width: `${(width / 640) * 100}%`,
    height: `${(height / 480) * 100}%`
  };
}

function renderStage() {
  const card = getCurrentCard();
  els.currentCardTitle.textContent = `${card.name} / ${card.id}`;
  els.stage.innerHTML = "";

  const canvas = document.createElement("div");
  canvas.className = `card-canvas theme-${state.stack.theme || "hypercard"}`;
  canvas.innerHTML =
    state.stack.theme === "dos"
      ? `<div class="dos-art" aria-hidden="true"><span>C:\\&gt;_</span></div>`
      : `<div class="card-art" aria-hidden="true"><span class="sunburst"></span><span class="pixel-grid"></span></div>`;

  for (const element of card.elements || []) {
    const node = document.createElement(element.kind === "button" ? "button" : "div");
    node.className = `hc-${element.kind} ${element.style || ""}${element.hidden ? " is-hidden" : ""}`;
    Object.assign(node.style, scaleBounds(element.bounds || [0, 0, 100, 40]));

    if (element.kind === "button") {
      node.type = "button";
      node.textContent = element.label || element.name || element.id;
      node.addEventListener("click", () => executeHyperTalk(element.script || "", element));
    } else {
      node.textContent = element.text || "";
    }
    canvas.appendChild(node);
  }

  els.stage.appendChild(canvas);
}

function renderReport() {
  const report = state.report;
  els.stackSummary.textContent = `${state.stack.app || "Untitled"} · ${report.cardCount} cards · ${report.scriptCount} scripts`;
  els.reportPane.innerHTML = `
    <div class="metric-grid">
      <div class="metric"><strong>${report.cardCount}</strong><span>cards</span></div>
      <div class="metric"><strong>${report.buttonCount}</strong><span>buttons</span></div>
      <div class="metric"><strong>${report.fieldCount}</strong><span>fields</span></div>
      <div class="metric"><strong>${report.transitions.length}</strong><span>transitions</span></div>
    </div>
    <h3 class="section-title">Findings</h3>
    <div class="finding-list">
      ${report.findings
        .map(
          (finding) => `
            <article class="finding ${finding.tone}">
              <div><strong>${escapeHtml(finding.title)}</strong><p>${escapeHtml(finding.body)}</p></div>
            </article>`
        )
        .join("")}
    </div>
    <h3 class="section-title">Transitions</h3>
    <div class="transition-list">
      ${
        report.transitions.length
          ? report.transitions
              .map(
                (transition) => `
                  <article class="transition">
                    <strong>${escapeHtml(transition.from)} → ${escapeHtml(transition.to)}</strong>
                    <p>${escapeHtml(transition.event)} · ${escapeHtml(transition.command)}</p>
                  </article>`
              )
              .join("")
          : `<article class="transition"><p>没有从脚本中恢复状态迁移。</p></article>`
      }
    </div>
  `;

  els.scriptPane.innerHTML = `
    <div class="script-list">
      ${report.scripts
        .map(
          (script) => `
            <article class="script-block">
              <strong>${escapeHtml(script.cardName)} · ${escapeHtml(script.elementName)}</strong>
              <pre>${escapeHtml(script.script)}</pre>
            </article>`
        )
        .join("")}
    </div>
  `;
  els.irPane.textContent = JSON.stringify(state.stack, null, 2);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderLog() {
  els.runtimeLog.textContent = state.log.join("  /  ");
}

function render() {
  state.report = analyzeStack(state.stack);
  renderCardList();
  renderStage();
  renderReport();
  renderLog();
}

function importStack(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(String(reader.result || ""));
      if (!Array.isArray(imported.cards) || imported.cards.length === 0) {
        throw new Error("JSON 缺少 cards 数组。");
      }
      state = makeInitialState(imported);
      pushLog(`imported ${file.name}`);
      render();
    } catch (error) {
      pushLog(error.message || "import failed");
      renderLog();
    }
  };
  reader.readAsText(file);
}

function exportReport() {
  const payload = {
    app: state.stack.app,
    generatedAt: new Date().toISOString(),
    report: state.report
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${state.stack.app || "revived-stack"}-archaeology-report.json`;
  link.click();
  URL.revokeObjectURL(url);
}

els.importFile.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (file) importStack(file);
  event.target.value = "";
});
els.resetStack.addEventListener("click", () => {
  state = makeInitialState(sampleStacks[currentSample]);
  render();
});
els.samplePicker.addEventListener("change", (event) => {
  currentSample = event.target.value;
  state = makeInitialState(sampleStacks[currentSample]);
  pushLog(`sample switched: ${currentSample}`);
  render();
});
els.exportReport.addEventListener("click", exportReport);
els.backButton.addEventListener("click", goBack);
els.prevButton.addEventListener("click", () => goRelative("previous"));
els.nextButton.addEventListener("click", () => goRelative("next"));

for (const tab of els.tabs) {
  tab.addEventListener("click", () => {
    for (const item of els.tabs) item.classList.toggle("is-active", item === tab);
    for (const pane of [els.reportPane, els.scriptPane, els.irPane]) pane.classList.remove("is-active");
    document.querySelector(`#${tab.dataset.tab}Pane`).classList.add("is-active");
  });
}

render();
