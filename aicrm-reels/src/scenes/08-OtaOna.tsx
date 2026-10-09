import { AbsoluteFill } from "remotion";
import { Fon } from "../components/Fon";
import { Telefon } from "../components/Telefon";
import { Sarlavha } from "../components/Sarlavha";
import { Urgu } from "../components/Urgu";
import { quti } from "../olcham";

/** 43–48 s. Ota-ona: davomat, baho va to'lov — hammasi bitta ilovada. */
export const OtaOna: React.FC = () => (
  <AbsoluteFill>
    <Fon />
    <Sarlavha
      matn="Ota-ona farzandini ilovada kuzatadi"
      urgu={["ilovada"]}
      olcham={56}
    />
    <Telefon nom="11-oquvchi-asosiy.png" kechikish={2} />
    {/* to'lanmagan qarz — ota-ona uchun eng muhim ma'lumot */}
    <Urgu {...quti(34, 862, 712, 198)} kadr={42} davomiylik={66} />
  </AbsoluteFill>
);
