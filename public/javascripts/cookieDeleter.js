var ng = require('angular');
var ngcookies = require('angular-cookies');
var cookieDeleter = ng.module('cookieDelete', [ngcookies]);

cookieDeleter.controller('CookieDel', ['$cookies','$scope',
    function($cookies,$scope){
    $scope.delCookie = function() {
        $cookies.put('emailAddress','lul');
        $cookies.remove('emailAddress');
    }}]);