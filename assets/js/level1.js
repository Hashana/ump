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

var level1State = {
  create: function() {
    score = 0;
    doorIsOpen = false;

  	// enable physics
    //game.physics.startSystem(Phaser.Physics.Arcade);

    game.world.setBounds(0, 0, 2000, 600);

    // set background colour
    game.stage.backgroundColor = 0xbada55;


  	// add platforms
  	platforms = game.add.group();
  	// enable physics for group
  	platforms.enableBody = true;

  	// create the ground
  	var ground = platforms.create(0, game.world.height - 64, 'ground');
  	// fit the width of the game
  	ground.scale.setTo(100,2);
  	// stop it from moving when colliding with the player
  	ground.body.immovable = true;

  	var ledge = platforms.create(400,400, 'ground');
  	ledge.body.immovable = true;
  	ledge = platforms.create(-150, 250, 'ground');
  	ledge.body.immovable = true;

    //Add door for win condition
    door = game.add.sprite(1800, game.world.height - 150, 'door');
    game.physics.arcade.enable(door);
    door.body.immovable = true;
    door.animations.add('open', [0,1,2,3], 1, true);
    //door.animations.add('close', [3,2,1,0], 1, true);

    //add player
  	player = game.add.sprite(400, game.world.height - 150, 'dude');
  	game.physics.arcade.enable(player);
  	player.body.bounce.y = 0.2;
  	player.body.gravity.y = 300;
  	player.body.collideWorldBounds = true;
    player.animations.add('left', [0,1,2,3], 10, true);
  	player.animations.add('right', [5,6,7,8], 10, true);
    game.camera.follow(player);



    // Add controls for the game
  	cursors = game.input.keyboard.createCursorKeys();
    HelpKeyQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    HelpKeyQ.onDown.add(this.displayHelp, this);

    // Add collectables - diamonds
  	diamonds = game.add.group();
  	diamonds.enableBody = true;

  	//create 6 diamonds evenly spaced
  	for (var i = 0; i < 6; i++)
  	{
  		//create a diamond in the diamonds group
  		var diamond = diamonds.create(i * 350,0,'diamond')
  		//Add gravity
  		diamond.body.gravity.y = 600;
  		//Give diamond a random bounce value
  		diamond.body.bounce.y = 0.7 + Math.random();
  	}

    // create fire to avoid
    fires = game.add.group();
    fires.enableBody = true;

    //create 12 fires evenly spaced
  	for (var i = 0; i < 12; i++)
  	{
  		//create a fire in the fires group
  		var fire = fires.create(i * 250,0,'fire');
  		//Add gravity
  		fire.body.gravity.y = 400;

  		//Give fires a bounce value
  		fire.body.bounce.y = 0.7;
  	}

    // Add score text
    var scoreText_style = { font: 'bold 32px Acme', fill: '#fff'};
  	scoreText = game.add.text(16, 16, 'Score: ' + score, scoreText_style);
    scoreText.fixedToCamera = true;

;

},

   update: function() {
  	// Player collides with the ground and doesn't fall through it
  	game.physics.arcade.collide(player, platforms);

  	 //  Reset the players velocity (movement)
  	 player.body.velocity.x = 0;

     playerY = player.body.velocity.y;
     playerX = player.body.velocity.x;
     if(cursors.left.isDown)
  	 {
  		 //Move to the left
  		 player.body.velocity.x = -150;
  		 player.animations.play('left');
     }
  	 else if(cursors.right.isDown)
  	 {
  		  // Move right
  			player.body.velocity.x = 150;
  			player.animations.play('right');
      }
  	 else
  	 {
  			//Stand still
  			player.animations.stop();
  			player.frame = 4;
  		}

       // Allows player to jump if they are touching the ground
  		if(cursors.up.isDown && player.body.touching.down)
  		{
  			player.body.velocity.y = -350;
  		}

     //stop diamonds falling through the ground
  	 game.physics.arcade.collide(diamonds, platforms);
     // Stop fire falling through the ground
     game.physics.arcade.collide(fires, platforms);

  	 // check for overlap of player and diamond - calls collectdDiamond function if found
  	 game.physics.arcade.overlap(player, diamonds, this.collectDiamond, null, this);

     // Player explosion upon death
    game.physics.arcade.overlap(player, fires, this.explosion, null, this);

    // Player opens door
    game.physics.arcade.overlap(player, door, this.openDoor, null, this);

    //Player goes through door.
    game.physics.arcade.overlap(player, door, this.completeLevel,null, this);


  },

 collectDiamond: function(player, diamond){
  	//remove diamond from the screen
  	diamond.kill();

  	//Add and update diamond
  	score += 10;
  	scoreText.text = 'Score: ' + score;
},


explosion: function(player){

  player.kill();
  // Add explosion for death animation
  explosion = this.game.add.sprite(player.body.x, player.body.y, 'explosion');
  explosion.anchor.setTo(0.5,0.5);
  explosion.animations.add ('explode',[0,1,2,3], 10 ,true);
  explosion.animations.play("explode", 30, false);
  this.combustionDeath();

},

// If player loses game
endGame: function(){

    this.game.state.start('gameOver');
},

// Player opens door
openDoor: function(){
  if(doorIsOpen == false && score >= 30)
  {
    door.animations.play('open', 30, false);
    doorIsOpen = true;
  }
  else {
  this.displayHelp();
  }
},

//Player dies to combustionDeath
combustionDeath: function(){
  var deathInfo = 'When your body touched the flame \n the potassium set on fire! \n You will continue to burn until you melt..';
  var deathInfoText_style = { font: 'bold 32px Acme', fill: '#f00'};
  deathText = game.add.text(200, 200, deathInfo, deathInfoText_style);
  deathText.fixedToCamera = true;
  game.add.tween(deathText).to({alpha: 0}, 10500, Phaser.Easing.Linear.None, true);
  this.gameOverInstructions();

},

//Instructions to player to end game
gameOverInstructions: function(){
  // Instruct player to end game
  var textInfo = 'Press Space to continue';
  var textInfo_style = {font:'bold 32px Acme', fill: '#000'};
  textAlert = game.add.text(250, 400, textInfo, textInfo_style);
  textAlert.fixedToCamera = true;
  var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  space_key.onDown.add(this.endGame, this);
},

// Player goes through door if its open
completeLevel: function(){
  if(doorIsOpen == true)
  {
    if(cursors.up.isDown)
    {
      this.game.state.start('win');
    }
  }

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
// end state
};
