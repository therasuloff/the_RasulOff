# AI CRM — Instagram Reels (Remotion)

Brifga (`brif/BRIEF.md`) asosan qurilgan 60 soniyalik vertikal video.
**1080×1920 · 9:16 · 30 fps · 1800 kadr.**

## Ishga tushirish

```bash
npm install
npm run studio     # brauzerda jonli tahrirlash (eng qulay yo'l)
npm run render     # out/aicrm-reels.mp4
```

Cloud konteynerda (Chrome yuklab olinmasin uchun):

```bash
npm run render:cloud
```

## Skrinshot qo'shish

1. Faylni `public/ekranlar/` ga brifdagi nom bilan qo'ying
   (masalan `05-reception-kassa.png`).
2. `npm run ekranlar` — ro'yxat yangilanadi.
3. Qayta render qiling.

Fayl hali yo'q bo'lsa, o'rniga "Skrinshot kutilmoqda" kartasi chiqadi va
render to'xtamaydi.

### Kerak bo'lgan fayllar

| Fayl | Sahna | Holat |
|---|---|---|
| 01-kutib-olish.png | — (zaxira) | bor |
| 02-kirish.png | — (zaxira) | bor |
| 03-direktor-asosiy.png | Direktor | bor |
| 04-reception-bugun.png | Reception | bor |
| 05-reception-kassa.png | Reception | **kerak** |
| 08-oqituvchi-davomat.png | O'qituvchi | **kerak** |
| 10-oqituvchi-oyligim.png | O'qituvchi | **kerak** |
| 11-oquvchi-asosiy.png | AI Ustoz, Ota-ona | **kerak** |
| 12-ai-ustoz.png | AI Ustoz | **kerak** |
| 15-kompyuter-direktor.png | Direktor | **kerak** |
| 16-kompyuter-reception.png | Brend rangi | **kerak** |
| 17-kompyuter-qizil-brend.png | Brend rangi | **kerak** |
| 19-kompyuter-jadval.png | Jadval | **kerak** |

## Ovoz

Hamma effekt va musiqa shu yerda sintez qilinadi — tashqi fayl yuklanmaydi,
shuning uchun mualliflik huquqi masalasi yo'q.

```bash
python3 skript/ovoz-yasash.py      # effektlar → public/ovoz/*.wav
python3 skript/musiqa-yasash.py    # fon musiqasi → public/ovoz/musiqa.wav
ffmpeg -i public/ovoz/musiqa.wav -c:a aac -b:a 160k public/ovoz/musiqa.m4a
```

Effektlar `src/Ovoz.tsx` dagi `EFFEKTLAR` ro'yxatida kadr bo'yicha
joylashtirilgan — animatsiya bilan bir kadrda turadi. Vaqtini o'zgartirsangiz,
sahnadagi animatsiya kadrini ham o'zgartiring.

**Musiqa 120 BPM** (brifdagi 100–120 oralig'ida). Sahna chegaralari butun
soniyalarda, 120 BPM da takt 2 soniya — shuning uchun almashuvlar zarbga
aniq tushadi. BPM ni o'zgartirsangiz bu moslik buziladi.

Sintez qilingan trek tirik yozilganining o'rnini bosmaydi — yaxshisi topilsa,
`public/ovoz/musiqa.m4a` ni almashtiring, boshqa hech narsa o'zgarmaydi.

### Diktor ovozi

`public/ovoz/diktor.mp3` (yoki `.wav`/`.m4a`) qo'ying va `npm run ekranlar`
ishga tushiring. Loyiha uni o'zi topadi va fon musiqasini 42% ga pasaytiradi.
Matn `brif/BRIEF.md` ning 6-bo'limida.

Ovoz kelgach sahnalar vaqtini unga moslash kerak bo'lishi mumkin — vaqtlar
`src/brend.ts` dagi `SAHNALAR` da.

## Tuzilishi

```
src/
  brend.ts        brend ranglari, format, sahna vaqtlari
  olcham.ts       kadr geometriyasi; skrinshot koordinatasi → kadr koordinatasi
  animatsiya.ts   spring va egri chiziqlar
  shrift.ts       Onest (public/shrift/ dan, tarmoqqa chiqmaydi)
  Reels.tsx       sahnalarni ketma-ket qo'yadi (9 kadr ustma-ust o'tish)
  components/     Fon · Sarlavha · Telefon · Noutbuk · Logo · Kursor · Urgu · Karta
  scenes/         11 ta sahna, brifdagi ssenariy bo'yicha
```

Bosish va urg'ularni joylashtirish uchun `olcham.ts` dagi `nuqta()` va
`quti()` ishlatiladi — koordinatalar skrinshotning **o'z** piksellarida
(780×1688) yoziladi, kadrga o'girish avtomatik.

## Brif talablari — qanday bajarilgan

- Skrinshotlar o'zgartirilmaydi: faqat ramka, surish, bosish va urg'u ustiga qo'yiladi.
- Soxta natija (`+30% tushum` kabi) yozilmagan.
- "Tez kunda" funksiyalari ataylab kartochka ko'rinishida — haqiqiy ekran deb ko'rsatilmaydi.
- Emoji ishlatilmagan.
- Yuqori 10% va pastki 15% ga muhim matn qo'yilmagan (`brend.ts` dagi xavfsiz zonalar).
- Har sahnada katta sarlavha — ovozsiz ko'rilganda ham tushunarli.

## Hali qilinmagan

- **Diktor ovozi.** Matn tayyor, yozilmagan — yuqoridagi "Diktor ovozi" ga qarang.
- **Tirik musiqa.** Hozir sintez qilingan orinbosar turibdi.
- **Aloqa.** `src/scenes/11-Yakun.tsx` dagi `ALOQA` o'zgaruvchisiga telefon/Telegram yoziladi.
- **Skrinshotlar.** Yuqoridagi jadvalda "kerak" deb belgilanganlari.
