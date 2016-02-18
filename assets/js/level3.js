var bgSound;
var sounds = {};
var icyTile;
var tiles;
var icyTiles;

var level3State = {
  create: function(){
    game.stage.backgroundColor = '#7ec0ee';
    map = game.add.tilemap('level2Map');
    map.addTilesetImage('tileset1', 'tileset1');
    // Identify the 3 water tiles, call waterDeath() on collision with player
    map.setTileIndexCallback(1, waterDeath, this);
    map.setTileIndexCallback(2, waterDeath, this);
    map.setTileIndexCallback(3, waterDeath, this);
    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();
    map.setCollisionBetween(4, 16);


    HelpKeyQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    HelpKeyQ.onDown.add(this.displayHelp, this);


    // Add Player//add player
  	player = game.add.sprite(50, game.world.height - 150, 'dude');
  	game.physics.arcade.enable(player);
  	player.body.bounce.y = 0.2;
  	player.body.gravity.y = 300;
    // store player position to use later
    playerY = player.body.velocity.y;
    playerX = player.body.velocity.x;
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

  if (player.body.onFloor()){
    // ice movement
    if (player.body.velocity.x != 0){
      isOnIce = true;
      updatePlayer(isOnIce);
    }
    else {
      isOnIce = false;
      updatePlayer(isOnIce);
    }
  }
  else {
    isOnIce = false;
    updatePlayer(isOnIce);
  }
},

// Display tips to user
displayHelp: function(){
  // Help text for player
  var returnValue = map.getTile(player.body.x, player.body.y, 'Tile Layer 1', false);
  var helpText_style = { font: 'bold 32px Acme', fill: '#fff'};
  helpText = game.add.text(200, 100, returnValue, helpText_style);
  helpText.fixedToCamera = true;
  game.add.tween(helpText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);

},



};

function iceTest()
{
  console.log('touching ice');
}
