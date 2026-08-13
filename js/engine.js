(() => {
  const SCRIPT = window.DEMO_SCRIPT;
  if (!SCRIPT) {
    const line = document.getElementById("line");
    if (line) line.textContent = "劇本沒載入，請重新整理。";
    return;
  }
  const SAVE_KEY = "liuhe-demo-v1";
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
    log: document.getElementById("log"),
    logBody: document.getElementById("log-body"),
    toast: document.getElementById("toast"),
    btnAuto: document.getElementById("btn-auto"),
    btnSkip: document.getElementById("btn-skip")
  };

  const state = {
    id: "start",
    flags: { wei: 0, yang: 0, jiang: 0, li: 0 },
    history: [],
    typing: false,
    full: "",
    shown: 0,
    auto: false,
    skip: false,
    playing: false,
    timer: null,
    autoTimer: null,
    screen: "title",
    lockUntil: 0
  };

  function locked() {
    return Date.now() < state.lockUntil;
  }

  function lockInput(ms) {
    state.lockUntil = Date.now() + ms;
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
    if (state.auto) queueAuto();
  }

  function queueAuto() {
    clearTimeout(state.autoTimer);
    state.autoTimer = setTimeout(() => advance(), 900);
  }

  function typeText(text) {
    stopType();
    clearTimeout(state.autoTimer);
    state.full = text;
    state.shown = 0;
    state.typing = true;
    el.line.textContent = "";
    el.clicker.hidden = true;
    if (state.skip) {
      showFull();
      return;
    }
    state.timer = setInterval(() => {
      state.shown += 1;
      el.line.textContent = state.full.slice(0, state.shown);
      if (state.shown >= state.full.length) showFull();
    }, 26);
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
    list.forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = c.text;
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

  function go(id) {
    if (!id) {
      endDemo();
      return;
    }
    const node = SCRIPT[id];
    if (!node) {
      endDemo();
      return;
    }
    if (node.gate) {
      go(reachedCount() === 0 ? "long1" : "ending");
      return;
    }
    state.id = id;
    applyNode(node);
    if (window.DemoAudio) window.DemoAudio.cueFrom(node, true);
    const text = node.text || "";
    if (text) {
      state.history.push({
        name: node.name || "",
        text
      });
    }
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
  }

  function advance() {
    if (state.screen !== "play" || !state.playing || locked()) return;
    if (!el.choices.hidden) return;
    if (state.typing) {
      showFull();
      if (window.DemoAudio) window.DemoAudio.playSe("click");
      return;
    }
    const node = SCRIPT[state.id];
    if (!node) return;
    if (node.next === null) {
      endDemo();
      return;
    }
    if (!state.skip && window.DemoAudio) window.DemoAudio.playSe("click");
    go(node.next);
  }

  function endDemo() {
    state.playing = false;
    toast("指示暫停");
    setTimeout(showTitle, 700);
  }

  function startGame(fromSave) {
    hideAllScreens();
    if (el.textbox) el.textbox.hidden = false;
    const hud = document.getElementById("hud");
    if (hud) hud.hidden = false;
    document.getElementById("app").classList.add("playing");
    state.playing = true;
    state.screen = "play";
    lockInput(500);
    if (window.DemoAudio) {
      window.DemoAudio.unlock();
      window.DemoAudio.playSe("start");
    }
    state.auto = false;
    state.skip = false;
    el.btnAuto.classList.remove("on");
    el.btnSkip.classList.remove("on");
    if (fromSave) {
      go(state.id);
    } else {
      state.id = "start";
      state.flags = { wei: 0, yang: 0, jiang: 0, li: 0 };
      state.history = [];
      go("start");
    }
  }

  function setMenu(on) {
    const app = document.getElementById("app");
    app.classList.toggle("menu-on", on);
    app.classList.toggle("playing", !on);
    if (el.textbox) el.textbox.hidden = on;
    const hud = document.getElementById("hud");
    if (hud) hud.hidden = on;
  }

  function hideAllScreens() {
    el.title.hidden = true;
    el.about.hidden = true;
    el.log.hidden = true;
    setMenu(false);
  }

  function showTitle() {
    stopType();
    clearTimeout(state.autoTimer);
    state.playing = false;
    state.skip = false;
    el.choices.hidden = true;
    el.title.hidden = false;
    el.about.hidden = true;
    el.log.hidden = true;
    state.screen = "title";
    document.getElementById("app").classList.remove("playing");
    setMenu(true);
    const cont = document.getElementById("btn-continue");
    if (cont) cont.classList.toggle("off", !localStorage.getItem(SAVE_KEY));
    if (window.DemoAudio) window.DemoAudio.playBgm("title");
  }

  function save() {
    if (!state.playing) return;
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      id: state.id,
      flags: state.flags,
      history: state.history
    }));
    toast("已記下");
  }

  function load() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) {
      toast("沒有存檔");
      return false;
    }
    try {
      const data = JSON.parse(raw);
      state.id = data.id || "start";
      state.flags = Object.assign({ wei: 0, yang: 0, jiang: 0, li: 0 }, data.flags);
      state.history = data.history || [];
      return true;
    } catch {
      toast("存檔讀不了");
      return false;
    }
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

  el.textbox.addEventListener("pointerup", (e) => {
    e.stopPropagation();
    advance();
  });
  document.getElementById("stage").addEventListener("pointerup", (e) => {
    if (e.target.closest("button, #quick, #choices, #textbox, #title, #about, #log")) return;
    advance();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!el.log.hidden) {
        el.log.hidden = true;
        state.screen = state.playing ? (el.choices.hidden ? "play" : "choice") : "title";
        return;
      }
      if (!el.about.hidden) { showTitle(); return; }
      showTitle();
      return;
    }
    if (e.key === "Control") state.skip = true;
    if (state.screen !== "play") return;
    if (e.key === " " || e.key === "Enter" || e.key === "z" || e.key === "Z") {
      e.preventDefault();
      advance();
    }
  });
  document.addEventListener("keyup", (e) => {
    if (e.key === "Control") state.skip = false;
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
    }
    if (act === "skip") {
      state.skip = !state.skip;
      btn.classList.toggle("on", state.skip);
      if (state.skip && state.typing) showFull();
    }
    if (act === "save") save();
    if (act === "title") showTitle();
  });

  onTap(document.getElementById("btn-start"), () => startGame(false));
  onTap(document.getElementById("btn-continue"), () => {
    if (load()) startGame(true);
  });
  onTap(document.getElementById("btn-about"), () => {
    el.title.hidden = true;
    el.about.hidden = false;
    state.screen = "about";
    setMenu(true);
  });
  onTap(document.getElementById("btn-about-back"), showTitle);
  onTap(document.getElementById("btn-log-close"), () => {
    el.log.hidden = true;
    state.screen = state.playing ? (el.choices.hidden ? "play" : "choice") : "title";
  });

  ["classroom","campus","mrt","room","dusk"].forEach((k) => {
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

  if (window.DemoAudio) window.DemoAudio.bind();
  showTitle();
})();
