var WordsRepository = angular.module('WordsRepository', []);

WordsRepository.factory('WordsRepository', ['$http', '$q', 'HighscoresRepository',
    function ($http, $q, HighscoresRepository) {
        var request = $http.get('app/fixtures/words.json');

        return {
            fetchOne: function () {
                var deferred = $q.defer();

                request.success(function (words) {
                    // not nice
                    for (var i = 0; i < 99999; i++) {
                        var word = words[Math.floor(Math.random() * words.length)];

                        if (HighscoresRepository.fetch(word) < 4) {
                            return deferred.resolve(word);
                        }
                    }

                    alert('You almost finished the game!');
                });

                return deferred.promise;
            },
            fetch: function (limit, filterBy) {
                var deferred = $q.defer();

                request.success(function (words) {
                    words = words.filter(function (word) {
                        return word !== filterBy && word.category === filterBy.category;
                    });

                    var _words = [];

                    while (_words.length < limit) {
                        var word = words[Math.floor(Math.random() * words.length)];

                        if (_words.indexOf(word) === -1) {
                            _words.push(word);
                        }
                    }

                    deferred.resolve(_words);
                });

                return deferred.promise;
            }
        };
    }
]);