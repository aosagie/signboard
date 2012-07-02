/*global angular:false*/
(function() {
"use strict";

var signboard = angular.module('signboard', ["signboard.components", "signboard.services"]);

signboard.controller("BoardCtrl", function ($scope, $http, $log, SignboardService) {
  $scope.signboard = {};

  $scope.loadSignboard = function() {
    //Loading from the filesystem from now. Using SQLite later.
    $http.get("static/js/signboard.json").success(function(data, status) {
      $scope.signboard = data;
      $log.log("Successfully retrieved signboard data");
    });
  };

  $scope.loadSignboard();
});

signboard.config(function ($interpolateProvider) {
  //Replace old symbol because default symbols conflict with Jinja2
  $interpolateProvider.startSymbol("{*").endSymbol("*}");
});

}());
