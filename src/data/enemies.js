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
  {
    id: "redline_barrage",
    name: "Redline Barrage",
    hp: 16,
    atk: 4,
    def: 2,
    xp: 12,
    color: 0x4a5aa6,
    moves: [
      { name: "Nonconformance Report", dmgMin: 3, dmgMax: 6 },
      { name: "\"Redline All Of It\"", dmgMin: 2, dmgMax: 5 },
    ],
    flavorIntro: "Trent slides a stack of red-inked drawings across the table. A REDLINE BARRAGE begins!",
  },
  {
    id: "schedule_slip",
    name: "Schedule Slip",
    hp: 20,
    atk: 4,
    def: 1,
    xp: 13,
    color: 0x8a6a2e,
    moves: [
      { name: "Critical Path Shift", dmgMin: 3, dmgMax: 6 },
      { name: "\"We'll Make It Up\"", dmgMin: 2, dmgMax: 5 },
    ],
    flavorIntro: "The Gantt chart lurches sideways. A SCHEDULE SLIP breaks loose!",
  },
  {
    id: "rival_review",
    name: "Deja Marsh, Eng. Mgr.",
    hp: 24,
    atk: 5,
    def: 2,
    xp: 16,
    bonusPotential: 10,
    color: 0x5a2e6b,
    moves: [
      { name: "\"My Team Ships Faster\"", dmgMin: 3, dmgMax: 6 },
      { name: "Budget One-Upmanship", dmgMin: 3, dmgMax: 7 },
    ],
    flavorIntro: "Deja Marsh, an Engineering Manager from another department, squares up. Rival energy!",
    winMessage: "Deja tips her head. \"Not bad. Rematch next quarter.\"",
  },
];
