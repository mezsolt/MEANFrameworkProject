var ng = require('angular');
var ngMaterial = require('angular-material');
var ngAnimate = require('angular-animate');
var ngAria = require('angular-aria');
var ngMessages = require('angular-messages');
var ngRoute = require('angular-route');
var ngCookies = require('angular-cookies');
//var routeModule = ng.module('routeModule', [ngRoute,ngMaterial,ngAnimate,ngAria,ngMessages]);

(function(angular) {
    'use strict';
    angular.module('ngRouteExample', ['ngRoute',ngCookies,ngMaterial,ngAnimate,ngAria,ngMessages])

        .controller('MainController', function($scope,$http,$cookies, $route, $routeParams, $location,$timeout, $q, $log) {
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
            $scope.emailWarning = false;

            function validateEmail(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }

            if($cookies.get('cookieAccepted') === 'true') {
                $scope.showAlert = false;
            } else {
                $scope.showAlert = true;
            }
            $scope.sendEmail = function () {
                console.log("sendemail main " + $cookies.get('cookieAccepted'));
                if($cookies.get('cookieAccepted') === 'true') {
                    if($scope.email != undefined ) {
                        if(validateEmail($scope.email)) {
                            console.log($scope.email);
                            $http.post('http://localhost:3000/country/email', {email:$scope.email});
                            $location.url('/emailty');
                        } else {
                            $scope.emailWarning = true;
                        }
                    } else {
                        console.log($scope.email);
                        $scope.emailWarning = true;
                    }

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

        .controller('dataController',function ($scope,$http,$cookies,$log,$timeout,$q, $route, $routeParams, $location) {
            $scope.cityEnabled = false;
            $scope.roleEnabled = false;
            $scope.formEnabled = true;

            $scope.warning = false;
            $scope.message = false;

            $scope.cityTooltip = true;
            $scope.roleTooltip = true;

            var self = this;

            self.simulateQuery = false;
            self.isDisabledRole = true;
            self.isDisabledOccupation = false;
            // list of `state` value/display objects
            self.querySearchRole   = querySearchRole;
            self.querySearchOccupation = querySearchOccupation;
            self.selectedItemChangeRole = selectedItemChangeRole;
            self.searchTextChangeRole   = searchTextChangeRole;
            self.selectedItemChangeOccupation = selectedItemChangeOccupation;
            self.searchTextChangeOccupation   = searchTextChangeOccupation;
            self.newRole = newRole;
            self.newOccupation = newOccupation;

            function querySearchRole(query) {
                var results = query ? $scope.roles.filter( createFilterFor(query) ) : $scope.roles,
                    deferred;
                return results;
            }

            function querySearchOccupation(query) {
                var results = query ? $scope.occupationList.filter( createFilterFor(query) ) : $scope.occupationList,
                    deferred;
                return results;
            }

            function newRole(state) {
                alert("Sorry! You'll need to create a Constitution for " + state + " first!");
            }

            function newOccupation(state) {
                alert("Sorry! You'll need to create a Constitution for " + state + " first!");
            }

            function searchTextChangeRole(text) {
                $log.info('Text changed to ' + text);
            }

            function selectedItemChangeRole(item) {
                $log.info('Item changed to ' + JSON.stringify(item));
            }

            function searchTextChangeOccupation(text) {
                $log.info('Text changed to ' + text);
                if(text==='') {
                    self.searchTextRole = '';
                    self.selectedItemRole = '';
                    self.isDisabledRole = true;
                    $scope.roleTooltip = true;
                }
                //$scope.getRoles();
            }

            function selectedItemChangeOccupation(item) {
                /*var list = $scope.occupations;
                console.log(list);
                for(var i=0;i<list.length;i++) {
                    console.log(list[i]);
                    if(item.display === list[i]) {*/
                $http.post('http://localhost:3000/country/role', {occupation:item.display}).then(function success(response) {
                    self.searchTextRole = "";
                    self.isDisabledRole = false;
                    $scope.roles = convertJsonToValueDisplayFormat(response.data);
                });
                   /* }
                }*/
                console.log($scope.roleTooltip);
                $scope.roleTooltip = false;
                console.log($scope.roleTooltip);
                $log.info('Item changed to ' + JSON.stringify(item));
            }

            function convertJsonToValueDisplayFormat(cucc) {
                var string = '';
                for(var i=0;i<cucc.length;i++) {
                    if(i == cucc.length-1) {
                        string = string + cucc[i];
                    } else {
                        string = string + cucc[i] +',, ';
                    }
                }
                console.log(string);

                return string.split(/,, +/g).map( function (listElem) {
                    return {
                        value: listElem.toLowerCase(),
                        display: listElem
                    };
                });
            }

            function createFilterFor(query) {
                var lowercaseQuery = query.toLowerCase();

                return function filterFn(string) {
                    return (string.value.indexOf(lowercaseQuery) >= 0);
                };

            }

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

            $http.get('http://localhost:3000/country/occupation').then(function success(response) {
                $scope.occupations=response.data;
                $scope.occupationList = convertJsonToValueDisplayFormat(response.data);
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
                    $scope.city = "";
                    $scope.cities = cityList;
                    $scope.cityEnabled = true;
                    $scope.cityTooltip = false;
                    return cityList;
                });
            }

            /*$scope.getRoles = function() {
                $http.post('http://localhost:3000/country/role', {occupation:$scope.occupation}).then(function success(response) {
                    $scope.roles = response.data;
                    $scope.roles = convertJsonToValueDisplayFormat(response.data);
                });
            }*/

            $scope.sendDataToDB = function () {
                if($scope.sex === undefined || $scope.age === undefined || $scope.country === undefined || $scope.city === undefined ||
                    $scope.educationalAttainment === undefined || $scope.experience === undefined || self.selectedItemOccupation.display === undefined
                    || self.selectedItemRole.display === undefined || $scope.salary === undefined) {
                    $scope.message = false;
                    $scope.warning = true;
                    console.log('form validation error' + $scope.educationalAttainment + $scope.experience + $scope.sex + $scope.age + $scope.country +$scope.city+$scope.salary+self.selectedItemRole.display+self.selectedItemOccupation.display+$scope.salary);
                } else {
                    console.log('else if');
                    console.log($scope.sex);
                    if($cookies.get('cookieAccepted') === 'true') {
                        $http.post('http://localhost:3000/country/data', {sex:$scope.sex,age:$scope.age,
                            country:$scope.country,city:$scope.city,educationalAttainment:$scope.educationalAttainment,
                            experience:$scope.experience,occupation:self.selectedItemOccupation.display,
                            role:self.selectedItemRole.display,salary:$scope.salary});
                        $scope.warning = false;
                        $scope.formEnabled = false;
                        $scope.message = true;
                    } else {
                        $scope.showAlert = true;
                    }
                }

            }
        })

        .config(function($routeProvider, $locationProvider,$mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('green')
                .accentPalette('green');
            $routeProvider
                .when('/', {
                    templateUrl: '/probaemail.html',
                    controller: 'emailController'
                })
                /*.when('/probaemail', {
                    redirectTo:'/'
                })*/
                .when('/probaemail', {
                    templateUrl: '/probaemail.html',
                    controller: 'emailController',
                })
                .when('/probaform', {
                    templateUrl: '/probaform.html',
                    controller: 'dataController'
                })
                .when('/emailty', {
                    templateUrl: '/emailty.html'
                    //controller: 'dataController'
                })
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true);
        });
})(window.angular);