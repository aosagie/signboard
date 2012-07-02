/*global angular:false, $:false*/
"use strict";

var components = angular.module("signboard.components", []);

components.directive("column", function() {
  return {
    restrict: "E",
    templateUrl: "column-template",
    replace: true,
    link: function(scope, iElement, iAttrs) {

      var $element = $(iElement);

      $element.find(".card-list").disableSelection().sortable({
        connectWith: ".card-list",
        cursor: "move",
        update: function(event, ui) {
          var listDom = $(event.target);
          scope.syncCards(listDom); //Sync model with the updated DOM
        },
        stop: function(event, ui) {
          scope.$apply(); //Apply synced changes to the model
        },
        receive: function(event, ui) {
          //Keeping track of every card's movement history by prepending history entries
          //Keep in mind, the latest element of this history might get inconsistent with the cards a column reports it contains
          var cardId = ui.item.find(".card").data("card-id");
          if (!scope.signboard.cards[cardId].history) {
            scope.signboard.cards[cardId].history = [];
          }
          var historyEntry = {
            type: undefined, //For now, there's only one type, card movement
            date: new Date().getTime(),
            data: {
              columnGroup: ui.item.parents(".column-group").data("group-index"),
              column: ui.item.parents(".column").data("column-index")
            }
          };
          scope.signboard.cards[cardId].history = [historyEntry].concat(scope.signboard.cards[cardId].history);
        }
      });
      $element.find("button.new-card").colorbox({
        inline: true,
        href: $element.find(".card-create-dialog")
      });
      $element.find("button.submit-card").click(function() {
        //$.fn.colorbox.close();
      });

    },
    controller: function($scope) {

      $scope.addCard = function(cardId) {
        if (!$scope.column.cardIds) {
          $scope.column.cardIds = [];
        }
        $scope.column.cardIds.push(cardId);
      };

      $scope.removeCard = function(cardId) {
        for (var i = 0; i < $scope.column.cardIds.length; i++) {
          if ($scope.column.cardIds[i] === cardId) {
            $scope.column.cardIds.splice(i, 1);
          }
        }
      };

      $scope.newCard = function(name, description) {
        if (!name && !description) return;
        //Temp way to gen an id. Doesn't work in <IE9. AJAX a GUID in from the server
        var id = Object.keys($scope.signboard.cards).length + 1;

        $scope.signboard.cards[id] = {
          name: name,
          description: description
        };
        $scope.addCard(id);
      };

      $scope.clearModel = function() {
        $scope.title = "";
        $scope.description = "";
      };

      //Re-populates the column model's array of cardIds based on their ordering in the DOM
      $scope.syncCards = function(domList) {
        $scope.column.cardIds = [];
        domList.find(".card").each(function(index, element) {
          var cardId = $(element).data("card-id");
          $scope.addCard(cardId);
        });
      };

    }
  };
});

components.directive("card", function() {
  return {
    restrict: "E",
    templateUrl: "card-template",
    replace: true,
    controller: function($scope) {

      $scope.toggleCollapsed = function() {
        $scope.collapsed = !$scope.collapsed;
      };

    }
  };
});
