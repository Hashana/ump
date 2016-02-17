var menuState = {

   create: function () {

   // set background colour
   game.stage.backgroundColor = 0x90C3D4;
   // Call the 'start' function when pressing the spacebar
   var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   space_key.onDown.add(this.start, this);

   // Defining variables
    var start_style = { font: 'bold 60px Acme', fill: '#1a8cff'};
		var title_style = { font: 'bold 100px Acme', fill: '#ffff66'};
    var instruction_style = {font: 'bold 40px Acme', fill: '#ffffff'};
    var x = 400, y = 300;

     // Adding title text centered on the screen
    var text = this.game.add.text(x, y-200, "Prototype", title_style);
    text.anchor.setTo(0.5, 0.5)

    // Adding instructions centered on the screen
    var text = this.game.add.text(x , y , "Use arrow keys to move left and right \n         use up to jump & Q to get help!", instruction_style);
    text.anchor.setTo(0.5, 0.5)


    // Adding instructions centered on the screen
    var text = this.game.add.text(x, y+200, "Press space to start", start_style);
    text.anchor.setTo(0.5, 0.5)
},

  // Start the game
  start: function() {
      this.game.state.start('level2');
  }
};
