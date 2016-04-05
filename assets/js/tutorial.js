var tutorialState = {

  create: function(){
    //  The scrolling stary background
    spaceBg = game.add.tileSprite(0, 0, 800, 600, 'introBg');

    // sound
    var bgMusic = SetUpMusic('storyMusic');

    // Call the 'start' function when pressing the spacebar
    var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space_key.onDown.add(this.start, this);
    //Reload this screen if player requests it
    var r_key = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
    r_key.onDown.add(this.repeat, this);

    var story_style = {font: 'bold 30px Acme', fill: '#ffffff'};
    var instruction_style = {font: 'bold 45px Acme', fill: '#ffffff'};
    var x = 400, y = 300;

    // Adding story & instructions centered on the screen
    var text1 = this.game.add.text(x , this.game.height , " \n \n \n \n \n \n \nYou are an Intergalactic \n Mineral Hunter!\n You have encountered \n a new planet called Earth...\n \n ... Excellent timing as you \n are about to run out of fuel...\n \n Earth has many elements and luckily for you \n you can refuel your ship there.. \n Look for Diamonds, we need Diamonds for fuel!\n \n Due to your Potassium body you cannot\n survive in Earth's atmosphere... \n The only way around this is to use a bubble..\n \n .. Although delicate & flimsy it will protect \n you from the oxygen in the air...\n This will break if you come into contact with \n  Water or Fire at which point\n  there will be no helping you... \n\n Beware! You have been warned....\n\n\nUse arrow keys to move left and right \nuse up to jump, I to interact & Q to get help!", story_style);
    text1.anchor.setTo(0.5, 0.5);

  // Adding story & instructions centered on the screen
    var text2 = this.game.add.text(400 , 300 , "Press R to repeat this message\n Or press Space to start the game", instruction_style);
    text2.anchor.setTo(0.5, 0.5);
    text2.alpha = 0;



    // Make text scroll up and off the screen
    var storyTween = game.add.tween(text1).to({ y: -(this.game.height) }, 48000, Phaser.Easing.Linear.InOut, true);
    //Provide instructions on how to proceed
    var instructionTween = game.add.tween(text2).to({alpha:1},2000, "Linear", true,48000);
    storyTween.chain(instructionTween);

},

  // Start the game
  start: function() {
      this.game.state.start('level1');
      bgSound.stop('');
},

// Repeat this state from the beginning
  repeat: function(){
    this.game.state.start(game.state.current);
      bgSound.stop('');
},

update: function(){
  //  Scroll the background
  spaceBg.tilePosition.y += 2;
}


};
