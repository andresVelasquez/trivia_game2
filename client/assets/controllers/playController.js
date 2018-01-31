app.controller('playController', ['$scope', '$cookies', 'questionFactory', '$location', 'gameFactory', function($scope, $cookies, questionFactory, $location, gameFactory) {
  if(!$cookies.get("player")){ // this checks if player is logged in by looking for the player key in cookie which is destroyed with logout controller
    console.log("no player cookie found");
    $location.url("/");
  } else {
    $scope.player = {};
    $scope.player.name = $cookies.get("player");
  }
  questionFactory.index(function(questions){
    shuffle(questions); // pass received questions array to shuffle() method to shuffle them on each controller load BEFORE assigning to $scope!!
    $scope.questions = questions.slice(0, 3); // just take the first 3 questions of the shuffled question array for the game
  })
  $scope.check = function() {
    var results = {_player: $cookies.get("player_id"), correct: 0, total: $scope.questions.length};
    for(question in $scope.questions){
      var given =  $scope.questions[question].given;
      if(!given){
        alert("All Questions Must Be Answered!");
        return;
      }
      var actual =  $scope.questions[question].answer;
      if(given == actual){
        results.correct++;
      }
    }
    gameFactory.create(results, function(){
      $cookies.put("correct", results.correct); // this sets a player key with the inputted player name as the value in cookies
      $cookies.put("total", results.total); // this sets a player key with the inputted player name as the value in cookies
      $location.url("/");
    })
  }
  function shuffle(arr) { // this function will shuffle the array of questions so they appear in random order
    var j, x, i;
    for (i = arr.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = arr[i - 1];
      arr[i - 1] = arr[j];
      arr[j] = x;
    }
  }
}]);
