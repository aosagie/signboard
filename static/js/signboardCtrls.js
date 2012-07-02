/*global angular:false*/
"use strict";

function BoardCtrl($scope, $http, $log, SignboardService) {

  $scope.signboard = {};

  $scope.loadSignboard = function() {
    //Loading from the filesystem from now. Using SQLite later.
    $http.get("static/js/signboard.json").success(function(data, status) {
      $scope.signboard = data;
      $log.log("Successfully retrieved signboard data");
    });
  };

  $scope.loadSignboard();

}

angular.module('Signboard', ["signboard.components", "signboard.services"], function ($interpolateProvider) {
  //Replace old symbol because default symbols conflict with Jinja2
  $interpolateProvider.startSymbol("{*").endSymbol("*}");
});
