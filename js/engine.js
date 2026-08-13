(() => {
  const SCRIPT = window.DEMO_SCRIPT;
  if (!SCRIPT) {
    const line = document.getElementById("line");
    if (line) line.textContent = "劇本沒載入，請重新整理。";
    return;
  }
  const SAVE_KEY = "liuhe-demo-v1";
  const SLOT_KEY = "liuhe-demo-slot-";
  const QSAVE_KEY = "liuhe-demo-qsave";
  const CFG_KEY = "liuhe-demo-cfg";
  const READ_KEY = "liuhe-demo-read";
  const SLOT_MAX = 6;
  const LEGACY = {
    wei11: "wei_choice",
    wei12: "wei_choice",
    wei_end2: "card_yang",
    wei_more3: "wei_end",
    wei_pass2: "wei_end",
    yang_now2: "yang_end",
    jiang7: "jiang_end",
    jiang_more2: "jiang_more",
    jiang_pass2: "jiang_end",
    li_pass2: "end_gate",
    check_long: "end_gate",
    ending3: "ending2"
  };
  const PACK = window.DEMO_ASSETS || { bg: {}, chara: {} };
  const BGS = {
    black: "",
    classroom: PACK.bg.classroom || "assets/bg/classroom.jpg",
    campus: PACK.bg.campus || "assets/bg/campus.jpg",
    mrt: PACK.bg.mrt || "assets/bg/mrt.jpg",
    room: PACK.bg.room || "assets/bg/room.jpg",
    dusk: PACK.bg.dusk || "assets/bg/dusk.jpg"
  };
  const SPRITES = {
    wei: PACK.chara.wei || "assets/chara/wei.png",
    yang: PACK.chara.yang || "assets/chara/yang.png",
    jiang: PACK.chara.jiang || "assets/chara/jiang.png",
    li: PACK.chara.li || "assets/chara/li.png",
    long: PACK.chara.long || "assets/chara/long.png"
  };

  const el = {
    app: document.getElementById("app"),
    bg: document.getElementById("bg"),
    sprite: document.getElementById("sprite"),
    name: document.getElementById("nameplate"),
    line: document.getElementById("line"),
    clicker: document.getElementById("clicker"),
    choices: document.getElementById("choices"),
    chapter: document.getElementById("chapter"),
    textbox: document.getElementById("textbox"),
    title: document.getElementById("title"),
    about: document.getElementById("about"),
    config: document.getElementById("config"),
    saves: document.getElementById("saves"),
    saveList: document.getElementById("save-list"),
    savesTitle: document.getElementById("saves-title"),
    log: document.getElementById("log"),
    logBody: document.getElementById("log-body"),
    toast: document.getElementById("toast"),
    btnAuto: document.getElementById("btn-auto"),
    btnSkip: document.getElementById("btn-skip"),
    fade: document.getElementById("fade"),
    chapterCard: document.getElementById("chapter-card"),
    cardTitle: document.getElementById("card-title"),
    endcard: document.getElementById("endcard"),
    hud: document.getElementById("hud")
  };

  const cfg = { speed: 26, auto: 900, skipMode: "read" };
  try {
    const c = JSON.parse(localStorage.getItem(CFG_KEY) || "{}");
    if (c.speed) cfg.speed = c.speed;
    if (c.auto) cfg.auto = c.auto;
    if (c.skipMode === "all" || c.skipMode === "read") cfg.skipMode = c.skipMode;
  } catch (_) { /* keep */ }

  const state = {
    id: "start",
    flags: { wei: 0, yang: 0, jiang: 0, li: 0 },
    history: [],
    read: new Set(),
    typing: false,
    full: "",
    shown: 0,
    auto: false,
    skip: false,
    ctrlSkip: false,
    playing: false,
    fading: false,
    timer: null,
    autoTimer: null,
    screen: "title",
    lockUntil: 0,
    saveMode: "save",
    returnScreen: "title",
    lastBg: "black",
    lastChapter: ""
  };

  try {
    const raw = JSON.parse(localStorage.getItem(READ_KEY) || "[]");
    if (Array.isArray(raw)) raw.forEach((id) => state.read.add(id));
  } catch (_) { /* keep */ }

  function locked() {
    return Date.now() < state.lockUntil || state.fading;
  }

  function lockInput(ms) {
    state.lockUntil = Date.now() + ms;
  }

  function persistRead() {
    try {
      localStorage.setItem(READ_KEY, JSON.stringify(Array.from(state.read)));
    } catch (_) { /* ignore quota */ }
  }

  function toast(msg) {
    el.toast.hidden = false;
    el.toast.textContent = msg;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { el.toast.hidden = true; }, 1400);
  }

  function setBg(key, memory) {
    const url = BGS[key];
    if (!key || key === "black" || !url) {
      el.bg.style.backgroundImage = "none";
      el.bg.style.backgroundColor = "#050506";
    } else {
      el.bg.style.backgroundImage = `url("${url}")`;
      el.bg.style.backgroundColor = "#000";
    }
    el.bg.classList.toggle("memory", !!memory);
    if (key !== undefined) state.lastBg = key;
  }

  function setSprite(name, cls) {
    if (!name) {
      el.sprite.hidden = true;
      el.sprite.removeAttribute("src");
      return;
    }
    const src = SPRITES[name];
    if (!src) return;
    el.sprite.className = cls || "";
    if (el.sprite.getAttribute("src") !== src) el.sprite.src = src;
    el.sprite.hidden = false;
  }

  function stopType() {
    clearInterval(state.timer);
    state.timer = null;
    state.typing = false;
  }

  function showFull() {
    stopType();
    el.line.textContent = state.full;
    state.shown = state.full.length;
    el.clicker.hidden = false;
    if (skipActive()) queueSkip();
    else if (state.auto) queueAuto();
  }

  function queueAuto() {
    clearTimeout(state.autoTimer);
    state.autoTimer = setTimeout(() => advance(), cfg.auto);
  }

  function skipActive() {
    return state.ctrlSkip || state.skip;
  }

  function stopSkipButton() {
    state.skip = false;
    if (el.btnSkip) el.btnSkip.classList.remove("on");
  }

  function canSkipThrough() {
    const node = SCRIPT[state.id];
    if (!node || node.choices || node.next === null || node.card || node.endcard) return false;
    if (state.ctrlSkip) return true;
    if (!state.skip) return false;
    if (cfg.skipMode === "all") return true;
    return state.read.has(node.next);
  }

  function queueSkip() {
    clearTimeout(state.autoTimer);
    if (!canSkipThrough()) {
      if (state.skip && !state.ctrlSkip) stopSkipButton();
      return;
    }
    state.autoTimer = setTimeout(() => {
      if (skipActive()) advance();
    }, 28);
  }

  function typeText(text) {
    stopType();
    clearTimeout(state.autoTimer);
    state.full = text;
    state.shown = 0;
    state.typing = true;
    el.line.textContent = "";
    el.clicker.hidden = true;
    if (skipActive()) {
      showFull();
      return;
    }
    state.timer = setInterval(() => {
      state.shown += 1;
      el.line.textContent = state.full.slice(0, state.shown);
      if (state.shown >= state.full.length) showFull();
    }, cfg.speed);
  }

  function applyNode(node) {
    if (node.bg !== undefined) setBg(node.bg, node.memory);
    else if (node.memory !== undefined) el.bg.classList.toggle("memory", !!node.memory);
    if (node.sprite !== undefined) setSprite(node.sprite, node.spriteClass);
    else if (node.spriteClass) el.sprite.className = node.spriteClass;
    if (node.chapter) el.chapter.textContent = node.chapter;
    if (node.name) {
      el.name.hidden = false;
      el.name.textContent = node.name;
      el.name.className = node.who || "";
    } else if (node.name === "") {
      el.name.hidden = true;
    }
  }

  function showChoices(list) {
    el.choices.hidden = false;
    el.choices.innerHTML = "";
    el.clicker.hidden = true;
    stopSkipButton();
    list.forEach((c, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.innerHTML = "<i>" + (i + 1) + "</i><span>" + escapeHtml(c.text) + "</span>";
      b.addEventListener("pointerup", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (state.screen !== "choice" || locked()) return;
        if (c.flag) state.flags[c.flag] = 1;
        el.choices.hidden = true;
        state.screen = "play";
        lockInput(180);
        if (window.DemoAudio) window.DemoAudio.playSe("choice");
        go(c.next);
      });
      el.choices.appendChild(b);
    });
  }

  function reachedCount() {
    return state.flags.wei + state.flags.yang + state.flags.jiang + state.flags.li;
  }

  function fadeThen(fn) {
    if (!el.fade) {
      fn();
      return;
    }
    state.fading = true;
    el.fade.classList.add("on");
    setTimeout(() => {
      fn();
      requestAnimationFrame(() => {
        el.fade.classList.remove("on");
        setTimeout(() => { state.fading = false; }, 280);
      });
    }, 260);
  }

  function showChapterCard(node) {
    el.app.classList.add("card-on");
    if (el.textbox) el.textbox.hidden = true;
    el.chapterCard.hidden = false;
    el.cardTitle.textContent = node.chapter || "";
    state.screen = "card";
    lockInput(360);
    if (window.DemoAudio) window.DemoAudio.cueFrom({ bg: "black" }, true);
  }

  function closeChapterCard() {
    if (state.screen !== "card" || el.chapterCard.hidden) return;
    if (locked()) return;
    const node = SCRIPT[state.id];
    el.chapterCard.hidden = true;
    el.app.classList.remove("card-on");
    if (el.textbox) el.textbox.hidden = false;
    state.screen = "play";
    if (node && node.next) go(node.next);
  }

  function showEndCard() {
    stopType();
    clearTimeout(state.autoTimer);
    state.playing = false;
    state.skip = false;
    state.ctrlSkip = false;
    el.choices.hidden = true;
    if (el.chapterCard) el.chapterCard.hidden = true;
    el.app.classList.remove("card-on");
    hideOverlays();
    el.title.hidden = true;
    el.endcard.hidden = false;
    state.screen = "end";
    setMenu(true);
    if (window.DemoAudio) window.DemoAudio.playBgm("title");
  }

  function go(id) {
    if (!id) {
      showEndCard();
      return;
    }
    const node = SCRIPT[id];
    if (!node) {
      if (LEGACY[id]) {
        go(LEGACY[id]);
        return;
      }
      toast("存檔對不上，從頭開始");
      state.id = "start";
      go("start");
      return;
    }
    if (node.gate) {
      go(reachedCount() === 0 ? "long1" : "ending");
      return;
    }

    const bgChanged = node.bg !== undefined && node.bg !== state.lastBg;
    const needFade = state.playing && (bgChanged || node.card || node.endcard);

    const apply = () => {
      state.id = id;
      if (node.chapter && node.chapter !== state.lastChapter) {
        state.lastChapter = node.chapter;
        writeQSave(true);
      }
      if (node.endcard) {
        showEndCard();
        return;
      }
      if (node.card) {
        applyNode(node);
        showChapterCard(node);
        return;
      }
      applyNode(node);
      if (window.DemoAudio) window.DemoAudio.cueFrom(node, true);
      const text = node.text || "";
      if (text) {
        state.history.push({
          name: node.name || "",
          text
        });
      }
      state.read.add(id);
      persistRead();
      typeText(text);
      if (node.choices) {
        stopType();
        el.line.textContent = text;
        state.typing = false;
        showChoices(node.choices);
        state.screen = "choice";
      } else if (state.playing) {
        state.screen = "play";
      }
    };

    if (needFade) {
      lockInput(400);
      fadeThen(apply);
    } else {
      apply();
    }
  }

  function advance() {
    if (state.screen === "card") {
      closeChapterCard();
      return;
    }
    if (state.screen !== "play" || !state.playing || locked()) return;
    if (!el.choices.hidden) return;
    if (state.typing) {
      showFull();
      if (!skipActive() && window.DemoAudio) window.DemoAudio.playSe("click");
      return;
    }
    const node = SCRIPT[state.id];
    if (!node) return;
    if (node.next === null) {
      showEndCard();
      return;
    }
    if (!skipActive() && window.DemoAudio) window.DemoAudio.playSe("click");
    go(node.next);
  }

  function startGame(fromSave) {
    hideAllScreens();
    if (el.textbox) el.textbox.hidden = false;
    if (el.hud) el.hud.hidden = false;
    el.app.classList.add("playing");
    el.app.classList.remove("card-on");
    state.playing = true;
    state.screen = "play";
    lockInput(500);
    if (window.DemoAudio) {
      window.DemoAudio.unlock();
      window.DemoAudio.playSe("start");
    }
    state.auto = false;
    state.skip = false;
    state.ctrlSkip = false;
    if (el.btnAuto) el.btnAuto.classList.remove("on");
    if (el.btnSkip) el.btnSkip.classList.remove("on");
    if (fromSave) {
      go(state.id);
    } else {
      state.id = "start";
      state.flags = { wei: 0, yang: 0, jiang: 0, li: 0 };
      state.history = [];
      state.lastChapter = "";
      state.lastBg = "black";
      go("start");
    }
  }

  function setMenu(on) {
    el.app.classList.toggle("menu-on", on);
    el.app.classList.toggle("playing", !on);
    if (el.textbox) el.textbox.hidden = on;
    if (el.hud) el.hud.hidden = on;
  }

  function hideOverlays() {
    el.about.hidden = true;
    if (el.config) el.config.hidden = true;
    if (el.saves) el.saves.hidden = true;
    el.log.hidden = true;
    if (el.endcard) el.endcard.hidden = true;
    if (el.chapterCard) el.chapterCard.hidden = true;
    el.app.classList.remove("hide-ui");
    el.app.classList.remove("card-on");
  }

  function hideAllScreens() {
    el.title.hidden = true;
    hideOverlays();
    setMenu(false);
  }

  function showTitle() {
    stopType();
    clearTimeout(state.autoTimer);
    state.playing = false;
    state.skip = false;
    state.ctrlSkip = false;
    el.choices.hidden = true;
    hideOverlays();
    el.title.hidden = false;
    state.screen = "title";
    el.app.classList.remove("playing");
    setMenu(true);
    const cont = document.getElementById("btn-continue");
    if (cont) cont.classList.toggle("off", !hasAnySave());
    if (window.DemoAudio) window.DemoAudio.playBgm("title");
  }

  function slotKey(n) { return SLOT_KEY + n; }

  function snapshot() {
    return {
      id: state.id,
      flags: state.flags,
      history: state.history,
      chapter: el.chapter.textContent || "",
      at: Date.now()
    };
  }

  function readSlot(n) {
    try {
      const raw = localStorage.getItem(slotKey(n)) || localStorage.getItem(n === 1 ? SAVE_KEY : "");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function writeSlot(n) {
    const data = snapshot();
    localStorage.setItem(slotKey(n), JSON.stringify(data));
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  }

  function writeQSave(silent) {
    if (!state.playing && !silent) return;
    localStorage.setItem(QSAVE_KEY, JSON.stringify(snapshot()));
    if (!silent) toast("快速存檔");
  }

  function readQSave() {
    try {
      const raw = localStorage.getItem(QSAVE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function applySave(data) {
    state.id = data.id || "start";
    state.flags = Object.assign({ wei: 0, yang: 0, jiang: 0, li: 0 }, data.flags);
    state.history = data.history || [];
    state.lastChapter = data.chapter || "";
  }

  function hasAnySave() {
    if (readQSave()) return true;
    for (let n = 1; n <= SLOT_MAX; n += 1) {
      if (readSlot(n)) return true;
    }
    return false;
  }

  function fmtTime(ts) {
    if (!ts) return "空";
    const d = new Date(ts);
    const p = (n) => String(n).padStart(2, "0");
    return d.getFullYear() + "/" + p(d.getMonth() + 1) + "/" + p(d.getDate()) + "　" + p(d.getHours()) + ":" + p(d.getMinutes());
  }

  function openSaves(mode, from) {
    state.saveMode = mode;
    state.returnScreen = from || state.screen;
    state.screen = "saves";
    el.savesTitle.textContent = mode === "save" ? "存檔" : "讀檔";
    el.saves.hidden = false;
    el.saveList.innerHTML = "";

    const q = document.createElement("button");
    q.type = "button";
    q.className = "save-slot q";
    const qdata = readQSave();
    q.innerHTML = qdata
      ? "<b>快速存檔</b><span>" + escapeHtml(qdata.chapter || "進行中") + "　" + fmtTime(qdata.at) + "</span>"
      : "<b>快速存檔</b><span>空</span>";
    q.addEventListener("pointerup", (e) => {
      e.stopPropagation();
      if (mode === "save") {
        if (!state.playing) return;
        writeQSave(false);
        closeSaves();
      } else if (qdata) {
        applySave(qdata);
        el.saves.hidden = true;
        startGame(true);
      } else {
        toast("還沒有快速存檔");
      }
    });
    el.saveList.appendChild(q);

    for (let n = 1; n <= SLOT_MAX; n += 1) {
      const data = readSlot(n);
      const b = document.createElement("button");
      b.type = "button";
      b.className = "save-slot";
      b.innerHTML = data
        ? "<b>第 " + n + " 格</b><span>" + escapeHtml(data.chapter || "進行中") + "　" + fmtTime(data.at) + "</span>"
        : "<b>第 " + n + " 格</b><span>空</span>";
      b.addEventListener("pointerup", (e) => {
        e.stopPropagation();
        if (mode === "save") {
          if (!state.playing) return;
          writeSlot(n);
          toast("已存到第 " + n + " 格");
          closeSaves();
        } else if (data) {
          applySave(data);
          el.saves.hidden = true;
          startGame(true);
        } else {
          toast("這一格是空的");
        }
      });
      el.saveList.appendChild(b);
    }
  }

  function closeSaves() {
    el.saves.hidden = true;
    if (state.playing && state.returnScreen !== "title") {
      state.screen = el.choices.hidden ? "play" : "choice";
    } else {
      showTitle();
    }
  }

  function openConfig(from) {
    state.returnScreen = from || state.screen;
    state.screen = "config";
    el.config.hidden = false;
    document.querySelectorAll("[data-cfg]").forEach((row) => {
      const key = row.dataset.cfg;
      row.querySelectorAll("button").forEach((b) => {
        const same = key === "skipMode"
          ? b.dataset.val === cfg[key]
          : Number(b.dataset.val) === cfg[key];
        b.classList.toggle("on", same);
      });
    });
    if (window.DemoAudio) window.DemoAudio.bind();
  }

  function closeConfig() {
    el.config.hidden = true;
    if (state.playing && state.returnScreen !== "title") {
      state.screen = el.choices.hidden ? "play" : "choice";
    } else {
      showTitle();
    }
  }

  function persistCfg() {
    localStorage.setItem(CFG_KEY, JSON.stringify(cfg));
  }

  function openLog() {
    state.screen = "log";
    el.log.hidden = false;
    el.logBody.innerHTML = state.history.map((h) => {
      const name = h.name ? `<b>${escapeHtml(h.name)}</b>` : "";
      return `<div class="log-item">${name}${escapeHtml(h.text)}</div>`;
    }).join("") || "<p>還沒有對白。</p>";
    el.logBody.scrollTop = el.logBody.scrollHeight;
  }

  function closeLog() {
    el.log.hidden = true;
    state.screen = state.playing ? (el.choices.hidden ? "play" : "choice") : "title";
  }

  function escapeHtml(s) {
    return String(s)
      .split("&").join("&amp;")
      .split("<").join("&lt;")
      .split(">").join("&gt;")
      .split("\n").join("<br>");
  }

  function onTap(node, fn) {
    if (!node) return;
    node.addEventListener("pointerup", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      e.stopPropagation();
      fn(e);
    });
  }

  function resumePlayScreen() {
    state.screen = el.choices.hidden ? "play" : "choice";
  }

  el.textbox.addEventListener("pointerup", (e) => {
    e.stopPropagation();
    advance();
  });
  document.getElementById("stage").addEventListener("pointerup", (e) => {
    if (el.app.classList.contains("hide-ui")) {
      el.app.classList.remove("hide-ui");
      resumePlayScreen();
      return;
    }
    if (e.target.closest("button, #quick, #choices, #textbox, #title, #about, #log, #config, #saves, #endcard, #chapter-card")) return;
    if (state.screen === "card") {
      closeChapterCard();
      return;
    }
    advance();
  });

  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (e.button !== 2) return;
    if (!state.playing) return;
    if (state.screen !== "play" && state.screen !== "choice" && state.screen !== "hidden") return;
    if (el.app.classList.contains("hide-ui")) {
      el.app.classList.remove("hide-ui");
      resumePlayScreen();
    } else {
      el.app.classList.add("hide-ui");
      state.screen = "hidden";
    }
  });

  document.addEventListener("wheel", (e) => {
    if (!state.playing) return;
    if (state.screen !== "play" && state.screen !== "choice") return;
    if (e.deltaY < 0 && el.log.hidden) openLog();
  }, { passive: true });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!el.log.hidden) { closeLog(); return; }
      if (el.config && !el.config.hidden) { closeConfig(); return; }
      if (el.saves && !el.saves.hidden) { closeSaves(); return; }
      if (!el.about.hidden) { showTitle(); return; }
      if (el.endcard && !el.endcard.hidden) { showTitle(); return; }
      showTitle();
      return;
    }
    if (e.key === "Control") {
      state.ctrlSkip = true;
      if (!e.repeat && state.screen === "play") {
        if (state.typing) showFull();
        else queueSkip();
      }
    }
    if (state.screen === "choice" && e.key >= "1" && e.key <= "9") {
      const btn = el.choices.querySelectorAll("button")[Number(e.key) - 1];
      if (btn) btn.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      return;
    }
    if (state.screen === "card" && (e.key === " " || e.key === "Enter" || e.key === "z" || e.key === "Z")) {
      e.preventDefault();
      closeChapterCard();
      return;
    }
    if (state.screen !== "play") return;
    if (e.key === " " || e.key === "Enter" || e.key === "z" || e.key === "Z") {
      e.preventDefault();
      advance();
    }
  });
  document.addEventListener("keyup", (e) => {
    if (e.key === "Control") state.ctrlSkip = false;
  });

  document.getElementById("quick").addEventListener("pointerup", (e) => {
    e.stopPropagation();
    const btn = e.target.closest("button");
    if (!btn) return;
    const act = btn.dataset.act;
    if (act === "log") openLog();
    if (act === "auto") {
      state.auto = !state.auto;
      btn.classList.toggle("on", state.auto);
      if (state.auto && !state.typing) queueAuto();
      else clearTimeout(state.autoTimer);
    }
    if (act === "skip") {
      state.skip = !state.skip;
      btn.classList.toggle("on", state.skip);
      if (state.skip) {
        if (state.typing) showFull();
        else queueSkip();
      } else {
        clearTimeout(state.autoTimer);
      }
    }
    if (act === "qsave") writeQSave(false);
    if (act === "qload") {
      const data = readQSave();
      if (!data) {
        toast("還沒有快速存檔");
        return;
      }
      applySave(data);
      startGame(true);
    }
    if (act === "save") openSaves("save", "play");
    if (act === "load") openSaves("load", "play");
    if (act === "hide") {
      el.app.classList.add("hide-ui");
      state.screen = "hidden";
    }
    if (act === "config") openConfig("play");
    if (act === "title") showTitle();
  });

  onTap(document.getElementById("btn-start"), () => startGame(false));
  onTap(document.getElementById("btn-continue"), () => {
    if (!hasAnySave()) {
      toast("還沒有存檔");
      return;
    }
    el.title.hidden = true;
    openSaves("load", "title");
  });
  onTap(document.getElementById("btn-config"), () => {
    el.title.hidden = true;
    setMenu(true);
    openConfig("title");
  });
  onTap(document.getElementById("btn-about"), () => {
    el.title.hidden = true;
    el.about.hidden = false;
    state.screen = "about";
    setMenu(true);
  });
  onTap(document.getElementById("btn-about-back"), showTitle);
  onTap(document.getElementById("btn-config-back"), closeConfig);
  onTap(document.getElementById("btn-saves-back"), closeSaves);
  onTap(document.getElementById("btn-log-close"), closeLog);
  onTap(document.getElementById("btn-end-title"), showTitle);
  onTap(el.chapterCard, closeChapterCard);

  ["classroom", "campus", "mrt", "room", "dusk"].forEach((k) => {
    const i = new Image();
    i.src = BGS[k];
  });
  Object.values(SPRITES).forEach((src) => {
    const i = new Image();
    i.src = src;
  });

  if (BGS.dusk) {
    document.querySelectorAll(".screen").forEach((s) => {
      s.style.backgroundImage = `url("${BGS.dusk}")`;
    });
  }

  document.querySelectorAll("[data-cfg]").forEach((row) => {
    row.addEventListener("pointerup", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      e.stopPropagation();
      const key = row.dataset.cfg;
      cfg[key] = key === "skipMode" ? b.dataset.val : Number(b.dataset.val);
      persistCfg();
      row.querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
    });
  });

  if (window.DemoAudio) window.DemoAudio.bind();
  showTitle();
})();
