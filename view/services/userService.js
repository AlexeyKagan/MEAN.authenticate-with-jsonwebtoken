angular.module('userService', []) //factory for everything

    .factory('User', function ($http, $q, AuthToken) {
        var userFactory = {};

        userFactory.signupCreate = function (name, username, password) {
            return $http.post('/api/signup', {
                name: name,
                username: username,
                password: password
            });
        };

        userFactory.DoLogin = function (username, password) {
            return $http.post('/api/login', {
                username: username,
                password: password
            });
        };
        userFactory.doLogout = function () {
            AuthToken.setToken();

        };
        userFactory.isLoggedIn = function () {
            if (AuthToken.getToken()) {
                return true;
            }
            else
                return false;
        };



        return userFactory;

    })

    .factory('AuthToken', function ($window) {
        var authTokenFactory = {};
        //get token from localstorage
        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        };

        //set token or delete from localstorage
        authTokenFactory.setToken = function (token) {
            if (token)
                $window.localStorage.setItem('token', token);
            else
                $window.localStorage.removeItem('token');
        };

        return authTokenFactory;


    });



console.log('userService');
