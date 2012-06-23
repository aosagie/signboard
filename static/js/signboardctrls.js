function BoardCtrl($scope, $http, $log) {

    $scope.signboard = {};

    $scope.loadSignboard = function() {
        //Loading from the filesystem from now. Using an actual database later.
        $http.get("static/js/signboard.json").success(function(data, status) {
            $scope.signboard = data;
            $log.log("Successfully retrieved signboard data");
        });
    };

    $scope.loadSignboard();

}

function ColumnCtrl($scope) {
}

function CardCtrl($scope) {
}

angular.module('Signboard', [], function ($interpolateProvider) {
    $interpolateProvider.startSymbol("{*").endSymbol("*}"); //Default symbols conflict with Jinja2
});
