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
      todos.push(<Todo key={todo.id} todo={todo} />);
    });
    return todos;
  },
  renderForm: function() {
    var object = TodoStore.new();
    var options = {};
    return(<TodoForm object={object} options={options} errors={this.state.errors} />);
  }
});
