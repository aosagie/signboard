angular.module("SignboardComponents", [])
    .directive("column", function() {
        return {
            restrict: "E",
            templateUrl: "columnTemplate",
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
            replace: true,
            controller: function($scope) {

                $scope.toggleCollapsed = function() {
                    $scope.collapsed = !$scope.collapsed;
                };

            }
        };
    });
