import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { B } from "../brend";
import { yumshoq } from "../animatsiya";
import { Ekran } from "./Ekran";
import { TELEFON_BALANDLIK, TELEFON_EN, TELEFON_Y } from "../olcham";

type Props = {
  nom: string;
  kechikish?: number;
  /** kichik 3D burilish — chuqurlik uchun */
  burilish?: number;
  x?: number;
  y?: number;
  /** kirish yo'nalishi */
  yon?: "past" | "chap" | "ong";
  /** sekin kattalashish (Ken Burns) — kadr jonli tursin */
  surish?: number;
};

/**
 * Telefon korpusi. Skrinshot to'liq ko'rinadi (780×1688 nisbat ekranga
 * aniq tushadi), harakat — kirish, sekin surish va shishadagi yorug'lik.
 * Skrinshotning o'ziga tegilmaydi — brif 7-bo'lim talabi.
 */
export const Telefon: React.FC<Props> = ({
  nom,
  kechikish = 0,
  burilish = 0,
  x = 0,
  y = TELEFON_Y,
  yon = "past",
  surish = 0.03,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const ramka = 13;
  const radius = 52;

  const p = yumshoq(frame, fps, kechikish);
  const kirishY = yon === "past" ? interpolate(p, [0, 1], [110, 0]) : 0;
  const kirishX =
    yon === "chap"
      ? interpolate(p, [0, 1], [-150, 0])
      : yon === "ong"
      ? interpolate(p, [0, 1], [150, 0])
      : 0;

  // kirish masshtabi + butun sahna davomida sekin surish
  const kirishMasshtab = interpolate(p, [0, 1], [0.94, 1]);
  const surishMasshtab = interpolate(
    frame,
    [kechikish, durationInFrames - 1],
    [1, 1 + surish],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const t = frame / fps;
  const suzish = Math.sin(t * 0.7) * 4;

  const yorugP = interpolate(frame, [kechikish + 8, kechikish + 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: p,
      }}
    >
      <div
        style={{
          transform: `translate(${x + kirishX}px, ${y + kirishY + suzish}px) perspective(1600px) rotateY(${burilish}deg) scale(${
            kirishMasshtab * surishMasshtab
          })`,
          filter: `blur(${interpolate(p, [0, 1], [8, 0])}px)`,
        }}
      >
        <div
          style={{
            padding: ramka,
            borderRadius: radius,
            background: "linear-gradient(160deg, #2A3542, #0D1218 55%, #222C38)",
            boxShadow:
              "0 50px 110px rgba(0,0,0,.66), 0 0 0 1px rgba(255,255,255,.07) inset",
          }}
        >
          <div
            style={{
              width: TELEFON_EN,
              height: TELEFON_BALANDLIK,
              borderRadius: radius - ramka,
              overflow: "hidden",
              position: "relative",
              background: B.fon,
            }}
          >
            <Ekran nom={nom} en={TELEFON_EN} balandlik={TELEFON_BALANDLIK} />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(104deg, transparent 38%, rgba(255,255,255,.14) 50%, transparent 62%)",
                transform: `translateX(${interpolate(
                  yorugP,
                  [0, 1],
                  [-TELEFON_EN * 1.7, TELEFON_EN * 1.7]
                )}px)`,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
