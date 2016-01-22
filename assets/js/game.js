var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

var player;
var platforms;
var cursors;
var stars;
var score = 0;
var scoreText;

// Set up game states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('gameOver', gameOverState)
game.state.add('win', winState)

game.state.start('boot');
