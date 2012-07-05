/*global angular:false*/ //Get JSHint to relax error reporting on certain globals
(function() {
'use strict';

var signboard = angular.module('signboard', ['signboard.components', 'signboard.services']);

signboard.controller('BoardCtrl', function ($scope, $location, $log, BoardService) {
  $scope.signboard = {};

  $scope.loadSignboard = function() {
    var queryId = $location.search().id;
    $scope.signboard = BoardService.get({"id": queryId},
      function success() {
      },
      function error() {
        //TODO: signboard = LocalBoardStorage.get ...
      });
  };

  $scope.loadSignboard();
});

signboard.config(function ($interpolateProvider) {
  //Make AnguljarJS use a symbol that doesn't conflict with Jinja2
  $interpolateProvider.startSymbol('{*').endSymbol('*}');
});

}());
