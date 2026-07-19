// PLACEHOLDER ENEMIES — corporate-satire random encounters.
// Each has hp, atk, def, a color for its placeholder sprite, and a couple
// of flavor "moves" it can use against you. Add more as we flesh out the
// battle system (status effects, boss-only mechanics, etc).

const ENEMIES = [
  {
    id: "scope_creep",
    name: "Scope Creep",
    hp: 18,
    atk: 4,
    def: 1,
    xp: 10,
    color: 0x7a2e2e,
    moves: [
      { name: "\"One More Small Thing\"", dmgMin: 2, dmgMax: 5 },
      { name: "Moving Goalposts", dmgMin: 3, dmgMax: 6 },
    ],
    flavorIntro: "A SCOPE CREEP oozes out from under a change order!",
  },
  {
    id: "reply_all",
    name: "Reply-All Storm",
    hp: 12,
    atk: 3,
    def: 0,
    xp: 7,
    color: 0x2e5a7a,
    moves: [
      { name: "CC Everyone", dmgMin: 1, dmgMax: 4 },
      { name: "\"Per My Last Email\"", dmgMin: 2, dmgMax: 5 },
    ],
    flavorIntro: "Your inbox shudders. A REPLY-ALL STORM has appeared!",
  },
  {
    id: "deadline_wraith",
    name: "Deadline Wraith",
    hp: 22,
    atk: 5,
    def: 2,
    xp: 14,
    color: 0x3a2e5a,
    moves: [
      { name: "\"Client Needs It EOD\"", dmgMin: 3, dmgMax: 7 },
      { name: "Sudden Milestone", dmgMin: 4, dmgMax: 6 },
    ],
    flavorIntro: "The air turns cold. A DEADLINE WRAITH looms over you!",
  },
];
