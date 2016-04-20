'use strict';

angular.module('app').controller('todoCtrl', function ($scope, todoStorage) {

    $scope.todoStorage = todoStorage;    

    $scope.$watch('todoStorage.data', function() {
        $scope.todoList = $scope.todoStorage.data;
    });

    $scope.todoStorage.findAll(function(data){
        $scope.todoList = data;
        $scope.$apply();
    });

    $scope.save = function() {
        todoStorage.save($scope.newContent, $scope.newContentStartDt, $scope.newContentEndDt);   
        console.log($scope.netContent + ' ' + $scope.newContentStartDt + ' ' +$scope.newContentEndDt);
        $scope.newContent = '';
        $scope.newContentStartDt = '';
        $scope.newContentEndDt = '';
        
    }

    $scope.remove = function(todo) {
        todoStorage.remove(todo);
    }

    $scope.removeAll = function() {
        todoStorage.removeAll();
    }

    $scope.toggleCompleted = function() {
        todoStorage.sync();
    }

});