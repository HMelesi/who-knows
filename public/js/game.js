const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 640,
  height: 640,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0, x: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("outdoor", "assets/Serene_Village_16x16.png");
  this.load.tilemapTiledJSON("level1", "assets/maps/MAP-ONE.json");
  this.load.image("lizz", "assets/spaceShips_001.png");
  this.load.image("otherPlayer", "assets/enemyBlack5.png");
  this.load.image("star", "assets/star_gold.png");
  this.load.spritesheet("lizz_run", "assets/characters/lizz_run.png", {
    frameWidth: 16,
    frameHeight: 32,
  });
  this.load.spritesheet("lizz_idle", "assets/characters/lizz_idle.png", {
    frameWidth: 16,
    frameHeight: 32,
  });
}

function create() {

  const onemap = this.make.tilemap({ key: "level1" });
  const onetileset = onemap.addTilesetImage("outdoor", "outdoor");
  const onelayer = onemap.createStaticLayer(
    "Tile Layer 1",
    onetileset,
    0,
    0
  );

  cursors = this.input.keyboard.createCursorKeys();

  const self = this;
  this.socket = io();
  this.otherPlayers = this.physics.add.group();

  this.socket.on("currentPlayers", function (players) {
    Object.keys(players).forEach(function (id) {
      if (players[id].playerId === self.socket.id) {
        addPlayer(self, players[id]);
      } else {
        addOtherPlayers(self, players[id]);
      }
    });
  });

  this.socket.on("newPlayer", function (playerInfo) {
    addOtherPlayers(self, playerInfo);
  });

  this.socket.on("disconnect", function (playerId) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerId === otherPlayer.playerId) {
        otherPlayer.destroy();
      }
    });
  });


  this.socket.on("playerMoved", function (playerInfo) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerInfo.playerId === otherPlayer.playerId) {
        otherPlayer.setRotation(playerInfo.rotation);
        otherPlayer.setPosition(playerInfo.x, playerInfo.y);
      }
    });
  });

  this.socket.on("starLocation", function (starLocation) {
    if (self.star) self.star.destroy();
    self.star = self.physics.add.image(starLocation.x, starLocation.y, "star");
    self.physics.add.overlap(
      self.person,
      self.star,
      function () {
        this.socket.emit("starCollected");
      },
      null,
      self
    );
  });

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("lizz_run", { start: 12, end: 17 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("lizz_run", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "up",
    frames: this.anims.generateFrameNumbers("lizz_run", { start: 6, end: 11 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "down",
    frames: this.anims.generateFrameNumbers("lizz_run", { start: 18, end: 23 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNumbers("lizz_idle", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });

  this.cursors = this.input.keyboard.createCursorKeys();

  // this.physics.add.collider(this.person, onelayer);
}

function update() {
  if (this.person) {
    if (cursors.left.isDown) {
      this.person.setVelocityX(-160);
      this.person.setVelocityY(0);
      this.person.anims.play("left", true);
    } else if (cursors.right.isDown) {
      this.person.setVelocityX(160);
      this.person.setVelocityY(0);
      this.person.anims.play("right", true);
    } else if (cursors.up.isDown) {
      this.person.setVelocityY(-160);
      this.person.setVelocityX(0);
      this.person.anims.play("up", true);
    } else if (cursors.down.isDown) {
      this.person.setVelocityY(160);
      this.person.setVelocityX(0);
      this.person.anims.play("down", true);
    } else {
      this.person.setVelocityX(0);
      this.person.setVelocityY(0);
      this.person.anims.play("idle", true);
    }


    // emit player movement
    const x = this.person.x;
    const y = this.person.y;

    if (
      this.person.oldPosition &&
      (x !== this.person.oldPosition.x ||
        y !== this.person.oldPosition.y )
    ) {
      this.socket.emit("playerMovement", {
        x: this.person.x,
        y: this.person.y,
      });
    }

    // save old position data
    this.person.oldPosition = {
      x: this.person.x,
      y: this.person.y,
    };

    // this.physics.world.wrap(this.person, 5);
  }
}

function addPlayer(self, playerInfo) {
  self.person = self.physics.add
    .sprite(playerInfo.x, playerInfo.y, "lizz_run")
    .setOrigin(0.5, 0.5)
    .setDisplaySize(16, 32);
}

function addOtherPlayers(self, playerInfo) {
  const otherPlayer = self.add
    .sprite(playerInfo.x, playerInfo.y, "otherPlayer")
    .setOrigin(0.5, 0.5)
    .setDisplaySize(16, 32);
  otherPlayer.playerId = playerInfo.playerId;
  self.otherPlayers.add(otherPlayer);
}
