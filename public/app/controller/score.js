var ScoreController = angular.module('ScoreController', []);

ScoreController.controller('ScoreController', ['$scope', '$location', '$routeParams',
    function ScoreController($scope, $location, $routeParams) {
        $scope.seconds = Math.floor((new Date() - new Date(parseInt($routeParams.startedAt, 10))) / 1000);

        $scope.restart = function () {
            $location.path('/');
        };
    }]
);
