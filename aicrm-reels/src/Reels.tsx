import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { B, DAVOMIYLIK, SAHNALAR } from "./brend";
import { shriftniYukla, SHRIFT } from "./shrift";
import { Progress } from "./components/Progress";

import { Ilmoq } from "./scenes/01-Ilmoq";
import { LogoSahna } from "./scenes/02-Logo";
import { Direktor } from "./scenes/03-Direktor";
import { Reception } from "./scenes/04-Reception";
import { Jadval } from "./scenes/05-Jadval";
import { Oqituvchi } from "./scenes/06-Oqituvchi";
import { AiUstoz } from "./scenes/07-AiUstoz";
import { OtaOna } from "./scenes/08-OtaOna";
import { Brend } from "./scenes/09-Brend";
import { TezKunda } from "./scenes/10-TezKunda";
import { Yakun } from "./scenes/11-Yakun";

const USTMA_UST = 9; // sahnalar shu qadar kadr bir-biriga qo'shiladi (yumshoq o'tish)

/** Sahnani o'rab, kirishida yumshoq ochilishini ta'minlaydi. */
const Sahna: React.FC<{ children: React.ReactNode; birinchi?: boolean }> = ({
  children,
  birinchi = false,
}) => {
  const frame = useCurrentFrame();
  const ochilish = birinchi
    ? 1
    : interpolate(frame, [0, USTMA_UST], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
  return <AbsoluteFill style={{ opacity: ochilish }}>{children}</AbsoluteFill>;
};

export const Reels: React.FC = () => {
  shriftniYukla();

  const s = SAHNALAR;
  const qatorlar: Array<[keyof typeof SAHNALAR, React.ReactNode]> = [
    ["ilmoq", <Ilmoq />],
    ["logo", <LogoSahna />],
    ["direktor", <Direktor />],
    ["reception", <Reception />],
    ["jadval", <Jadval />],
    ["oqituvchi", <Oqituvchi />],
    ["aiUstoz", <AiUstoz />],
    ["otaOna", <OtaOna />],
    ["brend", <Brend />],
    ["tezKunda", <TezKunda />],
    ["yakun", <Yakun />],
  ];

  return (
    <AbsoluteFill style={{ background: B.fon, fontFamily: SHRIFT }}>
      {qatorlar.map(([kalit, element], i) => (
        <Sequence
          key={kalit}
          from={s[kalit].boshlanish}
          // oxiridan ortiqcha kadr — keyingi sahna ustiga ochilishi uchun
          durationInFrames={s[kalit].davomiylik + USTMA_UST}
          layout="none"
        >
          <Sahna birinchi={i === 0}>{element}</Sahna>
        </Sequence>
      ))}

      <Progress jami={DAVOMIYLIK} />
    </AbsoluteFill>
  );
};
