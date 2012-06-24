angular.module("SignboardComponents", [])
    .directive("columnGroup", function() {
        return {
            restrict: "E",
            templateUrl: "columnGroupTemplate",
            scope: {
                model: "=",
                cards: "="
            },
            replace: true
        };
    })
    .directive("column", function() {
        return {
            restrict: "E",
            templateUrl: "columnTemplate",
            scope: {
                model: "=",
                cards: "="
            },
            replace: true,
            link: function(scope, element, attrs) {
                $(element).find(".cardList").disableSelection().sortable({
                    connectWith: ".cardList"
                });
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
                //$(element).closest(".cardList").disableSelection().sortable({
                    //connectWith: ".cardList"
                //});
            }
        };
    });
