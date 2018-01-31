var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/client"));
app.use(express.static(__dirname + "/bower_components"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // required to jsonp objects passed with POST. platform doesn't mention this. thanks for nothing!

require("./server/config/mongoose.js") // start DB before setting routes because routes requires controllers which try to load models which won't be available if DB is not started!
require("./server/config/routes.js")(app);

app.listen(8000, function() {
  console.log("listening on port 8000");
})
