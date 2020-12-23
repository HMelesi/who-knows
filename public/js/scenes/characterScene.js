let fran;
let lizz;
let rosie;

class characterScene extends Phaser.Scene {

    constructor () {
      super({ key: 'characterScene' });
    }

    preload() {
        this.load.spritesheet("fran_run", "assets/characters/fran_run.png", {
          frameWidth: 16,
          frameHeight: 32,
        });
        this.load.spritesheet("lizz_run", "assets/characters/lizz_run.png", {
            frameWidth: 16,
            frameHeight: 32,
          });
        this.load.spritesheet("rosie_run", "assets/characters/rosie_run.png", {
        frameWidth: 16,
        frameHeight: 32,
        });
    }
    
    create() {
      this.cameras.main.backgroundColor.setTo(118,197,100);

      this.title = this.add.text(240, 50, 'Who are you?', { fill: '#ede', fontFamily: "Yeseva One", fontSize: '24px'});

       fran = this.physics.add.sprite(150,200,"fran_run").setScale(3);
       lizz = this.physics.add.sprite(320,200,"lizz_run").setScale(3);
       rosie = this.physics.add.sprite(490,200,"rosie_run").setScale(3);

       this.chipButton = this.add.text(5, 5, 'x', { fill: '#b35', fontFamily: "Yeseva One", fontSize: '30px'})
       .setInteractive()
       .on('pointerdown', () => this.handleSelect('chip'));

       this.franButton = this.add.text(100, 300, 'Franny', { fill: '#b35', fontFamily: "Yeseva One", fontSize: '30px'})
       .setInteractive()
       .on('pointerdown', () => this.handleSelect('fran'))
       .on('pointerover', () => this.enterButtonHoverState('fran') )
       .on('pointerout', () => this.enterButtonRestState('fran') );

       this.lizzButton = this.add.text(290, 300, 'Lizz', { fill: '#b35', fontFamily: "Yeseva One", fontSize: '30px'})
       .setInteractive()
       .on('pointerdown', () => this.handleSelect('lizz'))
       .on('pointerover', () => this.enterButtonHoverState('lizz') )
       .on('pointerout', () => this.enterButtonRestState('lizz') );

       this.rosieButton = this.add.text(450, 300, 'Rosie', { fill: '#b35', fontFamily: "Yeseva One", fontSize: '30px'})
       .setInteractive()
       .on('pointerdown', () => this.handleSelect('rosie'))
       .on('pointerover', () => this.enterButtonHoverState('rosie') )
       .on('pointerout', () => this.enterButtonRestState('rosie') );


       this.anims.create({
        key: "fran_downn",
        frames: this.anims.generateFrameNumbers("fran_run", { start: 18, end: 23 }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "lizz_downn",
        frames: this.anims.generateFrameNumbers("lizz_run", { start: 18, end: 23 }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "rosie_downn",
        frames: this.anims.generateFrameNumbers("rosie_run", { start: 18, end: 23 }),
        frameRate: 10,
        repeat: -1,
      });

      this.chosenOne = this.add.text(250, 450, '', { fill: '#ede', fontFamily: "Yeseva One", fontSize: '24px'});

      this.startButton = this.add.text(285, 500, 'START', { fill: '#fb3', fontFamily: "Yeseva One", fontSize: '30px'})
      .setInteractive()
      .on('pointerdown', () => this.handleContinue())
      .on('pointerover', () => this.enterButtonHoverState('start') )
      .on('pointerout', () => this.enterButtonRestState('start') );
    }
  
    update() {
        fran.anims.play("fran_downn", true);
        lizz.anims.play("lizz_downn", true);
        rosie.anims.play("rosie_downn", true);
    }

    enterButtonHoverState(name) {
      if(name === 'fran') {
        this.franButton.setStyle({ fill: '#fb3', fontFamily: "Yeseva One", fontSize: '30px'});
      } else if(name === 'lizz') {
        this.lizzButton.setStyle({ fill: '#fb3', fontFamily: "Yeseva One", fontSize: '30px'});
      } else if (name === 'rosie') {
        this.rosieButton.setStyle({ fill: '#fb3', fontFamily: "Yeseva One", fontSize: '30px'});
      } else if (name === 'start') {
        this.startButton.setStyle({ fill: '#ede', fontFamily: "Yeseva One", fontSize: '30px'});
      }

    }
  
    enterButtonRestState(name) {
      if(name === 'fran') {
        this.franButton.setStyle({ fill: '#b35', fontFamily: "Yeseva One", fontSize: '30px'});
      } else if(name === 'lizz') {
        this.lizzButton.setStyle({ fill: '#b35', fontFamily: "Yeseva One", fontSize: '30px'});
      } else if (name === 'rosie') {
        this.rosieButton.setStyle({ fill: '#b35', fontFamily: "Yeseva One", fontSize: '30px'});
      } else if (name === 'start') {
        this.startButton.setStyle({ fill: '#fb3', fontFamily: "Yeseva One", fontSize: '30px'});
      }
    }

    handleSelect(name) 
    {
      let showName;
      if(name === 'fran') {
        showName = 'Franny'
      } else if(name === 'lizz') {
        showName = 'Lizz'
      } else if (name === 'rosie') {
        showName = 'Rosie'
      } else if (name === 'chip') {
        showName = 'Chipie'
      }
      this.chosenOne.setText(`You are ${showName}`)
      localStorage.setItem('name', name);
    }

    handleContinue()
    {
      this.scene.start('mainScene');
	  }
}