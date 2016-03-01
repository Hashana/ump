

function CreateDiamonds(numberOfDiamonds){
  diamonds = game.add.group();
  diamonds.enableBody = true;
  //create x diamonds evenly spaced
  for (var i = 0; i < numberOfDiamonds; i++)
  {
    //create a diamond in the diamonds group
    var diamond = diamonds.create(i * 250,10,'diamond')
    //Add gravity
    diamond.body.gravity.y = 600;
    //Give diamond a random bounce value
    diamond.body.bounce.set(1);
    diamond.collideWorldBounds = true;
    diamond.body.immovable = true;

  }
}

function CreateFires(numberOfFires){
  fires = game.add.group();
  fires.enableBody = true;
  //create 20 fires evenly spaced
  for (var i = 0; i < numberOfFires; i++)
  {
   //create a fire in the fires group
   var fire = fires.create(i * 250 + 15,100,'fire');
   //Add gravity
   fire.body.gravity.y = 400;

   //Give fires a bounce value
   fire.body.bounce.y = 0.7;
  }

}

function InitialiseGameObjects(){
  franciums = game.add.group()
  franciums.enableBody = true;
  mixingStations = game.add.group()
  mixingStations.enableBody = true;
  waterBottles = game.add.group()
  waterBottles.enableBody = true;
  mercurys = game.add.group()
  mercurys.enableBody = true;
  urns = game.add.group();
  urns.enableBody = true;
  platforms = game.add.group()
  platforms.enableBody = true;
  platforms.physicsBodyType = Phaser.Physics.ARCADE;

}

function CreateFrancium(width, height){
  var francium = franciums.create(width, height, 'francium');
}

function CreatePlatform(width, height){
  var platform = platforms.create(width, height, 'ground');
  platform.body.immovable = true;
}

function CreateUrn(width, height){
  var urn = urns.create(width, height, 'urn');
}

function CreateMercury(width, height){
  var mercury = mercurys.create(width, height, 'mercury');
}

function CreateMixingStation(width, height){
  var mixingStation = mixingStations.create(width, height, 'mixingStation');
}

function CreateWater(width, height){
  var waterBottle = waterBottles.create(width,height, 'waterBottle');
}

function CreateDoor(width, height){
  door = game.add.sprite(width, height, 'door');
  game.physics.arcade.enable(door);
  door.body.immovable = true;
  door.animations.add('open', [0,1,2,3], 1, true);
}

function CreateMap(mapName){
  game.stage.backgroundColor = '#7ec0ee';

  // Add tiled map
  map = game.add.tilemap(mapName);
  map.addTilesetImage('tileset1', 'tileset1');
  // Identify the 3 water tiles, call waterDeath() on collision with player
  waterTiles.One = map.setTileIndexCallback(1, waterDeath, this);
  waterTiles.Two = map.setTileIndexCallback(2, waterDeath, this);
  waterTiles.Three = map.setTileIndexCallback(3, waterDeath, this);
  // Create map layer from tilemap layer
  layer = map.createLayer('Tile Layer 1');
  // resize world to fit map
  layer.resizeWorld();
  // Identify map tiles for player to collide with (stop player falling through floor)
  map.setCollisionBetween(4, 16);

}

function CreateGameControls(){
  // Add player movement controls
  cursors = game.input.keyboard.createCursorKeys();

}

function SetUpMusic(music){
  bgSound = game.add.audio(music);
  bgSound.loop = true;
  bgSound.play('');
  return bgSound;
}

function SetUpSounds(){
  sounds.openDoorSfx = game.add.audio('openDoor');
  sounds.explosionSfx = game.add.audio('explosion');
  sounds.jumpSfx = game.add.audio('jump');
  sounds.pickUpSfx = game.add.audio('pickup');
  sounds.jumpSfx.volume = 0.1;
  sounds.pickUpSfx.volume = 0.1;
}

function CreateScoreText(score){
  var scoreText_style = { font: 'bold 32px Acme', fill: '#fff'};
  scoreText = game.add.text(16, 16, 'Score: ' + score, scoreText_style);
  scoreText.fixedToCamera = true;
  return scoreText;
}
