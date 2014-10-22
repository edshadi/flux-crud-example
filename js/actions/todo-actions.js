var TodoActions = {
  createTodo: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.CREATE_TODO,
      data: data
    });
  },
  updateTodo: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.UPDATE_TODO,
      data: data
    });
  },
  makeTodoCurrent: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.CURRENT_TODO,
      data: data
    });
  },
  destroyTodo: function(id) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.DESTROY_TODO,
      id: id
    });
  }
}
