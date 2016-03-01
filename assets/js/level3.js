var bgSound;
var sounds = {};
var icyTile;
var tiles;
var icyTiles;

var level3State = {
  create: function(){
    CreateMap('level3Map');


    HelpKeyQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    HelpKeyQ.onDown.add(this.displayHelp, this);


    // Add Player//add player

    setUpPlayer(50, game.world.height - 150);


    // Add controls for the game
    cursors = game.input.keyboard.createCursorKeys();

    // Background sound  on a loop
    bgSound = SetUpMusic('music1');
    // Add sound effects
    SetUpSounds();

    // Add score text
    var scoreText_style = { font: 'bold 32px Acme', fill: '#fff'};
    scoreText = game.add.text(16, 16, 'Score: ' + score, scoreText_style);
    scoreText.fixedToCamera = true;

},

update: function(){
  // stop player and collectables falling through the ground.
  game.physics.arcade.collide(player, layer);

  // check if player is on ice to call slide movement if required
  // pass isOnIce variable to updatePlayer()
  if (player.body.onFloor()){
    // ice movement
    if (player.body.velocity.x != 0){
      isOnIce = true;
      updatePlayer(isOnIce);
    }
    else {
      isOnIce = false;
      updatePlayer(isOnIce);
    }
  }
  else {
    isOnIce = false;
    updatePlayer(isOnIce);
  }
},

// Display tips to user
displayHelp: function(){
  // Help text for player
  var returnValue = map.getTile(player.body.x, player.body.y, 'Tile Layer 1', false);
  var helpText_style = { font: 'bold 32px Acme', fill: '#fff'};
  helpText = game.add.text(200, 100, returnValue, helpText_style);
  helpText.fixedToCamera = true;
  game.add.tween(helpText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);

},

};
