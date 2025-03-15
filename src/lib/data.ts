export interface Card {
  src: string;
  matched: boolean;
  name: string;
  id?: number;
}

export const cardImages: Card[] = [
  {
    src: "/dratini.svg",
    matched: false,
    name: "Dratini",
  },
  {
    src: "/eevee.svg",
    matched: false,
    name: "Eevee",
  },
  {
    src: "/mankey.svg",
    matched: false,
    name: "Mankey",
  },
  {
    src: "/psyduck.svg",
    matched: false,
    name: "Psyduck",
  },
  {
    src: "/zubat.svg",
    matched: false,
    name: "Zubat",
  },
  {
    src: "/rattata.svg",
    matched: false,
    name: "Rattata",
  },
  {
    src: "/pidgey.svg",
    matched: false,
    name: "Pidgey",
  },
  {
    src: "/caterpie.svg",
    matched: false,
    name: "Caterpie",
  },
];
