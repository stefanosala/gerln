var WordsRepository = angular.module('WordsRepository', []);

WordsRepository.factory('WordsRepository', ['$http', '$q',
    function ($http, $q) {
        var request = $http.get('app/fixtures/words.json');

        return {
            fetchOne: function () {
                var deferred = $q.defer();

                request.success(function (words) {
                    deferred.resolve(words[Math.floor(Math.random() * words.length)]);
                });

                return deferred.promise;
            },
            fetch: function (limit, filterBy) {
                var deferred = $q.defer();

                request.success(function (words) {
                    var _words = [];

                    while (_words.length < limit) {
                        var newWord = words[Math.floor(Math.random() * words.length)];

                        if (newWord !== filterBy && _words.indexOf(newWord) === -1) {
                            _words.push(newWord);
                        }
                    }

                    deferred.resolve(_words);
                });

                return deferred.promise;
            }
        };
    }
]);