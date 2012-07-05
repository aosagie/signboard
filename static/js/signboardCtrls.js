/*global angular:false*/ //Get JSHint to relax error reporting on certain globals
(function() {
'use strict';

var signboard = angular.module('signboard', ['signboard.components', 'signboard.services']);

signboard.controller('BoardCtrl', function ($scope, $location, $log, BoardResource, LocalBoardService) {
  $scope.signboard = {};

  $scope.loadSignboard = function() {
    var queryId = $location.search().id;

    if (queryId) {
      //Attempt to RESTfully get a board. If that fails then load it from localStorage
      //localStorage's board may be completely inconsistent with the server's
      $scope.signboard = BoardResource.get({'id': queryId},
        function success() {
        },
        function error() {
          $log.log('Could not GET the board from the server. Saving to localStorage.');
          $scope.signboard = LocalBoardService.getById(queryId);
        });
    } else {
      $log.log('No id specified');
    }
  };

  $scope.loadSignboard();
});

signboard.config(function ($interpolateProvider) {
  //Make AnguljarJS use a symbol that doesn't conflict with Jinja2
  $interpolateProvider.startSymbol('{*').endSymbol('*}');
});

}());
