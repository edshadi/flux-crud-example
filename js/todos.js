/**
 * @jsx React.DOM
 */
var Todos = React.createClass({displayName: 'Todos',
  getInitialState: function() {
    return {
      todos: [],
      errors: []
    };
  },
  componentDidMount: function() {
    TodoStore.addChangeEvent(function() {
      this.setState({ todos: TodoStore.todos() })
    }.bind(this));
    TodoStore.all();
  },
  render: function() {
    return (
      React.DOM.div({className: "todos"}, 
        this.renderForm(), 
        this.renderTodos()
      )
    );
  },
  renderTodos: function() {
    var todos = [];
    this.state.todos.forEach(function(todo) {
      todos.push(Todo({key: todo.id, todo: todo}));
    });
    return todos;
  },
  renderForm: function() {
    var object = TodoStore.new();
    var options = {
      onSubmit: this.handleSubmit
    };
    return(TodoForm({object: object, options: options, errors: this.state.errors}));
  },
  handleSubmit: function(data) {
    debugger
    TodoActions.createTodo(data);
  }
});