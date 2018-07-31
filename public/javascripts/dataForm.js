var ng = require('angular');
var ngcookies = require('angular-cookies');
var ngMaterial = require('angular-material');
var ngAnimate = require('angular-animate');
var ngAria = require('angular-aria');
var ngMessages = require('angular-messages');
var dataForm = ng.module('dataForm', [ngcookies,ngMaterial,ngAnimate,ngAria,ngMessages]);

dataForm.controller('salary', ['$scope','$http',
    function($scope,$http){
        $scope.showAlert = true;
        var cookieAccept = false;
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
            if(cookieAccept != false) {
                $http.post('http://localhost:3000/country/data', {sex:$scope.sex,age:$scope.age,
                    country:$scope.country,city:$scope.city,salary:$scope.salary});
            } else {
                $scope.showAlert = true;
            }
        }
        $scope.cookieAccepted = function () {
            $scope.showAlert = false;
            cookieAccept = true;
        }
    }]);