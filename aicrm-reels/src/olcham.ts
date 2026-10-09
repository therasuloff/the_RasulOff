/**
 * Kadr geometriyasi. Telefon ekranidagi nuqtani kadr koordinatasiga
 * o'girish shu yerda — bosish va urg'ular skrinshotga aniq tushishi uchun.
 */
import { W } from "./brend";

/** Telefon skrinshotining tabiiy o'lchami */
export const SKRIN = { en: 780, balandlik: 1688 } as const;

/** Kadrdagi telefon o'lchami */
export const TELEFON_BALANDLIK = 1150;
export const TELEFON_EN = Math.round(TELEFON_BALANDLIK * (SKRIN.en / SKRIN.balandlik)); // 531
/** Telefon markazining vertikal siljishi (kadr markazidan) */
export const TELEFON_Y = 70;

/** Ekran (shisha ichi) chap-yuqori burchagi */
export const EKRAN_CHAP = Math.round((W - TELEFON_EN) / 2); // 275
export const EKRAN_TEPA = Math.round(960 + TELEFON_Y - TELEFON_BALANDLIK / 2); // 455
export const MASSHTAB = TELEFON_EN / SKRIN.en; // ≈0.681

/** Skrinshot koordinatasi → kadr koordinatasi */
export const nuqta = (sx: number, sy: number): [number, number] => [
  EKRAN_CHAP + sx * MASSHTAB,
  EKRAN_TEPA + sy * MASSHTAB,
];

/** Skrinshotdagi to'rtburchak → kadrdagi to'rtburchak */
export const quti = (sx: number, sy: number, sen: number, sbal: number) => {
  const [x, y] = nuqta(sx, sy);
  return { x, y, en: sen * MASSHTAB, balandlik: sbal * MASSHTAB };
};

/** Sarlavha uchun ajratilgan yuqori maydon */
export const SARLAVHA_TEPA = 226;
