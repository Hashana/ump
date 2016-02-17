var tutorialState = {

  create: function(){

    // set background colour
    game.stage.backgroundColor = 0x90C3D4;

    // Call the 'start' function when pressing the spacebar
    var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space_key.onDown.add(this.start, this);

    var instruction_style = {font: 'bold 40px Acme', fill: '#ffffff'};
    var x = 400, y = 300;

    // Adding instructions centered on the screen
    var text = this.game.add.text(x , y , "Use arrow keys to move left and right \n         use up to jump & Q to get help!", instruction_style);
    text.anchor.setTo(0.5, 0.5);

  },

  // Start the game
  start: function() {
      this.game.state.start('level2');
  }

};
