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
  return {
    getFromId: function(id) {
      if (id) {
        if (localStorage[id]) return JSON.parse(localStorage[id]);
        $log.log("No item for " + id);
      } else {
        $log.log("No id specified");
      }
      return undefined;
    },

    storeToId: function(id, item) {
      if (id) localStorage[id] = JSON.stringify(item);
      else $log.log("Invalid id for storage");
    },

    removeById: function(id) {
      if (localStorage[id]) localStorage.removeItem(id);
      else $log.log("No item for " + id);
    }
  };
});

}());
