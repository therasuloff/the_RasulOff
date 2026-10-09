"""
AI CRM Reels uchun sound effect kiti.
Hammasi shu yerda sintez qilinadi — tashqi fayl yoki tarmoq kerak emas,
shuning uchun litsenziya masalasi ham yo'q.

Ishga tushirish:  python3 skript/ovoz-yasash.py
"""
import math
import wave
from pathlib import Path

import numpy as np

SR = 48000
CHIQISH = Path(__file__).resolve().parent.parent / "public" / "ovoz"
CHIQISH.mkdir(parents=True, exist_ok=True)

rng = np.random.default_rng(20261009)


def t(davomiylik):
    return np.linspace(0, davomiylik, int(SR * davomiylik), endpoint=False)


def shovqin(davomiylik):
    return rng.uniform(-1, 1, int(SR * davomiylik))


def past_filtr(x, kesim):
    """Bir polyusli past o'tkazuvchi filtr; kesim skalyar yoki massiv."""
    kesim = np.asarray(kesim, dtype=float)
    if kesim.ndim == 0:
        kesim = np.full(len(x), float(kesim))
    a = 1.0 - np.exp(-2.0 * math.pi * np.clip(kesim, 20, SR / 2.2) / SR)
    y = np.empty_like(x)
    oldingi = 0.0
    for i in range(len(x)):
        oldingi += a[i] * (x[i] - oldingi)
        y[i] = oldingi
    return y


def yuqori_filtr(x, kesim):
    return x - past_filtr(x, kesim)


def konvert(davomiylik, hujum=0.004, susayish=None, kuch=2.2):
    """Tez hujum, eksponensial susayish."""
    n = int(SR * davomiylik)
    susayish = susayish if susayish is not None else davomiylik - hujum
    h = int(SR * hujum)
    s = max(1, n - h)
    return np.concatenate([
        np.linspace(0, 1, h) ** 0.6,
        np.exp(-np.linspace(0, kuch * 3, s)),
    ])[:n]


def qongiroq(davomiylik, chastota, susayish=2.4):
    """Qo'ng'iroq tovushi — nomutanosib obertonlar bilan."""
    x = t(davomiylik)
    qismlar = [(1.0, 1.0), (2.76, 0.45), (5.40, 0.22), (8.93, 0.11)]
    chiq = np.zeros_like(x)
    for nisbat, kuch in qismlar:
        chiq += kuch * np.sin(2 * math.pi * chastota * nisbat * x) * np.exp(
            -x * susayish * (0.7 + nisbat * 0.22)
        )
    return chiq / len(qismlar)


def aks_sado(x, taxlar=((0.031, 0.34), (0.047, 0.26), (0.071, 0.18), (0.101, 0.11))):
    """Oddiy xona akustikasi — bir nechta kechikish."""
    chiq = x.copy()
    for kechikish, kuch in taxlar:
        n = int(SR * kechikish)
        qoshimcha = np.zeros(len(x) + n)
        qoshimcha[n:] = x * kuch
        chiq = np.pad(chiq, (0, max(0, len(qoshimcha) - len(chiq))))
        chiq[: len(qoshimcha)] += qoshimcha
    return chiq


def yumshoq_kesish(x, daraja=1.6):
    return np.tanh(x * daraja) / np.tanh(daraja)


def saqla(nom, x, balandlik=0.82, stereo_keng=0.0):
    x = np.asarray(x, dtype=float)
    cho = np.max(np.abs(x))
    if cho > 0:
        x = x / cho * balandlik
    # chetlarini yumshatish — shiqillash bo'lmasin
    q = min(240, len(x) // 8)
    if q > 4:
        x[:q] *= np.linspace(0, 1, q)
        x[-q:] *= np.linspace(1, 0, q)
    if stereo_keng > 0:
        n = int(SR * stereo_keng)
        chap = np.pad(x, (0, n))
        ong = np.pad(x, (n, 0))
    else:
        chap = ong = x
    ramka = np.stack([chap, ong], axis=1)
    pcm = np.clip(ramka, -1, 1)
    pcm = (pcm * 32767).astype("<i2")
    yol = CHIQISH / nom
    with wave.open(str(yol), "wb") as f:
        f.setnchannels(2)
        f.setsampwidth(2)
        f.setframerate(SR)
        f.writeframes(pcm.tobytes())
    print(f"  · {nom}  {len(x)/SR:.2f}s")


# ─────────────────────────────── ovozlar ───────────────────────────────

def whoosh():
    """Sahna almashuvi — havo kesib o'tish."""
    d = 0.52
    x = t(d)
    kesim = 500 + 5200 * np.sin(np.pi * x / d) ** 1.6
    n = past_filtr(shovqin(d), kesim)
    n = yuqori_filtr(n, 260)
    zarb = np.sin(np.pi * x / d) ** 2.1
    return n * zarb


def bosish():
    """UI bosilishi — qisqa va aniq."""
    d = 0.11
    x = t(d)
    ping = np.sin(2 * math.pi * 2100 * x) * np.exp(-x * 90)
    past = np.sin(2 * math.pi * 780 * x) * np.exp(-x * 60) * 0.5
    sh = yuqori_filtr(shovqin(d), 2600) * np.exp(-x * 160) * 0.55
    return ping + past + sh


def zarba():
    """Ilmoq oxiri — jadval qulaganda."""
    d = 0.95
    x = t(d)
    chastota = 135 * np.exp(-x * 7.5) + 38
    bosh = np.sin(2 * math.pi * np.cumsum(chastota) / SR) * np.exp(-x * 3.4)
    gursillash = past_filtr(shovqin(d), 900) * np.exp(-x * 9.5) * 0.7
    return yumshoq_kesish(bosh * 1.25 + gursillash, 1.9)


def koterilish():
    """Logotipdan oldingi ko'tarilish."""
    d = 1.35
    x = t(d)
    p = x / d
    kesim = 220 * (1 - p) + 9000 * p ** 2.4
    n = past_filtr(shovqin(d), kesim) * (p ** 1.8)
    ton = np.sin(2 * math.pi * np.cumsum(190 + 880 * p ** 2.2) / SR) * (p ** 2.6) * 0.42
    return n + ton


def jaranglash():
    """Logotip paydo bo'lganda — ikki nota."""
    d = 1.6
    a = qongiroq(d, 880, 2.2)
    ikki = np.zeros_like(a)
    sur = int(SR * 0.17)
    b = qongiroq(d, 1318.5, 2.4)[: len(a) - sur]
    ikki[sur:] = b * 0.72
    xom = a + ikki
    return aks_sado(xom)[: int(SR * 2.1)]


def pop():
    """Kartochka chiqishi."""
    d = 0.2
    x = t(d)
    chastota = 420 + 620 * (1 - np.exp(-x * 42))
    ton = np.sin(2 * math.pi * np.cumsum(chastota) / SR) * konvert(d, 0.003, kuch=3.4)
    return ton + yuqori_filtr(shovqin(d), 3200) * np.exp(-x * 120) * 0.22


def halqa():
    """AI Ustoz — ovoz halqasi tarqalishi (yumshoq, takrorlanadi)."""
    d = 0.75
    x = t(d)
    ton = (
        np.sin(2 * math.pi * 660 * x) * 0.6
        + np.sin(2 * math.pi * 990 * x) * 0.3
        + np.sin(2 * math.pi * 1320 * x) * 0.14
    )
    zarb = np.sin(np.pi * x / d) ** 1.7
    return aks_sado(ton * zarb, taxlar=((0.04, 0.3), (0.082, 0.18)))[: int(SR * 0.95)]


def boyoq():
    """Brend rangi almashuvi — yorqinroq sweep."""
    d = 0.78
    x = t(d)
    p = x / d
    kesim = 900 + 7200 * p ** 1.5
    n = past_filtr(shovqin(d), kesim)
    n = yuqori_filtr(n, 500)
    return n * (np.sin(np.pi * p) ** 1.4)


def urgu():
    """Urg'u halqasi paydo bo'lganda — nozik 'ding'."""
    d = 0.6
    return qongiroq(d, 1760, 4.2) * 0.8


if __name__ == "__main__":
    print("Sound effect kiti yasalmoqda:")
    saqla("whoosh.wav", whoosh(), 0.72, stereo_keng=0.004)
    saqla("bosish.wav", bosish(), 0.62)
    saqla("zarba.wav", zarba(), 0.90)
    saqla("koterilish.wav", koterilish(), 0.70)
    saqla("jaranglash.wav", jaranglash(), 0.70, stereo_keng=0.006)
    saqla("pop.wav", pop(), 0.55)
    saqla("halqa.wav", halqa(), 0.42)
    saqla("boyoq.wav", boyoq(), 0.66, stereo_keng=0.005)
    saqla("urgu.wav", urgu(), 0.40)
    print("Tayyor →", CHIQISH)
