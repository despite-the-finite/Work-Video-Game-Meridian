// Client negotiation encounters — the closing beat of a site visit. Reuses
// the BattleScene engine (same 4-slot menu mechanic as Attack/Skill/Guard/
// Flee) but re-skinned: "HP" represents how entrenched the client is in
// their unreasonable ask. Deplete it to get the change order approved.

const CLIENTS = [
  {
    id: "chip_site_negotiation",
    name: "Chip Wexford, Client Rep",
    hp: 45,
    atk: 7,
    def: 2,
    xp: 30,
    color: 0xb5942e,
    isClientNegotiation: true,
    menuLabels: ["Push Back", "Propose Change Order (5 MP)", "Reassure", "Concede"],
    moves: [
      { name: "\"Can We Just Add This Real Quick\"", dmgMin: 4, dmgMax: 8 },
      { name: "\"It's Basically the Same Scope\"", dmgMin: 4, dmgMax: 7 },
      { name: "Vague Verbal Commitment", dmgMin: 3, dmgMax: 6 },
      { name: "\"My Boss Expects This Today\"", dmgMin: 5, dmgMax: 9 },
    ],
    flavorIntro: "Chip waves you into the site trailer. \"So, quick question...\"",
    winMessage:
      "Chip sighs. \"Fine. Change order it is.\" Papers get signed. The scope stays the scope.",
    loseMessage:
      "\"Great chat!\" Chip leaves before you can object. Scope just grew for free.",
  },
];
