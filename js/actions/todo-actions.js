var TodoDispatcher = require('../dispatchers/todo-dispatcher');
var TodoConstants = require('../constants/todo-constants');
var TodoActions = {
  createTodo: function(data) {
    TodoDispatcher.handleViewAction({
      type: TodoConstants.ActionTypes.CREATE_TODO,
      data: data
    });
  },
  updateTodo: function(data) {
    TodoDispatcher.handleViewAction({
      type: TodoConstants.ActionTypes.UPDATE_TODO,
      data: data
    });
  },
  destroyTodo: function(id) {
    TodoDispatcher.handleViewAction({
      type: TodoConstants.ActionTypes.DESTROY_TODO,
      id: id
    });
  }
}

module.exports = TodoActions;
