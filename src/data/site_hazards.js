// Random-encounter pool specific to site visits — separate from the office
// ENEMIES so hazard zones feel distinct from inbox/meeting chaos back at HQ.

const SITE_HAZARDS = [
  {
    id: "swinging_load",
    name: "Swinging Load",
    hp: 20,
    atk: 6,
    def: 1,
    xp: 12,
    color: 0xc27a1e,
    moves: [
      { name: "Uncalled Tag Line", dmgMin: 3, dmgMax: 7 },
      { name: "Nobody Called Clear", dmgMin: 4, dmgMax: 8 },
    ],
    flavorIntro: "A load swings wide of the crane pad. SWINGING LOAD blocks your path!",
  },
  {
    id: "uncovered_rebar",
    name: "Uncovered Rebar",
    hp: 14,
    atk: 4,
    def: 2,
    xp: 9,
    color: 0x8a5a2e,
    moves: [
      { name: "Impalement Hazard (Technically)", dmgMin: 2, dmgMax: 6 },
      { name: "\"It's Been Like That All Week\"", dmgMin: 2, dmgMax: 5 },
    ],
    flavorIntro: "A field of rebar with no caps in sight. UNCOVERED REBAR emerges!",
  },
  {
    id: "missing_guardrail",
    name: "Missing Guardrail",
    hp: 18,
    atk: 5,
    def: 1,
    xp: 11,
    color: 0xb5942e,
    moves: [
      { name: "Unprotected Edge", dmgMin: 3, dmgMax: 7 },
      { name: "\"The Guardrail's on Order\"", dmgMin: 3, dmgMax: 6 },
    ],
    flavorIntro: "The edge of the platform has no rail at all. MISSING GUARDRAIL appears!",
  },
  {
    id: "heat_stress",
    name: "Heat Stress",
    hp: 16,
    atk: 5,
    def: 0,
    xp: 10,
    color: 0xd94e2e,
    moves: [
      { name: "Forgot the Water Cooler", dmgMin: 3, dmgMax: 6 },
      { name: "Skipped the Shade Break", dmgMin: 3, dmgMax: 7 },
    ],
    flavorIntro: "The sun is brutal and the water cooler is empty. HEAT STRESS closes in!",
  },
];
