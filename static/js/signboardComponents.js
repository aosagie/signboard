angular.module("SignboardComponents", [])
    .directive("column", function() {
        return {
            restrict: "E",
            templateUrl: "columnTemplate",
            replace: true,
            link: function(scope, iElement, iAttrs) {

                $(iElement).find(".cardList").disableSelection().sortable({
                    connectWith: ".cardList",
                    //The following methods are concerned with syncing the data models with updated changes from the GUI
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
                    },
                    stop: function(event, ui) { //Handles when re-ordering of cards in a column has been completed
                        scope.$apply(function() {
                            scope.syncCards(ui);
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

                $scope.syncCards = function(ui) {
                    var cardList = ui.item.parent();

                    $scope.column.cardIds = [];
                    cardList.find(".card").each(function(index, element) {
                        var cardId = $(element).data("card-id");
                        $scope.column.cardIds.push(cardId);
                    });
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
