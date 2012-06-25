angular.module("SignboardComponents", [])
    .directive("column", function() {
        return {
            restrict: "E",
            templateUrl: "columnTemplate",
            replace: true,
            link: function(scope, iElement, iAttrs) {

                $(iElement).find(".cardList").disableSelection().sortable({
                    connectWith: ".cardList",
                    cursor: "move",
                    //The following methods sync the data model with the updated DOM
                    update: function(event, ui) {
                        var domList = $(event.target);
                        scope.syncCards(domList);
                    },
                    stop: function(event, ui) {
                        scope.$apply();
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

                //Re-populates the column model's array of cardIds based on their ordering in the div
                $scope.syncCards = function(domList) {
                    $scope.column.cardIds = [];
                    domList.find(".card").each(function(index, element) {
                        var cardId = $(element).data("card-id");
                        $scope.addCard(cardId);
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
