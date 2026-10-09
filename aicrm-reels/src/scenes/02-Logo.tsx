import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Fon } from "../components/Fon";
import { Logo } from "../components/Logo";
import { Sarlavha } from "../components/Sarlavha";

/** 3–7 s. Logotip chiziladi, shior chiqadi. */
export const LogoSahna: React.FC = () => {
  const frame = useCurrentFrame();

  // logo chizilgach bir marta porlab o'tadi
  const porlash = interpolate(frame, [30, 44], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Fon jonlilik={1.25} />
      <Logo olcham={300} kechikish={4} y={-90} />
      <Sarlavha
        matn="O'quv markaz boshqaruvining kelajagi"
        urgu={["kelajagi"]}
        olcham={50}
        joy="past"
        tepa={430}
        kechikish={38}
      />
      <AbsoluteFill
        style={{
          background: "rgba(255,255,255,.055)",
          opacity: porlash * (1 - porlash) * 4,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
