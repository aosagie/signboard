angular.module("SignboardComponents", [])
    .directive("column", function() {
        return {
            restrict: "E",
            templateUrl: "columnTemplate",
            replace: true,
            link: function(scope, iElement, iAttrs) {

                $(iElement).find(".cardList").disableSelection().sortable({
                    connectWith: ".cardList",
                    receive: function(event, ui) { //Handles when the column receives a card from another column
                        var cardId = ui.item.children().data("card-id");

                        scope.$apply(function() {
                            scope.addCard(cardId);
                        });
                    },
                    remove: function(event, ui) { //Handles when the column loses a card to another column
                        var cardId = ui.item.children().data("card-id");

                        scope.$apply(function() {
                            scope.removeCard(cardId);
                        });
                    }
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

            }
        };
    })
    .directive("card", function() {
        return {
            restrict: "E",
            templateUrl: "cardTemplate",
            replace: true,
            controller: function($scope) {

                $scope.toggleCollapsed = function() {
                    $scope.collapsed = !$scope.collapsed;
                };

            }
        };
    });
