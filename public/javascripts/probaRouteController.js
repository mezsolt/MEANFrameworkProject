var ng = require('angular');
var ngMaterial = require('angular-material');
var ngAnimate = require('angular-animate');
var ngAria = require('angular-aria');
var ngMessages = require('angular-messages');
var ngRoute = require('angular-route');
var ngCookies = require('angular-cookies');
var routeModule = ng.module('routeModule', [ngRoute,ngMaterial,ngAnimate,ngAria,ngMessages]);


(function(angular) {
    'use strict';
    angular.module('ngRouteExample', ['ngRoute',ngCookies,ngMaterial,ngAnimate,ngAria,ngMessages])

        .controller('MainController', function($scope,$http,$cookies, $route, $routeParams, $location) {
            if($cookies.get('cookieAccepted') === 'true') {
                $scope.showAlert = false;
            } else {
                $scope.showAlert = true;
            }
            $scope.$route = $route;
            $scope.$location = $location;
            $scope.$routeParams = $routeParams;
            $scope.cookieAccepted = function () {
                $scope.showAlert = false;
                $cookies.put('cookieAccepted', 'true');
            }
            $scope.goToEmail = function() {
                if($cookies.get('cookieAccepted') === 'true') {
                    $location.path('/probaemail');
                } else {
                    $scope.showAlert = true;
                }

            }
            $scope.goToForm = function() {
                if($cookies.get('cookieAccepted') === 'true') {
                    $location.path('/probaform');
                } else {
                    $scope.showAlert = true;
                }
            }
        })
        .controller('emailController',function ($scope,$http,$cookies, $route, $routeParams, $location) {
            if($cookies.get('cookieAccepted') === 'true') {
                $scope.showAlert = false;
            } else {
                $scope.showAlert = true;
            }
            $scope.sendEmail = function () {
                console.log("sendemail main " + $cookies.get('cookieAccepted'));
                if($cookies.get('cookieAccepted') === 'true') {
                    console.log("sendemail if ");
                    $http.post('http://localhost:3000/country/email', {email:$scope.email});
                } else {
                    console.log("sendemail else");
                    $scope.showAlert = true;
                }
            }
            $scope.cookieAccepted = function () {
                $scope.showAlert = false;
                $cookies.put('cookieAccepted', 'true');
            }
        })

        .controller('dataController',function ($scope,$http,$cookies, $route, $routeParams, $location) {
            if($cookies.get('cookieAccepted') === 'true') {
                $scope.showAlert = false;
            } else {
                $scope.showAlert = true;
            }
            $scope.cookieAccepted = function () {
                $scope.showAlert = false;
                $cookies.put('cookieAccepted', 'true');
            }
            $http.get('http://localhost:3000/country/country').then(function success(response) {
                $scope.countries=response.data;
            });
            $scope.getCities = function() {

                $http.post('http://localhost:3000/country/city', {country:$scope.country}).then(function success(response) {
                    var cityList = [];

                    for(var i=0;i<response.data.length;i++) {
                        var exists = false;
                        for(var j=0;j<cityList.length;j++) {
                            if(cityList[j] === response.data[i]) {
                                exists = true;
                            }
                        }
                        if(exists === false) {
                            cityList.push(response.data[i]);
                        }
                    }
                    $scope.cities = cityList;
                });
            }
            $scope.sendDataToDB = function () {
                if($cookies.get('cookieAccepted') === 'true') {
                    $http.post('http://localhost:3000/country/data', {sex:$scope.sex,age:$scope.age,
                        country:$scope.country,city:$scope.city,salary:$scope.salary});
                } else {
                    $scope.showAlert = true;
                }
            }
        })

        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/probaemail', {
                    redirectTo:'/'
                })
                .when('/probaemail', {
                    templateUrl: '/probaemail.html',
                    controller: 'emailController',
                })
                .when('/probaform', {
                    templateUrl: '/probaform.html',
                    controller: 'dataController'
                })
                .otherwise({
                    redirectTo: '/'
                });

            // configure html5 to get links working on jsfiddle
            $locationProvider.html5Mode(true);
        });
})(window.angular);