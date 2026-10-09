import { useCurrentFrame, interpolate } from "remotion";
import { GRADIENT } from "../brend";

/** Pastdagi yupqa progress chizig'i — 60 soniya qancha qolganini ko'rsatadi. */
export const Progress: React.FC<{ jami: number }> = ({ jami }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, jami - 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 300,
        height: 5,
        background: "rgba(255,255,255,.08)",
      }}
    >
      <div style={{ width: `${p * 100}%`, height: "100%", background: GRADIENT }} />
    </div>
  );
};
