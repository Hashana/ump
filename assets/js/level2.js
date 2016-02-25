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
var waterBottles;
var hasWater;

var level2State = {
  create: function(){
    game.stage.backgroundColor = '#7ec0ee';

    // Add tiled map
    map = game.add.tilemap('level1Map');
    map.addTilesetImage('tileset1', 'tileset1');
    // Identify the 3 water tiles, call waterDeath() on collision with player
    // uncomment 3 lines below after debugging!!
    waterTiles.One = map.setTileIndexCallback(1, waterDeath, this);
    waterTiles.Two = map.setTileIndexCallback(2, waterDeath, this);
    waterTiles.Three = map.setTileIndexCallback(3, waterDeath, this);
    // Create map layer from tilemap layer
    layer = map.createLayer('Tile Layer 1');
    // resize world to fit map
    layer.resizeWorld();
    // Identify map tiles for player to collide with (stop player falling through floor)
    map.setCollisionBetween(4, 16);



    // set up level variables
    score = 0;
    doorIsOpen = false;

    //Add door for win condition
    door = game.add.sprite(4840, game.world.height - 279, 'lockedDoor');
    game.physics.arcade.enable(door);
    door.body.immovable = true;
    door.animations.add('open', [0,1,2,3], 1, true);

    // Add Player//add player
  	player = game.add.sprite(50, game.world.height - 98, 'dude');
  	game.physics.arcade.enable(player);
  	player.body.bounce.y = 0.2;
  	player.body.gravity.y = 300;
  	player.body.collideWorldBounds = true;
    player.animations.add('left', [0,1,2,3], 10, true);
  	player.animations.add('right', [5,6,7,8], 10, true);
    // focus camera to stay with player
    game.camera.follow(player);

    // Add score text
    var scoreText_style = { font: 'bold 32px Acme', fill: '#fff'};
    scoreText = game.add.text(16, 16, 'Score: ' + score, scoreText_style);
    scoreText.fixedToCamera = true;

    // Background sound  on a loop
    bgSound = game.add.audio('music1');
    bgSound.loop = true;
    bgSound.play('');

    // Add sound effects
    sounds.openDoorSfx = game.add.audio('openDoor');
    sounds.explosionSfx = game.add.audio('explosion');
    sounds.jumpSfx = game.add.audio('jump');
    sounds.pickUpSfx = game.add.audio('pickup');
    sounds.doorLockedSfx = game.add.audio('doorLocked');
    sounds.volume = 0.1;

    // Add controls for the game
  	cursors = game.input.keyboard.createCursorKeys();
    HelpKeyQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    HelpKeyQ.onDown.add(this.displayHelp, this);

    // Add educational elements to level
    waterBottles = game.add.group()
    waterBottles.enableBody = true;
    var waterbottle = waterBottles.create(3675, 539, 'waterBottle');
    hasWater == false;

    // Add collectables - diamonds
  	diamonds = game.add.group();
  	diamonds.enableBody = true;
  	//create 12 diamonds evenly spaced
  	for (var i = 0; i < 12; i++)
  	{
  		//create a diamond in the diamonds group
  		var diamond = diamonds.create(i * 350,10,'diamond')
  		//Add gravity
  		diamond.body.gravity.y = 600;
  		//Give diamond a random bounce value
  		diamond.body.bounce.set(1);
      diamond.collideWorldBounds = true;
      diamond.body.immovable = true;

  	}

    // create fire to avoid
    fires = game.add.group();
    fires.enableBody = true;
    //create 20 fires evenly spaced
  	for (var i = 0; i < 20; i++)
  	{
  		//create a fire in the fires group
  		var fire = fires.create(i * 250 + 10,100,'fire');
  		//Add gravity
  		fire.body.gravity.y = 400;

  		//Give fires a bounce value
  		fire.body.bounce.y = 0.7;
  	}

  },

  update: function(){
    // stop player and collectables falling through the map.
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(diamonds, layer);
    game.physics.arcade.collide(fires, layer);

    // update player movement and check for actions
    updatePlayer();

   // Player opens door
   game.physics.arcade.overlap(player, door, this.openDoor, null, this);

   //Player goes through door.
   game.physics.arcade.overlap(player, door, this.completeLevel,null, this);
   //Player water death
   game.physics.arcade.overlap(player, waterTiles, this.waterDeath, null, this);
   //Player collects water
   game.physics.arcade.overlap(player, waterBottles, this.pickUpWater, null, this);
  },

  // Player opens door
  openDoor: function(){
    if(doorIsOpen == false && score >= 100)
    {
      sounds.openDoorSfx.play();
      door.animations.play('open', 30, false);
      doorIsOpen = true;
    }
    else{
    this.displayHelp();
    //sounds.doorLockedSfx.play();
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

pickUpWater: function(player, waterBottle){
  //remove diamond from the screen
  waterBottle.kill();
  sounds.pickUpSfx.play();
  var pickUpMessage = 'Water';
  var pickUPStyle = { font: 'bold 50px Acme', fill: '#fff'};
  var pickUpText = game.add.text( 300,  100, pickUpMessage, pickUPStyle);
  pickUpText.fixedToCamera = true;
  game.add.tween(pickUpText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
  hasWater == true;

},


// Display tips to user
displayHelp: function(){
  // Help text for player
  var instructions = 'Collect 3 diamonds to open door';
  var helpText_style = { font: 'bold 32px Acme', fill: '#fff'};
  helpText = game.add.text(200, 100, instructions, helpText_style);
  helpText.fixedToCamera = true;
  game.add.tween(helpText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);

}
};
