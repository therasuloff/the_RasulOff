"""
60 soniyalik fon musiqasi — 120 BPM, A-minor.
110 emas 120: sahna chegaralari butun soniyalarda, 120 BPM da ular
zarbga aniq tushadi (brif 7-bo'lim talabi).
Bu ORINBOSAR trek: sintez qilingan, litsenziyasi toza, lekin tirik
yozilgan trek o'rnini bosmaydi. Haqiqiy trek topilsa, shuni almashtiring.

Ishga tushirish:  python3 skript/musiqa-yasash.py
"""
import math
import wave
from pathlib import Path

import numpy as np

SR = 48000
BPM = 120
ZARB = 60.0 / BPM            # bir zarb = 0.5454 s
BAR = ZARB * 4               # bir takt  = 2.1818 s
DAVOMIYLIK = 60.0
CHIQISH = Path(__file__).resolve().parent.parent / "public" / "ovoz"
CHIQISH.mkdir(parents=True, exist_ok=True)

rng = np.random.default_rng(1109)
N = int(SR * DAVOMIYLIK)


def nota(ism):
    """Nota nomidan chastota (A4 = 440 Hz)."""
    qadamlar = {"C": -9, "D": -7, "E": -5, "F": -4, "G": -2, "A": 0, "B": 2}
    harf, oxiri = ism[0], ism[1:]
    belgi = 0
    if oxiri and oxiri[0] in "#b":
        belgi = 1 if oxiri[0] == "#" else -1
        oxiri = oxiri[1:]
    oktava = int(oxiri)
    yarim = qadamlar[harf] + belgi + (oktava - 4) * 12
    return 440.0 * (2 ** (yarim / 12))


def past_filtr(x, kesim):
    kesim = np.asarray(kesim, dtype=float)
    if kesim.ndim == 0:
        kesim = np.full(len(x), float(kesim))
    a = 1.0 - np.exp(-2.0 * math.pi * np.clip(kesim, 25, SR / 2.2) / SR)
    y = np.empty_like(x)
    oldingi = 0.0
    for i in range(len(x)):
        oldingi += a[i] * (x[i] - oldingi)
        y[i] = oldingi
    return y


def yuqori_filtr(x, kesim):
    return x - past_filtr(x, kesim)


def arra(chastota, n, detune=0.0):
    """Yumshoq arra to'lqini — bir nechta oberton yig'indisi."""
    x = np.arange(n) / SR
    chiq = np.zeros(n)
    for k in range(1, 9):
        chiq += np.sin(2 * math.pi * chastota * (1 + detune) * k * x) / k
    return chiq / 2.2


def qoy(bufer, signal, boshlanish_sek, kuch=1.0):
    i = int(SR * boshlanish_sek)
    if i >= len(bufer):
        return
    s = signal[: len(bufer) - i]
    bufer[i : i + len(s)] += s * kuch


# ── akkord ketma-ketligi: Am7 · Fmaj7 · Cmaj7 · G  (4 taktda aylanadi)
AKKORDLAR = [
    ["A3", "C4", "E4", "G4"],
    ["F3", "A3", "C4", "E4"],
    ["C3", "E3", "G3", "B3"],
    ["G3", "B3", "D4", "F4"],
]
ILDIZ = ["A1", "F1", "C2", "G1"]

pad = np.zeros(N)
bas = np.zeros(N)
hat = np.zeros(N)
pluck = np.zeros(N)

taktlar = int(DAVOMIYLIK / BAR) + 1

for takt in range(taktlar):
    vaqt = takt * BAR
    if vaqt >= DAVOMIYLIK:
        break
    akkord = AKKORDLAR[takt % 4]

    # aranjirovka: qaysi takt qaysi sahnaga to'g'ri kelishi
    boshlanish = takt < 2              # 0–4 s: ilmoq — faqat pad
    tinchlik = 17 <= takt < 20        # 34–40 s: AI Ustoz — nafas olish joyi
    yakun = takt >= taktlar - 3

    # ── PAD: uzun, yumshoq, sekin ochiladigan filtr
    n = int(SR * BAR * 1.15)
    ovoz = np.zeros(n)
    for j, ism in enumerate(akkord):
        f = nota(ism)
        ovoz += arra(f, n, detune=0.004 * (j - 1.5))
        ovoz += arra(f, n, detune=-0.004 * (j - 1.5)) * 0.7
    ovoz /= len(akkord) * 1.7
    x = np.arange(n) / SR
    konvert = (1 - np.exp(-x * 5.5)) * np.exp(-np.maximum(0, x - BAR * 0.75) * 3.2)
    ochilish = 520 + 900 * (takt / max(1, taktlar - 1)) + 260 * np.sin(x * 1.5)
    ovoz = past_filtr(ovoz * konvert, ochilish)
    qoy(pad, ovoz, vaqt, 0.5 if boshlanish else (0.34 if tinchlik else 0.62))

    if boshlanish or tinchlik:
        continue

    # ── BAS: 1 va 3-zarbda sub sinus
    for zarb_i in (0, 2):
        d = ZARB * 1.6
        nn = int(SR * d)
        xx = np.arange(nn) / SR
        f = nota(ILDIZ[takt % 4])
        s = np.sin(2 * math.pi * f * xx) * np.exp(-xx * 2.6)
        s += np.sin(2 * math.pi * f * 2 * xx) * np.exp(-xx * 5.0) * 0.28
        qoy(bas, s, vaqt + zarb_i * ZARB, 0.80)

    # ── HAT: 8-liklarda nozik shovqin
    for s8 in range(8):
        d = 0.075
        nn = int(SR * d)
        xx = np.arange(nn) / SR
        kuch = 0.34 if s8 % 2 else 0.2
        h = yuqori_filtr(rng.uniform(-1, 1, nn), 7200) * np.exp(-xx * 95)
        qoy(hat, h, vaqt + s8 * ZARB / 2, kuch)

    # ── PLUCK: akkord notalaridan arpejio (yakunda zichroq)
    naqsh = [0, 2, 1, 3, 2, 0] if not yakun else [0, 1, 2, 3, 2, 1, 3, 2]
    for k, idx in enumerate(naqsh):
        d = 0.5
        nn = int(SR * d)
        xx = np.arange(nn) / SR
        f = nota(akkord[idx % len(akkord)]) * 2
        s = (np.sin(2 * math.pi * f * xx) + 0.3 * np.sin(2 * math.pi * f * 2 * xx))
        s *= np.exp(-xx * 11)
        qoy(pluck, s, vaqt + k * ZARB / 2, 0.20 if not yakun else 0.26)

aralash = pad * 0.52 + bas * 0.62 + hat * 0.30 + pluck * 0.34

# yumshoq kompressiya va umumiy filtr
aralash = np.tanh(aralash * 1.25) / np.tanh(1.25)
aralash = past_filtr(aralash, 12000)

# boshida ochilish, oxirida yopilish
kir = int(SR * 1.2)
chiq = int(SR * 2.4)
aralash[:kir] *= np.linspace(0, 1, kir) ** 1.5
aralash[-chiq:] *= np.linspace(1, 0, chiq) ** 1.4

cho = np.max(np.abs(aralash))
aralash = aralash / cho * 0.52  # ovoz ustiga tushishi uchun past darajada

pcm = (np.clip(np.stack([aralash, aralash], axis=1), -1, 1) * 32767).astype("<i2")
yol = CHIQISH / "musiqa.wav"
with wave.open(str(yol), "wb") as f:
    f.setnchannels(2)
    f.setsampwidth(2)
    f.setframerate(SR)
    f.writeframes(pcm.tobytes())
print(f"musiqa.wav — {len(aralash)/SR:.2f}s, {BPM} BPM")
