import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { B, GRADIENT } from "../brend";
import { SHRIFT } from "../shrift";
import { Fon } from "../components/Fon";
import { Logo } from "../components/Logo";
import { yumshoq } from "../animatsiya";

/**
 * 56–60 s. Yakun: logotip, sayt, kompaniya.
 * ALOQA o'zgaruvchisini egasi to'ldiradi (brif 7-bo'lim).
 */
const ALOQA = "[TELEFON / TELEGRAM]";

export const Yakun: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const sayt = yumshoq(frame, fps, 34);
  const aloqa = yumshoq(frame, fps, 48);
  const chiqib = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: chiqib }}>
      <Fon jonlilik={1.35} />
      <Logo olcham={250} kechikish={2} y={-150} />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1180,
          textAlign: "center",
          fontFamily: SHRIFT,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            background: GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            opacity: sayt,
            transform: `translateY(${interpolate(sayt, [0, 1], [26, 0])}px)`,
            letterSpacing: "-0.02em",
          }}
        >
          aicrm.cronsys.org
        </div>

        <div
          style={{
            marginTop: 34,
            fontSize: 38,
            fontWeight: 600,
            color: B.matn,
            opacity: aloqa,
            transform: `translateY(${interpolate(aloqa, [0, 1], [22, 0])}px)`,
          }}
        >
          {ALOQA}
        </div>

        <div
          style={{
            marginTop: 54,
            fontSize: 26,
            fontWeight: 500,
            color: B.matn2,
            letterSpacing: "0.22em",
            opacity: aloqa,
          }}
        >
          CRONSYSTEMS
        </div>
      </div>
    </AbsoluteFill>
  );
};
