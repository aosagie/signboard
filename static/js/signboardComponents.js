var components = angular.module("SignboardComponents", []);

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
        //The following methods sync the data model with the updated DOM
        update: function(event, ui) {
          var listDom = $(event.target);
          scope.syncCards(listDom);
        },
        stop: function(event, ui) {
          scope.$apply();
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
