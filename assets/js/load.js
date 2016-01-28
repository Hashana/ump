var loadState = {

  preload: function(){
    //game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
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
