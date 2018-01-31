var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new mongoose.Schema({
  _player: {type: Schema.Types.ObjectId, ref: "Player"},
  correct: Number, total: Number
}, {timestamps: true});

mongoose.model('Game', GameSchema);
