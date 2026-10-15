/* ==========================================================================
   BooYeahShop — yuklanish (splash) ekrani boshqaruvi
   - Ovozlar WebAudio bilan sintez qilinadi (hech qanday fayl yuklanmaydi)
   - Telegram Mini App haptikasi ovoz o'chiq bo'lsa ham ishlaydi
   - Hech qachon ilovani ushlab qolmaydi: xavfsizlik taymeri bor

   Foydalanish:
     BooYeahSplash.setProgress(0.4);   // 0..1
     await BooYeahSplash.hide();       // ilova tayyor bo'lganda
   ========================================================================== */

(function (global) {
  'use strict';

  var SELECTOR = '.bys-splash';
  var MUTE_KEY = 'bys:muted';

  /* ---------------------------------------------------------------- ovoz -- */

  /**
   * Kichik WebAudio sintezatori. Audio fayllar yo'q — shuning uchun
   * splash hech narsa kutmaydi va og'irligi ~0 kB.
   */
  function Sfx() {
    this.ctx = null;
    this.master = null;
    this.ready = false;
  }

  Sfx.prototype.init = function () {
    if (this.ctx) return this.ctx;
    var AC = global.AudioContext || global.webkitAudioContext;
    if (!AC) return null;
    try {
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      // atayin past: splash ovozi "ishora" bo'lishi kerak, shov-shuv emas
      this.master.gain.value = 0.16;
      this.master.connect(this.ctx.destination);
      this.ready = true;
    } catch (e) {
      this.ctx = null;
    }
    return this.ctx;
  };

  Sfx.prototype.resume = function () {
    var ctx = this.init();
    if (ctx && ctx.state === 'suspended') {
      // Telegram webview'da ko'pincha "suspended" bo'ladi — urinib ko'ramiz,
      // bo'lmasa jimgina o'tkazib yuboramiz (haptika baribir ishlaydi).
      var p = ctx.resume();
      if (p && p.catch) p.catch(function () {});
    }
    return ctx && ctx.state === 'running';
  };

  Sfx.prototype._env = function (node, t0, attack, hold, release, peak) {
    var g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + attack);
    g.gain.setValueAtTime(peak, t0 + attack + hold);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + hold + release);
    node.connect(g);
    return g;
  };

  Sfx.prototype._noise = function (dur) {
    var n = Math.max(1, Math.floor(this.ctx.sampleRate * dur));
    var buf = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    var src = this.ctx.createBufferSource();
    src.buffer = buf;
    return src;
  };

  /** Dasta chizilganda: yengil "shuvillash". */
  Sfx.prototype.whoosh = function (delay, up) {
    if (!this.ready || this.ctx.state !== 'running') return;
    var t0 = this.ctx.currentTime + (delay || 0);
    var dur = 0.42;
    var src = this._noise(dur);
    var bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 1.1;
    bp.frequency.setValueAtTime(up ? 320 : 1500, t0);
    bp.frequency.exponentialRampToValueAtTime(up ? 1900 : 300, t0 + dur);
    src.connect(bp);
    var g = this._env(bp, t0, 0.05, 0.08, dur - 0.13, 0.5);
    g.connect(this.master);
    src.start(t0);
    src.stop(t0 + dur + 0.05);
  };

  /** Sumka joyiga tushganda: yumshoq "pop". */
  Sfx.prototype.pop = function (delay) {
    if (!this.ready || this.ctx.state !== 'running') return;
    var t0 = this.ctx.currentTime + (delay || 0);
    var o = this.ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(420, t0);
    o.frequency.exponentialRampToValueAtTime(130, t0 + 0.16);
    var g = this._env(o, t0, 0.006, 0.02, 0.15, 0.75);
    g.connect(this.master);
    o.start(t0);
    o.stop(t0 + 0.22);
  };

  /** Nom paydo bo'lganda: iliq uch nota (brend "jingalagi"). */
  Sfx.prototype.chime = function (delay) {
    if (!this.ready || this.ctx.state !== 'running') return;
    var base = this.ctx.currentTime + (delay || 0);
    var notes = [1046.5, 1318.5, 1568.0]; // C6 · E6 · G6
    var self = this;

    // kichik "xona" effekti — jarangni iliq qiladi
    var dly = this.ctx.createDelay(0.4);
    dly.delayTime.value = 0.11;
    var fb = this.ctx.createGain();
    fb.gain.value = 0.22;
    var wet = this.ctx.createGain();
    wet.gain.value = 0.3;
    dly.connect(fb);
    fb.connect(dly);
    dly.connect(wet);
    wet.connect(this.master);

    notes.forEach(function (f, i) {
      var t0 = base + i * 0.085;
      var o = self.ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.setValueAtTime(f, t0);
      var g = self._env(o, t0, 0.012, 0.03, 0.42, 0.38);
      g.connect(self.master);
      g.connect(dly);
      o.start(t0);
      o.stop(t0 + 0.55);
    });
  };

  /* ------------------------------------------------------------ haptika -- */

  function haptic(kind) {
    try {
      var h = global.Telegram &&
              global.Telegram.WebApp &&
              global.Telegram.WebApp.HapticFeedback;
      if (!h) return;
      if (kind === 'success') h.notificationOccurred('success');
      else h.impactOccurred(kind || 'light');
    } catch (e) { /* haptika majburiy emas */ }
  }

  /* ------------------------------------------------------------- splash -- */

  function Splash(el, opts) {
    opts = opts || {};
    this.el = el;
    this.sfx = new Sfx();
    this.hidden = false;
    this.progress = 0;
    this._timers = [];

    this.muted = opts.muted != null ? !!opts.muted : readMuted();
    this.reduced = global.matchMedia
      ? global.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

    // Ilova javob bermay qolsa ham splash abadiy turib qolmasin.
    this.safetyMs = opts.safetyMs != null ? opts.safetyMs : 8000;

    this._setup();
  }

  function readMuted() {
    try { return global.localStorage.getItem(MUTE_KEY) === '1'; }
    catch (e) { return false; }
  }

  Splash.prototype._setup = function () {
    var self = this;

    // Splash turganda orqadagi sahifa aylanmasin
    document.documentElement.classList.add('bys-locked');

    // Dasta uzunligini o'lchab, "chizilish" animatsiyasini aniq qilamiz.
    var handle = this.el.querySelector('.bys-handle');
    if (handle && handle.getTotalLength) {
      try {
        var len = handle.getTotalLength();
        this.el.style.setProperty('--bys-handle-len', len.toFixed(2));
      } catch (e) { /* ba'zi webview'larda o'lchab bo'lmaydi — CSS zaxirasi ishlaydi */ }
    }

    // Telegram mavzusiga moslashish
    try {
      var tg = global.Telegram && global.Telegram.WebApp;
      if (tg && tg.colorScheme === 'light') this.el.dataset.theme = 'light';
    } catch (e) {}

    if (!this.muted && !this.reduced) this._playSequence();

    // Ovoz bloklangan bo'lsa — birinchi teginishda ochiladi (keyingi ochilishlar uchun)
    this._unlock = function () { self.sfx.resume(); };
    ['pointerdown', 'touchstart', 'keydown'].forEach(function (ev) {
      global.addEventListener(ev, self._unlock, { once: true, passive: true });
    });

    if (this.safetyMs > 0) {
      this._timers.push(setTimeout(function () { self.hide(); }, this.safetyMs));
    }
  };

  Splash.prototype._playSequence = function () {
    var self = this;
    var running = this.sfx.resume();

    // Haptika ovozdan mustaqil — Telegram'da deyarli har doim ishlaydi.
    var beats = [
      [160,  'light',   function () { if (running) self.sfx.whoosh(0, true); }],
      [470,  'medium',  function () { if (running) self.sfx.pop(0); }],
      [1040, 'success', function () { if (running) self.sfx.chime(0); }]
    ];

    beats.forEach(function (b) {
      self._timers.push(setTimeout(function () {
        haptic(b[1]);
        b[2]();
      }, b[0]));
    });
  };

  /** Yuklanish foizini ko'rsatadi. 0..1 */
  Splash.prototype.setProgress = function (p) {
    if (this.hidden) return;
    p = Math.max(0, Math.min(1, Number(p) || 0));
    // orqaga qaytmasin — foiz faqat oldinga yuradi
    if (p < this.progress) p = this.progress;
    this.progress = p;
    this.el.dataset.indeterminate = 'false';
    this.el.style.setProperty('--bys-p', p.toFixed(3));
  };

  /** Aniq foiz noma'lum bo'lsa — cheksiz harakat rejimi. */
  Splash.prototype.indeterminate = function () {
    if (this.hidden) return;
    this.el.dataset.indeterminate = 'true';
  };

  /** Splash'ni yopadi. Animatsiya tugaganda Promise bajariladi. */
  Splash.prototype.hide = function () {
    var self = this;
    if (this.hidden) return Promise.resolve();
    this.hidden = true;

    this._timers.forEach(clearTimeout);
    this._timers = [];
    global.removeEventListener('pointerdown', this._unlock);
    global.removeEventListener('touchstart', this._unlock);
    global.removeEventListener('keydown', this._unlock);

    this.setProgress(1);
    haptic('light');
    if (!this.muted && !this.reduced) this.sfx.whoosh(0.02, false);

    return new Promise(function (resolve) {
      // Chiqish animatsiyasi boshlanishidan oldin foiz 100% ga yetib ulgursin.
      setTimeout(function () {
        self.el.dataset.state = 'out';
        setTimeout(function () {
          if (self.el.parentNode) self.el.parentNode.removeChild(self.el);
          try {
            if (self.sfx.ctx && self.sfx.ctx.close) self.sfx.ctx.close();
          } catch (e) {}
          document.documentElement.classList.remove('bys-locked');
          resolve();
        }, 420);
      }, self.reduced ? 0 : 140);
    });
  };

  /** Ovozni yoqish/o'chirish (tanlov eslab qolinadi). */
  Splash.prototype.setMuted = function (m) {
    this.muted = !!m;
    try { global.localStorage.setItem(MUTE_KEY, this.muted ? '1' : '0'); }
    catch (e) {}
  };

  /* ------------------------------------------------------------- umumiy -- */

  var instance = null;

  function mount(opts) {
    var el = document.querySelector(SELECTOR);
    if (!el) return null;
    // Mavjud nusxa hali ekranda bo'lsa — o'shani qaytaramiz.
    // (Element DOM'dan olib tashlangan bo'lsa, yangisini yaratamiz.)
    if (instance && !instance.hidden && instance.el === el &&
        document.contains(instance.el)) {
      return instance;
    }
    instance = new Splash(el, opts);
    return instance;
  }

  var api = {
    /** Mavjud splash elementini ishga tushiradi (odatda avtomatik chaqiriladi). */
    mount: mount,

    setProgress: function (p) { if (instance) instance.setProgress(p); },
    indeterminate: function () { if (instance) instance.indeterminate(); },
    setMuted: function (m) { if (instance) instance.setMuted(m); },

    /** Ilova tayyor bo'lganda chaqiring. */
    hide: function () { return instance ? instance.hide() : Promise.resolve(); },

    get isVisible() { return !!instance && !instance.hidden; }
  };

  // Hujjat tayyor bo'lishi bilan o'zi ishga tushadi.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { mount(); });
  } else {
    mount();
  }

  global.BooYeahSplash = api;

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : this);
