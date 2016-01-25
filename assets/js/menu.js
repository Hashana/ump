var menuState = {

   create: function () {



   // Call the 'start' function when pressing the spacebar
   var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   space_key.onDown.add(this.start, this);

   // Defining variables
    var instruction_style = { font: 'bold 60px VT323', fill: '#1a8cff'};
		var title_style = { font: 'bold 100px VT323', fill: '#ffff66'};
    var x = 400, y = 300;

     // Adding title text centered on the screen
    var text = this.game.add.text(x, y-100, "Prototype", title_style);
    text.anchor.setTo(0.5, 0.5)

    // Adding instructions centered on the screen
          var text = this.game.add.text(x, y+50, "Press space to start", instruction_style);
          text.anchor.setTo(0.5, 0.5)
},

  // Start the actual game
  start: function() {
      this.game.state.start('level1');
  }
};
