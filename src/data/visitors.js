// Visitor Day — a low-stakes bonus mode. Family members give a one-time
// Bonus Potential boost (tracked permanently on PLAYER_STATE.visitorGreeted
// so it can't be farmed) plus a free heal every visit. Vendors give a
// repeatable heal + a temporary "Well Fed" battle buff. Subcontractors give
// a repeatable small Bonus Potential bump (schmoozing pays off, a little,
// every time). Clients give a bigger one-time Bonus Potential boost — the
// same "first impression only" rule as family.
//
// Every visitor's title is prefixed with its category (Vendor —, Subcontractor
// —, Client —) so the type is obvious at a glance; family titles are
// self-evidently family.

const VISITORS = [
  {
    id: "wife",
    name: "Colleen",
    title: "Your Wife",
    type: "family",
    portraitColor: 0xc25a8a,
    hairColor: 0xd9c27a,
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
    title: "Vendor — Taco Truck",
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
    title: "Vendor — Sandwich Cart",
    type: "vendor",
    portraitColor: 0x8a5a2e,
    dialogue: [
      "Turkey club, no onions, just like you like it.",
      "Free refill on the chips. Go get 'em, champ.",
    ],
  },
  {
    id: "coffee_cart",
    name: "Nadia",
    title: "Vendor — Coffee Cart",
    type: "vendor",
    portraitColor: 0x5a3a2a,
    dialogue: [
      "Triple shot, on the house. You looked like a triple-shot kind of morning.",
      "I've been pouring coffee at this open house for six years. I've seen things.",
    ],
  },
  {
    id: "icecream_cart",
    name: "Theo",
    title: "Vendor — Ice Cream Cart",
    type: "vendor",
    portraitColor: 0xdfc9a0,
    dialogue: [
      "One scoop or two? Actually, don't answer, I'm giving you two.",
      "Melts fast in this heat. Kind of like deadlines around here.",
    ],
  },
  {
    id: "elec_sub",
    name: "Marcus",
    title: "Subcontractor — Electrical",
    type: "subcontractor",
    portraitColor: 0xc27a1e,
    dialogue: [
      "Panel's rough-in is ahead of schedule for once. Don't tell the scheduler.",
      "Good open house. Free food AND nobody's asking me for a change order.",
    ],
  },
  {
    id: "concrete_sub",
    name: "Rosa",
    title: "Subcontractor — Concrete",
    type: "subcontractor",
    portraitColor: 0x8a8478,
    dialogue: [
      "Pour went clean yesterday. First one all month that did.",
      "Nice to see the office side of things for once. It's a lot quieter.",
    ],
  },
  {
    id: "client_locke",
    name: "Whitman Locke",
    title: "Client — Meridian Energy",
    type: "client",
    portraitColor: 0x2a3a5a,
    dialogue: [
      "Nice turnout. Good sign for a firm we're trusting with nine figures.",
      "Off the clock today — just here for the tacos, officially.",
      "Keep doing what you're doing. We're watching, in a good way.",
    ],
  },
  {
    id: "client_nwosu",
    name: "Adaeze Nwosu",
    title: "Client — Meridian Energy",
    type: "client",
    portraitColor: 0x5a2a3a,
    dialogue: [
      "I read your last progress report twice. That's a compliment, mostly.",
      "This is the first EPC open house I've been to with decent coffee.",
      "Don't let the change orders get to you. We see the good work too.",
    ],
  },
];

// The Visitor Day lobby map. Legend:
//   0 floor  1 wall  2 reception desk(solid)  3 plant(solid)
//   5 food/vendor cart(solid)  7 flower bed(walkable, decorative)
const VISITOR_DAY = {
  tileSize: 32,
  width: 24,
  height: 20,
  layout: [
    "111111111111111111111111",
    "100000000000000000000001",
    "103000000022220000003001",
    "100000000022220000000001",
    "100000000000000000000001",
    "100000000000000000000001",
    "100000000000000000000001",
    "100000000000000000000001",
    "100777777777777777777001",
    "100000000000000000000001",
    "100000000000000000000001",
    "100000000000000000000001",
    "100055550000000055550001",
    "100055550000000055550001",
    "100000000000000000000001",
    "100055550000000055550001",
    "100055550000000055550001",
    "103000000000000000003001",
    "100000000000000000000001",
    "111111111111111111111111",
  ],
  playerStart: { x: 11, y: 18 },
  exitPortal: { x: 10, y: 18 },
  landmarks: [
    { r0: 12, c0: 4, r1: 13, c1: 7, label: "TACO\nTRUCK" },
    { r0: 12, c0: 16, r1: 13, c1: 19, label: "SANDWICH\nCART" },
    { r0: 15, c0: 4, r1: 16, c1: 7, label: "COFFEE\nCART" },
    { r0: 15, c0: 16, r1: 16, c1: 19, label: "ICE CREAM\nCART" },
  ],
  receptionLabel: { x: 12, y: 2, text: "RECEPTION" },
  visitorPlacements: [
    { visitorId: "wife", x: 9, y: 6 },
    { visitorId: "daughter", x: 14, y: 6 },
    { visitorId: "parents", x: 11, y: 4 },
    { visitorId: "elec_sub", x: 6, y: 9 },
    { visitorId: "concrete_sub", x: 17, y: 9 },
    { visitorId: "client_locke", x: 6, y: 10 },
    { visitorId: "client_nwosu", x: 17, y: 10 },
    { visitorId: "taco_vendor", x: 8, y: 12 },
    { visitorId: "sandwich_vendor", x: 15, y: 12 },
    { visitorId: "coffee_cart", x: 8, y: 15 },
    { visitorId: "icecream_cart", x: 15, y: 15 },
  ],
};
