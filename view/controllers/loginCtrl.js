angular.module('loginCtrl', ['userService'])
    .controller('loginController', function ($location,User,AuthToken) {
        var vm = this;

        vm.doLogin = function () {
            console.log('asd');
            User.DoLogin(vm.username,vm.password)
                .success(function(data){
                    vm.message = data.message;

                    if (data.token){

                        AuthToken.setToken(data.token);
                        $location.path('/mainpage');
                        return data;
                    }






                });

        };



    });
console.log('loginController');
