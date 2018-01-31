app.factory('gameFactory', ['$http', function($http) {
  var factory = {};
  factory.index = function(callback) {
    $http.get('/games').then(function(games){
      callback(games.data);
    });
  }, // check comma
  factory.create = function(results, callback) {
    $http.post('/games', results).then(function(){
      callback();
    });
  }
  return factory;
}]);
