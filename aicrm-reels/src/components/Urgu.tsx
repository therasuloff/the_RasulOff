import { useCurrentFrame, interpolate } from "remotion";
import { B } from "../brend";
import { chiqish } from "../animatsiya";

/**
 * Ekranning bir qismini halqa bilan ajratib ko'rsatadi — tomoshabin
 * qayerga qarashini biladi. Skrinshot ustiga qo'yiladi, uni o'zgartirmaydi.
 */
export const Urgu: React.FC<{
  x: number;
  y: number;
  en: number;
  balandlik: number;
  kadr: number;
  davomiylik?: number;
  rang?: string;
  radius?: number;
}> = ({ x, y, en, balandlik, kadr, davomiylik = 70, rang = B.firuza, radius = 22 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [kadr, kadr + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: chiqish,
  });
  const chiqib = interpolate(
    frame,
    [kadr + davomiylik - 12, kadr + davomiylik],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const nafas = 1 + Math.sin((frame - kadr) * 0.14) * 0.012;
  const korinish = p * chiqib;
  if (korinish <= 0.01) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: en,
        height: balandlik,
        borderRadius: radius,
        border: `4px solid ${rang}`,
        boxShadow: `0 0 0 9999px rgba(5,8,12,${0.5 * korinish}), 0 0 36px ${rang}66`,
        transform: `scale(${interpolate(p, [0, 1], [1.06, 1]) * nafas})`,
        opacity: korinish,
        pointerEvents: "none",
      }}
    />
  );
};
