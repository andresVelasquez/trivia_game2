var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  lowerName: {type: String}, // added lower case name field to do case insensitive searches because mongodb doesn't seem to have it built in
  games: [{type: Schema.Types.ObjectId, ref: "Game"}]
}, {timestamps: true});

mongoose.model('Player', PlayerSchema);
