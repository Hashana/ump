var menuState = {

   create: function() {

   // Add menu background image
   menuBg = game.add.tileSprite(0, 0, 800, 600, 'menuBg');
   // Call the 'start' function when pressing the spacebar
   var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   space_key.onDown.add(this.start, this);

   // Call the tutorial function when pressing 't'
   var tutorial_key = this.game.input.keyboard.addKey(Phaser.Keyboard.T);
   tutorial_key.onDown.add(this.skipTutorial, this);

   // Call the hidden dev/trial level function when pressing 'p'
   var trialLevel_key = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
   trialLevel_key.onDown.add(this.trialLevel, this);

   // Defining variables
    var start_style = { font: 'bold 60px Acme', fill: '#1a8cff'};
		var title_style = { font: 'bold 100px Acme', fill: '#ffff66'};
    var x = 400, y = 300;

     // Adding title text centered on the screen
    var text = this.game.add.text(x, y-200, "Prototype", title_style);
    text.anchor.setTo(0.5, 0.5)

    // Adding instructions centered on the screen
    var text = this.game.add.text(x, y+200, "Press space to start \n or 'T' to skip the intro", start_style);
    text.anchor.setTo(0.5, 0.5)
},

// Start the introduction
start: function() {
    this.game.state.start('tutorial');
},
// Skip intro and start game
skipTutorial: function() {
    this.game.state.start('level2');
},

// Start the 'developer trial level'
trialLevel: function() {
    this.game.state.start('trialLevel');
},

update: function(){
  //  Scroll the background
  menuBg.tilePosition.x -= 2;
}
};
