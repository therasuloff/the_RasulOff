# BooYeahShop — yuklanish (splash) ekrani

Bot mini ilovasi ochilganda logotip animatsiyasi ko'rsatiladi, keyin ilova
ishga tushadi.

Logotip `therasuloff/boyeah_logo` dagi brend fayllaridan **vektorga
o'girilgan** — shuning uchun splash hech qanday rasm, shrift yoki ovoz fayli
yuklamaydi. Ulanadigan qism 32 kB (gzip bilan ~11 kB) va darhol ekranga
chiqadi: tarmoqdan kutadigan hech narsa yo'q.

## Ichidagi fayllar

| Fayl | Nima uchun |
|---|---|
| `splash.html` | Markup (ichida SVG logotip). `index.html` ga qo'yiladi |
| `boyeah-splash.css` | Animatsiya va uslublar |
| `boyeah-splash.js` | Boshqaruv, ovoz sintezi, haptika |
| `boyeah-logo-paths.js` | Logotip vektor yo'llari (React uchun) |
| `BooYeahSplash.jsx` | React varianti |
| `demo.html` | Ko'rib chiqish sahifasi (tugmalar bilan) |

## Ko'rib chiqish

```bash
cd boyeah-splash
npx http-server -p 8080
# brauzerda: http://127.0.0.1:8080/demo.html
```

> `demo.html` ni to'g'ridan-to'g'ri fayl sifatida ochmang — u markupni
> `splash.html` dan `fetch` bilan oladi, `file://` da esa bu bloklanadi.

## Animatsiya ketma-ketligi

| Vaqt | Nima bo'ladi | Ovoz | Haptika |
|---:|---|---|---|
| 0 ms | Iliq to'q sariq nur yonadi | — | — |
| 140 ms | Sumka dastasi chiziladi | shuvillash | `light` |
| 440 ms | Sumka pastdan ko'tarilib chiqadi | pop | `medium` |
| 900 ms | Logotip bo'ylab yorug'lik yaltirab o'tadi | — | — |
| 1020 ms | `BooYeah` paydo bo'ladi | — | — |
| 1200 ms | `Shop` sakrab qo'shiladi | uch nota | `success` |
| 1420 ms | `mini ilova` + yuklagich chiziq | — | — |
| ilova tayyor | Logotip kattalashib, ekran so'nadi | shuvillash | `light` |

To'liq kirish animatsiyasi ~1.9 soniya. Ilova shundan tezroq tayyor bo'lsa
ham animatsiya oxirigacha ko'rsatiladi — bu atayin, logotip "chala"
qolmasligi uchun.

## Ulash — oddiy HTML ilova

`index.html` ichiga, `<body>` ning **eng boshiga**:

```html
<head>
  <link rel="stylesheet" href="/boyeah-splash/boyeah-splash.css">
</head>
<body>
  <!-- splash.html mazmunini shu yerga ko'chiring -->
  <div class="bys-splash" ...>...</div>

  <script src="/boyeah-splash/boyeah-splash.js"></script>

  <!-- ilovaning o'z bundle'i keyin keladi -->
  <script src="/app.js" type="module"></script>
</body>
```

CSS `<head>` da, markup `<body>` boshida bo'lishi muhim: shunda splash
ilovaning asosiy bundle'i yuklanishini **kutmasdan** darhol ko'rinadi.

Ilova tayyor bo'lganda:

```js
await BooYeahSplash.hide();
```

## Ulash — React

```jsx
import { useEffect, useState } from 'react';
import BooYeahSplash from './boyeah-splash/BooYeahSplash.jsx';

export default function App() {
  const [ready, setReady] = useState(false);   // ma'lumot yuklandimi
  const [gone, setGone] = useState(false);     // splash chiqib ketdimi

  useEffect(() => {
    Promise.all([loadProfile(), loadCatalog()])
      .finally(() => setReady(true));
  }, []);

  return (
    <>
      {!gone && <BooYeahSplash done={ready} onDone={() => setGone(true)} />}
      <Shop />
    </>
  );
}
```

## API

```js
BooYeahSplash.setProgress(0.4);  // 0..1 — yuklagich chizig'i
BooYeahSplash.indeterminate();   // foiz noma'lum bo'lsa — cheksiz harakat
BooYeahSplash.setMuted(true);    // ovozni o'chirish (tanlov eslab qolinadi)
BooYeahSplash.hide();            // Promise qaytaradi
BooYeahSplash.isVisible;         // true/false
```

`setProgress` foizni **orqaga qaytarmaydi** — chiziq faqat oldinga yuradi.

Haqiqiy foizni ko'rsatish uchun:

```js
const steps = [loadProfile(), loadBalance(), loadCatalog()];
let done = 0;
steps.forEach(p => p.finally(() => {
  BooYeahSplash.setProgress(++done / steps.length);
}));
await Promise.allSettled(steps);
await BooYeahSplash.hide();
```

## Ovoz haqida

Ovozlar WebAudio bilan **sintez qilinadi** — `.mp3` yoki `.wav` fayl yo'q:

- **shuvillash** — filtrlangan shovqin, chastotasi sirpanadi
- **pop** — 420 Hz dan 130 Hz ga tushuvchi sinus
- **uch nota** — C6 · E6 · G6, iliq "xona" effekti bilan

Umumiy balandlik `0.16` — bu atayin past, splash ovozi *ishora* bo'lishi
kerak, shov-shuv emas.

**Muhim:** brauzerlar foydalanuvchi teginmaguncha ovozni bloklaydi.
Telegram mini ilovasida birinchi ochilishda ovoz **chiqmasligi mumkin** —
bu normal va kutilgan holat. Shuning uchun har bir ovoz bilan birga
**haptika** (telefon tebranishi) ham yuboriladi, u esa deyarli har doim
ishlaydi. Foydalanuvchi ekranga bir marta teginganidan keyin ovoz ham
ochiladi.

Ovozni butunlay o'chirish:

```js
BooYeahSplash.setMuted(true);   // localStorage da saqlanadi
```

## Moslashuvchanlik

- **Telegram mavzusi** — `colorScheme === 'light'` bo'lsa, splash avtomatik
  och rejimga o'tadi.
- **`prefers-reduced-motion`** — foydalanuvchi animatsiyani kamaytirishni
  so'ragan bo'lsa, logotip harakatsiz, yumshoq paydo bo'ladi va ovoz
  chiqmaydi.
- **Xavfsizlik taymeri** — ilova javob bermay qolsa ham splash 8 soniyadan
  keyin o'zi yopiladi. Foydalanuvchi hech qachon qamalib qolmaydi:

  ```js
  BooYeahSplash.mount({ safetyMs: 8000 });  // 0 — o'chirish
  ```

- **Xavfsiz zonalar** — `env(safe-area-inset-*)` hisobga olingan, iPhone
  "notch" va pastki chiziqqa to'g'ri moslashadi.
- **Past ekranlar** — balandlik 420px dan kam bo'lsa logotip kichrayadi,
  `mini ilova` yozuvi yashiriladi.

## Logotipni qayta o'girish

Brend fayllari o'zgarsa, vektor yo'llarini qaytadan yaratish kerak.
`boyeah-logo-paths.js` va `splash.html` ichidagi SVG `boyeah_logo`
repozitoriysidagi PNG fayllardan avtomatik o'girilgan:

- `IMG_7325.PNG` → sumka belgisi (korpus + dasta)
- `IMG_7326.PNG` → `BooYeahShop` yozuvi

O'girish `potrace` bilan bajarilgan: to'q sariq piksellar maskasi ajratib
olinib, kontur egri chiziqlarga aylantirilgan, dasta esa aylana bo'ylab
o'lchanib markaziy chiziqqa keltirilgan (shuning uchun uni "chizilayotgan"
qilib animatsiya qilish mumkin).

## Rang qiymatlari

| Nima | Qiymat |
|---|---|
| Brend to'q sarig'i | `#FF6A13` |
| Ochroq to'q sariq (gradient) | `#FF8A2B` |
| To'qroq (gradient) | `#F25406` |
| Ilova aksenti (sariq) | `#F2E14C` |
| Fon (qorong'i) | `#09090C` |
| Matn | `#F6F7FB` |

Yuklagich chizig'i to'q sariqdan sariqqa o'tadi — brend rangi bilan
ilovaning sariq aksentini bog'laydi.
