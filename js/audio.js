window.DemoAudio = (() => {
  const KEY = "liuhe-demo-audio";
  const tracks = {
    title: "assets/audio/title.wav",
    classroom: "assets/audio/classroom.wav",
    campus: "assets/audio/campus.wav",
    room: "assets/audio/room.wav",
    mrt: "assets/audio/mrt.wav",
    hush: "assets/audio/hush.wav",
    long: "assets/audio/long.wav"
  };
  const sfx = {
    click: "assets/audio/se_click.wav",
    choice: "assets/audio/se_choice.wav",
    start: "assets/audio/se_start.wav"
  };

  const localHost = /^(localhost|127\.0\.0\.1)$/.test(location.hostname)
    || location.protocol === "file:"
    || /trycloudflare\.com$/.test(location.hostname);
  const useFiles = localHost;

  const bgmOn = { value: true };
  const seOn = { value: true };
  let unlocked = false;
  let current = "";
  let ctx = null;
  let master = null;
  let seGain = null;
  let synthNodes = [];
  let synthTimer = null;
  const pool = {};
  const sePool = {};

  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(KEY) || "{}");
      if (typeof d.bgm === "boolean") bgmOn.value = d.bgm;
      if (typeof d.se === "boolean") seOn.value = d.se;
    } catch (_) { /* keep */ }
  }
  function persist() {
    localStorage.setItem(KEY, JSON.stringify({ bgm: bgmOn.value, se: seOn.value }));
  }

  function midi(n) { return 440 * Math.pow(2, (n - 69) / 12); }

  function ensureCtx() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.22;
    master.connect(ctx.destination);
    seGain = ctx.createGain();
    seGain.gain.value = 0.28;
    seGain.connect(ctx.destination);
    return ctx;
  }

  function beep(freq, dur, type, vol) {
    const c = ensureCtx();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type || "sine";
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, c.currentTime);
    g.gain.exponentialRampToValueAtTime(vol || 0.2, c.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
    o.connect(g);
    g.connect(seGain);
    o.start();
    o.stop(c.currentTime + dur + 0.02);
  }

  function stopSynth() {
    clearInterval(synthTimer);
    synthTimer = null;
    synthNodes.forEach((n) => { try { n.stop(); } catch (_) { /* */ } });
    synthNodes = [];
  }

  function playSynth(name) {
    const c = ensureCtx();
    stopSynth();
    const presets = {
      title: { bpm: 70, chords: [[48, 55, 59, 64], [53, 57, 60, 65], [48, 55, 59, 64], [46, 53, 58, 62]] },
      classroom: { bpm: 78, chords: [[55, 59, 62, 67], [52, 59, 62, 67], [50, 57, 62, 66], [55, 59, 62, 67]] },
      campus: { bpm: 84, chords: [[50, 57, 61, 66], [47, 54, 59, 63], [45, 52, 57, 61], [50, 57, 61, 66]] },
      room: { bpm: 64, chords: [[45, 52, 55, 60], [43, 50, 55, 58], [41, 48, 53, 57], [43, 50, 55, 58]] },
      mrt: { bpm: 68, chords: [[42, 49, 54], [40, 47, 52], [42, 49, 56], [40, 47, 54]] },
      hush: { bpm: 56, chords: [[48, 55, 59], [46, 53, 57], [48, 55, 59], [46, 53, 57]] },
      long: { bpm: 92, chords: [[53, 57, 60, 65], [48, 55, 60, 64], [50, 57, 62, 65], [53, 57, 60, 65]] }
    };
    const p = presets[name] || presets.title;
    const beat = 60 / p.bpm;
    let step = 0;
    function chord() {
      if (!bgmOn.value) return;
      const notes = p.chords[step % p.chords.length];
      notes.forEach((n, i) => {
        const o = c.createOscillator();
        const g = c.createGain();
        o.type = i === 0 ? "sine" : "triangle";
        o.frequency.value = midi(n);
        g.gain.setValueAtTime(0.0001, c.currentTime);
        g.gain.exponentialRampToValueAtTime(0.045 / notes.length + 0.02, c.currentTime + 0.08);
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + beat * 3.6);
        o.connect(g);
        g.connect(master);
        o.start();
        o.stop(c.currentTime + beat * 4);
        synthNodes.push(o);
      });
      step += 1;
    }
    chord();
    synthTimer = setInterval(chord, beat * 4);
  }

  function makeLoop(src) {
    const a = new Audio(src);
    a.loop = true;
    a.preload = "auto";
    a.volume = 0;
    return a;
  }
  function ensure(name) {
    if (!pool[name] && tracks[name]) pool[name] = makeLoop(tracks[name]);
    return pool[name];
  }
  function seEl(name) {
    if (!sePool[name] && sfx[name]) {
      const a = new Audio(sfx[name]);
      a.preload = "auto";
      sePool[name] = a;
    }
    return sePool[name];
  }

  function unlock() {
    if (unlocked) return;
    unlocked = true;
    if (useFiles) {
      Object.keys(tracks).forEach(ensure);
      Object.keys(sfx).forEach(seEl);
      Object.values(pool).forEach((a) => {
        const p = a.play();
        if (p && p.catch) p.catch(() => {});
        a.pause();
        a.currentTime = 0;
      });
    } else {
      ensureCtx();
      if (ctx && ctx.resume) ctx.resume();
    }
  }

  function fadeTo(name, vol, ms) {
    const a = ensure(name);
    if (!a) return;
    const start = a.volume;
    const t0 = performance.now();
    function step(now) {
      const k = Math.min(1, (now - t0) / ms);
      a.volume = start + (vol - start) * k;
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function playBgm(name) {
    if (!name) return;
    unlock();
    if (!useFiles) {
      if (name === current && synthTimer) return;
      current = name;
      if (bgmOn.value) playSynth(name);
      return;
    }
    if (name === current) {
      if (bgmOn.value && pool[name] && pool[name].paused) pool[name].play().catch(() => {});
      return;
    }
    const next = ensure(name);
    if (!next) return;
    Object.entries(pool).forEach(([k, a]) => {
      if (k !== name && !a.paused) fadeTo(k, 0, 700);
    });
    setTimeout(() => {
      Object.entries(pool).forEach(([k, a]) => {
        if (k !== name) { a.pause(); a.volume = 0; }
      });
    }, 760);
    current = name;
    if (!bgmOn.value) return;
    next.volume = 0;
    next.play().catch(() => {});
    fadeTo(name, 0.42, 800);
  }

  function stopBgm() {
    stopSynth();
    Object.values(pool).forEach((a) => { a.pause(); a.volume = 0; });
    current = "";
  }

  function playSe(name) {
    if (!seOn.value) return;
    unlock();
    if (!useFiles) {
      if (name === "click") beep(880, 0.06, "sine", 0.18);
      else if (name === "choice") beep(660, 0.1, "triangle", 0.2);
      else beep(784, 0.18, "sine", 0.16);
      return;
    }
    const a = seEl(name);
    if (!a) return;
    try { a.currentTime = 0; a.volume = 0.45; a.play().catch(() => {}); } catch (_) { /* */ }
  }

  function setBgm(on) {
    bgmOn.value = on;
    persist();
    if (!on) {
      stopSynth();
      Object.values(pool).forEach((a) => a.pause());
    } else if (current) playBgm(current);
    syncButtons();
  }
  function setSe(on) { seOn.value = on; persist(); syncButtons(); }

  function syncButtons() {
    document.querySelectorAll("[data-audio='bgm']").forEach((b) => {
      b.textContent = bgmOn.value ? "音樂　開" : "音樂　關";
      b.classList.toggle("off", !bgmOn.value);
    });
    document.querySelectorAll("[data-audio='se']").forEach((b) => {
      b.textContent = seOn.value ? "音效　開" : "音效　關";
      b.classList.toggle("off", !seOn.value);
    });
  }

  let bound = false;
  function bind() {
    if (!bound) {
      bound = true;
      document.addEventListener("pointerdown", unlock, { once: true });
      document.addEventListener("click", (e) => {
        const b = e.target.closest("[data-audio]");
        if (!b) return;
        e.stopPropagation();
        if (b.dataset.audio === "bgm") setBgm(!bgmOn.value);
        if (b.dataset.audio === "se") setSe(!seOn.value);
      });
    }
    syncButtons();
  }

  function cueFrom(node, playing) {
    if (!playing) return playBgm("title");
    if (!node) return;
    if (node.sprite === "long") return playBgm("long");
    if (node.memory) return playBgm("hush");
    if (node.bg === undefined) return;
    playBgm({ classroom: "classroom", campus: "campus", mrt: "mrt", room: "room", dusk: "title", black: "hush" }[node.bg] || "hush");
  }

  load();
  return { unlock, playBgm, playSe, stopBgm, cueFrom, bind, setBgm, setSe, bgmOn, seOn };
})();
