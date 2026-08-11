// The walkable overworld — currently a placeholder office floor built from
// FLOORPLAN. Swap FLOORPLAN's layout array for the real floor plan later;
// nothing else in this file needs to change as long as the legend holds.

class OfficeScene extends Phaser.Scene {
  constructor() {
    super("OfficeScene");
  }

  create() {
    const T = FLOORPLAN.tileSize;
    this.tileSize = T;
    this.grid = FLOORPLAN.layout.map((row) => row.split(""));

    this.solids = this.physics.add.staticGroup();
    this.encounterTiles = new Set();
    this.healTiles = new Set();

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        const ch = this.grid[y][x];
        const px = x * T + T / 2;
        const py = y * T + T / 2;

        if (ch === "1") {
          this.solids.create(px, py, "tile_wall").setSize(T, T).refreshBody();
        } else if (ch === "2") {
          this.add.image(px, py, "tile_floor");
          this.solids.create(px, py, "tile_desk").setSize(T, T).refreshBody();
        } else if (ch === "3") {
          this.add.image(px, py, "tile_floor");
          this.solids.create(px, py, "tile_plant").setSize(T * 0.6, T * 0.6).refreshBody();
        } else if (ch === "4") {
          this.add.image(px, py, "tile_encounter");
          this.encounterTiles.add(`${x},${y}`);
        } else if (ch === "6") {
          this.add.image(px, py, "tile_break");
          this.healTiles.add(`${x},${y}`);
        } else {
          this.add.image(px, py, "tile_floor");
        }
      }
    }

    // Landmark rooms (huddles, restrooms, stairs, print/copy) — decorative,
    // non-walkable blocks stamped over corridor floor.
    (FLOORPLAN.landmarks || []).forEach((lm) => {
      for (let y = lm.r0; y <= lm.r1; y++) {
        for (let x = lm.c0; x <= lm.c1; x++) {
          const px = x * T + T / 2;
          const py = y * T + T / 2;
          this.solids.create(px, py, "tile_landmark").setSize(T, T).refreshBody();
        }
      }
      const cx = ((lm.c0 + lm.c1 + 1) / 2) * T;
      const cy = ((lm.r0 + lm.r1 + 1) / 2) * T;
      this.add
        .text(cx, cy, lm.label, {
          fontSize: "9px",
          fontFamily: "Courier New",
          color: "#aeb8e0",
          align: "center",
        })
        .setOrigin(0.5);
    });

    // Conference room / break room labels
    (FLOORPLAN.roomLabels || []).forEach((rl) => {
      this.add
        .text(rl.x * T, rl.y * T, rl.text, {
          fontSize: "10px",
          fontFamily: "Courier New",
          color: "#ffe9a8",
          align: "center",
        })
        .setOrigin(0.5);
    });

    // Player
    const start = FLOORPLAN.playerStart;
    this.player = this.physics.add.sprite(
      start.x * T + T / 2,
      start.y * T + T / 2,
      "player"
    );
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(T * 0.6, T * 0.4);
    this.player.body.setOffset(T * 0.075, T * 0.55);
    this.physics.add.collider(this.player, this.solids);

    // NPCs
    this.npcGroup = this.physics.add.staticGroup();
    this.npcData = [];
    FLOORPLAN.npcs.forEach((def) => {
      const cw = COWORKERS[def.coworkerId];
      const px = def.x * T + T / 2;
      const py = def.y * T + T / 2;
      const texKey = this.textures.exists(`npc_${def.coworkerId}`)
        ? `npc_${def.coworkerId}`
        : "npc_default";
      const spr = this.npcGroup.create(px, py, texKey);
      spr.setSize(T * 0.6, T * 0.5).refreshBody();
      this.npcData.push({ sprite: spr, coworker: cw, lineIndex: 0 });
      this.add
        .text(px, py - T * 0.9, cw.name, {
          fontSize: "10px",
          fontFamily: "Courier New",
          color: "#ffe9a8",
        })
        .setOrigin(0.5);
    });
    this.physics.add.collider(this.player, this.npcGroup);

    // Home base — the player's own cubicle. Interacting opens the
    // mode-select menu (office / site visit / visitor day), so it's the
    // single hub for every mode instead of separate portal tiles.
    const hb = FLOORPLAN.homeBase;
    this.homeBaseGroup = this.physics.add.staticGroup();
    const hbPx = hb.x * T + T / 2;
    const hbPy = hb.y * T + T / 2;
    this.homeBaseSprite = this.homeBaseGroup.create(hbPx, hbPy, "tile_cubicle");
    this.homeBaseSprite.setSize(T, T).refreshBody();
    this.add
      .text(hbPx, hbPy - T * 0.9, hb.label, {
        fontSize: "9px",
        fontFamily: "Courier New",
        color: "#ffe9a8",
        align: "center",
      })
      .setOrigin(0.5);
    this.physics.add.collider(this.player, this.homeBaseGroup);

    // Camera / world bounds
    const worldW = FLOORPLAN.width * T;
    const worldH = FLOORPLAN.height * T;
    this.physics.world.setBounds(0, 0, worldW, worldH);
    this.cameras.main.setBounds(0, 0, worldW, worldH);
    this.cameras.main.startFollow(this.player, true, 0.15, 0.15);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.interactKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.time.addEvent({ delay: 1500, loop: true, callback: this.healTick, callbackScope: this });

    this.buildHud();
    this.buildDialogueBox();
    this.buildModeMenu();

    this.encounterLocked = false;
    this.activeDialogueNpc = null;

    // Resume-from-battle: restore last known position if we have one
    if (this.registry.get("returnPos")) {
      const p = this.registry.get("returnPos");
      this.player.setPosition(p.x, p.y);
      this.registry.remove("returnPos");
    }

    // Prime encounter tracking from wherever the player actually ended up
    // (fresh spawn or resumed from battle) so landing back on a red tile
    // doesn't immediately re-roll another fight.
    const startKey = `${Math.floor(this.player.x / T)},${Math.floor(this.player.y / T)}`;
    this.lastTileKey = startKey;
    this.inEncounterZone = this.encounterTiles.has(startKey);

    this.refreshHud();
  }

  buildHud() {
    this.hudBg = this.add
      .rectangle(4, 4, 240, 62, 0x14161c, 0.75)
      .setOrigin(0, 0)
      .setScrollFactor(0);
    this.hudText = this.add
      .text(10, 8, "", {
        fontSize: "12px",
        fontFamily: "Courier New",
        color: "#dff0ff",
      })
      .setScrollFactor(0);
    this.helpText = this.add
      .text(4, 460, "Arrows/WASD move  |  SPACE talk/interact", {
        fontSize: "10px",
        fontFamily: "Courier New",
        color: "#8f96a8",
      })
      .setScrollFactor(0);
  }

  refreshHud() {
    const p = PLAYER_STATE;
    const wellFedNote = p.wellFedBattles > 0 ? `  (Well Fed x${p.wellFedBattles})` : "";
    this.hudText.setText(
      `${getRankTitle(p.level, p.executiveUnlocked)} (Lv.${p.level})\n` +
        `HP ${p.hp}/${p.maxHp}  MP ${p.mp}/${p.maxMp}\n` +
        `Bonus: ${p.bonusPotential}/100 — ${getBonusLabel(p.bonusPotential)}${wellFedNote}`
    );
  }

  buildDialogueBox() {
    this.dialogueContainer = this.add.container(0, 0).setScrollFactor(0);
    const bg = this.add
      .rectangle(320, 420, 600, 90, 0x14161c, 0.92)
      .setStrokeStyle(2, 0x4a90d9);
    const nameText = this.add.text(40, 385, "", {
      fontSize: "12px",
      fontFamily: "Courier New",
      color: "#ffe9a8",
    });
    const bodyText = this.add.text(40, 405, "", {
      fontSize: "12px",
      fontFamily: "Courier New",
      color: "#ffffff",
      wordWrap: { width: 560 },
    });
    const hint = this.add.text(500, 455, "[SPACE]", {
      fontSize: "10px",
      fontFamily: "Courier New",
      color: "#8f96a8",
    });
    this.dialogueContainer.add([bg, nameText, bodyText, hint]);
    this.dialogueContainer.setVisible(false);
    this.dialogueNameText = nameText;
    this.dialogueBodyText = bodyText;
  }

  openDialogue(npc) {
    this.activeDialogueNpc = npc;
    npc.lineIndex = 0;
    npc.activeLines = this.resolveDialogueLines(npc);
    this.dialogueContainer.setVisible(true);
    this.showDialogueLine();
  }

  resolveDialogueLines(npc) {
    const cw = npc.coworker;
    npc.readyForBoss = false;
    if (cw.isBoss) {
      if (PLAYER_STATE.executiveUnlocked) {
        return cw.dialogueCleared || cw.dialogue;
      }
      if (PLAYER_STATE.level >= 9) {
        npc.readyForBoss = true;
        return cw.dialogueReady || cw.dialogue;
      }
    }
    return cw.dialogue;
  }

  showDialogueLine() {
    const npc = this.activeDialogueNpc;
    const line = npc.activeLines[npc.lineIndex];
    this.dialogueNameText.setText(npc.coworker.name);
    this.dialogueBodyText.setText(line);
  }

  advanceDialogue() {
    const npc = this.activeDialogueNpc;
    npc.lineIndex++;
    if (npc.lineIndex >= npc.activeLines.length) {
      npc.lineIndex = 0;
      this.dialogueContainer.setVisible(false);
      const shouldFightBoss = npc.readyForBoss;
      const bossEnemyId = npc.coworker.bossEnemyId;
      this.activeDialogueNpc = null;
      if (shouldFightBoss) {
        this.startBossFight(bossEnemyId);
      }
    } else {
      this.showDialogueLine();
    }
  }

  buildModeMenu() {
    this.modeMenuContainer = this.add.container(0, 0).setScrollFactor(0);
    const bg = this.add
      .rectangle(320, 240, 320, 170, 0x14161c, 0.95)
      .setStrokeStyle(2, 0x4a90d9);
    const title = this.add
      .text(320, 180, "YOUR CUBICLE", {
        fontSize: "13px",
        fontFamily: "Courier New",
        color: "#ffe9a8",
      })
      .setOrigin(0.5);
    this.modeMenuCursor = this.add.text(0, 0, ">", {
      fontSize: "12px",
      fontFamily: "Courier New",
      color: "#ffe9a8",
    });
    this.modeMenuContainer.add([bg, title, this.modeMenuCursor]);
    this.modeMenuContainer.setVisible(false);
    this.modeMenuTexts = [];
    this.selectedMenuIndex = 0;
  }

  openModeMenu() {
    this.selectedMenuIndex = 0;
    this.modeMenuTexts.forEach((t) => t.destroy());
    this.modeMenuTexts = FLOORPLAN.homeBase.options.map((opt, i) =>
      this.add.text(215, 205 + i * 22, opt.label, {
        fontSize: "12px",
        fontFamily: "Courier New",
        color: "#ffffff",
      })
    );
    this.modeMenuTexts.forEach((t) => this.modeMenuContainer.add(t));
    this.modeMenuContainer.setVisible(true);
    this.updateModeMenuCursor();
  }

  updateModeMenuCursor() {
    const target = this.modeMenuTexts[this.selectedMenuIndex];
    this.modeMenuCursor.setPosition(target.x - 18, target.y);
  }

  closeModeMenu() {
    this.modeMenuContainer.setVisible(false);
  }

  confirmModeMenu() {
    const opt = FLOORPLAN.homeBase.options[this.selectedMenuIndex];
    this.closeModeMenu();
    if (opt.action === "travel") {
      this.travelTo(opt.sceneKey, opt.payload);
    }
  }

  startBossFight(enemyId) {
    this.encounterLocked = true;
    this.player.setVelocity(0, 0);
    this.registry.set("returnPos", { x: this.player.x, y: this.player.y });
    this.scene.start("BattleScene", { enemyId, isBoss: true });
  }

  findNearbyNpc() {
    const T = this.tileSize;
    for (const npc of this.npcData) {
      const d = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        npc.sprite.x,
        npc.sprite.y
      );
      if (d < T * 1.2) return npc;
    }
    return null;
  }

  findNearbyHomeBase() {
    const T = this.tileSize;
    const d = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.homeBaseSprite.x,
      this.homeBaseSprite.y
    );
    return d < T * 1.2 ? FLOORPLAN.homeBase : null;
  }

  travelTo(sceneKey, payload) {
    this.registry.set("returnPos", { x: this.player.x, y: this.player.y });
    this.scene.start(sceneKey, payload || {});
  }

  update() {
    if (this.dialogueContainer.visible) {
      this.player.setVelocity(0, 0);
      if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
        this.advanceDialogue();
      }
      return;
    }

    if (this.modeMenuContainer.visible) {
      this.player.setVelocity(0, 0);
      const optionCount = FLOORPLAN.homeBase.options.length;
      if (Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.wasd.up)) {
        this.selectedMenuIndex = (this.selectedMenuIndex - 1 + optionCount) % optionCount;
        this.updateModeMenuCursor();
      } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down) || Phaser.Input.Keyboard.JustDown(this.wasd.down)) {
        this.selectedMenuIndex = (this.selectedMenuIndex + 1) % optionCount;
        this.updateModeMenuCursor();
      } else if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
        this.confirmModeMenu();
      }
      return;
    }

    if (this.encounterLocked) {
      this.player.setVelocity(0, 0);
      return;
    }

    const speed = 130;
    let vx = 0;
    let vy = 0;
    if (this.cursors.left.isDown || this.wasd.left.isDown) vx -= 1;
    if (this.cursors.right.isDown || this.wasd.right.isDown) vx += 1;
    if (this.cursors.up.isDown || this.wasd.up.isDown) vy -= 1;
    if (this.cursors.down.isDown || this.wasd.down.isDown) vy += 1;

    const vec = new Phaser.Math.Vector2(vx, vy).normalize().scale(speed);
    this.player.setVelocity(vec.x, vec.y);

    if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
      const npc = this.findNearbyNpc();
      if (npc) {
        this.openDialogue(npc);
      } else if (this.findNearbyHomeBase()) {
        this.openModeMenu();
      }
    }

    this.checkEncounterTile();
  }

  healTick() {
    const T = this.tileSize;
    const tx = Math.floor(this.player.x / T);
    const ty = Math.floor(this.player.y / T);
    if (!this.healTiles.has(`${tx},${ty}`)) return;

    const p = PLAYER_STATE;
    let healed = false;
    if (p.hp < p.maxHp) {
      p.hp = Math.min(p.maxHp, p.hp + 2);
      healed = true;
    }
    if (p.mp < p.maxMp) {
      p.mp = Math.min(p.maxMp, p.mp + 1);
      healed = true;
    }
    if (healed) {
      this.refreshHud();
      const floatText = this.add
        .text(this.player.x, this.player.y - 20, "+coffee", {
          fontSize: "10px",
          fontFamily: "Courier New",
          color: "#8fd0ff",
        })
        .setOrigin(0.5);
      this.tweens.add({
        targets: floatText,
        y: floatText.y - 16,
        alpha: 0,
        duration: 800,
        onComplete: () => floatText.destroy(),
      });
    }
  }

  // Rolls only on the step that crosses INTO a red zone from outside it,
  // not on every tile crossed while still inside — otherwise a multi-tile
  // zone gets one independent roll per tile and a single walk-through
  // compounds to a near-certain fight.
  checkEncounterTile() {
    const T = this.tileSize;
    const tx = Math.floor(this.player.x / T);
    const ty = Math.floor(this.player.y / T);
    const key = `${tx},${ty}`;
    if (key === this.lastTileKey) return;
    this.lastTileKey = key;

    const onEncounterTile = this.encounterTiles.has(key);
    if (onEncounterTile && !this.inEncounterZone && Phaser.Math.Between(1, 100) <= 18) {
      this.triggerEncounter();
    }
    this.inEncounterZone = onEncounterTile;
  }

  triggerEncounter() {
    this.encounterLocked = true;
    this.player.setVelocity(0, 0);
    this.registry.set("returnPos", { x: this.player.x, y: this.player.y });

    const enemy = Phaser.Utils.Array.GetRandom(ENEMIES);
    this.scene.start("BattleScene", { enemyId: enemy.id });
  }
}
