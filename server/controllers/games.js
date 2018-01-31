var mongoose = require("mongoose");
var Game = mongoose.model("Game");
var Player = mongoose.model("Player"); // need this one here to because I need it when I pouplate the games with Players

module.exports = {
  index: function(req, res){
    Game.find().populate({path: "_player", model: Player}).exec(function(err, games){ // find all games and populate the _player attribute with the player objects they refer to
      if(err){
        console.log(err);
        res.json(err);
      } else {
        res.json(games);
      }
    });
  },
  create: function(req, res){
    var newGame = new Game(req.body);
    newGame.save(function(err, game){
      if(err) {
        console.log(err);
        res.json(err);
      } else {
        Player.findById(req.body._player, function(err, player){
          if(err){
            console.log(err);
          } else {
            player.games.push(game);
            player.save();
            console.log("game saved and pushed into player's object");
            res.send("OK");
          }
        });
      }
    });
  },
};
