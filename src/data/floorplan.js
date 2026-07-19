// Floor plan modeled on the real office layout (FP_BMCD.png): desk pods
// running the full length on the west and east sides, a spine of
// conference rooms across the north, and a big central break room flanked
// by two conference rooms, mirroring the round break-room-in-the-middle
// layout from the real floor plan. Room names are placeholders pending
// confirmation on which ones map to the real conference room names.
//
// Legend:
//   0 = open floor
//   1 = wall (solid)
//   2 = desk / conference table (solid)
//   3 = plant (solid, decorative)
//   4 = encounter zone floor (random battles trigger here)
//   6 = break room floor (walkable, slowly restores HP/MP — coffee break)
//
// Grid is 72 tiles wide x 26 tall, 32px per tile => 2304x832 world.

const FLOORPLAN = {
  tileSize: 32,
  width: 72,
  height: 26,
  layout: [
    "111111111111111111111111111111111111111111111111111111111111111111111111",
    "122002200220022002200011111111011111111011111111000220022002200220022001",
    "122002200220022002200010000001010000001010000001000220022002200220022001",
    "100000000000000000000010022001010022001010022001000000000000000000000001",
    "122002200220022002200010000001010000001010000001000220022002200220022001",
    "122002200220022002200011100111011100111011100111000220022002200220022001",
    "100000000000000000000000000000000000000000000000000000000000000000000001",
    "122002200220022002200004444440000000000044444400000220022002200220022001",
    "122002200220022002200004444440000000000044444400000220022002200220022001",
    "100000000000000000000000000000000000000000000000000000000000000000000001",
    "122002200220022002200111111111111166611111111111111220022002200220022001",
    "122002200220022002200100011666666666666666666110001220022002200220022001",
    "100000000000000000000100011666226666666666666110001000000000000000000001",
    "122002200220022002200002001666666666666666666100200220022002200220022001",
    "122002200220022002200100011666666666666226666110001220022002200220022001",
    "100000000000000000000100011666666666666666666110001000000000000000000001",
    "122002200220022002200111111111111166611111111111111220022002200220022001",
    "122002200220022002200000000000000000000000000000000220022002200220022001",
    "100000000000000000000000000000444444444444000000000000000000000000000001",
    "122002200220022002200000000000444444444444000000000220022002200220022001",
    "122002200220022002200000000000000000000000000000000220022002200220022001",
    "100000000000000000000044444400000000000000000000000000000000000000000001",
    "122002200220022002200044444400000000000000000000000220022002200220022001",
    "122002200220022002200000000000000000000000000000000220022002200220022001",
    "100000000000000000000000000000000000000000000000000000000000000000000001",
    "111111111111111111111111111111111111111111111111111111111111111111111111",
  ],

  // Non-walkable labeled rooms stamped onto the corridor (huddle rooms,
  // restrooms, stairs, print/copy, etc) — decorative landmarks for now,
  // matching the small rooms scattered through the real floor plan.
  landmarks: [
    { r0: 6, c0: 30, r1: 7, c1: 32, label: "STAIRS" },
    { r0: 6, c0: 35, r1: 7, c1: 37, label: "RESTROOMS" },
    { r0: 8, c0: 30, r1: 9, c1: 33, label: "PRINT/COPY" },
    { r0: 17, c0: 23, r1: 18, c1: 26, label: "HUDDLE\nEVANS" },
    { r0: 19, c0: 23, r1: 20, c1: 26, label: "QUIET ROOM" },
    { r0: 17, c0: 44, r1: 18, c1: 47, label: "HUDDLE\nSHERMAN" },
    { r0: 19, c0: 44, r1: 20, c1: 47, label: "MOTHER'S\nROOM" },
    { r0: 22, c0: 32, r1: 23, c1: 35, label: "UTILITY" },
    { r0: 22, c0: 40, r1: 23, c1: 43, label: "STAIRS" },
  ],

  // Labels for the walk-in conference rooms / break room carved into the layout.
  roomLabels: [
    { x: 25.5, y: 1.5, text: "CONF: LA PLATA" },
    { x: 34.5, y: 1.5, text: "CONF: LONGS" },
    { x: 43.5, y: 1.5, text: "CONF: GRAYS" },
    { x: 23, y: 10.5, text: "CONF: PIKES" },
    { x: 48, y: 10.5, text: "CONF: QUANDARY" },
    { x: 35.5, y: 10.5, text: "BREAK ROOM" },
  ],

  // Player starting tile position (col, row) — north corridor above the break room.
  playerStart: { x: 35, y: 9 },

  // NPC placements: tile position + which coworker data entry to use
  npcs: [
    { x: 10, y: 9, coworkerId: "mentor_dave" },
    { x: 5, y: 3, coworkerId: "renata_osei" },
    { x: 42, y: 2, coworkerId: "chip_wexford" },
    { x: 33, y: 2, coworkerId: "marla_voss" },
    { x: 65, y: 2, coworkerId: "trent_okafor" },
    { x: 29, y: 6, coworkerId: "deb_halverson" },
    { x: 29, y: 8, coworkerId: "gary_buffer" },
    { x: 61, y: 5, coworkerId: "wanda_price" },
    { x: 13, y: 18, coworkerId: "ottoline_cruz" },
    { x: 58, y: 12, coworkerId: "sanjay_bhatt" },
    { x: 35, y: 13, coworkerId: "lou" },
    { x: 25, y: 2, coworkerId: "reginald_cho" },
    { x: 49, y: 17, coworkerId: "marisol_fenwick" },
  ],

  // Portals to other scenes — walk up and interact to travel there.
  portals: [
    {
      x: 38,
      y: 9,
      label: "SITE VISIT:\nMERIDIAN PH.2",
      sceneKey: "SiteVisitScene",
      payload: { siteId: "meridian_phase2" },
    },
    {
      x: 41,
      y: 9,
      label: "VISITOR DAY",
      sceneKey: "VisitorScene",
      payload: {},
    },
  ],
};
