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
  bonusPotential: 50,
  visitorGreeted: { wife: false, daughter: false, parents: false },
  wellFedBattles: 0,
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
  scene: [BootScene, OfficeScene, BattleScene],
};

new Phaser.Game(config);
