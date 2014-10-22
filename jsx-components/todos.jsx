/**
 * @jsx React.DOM
 */
var Todos = React.createClass({
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
      <div className="todos">
        {this.renderForm()}
        {this.renderTodos()}
      </div>
    );
  },
  renderTodos: function() {
    var todos = [];
    this.state.todos.forEach(function(todo) {
      todos.push(<Todo key={todo.id} todo={todo} errors={this.state.errors} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />);
    }.bind(this));
    return todos;
  },
  renderForm: function() {
    var object = TodoStore.new();
    var options = {
      onSubmit: this.handleSubmit
    };
    return(<TodoForm object={object} options={options} errors={this.state.errors} />);
  },
  handleSubmit: function(data) {
    TodoActions.createTodo(data);
  },
  handleEdit: function(data) {
    TodoActions.updateTodo(data);
  },
  handleDelete: function(id) {
    TodoActions.destroyTodo(id);
  }
});
