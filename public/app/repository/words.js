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
                    words = words.filter(function (word) {
                        return word !== filterBy && word.category === filterBy.category;
                    });

                    var _words = [];

                    while (_words.length < limit) {
                        _words.push(words[Math.floor(Math.random() * words.length)]);
                    }

                    deferred.resolve(_words);
                });

                return deferred.promise;
            }
        };
    }
]);