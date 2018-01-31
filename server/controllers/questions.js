var mongoose = require("mongoose");
var Question = mongoose.model("Question");

module.exports = {
  index: function(req, res){
    Question.find({}, function(err, questions){
      if(err){
        console.log(err);
        res.json(err);
      } else {
        res.json(questions);
      }
    })
  },
  create: function(req, res){
    var question = new Question(req.body);
    question.save(function(err){
      if(err){
        console.log(err);
        res.json(err);
      } else {
        console.log("question saved");
        res.send("question saved");
      }
    })
  },
}
