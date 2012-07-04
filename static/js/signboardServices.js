/*global angular:false, $:false, localStorage:false*/ //Get JSHint to relax error reporting on certain globals
(function() {
"use strict";

var services = angular.module("signboard.services", ["ngResource"]);

services.factory("BoardService", function ($resource, $location, $log) {
  //RESTful board resource
  var Board = $resource("boards/:id");
  //Getting 'id' queryString parameter (i.e. 123 from http://localhost:port/index.html?id=123)
  var queryId = $location.search().id;

  return {
    getFromId: function(id) {
      if (!id) {
        $log.log("No id specified");
        return;
      }
      var board = Board.get({id: id},
        function () {
          $log.log("Found item " + id);
        },
        function () {
          $log.log("Failed to find item " + id + " in the database so attempting to load from local storage.");

          if (localStorage[id]) {
            board = JSON.parse(localStorage[id]);
          } else {
            $log.log("No item for " + id);
          }
        });
      return board;
    },

    getFromCurrentId: function() {
      return this.getFromId(queryId);
    },

    storeToId: function(id, item) {
      if (id) localStorage[id] = JSON.stringify(item);
      else $log.log("Invalid id for storage");
    },

    storeToCurrentId: function(item) {
      this.storeToId(queryId, item);
    },

    removeById: function(id) {
      if (localStorage[id]) localStorage.removeItem(id);
      else $log.log("No item for " + id);
    }
  };
});

}());
