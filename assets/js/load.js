var loadState = {

  preload: function(){
    // tilemap JSON and image file
  //  game.load.tilemap('level1Map', 'assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    //game.load.image('tieset', 'assets/maps/tieset.png');
    game.load.tilemap('level1Map', 'assets/maps/Level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset1', 'assets/maps/tileset1.png');

		game.load.image('ground', 'assets/images/platform.png');
    game.load.spritesheet('door', 'assets/images/door.png', 63, 84);
		game.load.image('diamond', 'assets/images/diamond.png');
    game.load.image('fire', 'assets/images/fire.png');
    game.load.spritesheet('dude', 'assets/images/dude.png', 32,48);
    game.load.audio('openDoor', 'assets/sound/openDoor.mp3');
    game.load.audio('explosion', 'assets/sound/explosion.mp3');
    game.load.spritesheet('explosion', 'assets/images/explosion.png', 60,80);
},

	create: function() {
		game.state.start('menu');
	}
}
