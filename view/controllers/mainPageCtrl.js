/**
 * Created by Tiko on 30.12.2015.
 */

angular.module('mainPageCtrl', ['userService'])
    .controller('mainPageController', function($rootScope,$location,User,AuthToken){
        var vm = this;


        //if (!AuthToken.getToken()) $location.path('/');
        if (!User.isLoggedIn()) $location.path('/');




    });
