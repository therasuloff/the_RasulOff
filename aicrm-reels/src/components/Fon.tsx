import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { B } from "../brend";

/**
 * Sahna foni: sekin suzuvchi gradient dog'lar + nozik to'r + vinyetka.
 * `jonlilik` — dog'lar qanchalik yorqin (0..1).
 */
export const Fon: React.FC<{ jonlilik?: number; qizilBrend?: boolean }> = ({
  jonlilik = 1,
  qizilBrend = false,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;

  const ranglar = qizilBrend
    ? ["#C8102E", "#8E0B20", "#C8102E"]
    : [B.yashil, B.firuza, "#1B6E7A"];

  const doglar = [
    { x: 0.22, y: 0.24, r: 760, tez: 0.34, amp: 150 },
    { x: 0.82, y: 0.46, r: 680, tez: 0.27, amp: 190 },
    { x: 0.45, y: 0.82, r: 820, tez: 0.21, amp: 130 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: qizilBrend ? "#0E0A0C" : B.fon }}>
      {doglar.map((d, i) => {
        const x = width * d.x + Math.sin(t * d.tez + i * 2.1) * d.amp;
        const y = height * d.y + Math.cos(t * d.tez * 0.8 + i * 1.3) * d.amp;
        const nafas = 1 + Math.sin(t * 0.5 + i) * 0.07;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - d.r,
              top: y - d.r,
              width: d.r * 2,
              height: d.r * 2,
              borderRadius: "50%",
              transform: `scale(${nafas})`,
              background: `radial-gradient(circle, ${ranglar[i]}${Math.round(
                38 * jonlilik
              )
                .toString(16)
                .padStart(2, "0")} 0%, transparent 62%)`,
              filter: "blur(60px)",
            }}
          />
        );
      })}

      {/* nozik to'r — chuqurlik hissi beradi */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.028) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 42%, #000 20%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 42%, #000 20%, transparent 78%)",
          transform: `translateY(${interpolate(t % 8, [0, 8], [0, 64])}px)`,
        }}
      />

      {/* vinyetka — markazga e'tibor qaratadi */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 38%, rgba(0,0,0,.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
