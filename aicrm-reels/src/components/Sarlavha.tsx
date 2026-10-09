import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { B, GRADIENT } from "../brend";
import { SHRIFT } from "../shrift";
import { yumshoq } from "../animatsiya";
import { SARLAVHA_TEPA } from "../olcham";

type Props = {
  matn: string;
  /** Gradient bilan ajratiladigan so'zlar (tinish belgisisiz yoziladi) */
  urgu?: string[];
  kechikish?: number;
  /** Shu kadrdan boshlab sarlavha yuqoriga ko'tarilib yo'qoladi */
  chiqishKadri?: number;
  olcham?: number;
  joy?: "yuqori" | "past";
  tepa?: number;
};

/**
 * Kinetik tipografiya: so'zlar ketma-ket, pastdan blur bilan chiqadi;
 * kerak bo'lsa yuqoriga ko'tarilib yo'qoladi (sarlavha almashishi uchun).
 * Ovozsiz ko'rilganda ham gap tushunarli bo'lsin — katta va qalin.
 */
export const Sarlavha: React.FC<Props> = ({
  matn,
  urgu = [],
  kechikish = 0,
  chiqishKadri,
  olcham = 58,
  joy = "yuqori",
  tepa,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sozlar = matn.split(" ");

  const chiqish =
    chiqishKadri === undefined
      ? 0
      : interpolate(frame, [chiqishKadri, chiqishKadri + 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  if (chiqish >= 1) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: 72,
        right: 72,
        ...(joy === "yuqori" ? { top: tepa ?? SARLAVHA_TEPA } : { bottom: tepa ?? 300 }),
        display: "flex",
        flexWrap: "wrap",
        gap: `${olcham * 0.18}px ${olcham * 0.26}px`,
        justifyContent: "center",
        fontFamily: SHRIFT,
        fontSize: olcham,
        fontWeight: 800,
        letterSpacing: "-0.02em",
        lineHeight: 1.1,
        textAlign: "center",
        transform: `translateY(${-chiqish * 46}px)`,
        opacity: 1 - chiqish,
        filter: chiqish > 0 ? `blur(${chiqish * 8}px)` : undefined,
      }}
    >
      {sozlar.map((s, i) => {
        const p = yumshoq(frame, fps, kechikish + i * 2.4);
        const y = interpolate(p, [0, 1], [34, 0]);
        const blur = interpolate(p, [0, 1], [10, 0]);
        const tozaSoz = s.replace(/[.,:—?!·]/g, "");
        const urgulimi = urgu.includes(tozaSoz);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `translateY(${y}px)`,
              opacity: p,
              filter: `blur(${blur}px)`,
              ...(urgulimi
                ? {
                    background: GRADIENT,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }
                : { color: B.matn }),
            }}
          >
            {s}
          </span>
        );
      })}
    </div>
  );
};
