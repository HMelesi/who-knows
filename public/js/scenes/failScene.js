class failScene extends Phaser.Scene {

    constructor () {
      super({ key: 'failScene' });
    }

    preload() {
        this.load.image('background', 'assets/meface.jpg');
    }
    
    create() {
      this.cameras.main.backgroundColor.setTo(118,197,100);
      this.add.image(320, 200, 'background');
      this.title = this.add.text(240, 100, 'FAIL', { fill: '#f56', fontFamily: "Yeseva One", fontSize: '64px'});

       
    }

}