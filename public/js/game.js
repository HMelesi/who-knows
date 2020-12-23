const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 640,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  scene: [ characterScene, mainScene ]
};

const game = new Phaser.Game(config);
