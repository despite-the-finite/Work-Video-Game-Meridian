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
    this.generateCubicleTexture(T);
    this.generateActorTexture("player", T, 0x4a90d9);
    this.generateActorTexture("npc_default", T, 0x8a6d3b);
    Object.keys(COWORKERS).forEach((id) => {
      const cw = COWORKERS[id];
      this.generateActorTexture(`npc_${id}`, T, cw.portraitColor || 0x8a6d3b);
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
          cp.portraitColor || 0x8a6d3b
        );
      });
    });

    // Visitor Day textures
    this.generateFoodTruckTexture(T);
    VISITORS.forEach((v) => {
      this.generateActorTexture(`visitor_${v.id}`, T, v.portraitColor || 0x8a6d3b, "casual");
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

  generateCubicleTexture(T) {
    // Same desk footprint as tile_desk, but with a pale "window" pane
    // instead of a monitor, so the player's home base reads differently
    // from generic desk pods at a glance.
    const g = this.add.graphics();
    g.fillStyle(0xc9c2a6, 1);
    g.fillRect(0, 0, T, T);
    g.fillStyle(0x6b4a2f, 1);
    g.fillRect(2, 10, T - 4, T - 14);
    g.fillStyle(0x4a90d9, 1);
    g.fillRect(4, 2, T - 8, 10);
    g.fillStyle(0xdff0ff, 0.85);
    g.fillRect(6, 4, T - 12, 6);
    g.lineStyle(2, 0xffe9a8, 1);
    g.strokeRect(1, 1, T - 2, T - 2);
    g.generateTexture("tile_cubicle", T, T);
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

  // Wardrobe: everyone defaults to business casual (collared shirt, tie or
  // blazer trim, slacks). Pass attire "casual" for Visitor Day guests
  // (crew-neck tee, jeans/shorts, no tie). Skin tone, hair, and every trim
  // choice are picked deterministically off the texture key (a cheap
  // string hash, reused with different moduli so the picks don't all
  // correlate) so the office floor reads as a crowd of individuals rather
  // than repeated palette-swapped blobs, while staying stable across
  // reloads since nothing here is Math.random().
  generateActorTexture(key, T, bodyColor, attire = "business") {
    const w = Math.floor(T * 0.75);
    const h = T;
    const g = this.add.graphics();
    const hash = key.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);

    const bodyX = w * 0.15;
    const bodyY = h * 0.4;
    const bodyW = w * 0.7;
    const bodyH = h * 0.5;

    const headCx = w / 2;
    const headCy = h * 0.28;
    const headR = w * 0.32;

    const SKIN_TONES = [0xf0e0c0, 0xd9b88a, 0xb5875a, 0x8a5a35, 0x6b4423];
    const HAIR_COLORS = [0x1a1a1a, 0x3a2a1a, 0x6b4423, 0x8a6a3a, 0xd9c27a, 0x9a9a9a];
    const skin = SKIN_TONES[hash % SKIN_TONES.length];
    const hairColor = HAIR_COLORS[(hash * 7 + 3) % HAIR_COLORS.length];
    const hairRoll = (hash * 13) % 6; // 0 = bald, else picks a style below

    // shadow
    g.fillStyle(0x000000, 0.25);
    g.fillEllipse(w / 2, h - 4, w * 0.7, 6);

    // body (shirt/blouse/tee)
    g.fillStyle(bodyColor, 1);
    g.fillRoundedRect(bodyX, bodyY, bodyW, bodyH, 4);

    if (attire === "casual") {
      const BOTTOMS = [0x4a6a9a, 0xc9b380, 0x5a5a5a][hash % 3];
      g.fillStyle(BOTTOMS, 1);
      g.fillRect(bodyX, bodyY + bodyH * 0.68, bodyW, bodyH * 0.32);
      // crew neckline
      g.fillStyle(skin, 1);
      g.fillCircle(w / 2, bodyY + 1, bodyW * 0.12);
      // occasional tee graphic/stripe
      if (hash % 2 === 0) {
        g.fillStyle(0xffffff, 0.35);
        g.fillRect(bodyX, bodyY + bodyH * 0.32, bodyW, 2);
      }
    } else {
      const SLACKS = [0x2a3550, 0x3c3c3c, 0xa89968][hash % 3];
      g.fillStyle(SLACKS, 1);
      g.fillRect(bodyX, bodyY + bodyH * 0.62, bodyW, bodyH * 0.38);
      // open collar
      g.fillStyle(0xf2ede0, 1);
      g.fillTriangle(
        w / 2, bodyY + bodyH * 0.05,
        bodyX + bodyW * 0.32, bodyY,
        bodyX + bodyW * 0.68, bodyY
      );
      if (hash % 2 === 0) {
        // necktie
        g.fillStyle(this.darken(bodyColor, 0.5), 1);
        g.fillRect(w / 2 - 1.5, bodyY, 3, bodyH * 0.4);
      } else {
        // blazer edge
        g.lineStyle(1.5, this.darken(bodyColor, 0.65), 1);
        g.strokeRoundedRect(bodyX, bodyY, bodyW, bodyH, 4);
      }
    }

    // head
    g.fillStyle(skin, 1);
    g.fillCircle(headCx, headCy, headR);

    // hair — drawn short enough to always clear the eyeline below, so the
    // face stays visible regardless of which style lands.
    if (hairRoll !== 0) {
      g.fillStyle(hairColor, 1);
      if (hairRoll <= 2) {
        // short crop
        g.fillEllipse(headCx, headCy - headR * 0.45, headR * 1.7, headR * 1.05);
      } else if (hairRoll <= 4) {
        // side part
        g.fillEllipse(headCx - headR * 0.15, headCy - headR * 0.4, headR * 1.9, headR * 1.1);
      } else {
        // fuller, framing the face
        g.fillEllipse(headCx, headCy - headR * 0.35, headR * 2.05, headR * 1.2);
      }
    }

    // face — two small eyes, positioned below the hairline
    const eyeY = headCy + headR * 0.35;
    const eyeDX = headR * 0.35;
    const eyeR = Math.max(1, headR * 0.16);
    g.fillStyle(0x2a2320, 1);
    g.fillCircle(headCx - eyeDX, eyeY, eyeR);
    g.fillCircle(headCx + eyeDX, eyeY, eyeR);

    g.generateTexture(key, w, h);
    g.destroy();
  }

  darken(color, factor) {
    const r = Math.floor(((color >> 16) & 0xff) * factor);
    const gr = Math.floor(((color >> 8) & 0xff) * factor);
    const b = Math.floor((color & 0xff) * factor);
    return (r << 16) | (gr << 8) | b;
  }
}
