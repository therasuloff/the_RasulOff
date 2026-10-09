import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { B, GRADIENT } from "../brend";
import { SHRIFT } from "../shrift";
import { yumshoq } from "../animatsiya";

/**
 * "Tez kunda" sahnasi uchun kartochka. Haqiqiy ekran emasligi bilinib tursin
 * uchun ataylab soddalashtirilgan — brif 4-bo'lim talabi.
 */
export const Karta: React.FC<{
  sarlavha: string;
  izoh: string;
  kechikish: number;
  y: number;
  belgi: React.ReactNode;
}> = ({ sarlavha, izoh, kechikish, y, belgi }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = yumshoq(frame, fps, kechikish);

  return (
    <div
      style={{
        position: "absolute",
        left: 84,
        right: 84,
        top: y,
        display: "flex",
        alignItems: "center",
        gap: 32,
        padding: "38px 40px",
        borderRadius: 28,
        background: B.karta,
        border: "1px solid rgba(255,255,255,.07)",
        boxShadow: "0 26px 58px rgba(0,0,0,.42)",
        transform: `translateX(${interpolate(p, [0, 1], [70, 0])}px)`,
        opacity: p,
        fontFamily: SHRIFT,
      }}
    >
      <div
        style={{
          width: 84,
          height: 84,
          borderRadius: 24,
          background: GRADIENT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {belgi}
      </div>
      <div>
        <div style={{ color: B.matn, fontSize: 38, fontWeight: 700, letterSpacing: "-0.02em" }}>
          {sarlavha}
        </div>
        <div style={{ color: B.matn2, fontSize: 27, fontWeight: 500, marginTop: 8 }}>
          {izoh}
        </div>
      </div>
    </div>
  );
};
