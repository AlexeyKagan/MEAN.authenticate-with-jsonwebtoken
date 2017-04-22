/**
 * Created by Tiko on 30.12.2015.
 */

angular.module('mainPageCtrl', ['userService'])
  .controller('mainPageController', function ($rootScope, $location, User) {
    const vm = this;
    if (!User.isLoggedIn()) $location.path('/');
  });
