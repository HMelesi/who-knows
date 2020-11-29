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
       fran = this.physics.add.sprite(180,200,"fran_run").setScale(3);
       lizz = this.physics.add.sprite(320,200,"lizz_run").setScale(3);
       rosie = this.physics.add.sprite(460,200,"rosie_run").setScale(3);

       const franButton = this.add.text(160, 300, 'Franny', { fill: '#0f0' });
       franButton.setInteractive();

       franButton.on('pointerdown', () => this.handleSelect('fran'));

       const lizzButton = this.add.text(300, 300, 'Lizz', { fill: '#0f0' });
       lizzButton.setInteractive();

       lizzButton.on('pointerdown', () => this.handleSelect('lizz'));

       const rosieButton = this.add.text(440, 300, 'Rosie', { fill: '#0f0' });
       rosieButton.setInteractive();

       rosieButton.on('pointerdown', () => this.handleSelect('rosie'));


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

      const startButton = this.add.text(320, 450, 'Start', { fill: '#0f0' });
      startButton.setInteractive();

      startButton.on('pointerdown', () => this.handleContinue());
    }
  
    update() {
        fran.anims.play("fran_downn", true);
        lizz.anims.play("lizz_downn", true);
        rosie.anims.play("rosie_downn", true);
    }

    handleSelect(name) 
    {
      localStorage.setItem('name', name);
    }

    handleContinue()
    {
      this.scene.start('mainScene');
	  }
}