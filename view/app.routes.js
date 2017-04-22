angular.module('app.routes', ['ngRoute']) //angular routes
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/pages/home.html'
            })
            .when('/login', {
                templateUrl: '/pages/login.html',
                controller: 'loginController',
                controllerAs: 'login'
            })
            .when('/signup', {
                templateUrl: '/pages/signup.html',
                controller: 'signupController',
                controllerAs: 'signup'
            })
            .when('/mainpage', {
                templateUrl: '/pages/mainPage.html',
                controller: 'mainPageController',
                controllerAs: 'mainPage'
            })
            .otherwise('/');

        $locationProvider.html5Mode(true);
    });
