/**
 * @jsx React.DOM
 */
var React = require('react');
var Todo = require('./todo');
var TodoForm = require('./todo-form');
var TodoActions = require('../actions/todo-actions');
var TodoStore = require('../stores/todo-store');
var renderCount = 0;
var Todos = React.createClass({
  getInitialState: function() {
    return {
      todos: [],
      errors: []
    };
  },
  componentDidMount: function() {
    TodoStore.addChangeEvent(function() {
      console.log("change happened on the store, I'm updating my state");
      if(this.isMounted()) this.setState({ todos: TodoStore.todos() })
    }.bind(this));
    TodoStore.all();
  },
  render: function() {
    console.log("render " + ++renderCount);
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
    console.log("I'm calling the action");
    TodoActions.createTodo(data);
  },
  handleEdit: function(data) {
    TodoActions.updateTodo(data);
  },
  handleDelete: function(id) {
    TodoActions.destroyTodo(id);
  }
});

module.exports = Todos;
