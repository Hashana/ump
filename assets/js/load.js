var loadState = {

  preload: function(){
    // Load tilemap JSON and image files
    game.load.tilemap('level1Map', 'assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level2Map', 'assets/maps/level2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset1', 'assets/maps/tileset1.png');

    //Load background images
    game.load.image('introBg', 'assets/images/intro.png');
    game.load.image('menuBg', 'assets/images/menu.jpg');

    // Load images
    game.load.image('ground', 'assets/images/platform.png');
    //game.load.image('lock', 'assets/images/lock1.png')
		game.load.image('diamond', 'assets/images/diamond.png');
    game.load.image('fire', 'assets/images/fire.png');

    //Load spritesheets
    game.load.spritesheet('dude', 'assets/images/dude.png', 32,48);
    game.load.spritesheet('door', 'assets/images/door.png', 63, 84);
    game.load.spritesheet('lockedDoor', 'assets/images/LockedDoor.png', 63, 84);
    game.load.spritesheet('explosion', 'assets/images/explosion.png', 60,80);

    // Load background music
    game.load.audio('music1', 'assets/sound/RetroBeat.ogg');
    game.load.audio('music2', 'assets/sound/RetroComedy.ogg');

    //Load sounds
    game.load.audio('explosion', 'assets/sound/explosion.mp3');
    game.load.audio('jump', 'assets/sound/jump.ogg');
    game.load.audio('pickup', 'assets/sound/pickup.ogg');
    game.load.audio('openDoor', 'assets/sound/openDoor.mp3');
    game.load.audio('doorLocked', 'assets/sound/lockedDoor.ogg');

},

	create: function() {
		game.state.start('menu');
	}
}
