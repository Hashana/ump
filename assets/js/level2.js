var map;
var layer;
var player;
var platforms;
var cursors;
var diamonds;
//var score;
var scoreText;
var background;
var fires;
var explosion;
var timeCheck;
var timer;
var door;
var doorIsOpen;
var HelpKeyQ;
var helpText;
var deathText;
var textAlert;
var waterTiles = {};
var bgSound;
var sounds = {};
var deathType;
var waterBottles;
var hasWater;
var hasFrancium;
var hasHCI;
var interactKey;
var mixHciKey;
var hasAcid;
var isAtMStation;
var mixFrKey;
var helpText;

var level2State = {
  create: function(){
    CreateMap('level2Map');
      InitialiseGameObjects();
    //Add door for win condition
    CreateDoor(4840, game.world.height - 279, 'lockedDoor')
    doorIsOpen = false;

    // Add Player//add player

    setUpPlayer(50, game.world.height - 98);

    helpText = 'Press I to interact \nwith the mixing station\n you need a way through\nthe locked door!';
    this.displayHelp();

    // Add score text
    scoreText = CreateScoreText(score);

    // Add sound effects
    bgSound = SetUpMusic('music1');
    SetUpSounds();

    // Add controls for the game
    // Adds cursor keys
  	cursors = game.input.keyboard.createCursorKeys();
    // Add Q Key for help
    HelpKeyQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    HelpKeyQ.onDown.add(this.displayHelp, this);
    // Add E Key for Interactions
    interactKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
    interactKey.onDown.add(this.useMixingStation, this);
    // Add H Key for mixing HCI acid & Water
    mixHciKey = game.input.keyboard.addKey(Phaser.Keyboard.H);
    mixHciKey.onDown.add(this.mixHci, this);
    //Add F Key for mixing Fr & Water
    mixFrKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
    mixFrKey.onDown.add(this.mixFr, this);


    // Add educational elements to level
    // Add Water bottle
    CreateWater(2352, 98);
    hasWater = false;
    // Add mixing station
    CreateMixingStation(1300, 539);
    // Add Francium (Red herring)
    CreateFrancium(560, game.world.height - 170);
    hasFrancium = false;
    // Add Hydrogen Chloride Gas
    CreateHci(3675, 539);
    hasHCI = false;
    hasAcid = false;


    // Add collectables - diamonds
    CreateDiamonds(25);
    // create fires to avoid
    CreateFires(20);
  },

  update: function(){
    // stop player and collectables falling through the map.
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(diamonds, layer);
    game.physics.arcade.collide(fires, layer);
    isAtMStation = false;

    // update player movement and check for actions
    updatePlayer();

   // Player opens door
   game.physics.arcade.overlap(player, door, this.openDoor, null, this);

   //Player goes through door.
   game.physics.arcade.overlap(player, door, this.completeLevel,null, this);
   //Player water death
   game.physics.arcade.overlap(player, waterTiles, this.waterDeath, null, this);
   //Player collects water
   game.physics.arcade.overlap(player, waterBottles, this.collectItem, null, this);
   //Player is asked to interact with the mixing station
   game.physics.arcade.overlap(player, mixingStations, this.mixingStationInteraction, null, this);
   // Player collects francium
   game.physics.arcade.overlap(player, franciums, this.collectItem, null, this);
   // player collects hci
   game.physics.arcade.overlap(player, hcis, this.collectItem, null, this);
  },

  // Player opens door
  openDoor: function(){
    if(doorIsOpen == false && hasAcid == true)
    {
      PickUpMessage('Press I to use the Hydrochloric Acid');
      if(interactKey.isDown)
      {
        PickUpMessage('\n\nThe Hydrochloric Acid has corroded \nthrough the lock!');
        sounds.openDoorSfx.play();
        door.animations.play('open', 30, false);
        doorIsOpen = true;
        score += 20;
      }
      else{
      //  this.displayHelp();
        //sounds.doorLockedSfx.play();
      }

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
        this.game.state.start('level3');
      }
    }
},


collectItem: function(player, image){
  image.kill();
  sounds.pickUpSfx.play();
  if(image.parent == franciums){
    hasFrancium = true;
    PickUpMessage('          Francium (Fr)');

  }
  else if(image.parent == waterBottles){
      PickUpMessage('          Water(H\u20820)');
      hasWater = true;
    }
    else if(image.parent == hcis){
        PickUpMessage('Hydrogen Chloride Gas (HCl)');
        hasHCI = true;
      }
},


mixingStationInteraction: function(){
  isAtMStation = true;
  if(interactKey.isDown){
    if(hasWater == true && hasFrancium == true && hasHCI == true){
      PickUpMessage('You have Water (H\u2082O),\nFrancium(Fr) and \nHydrogen Chloride gas(HCl)\nPress H to mix HCI & water\nor F to mix Fr & water');
    }
    else if(hasWater == true && hasFrancium == true){
      PickUpMessage('You have Water (H\u2082O) & Francium (Fr)\nPress F to mix them');
    }
    else if(hasWater == true && hasHCI == true){
      PickUpMessage('You have Water (H\u2082O) & Hydrogen Chloride gas(HCl)\nPress H to mix them');
    }
    else if(hasFrancium == true && hasHCI == true){
      PickUpMessage('You have Francium (Fr) &\nHydrogen Chloride gas(HCl)\nFind more items to mix');
    }
    else if(hasFrancium == true){
      PickUpMessage('You have Francium (Fr)\nFind more items to mix');
    }
    else if(hasWater == true){
      PickUpMessage('You have Water(H\u20820)\nFind more items to mix');
    }
    else if(hasHCI == true){
      PickUpMessage('You have Hydrogen Chloride gas(HCl)\nFind more items to mix');
    }
    else{
      PickUpMessage('You have nothing to mix\nFind items to mix');
    }
  }
  else{
    // nothing happens as interaction key is not down.
  }

},

useMixingStation: function(){

},

mixHci: function(){
  if(hasHCI == true && hasWater == true && isAtMStation == true && mixHciKey.isDown == true){
    hasAcid = true;
    hasHCI = false;
    PickUpMessage('\n\n\n\n\nYou have created Hydrochloric Acid (HCl)\n   try using this on the door! ');
    helpText = 'Try using the Hydrochloric Acid \n      on the lock!';
    score += 20;
  }
  else{
    // do not mix
  }
},

mixFr: function(){
  if(hasFrancium == true && hasWater == true && isAtMStation == true && mixFrKey.isDown == true){
    deathText('When you mixed the Fr with H20\nthere was a violent exothermic reaction\n\nYou have exploaded!');
    explosion(player);
  }
  else{
      // do not mix
  }
},


// Display tips to user
displayHelp: function(){
  // Help text for player
  PickUpMessage(helpText);

  //PickUpMessage('Press E to interact \nwith the mixing station\n you need a way through\nthe locked door!');
}

};
