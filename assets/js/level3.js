var bgSound;
var sounds = {};
var icyTile;
var tiles;
var icyTiles;
var doorIsOpen;
var hasKey;

var level3State = {
  create: function(){
    CreateMap('level3Map');
    InitialiseGameObjects();
    this.displayHelp();

    //Add door for win condition
    CreateDoor(game.world.width - 147, game.world.height - 673 , 'lockedDoor')
    doorIsOpen = false;
    CreateKey(1360, 500);
    hasKey = false;

    HelpKeyQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    HelpKeyQ.onDown.add(this.displayHelp, this);


    setUpPlayer(50, game.world.height - 150);
    scoreText = CreateScoreText(score);

    // Add controls for the game
    cursors = game.input.keyboard.createCursorKeys();

    // Background sound  on a loop
    bgSound = SetUpMusic('music3');
    // Add sound effects
    SetUpSounds();

    //CreateFires(10);
    CreateDiamonds(25);


},

update: function(){
  // stop player and collectables falling through the ground.
  UpdateCollision(player, layer, diamonds, fires);
  // Player opens door
  game.physics.arcade.overlap(player, door, this.openDoor, null, this);
  //Player goes through door.
  game.physics.arcade.overlap(player, door, this.completeLevel,null, this);
  // Player collects Key
  game.physics.arcade.overlap(player, keys, this.getKey,null, this);


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

getKey: function(player, key){
  PickUpMessage('Key');
  hasKey = true;
  sounds.pickUpSfx.play();
  key.kill();
},

// Display tips to user
displayHelp: function(){
PickUpMessage('Reach the door, watch your step!');

},

// Player opens door
openDoor: function(){
  if(doorIsOpen == false && hasKey == true)
  {
      sounds.openDoorSfx.play();
      door.animations.play('open', 30, false);
      doorIsOpen = true;
  }
  else{
    // door is open
  }
},
// Player goes through door if its open
completeLevel: function(){
  if(doorIsOpen == true)
  {
    if(cursors.up.isDown)
    {
      bgSound.stop('');
      this.game.state.start('win');
    }
  }
}
};
