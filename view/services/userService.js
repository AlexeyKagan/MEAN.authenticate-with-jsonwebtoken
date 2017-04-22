angular.module('userService', [])
    .factory('User', function ($http, $q, AuthToken) {
        const userFactory = {};

        userFactory.signupCreate = (name, username, password) =>
          $http.post('/api/signup', {
                name: name,
                username: username,
                password: password
          });

        userFactory.DoLogin = (username, password) =>
          $http.post('/api/login', {
                username: username,
                password: password
          });

        userFactory.doLogout = () => AuthToken.setToken();

        userFactory.isLoggedIn = () => AuthToken.getToken();

        return userFactory;
    })
    .factory('AuthToken', function ($window) {
        const authTokenFactory = {};
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
