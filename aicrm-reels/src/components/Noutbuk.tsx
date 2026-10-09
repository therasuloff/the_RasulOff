import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { B } from "../brend";
import { yumshoq } from "../animatsiya";
import { Ekran } from "./Ekran";

/**
 * Noutbuk korpusi — kompyuter skrinshotlari uchun (2560×1600 → 1.6 nisbat).
 * Vertikal kadrga sig'ishi uchun kichik, lekin matni o'qilishi kerak bo'lsa
 * `Yaqin` komponentidan foydalaning.
 */
export const Noutbuk: React.FC<{
  nom: string;
  en?: number;
  kechikish?: number;
  y?: number;
  scroll?: [number, number];
}> = ({ nom, en = 940, kechikish = 0, y = 0, scroll }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ekranBal = Math.round(en / 1.6);
  const ramka = 10;

  const p = yumshoq(frame, fps, kechikish);
  const masshtab = interpolate(p, [0, 1], [0.9, 1]);
  const burilishX = interpolate(p, [0, 1], [14, 0]);
  const t = frame / fps;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%,-50%) translateY(${
          y + Math.sin(t * 0.6) * 4
        }px) perspective(1800px) rotateX(${burilishX}deg) scale(${masshtab})`,
        opacity: p,
      }}
    >
      <div
        style={{
          padding: ramka,
          borderRadius: 16,
          background: "linear-gradient(160deg, #2A3542, #0D1218 60%, #1E2832)",
          boxShadow: "0 44px 90px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.06) inset",
        }}
      >
        <div
          style={{
            width: en,
            height: ekranBal,
            borderRadius: 8,
            overflow: "hidden",
            background: B.fon,
          }}
        >
          <Ekran
            nom={nom}
            en={en}
            balandlik={ekranBal}
            scroll={scroll}
            tabiiy={[2560, 1600]}
          />
        </div>
      </div>
      {/* asos */}
      <div
        style={{
          width: en * 1.1,
          height: 14,
          margin: "0 auto",
          borderRadius: "0 0 14px 14px",
          background: "linear-gradient(180deg, #273140, #11161D)",
          boxShadow: "0 18px 30px rgba(0,0,0,.5)",
        }}
      />
    </div>
  );
};

/**
 * Kompyuter skrinshotining bir qismini kattalashtirib ko'rsatadi —
 * vertikal kadrda matn o'qilishi uchun. `markaz` — 0..1 oralig'ida.
 */
export const Yaqin: React.FC<{
  nom: string;
  en?: number;
  balandlik?: number;
  markaz?: [number, number];
  /** kadr davomida kattalashish */
  masshtab?: [number, number];
  kechikish?: number;
  y?: number;
}> = ({
  nom,
  en = 936,
  balandlik = 700,
  markaz = [0.5, 0.4],
  masshtab = [1.35, 1.5],
  kechikish = 0,
  y = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const p = yumshoq(frame, fps, kechikish);

  const z = interpolate(frame, [0, durationInFrames - 1], masshtab, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const toliqEn = en * z;
  const toliqBal = (toliqEn / 1.6);
  const ofsetX = -(toliqEn * markaz[0] - en / 2);
  const ofsetY = -(toliqBal * markaz[1] - balandlik / 2);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: en,
        height: balandlik,
        transform: `translate(-50%,-50%) translateY(${y}px) scale(${interpolate(
          p,
          [0, 1],
          [0.94, 1]
        )})`,
        opacity: p,
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0 44px 90px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.08) inset",
        background: B.fon,
      }}
    >
      <div style={{ position: "absolute", left: ofsetX, top: ofsetY }}>
        <Ekran nom={nom} en={toliqEn} balandlik={toliqBal} tabiiy={[2560, 1600]} />
      </div>
    </div>
  );
};
