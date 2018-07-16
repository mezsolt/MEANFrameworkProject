var ng = require('angular');
var ngcookies = require('angular-cookies');
var ngMaterial = require('angular-material');
var ngAnimate = require('angular-animate');
var ngAria = require('angular-aria');
var ngMessages = require('angular-messages');
var dataForm = ng.module('dataForm', [ngcookies,ngMaterial,ngAnimate,ngAria,ngMessages]);

dataForm.controller('salary', ['$scope','$http',
    function($scope,$http){
        console.log('success');
        console.log($scope.country);
        $http.get('http://localhost:3000/country/country').then(function success(response) {
            $scope.countries=response.data;
        });
        $scope.getCities = function() {
            console.log('successGetCititesmethod');
            console.log($scope.country);
            $http.post('http://localhost:3000/country/city', {country:$scope.country}).then(function success(response) {
                console.log('successCitymethod2');
                console.log(response.data[2]);
                console.log($scope.country);
                console.log(response.data);

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
                console.log(cityList);
                $scope.cities = cityList;
            });
        }
    }]);