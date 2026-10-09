import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { B } from "../brend";
import { SHRIFT } from "../shrift";
import { Fon } from "../components/Fon";
import { Yaqin } from "../components/Noutbuk";
import { Sarlavha } from "../components/Sarlavha";

/**
 * 21–26 s. Jadval: xonalar bo'yicha hafta. Pastda tizim qoidasi —
 * bir xonaga ikki guruh qo'yib bo'lmaydi.
 */
export const Jadval: React.FC = () => {
  const frame = useCurrentFrame();

  const ogohlantirish = interpolate(frame, [78, 94], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Fon />

      <Sarlavha matn="Jadval o'zi tekshiradi" urgu={["o'zi"]} olcham={60} tepa={236} />

      <Yaqin
        nom="19-kompyuter-jadval.png"
        en={960}
        balandlik={840}
        markaz={[0.55, 0.45]}
        masshtab={[1.25, 1.42]}
        kechikish={4}
        y={40}
      />

      {/* qoida chizig'i — skrinshotning o'zidan emas, ustiga qo'yilgan izoh */}
      <div
        style={{
          position: "absolute",
          left: 84,
          right: 84,
          bottom: 352,
          padding: "30px 36px",
          borderRadius: 24,
          background: "rgba(20,27,36,.94)",
          border: `1px solid ${B.yashil}55`,
          fontFamily: SHRIFT,
          fontSize: 38,
          fontWeight: 600,
          color: B.matn,
          textAlign: "center",
          letterSpacing: "-0.015em",
          transform: `translateY(${interpolate(ogohlantirish, [0, 1], [38, 0])}px)`,
          opacity: ogohlantirish,
          boxShadow: `0 24px 60px rgba(0,0,0,.5)`,
        }}
      >
        Bir xonaga ikki guruh —{" "}
        <span style={{ color: B.yashil, fontWeight: 800 }}>tizim ruxsat bermaydi</span>
      </div>
    </AbsoluteFill>
  );
};
