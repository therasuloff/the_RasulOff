import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Fon } from "../components/Fon";
import { Telefon } from "../components/Telefon";
import { Noutbuk } from "../components/Noutbuk";
import { Sarlavha } from "../components/Sarlavha";
import { Urgu } from "../components/Urgu";
import { chiqish } from "../animatsiya";
import { quti } from "../olcham";

/**
 * 7–14 s. Direktor: telefonda tushum va qarzdorlik, keyin AI ajratib
 * bergan "E'tibor talab qiladi" ro'yxati, so'ng kompyuterdagi keng panel.
 */
export const Direktor: React.FC = () => {
  const frame = useCurrentFrame();

  const uzatish = interpolate(frame, [120, 142], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: chiqish,
  });

  return (
    <AbsoluteFill>
      <Fon />

      <Sarlavha
        matn="Direktor hammasini telefonda ko'radi"
        urgu={["telefonda"]}
        olcham={56}
        chiqishKadri={104}
      />
      <Sarlavha
        matn="AI kimga e'tibor kerakligini o'zi aytadi"
        urgu={["AI", "o'zi"]}
        olcham={54}
        kechikish={112}
      />

      {uzatish < 1 && (
        <AbsoluteFill
          style={{ opacity: 1 - uzatish, transform: `translateX(${-uzatish * 220}px)` }}
        >
          <Telefon nom="03-direktor-asosiy.png" kechikish={2} />
          {/* "Shu oy tushum" kartasi */}
          <Urgu {...quti(34, 288, 712, 196)} kadr={24} davomiylik={48} />
          {/* AI ajratgan ro'yxat */}
          <Urgu {...quti(34, 1222, 712, 340)} kadr={78} davomiylik={48} />
        </AbsoluteFill>
      )}

      {uzatish > 0 && (
        <AbsoluteFill
          style={{ opacity: uzatish, transform: `translateX(${(1 - uzatish) * 200}px)` }}
        >
          <Noutbuk nom="15-kompyuter-direktor.png" en={960} y={70} kechikish={120} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
