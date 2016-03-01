var map;
var layer;
var player;
var platforms;
var cursors;
var diamonds;
var score;
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
var sounds = {};

 var level1State = {
   create: function(){
     CreateMap('level1Map');
     InitialiseGameObjects();
     // set score to 0
     score = 0;

     //Add door for win condition
      CreateDoor(4791, 160);
      CreateDoor(100, game.world.height -160);
      doorIsOpen = false;

      //Add player
      setUpPlayer(50, game.world.height - 98);
      this.displayHelp();

     // Add score text
     scoreText = CreateScoreText(score);

     // Add sound effects
     bgSound = SetUpMusic('music2');
     SetUpSounds();

     // Add controls for the game
     // Adds cursor keys
     CreateGameControls();
     // Add Q Key for help
     HelpKeyQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
     HelpKeyQ.onDown.add(this.displayHelp, this);
     // Add E Key for Interactions
     //interactKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
    // interactKey.onDown.add(this.useMixingStation, this);
     // Add H Key for mixing HCI acid & Water
     //mixHciKey = game.input.keyboard.addKey(Phaser.Keyboard.H);
    // mixHciKey.onDown.add(this.mixHci, this);
    //Add F Key for mixing Fr & Water
    // mixFrKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
    // mixFrKey.onDown.add(this.mixFr, this);


     // Add educational elements to level
     //Add Mixing Station
     CreateMixingStation(4508, game.world.height - 100);
     // Add Water
     CreateWater(2352, 98);
     hasWater = false;

     // Add Francium (Red herring)
     CreateFrancium(589, game.world.height - 78);
     hasFrancium = false;
     // Add collectables - diamonds
     CreateDiamonds(20);
     // create 15 fires to avoid
     CreateFires(15)
   },

   update: function(){
     // stop player and collectables falling through the map.
     UpdateCollision(player, layer, diamonds, fires);
     // update player movement and check for actions
     updatePlayer();
     isAtMStation = false;

     // Player opens door
     game.physics.arcade.overlap(player, door, this.openDoor, null, this);

     //Player goes through door.
     game.physics.arcade.overlap(player, door, this.completeLevel,null, this);
     // //Player collects water
     game.physics.arcade.overlap(player, waterBottles, this.pickUpWater, null, this);
     //Player is asked to interact with the mixing station
    game.physics.arcade.overlap(player, mixingStations, this.mixingStationInteraction, null, this);
    // Player collects francium
    //game.physics.arcade.overlap(player, franciums, this.pickUpFrancium, null, this);
    game.physics.arcade.overlap(player, franciums, this.collectItem, null, this);


   },

   // Player opens door
   openDoor: function(){
     if(doorIsOpen == false)
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
         this.game.state.start('level2');
       }
     }
 },

 pickUpWater: function(player, waterBottle){
   //remove water from the screen
   waterBottle.kill();
   sounds.pickUpSfx.play();
   this.pickUpMessage('      Water');
   hasWater = true;

 },

 collectItem: function(player, image){
   image.kill();
   sounds.pickUpSfx.play();
   if(image.parent == franciums){;
     PickUpMessage('          Francium');
     hasFrancium == true;
   }
   else if(image.parent == waterBottles){
       PickUpMessage('          Water');
       hasWater = true;
     }
 },

 // pickUpFrancium: function(player, francium){
 //   //remove diamond from the screen
 //   francium.kill();
 //   sounds.pickUpSfx.play();
 //   this.pickUpMessage('      Francium');
 //   hasFrancium = true;
 //
 // },

 // pickUpHCI: function(player, hci){
 //   //remove diamond from the screen
 //   hci.kill();
 //   sounds.pickUpSfx.play();
 //   this.pickUpMessage('Hydrogen Chloride Gas (HCI)');
 //   hasHCI = true;
 //
 // },

 // pickUpMessage: function(text){
 //   var pickUpMessage = text;
 //   var pickUPStyle = { font: 'bold 32px Acme', fill: '#000'};
 //   var pickUpText = game.add.text( 200,  100, pickUpMessage, pickUPStyle);
 //   pickUpText.fixedToCamera = true;
 //   game.add.tween(pickUpText).to({alpha: 0}, 2300, Phaser.Easing.Linear.None, true);
 // },

 // mixingStationInteraction: function(){
 //   isAtMStation = true;
 //   if(interactKey.isDown){
 //     if(hasWater == true && hasFrancium == true && hasHCI == true){
 //       this.pickUpMessage('You have Water (H2O),\nFrancium(Fr) and \nHydrogen Chloride gas(HCI)\nPress H to mix HCI & water\nor F to mix Fr & water');
 //     }
 //     else if(hasWater == true && hasFrancium == true){
 //       this.pickUpMessage('You have Water (H2O) & Francium(Fr)\nPress F to mix them');
 //     }
 //     else if(hasWater == true && hasHCI == true){
 //       this.pickUpMessage('You have Water (H2O) & Hydrogen Chloride gas(HCI)\nPress H to mix them');
 //     }
 //     else if(hasFrancium == true && hasHCI == true){
 //       this.pickUpMessage('You have Francium(Fr) &\nHydrogen Chloride gas(HCI)\nFind more items to mix');
 //     }
 //     else if(hasFrancium == true){
 //       this.pickUpMessage('You have Francium(Fr)\nFind more items to mix');
 //     }
 //     else if(hasWater == true){
 //       this.pickUpMessage('You have Water(H20)\nFind more items to mix');
 //     }
 //     else if(hasHCI == true){
 //       this.pickUpMessage('You have Hydrogen Chloride gas(HCI)\nFind more items to mix');
 //     }
 //     else{
 //       this.pickUpMessage('You have nothing to mix\nFind items to mix');
 //     }
 //   }
 //   else{
 //     // nothing happens as interaction key is not down.
 //   }
 //
 // },
 //
 // useMixingStation: function(){
 //
 // },

 // mixHci: function(){
 //   if(hasHCI == true && hasWater == true && isAtMStation == true && mixHciKey.isDown == true){
 //     hasAcid = true;
 //     hasHCI = false;
 //     this.pickUpMessage('\n\n\n\n\n\nYou have created Hydrochloric Acid (HCI)\ntry using this on the door! ');
 //   }
 //   else{
 //     // do not mix
 //   }
 // },
 //
 // mixFr: function(){
 //   if(hasFrancium == true && hasWater == true && isAtMStation == true && mixFrKey.isDown == true){
 //     deathText('When you mixed the Fr with H20\nthere was a violent exothermic reaction\n\nYou have exploaded!');
 //     explosion(player);
 //   }
 //   else{
 //       // do not mix
 //   }
 // },


 // Display tips to user
 displayHelp: function(){
   // Help text for player
   PickUpMessage('Press E to interact \nwith the mixing station\n you need a way to\nreach the door!');
 }

 };
