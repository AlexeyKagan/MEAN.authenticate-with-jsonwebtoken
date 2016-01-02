angular.module('signupCtrl', ['userService'])
    .controller('signupController', function ($location,User, AuthToken) {
        var vm = this;

        vm.signup = function () {

            User.signupCreate(vm.name, vm.username, vm.password)
                .success(function (data) {
                    //message
                    vm.message = data.message;
                    if (data.token) {
                        AuthToken.setToken(data.token);
                        $location.path('/mainpage');
                    }
                })

        }

    });

console.log('singupController');