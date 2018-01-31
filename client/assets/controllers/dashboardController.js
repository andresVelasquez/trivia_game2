app.controller('dashboardController', ['$scope', '$cookies', 'gameFactory', 'playerFactory', '$location', 'ngDialog', function($scope, $cookies, gameFactory, playerFactory, $location, ngDialog) {
  if(!$cookies.get("player")){
    $scope.loggedIn = {};
    $scope.player = {};
    $scope.loggedIn = false;
    ngDialog.open({ template: 'loginPopup', className: 'ngdialog-theme-default', scope: $scope , showClose: false, closeByDocument: false});
  } else {
    $scope.loggedIn = true;
    $scope.player = {};
    $scope.player.name = $cookies.get("player");
    if($cookies.get("correct")){
      $scope.gameExists = true;
      $scope.player.correct = $cookies.get("correct");
      $scope.player.total = $cookies.get("total");
    }
  }
  gameFactory.index(function(games){
    if(!games){
      return;
    }
    $scope.games = games;
    for(var game in games){
      $scope.games[game].percent = +(($scope.games[game].correct / $scope.games[game].total).toFixed(4)) * 100; // add percentages to game objects dynamically
    }
    $scope.games.map(function(game){ // deleting the _id, createdAt and updatedAt keys from the games array since the searchText will match against them if i don't. need to learth to make custom filters!!
      delete game._id; // map just iteates through the array passing in each game object as game into the function which deletes the keys i want deleted. CUSTOM FILTER LATER!!
      delete game.createdAt;
      delete game.updatedAt;
    });
  })
  $scope.login = function(callback){ // callback is optional and only used when this is called from the $scope.play function
    playerFactory.create($scope.player, function(returned_data){
      if(returned_data.errmsg){
        alert(returned_data.errmsg);
        return;
      }
      $scope.player.name = returned_data.name;
      $cookies.put("player", returned_data.name); // this sets a player key with the inputted player name as the value in cookies
      $cookies.put("player_id", returned_data._id);
      $scope.loggedIn = true;
      if($cookies.get("correct")){
        $scope.gameExists = true;
        $scope.player.correct = $cookies.get("correct");
        $scope.player.total = $cookies.get("total");
      }
      if(callback){ // checks if a callback function was passed and runs it if one was passed
        callback();
      }
    })
  }
  $scope.playButton = function() {
    if($cookies.get("player")){
      $location.url("/play");
    } else {
      ngDialog.open({ template: 'playPopup', className: 'ngdialog-theme-default', scope: $scope , showClose: false, closeByDocument: false});
    }
  }
  $scope.play = function() {
    $scope.login(function(){ // supplying callback function to $scope.login so it waits for login to finish before going to the game
      $location.url("/play");
    });
  }
}]);
