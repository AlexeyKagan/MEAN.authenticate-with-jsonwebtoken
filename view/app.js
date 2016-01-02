angular.module('userApp', //main angular app
    [   'ngAnimate',
        'app.routes',
        'mainCtrl',
        'loginCtrl',
        'signupCtrl',
        'userService',
        'mainPageCtrl'
    ]);


/*    .config(function($httpProvider) {

 // attach our auth interceptor to the http requests
 $httpProvider.interceptors.push('AuthInterceptor');

 });
 */


console.log('app.js');




