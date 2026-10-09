/** AI CRM brend tokenlari — brif 3-bo'limdan. */
export const B = {
  fon: "#0A0E14",
  karta: "#141B24",
  karta2: "#1C2530",
  yashil: "#2ED47A",
  firuza: "#38E0D0",
  matn: "#EDF2F8",
  matn2: "#8D9AAC",
  qizil: "#FF6B6B",
  // mijoz brendi namunasi (Taraqqiyot Chorsu)
  mijozQizil: "#C8102E",
  mijozOq: "#FFFFFF",
} as const;

export const GRADIENT = `linear-gradient(90deg, ${B.yashil}, ${B.firuza})`;

/** Reels formati — brif 5-bo'lim */
export const W = 1080;
export const H = 1920;
export const FPS = 30;
export const DAVOMIYLIK = 60 * FPS; // 1800 kadr

/** Instagram interfeysi yopadigan zonalar */
export const XAVFSIZ_YUQORI = Math.round(H * 0.1); // 192
export const XAVFSIZ_PAST = Math.round(H * 0.15); // 288
export const XAVFSIZ_BALAND = H - XAVFSIZ_YUQORI - XAVFSIZ_PAST; // 1440

/** Sahna chegaralari (kadrlarda) — brif 6-bo'limdagi ssenariy */
export const SAHNALAR = {
  ilmoq: { boshlanish: 0, davomiylik: 90 },        // 0–3
  logo: { boshlanish: 90, davomiylik: 120 },       // 3–7
  direktor: { boshlanish: 210, davomiylik: 210 },  // 7–14
  reception: { boshlanish: 420, davomiylik: 210 }, // 14–21
  jadval: { boshlanish: 630, davomiylik: 150 },    // 21–26
  oqituvchi: { boshlanish: 780, davomiylik: 240 }, // 26–34
  aiUstoz: { boshlanish: 1020, davomiylik: 270 },  // 34–43
  otaOna: { boshlanish: 1290, davomiylik: 150 },   // 43–48
  brend: { boshlanish: 1440, davomiylik: 120 },    // 48–52
  tezKunda: { boshlanish: 1560, davomiylik: 120 }, // 52–56
  yakun: { boshlanish: 1680, davomiylik: 120 },    // 56–60
} as const;
