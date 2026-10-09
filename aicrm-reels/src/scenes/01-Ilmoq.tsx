import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, random } from "remotion";
import { B } from "../brend";
import { SHRIFT } from "../shrift";
import { Sarlavha } from "../components/Sarlavha";
import { chiqish } from "../animatsiya";

/**
 * 0–3 s. Ilmoq: daftar/Excel katakchalari tez almashadi, qizarib o'chadi.
 * Maqsad — birinchi soniyada "bu mening muammoyim" degan tanish hissi.
 */
export const Ilmoq: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const QATOR = 14;
  const USTUN = 5;

  // jadval 0–40 kadrda to'ladi, 46–76 da qizaradi va qulaydi
  const toldirish = interpolate(frame, [4, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const qizarish = interpolate(frame, [46, 64], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const qulash = interpolate(frame, [62, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: chiqish,
  });

  // titrash — "nazoratdan chiqqan" hissi
  const titrash = qizarish > 0 ? Math.sin(frame * 2.2) * qizarish * 5 : 0;

  return (
    <AbsoluteFill style={{ background: "#05070A" }}>
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 520,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          transform: `translateX(${titrash}px) translateY(${qulash * 120}px) scale(${
            1 - qulash * 0.1
          })`,
          opacity: 1 - qulash,
        }}
      >
        {Array.from({ length: QATOR }).map((_, q) => {
          const qatorP = interpolate(
            toldirish,
            [q / QATOR, (q + 1.4) / QATOR],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div key={q} style={{ display: "flex", gap: 10, opacity: qatorP }}>
              {Array.from({ length: USTUN }).map((_, u) => {
                const kenglik = 0.6 + random(`k${q}-${u}`) * 0.4;
                const qizilmi = random(`r${q}-${u}`) > 0.62;
                return (
                  <div
                    key={u}
                    style={{
                      flex: u === 0 ? 1.6 : 1,
                      height: 58,
                      borderRadius: 7,
                      background:
                        qizilmi && qizarish > 0
                          ? `rgba(255,70,70,${0.1 + qizarish * 0.26})`
                          : "rgba(255,255,255,.045)",
                      border: `1px solid ${
                        qizilmi && qizarish > 0
                          ? `rgba(255,90,90,${0.3 + qizarish * 0.5})`
                          : "rgba(255,255,255,.08)"
                      }`,
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: 14,
                    }}
                  >
                    <div
                      style={{
                        width: `${kenglik * 64}%`,
                        height: 11,
                        borderRadius: 5,
                        background:
                          qizilmi && qizarish > 0
                            ? `rgba(255,120,120,${0.45 + qizarish * 0.4})`
                            : "rgba(255,255,255,.13)",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <Sarlavha
        matn="O'quv markazingiz hali ham daftar va Excel'dami?"
        urgu={["daftar", "Excel'dami"]}
        olcham={66}
        tepa={248}
        kechikish={2}
      />

      {/* qizil nur — jadval qulaganda */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 58%, rgba(255,60,60,${
            qizarish * 0.2
          }) 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />
      <div style={{ fontFamily: SHRIFT, display: "none" }} />
    </AbsoluteFill>
  );
};
