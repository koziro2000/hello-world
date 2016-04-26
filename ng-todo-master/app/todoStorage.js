angular.module('app').service('todoStorage', function ($q) {
    var _this = this;
    this.data = [];

    this.findAll = function(callback) {
        chrome.storage.sync.get('todo', function(keys) {
            if (keys.todo != null) {
                _this.data = keys.todo;
                for (var i=0; i<_this.data.length; i++) {
                    _this.data[i]['id'] = i + 1;
                }
                console.log(_this.data);
                callback(_this.data);
            }
        });
    }

    this.sync = function() {
        chrome.storage.sync.set({todo: this.data}, function() {
            console.log('Data is stored in Chrome storage');
        });
    }

    this.save = function (taskId, newContent, newStartDt, newEndDt, status) {
        //there must be more elegant way to do this but for now this works ....
        var id = this.data.length + 1;
        var todo = undefined;
        if(taskId != undefined && taskId != '') {
            id = taskId;
            
            for(var i = 0; i < this.data.length; i++) {
                if(this.data[i].id == taskId) {
                    this.data[i].content = newContent;
                    this.data[i].startDt = newStartDt;
                    this.data[i].endDt = newEndDt;
                    this.data[i].status = status;
                }
            }
            
        } else {
            todo = {
                id: id,
                content: newContent,
                startDt: newStartDt,
                endDt: newEndDt,
                completed: false,
                createdAt: new Date(),
                status: status
            };
            this.data.push(todo);
        } 
        this.sync();
    }

    
    this.remove = function(todo) {
        this.data.splice(this.data.indexOf(todo), 1);
        this.sync();
    }

    this.removeAll = function() {
        this.data = [];
        this.sync();
    }

});