// Visitor Day — a low-stakes bonus mode. Family members give a one-time
// Bonus Potential boost (tracked permanently on PLAYER_STATE.visitorGreeted
// so it can't be farmed) plus a free heal every visit. Vendors give a
// repeatable heal + a temporary "Well Fed" battle buff.

const VISITORS = [
  {
    id: "wife",
    name: "Colleen",
    title: "Your Wife",
    type: "family",
    portraitColor: 0xc25a8a,
    dialogue: [
      "Hey, stranger. I brought you a coffee since I figured you forgot to eat.",
      "Indra misses you, but she knows you're out here becoming a big deal.",
      "Don't let them talk you into anything unreasonable today. I mean it, Karsh.",
    ],
  },
  {
    id: "daughter",
    name: "Indra",
    title: "Your Daughter",
    type: "family",
    portraitColor: 0xe6b84a,
    dialogue: [
      "Daddy! I made you a drawing. It's you fighting a big red monster.",
      "Mommy said it's called 'scope creep.' Is that a real monster?",
      "Can we get ice cream after work? Please? PLEASE?",
    ],
  },
  {
    id: "parents",
    name: "Mom & Dad",
    title: "Your Parents",
    type: "family",
    portraitColor: 0x6b8a5a,
    dialogue: [
      "So when do you become the boss? Your father wants to know.",
      "We're very proud of you, even if we don't fully understand what an EPC is.",
      "Your mother made extra for dinner. Don't work too late tonight.",
    ],
  },
  {
    id: "taco_vendor",
    name: "Ramon",
    title: "Taco Truck",
    type: "vendor",
    portraitColor: 0xc27a1e,
    dialogue: [
      "Two carnitas, extra salsa, on the house. Looked like you needed it.",
      "Eat up. You've got that 'about to fight a client' look in your eyes.",
    ],
  },
  {
    id: "sandwich_vendor",
    name: "Big Pete",
    title: "Sandwich Cart",
    type: "vendor",
    portraitColor: 0x8a5a2e,
    dialogue: [
      "Turkey club, no onions, just like you like it.",
      "Free refill on the chips. Go get 'em, champ.",
    ],
  },
];

// The Visitor Day lobby map. Legend:
//   0 floor  1 wall  2 reception desk(solid)  3 plant(solid)  5 food truck(solid)
const VISITOR_DAY = {
  tileSize: 32,
  width: 24,
  height: 14,
  layout: [
    "111111111111111111111111",
    "100000000000000000000001",
    "103000000022220000003001",
    "100000000022220000000001",
    "100000000000000000000001",
    "100000000000000000000001",
    "100000000000000000000001",
    "100000000000000000000001",
    "100000000000000000000001",
    "100055550000000055550001",
    "100055550000000055550001",
    "103000000000000000003001",
    "100000000000000000000001",
    "111111111111111111111111",
  ],
  playerStart: { x: 11, y: 12 },
  exitPortal: { x: 10, y: 12 },
  landmarks: [
    { r0: 9, c0: 4, r1: 10, c1: 7, label: "TACO\nTRUCK" },
    { r0: 9, c0: 16, r1: 10, c1: 19, label: "SANDWICH\nCART" },
  ],
  receptionLabel: { x: 12, y: 2, text: "RECEPTION" },
  visitorPlacements: [
    { visitorId: "wife", x: 9, y: 6 },
    { visitorId: "daughter", x: 14, y: 6 },
    { visitorId: "parents", x: 11, y: 4 },
    { visitorId: "taco_vendor", x: 8, y: 9 },
    { visitorId: "sandwich_vendor", x: 15, y: 9 },
  ],
};
