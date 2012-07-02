/*global angular:false, $:false, localStorage:false*/
(function() {
"use strict";

var services = angular.module("signboard.services", []);

services.factory("SignboardService", function ($location, $log) {
  var prefix = "signboard_";
  var queryId = $location.search().id;

  return {
    get: function(id) {
      if (!id) {
        $log.log("No id specified");
      } else {
        var fullId = prefix+id;
        if (localStorage[fullId]) return JSON.parse(localStorage[fullId]);
        $log.log("No item for " + fullId);
      }
      return undefined;
    },

    getFromCurrentId: function() {
      return this.get(queryId);
    },

    store: function(id, item) {
      if (id) localStorage[prefix+id] = JSON.stringify(item);
      else $log.log("Invalid id for storage");
    },

    storeToCurrentId: function(item) {
      this.store(queryId, item);
    },

    remove: function(id) {
      var fullId = prefix+id;
      if (localStorage[fullId]) localStorage.removeItem(fullId);
      else $log.log("No item for " + fullId);
    }
  };
});

}());
