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
var hasFrancium;
var hasWater;
var hasMercury;
var hasAsh;
var isOnPlatform;

 var level1State = {
   create: function(){
     CreateMap('level1Map');
     InitialiseGameObjects();
     // set score to 0
     score = 0;

     //Add door for win condition
      CreateDoor(4791, 160, 'door');
    //  CreateDoor(100, game.world.height -160);
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
     //CreateGameControls();
     cursors = game.input.keyboard.createCursorKeys();
     // Add Q Key for help
     HelpKeyQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
     HelpKeyQ.onDown.add(this.displayHelp, this);
     // Add E Key for Interactions
    interactKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
    interactKey.onDown.add(this.mixingStationInteraction, this);
    //Add F Key for mixing Fr & Water
    mixFrKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
    mixFrKey.onDown.add(this.mixFr, this);
    // Add key to create
    mixMKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    mixMKey.onDown.add(this.mixMercury, this);
    // Add Gathering key
    gatherKey = game.input.keyboard.addKey(Phaser.Keyboard.G);
    gatherKey.onDown.add(this.gatherAsh, this);
    //Add key to fill urn
    fillKey = game.input.keyboard.addKey(Phaser.Keyboard.U);
    fillKey.onDown.add(this.fillUrn, this)

     // Add educational elements to level
     //Add Mixing Station
     CreateMixingStation(4508, game.world.height - 100);
     // Add Water
     CreateWater(game.world.width - 1813, game.world.height - 245);
    // CreateWater(147,game.world.height - 687);
     hasWater = false;
     // Create Mercury image
     CreateMercury(350, game.world.height - 515);
     hasMercury = false;
     // Add Francium (Red herring)
     CreateFrancium(589, game.world.height - 78);
     hasFrancium = false;

     //Create urn
    // CreateUrn(4450, game.world.height - 90);
     CreateUrn(game.world.width - 2455, game.world.height - 334);
     hasAsh = false;

     // Add collectables - diamonds
     CreateDiamonds(20);
     // create 15 fires to avoid
     CreateFires(15)
},

update: function(){

     UpdateCollision(player, layer, diamonds, fires);
     // update player movement and check for actions
     updatePlayer();
     isAtMStation = false;

     // Player opens door
     game.physics.arcade.overlap(player, door, this.openDoor, null, this);
     // Player collides with the ground and doesn't fall through it
     game.physics.arcade.collide(player, platforms);
     //Player goes through door.
     game.physics.arcade.overlap(player, door, this.completeLevel,null, this);
     // //Player collects water
     game.physics.arcade.overlap(player, waterBottles, this.collectItem, null, this);
     //Player is asked to interact with the mixing station
    game.physics.arcade.overlap(player, mixingStations, this.mixingStationInteraction, null, this);
    // Player collects Mercury(II) thiocyanate
    game.physics.arcade.overlap(player, mercurys, this.collectItem, null, this);
    //Check player is next to urn to fill with ash
    game.physics.arcade.overlap(player, urns, this.fillUrn, null, this);
    // Player collects francium
    game.physics.arcade.overlap(player, franciums, this.collectItem, null, this);

},

render: function(){
//  fires.forEachAlive(game.debug.body,game.debug,"#ffffff",false);
//  game.debug.body(fires);
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

 collectItem: function(player, image){
   image.kill();
   sounds.pickUpSfx.play();
   if(image.parent == franciums){
     hasFrancium = true;
     PickUpMessage('          Francium(Fr)');

   }
   else if(image.parent == waterBottles){
       PickUpMessage('          Water(H20)');
       hasWater = true;
     }
     else if(image.parent == mercurys){
         PickUpMessage('Mercury(II) thiocyanate (Hg(SCN)2)');
         hasMercury = true;
       }
 },


 mixingStationInteraction: function(){
   isAtMStation = true;
   if(interactKey.isDown){
     if(hasWater == true && hasFrancium == true && hasMercury == true){
       PickUpMessage('You have Water (H2O), \nMercury(II) thiocyanate (Hg(SCN)2) \n& Francium(Fr)\nPress F to mix Francium \n& water Or press M to\nignite Mercury(II) thiocyanate (Hg(SCN)2)');
     }
     else if(hasWater == true && hasFrancium == true){
        PickUpMessage('You have Water (H2O), \n& Francium(Fr)\nPress F to mix ');
     }
     else if(hasWater == true && hasMercury == true){
        PickUpMessage('You have Water (H2O), \n& Mercury(II) thiocyanate (Hg(SCN)2)\nPress M to ignite\nMercury(II) thiocyanate (Hg(SCN)2)');
     }
     else if(hasFrancium == true){
       PickUpMessage('You have Francium(Fr)\nFind more items to mix');
     }
     else if(hasWater == true){
       PickUpMessage('You have Water(H20)\nFind more items to mix');
     }
     else if(hasMercury == true){
       PickUpMessage('You have Mercury(II) thiocyanate(Hg(SCN)2)\nPush M to ignite it');
     }
     else{
       PickUpMessage('You have nothing to mix\nFind items to mix');
     }
   }
   else{
     // nothing happens as interaction key is not down.
   }

 },


 //
 mixFr: function(){
   if(hasFrancium == true && hasWater == true && isAtMStation == true && mixFrKey.isDown == true){
     deathText('When you mixed the Fr with H20\nthere was a violent exothermic reaction\n\nYou have exploaded!');
     explosion(player);
   }
   else{
       // do not mix
   }
 },

 mixMercury: function(){
   if(hasMercury == true && isAtMStation == true && mixMKey.isDown == true){
     //input animation call here!
     EducationalInfo('You begin see to smoke and its spewing\n out ash everwhere resembling a snake\n its called an Intumescent reaction\nPress G to gather the ash');
     hasMercury = false;

   }
   else{
       // do not mix
   }
 },

 gatherAsh: function(){
   if(hasAsh == false && isAtMStation == true && gatherKey.isDown == true){
     PickUpMessage('You have gathered up the ash');
     hasAsh = true;

   }
   else{
       // do not mix
        }
 },

// fill urn to access platforms once ash has been gathered.
 fillUrn: function(){
   if(hasAsh == true){
     PickUpMessage('Press U to fill urn with ash');
   }
   else{
     PickUpMessage('Find Ash to fill urn');
   }
   if(hasAsh == true && fillKey.isDown == true){
     platformX = CreatePlatform(game.world.width - 441, game.world.height - 49);
      game.add.tween(platformX.body).to({ y: '-700' }, 14000,Phaser.Easing.Linear.None).to({y:'+700'}, 2000,Phaser.Easing.Linear.None).yoyo().loop().start();

   }
 },

 // Display tips to user
 displayHelp: function(){
   // Help text for player
   PickUpMessage('Press E to interact \nwith the mixing station\n you need a way to\nreach the door!');
 }

 };
