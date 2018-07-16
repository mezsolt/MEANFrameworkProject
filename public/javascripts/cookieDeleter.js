var ng = require('angular');
var ngcookies = require('angular-cookies');
var ngMaterial = require('angular-material');
var ngAnimate = require('angular-animate');
var ngAria = require('angular-aria');
var ngMessages = require('angular-messages');
var cookieDeleter = ng.module('cookieDelete', [ngcookies,ngMaterial,ngAnimate,ngAria,ngMessages]);

cookieDeleter.controller('CookieDel', ['$cookies','$scope',
    function($cookies,$scope){
        $scope.delCookie = function() {
            console.log('COOOKIEDELEETEEEEEEEEEEEEEEE');
            $cookies.put('emailAddress','lul');
            $cookies.remove('emailAddress');
        }}]);

cookieDeleter.controller('whiteFrameCtrl',['$scope',
    function ($scope) {

    }]);

cookieDeleter.controller('inputCtrl',['$scope',
    function ($scope) {

    }]);