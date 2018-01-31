app.controller('new_questionController', ['$scope', 'questionFactory', '$location', function($scope, questionFactory, $location) {
  $scope.create = function() {
    if($scope.newQuestion && $scope.newQuestion.answer && $scope.newQuestion.fake1 && $scope.newQuestion.fake2 && $scope.newQuestion.question && ($scope.newQuestion.answer == $scope.newQuestion.fake1 || $scope.newQuestion.answer == $scope.newQuestion.fake2 || $scope.newQuestion.fake1 == $scope.newQuestion.fake2)){
      alert("Duplicate answers given. Each answer must be unique.");
      return;
    }
    questionFactory.create($scope.newQuestion, function(returned_data) {
      if(!returned_data.errors){
        alert("Question Added Successfully!");
        $location.url("/");
      } else {
        var errors = [];
        for(var error in returned_data.errors){
          errors.push(returned_data.errors[error].message);
        }
        alert(errors);
      }
    });
  };
  $scope.cancel = function() {
    $location.url('/');
  }
}]);
