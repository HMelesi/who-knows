class mainScene extends Phaser.Scene {
  
  constructor () {
    super({ key: 'mainScene' })
    this.selectedCharacter = 'lizz';
  }
  
  init() {
    this.selectedCharacter = localStorage.getItem('name');
    console.dir(this.selectedCharacter);
  }
  
  preload() {
      this.load.image("outdoor", "assets/Serene_Village_16x16.png");
      this.load.image("otherPlayer", "assets/star_gold.png");
      this.load.tilemapTiledJSON("level1", "assets/maps/MAP-1.json");
      this.load.spritesheet("fran_run", "assets/characters/fran_run.png", {
        frameWidth: 16,
        frameHeight: 32,
      });
      this.load.spritesheet("fran_idle", "assets/characters/fran_idle.png", {
        frameWidth: 16,
        frameHeight: 32,
      });
      this.load.spritesheet("lizz_run", "assets/characters/lizz_run.png", {
        frameWidth: 16,
        frameHeight: 32,
      });
      this.load.spritesheet("lizz_idle", "assets/characters/lizz_idle.png", {
        frameWidth: 16,
        frameHeight: 32,
      });
      this.load.spritesheet("rosie_run", "assets/characters/rosie_run.png", {
        frameWidth: 16,
        frameHeight: 32,
      });
      this.load.spritesheet("rosie_idle", "assets/characters/rosie_idle.png", {
        frameWidth: 16,
        frameHeight: 32,
      });
    }
  
    create() {
      this.onemap = this.make.tilemap({ key: "level1", tileWidth: 16, tileHeight: 16 });
      this.onetileset = this.onemap.addTilesetImage("outdoor", "outdoor", 16, 16);
      this.waterlayer = this.onemap.createStaticLayer(
        "waterLayer",
        this.onetileset,
        0,
        0
      );
      this.groundlayer = this.onemap.createDynamicLayer(
        "staticLayer",
        this.onetileset,
        0,
        0
      );
      this.physics.add.collider(this.person, this.groundlayer, null, null, this);
      // this.groundlayer.setCollisionByProperty({ collides: true });
      this.groundlayer.setCollisionBetween(20,21);
      this.groundlayer.setCollisionBetween(39,40);
      this.groundlayer.setCollisionBetween(79,84);
      this.groundlayer.setCollisionBetween(98,99);
      this.groundlayer.setCollisionBetween(103,104);
      this.groundlayer.setCollisionBetween(117,122);
  
      this.cursors = this.input.keyboard.createCursorKeys();
  
      const self = this;
      this.socket = io({
        query: {
          token: this.selectedCharacter
        }
      });
      this.otherPlayers = this.physics.add.group();
      this.mePlayer = this.physics.add.group();
  
      this.socket.on("currentPlayers", function (players) {
        Object.keys(players).forEach(function (id) {
          if (players[id].playerId === self.socket.id) {
            self.addPlayer(self, players[id]);
          } else {
            self.addOtherPlayers(self, players[id]);
          }
          console.dir(players);
        });
      });
  
      this.socket.on("newPlayer", function (playerInfo) {
        self.addOtherPlayers(self, playerInfo);
      });
  
      this.socket.on("disconnected", function (playerId) {
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
          if (playerId === otherPlayer.playerId) {
            otherPlayer.destroy();
          } 
        });
      });
  
  
      this.socket.on("playerMoved", function (playerInfo) {
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
          if (playerInfo.playerId === otherPlayer.playerId) {
            if (otherPlayer.x < playerInfo.x) {
              otherPlayer.anims.play(`${playerInfo.name}_right`, true);
            } else if (otherPlayer.x > playerInfo.x) {
              otherPlayer.anims.play(`${playerInfo.name}_left`, true);
            } else if (otherPlayer.y < playerInfo.y) {
              otherPlayer.anims.play(`${playerInfo.name}_down`, true);
            } else if (otherPlayer.y > playerInfo.y) {
              otherPlayer.anims.play(`${playerInfo.name}_up`, true);
            } else {
              otherPlayer.anims.play(`${playerInfo.name}_idle`, true);
            }
            otherPlayer.setPosition(playerInfo.x, playerInfo.y);
          }
        });
      });

      this.socket.on("playerStopped", function (playerInfo) {
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
          if (playerInfo.playerId === otherPlayer.playerId) {
              otherPlayer.anims.play(`${playerInfo.name}_idle`, true);
          }
        });
      })
  
      this.anims.create({
        key: "fran_left",
        frames: this.anims.generateFrameNumbers("fran_run", { start: 12, end: 17 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "fran_right",
        frames: this.anims.generateFrameNumbers("fran_run", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "fran_up",
        frames: this.anims.generateFrameNumbers("fran_run", { start: 6, end: 11 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "fran_down",
        frames: this.anims.generateFrameNumbers("fran_run", { start: 18, end: 23 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "fran_idle",
        frames: this.anims.generateFrameNumbers("fran_idle", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "lizz_left",
        frames: this.anims.generateFrameNumbers("lizz_run", { start: 12, end: 17 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "lizz_right",
        frames: this.anims.generateFrameNumbers("lizz_run", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "lizz_up",
        frames: this.anims.generateFrameNumbers("lizz_run", { start: 6, end: 11 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "lizz_down",
        frames: this.anims.generateFrameNumbers("lizz_run", { start: 18, end: 23 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "lizz_idle",
        frames: this.anims.generateFrameNumbers("lizz_idle", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "rosie_left",
        frames: this.anims.generateFrameNumbers("rosie_run", { start: 12, end: 17 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "rosie_right",
        frames: this.anims.generateFrameNumbers("rosie_run", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "rosie_up",
        frames: this.anims.generateFrameNumbers("rosie_run", { start: 6, end: 11 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "rosie_down",
        frames: this.anims.generateFrameNumbers("rosie_run", { start: 18, end: 23 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "rosie_idle",
        frames: this.anims.generateFrameNumbers("rosie_idle", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1,
      });

      
  
      this.cursors = this.input.keyboard.createCursorKeys();
  
  
    }
  
    update() {
      if (this.person) {
        if (this.cursors.left.isDown) {
          this.person.setVelocityX(-160);
          this.person.setVelocityY(0);
          this.person.anims.play(`${this.selectedCharacter}_left`, true);
        } else if (this.cursors.right.isDown) {
          this.person.setVelocityX(160);
          this.person.setVelocityY(0);
          this.person.anims.play(`${this.selectedCharacter}_right`, true);
        } else if (this.cursors.up.isDown) {
          this.person.setVelocityY(-160);
          this.person.setVelocityX(0);
          this.person.anims.play(`${this.selectedCharacter}_up`, true);
        } else if (this.cursors.down.isDown) {
          this.person.setVelocityY(160);
          this.person.setVelocityX(0);
          this.person.anims.play(`${this.selectedCharacter}_down`, true);
        } else {
          this.person.setVelocityX(0);
          this.person.setVelocityY(0);
          this.person.anims.play(`${this.selectedCharacter}_idle`, true);
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
        } else {
          this.socket.emit("playerStopped");
        }
  
        // save old position data
        this.person.oldPosition = {
          x: this.person.x,
          y: this.person.y,
        };
  
        this.physics.collide(this.person, this.groundlayer);
        // this.physics.world.wrap(this.person, 5);
      }
    }

    addPlayer(self, playerInfo) {
        self.person = self.physics.add
          .sprite(playerInfo.x, playerInfo.y, "lizz_run")
          .setOrigin(0, 0)
          .setDisplaySize(16, 32)
          .setCollideWorldBounds(true);
    }

    addOtherPlayers(self, playerInfo) {
        const otherPlayer = self.add
          .sprite(playerInfo.x, playerInfo.y, `${playerInfo.name}_run`)
          .setOrigin(0, 0)
          .setDisplaySize(16, 32);
        otherPlayer.playerId = playerInfo.playerId;
        otherPlayer.anims.play(`${playerInfo.name}_idle`, true);
        self.otherPlayers.add(otherPlayer);
    }
}