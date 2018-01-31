app.factory('playerFactory', ['$http', function($http) {
  var factory = {};
  factory.create = function(player, callback) {
    $http.post('/players/new', player).then(function(returned_data){
      callback(returned_data.data);
    });
  }
  return factory;
}]);
