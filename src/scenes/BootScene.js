// Generates all placeholder art procedurally so the game needs zero external
// image files (keeps it runnable via plain file:// with no local server).
// Swap generateXTexture() bodies for real sprite loads later without
// touching any other scene.

class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  create() {
    const T = FLOORPLAN.tileSize;

    this.generateFloorTexture(T);
    this.generateWallTexture(T);
    this.generateDeskTexture(T);
    this.generatePlantTexture(T);
    this.generateEncounterTexture(T);
    this.generateBreakRoomTexture(T);
    this.generateLandmarkTexture(T);
    this.generateActorTexture("player", T, 0x4a90d9, 0xdff0ff);
    this.generateActorTexture("npc_default", T, 0x8a6d3b, 0xf0e0c0);
    Object.keys(COWORKERS).forEach((id) => {
      const cw = COWORKERS[id];
      this.generateActorTexture(`npc_${id}`, T, cw.portraitColor || 0x8a6d3b, 0xf0e0c0);
    });

    // Site visit textures
    this.generateGravelTexture(T);
    this.generateFenceTexture(T);
    this.generateStructureTexture(T);
    this.generateEquipmentTexture(T);
    this.generateHazardTexture(T);
    this.generatePortalTexture(T);
    Object.keys(SITE_VISITS).forEach((siteKey) => {
      (SITE_VISITS[siteKey].checkpoints || []).forEach((cp) => {
        this.generateActorTexture(
          `checkpoint_${siteKey}_${cp.id}`,
          T,
          cp.portraitColor || 0x8a6d3b,
          0xf0e0c0
        );
      });
    });

    // Visitor Day textures
    this.generateFoodTruckTexture(T);
    VISITORS.forEach((v) => {
      this.generateActorTexture(`visitor_${v.id}`, T, v.portraitColor || 0x8a6d3b, 0xf0e0c0);
    });

    this.scene.start("OfficeScene");
  }

  generateFloorTexture(T) {
    const g = this.add.graphics();
    g.fillStyle(0xc9c2a6, 1);
    g.fillRect(0, 0, T, T);
    g.lineStyle(1, 0xb5ae92, 1);
    g.strokeRect(0, 0, T, T);
    g.generateTexture("tile_floor", T, T);
    g.destroy();
  }

  generateWallTexture(T) {
    const g = this.add.graphics();
    g.fillStyle(0x3c3f4c, 1);
    g.fillRect(0, 0, T, T);
    g.fillStyle(0x2a2d3a, 1);
    g.fillRect(0, T - 6, T, 6);
    g.generateTexture("tile_wall", T, T);
    g.destroy();
  }

  generateDeskTexture(T) {
    const g = this.add.graphics();
    g.fillStyle(0xc9c2a6, 1);
    g.fillRect(0, 0, T, T);
    g.fillStyle(0x6b4a2f, 1);
    g.fillRect(2, 10, T - 4, T - 14);
    g.fillStyle(0x2a2d3a, 1);
    g.fillRect(6, 4, T - 12, 10);
    g.fillStyle(0x4a90d9, 1);
    g.fillRect(8, 6, T - 16, 6);
    g.generateTexture("tile_desk", T, T);
    g.destroy();
  }

  generatePlantTexture(T) {
    const g = this.add.graphics();
    g.fillStyle(0xc9c2a6, 1);
    g.fillRect(0, 0, T, T);
    g.fillStyle(0x6b4a2f, 1);
    g.fillRect(T / 2 - 6, T - 12, 12, 10);
    g.fillStyle(0x3f7a3f, 1);
    g.fillCircle(T / 2, T / 2 - 2, 11);
    g.fillStyle(0x4f9a4f, 1);
    g.fillCircle(T / 2 - 4, T / 2 - 6, 6);
    g.generateTexture("tile_plant", T, T);
    g.destroy();
  }

  generateEncounterTexture(T) {
    const g = this.add.graphics();
    g.fillStyle(0xa63d3d, 1);
    g.fillRect(0, 0, T, T);
    g.fillStyle(0xbb5555, 1);
    for (let y = 4; y < T; y += 8) {
      for (let x = 4; x < T; x += 8) {
        g.fillRect(x, y, 2, 2);
      }
    }
    g.generateTexture("tile_encounter", T, T);
    g.destroy();
  }

  generateBreakRoomTexture(T) {
    const g = this.add.graphics();
    g.fillStyle(0xd9c98a, 1);
    g.fillRect(0, 0, T, T);
    g.lineStyle(1, 0xc7b76e, 1);
    g.strokeRect(0, 0, T, T);
    g.fillStyle(0xe6daa8, 0.6);
    g.fillCircle(T / 2, T / 2, 3);
    g.generateTexture("tile_break", T, T);
    g.destroy();
  }

  generateLandmarkTexture(T) {
    const g = this.add.graphics();
    g.fillStyle(0x2e3550, 1);
    g.fillRect(0, 0, T, T);
    g.lineStyle(1, 0x4a5580, 1);
    g.strokeRect(1, 1, T - 2, T - 2);
    g.generateTexture("tile_landmark", T, T);
    g.destroy();
  }

  generateGravelTexture(T) {
    const g = this.add.graphics();
    g.fillStyle(0x8a8478, 1);
    g.fillRect(0, 0, T, T);
    g.fillStyle(0x76705f, 1);
    for (let i = 0; i < 10; i++) {
      const x = Phaser.Math.Between(2, T - 4);
      const y = Phaser.Math.Between(2, T - 4);
      g.fillRect(x, y, 2, 2);
    }
    g.generateTexture("tile_gravel", T, T);
    g.destroy();
  }

  generateFenceTexture(T) {
    const g = this.add.graphics();
    g.fillStyle(0x5a5245, 1);
    g.fillRect(0, 0, T, T);
    g.fillStyle(0xd97b2e, 1);
    g.fillRect(0, 4, T, 4);
    g.fillRect(0, T - 8, T, 4);
    g.generateTexture("tile_fence", T, T);
    g.destroy();
  }

  generateStructureTexture(T) {
    const g = this.add.graphics();
    g.fillStyle(0x6b6152, 1);
    g.fillRect(0, 0, T, T);
    g.lineStyle(2, 0x3c3830, 1);
    g.strokeRect(2, 2, T - 4, T - 4);
    g.lineBetween(0, 0, T, T);
    g.lineBetween(T, 0, 0, T);
    g.generateTexture("tile_structure", T, T);
    g.destroy();
  }

  generateEquipmentTexture(T) {
    const g = this.add.graphics();
    g.fillStyle(0x8a8478, 1);
    g.fillRect(0, 0, T, T);
    g.fillStyle(0xc27a1e, 1);
    g.fillRoundedRect(4, 6, T - 8, T - 14, 3);
    g.fillStyle(0x3c3830, 1);
    g.fillRect(4, T - 8, T - 8, 4);
    g.generateTexture("tile_equipment", T, T);
    g.destroy();
  }

  generateHazardTexture(T) {
    const g = this.add.graphics();
    g.fillStyle(0x1a1a1a, 1);
    g.fillRect(0, 0, T, T);
    g.fillStyle(0xe8a838, 1);
    for (let i = -T; i < T; i += 10) {
      g.fillRect(i, 0, 5, T);
    }
    g.generateTexture("tile_hazard", T, T);
    g.destroy();
  }

  generatePortalTexture(T) {
    const w = T * 1.2;
    const h = T;
    const g = this.add.graphics();
    g.fillStyle(0x000000, 0.25);
    g.fillEllipse(w / 2, h - 4, w * 0.8, 6);
    g.fillStyle(0xc27a1e, 1);
    g.fillRoundedRect(2, h * 0.35, w - 4, h * 0.5, 5);
    g.fillStyle(0xdff0ff, 0.8);
    g.fillRect(w * 0.15, h * 0.4, w * 0.3, h * 0.2);
    g.fillStyle(0x2a2d3a, 1);
    g.fillCircle(w * 0.25, h * 0.85, 5);
    g.fillCircle(w * 0.75, h * 0.85, 5);
    g.generateTexture("tile_portal", w, h);
    g.destroy();
  }

  generateFoodTruckTexture(T) {
    const g = this.add.graphics();
    g.fillStyle(0xc9c2a6, 1);
    g.fillRect(0, 0, T, T);
    g.fillStyle(0xe8a838, 1);
    g.fillRoundedRect(2, 6, T - 4, T - 16, 3);
    g.fillStyle(0xdff0ff, 0.9);
    g.fillRect(6, 10, T - 20, 8);
    g.fillStyle(0x2a2d3a, 1);
    g.fillCircle(8, T - 8, 4);
    g.fillCircle(T - 8, T - 8, 4);
    g.generateTexture("tile_foodtruck", T, T);
    g.destroy();
  }

  generateActorTexture(key, T, bodyColor, headColor) {
    const w = Math.floor(T * 0.75);
    const h = T;
    const g = this.add.graphics();
    // shadow
    g.fillStyle(0x000000, 0.25);
    g.fillEllipse(w / 2, h - 4, w * 0.7, 6);
    // body
    g.fillStyle(bodyColor, 1);
    g.fillRoundedRect(w * 0.15, h * 0.4, w * 0.7, h * 0.5, 4);
    // head
    g.fillStyle(headColor, 1);
    g.fillCircle(w / 2, h * 0.28, w * 0.32);
    g.generateTexture(key, w, h);
    g.destroy();
  }
}
