var winState = {
  create: function() {

  // set background colour
  game.stage.backgroundColor = 0x90C3D4;

    // Call the 'start' function when pressing the spacebar
   var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   space_key.onDown.add(this.start, this);

  // Defining variables
  var score_style = { font: 'bold 60px Acme', fill: '#ffffff'};
  var text_style= { font: 'bold 100px Acme', fill: '#ff0000'};
  var x = 400, y = 400;


  // Adding a text centered on the screen
  var text = this.game.add.text(x, y-100, 'You Win!', text_style);
  text.anchor.setTo(0.5, 0.5);

    // Display score
   if (score > 0) {
      var score_label = this.game.add.text(x, y+50, "Score: " + score, score_style);
      score_label.anchor.setTo(0.5, 0.5);
   }

  },

  // Show menu screen
  start: function() {
      this.game.state.start('menu');
  }
};
