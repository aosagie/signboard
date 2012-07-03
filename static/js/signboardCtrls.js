/*global angular:false*/ //Get JSHint to relax error reporting on certain globals
(function() {
"use strict";

var signboard = angular.module('signboard', ["signboard.components", "signboard.services"]);

signboard.controller("BoardCtrl", function ($scope, $http, $log, SignboardService) {
  $scope.signboard = {};

  $scope.loadSignboard = function() {
    var signboard = SignboardService.getFromCurrentId();

    if (signboard) {
      $scope.signboard = signboard;
    }
    //TODO: get rid of the following bootstrapping from the file system
    else {
      $http.get("static/js/signboard.json").success(function(data, status) {
        $log.log("Bootstrapping signboard data from the file system");
        $scope.signboard = data;
      });
    }
  };

  $scope.loadSignboard();
});

signboard.config(function ($interpolateProvider) {
  //Replace old symbol because default symbols conflict with Jinja2
  $interpolateProvider.startSymbol("{*").endSymbol("*}");
});

}());
