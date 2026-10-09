# AI CRM — 60 soniyalik Instagram Reels uchun brif

Bu papka video yasash uchun hamma narsani o'z ichiga oladi: mahsulot haqida, brend, haqiqiy ilova
skrinshotlari (`ekranlar/`), logotip (`brend/`) va sahnama-sahna ssenariy.

---

## 1. Nima qiladi, kimga mo'ljallangan

**AI CRM** — o'quv markazlar uchun sun'iy intellektli boshqaruv tizimi (SaaS). Ishlab chiquvchi: **Cronsystems**.
Sayt: **aicrm.cronsys.org**. Shior: **"O'quv markaz boshqaruvining kelajagi"**.

- **Kimga:** O'zbekistondagi o'quv markazlar — avvalo til markazlari (ingliz, turk, rus, koreys…), keyin IT va
  boshqa kurslar. Bir nechta filialli markazlar ham (har filial alohida, o'z rangi bilan).
- **Kim ishlatadi — 8 ta rol, bitta login** (telefon raqam bilan kiradi, tizim rolga qarab ekran ochadi):
  Direktor · Menejer · Reception (qabulxona) · Call-markaz · O'qituvchi · Tozalik xodimi · O'quvchi · Ota-ona.
- **Qayerda:** telefonda ham, kompyuterda ham (veb), reception uchun Windows dasturi (.exe), Android ilova.

### Hozir ishlayotgan funksiyalar (koddan tekshirilgan)
| Bo'lim | Nima qiladi |
|---|---|
| Talabalar va guruhlar | O'quvchi kartasi, guruhlar, ota-ona raqami, arxiv |
| Dars jadvali | Xonalar/o'qituvchilar bo'yicha haftalik jadval; bir xonaga yoki ustozga bir vaqtda ikki guruh qo'yib bo'lmaydi |
| Davomat jurnali | 4 holat (keldi / kechikdi / kelmadi / sababli) + 0–100 baho, o'qituvchi telefonidan |
| Avtomatik hisob | Har oy guruh narxi bo'yicha qarz o'zi yoziladi |
| Kassa | Naqd, karta, Click, Payme; 80 mm chek; kassadagi naqd va kartadagi pul alohida |
| Qarzdorlar | Ro'yxat, bir bosishda qo'ng'iroq, qarzdorlarga SMS |
| Moliya va byudjet | Tushum diagrammalari, tushum bo'limlarga foiz bo'yicha taqsimlanadi |
| Oyliklar | Aniq maosh yoki guruhdan foiz; to'lov 90% yig'ilganda ochiladi; avans oylikdan avtomatik ushlanadi |
| Lidlar va chatlar | Instagram va Telegram yozishmalari bitta oynada, har yozuvchi avtomatik lid, AI javob taklifi |
| Qo'ng'iroq tahlili | Alohida Android ilova qo'ng'iroq yozuvini yuboradi, AI baholaydi va e'tirozlarni chiqaradi |
| AI tahlil (direktor) | Markaz ko'rsatkichlarini tahlil qiladi: muammolar, "kim nima qilishi kerak", ketib qolishi mumkin o'quvchilar |
| **AI Ustoz** | O'quvchi ingliz tilida AI bilan **ovozli** gaplashadi; xatoni o'zbekcha tushuntiradi; talaffuz mashqi (so'zni o'qiydi — ball oladi) |
| O'quvchi / ota-ona ilovasi | Keyingi dars, baholar, davomat, to'lov, ustozga yozish, AI Ustoz |
| Profil | Har rolda rasm, parol, mavzu (yorug'/to'q) |
| Ko'p markaz (SaaS) | Super admin paneli, funksiyalarni yoqish-o'chirish, har markazga o'z brend rangi |

### Dizaynda tayyor, yaqinda chiqadi ("Tez kunda" sahnasi uchun)
- **Elektron darslik:** kitob PDF yuklanadi → AI uni bo'lim va mavzularga o'zi ajratadi → mavzular darsda
  birin-ketin ochiladi (tushuntirish, so'zlar, avto-test).
- **Uy vazifasi ilovada:** matn, daftar surati yoki ovoz bilan topshiriladi; AI xatoni belgilaydi, ustoz baholaydi.
- **O'yinlashtirish:** tanga, ball, guruhda reyting.
- **To'lov intizomi:** to'lov kechiksa elektron darslik vaqtincha yopiladi, to'lovdan keyin o'zi ochiladi.

## 2. 3–5 ta asosiy afzallik (videoda aytiladigan gaplar)
1. **AI direktorga maslahat beradi** — qaysi o'quvchi ketib qolishi mumkin, qayerda pul yo'qolyapti, kim nima qilsin.
2. **AI Ustoz** — o'quvchi uyda ham ingliz tilida ovoz bilan gaplashadi, xatosini o'zbekcha tushuntiradi.
3. **Pul nazorati avtomatik** — oylik qarz o'zi yoziladi, kassa, qarzdorlarga SMS, ustoz oyligi foiz bilan o'zi hisoblanadi.
4. **Bitta tizim — 8 rol** — direktordan ota-onagacha, telefonda ham kompyuterda ham.
5. **Bitta oynada hamma mijoz** — Instagram, Telegram va qo'ng'iroqlar lidga aylanadi, AI javob taklif qiladi.

## 3. Brend
| Token | Qiymat | Qayerda |
|---|---|---|
| Fon (to'q, asosiy) | `#0A0E14` | video foni |
| Karta | `#141B24`, ikkinchi `#1C2530` | |
| Asosiy yashil | `#2ED47A` | tugma, urg'u |
| Firuza | `#38E0D0` | gradient oxiri, logo uchquni |
| Gradient | `linear-gradient(90deg, #2ED47A, #38E0D0)` | asosiy tugmalar, sarlavha urg'usi |
| Matn | `#EDF2F8`, ikkinchi darajali `#8D9AAC` | |
| Yorug' variant | fon `#F4F7F9`, matndagi yashil `#11874B` | |
| Mijoz rangi (namuna) | Taraqqiyot Chorsu: qizil `#C8102E` + oq | "har markazga o'z rangi" sahnasi |

- **Shrift:** **Onest** (Google Fonts), qalinliklar 400 / 500 / 600 / 700 / 800. Sarlavhalarda 700–800, harflar oralig'i −0.02em.
- **Logotip:** `brend/logo-aicrm.svg` (to'q kvadrat + yashil-firuza "Λ" + uchqun), `brend/logo-belgi-shaffof.svg` (fonsiz),
  `brend/ilova-ikonkasi-512.png`. Yozuv: "**AI** CRM" — "AI" gradient bilan, "CRM" oq.
- **Uslub:** yumaloq kartalar (12–24 px), yupqa tugmalar (balandligi 40 px, soyasiz), toza, ortiqcha bezaksiz.
  Emoji ishlatilmaydi.

## 4. Ekranlar (`ekranlar/`)
Haqiqiy ilova, **demo ma'lumot** (ismlar va raqamlar soxta, `+998 00 …`). Telefon: 780×1688 px (390×844 @2x).
Kompyuter: 2560×1600 px (1280×800 @2x). To'q mavzu (14 va 17-raqam — qizil-oq mijoz brendi namunasi).

| Fayl | Nima ko'rinadi | Video uchun |
|---|---|---|
| 01-kutib-olish | Logo, "O'quv markaz boshqaruvining kelajagi", "Boshlash" | kuchli — ochilish |
| 02-kirish | Telefon + parol yoki SMS kod | o'rtacha |
| 03-direktor-asosiy | Shu oy tushum, qarzdorlik, faol talabalar, "E'tibor talab qiladi" | kuchli |
| 04-reception-bugun | Kassa, darslar, qarzdorlarga qo'ng'iroq tugmasi | kuchli |
| 05-reception-kassa | Kun tushumi to'lov usullari bo'yicha rangli chiziq | kuchli |
| 06-callmarkaz-chatlar | Chatlar (demoda bo'sh) | zaif — ishlatmang |
| 07-oqituvchi-bugun | Keyingi dars, bugungi darslar | o'rtacha |
| 08-oqituvchi-davomat | Har o'quvchiga 4 holat tugmasi + baho, "Saqlash" | kuchli |
| 09-oqituvchi-oquvchilar-telefon | O'quvchi va ota-ona raqami, bosilsa qo'ng'iroq | o'rtacha |
| 10-oqituvchi-oyligim | Kutilayotgan oylik, guruhlar bo'yicha yig'ilish chizig'i | kuchli |
| 11-oquvchi-asosiy | AI Ustoz kartasi, keyingi dars, qarz, baholar | kuchli |
| 12-ai-ustoz | Katta mikrofon tugmasi, "Erkin suhbat / Talaffuz" | kuchli (suhbat qismi bo'sh — yuqori qismini oling) |
| 13-profil | Rasm, ma'lumotlar, mavzu | o'rtacha |
| 14-qizil-brend-oqituvchi | Xuddi shu ilova qizil-oq rangda | "har markazga o'z rangi" |
| 15-kompyuter-direktor | Rahbar paneli kompyuterda | kuchli |
| 16-kompyuter-reception | Reception "Bugun" kompyuterda | kuchli |
| 17-kompyuter-qizil-brend | Reception qizil-oq brendda | "o'z rangi" |
| 18-kompyuter-talabalar | Talabalar jadvali, qarzdor/to'langan belgilari | o'rtacha |
| 19-kompyuter-jadval | Xonalar bo'yicha haftalik dars jadvali | kuchli |

"Tez kunda" funksiyalari (darslik, tanga, reyting) uchun hali skrinshot yo'q — ularni brend uslubida
oddiy animatsion kartochka qilib ko'rsating (matn quyida), haqiqiy ekran deb ko'rsatmang.

## 5. Format
**Instagram Reels, 9:16, 1080×1920, 60 soniya, 30 fps (1800 kadr).** Ovozsiz ko'rilsa ham tushunarli bo'lishi
uchun har sahnada katta subtitr/sarlavha. Telefon skrinshotlari telefon ramkasida, kompyuterniki — vertikal
kadrga sig'adigan noutbuk ramkasida yoki yaqinlashtirilgan qism (crop) sifatida. Pastki 15% va yuqori 10% ga
muhim matn qo'ymang (Instagram interfeysi yopib qo'yadi).

## 6. Ssenariy (60 s)
| Vaqt | Sahna | Ekran | Katta matn (ekranda) |
|---|---|---|---|
| 0–3 | **Ilmoq:** qora fon, daftar/Excel jadvallari tez almashadi va "qizil" bo'lib o'chadi | — | "O'quv markazingiz hali ham daftar va Excel'dami?" |
| 3–7 | Logo chiqadi (Λ chiziladi, uchqun yonadi), gradient porlaydi | 01 | "**AI** CRM — o'quv markaz boshqaruvining kelajagi" |
| 7–14 | Direktor: telefon ramkasi, raqamlar sanab chiqadi; keyin kompyuter | 03 → 15 | "Direktor hammasini telefonda ko'radi. AI esa qaysi o'quvchi ketib qolishini aytadi" |
| 14–21 | Reception: kassa, rangli to'lov chizig'i, qarzdorga qo'ng'iroq | 04 → 05 | "To'lov bir bosishda. Qarz o'zi yoziladi, SMS o'zi ketadi" |
| 21–26 | Jadval: kompyuter, kartalar ketma-ket paydo bo'ladi | 19 | "Jadval: bir xonaga ikki guruh — tizim ruxsat bermaydi" |
| 26–34 | O'qituvchi: davomat tugmalari bosiladi, keyin oylik chizig'i to'ladi | 08 → 10 | "Davomat 10 soniyada. Ustoz oyligi o'zi hisoblanadi" |
| 34–43 | **AI Ustoz:** mikrofon tugmasi pulsatsiya qiladi, halqalar tarqaladi; o'quvchi bosh sahifasi | 12 → 11 | "AI Ustoz: o'quvchi uyda ingliz tilida gaplashadi — xatosini o'zbekcha tushuntiradi" |
| 43–48 | Ota-ona va o'quvchi: davomat, baho, to'lov | 11 / 13 | "Ota-ona farzandini ilovada kuzatadi" |
| 48–52 | Bir ekran yashildan qizil-oqqa "bo'yaladi" | 16 → 17 (yoki 07 → 14) | "Har markazga — o'z rangi" |
| 52–56 | "Tez kunda" kartochkalari ketma-ket | — | "Tez kunda: AI elektron darslik · uy vazifasi ilovada · tanga va reyting" |
| 56–60 | Logo + sayt, gradient fon | — | "AI CRM · aicrm.cronsys.org · Cronsystems" + [TELEFON / TELEGRAM] |

### Ovoz matni (o'zbekcha, ~140 so'z, xotirjam va ishonchli ohangda)
> O'quv markazingiz hali ham daftar va Excel'dami?
> Tanishing — AI CRM. O'quv markaz boshqaruvining kelajagi.
> Direktor tushum, qarzdorlik va o'quvchilarni telefonda ko'radi. Sun'iy intellekt esa qaysi o'quvchi ketib qolishi mumkinligini oldindan aytadi.
> Reception to'lovni bir bosishda qabul qiladi. Oylik qarz o'zi yoziladi, eslatma SMS o'zi ketadi.
> Jadval xona va ustozlarni to'qnashtirmaydi.
> O'qituvchi davomatni telefondan o'n soniyada belgilaydi, oyligi esa o'zi hisoblanadi.
> AI Ustoz bilan o'quvchi uyda ham ingliz tilida gaplashadi — xatosini o'zbekcha tushuntiradi.
> Ota-ona farzandining davomati, bahosi va to'lovini ilovada kuzatadi.
> Har markazga — o'z rangi. Tez kunda: AI elektron darslik va uy vazifasi ilovada.
> AI CRM. Cronsystems.

## 7. Video yasovchi uchun eslatmalar
- Ekranlardagi raqamlar demo — videoda ularni "haqiqiy natija" deb da'vo qilmang (masalan "+30% tushum" kabi yozuvlar qo'shmang).
- Skrinshotlarni o'zgartirmang (matnini qayta yozmang); faqat ramka, zoom, kursor/bosish animatsiyasi qo'shing.
- Musiqa: yengil, zamonaviy, 100–120 BPM; sahnalar almashuvi bitga mos.
- Oxirgi sahnadagi telefon/Telegram — egasi beradi (`[TELEFON / TELEGRAM]` o'rniga).
