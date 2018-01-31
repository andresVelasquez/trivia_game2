app.factory('questionFactory', ['$http', function($http) {
  var factory = {};
  factory.index = function(callback) {
    $http.get('/questions').then(function(questions){
      callback(questions.data);
    });
  },
  factory.create = function(question, callback) {
    $http.post('/questions', question).then(function(returned_data){
      callback(returned_data.data);
    });
  }
  return factory;
}]);
