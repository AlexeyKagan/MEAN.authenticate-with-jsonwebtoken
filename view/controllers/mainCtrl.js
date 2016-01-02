angular.module('mainCtrl', ['userService'])
    .controller('mainController', function ($rootScope, $location, User) {
        var vm = this;
/*
        vm.loggedIn = User.isLoggedIn();

        $rootScope.$on('$routeChangeStart', function() {
            vm.loggedIn = User.isLoggedIn();

            // get user information on page load
            User.getUser()
                .then(function(data) {
                    vm.user = data.data;
                });
        });

*/


    });

console.log('mainController');

