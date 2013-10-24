var HighscoresRepository = angular.module('HighscoresRepository', []);

HighscoresRepository.factory('HighscoresRepository', [
    function () {
        return {
            fetch: function (word) {
                var highscore = localStorage.getItem(word.german);

                return parseInt(highscore ? highscore : 0, 10);
            },
            up: function (word) {
                var highscore = this.fetch(word);

                localStorage.setItem(word.german, highscore + 1);
            },
            down: function (word) {
                var highscore = this.fetch(word);

                if (highscore > 0) {
                    localStorage.setItem(word.german, highscore - 1);
                }
            },
            ranking: function (limit) {
                var words = [];

                for (var key in localStorage) {
                    words.push({
                        word: key,
                        value: parseInt(localStorage.getItem(key), 10)
                    });
                }

                return words.sort(function (a, b) {
                    if (a.value === b.value) {
                        return 0;
                    }

                    return a.value > b.value ? -1 : 1;
                }).slice(0, limit);
            },
            clear: function () {
                localStorage.clear();
            }
        };
    }
]);