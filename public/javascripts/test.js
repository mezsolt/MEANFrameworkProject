var ng = require('angular');
var flapper = ng.module('flapperNews', []);

flapper.controller('MainCtrl', [
    '$scope',
    function($scope){
        $scope.test = 'Hello world!';
    }]);