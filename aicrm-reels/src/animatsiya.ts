import { interpolate, spring } from "remotion";

/** Motion design uchun umumiy egri chiziqlar va yordamchilar. */

// Kuchli chiqish — UI harakatlari uchun (material-ga yaqin)
export const chiqish = (t: number) => 1 - Math.pow(1 - t, 3);
export const kirish = (t: number) => t * t * t;
export const ikkiTomon = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Standart "yumshoq lekin tez" spring */
export const yumshoq = (frame: number, fps: number, kechikish = 0) =>
  spring({
    frame: frame - kechikish,
    fps,
    config: { damping: 200, mass: 0.8, stiffness: 120 },
  });

/** Biroz sakraydigan spring — urg'u uchun */
export const sakrash = (frame: number, fps: number, kechikish = 0) =>
  spring({
    frame: frame - kechikish,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 150 },
  });

/** 0→1→0: sahnaga kirib, chiqib ketish koeffitsienti */
export const kirChiq = (
  frame: number,
  davomiylik: number,
  kirMuddat = 12,
  chiqMuddat = 12
) =>
  interpolate(
    frame,
    [0, kirMuddat, davomiylik - chiqMuddat, davomiylik],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

/** Matnni so'zlarga bo'lib, har biriga kechikish berish uchun */
export const soz = (matn: string) => matn.split(" ");
