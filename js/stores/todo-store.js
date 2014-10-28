var TodoDispatcher = require('../dispatchers/todo-dispatcher');
var TodoConstants = require('../constants/todo-constants');
var bean = require('bean');

var TodoStore = (function() {
  var _todos = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
  var ActionTypes = TodoConstants.ActionTypes;
  return {
    todos: function() {
      return _todos;
    },
    new: function() {
      return {
        id: null,
        title: null
      }
    },
    all: function() {
      this.triggerChange();
    },
    create: function(todo) {
      console.log("creating a todo");
      todo.id = _todos.length + 1;
      _todos.push(todo);
      this.triggerChange(todo);
    },
    update: function(todo) {
      var index = this.find(todo.id);
      todo.id = parseInt(todo.id);
      if(index === undefined) return this.triggerFailToTakeAction();
      _todos[index] = todo;
      this.triggerChange();
    },
    destroy: function(id) {
      var index = this.find(id);
      if(index === undefined) return this.triggerFailToTakeAction();
      _todos.splice(index, 1);
      this.triggerChange();
    },

    find: function(id) {
      var id = parseInt(id);
      var found = undefined;
      _todos.some(function(todo, i) {
        if(todo.id === id) found = i;
      });
      return found;
    },
    addChangeEvent: function(callback) {
      bean.on(this, CHANGE_EVENT, callback);
    },
    removeChangeEvent: function(obj) {
      bean.off(this, CHANGE_EVENT, obj);
    },
    addFailToTakeAction: function(callback) {
      bean.on(this, FAIL_TO_CREATE_EVENT, callback);
    },
    removeFailToTakeAction: function(obj) {
      bean.off(this, FAIL_TO_CREATE_EVENT, obj);
    },
    triggerFailToTakeAction: function(data) {
      bean.fire(this, FAIL_TO_CREATE_EVENT, data);
    },
    triggerChange: function(data) {
      console.log("store updated todos, I'm triggering change");
      bean.fire(this, CHANGE_EVENT, data);
    },
    payload: function(payload) {
      var action = payload.action;
      switch(action.type) {
        case ActionTypes.CREATE_TODO:
          console.log("received action from the dispatcher");
          this.create(action.data);
          break;
        case ActionTypes.UPDATE_TODO:
          this.update(action.data);
          break;
        case ActionTypes.DESTROY_TODO:
          this.destroy(action.id);
          break;
        default:
          // do nothing
      }
    }
  }
}())

TodoDispatcher.register(TodoStore.payload.bind(TodoStore));

module.exports = TodoStore;
