// The promotion ladder. Character level maps to a job title — leveling up
// from battles/XP is the mechanical layer, but the story layer is climbing
// this ladder toward Executive. Tune thresholds as the game gets longer.

const RANKS = [
  { minLevel: 1, title: "Engineering Manager" },
  { minLevel: 3, title: "Senior Engineering Manager" },
  { minLevel: 6, title: "Director of Engineering" },
  { minLevel: 9, title: "VP of Engineering" },
  { minLevel: 12, title: "Executive" },
];

// Executive is gated behind executiveUnlocked (beating the Performance
// Review boss), not level — the fight is the promotion, so it can happen
// as soon as you reach VP (Lv.9) regardless of how much further XP takes you.
function getRank(level, executiveUnlocked) {
  if (executiveUnlocked) {
    return RANKS[RANKS.length - 1];
  }
  let current = RANKS[0];
  for (const r of RANKS) {
    if (r.title === "Executive") continue;
    if (level >= r.minLevel) current = r;
  }
  return current;
}

function getRankTitle(level, executiveUnlocked) {
  return getRank(level, executiveUnlocked).title;
}
