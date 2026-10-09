import { Audio, Sequence, staticFile } from "remotion";
import { DIKTOR } from "./ovozlar";

/**
 * Ovoz yo'li: fon musiqasi, sahna effektlari va (kelganda) diktor ovozi.
 *
 * Effektlar `public/ovoz/` da — hammasi `skript/ovoz-yasash.py` bilan
 * sintez qilingan, shuning uchun litsenziya masalasi yo'q.
 *
 * Kadrlar sahnalardagi harakatlarga bog'langan: bosish animatsiyasi
 * qaysi kadrda bo'lsa, klik ham o'sha kadrda.
 */

type Effekt = { fayl: string; kadr: number; kuch?: number };

const EFFEKTLAR: Effekt[] = [
  // ── Ilmoq → Logo
  { fayl: "zarba.wav", kadr: 60, kuch: 0.85 },       // jadval qulaydi
  { fayl: "koterilish.wav", kadr: 66, kuch: 0.5 },   // logotipga ko'tarilish
  { fayl: "jaranglash.wav", kadr: 92, kuch: 0.6 },   // logotip paydo bo'ldi

  // ── sahna almashuvlari (barchasi butun soniyada = zarbda)
  { fayl: "whoosh.wav", kadr: 210, kuch: 0.5 },
  { fayl: "whoosh.wav", kadr: 420, kuch: 0.5 },
  { fayl: "whoosh.wav", kadr: 630, kuch: 0.5 },
  { fayl: "whoosh.wav", kadr: 780, kuch: 0.5 },
  { fayl: "whoosh.wav", kadr: 1020, kuch: 0.5 },
  { fayl: "whoosh.wav", kadr: 1290, kuch: 0.5 },
  { fayl: "whoosh.wav", kadr: 1440, kuch: 0.5 },
  { fayl: "whoosh.wav", kadr: 1560, kuch: 0.5 },
  { fayl: "whoosh.wav", kadr: 1680, kuch: 0.5 },

  // ── sahna ichidagi ekran almashuvlari (pastroq)
  { fayl: "whoosh.wav", kadr: 330, kuch: 0.3 },   // direktor: telefon → kompyuter
  { fayl: "whoosh.wav", kadr: 524, kuch: 0.3 },   // reception: bugun → kassa
  { fayl: "whoosh.wav", kadr: 912, kuch: 0.3 },   // o'qituvchi: davomat → oylik
  { fayl: "whoosh.wav", kadr: 1196, kuch: 0.3 },  // AI Ustoz → o'quvchi

  // ── bosishlar (Kursor animatsiyasi bilan bir kadrda)
  { fayl: "bosish.wav", kadr: 460, kuch: 0.6 },   // "+ Yangi talaba"
  { fayl: "bosish.wav", kadr: 812, kuch: 0.6 },   // davomat: Keldi
  { fayl: "bosish.wav", kadr: 836, kuch: 0.6 },   // davomat: Keldi
  { fayl: "bosish.wav", kadr: 866, kuch: 0.7 },   // Saqlash

  // ── urg'u halqalari
  { fayl: "urgu.wav", kadr: 234, kuch: 0.32 },
  { fayl: "urgu.wav", kadr: 288, kuch: 0.32 },
  { fayl: "urgu.wav", kadr: 478, kuch: 0.32 },
  { fayl: "urgu.wav", kadr: 552, kuch: 0.32 },
  { fayl: "urgu.wav", kadr: 940, kuch: 0.32 },
  { fayl: "urgu.wav", kadr: 1332, kuch: 0.32 },

  // ── AI Ustoz: ovoz halqalari ekrandagi animatsiya bilan birga pulsatsiya qiladi
  { fayl: "halqa.wav", kadr: 1040, kuch: 0.3 },
  { fayl: "halqa.wav", kadr: 1086, kuch: 0.26 },
  { fayl: "halqa.wav", kadr: 1132, kuch: 0.22 },
  { fayl: "halqa.wav", kadr: 1178, kuch: 0.18 },

  // ── brend rangi bo'yalishi
  { fayl: "boyoq.wav", kadr: 1474, kuch: 0.55 },

  // ── "Tez kunda" kartochkalari
  { fayl: "pop.wav", kadr: 1576, kuch: 0.45 },
  { fayl: "pop.wav", kadr: 1588, kuch: 0.45 },
  { fayl: "pop.wav", kadr: 1600, kuch: 0.45 },

  // ── yakuniy logotip
  { fayl: "jaranglash.wav", kadr: 1686, kuch: 0.6 },
];

export const Ovoz: React.FC = () => (
  <>
    {/* fon musiqasi — 120 BPM, sahna chegaralari zarbga tushadi.
        Diktor ovozi kelganda musiqa pasayadi. */}
    <Audio
      src={staticFile("ovoz/musiqa.m4a")}
      volume={DIKTOR ? 0.42 : 1}
    />

    {EFFEKTLAR.map((e, i) => (
      <Sequence key={`${e.fayl}-${e.kadr}-${i}`} from={e.kadr} layout="none">
        <Audio src={staticFile(`ovoz/${e.fayl}`)} volume={e.kuch ?? 0.5} />
      </Sequence>
    ))}

    {DIKTOR && <Audio src={staticFile(`ovoz/${DIKTOR}`)} volume={1} />}
  </>
);
