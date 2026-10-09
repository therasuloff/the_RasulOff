import { AbsoluteFill } from "remotion";
import { B } from "../brend";
import { Fon } from "../components/Fon";
import { Sarlavha } from "../components/Sarlavha";
import { Karta } from "../components/Karta";

const Kitob = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={B.fon} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const Daftar = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={B.fon} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
  </svg>
);
const Tanga = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={B.fon} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v10M9.5 9.5h5M9.5 14.5h5" />
  </svg>
);

/**
 * 52–56 s. "Tez kunda" — hali chiqmagan funksiyalar.
 * Ataylab kartochka ko'rinishida: haqiqiy ekran deb ko'rsatilmaydi (brif talabi).
 */
export const TezKunda: React.FC = () => (
  <AbsoluteFill>
    <Fon jonlilik={0.9} />
    <Sarlavha matn="Tez kunda" urgu={["Tez", "kunda"]} olcham={62} tepa={300} />
    <Karta
      sarlavha="AI elektron darslik"
      izoh="Kitob PDF yuklanadi — AI mavzularga ajratadi"
      kechikish={16}
      y={640}
      belgi={<Kitob />}
    />
    <Karta
      sarlavha="Uy vazifasi ilovada"
      izoh="Matn, daftar surati yoki ovoz bilan topshiriladi"
      kechikish={28}
      y={860}
      belgi={<Daftar />}
    />
    <Karta
      sarlavha="Tanga va reyting"
      izoh="O'quvchilar uchun ball va guruh reytingi"
      kechikish={40}
      y={1080}
      belgi={<Tanga />}
    />
  </AbsoluteFill>
);
