// Bonus Potential — the game's reputation score. Starts neutral at 50 and
// moves based on how battles/negotiations go, not just pass/fail on
// checkpoints. Purely a score + flavor label for now; nothing gates on it
// yet, but it's tracked persistently on PLAYER_STATE.

const BONUS_TIERS = [
  { min: 0, label: "Not Bonus Eligible" },
  { min: 21, label: "Under Review" },
  { min: 41, label: "Meets Expectations" },
  { min: 61, label: "Exceeds Expectations" },
  { min: 81, label: "Stock Options Mentioned Once" },
];

function getBonusLabel(value) {
  let label = BONUS_TIERS[0].label;
  for (const t of BONUS_TIERS) {
    if (value >= t.min) label = t.label;
  }
  return label;
}

function applyBonusPotential(delta) {
  const p = PLAYER_STATE;
  p.bonusPotential = Phaser.Math.Clamp(p.bonusPotential + delta, 0, 100);
  const sign = delta > 0 ? "+" : "";
  return `Bonus Potential ${sign}${delta} (${p.bonusPotential}/100 — ${getBonusLabel(p.bonusPotential)})`;
}
