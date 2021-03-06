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
var hasCaesium;
var hasWater;
var hasMercury;
var hasAsh;
var isOnPlatform;
var platformCreated;

 var level1State = {
   create: function(){
     CreateMap('level1Map');
     InitialiseGameObjects();
     // set score to 0
     score = 0;


     platformCreated = false;


     //Add door for win condition
      CreateDoor(4791, 160, 'door');
    //  CreateDoor(100, game.world.height -160);
      doorIsOpen = false;

      //Add player
      setUpPlayer(50, game.world.height - 98);

      helpText = '\nYou need a way to reach the door!';
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
    interactKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
    interactKey.onDown.add(this.useMixingStation, this);
    //Add F Key for mixing Fr & Water
    mixCsKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
    mixCsKey.onDown.add(this.mixFr, this);
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
     isAtMStation = false;
     // Add Water
     CreateWater(game.world.width - 1813, game.world.height - 245);
    // CreateWater(147,game.world.height - 687);
     hasWater = false;
     // Create Mercury image
     CreateMercury(350, game.world.height - 515);
     hasMercury = false;
     // Add caesium (Red herring)
     CreateCaesium(589, game.world.height - 78);
     hasCaesium = false;

     //Create urn
    // CreateUrn(4450, game.world.height - 90);
     CreateUrn(game.world.width - 1255, game.world.height - 334);
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
     //Player collects water
     game.physics.arcade.overlap(player, waterBottles, this.collectItem, null, this);
     //Player is asked to interact with the mixing station
    game.physics.arcade.overlap(player, mixingStations, this.mixingStationInteraction, null, this);
    // Player collects Mercury(II) thiocyanate
    game.physics.arcade.overlap(player, mercurys, this.collectItem, null, this);
    //Check player is next to urn to fill with ash
    game.physics.arcade.overlap(player, urns, this.fillUrn, null, this);
    // Player collects francium
    game.physics.arcade.overlap(player, caesiums, this.collectItem, null, this);
    //Player collects water
    game.physics.arcade.overlap(player, beanstalks, this.collectItem, null, this);

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
   if(image.parent == caesiums){
     hasCaesium = true;
     PickUpMessage('          Caesium(Cs)');

   }
   else if(image.parent == waterBottles){
       PickUpMessage('          Water(H\u20820)');
       hasWater = true;
     }
     else if(image.parent == mercurys){
         PickUpMessage('Mercury(II) thiocyanate (Hg(SCN)\u2082)');
         hasMercury = true;
       }
       else if(image.parent == beanstalks){
           PickUpMessage('Carbon Nitride(C\u2083N\u2084)');
           hasAsh = true;
         }
 },

 useMixingStation: function(){

 },


 mixingStationInteraction: function(){
   isAtMStation = true;
   if(interactKey.isDown){
     if(hasWater == true && hasCaesium == true && hasMercury == true){
       PickUpMessage('You have Water (H\u2082O), \nMercury(II) thiocyanate (Hg(SCN)\u2082) \n& Caesium(Cs)\nPress C to mix Caesium(Cs) & water \nOr press M to ignite the \nMercury(II) thiocyanate (Hg(SCN)\u2082)');
     }
     else if(hasWater == true && hasCaesium == true){
        PickUpMessage('You have Water (H\u2082O), \n& Caesium(Cs)\nPress C to mix ');
     }
     else if(hasWater == true && hasMercury == true){
        PickUpMessage('You have Water (H\u2082O), \n& Mercury(II) thiocyanate (Hg(SCN)\u2082)\nPress M to ignite\nMercury(II) thiocyanate (Hg(SCN)\u2082)');
     }
     else if(hasMercury == true && hasCaesium == true){
       PickUpMessage('You have Caesium(Cs), \n& Mercury(II) thiocyanate (Hg(SCN)\u2082)\nPress M to ignite\nMercury(II) thiocyanate (Hg(SCN)\u2082)');
     }
     else if(hasCaesium == true){
       PickUpMessage('You have Caesium(Cs)\nFind more items to mix');
     }
     else if(hasWater == true){
       PickUpMessage('You have Water(H\u20820)\nFind more items to mix');
     }
     else if(hasMercury == true){
       PickUpMessage('You have Mercury(II) thiocyanate\n(Hg(SCN)\u2082). Push M to ignite it');
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
   if(hasCaesium == true && hasWater == true && isAtMStation == true && mixCsKey.isDown == true){
     deathText('When you mixed the Caesium(Cs) \nwith Water(H\u20820)there was a violent \nexothermic reaction\nYou have exploaded!');
     explosion(player);
   }
   else{
       // do not mix
   }
 },

 mixMercury: function(){
   if(hasMercury == true && isAtMStation == true && mixMKey.isDown == true){
     //input animation call here!
     EducationalInfo('\n\n\n\nMercury thiocyanate when lit \nhas an effect known as the Pharaohs serpent. \nA rapid exothermic reaction has started \nwhich produces Carbon Nitride (C\u2083N\u2084) \na mass of coiling serpent-like solid');
     hasMercury = false;
     CreateBeanstalk(4408, game.world.height - 100);
     score += 20;



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
   if(hasAsh == true ){
     if( platformCreated == false){
       PickUpMessage('Press U to fill with Carbon Nitride \n           (C\u2083N\u2084)');
     }
   }
   else{
     PickUpMessage('Fill with Carbon Nitride (C\u2083N\u2084)');
   }
   if(hasAsh == true && fillKey.isDown == true && platformCreated == false){
     platformX = CreatePlatform(game.world.width - 441, game.world.height - 49);
      game.add.tween(platformX.body).to({ y: '-700' }, 14000,Phaser.Easing.Linear.None).to({y:'+700'}, 2000,Phaser.Easing.Linear.None).yoyo().loop().start();
      platformCreated = true;
      PickUpMessage('\n\n\n"Click" .. it worked!');
      helpText = '\n\n\n\n\n\nMaybe you can reach the door now?';
      this.displayHelp();

   }
 },

 // Display tips to user
 displayHelp: function(){
   // Help text for player
   PickUpMessage(helpText);
 }

 };
