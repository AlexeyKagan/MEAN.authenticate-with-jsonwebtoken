angular.module('loginCtrl', ['userService'])
  .controller('loginController', function ($location, User, AuthToken) {
    const vm = this;

    vm.doLogin = function () {
      User.DoLogin(vm.username, vm.password)
        .success(function (data) {
          vm.message = data.message;

          if (data.token) {
            AuthToken.setToken(data.token);
            $location.path('/mainpage');
            return data;
          }
        });
    };
  });

