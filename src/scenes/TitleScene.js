// First scene shown. Pure title card — "Hit any key to play" advances to
// IntroScene. No game state is touched here.

class TitleScene extends Phaser.Scene {
  constructor() {
    super("TitleScene");
  }

  create() {
    this.add.rectangle(320, 240, 640, 480, 0x14161c);
    this.add
      .rectangle(320, 240, 600, 420, 0x1c1e28)
      .setStrokeStyle(2, 0x4a90d9);

    this.add
      .text(320, 165, "DONNELL AND McBURNS", {
        fontSize: "28px",
        fontFamily: "Courier New",
        color: "#ffe9a8",
        align: "center",
      })
      .setOrigin(0.5);

    this.add
      .text(320, 205, "An EPC Epic", {
        fontSize: "16px",
        fontFamily: "Courier New",
        color: "#aeb8e0",
        align: "center",
        fontStyle: "italic",
      })
      .setOrigin(0.5);

    this.add
      .rectangle(320, 240, 240, 2, 0x4a90d9)
      .setOrigin(0.5);

    const prompt = this.add
      .text(320, 340, "Hit any key to play", {
        fontSize: "14px",
        fontFamily: "Courier New",
        color: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: prompt,
      alpha: 0.15,
      duration: 700,
      yoyo: true,
      repeat: -1,
    });

    const advance = () => this.scene.start("IntroScene");
    this.input.keyboard.once("keydown", advance);
    this.input.once("pointerdown", advance);
  }
}
