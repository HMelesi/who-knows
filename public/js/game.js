const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 640,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0, x: 0 },
    },
  },
  scene: [ characterScene, mainScene ]
};

const game = new Phaser.Game(config);
