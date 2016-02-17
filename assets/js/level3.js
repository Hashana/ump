var bgSound;
var sounds = {};
var level3State = {
  create: function(){
    game.stage.backgroundColor = '#7ec0ee';
    map = game.add.tilemap('level2Map');
    map.addTilesetImage('tileset1', 'tileset1');
    // Identify the 3 water tiles, call waterDeath() on collision with player
    map.setTileIndexCallback(1, this.waterDeath, this);
    map.setTileIndexCallback(2, this.waterDeath, this);
    map.setTileIndexCallback(3, this.waterDeath, this);
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

    // Background sound  on a loop
    bgSound = game.add.audio('music2');
    bgSound.loop = true;
    bgSound.play('');

    // Add sound effects
    sounds.openDoorSfx = game.add.audio('openDoor');
    sounds.explosionSfx = game.add.audio('explosion');
    sounds.jumpSfx = game.add.audio('jump');
    sounds.pickUpSfx = game.add.audio('pickup');

},

update: function(){
  // stop player and collectables falling through the ground.
  game.physics.arcade.collide(player, layer);
  updatePlayer();



}

};
