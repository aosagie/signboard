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

angular.module('Signboard', ["SignboardComponents"], function ($interpolateProvider) {
    //Replace old symbol because default symbols conflict with Jinja2
    $interpolateProvider.startSymbol("{*").endSymbol("*}");
});
