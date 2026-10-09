// public/ekranlar/ ichidagi mavjud fayllar ro'yxatini src/ekranlar.ts ga yozadi.
// Yangi skrinshot qo'shilganda shuni qayta ishga tushiring: npm run ekranlar
import { readdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ildiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const papka = join(ildiz, "public", "ekranlar");
const fayllar = existsSync(papka)
  ? readdirSync(papka).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort()
  : [];

const chiqish = `// AVTOMATIK YARATILGAN — qo'lda tahrirlamang.
// Qayta yaratish: npm run ekranlar
export const MAVJUD_EKRANLAR: readonly string[] = ${JSON.stringify(fayllar, null, 2)};

export const ekranBorMi = (nom: string) => MAVJUD_EKRANLAR.includes(nom);
`;

writeFileSync(join(ildiz, "src", "ekranlar.ts"), chiqish);
console.log(`${fayllar.length} ta ekran topildi:`);
for (const f of fayllar) console.log("  ·", f);

// ── ovoz fayllari ro'yxati (diktor ovozi kelgan-kelmaganini bilish uchun)
const ovozPapka = join(ildiz, "public", "ovoz");
const ovozlar = existsSync(ovozPapka)
  ? readdirSync(ovozPapka).filter((f) => /\.(wav|mp3|m4a|aac|ogg)$/i.test(f)).sort()
  : [];
const diktor = ovozlar.find((f) => /^diktor\./i.test(f)) ?? null;

writeFileSync(
  join(ildiz, "src", "ovozlar.ts"),
  `// AVTOMATIK YARATILGAN — qo'lda tahrirlamang.
// Qayta yaratish: npm run ekranlar
export const MAVJUD_OVOZLAR: readonly string[] = ${JSON.stringify(ovozlar, null, 2)};

/** Diktor ovozi fayli (public/ovoz/diktor.mp3 kabi) yoki null */
export const DIKTOR: string | null = ${diktor ? JSON.stringify(diktor) : "null"};
`
);
console.log(`${ovozlar.length} ta ovoz fayli; diktor: ${diktor ?? "yo'q"}`);
