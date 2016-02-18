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
    var text = this.game.add.text(x , y , "Use arrow keys to move left and right \n         use up to jump & Q to get help!  \n Press Space to start the game", instruction_style);
    text.anchor.setTo(0.5, 0.5);

    // Make text scroll up and off the screen
    storyTween = this.game.add.tween(text).to({ y: -(this.game.height * 3) }, 71000, Phaser.Easing.Linear.InOut, true);

  },

  // Start the game
  start: function() {
      this.game.state.start('level2');
  }

};
