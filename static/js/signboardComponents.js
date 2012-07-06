/*global angular:false, $:false*/ //Get JSHint to relax error reporting on certain globals
(function() {
'use strict';

var components = angular.module('signboard.components', []);

components.directive('column', function() {
  return {
    restrict: 'E',
    templateUrl: 'column-template',
    replace: true,
    link: function(scope, iElement, iAttrs) {

      var $element = $(iElement);

      $element.find('.card-list').disableSelection().sortable({
        connectWith: '.card-list',
        cursor: 'move',
        update: function(event, ui) {
          var listDom = $(event.target);
          scope.syncCards(listDom); //Sync model with the updated DOM
        },
        stop: function(event, ui) {
          scope.$apply(); //Apply synced changes to the model
          scope.storeToCurrentId();
        },
        receive: function(event, ui) {
          //Keeping track of every card's movement history by prepending history entries
          //Keep in mind, the latest element of this history might get inconsistent with the cards a column reports it contains
          var cardId = ui.item.find('.card').data('card-id');
          if (!scope.signboard.cards[cardId].history) {
            scope.signboard.cards[cardId].history = [];
          }
          var historyEntry = {
            type: undefined, //For now, there's only one type, card movement
            time: new Date().getTime(),
            data: {
              columnGroup: ui.item.parents('.column-group').data('group-index'),
              column: ui.item.parents('.column').data('column-index')
            }
          };
          scope.signboard.cards[cardId].history = [historyEntry].concat(scope.signboard.cards[cardId].history);
        }
      });
      $element.find('button.new-card').colorbox({
        inline: true,
        href: $element.find('.card-create-dialog')
      });
      $element.find('button.submit-card').click(function() {
        $.fn.colorbox.close();
      });

    },
    controller: function($scope, $location, $log, BoardResource, LocalBoardService) {
      var queryId = $location.search().id || 1; //TODO: remove this default value

      $scope.addCard = function(cardId, store) {
        if (!$scope.column.cardIds) {
          $scope.column.cardIds = [];
        }
        $scope.column.cardIds.push(cardId);

        if (store) {
          $scope.storeToCurrentId();
        }
      };

      $scope.removeCard = function(cardId, store) {
        for (var i = 0; i < $scope.column.cardIds.length; i++) {
          if ($scope.column.cardIds[i] === cardId) {
            $scope.column.cardIds.splice(i, 1);
          }
        }

        if (store) {
          $scope.storeToCurrentId();
        }
      };

      $scope.newCard = function(name, description) {
        if (!name && !description) return;
        //TODO: This is a temp way to gen an id. Doesn't work in <IE9. AJAX a GUID in from the server
        var id = Object.keys($scope.signboard.cards).length + 1;

        $scope.signboard.cards[id] = {
          name: name,
          description: description
        };
        $scope.addCard(id, true);
      };

      $scope.clearModel = function() {
        $scope.title = '';
        $scope.description = '';
      };

      //Re-populates the column model's array of cardIds based on their ordering in the DOM
      $scope.syncCards = function(domList) {
        $scope.column.cardIds = [];
        domList.find('.card').each(function(index, element) {
          var cardId = $(element).data('card-id');
          $scope.addCard(cardId);
        });
      };

      $scope.storeToCurrentId = function() {
        if (queryId) {
          BoardResource.save({'id': queryId}, $scope.signboard,
            function success() {
            },
            function error() {
              $log.log('Could not PUT the board on the server. Saving to localStorage.');
              LocalBoardService.saveById(queryId, $scope.signboard);
            });
        } else {
          $log.log("No id specified");
        }
      };

    }
  };
});

components.directive('card', function() {
  return {
    restrict: 'E',
    templateUrl: 'card-template',
    replace: true,
    controller: function($scope) {

      $scope.toggleCollapsed = function() {
        $scope.collapsed = !$scope.collapsed;
      };

    }
  };
});

components.directive('flowchart', function() {
  return {
    restrict: 'E',
    //templateUrl: 'flowchart-template',
    replace: true,
    link: function(scope, iElement, iAttrs) {
      //TODO: use d3 to implement a flow chart of card movement
    }
  };
});

}());
