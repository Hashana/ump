var bootState = {
  create: function(){
    // enable physics
    game.physics.startSystem(Phaser.Physics.Arcade);
    // start load state
    game.state.start('load');
  }

};
