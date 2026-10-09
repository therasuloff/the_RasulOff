import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Fon } from "../components/Fon";
import { Telefon } from "../components/Telefon";
import { Sarlavha } from "../components/Sarlavha";
import { Bosish } from "../components/Kursor";
import { Urgu } from "../components/Urgu";
import { chiqish } from "../animatsiya";
import { nuqta, quti } from "../olcham";

/** 14–21 s. Reception: to'lov bir bosishda, kassa kun bo'yicha yig'iladi. */
export const Reception: React.FC = () => {
  const frame = useCurrentFrame();
  const uzatish = interpolate(frame, [104, 126], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: chiqish,
  });

  const [tx, ty] = nuqta(572, 348); // "+ Yangi talaba" tugmasi

  return (
    <AbsoluteFill>
      <Fon />

      <Sarlavha
        matn="To'lov — bir bosishda"
        urgu={["bir", "bosishda"]}
        olcham={60}
        chiqishKadri={92}
      />
      <Sarlavha
        matn="Qarz o'zi yoziladi, eslatma SMS o'zi ketadi"
        urgu={["o'zi", "o'zi"]}
        olcham={50}
        kechikish={100}
      />

      {uzatish < 1 && (
        <AbsoluteFill style={{ opacity: 1 - uzatish }}>
          <Telefon nom="04-reception-bugun.png" kechikish={2} />
          <Bosish x={tx} y={ty} kadr={40} />
          {/* "Bugungi kassa" kartasi */}
          <Urgu {...quti(34, 412, 712, 178)} kadr={58} davomiylik={44} />
        </AbsoluteFill>
      )}

      {uzatish > 0 && (
        <AbsoluteFill style={{ opacity: uzatish }}>
          <Telefon nom="05-reception-kassa.png" kechikish={104} yon="ong" />
          {/* kun tushumi — to'lov usullari bo'yicha rangli chiziq */}
          <Urgu {...quti(34, 518, 712, 322)} kadr={132} davomiylik={62} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
