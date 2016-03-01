
function PickUpMessage(string){
  var pickUpMessage = string;
  var pickUPStyle = { font: 'bold 32px Acme', fill: '#000'};
  var pickUpText = game.add.text( 200,  100, pickUpMessage, pickUPStyle);
  pickUpText.fixedToCamera = true;
  game.add.tween(pickUpText).to({alpha: 0}, 2300, Phaser.Easing.Linear.None, true);
}

function UpdateCollision(player, layer, diamonds, fires){
  game.physics.arcade.collide(player, layer);
  game.physics.arcade.collide(diamonds, layer);
  game.physics.arcade.collide(fires, layer);
}
