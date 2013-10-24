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
            }
        };
    }
]);