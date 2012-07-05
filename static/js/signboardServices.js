/*global angular:false, $:false, localStorage:false*/ //Get JSHint to relax error reporting on certain globals
(function() {
'use strict';

var services = angular.module('signboard.services', ['ngResource']);

services.factory('BoardService', function ($resource) {
  return $resource('boards/:id', {}, {
    save: {
      method: 'PUT'
    }
  });
});

services.factory('LocalBoardService', function ($log) {
  return { //TODO: get the old local storage from the repo
  };
});

}());
