angular.module('userApp', [
  'ngAnimate',
  'app.routes',
  'mainCtrl',
  'loginCtrl',
  'signupCtrl',
  'userService',
  'mainPageCtrl'
]).config(($httpProvider) => $httpProvider.interceptors.push('AuthInterceptor'));



