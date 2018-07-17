var ng = require('angular');
var ngMaterial = require('angular-material');
var ngAnimate = require('angular-animate');
var ngAria = require('angular-aria');
var ngMessages = require('angular-messages');
var emailForm = ng.module('emailForm', [ngMaterial,ngAnimate,ngAria,ngMessages]);

emailForm.controller('emailFormCtrl', ['$scope','$http',
    function($scope,$http){
    $scope.showAlert = true;
    var cookieAccept = false;
    $scope.sendEmail = function () {
        if(cookieAccept != false) {
            $http.post('http://localhost:3000/country/email', {email:$scope.email});
        } else {
            $scope.showAlert = true;
        }

    }
    $scope.cookieAccepted = function () {
        $scope.showAlert = false;
        cookieAccept = true;
    }
}]);