import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Fon } from "../components/Fon";
import { Telefon } from "../components/Telefon";
import { Sarlavha } from "../components/Sarlavha";
import { Bosish } from "../components/Kursor";
import { Urgu } from "../components/Urgu";
import { chiqish } from "../animatsiya";
import { nuqta, quti } from "../olcham";

/**
 * 26–34 s. O'qituvchi: davomat tugmalari ketma-ket bosiladi va saqlanadi,
 * so'ng oylik sahifasi — guruhlar bo'yicha yig'ilish.
 */
export const Oqituvchi: React.FC = () => {
  const frame = useCurrentFrame();
  const uzatish = interpolate(frame, [132, 154], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: chiqish,
  });

  const [ax, ay] = nuqta(148, 1060); // Aziza — "Keldi"
  const [jx, jy] = nuqta(148, 1296); // Jasur — "Keldi"
  const [sx, sy] = nuqta(390, 1474); // "Saqlash"

  return (
    <AbsoluteFill>
      <Fon />

      <Sarlavha
        matn="Davomat — 10 soniyada"
        urgu={["10", "soniyada"]}
        olcham={60}
        chiqishKadri={118}
      />
      <Sarlavha
        matn="Ustoz oyligi o'zi hisoblanadi"
        urgu={["o'zi"]}
        olcham={56}
        kechikish={126}
      />

      {uzatish < 1 && (
        <AbsoluteFill
          style={{ opacity: 1 - uzatish, transform: `translateY(${-uzatish * 130}px)` }}
        >
          <Telefon nom="08-oqituvchi-davomat.png" kechikish={2} />
          <Bosish x={ax} y={ay} kadr={32} dan={[90, 150]} />
          <Bosish x={jx} y={jy} kadr={56} dan={[70, 110]} />
          <Bosish x={sx} y={sy} kadr={86} dan={[0, 160]} />
        </AbsoluteFill>
      )}

      {uzatish > 0 && (
        <AbsoluteFill
          style={{ opacity: uzatish, transform: `translateY(${(1 - uzatish) * 130}px)` }}
        >
          <Telefon nom="10-oqituvchi-oyligim.png" kechikish={132} />
          {/* "Kutilayotgan oylik" kartasi */}
          <Urgu {...quti(34, 422, 712, 398)} kadr={160} davomiylik={66} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
