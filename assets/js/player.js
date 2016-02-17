var textAlert;
var deathText;


function updatePlayer(){
  movePlayer();
  // check for overlap of player and diamond - calls collectdDiamond function if found
  game.physics.arcade.overlap(player, diamonds, this.collectDiamond, null, this);
  // Player explosion upon fire death
   game.physics.arcade.overlap(player, fires, this.explosion, null, this);
}

function movePlayer(){
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

   if (cursors.up.isDown){
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
  combustionDeath();
}

  //Player dies to combustionDeath
  function combustionDeath(){
  var deathInfo = 'When your body touched the flame \n the potassium set on fire! \n You will continue to burn until you melt..';
  var deathInfoText_style = { font: 'bold 32px Acme', fill: '#f00'};
  deathText = game.add.text(200, 200, deathInfo, deathInfoText_style);
  deathText.fixedToCamera = true;
  game.add.tween(deathText).to({alpha: 0}, 10500, Phaser.Easing.Linear.None, true);
  gameOverInstructions();

}

  //Instructions to player to end game
  function gameOverInstructions(){
  // Instruct player to end game
  var textInfo = 'Press Space to continue';
  var textInfo_style = {font:'bold 32px Acme', fill: '#000'};
  textAlert = game.add.text(250, 400, textInfo, textInfo_style);
  textAlert.fixedToCamera = true;
  var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  space_key.onDown.add(this.endGame, this);
}


// If player loses game
 function endGame(){
   // stop music and start gameOver state
   bgSound.stop('');
    this.game.state.start('gameOver');
}
