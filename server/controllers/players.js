var mongoose = require("mongoose");
var Player = mongoose.model("Player");

module.exports = {
  create: function(req, res){
    Player.find({"lowerName": req.body.name.toLowerCase()}, function(err, player){
      if(err){
        console.log(err);
        res.json(err);
      } else if(player != ""){
          res.json(player[0]); // query returns array of found objects. since it should only be one found with that name, i return object at [0]
        } else {
        var newPlayer = new Player(req.body);
        newPlayer.lowerName = req.body.name.toLowerCase();
        newPlayer.save(function(err, player){ // saving returns just the object so no need to worry about index like above query does
          if(err) {
            console.log(err);
            res.json(err);
          } else {
            console.log("player saved");
            res.json(player);
          }
        })
      }
    })
  },
}
