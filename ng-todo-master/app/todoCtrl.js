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
        var status = 'open';
        
        if (($scope.taskId !== undefined) && ($scope.taskId != '')) {
            status = 'pause';
        }
        
        
        
        todoStorage.save($scope.taskId, $scope.newContent, $scope.newContentStartDt, $scope.newContentEndDt, status);
        $scope.newContent = '';
        $scope.newContentStartDt = '';
        $scope.newContentEndDt = '';
        $scope.taskId = '';
        $scope.status = '';
    }

    $scope.remove = function(todo) {
        todoStorage.remove(todo);
    }

    $scope.removeAll = function() {
        todoStorage.removeAll();
    }

    $scope.toggleCompleted = function(todo) {
        todo.status = 'completed';
        todo.completed = 'true';
        todoStorage.sync();
    }
    
    $scope.edit = function(todo) {
        $scope.taskId = todo.id;
        $scope.newContent = todo.content;
        $scope.newContentStartDt = todo.startDt;
        $scope.newContentEndDt = todo.endDt;
        
    }
    
    $scope.startTask = function(todo) {
        //This is to change status to stared!
        todo.status='start';
        todo.completed = 'false';
        todoStorage.sync();
    }
    
    $scope.pauseTask = function(todo) {
        todo.status='pause';
        todo.completed = 'false';
        todoStorage.sync();
    }

});

