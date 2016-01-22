var bootState = {
  create: function(){
    // enable physics
    game.physics.startSystem(Phaser.Physics.Arcade);

    game.state.start('load');
  }

};
