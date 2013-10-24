var gerln = angular.module('gerln', [
    'ngRoute',
    'MainController',
    'ScoreController',
    'WordsRepository',
    'HighscoresRepository'
]);

gerln.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'app/partials/main.html',
            controller: 'MainController'
        })
        .when('/score/:startedAt', {
            templateUrl: 'app/partials/score.html',
            controller: 'ScoreController'
        })
        .otherwise({
            redirectTo: '/'
        });
    }]
);