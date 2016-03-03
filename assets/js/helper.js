
function PickUpMessage(string){
  var pickUpMessage = string;
  var pickUPStyle = { font: 'bold 32px Acme', fill: '#000'};
  var pickUpText = game.add.text( 200,  100, pickUpMessage, pickUPStyle);
  pickUpText.fixedToCamera = true;
  game.add.tween(pickUpText).to({alpha: 0}, 2300, Phaser.Easing.Linear.None, true);
}

function UpdateCollision(player, layer, diamonds, fires, platforms){
  game.physics.arcade.collide(player, layer);
  game.physics.arcade.collide(diamonds, layer);
  game.physics.arcade.collide(fires, layer);

}

function EducationalInfo(information){
  var info_style = {font: 'bold 30px Acme', fill: '#000'}
  var text1 = this.game.add.text(300 , 100 , information, info_style);
  text1.anchor.setTo(0.5, 0.5);
  text1.fixedToCamera = true;
  infoTween = game.add.tween(text1).to({alpha: 0}, 5900, Phaser.Easing.Linear.None, true);
}
