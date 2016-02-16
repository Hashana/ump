var level3State = {
  create: function(){
    game.stage.backgroundColor = '#7ec0ee';
    map = game.add.tilemap('level2Map');
    map.addTilesetImage('tileset1', 'tileset1');
    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();
    map.setCollisionBetween(4, 16);

    // Add Player//add player
  	player = game.add.sprite(50, 0, 'dude');
  	game.physics.arcade.enable(player);
  	player.body.bounce.y = 0.2;
  	player.body.gravity.y = 300;
  	player.body.collideWorldBounds = true;
    player.animations.add('left', [0,1,2,3], 10, true);
  	player.animations.add('right', [5,6,7,8], 10, true);
    game.camera.follow(player);

    // Add controls for the game
    cursors = game.input.keyboard.createCursorKeys();

},

update: function(){
  // stop player and collectables falling through the ground.
  game.physics.arcade.collide(player, layer);

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
      }
  }


}

};
