var loadState = {

  preload: function(){
		game.load.image('sky', 'assets/images/sky.png');
		game.load.image('ground', 'assets/images/platform.png');
		game.load.image('diamond', 'assets/images/diamond.png');
    game.load.image('fire', 'assets/images/fire.png' );
    game.load.spritesheet('dude', 'assets/images/dude.png', 32,48);
    game.load.spritesheet('explosion', 'assets/images/explosion.png', 60,80);

	},

	create: function() {
		game.state.start('menu');
	}
}
