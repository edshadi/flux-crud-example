/**
 * @jsx React.DOM
 */
var Todos = React.createClass({displayName: 'Todos',
  getInitialState: function() {
    return {
      todos: []
    };
  },
  componentDidMount: function() {
    TodoStore.addChangeEvent(function() {
      this.setState({ todos: TodoStore.todos() })
    }.bind(this));
  },
  render: function() {
    return (
      React.DOM.div(null, this.renderTodos())
    );
  },
  renderTodos: function() {
    var todos = [];
    this.state.todos.forEach(function(todo) {
      todos.push(Todo({todo: todo}));
    });
    return todos;
  }
});
