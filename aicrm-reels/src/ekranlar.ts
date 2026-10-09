// AVTOMATIK YARATILGAN — qo'lda tahrirlamang.
// Qayta yaratish: npm run ekranlar
export const MAVJUD_EKRANLAR: readonly string[] = [
  "01-kutib-olish.png",
  "02-kirish.png",
  "03-direktor-asosiy.png",
  "04-reception-bugun.png"
];

export const ekranBorMi = (nom: string) => MAVJUD_EKRANLAR.includes(nom);
