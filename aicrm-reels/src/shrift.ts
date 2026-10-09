import { continueRender, delayRender, staticFile } from "remotion";

/** Onest shriftini mahalliy fayldan yuklaydi (tarmoqqa chiqmaydi). */
let yuklandi = false;

export const shriftniYukla = () => {
  if (yuklandi || typeof document === "undefined") return;
  yuklandi = true;
  const kutish = delayRender("Onest shrifti yuklanmoqda");
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = staticFile("shrift/onest.css");
  link.onload = () => {
    // shrift fayllari ham o'qilguncha kutamiz
    (document as any).fonts?.ready?.then(() => continueRender(kutish));
  };
  link.onerror = () => continueRender(kutish);
  document.head.appendChild(link);
};

export const SHRIFT = "Onest, Helvetica, Arial, sans-serif";
