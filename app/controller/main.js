var MainController = angular.module('MainController', []);

MainController.controller('MainController', ['$scope', 'WordsRepository', '$location',
    function MainController($scope, WordsRepository, $location) {
        if ($scope.score === undefined) {
            $scope.score = 0;
            $scope.startedAt = new Date();
        }

        WordsRepository.fetchOne()
            .then(function (word) {
                $scope.word = word;

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
            }

            if ($scope.score < 10) {
                MainController($scope, WordsRepository, $location);
            } else {
                $location.path('/score/' + $scope.startedAt.getTime());
            }
        };
    }]
);
