var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngDialog']);
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "/partials/dashboard.html",
      controller: "dashboardController"
    })
    .when("/new_question", {
      templateUrl: "/partials/new_question.html",
      controller: "new_questionController"
    })
    .when("/play", {
      templateUrl: "/partials/play.html",
      controller: "playController"
    })
    .when("/logout", {
      template: "", // had to use template here instead of templateUrl since i did not want to use a partial with this and templateUrl would just get stuck at a blank page
      controller: "logoutController"
    })
});
