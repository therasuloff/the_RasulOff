import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { B } from "../brend";
import { Fon } from "../components/Fon";
import { Telefon } from "../components/Telefon";
import { Sarlavha } from "../components/Sarlavha";
import { chiqish } from "../animatsiya";
import { nuqta } from "../olcham";

/**
 * 34–43 s. Videoning yuragi: AI Ustoz. Mikrofon tugmasidan ovoz halqalari
 * tarqaladi — "gapirish" g'oyasi ovozsiz ham tushunarli bo'lsin.
 */
export const AiUstoz: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const uzatish = interpolate(frame, [176, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: chiqish,
  });

  const [mx, my] = nuqta(390, 592); // katta oq mikrofon tugmasi

  const halqalar = [0, 1, 2, 3].map((i) => {
    const bosqich = ((frame / fps) * 0.6 + i * 0.25) % 1;
    return {
      r: interpolate(bosqich, [0, 1], [86, 320]),
      shaffof: interpolate(bosqich, [0, 0.12, 1], [0, 0.6, 0]),
    };
  });

  return (
    <AbsoluteFill>
      <Fon jonlilik={1.3} />

      <Sarlavha
        matn="AI Ustoz bilan uyda ham ingliz tilida gaplashadi"
        urgu={["AI", "Ustoz", "gaplashadi"]}
        olcham={52}
        chiqishKadri={150}
      />
      <Sarlavha
        matn="Xatosini o'zbekcha tushuntiradi"
        urgu={["o'zbekcha"]}
        olcham={56}
        kechikish={158}
      />

      {uzatish < 1 && (
        <AbsoluteFill style={{ opacity: 1 - uzatish }}>
          <Telefon nom="12-ai-ustoz.png" kechikish={2} surish={0.05} />
          {frame > 16 &&
            halqalar.map((h, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: mx - h.r,
                  top: my - h.r,
                  width: h.r * 2,
                  height: h.r * 2,
                  borderRadius: "50%",
                  border: `3px solid ${B.firuza}`,
                  opacity: h.shaffof * Math.min(1, (frame - 16) / 14),
                  pointerEvents: "none",
                }}
              />
            ))}
        </AbsoluteFill>
      )}

      {uzatish > 0 && (
        <AbsoluteFill style={{ opacity: uzatish }}>
          <Telefon nom="11-oquvchi-asosiy.png" kechikish={176} yon="ong" />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
