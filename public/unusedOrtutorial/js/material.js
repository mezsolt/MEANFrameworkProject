var ng = require('angular');
var ngMaterial = require('angular-material');
var ngAnimate = require('angular-animate');
var ngAria = require('angular-aria');
var ngMessages = require('angular-messages');
var material = ng.module('materialModule', [ngMaterial,ngAnimate,ngAria,ngMessages]);

material.controller('materialCtrl', ['$scope','$mdBottomSheet',
    function($scope,$mdBottomSheet){
    //$scope.mat= function() {
        console.log('MAAAAAAAAAAAAAAAAAAAAAAAT');
        $scope.openBottomSheet = function() {
            console.log('SHOOOOOOOOOOOOOOOOOOOOOOW');
            $mdBottomSheet.show({
                template: '<md-bottom-sheet>Learn <b>Angular Material</b> @ TutorialsPoint.com!</md-bottom-sheet>'
            });
            $scope.currentNavItem = 'page1';

            $scope.goto = function(page) {
                console.log("Goto " + page);
            }
        }}]);