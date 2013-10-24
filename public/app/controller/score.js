var ScoreController = angular.module('ScoreController', []);

ScoreController.controller('ScoreController', ['$scope', '$location', '$routeParams', 'HighscoresRepository',
    function ScoreController($scope, $location, $routeParams, HighscoresRepository) {
        $scope.seconds = Math.floor((new Date() - new Date(parseInt($routeParams.startedAt, 10))) / 1000);

        $scope.highscores = HighscoresRepository.ranking(5);

        $scope.restart = function () {
            $location.path('/');
        };

        $scope.clear = function () {
            HighscoresRepository.clear();

            $location.path('/');
        };
    }]
);
