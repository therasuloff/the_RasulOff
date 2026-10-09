import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { B } from "../brend";
import { chiqish } from "../animatsiya";

/**
 * Barmoq bosishi: belgilangan nuqtaga yaqinlashadi, bosadi, to'lqin tarqaladi.
 * Skrinshotni o'zgartirmaydi — faqat ustidan qo'yiladi.
 */
export const Bosish: React.FC<{
  x: number;
  y: number;
  kadr: number;
  /** qayerdan kelsin */
  dan?: [number, number];
}> = ({ x, y, kadr, dan = [120, 180] }) => {
  const frame = useCurrentFrame();
  const kelish = interpolate(frame, [kadr - 14, kadr], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: chiqish,
  });
  const bosildi = interpolate(frame, [kadr, kadr + 5, kadr + 12], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tolqin = interpolate(frame, [kadr, kadr + 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const korinish = interpolate(frame, [kadr - 16, kadr - 12, kadr + 26, kadr + 34], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cx = x + (1 - kelish) * dan[0];
  const cy = y + (1 - kelish) * dan[1];

  return (
    <>
      {tolqin > 0 && tolqin < 1 && (
        <div
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: 0,
            height: 0,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: -interpolate(tolqin, [0, 1], [0, 130]),
              top: -interpolate(tolqin, [0, 1], [0, 130]),
              width: interpolate(tolqin, [0, 1], [0, 260]),
              height: interpolate(tolqin, [0, 1], [0, 260]),
              borderRadius: "50%",
              border: `3px solid ${B.firuza}`,
              opacity: (1 - tolqin) * 0.85,
            }}
          />
        </div>
      )}
      <div
        style={{
          position: "absolute",
          left: cx - 34,
          top: cy - 34,
          width: 68,
          height: 68,
          borderRadius: "50%",
          background: "rgba(255,255,255,.9)",
          boxShadow: `0 10px 30px rgba(0,0,0,.45), 0 0 0 ${
            6 + bosildi * 10
          }px rgba(46,212,122,${0.18 + bosildi * 0.2})`,
          transform: `scale(${1 - bosildi * 0.22})`,
          opacity: korinish,
          pointerEvents: "none",
        }}
      />
    </>
  );
};
