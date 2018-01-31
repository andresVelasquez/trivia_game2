app.controller('logoutController', ['$cookies', '$location', function($cookies, $location) {
  $cookies.remove("player"); // this removes the player key set in dashboard so if other pages check for it and don't find it, they redirect to dashboard which pops up new login window
  $cookies.remove("player_id");
  $cookies.remove("correct");
  $cookies.remove("total");
  $location.url("/");
}]);
