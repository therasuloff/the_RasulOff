import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Fon } from "../components/Fon";
import { Yaqin } from "../components/Noutbuk";
import { Sarlavha } from "../components/Sarlavha";
import { chiqish } from "../animatsiya";

/**
 * 48–52 s. Bitta ekran yashildan qizil-oqqa "bo'yaladi" —
 * har markaz o'z brendida ishlatishi ko'rsatiladi.
 */
export const Brend: React.FC = () => {
  const frame = useCurrentFrame();

  // diagonal bo'yoq chizig'i chapdan o'ngga yuradi
  const boyoq = interpolate(frame, [34, 76], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: chiqish,
  });
  const kesim = `polygon(${-20 + boyoq * 150}% 0, ${20 + boyoq * 150}% 0, ${
    -20 + boyoq * 150
  }% 100%, ${-60 + boyoq * 150}% 100%)`;
  const qizilKesim = `polygon(0 0, ${boyoq * 130}% 0, ${boyoq * 130 - 40}% 100%, 0 100%)`;

  return (
    <AbsoluteFill>
      <Fon jonlilik={0.85} />

      <Sarlavha matn="Har markazga — o'z rangi" urgu={["o'z", "rangi"]} olcham={60} tepa={236} />

      {/* yashil (asosiy) brend */}
      <Yaqin
        nom="16-kompyuter-reception.png"
        en={944}
        balandlik={740}
        markaz={[0.5, 0.35]}
        masshtab={[1.2, 1.26]}
        kechikish={2}
        y={60}
      />

      {/* qizil-oq mijoz brendi — ustidan yuriladi */}
      {boyoq > 0 && (
        <AbsoluteFill style={{ clipPath: qizilKesim, WebkitClipPath: qizilKesim }}>
          <Yaqin
            nom="17-kompyuter-qizil-brend.png"
            en={944}
            balandlik={740}
            markaz={[0.5, 0.35]}
            masshtab={[1.2, 1.26]}
            kechikish={0}
            y={60}
          />
        </AbsoluteFill>
      )}

      {/* bo'yoq chetidagi yorug'lik */}
      {boyoq > 0 && boyoq < 1 && (
        <AbsoluteFill
          style={{
            clipPath: kesim,
            WebkitClipPath: kesim,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,.5), transparent)",
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
