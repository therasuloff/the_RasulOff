/* ==========================================================================
   BooYeahShop splash — React varianti.

   Eslatma: eng tez natija uchun splash'ni index.html ichiga qo'yish afzal
   (splash.html ga qarang) — u holda React bundle yuklanishini kutmaydi.
   Bu komponent ilova to'liq React bo'lgan holat uchun.

   Foydalanish:
     const [ready, setReady] = useState(false);
     ...
     {!ready && <BooYeahSplash progress={p} onDone={() => setReady(true)} />}
   ========================================================================== */

import { useEffect, useRef, useState } from 'react';
import './boyeah-splash.css';

/* Logotip yo'llari — brend fayllaridan vektorga o'girilgan */
import { MARK_VIEWBOX, BAG_PATH, HANDLE_PATH, HANDLE_W,
         WORD_VIEWBOX, WORD_A_PATH, WORD_B_PATH } from './boyeah-logo-paths.js';

const MUTE_KEY = 'bys:muted';
const OUT_MS = 420;

function haptic(kind) {
  try {
    const h = window.Telegram?.WebApp?.HapticFeedback;
    if (!h) return;
    if (kind === 'success') h.notificationOccurred('success');
    else h.impactOccurred(kind);
  } catch { /* haptika majburiy emas */ }
}

/** Splash ovozlari — WebAudio bilan sintez qilinadi, fayl yuklanmaydi. */
function useSfx(muted, reduced) {
  useEffect(() => {
    if (muted || reduced) return;

    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;

    let ctx;
    try { ctx = new AC(); } catch { return; }

    const master = ctx.createGain();
    master.gain.value = 0.16;
    master.connect(ctx.destination);
    ctx.resume?.().catch(() => {});

    const running = () => ctx.state === 'running';

    const env = (node, t0, a, hold, r, peak) => {
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(peak, t0 + a);
      g.gain.setValueAtTime(peak, t0 + a + hold);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + a + hold + r);
      node.connect(g);
      return g;
    };

    const whoosh = () => {
      if (!running()) return;
      const t0 = ctx.currentTime, dur = 0.42;
      const n = Math.floor(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, n, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.Q.value = 1.1;
      bp.frequency.setValueAtTime(320, t0);
      bp.frequency.exponentialRampToValueAtTime(1900, t0 + dur);
      src.connect(bp);
      env(bp, t0, 0.05, 0.08, dur - 0.13, 0.5).connect(master);
      src.start(t0);
      src.stop(t0 + dur + 0.05);
    };

    const pop = () => {
      if (!running()) return;
      const t0 = ctx.currentTime;
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(420, t0);
      o.frequency.exponentialRampToValueAtTime(130, t0 + 0.16);
      env(o, t0, 0.006, 0.02, 0.15, 0.75).connect(master);
      o.start(t0);
      o.stop(t0 + 0.22);
    };

    const chime = () => {
      if (!running()) return;
      const base = ctx.currentTime;
      const dly = ctx.createDelay(0.4);
      dly.delayTime.value = 0.11;
      const fb = ctx.createGain();
      fb.gain.value = 0.22;
      const wet = ctx.createGain();
      wet.gain.value = 0.3;
      dly.connect(fb); fb.connect(dly); dly.connect(wet); wet.connect(master);

      [1046.5, 1318.5, 1568.0].forEach((f, i) => {   // C6 · E6 · G6
        const t0 = base + i * 0.085;
        const o = ctx.createOscillator();
        o.type = 'triangle';
        o.frequency.setValueAtTime(f, t0);
        const g = env(o, t0, 0.012, 0.03, 0.42, 0.38);
        g.connect(master); g.connect(dly);
        o.start(t0);
        o.stop(t0 + 0.55);
      });
    };

    // Ovoz bloklangan bo'lsa, birinchi teginishda ochiladi
    const unlock = () => ctx.resume?.().catch(() => {});
    ['pointerdown', 'touchstart', 'keydown'].forEach(
      e => window.addEventListener(e, unlock, { once: true, passive: true }));

    const beats = [
      [160,  'light',   whoosh],
      [470,  'medium',  pop],
      [1040, 'success', chime],
    ];
    const ids = beats.map(([ms, h, fn]) => setTimeout(() => { haptic(h); fn(); }, ms));

    return () => {
      ids.forEach(clearTimeout);
      ['pointerdown', 'touchstart', 'keydown'].forEach(
        e => window.removeEventListener(e, unlock));
      try { ctx.close(); } catch { /* allaqachon yopilgan */ }
    };
  }, [muted, reduced]);
}

export default function BooYeahSplash({
  progress = null,          // 0..1, yoki null -> cheksiz harakat rejimi
  done = false,             // true bo'lganda chiqish animatsiyasi boshlanadi
  onDone,                   // chiqish tugagach chaqiriladi
  tagline = 'mini ilova',
  muted,
  safetyMs = 8000,          // ilova javob bermasa ham splash yopiladi
}) {
  const handleRef = useRef(null);
  const [leaving, setLeaving] = useState(false);
  const [theme, setTheme] = useState('dark');
  // foiz orqaga qaytmasin
  const peak = useRef(0);

  const reduced = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const isMuted = muted != null ? muted : (() => {
    try { return localStorage.getItem(MUTE_KEY) === '1'; } catch { return false; }
  })();

  useSfx(isMuted, reduced);

  /* dasta uzunligi — "chizilish" animatsiyasi aniq bo'lishi uchun */
  useEffect(() => {
    const el = handleRef.current;
    if (!el?.getTotalLength) return;
    try {
      el.ownerSVGElement.closest('.bys-splash')
        ?.style.setProperty('--bys-handle-len', el.getTotalLength().toFixed(2));
    } catch { /* CSS zaxira qiymati ishlaydi */ }
  }, []);

  /* Telegram mavzusi + orqa fon aylanishini to'xtatish */
  useEffect(() => {
    try {
      if (window.Telegram?.WebApp?.colorScheme === 'light') setTheme('light');
    } catch { /* Telegram tashqarisida ishlayapmiz */ }

    document.documentElement.classList.add('bys-locked');
    return () => document.documentElement.classList.remove('bys-locked');
  }, []);

  /* chiqish: done=true bo'lganda yoki xavfsizlik taymeri ishlaganda */
  useEffect(() => {
    if (!done) return;
    haptic('light');
    const a = setTimeout(() => setLeaving(true), reduced ? 0 : 140);
    const b = setTimeout(() => onDone?.(), (reduced ? 0 : 140) + OUT_MS);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [done, reduced, onDone]);

  useEffect(() => {
    if (safetyMs <= 0 || done) return;
    const id = setTimeout(() => { setLeaving(true); onDone?.(); }, safetyMs);
    return () => clearTimeout(id);
  }, [safetyMs, done, onDone]);

  const indeterminate = progress == null;
  if (!indeterminate) peak.current = Math.max(peak.current, Math.min(1, progress));
  const p = done ? 1 : peak.current;

  return (
    <div
      className="bys-splash"
      data-theme={theme}
      data-state={leaving ? 'out' : undefined}
      data-indeterminate={indeterminate ? 'true' : 'false'}
      style={{ '--bys-p': p.toFixed(3) }}
      role="status"
      aria-live="polite"
      aria-label="BooYeahShop yuklanmoqda"
    >
      <div className="bys-stage">
        <svg className="bys-mark" viewBox={MARK_VIEWBOX} aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="bysMarkGrad" x1="0" y1="0" x2="0.35" y2="1">
              <stop offset="0" stopColor="#FF8A2B" />
              <stop offset="0.55" stopColor="#FF6A13" />
              <stop offset="1" stopColor="#F25406" />
            </linearGradient>
            <linearGradient id="bysSheen" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.45" stopColor="#fff" stopOpacity="0.75" />
              <stop offset="0.55" stopColor="#fff" stopOpacity="0.75" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <clipPath id="bysBagClip"><path d={BAG_PATH} /></clipPath>
          </defs>

          <path
            ref={handleRef}
            className="bys-handle"
            d={HANDLE_PATH}
            fill="none"
            stroke="url(#bysMarkGrad)"
            strokeWidth={HANDLE_W}
            strokeLinecap="round"
          />
          <g className="bys-bag">
            <path className="bys-bag-body" d={BAG_PATH} fill="url(#bysMarkGrad)" fillRule="evenodd" />
            <g clipPath="url(#bysBagClip)">
              <rect className="bys-sheen" x="-60" y="-20" width="46" height="200"
                    fill="url(#bysSheen)" transform="rotate(18 0 0)" />
            </g>
          </g>
        </svg>

        <svg className="bys-word" viewBox={WORD_VIEWBOX} aria-hidden="true" focusable="false">
          <path className="bys-word-a" d={WORD_A_PATH} fill="currentColor" fillRule="evenodd" />
          <path className="bys-word-b" d={WORD_B_PATH} fill="#FF6A13" fillRule="evenodd" />
        </svg>

        {tagline && <div className="bys-tagline">{tagline}</div>}

        <div className="bys-progress"><div className="bys-progress-bar" /></div>
      </div>
    </div>
  );
}
