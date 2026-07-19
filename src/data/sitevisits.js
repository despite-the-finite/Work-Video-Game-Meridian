// Site visits: separate small maps you travel to from the office. Clear all
// three checkpoints (Safety, Schedule, Quality), then the client trailer
// unlocks a negotiation fight (see clients.js). Add more entries here for
// additional sites later — everything's data-driven off this object.
//
// Legend: 0 floor(gravel) 1 fence(solid) 2 structure(solid) 3 equipment(solid) 4 hazard zone(walkable, encounters)

const SITE_VISITS = {
  meridian_phase2: {
    name: "Meridian Processing Facility — Phase 2",
    tileSize: 32,
    width: 34,
    height: 20,
    layout: [
      "1111111111111111111111111111111111",
      "1000000000000000000000000000000001",
      "1003300000000000033000000003333331",
      "1003302222222222033000000003333331",
      "1000002222222222000000000003333331",
      "1000002222222222000444444003333331",
      "1000002222222222000444444000000001",
      "1000002222222222000444444000000001",
      "1000002222222222000000000000000001",
      "1000002222222222000000000000000001",
      "1000002222222222000000000000000001",
      "1000002222222222000000000000000001",
      "1000000000000000000000000000000001",
      "1000033330000000044444400000000001",
      "1000033330000000044444400000000001",
      "1000000000000000044444400000000001",
      "1000033300000000000000000000000001",
      "1000033300000000000000000000000001",
      "1000000000000000000000000000000001",
      "1111111111111111111111111111111111",
    ],
    playerStart: { x: 4, y: 17 },
    exitPortal: { x: 3, y: 17 },
    structureLabel: { x: 10.5, y: 3, text: "UNIT UNDER CONSTRUCTION" },
    landmarks: [
      { r0: 2, c0: 3, r1: 3, c1: 4, label: "GENERATOR" },
      { r0: 2, c0: 17, r1: 3, c1: 18, label: "CRANE PAD" },
      { r0: 13, c0: 5, r1: 14, c1: 8, label: "PIPE SPOOLS" },
      { r0: 16, c0: 5, r1: 17, c1: 7, label: "PORTA-\nPOTTIES" },
      { r0: 2, c0: 27, r1: 5, c1: 32, label: "CLIENT\nTRAILER" },
    ],
    checkpoints: [
      {
        id: "safety",
        label: "SAFETY",
        x: 4,
        y: 9,
        npcName: "Frank Ostrowski",
        npcTitle: "Site Safety Rep",
        portraitColor: 0xd97b2e,
        dialogue: [
          "Hard hat, harness, hi-vis — go ahead, check mine. I'll wait.",
          "Caught two guys without fall protection near the platform this morning. Handled it.",
          "Toolbox talk's done, JSAs are signed. Safety's clear for today.",
        ],
      },
      {
        id: "schedule",
        label: "SCHEDULE",
        x: 16,
        y: 12,
        npcName: "Yolanda Reyes",
        npcTitle: "Field Superintendent",
        portraitColor: 0x3a6ba0,
        dialogue: [
          "Concrete pour's a day behind. Rebar inspection held us up.",
          "We can make it up if the next delivery doesn't slip again.",
          "Budget's tight but we're inside contingency. For now. Schedule's clear.",
        ],
      },
      {
        id: "quality",
        label: "QUALITY",
        x: 24,
        y: 9,
        npcName: "Benny Cruz",
        npcTitle: "QC Inspector",
        portraitColor: 0x2e8a5a,
        dialogue: [
          "Failed two welds on the pipe rack. Already got rework scheduled.",
          "NDE report's clean everywhere else. I don't sign off on maybes.",
          "Punch list is short. Quality's clear.",
        ],
      },
    ],
    clientTrailer: {
      interactPoint: { x: 27, y: 7 },
      clientId: "chip_site_negotiation",
      notReadyLine:
        "You need to clear Safety, Schedule, and Quality before the client meeting.",
    },
  },
};
