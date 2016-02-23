var textAlert;
var deathText;
var isMoving;
var tile;
var slideSpeed;


function updatePlayer(ice){
//  decideMovement();
  movePlayer(ice);
  // check for overlap of player and diamond - calls collectdDiamond function if found
  game.physics.arcade.overlap(player, diamonds, this.collectDiamond, null, this);
  // Player explosion upon fire death
  game.physics.arcade.overlap(player, fires, this.combustionDeath, null, this);

}



function movePlayer(ice){
  var isOnIce = ice

  if (slideSpeed < 0)
    slideSpeed = slideSpeed + 1
  else if (slideSpeed > 0)
    slideSpeed = slideSpeed - 1


  //  Reset the players velocity (movement)
  player.body.velocity.x = 0;

  playerY = player.body.velocity.y;
  playerX = player.body.velocity.x;


    if (player.body.facing == Phaser.LEFT)
      player.body.velocity.x += slideSpeed
    else if (player.body.facing == Phaser.RIGHT) {
      player.body.velocity.x += slideSpeed
    }


  if(cursors.left.isDown)
  {
      //Move normally to the left
      player.body.velocity.x = -150;
      player.animations.play('left');

      if (isOnIce){
        slideSpeed = -200;
      }

  }
  else if(cursors.right.isDown)
  {
         // Move right normally
       player.body.velocity.x = 150;
       player.animations.play('right');

       if (isOnIce){
         slideSpeed = 200;
       }

   }
  else
  {
     //Stand still - no key presses
     player.animations.stop();
     player.frame = 4;
   }


   if (cursors.up.isDown){
      // Checks player is touching the floor before jumping
      if (player.body.onFloor())
      {
          player.body.velocity.y = -350;
          sounds.jumpSfx.play();
      }
  }
}



  function collectDiamond(player, diamond){
   //remove diamond from the screen
   diamond.kill();
   sounds.pickUpSfx.play();
   //Add and update diamond
   score += 10;
   scoreText.text = 'Score: ' + score;
}

  function explosion(player){
  // remove player sprite
  player.kill();
  //Add sound effect
  sounds.explosionSfx.play();
  // Add explosion for death animation
  var explosion = this.game.add.sprite(player.body.x, player.body.y, 'explosion');
  explosion.anchor.setTo(0.5,0.5);
  explosion.animations.add ('explode',[0,1,2,3], 10 ,true);
  explosion.animations.play("explode", 10, false);
  gameOverInstructions();

}

  //Player dies to combustionDeath
  function combustionDeath(){
  var deathInfo = 'When your body touched the flame \n the potassium set on fire! \n You will continue to burn until you melt..';
  var deathInfoText_style = { font: 'bold 32px Acme', fill: '#f00'};
  var deathText = game.add.text(200, 200, deathInfo, deathInfoText_style);
  deathText.fixedToCamera = true;
  game.add.tween(deathText).to({alpha: 0}, 10500, Phaser.Easing.Linear.None, true);
  explosion(player);

}

  //Instructions to player to end game
  function gameOverInstructions(){
  // Instruct player to end game
  var textInfo = 'Press Space to continue';
  var textInfo_style = {font:'bold 32px Acme', fill: '#000'};
  var textAlert = game.add.text(250, 400, textInfo, textInfo_style);
  textAlert.fixedToCamera = true;
  var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  space_key.onDown.add(this.endGame, this);
}

  //Player dies to water
  function waterDeath(sprite){
  if(sprite == player){
    var waterDeathInfo = 'When your body touched the water \n the potassium in your body reacted \n with the oxygen! \n You will continue to burn until you melt..';
    var waterDeathInfoText_style = { font: 'bold 32px Acme', fill: '#f00'};
    var deathText = game.add.text(200, 200, waterDeathInfo, waterDeathInfoText_style);
    deathText.fixedToCamera = true;
    game.add.tween(waterDeathInfo).to({alpha: 0}, 10500, Phaser.Easing.Linear.None, true);
    explosion(player);
  }
  else {
    return
  }

}


// If player loses game
 function endGame(){
   // stop music and start gameOver state
   bgSound.stop('');
    this.game.state.start('gameOver');
}
