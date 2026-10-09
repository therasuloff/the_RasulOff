import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { B, GRADIENT } from "../brend";
import { SHRIFT } from "../shrift";
import { yumshoq, sakrash } from "../animatsiya";

/** Λ belgisining uzunligi (SVG yo'li bo'yicha hisoblangan) */
const YOL_UZUNLIGI = 133;

/**
 * Logotip: Λ chiziq bo'lib chiziladi, uchqun sakrab chiqadi,
 * keyin "AI CRM" yozuvi joyiga tushadi.
 */
export const Logo: React.FC<{
  olcham?: number;
  kechikish?: number;
  yozuv?: boolean;
  y?: number;
}> = ({ olcham = 260, kechikish = 0, yozuv = true, y = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chizish = interpolate(frame, [kechikish, kechikish + 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const uchqun = sakrash(frame, fps, kechikish + 22);
  const quti = yumshoq(frame, fps, kechikish);
  const yozuvP = yumshoq(frame, fps, kechikish + 28);

  // logo atrofidagi porlash
  const porlash = interpolate(chizish, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%,-50%) translateY(${y}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 44,
      }}
    >
      <div style={{ position: "relative" }}>
        {/* orqa porlash */}
        <div
          style={{
            position: "absolute",
            inset: -olcham * 0.35,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${B.yashil}3A 0%, transparent 62%)`,
            filter: "blur(36px)",
            opacity: porlash,
          }}
        />
        <svg
          width={olcham}
          height={olcham}
          viewBox="0 0 120 120"
          style={{
            transform: `scale(${interpolate(quti, [0, 1], [0.86, 1])})`,
            opacity: quti,
          }}
        >
          <defs>
            <linearGradient id="quti" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor="#16362A" />
              <stop offset="1" stopColor="#07090D" />
            </linearGradient>
            <linearGradient id="chiziq" x1="24" y1="28" x2="96" y2="96" gradientUnits="userSpaceOnUse">
              <stop stopColor={B.yashil} />
              <stop offset="1" stopColor={B.firuza} />
            </linearGradient>
          </defs>
          <rect width="120" height="120" rx="32" fill="url(#quti)" />
          <path
            d="M24 92 L52 32 L80 92"
            fill="none"
            stroke="url(#chiziq)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={YOL_UZUNLIGI}
            strokeDashoffset={YOL_UZUNLIGI * (1 - chizish)}
          />
          <path
            d="M90 17C91.6 26.9 93.1 28.4 103 30C93.1 31.6 91.6 33.1 90 43C88.4 33.1 86.9 31.6 77 30C86.9 28.4 88.4 26.9 90 17Z"
            fill={B.firuza}
            style={{
              transformOrigin: "90px 30px",
              transform: `scale(${uchqun}) rotate(${interpolate(uchqun, [0, 1], [-90, 0])}deg)`,
              opacity: uchqun,
            }}
          />
        </svg>
      </div>

      {yozuv && (
        <div
          style={{
            fontFamily: SHRIFT,
            fontSize: olcham * 0.42,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            opacity: yozuvP,
            transform: `translateY(${interpolate(yozuvP, [0, 1], [26, 0])}px)`,
          }}
        >
          <span
            style={{
              background: GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            AI
          </span>
          <span style={{ color: B.matn }}> CRM</span>
        </div>
      )}
    </div>
  );
};
