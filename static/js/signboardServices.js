/*global angular:false, $:false, localStorage:false*/ //Get JSHint to relax error reporting on certain globals
(function() {
'use strict';

var services = angular.module('signboard.services', ['ngResource']);

services.service('BoardService', function ($resource, $location, $log) {
  var Board = $resource('boards/:id'); //RESTful board resource
  //Getting 'id' queryString parameter (i.e. 123 from http://localhost:port/index.html?id=123)
  var queryId = $location.search().id;

  return {
    getFromId: function(id, success, error) {
      if (!id) {
        $log.log('No id specified');
        return;
      }
      var board = Board.get({id: id},
        function () {
          $log.log('Found item ' + id);

          if (success) success();
        },
        function () {
          $log.log('Failed to find item ' + id + ' in the database so attempting to load from local storage.');

          var results;
          if (localStorage[id]) {
            results = JSON.parse(localStorage[id]);
          } else {
            $log.log('No item for ' + id);
          }

          if (error) error(results);
        });
      return board;
    },

    getFromCurrentId: function(success, error) {
      return this.getFromId(queryId, success, error);
    },

    storeToId: function(id, item) {
      if (id) localStorage[id] = JSON.stringify(item);
      else $log.log('Invalid id for storage');
    },

    storeToCurrentId: function(item) {
      this.storeToId(queryId, item);
    },

    removeById: function(id) {
      if (localStorage[id]) localStorage.removeItem(id);
      else $log.log('No item for ' + id);
    }
  };
});

}());
