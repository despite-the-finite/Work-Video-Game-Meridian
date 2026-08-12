// Global player state, shared across scenes via plain global (no bundler,
// so no modules — every scene file is just loaded as a <script> in order).
const PLAYER_STATE = {
  name: "Karsh",
  role: "Multi-Disciplinary Engineering",
  level: 1,
  hp: 30,
  maxHp: 30,
  mp: 10,
  maxMp: 10,
  atk: 6,
  def: 2,
  xp: 0,
  xpToNext: 20,
  executiveUnlocked: false,
  bonusPotential: 20,
  // Earning enough XP/Bonus Potential only queues a level up — it doesn't
  // apply until a site-visit change order is approved, so leveling needs
  // progress in both the office and on-site, not either alone.
  levelUpPending: false,
  visitorGreeted: { wife: false, daughter: false, parents: false },
  wellFedBattles: 0,
  // Keyed by SITE_VISITS id, set true once that site's client negotiation
  // is won (see BattleScene). Other sites use unlockedBy to gate on this.
  completedSites: {},
};

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  parent: "game-container",
  pixelArt: true,
  backgroundColor: "#14161c",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [
    TitleScene,
    IntroScene,
    BootScene,
    OfficeScene,
    TransitionScene,
    PromotionScene,
    SiteVisitScene,
    VisitorScene,
    BattleScene,
  ],
};

new Phaser.Game(config);

// Reaching this line means every script above loaded and ran without
// throwing, so the boot-status placeholder (see index.html) has done its
// job — clear it so the game canvas shows through.
const bootStatus = document.getElementById("boot-status");
if (bootStatus) bootStatus.remove();
