var MainController = angular.module('MainController', []);

MainController.controller('MainController', ['$scope', 'WordsRepository', 'HighscoresRepository', '$location', '$timeout',
    function MainController($scope, WordsRepository, HighscoresRepository, $location, $timeout) {
        if ($scope.score === undefined) {
            $scope.score = 0;
            $scope.startedAt = new Date();
            $scope.seconds = 0;

            $scope.secondsUpdate = function() {
                $scope.seconds = Math.floor((new Date() - $scope.startedAt) / 1000);

                $timeout($scope.secondsUpdate, 500);
            };

            $scope.secondsUpdate();
        }

        WordsRepository.fetchOne()
            .then(function (word) {
                $scope.word = word;
                $scope.highscore = HighscoresRepository.fetch(word);

                return word;
            }).then(function (word) {
                WordsRepository.fetch(2, word)
                    .then(function (words) {
                        words.push(word);

                        $scope.otherWords = words.shuffle();
                    });
            });


        $scope.submit = function (index) {
            if ($scope.otherWords[index] === $scope.word) {
                $scope.score += 1;
                $scope.result = 'gut';

                HighscoresRepository.up($scope.word);
            } else {
                $scope.score = $scope.score > 0 ? $scope.score - 1 : 0;
                $scope.result = 'nein';

                HighscoresRepository.down($scope.word);
            }

            if ($scope.score < 10) {
                MainController($scope, WordsRepository, HighscoresRepository, $location, $timeout);
            } else {
                $location.path('/score/' + $scope.startedAt.getTime());
            }
        };
    }]
);