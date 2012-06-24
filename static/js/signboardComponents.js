angular.module("SignboardComponents", [])
    .directive("columnGroup", function() {
        return {
            restrict: "E",
            templateUrl: "columnGroupTemplate",
            scope: {
                model: "=",
                cards: "="
            },
            replace: true,
            controller: function($scope) {
            }
        };
    })
    .directive("card", function() {
        return {
            restrict: "E",
            templateUrl: "cardTemplate",
            scope: {
                model: "="
            },
            replace: true,
            controller: function($scope) {

                $scope.toggleCollapsed = function() {
                    $scope.collapsed = !$scope.collapsed;
                };

            },
            link: function(scope, element, attrs) {
                $(element).closest(".cardList").sortable().disableSelection();
            }
        };
    });
