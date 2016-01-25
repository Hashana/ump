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


var level1State = {
  create: function() {
    score = 0;
  	// enable physics
    game.physics.startSystem(Phaser.Physics.Arcade);

    // set background sprite
    game.stage.backgroundColour = '#2d2d2d';
    game.world.setBounds(0, 0, 2000, 600);

    //set up timer
    timer = game.time.create(3000, false);

  	// add platforms
  	platforms = game.add.group();
  	// enable physics for group
  	platforms.enableBody = true;
  	// create the ground
  	var ground = platforms.create(0, game.world.height - 64, 'ground');
  	// fit the width of the game
  	ground.scale.setTo(2,2);
  	// stop it from moving when colliding with the player
  	ground.body.immovable = true;

  	var ledge = platforms.create(400,400, 'ground');
  	ledge.body.immovable = true;
  	ledge = platforms.create(-150, 250, 'ground');
  	ledge.body.immovable = true;

    //add player
  	player = game.add.sprite(400, game.world.height - 150, 'dude');
  	game.physics.arcade.enable(player);
  	player.body.bounce.y = 0.2;
  	player.body.gravity.y = 300;
  	player.body.collideWorldBounds = true;
    player.animations.add('left', [0,1,2,3], 10, true);
  	player.animations.add('right', [5,6,7,8], 10, true);

    // Add controls for the game
  	cursors = game.input.keyboard.createCursorKeys();

    // Add collectables - diamonds
  	diamonds = game.add.group();
  	diamonds.enableBody = true;

  	//create 12 diamonds evenly spaced
  	for (var i = 0; i < 12; i++)
  	{
  		//create a diamond in the diamonds group
  		var diamond = diamonds.create(i * 150,0,'diamond');
  		//Add gravity
  		diamond.body.gravity.y = 60;
  		//Give diamond a random bounce value
  		diamond.body.bounce.y = 0.7 + Math.random() * 2;
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
  		fire.body.gravity.y = 40;
  		//Give diamond a random bounce value
  		fire.body.bounce.y = 0.7;
  	}

    // Add score text
  	scoreText = game.add.text(16, 16, 'Score: ' + score, {fontSize: '32px', fill:'#fff'});
    scoreText.fixedToCamera = true;


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

     // Update Camera
     if (cursors.up.isDown)
    {
        game.camera.y -= 2;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 2;
    }

    if (cursors.left.isDown)
    {
        game.camera.x -= 2;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 2;
    }

  },

 collectDiamond: function(player, diamond){
  	//remove diamond from the screen
  	diamond.kill();

  	//Add and update diamond
  	score += 10;
  	scoreText.text = 'Score: ' + score;
    if(score == 10)
    {
      this.game.state.start('win');
    }
},


explosion: function(player){

  player.kill();
  // Add explosion for death animation
  explosion = this.game.add.sprite(player.body.x, player.body.y, 'explosion');
  explosion.anchor.setTo(0.5,0.5);
  explosion.animations.add ('explode',[0,1,2,3], 10 ,true);
  explosion.animations.play("explode", 30, false);
  explosion.animations.play("explode", 30, false);
  explosion.animations.play("explode", 30, false);
  this.endGame();

},

endGame: function(){
  this.game.state.start('gameOver');
}

};
