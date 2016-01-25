var gameOverState = {

 create: function () {

 // Call the 're-start' function when pressing the spacebar
 var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
 space_key.onDown.add(this.start, this);

 // Defining variables
  var instruction_style = { font: 'bold 60px VT323', fill: '#22C122'};
	var title_style = { font: 'bold 100px VT323', fill: '#ff0000'};
  var x = 400, y = 300;;

   // Adding text to screen
  var text = this.game.add.text(x, y-100, "Game Over", title_style);
  text.anchor.setTo(0.5, 0.5)

  // Adding instructions centered on the screen
  var text = this.game.add.text(x, y+50, "Press space to re-start", instruction_style);
  text.anchor.setTo(0.5, 0.5)
},

// Start the actual game
start: function() {
    this.game.state.start('menu');
}

};
