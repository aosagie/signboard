angular.module("SignboardComponents", [])
    .directive("column", function() {
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
                $element.find("button").colorbox({
                    inline: true,
                    href: $element.find(".card-dialog")
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
            templateUrl: "card-template",
            replace: true,
            controller: function($scope) {

                $scope.toggleCollapsed = function() {
                    $scope.collapsed = !$scope.collapsed;
                };

            }
        };
    });
