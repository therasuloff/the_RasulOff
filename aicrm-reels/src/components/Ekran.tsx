import { Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { B, GRADIENT } from "../brend";
import { SHRIFT } from "../shrift";
import { ekranBorMi } from "../ekranlar";

/**
 * Skrinshotni ko'rsatadi. Fayl hali kelmagan bo'lsa — brend uslubidagi
 * o'rinbosar karta chiqadi (render to'xtab qolmasin uchun).
 */
export const Ekran: React.FC<{
  nom: string;
  en: number;
  balandlik: number;
  /** skrinshotni vertikal siljitish: [boshlanish%, tugash%] — "scroll" effekti */
  scroll?: [number, number];
  /** skrinshotning tabiiy o'lchami (standart: telefon 780×1688) */
  tabiiy?: [number, number];
}> = ({ nom, en, balandlik, scroll, tabiiy = [780, 1688] }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  if (!ekranBorMi(nom)) {
    return <Orinbosar nom={nom} en={en} balandlik={balandlik} />;
  }

  // Skrinshot kadr enidan kengroq bo'lsa — ko'rinadigan oyna bo'ylab suriladi
  const masshtab = en / tabiiy[0];
  const toliqBalandlik = tabiiy[1] * masshtab;
  const oraliq = Math.max(0, toliqBalandlik - balandlik);

  const siljish = scroll
    ? interpolate(
        frame,
        [0, durationInFrames - 1],
        [-oraliq * scroll[0], -oraliq * scroll[1]],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;

  return (
    <div style={{ width: en, height: balandlik, overflow: "hidden", position: "relative" }}>
      <Img
        src={staticFile(`ekranlar/${nom}`)}
        style={{
          width: en,
          height: toliqBalandlik,
          transform: `translateY(${siljish}px)`,
          display: "block",
        }}
      />
    </div>
  );
};

const Orinbosar: React.FC<{ nom: string; en: number; balandlik: number }> = ({
  nom,
  en,
  balandlik,
}) => (
  <div
    style={{
      width: en,
      height: balandlik,
      background: B.karta,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      fontFamily: SHRIFT,
      padding: 40,
      textAlign: "center",
    }}
  >
    <div
      style={{
        width: 84,
        height: 84,
        borderRadius: 24,
        background: GRADIENT,
        opacity: 0.22,
      }}
    />
    <div style={{ color: B.matn, fontSize: 28, fontWeight: 700 }}>
      Skrinshot kutilmoqda
    </div>
    <div style={{ color: B.matn2, fontSize: 21, fontWeight: 500 }}>{nom}</div>
  </div>
);
