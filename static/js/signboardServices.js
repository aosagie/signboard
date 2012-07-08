/*global angular:false, $:false, localStorage:false*/ //Get JSHint to relax error reporting on certain globals
(function() {
'use strict';

var services = angular.module('signboard.services', ['ngResource']);

services.factory('BoardResource', function ($resource) {
  return $resource('boards/:id', {}, {
    save: {
      method: 'PUT' //save defaults to POST but shouldn't a VERB on a specific id be an idempotent PUT?
    }
  });
});

services.factory('LocalBoardService', function ($log) {
  return {
    getById: function(id) {
      if (id) {
        if (localStorage[id]) return JSON.parse(localStorage[id]);
        $log.log('No localStorage item for ' + id);
      } else {
        $log.log('No localStorage id specified');
      }
    },

    saveById: function(id, item) {
      if (id) localStorage[id] = JSON.stringify(item);
      else $log.log('No localStorage id specified');
    },

    removeById: function(id) {
      if (localStorage[id]) localStorage.removeItem(id);
      else $log.log('No localStorage item for ' + id);
    }
  };
});

}());
