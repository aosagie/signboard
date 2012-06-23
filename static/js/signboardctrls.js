function BoardCtrl($scope) {
}

function ColumnCtrl($scope) {
}

function TaskCtrl($scope) {
}

angular.module('Signboard', [], function ($interpolateProvider) {
    $interpolateProvider.startSymbol("{*");
    $interpolateProvider.endSymbol("*}");
});
