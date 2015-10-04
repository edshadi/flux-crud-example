/**
 * @jsx React.DOM
 */
var React = require('react');
var TodoForm = require('./todo-form');
var TodoStore = require('../stores/todo-store');
var Todo = React.createClass({
  getInitialState: function() {
    return {
      editing: false
    };
  },
  componentDidMount: function() {
    TodoStore.addChangeEvent(function(data) {
      if(this.isMounted()) this.setState({ editing: false });
    }.bind(this))
  },
  render: function() {
    return (
      <div className="todo">
        {this.state.editing ? this.renderForm() : this.renderTodo()}
        <span><a href="#" onClick={this.editTodo}>Edit | </a></span>
        <span><a href="#" onClick={this.deleteTodo}>Delete</a></span>
      </div>
    );
  },
  renderTodo: function() {
    return(<div className='todo-item'>{this.props.todo.title}</div>);
  },
  renderForm: function() {
    var options = {
      onSubmit: this.props.handleEdit
    };
    return(<TodoForm object={this.props.todo} options={options} errors={this.props.errors} />);
  },
  editTodo: function() {
    if(this.isMounted()) this.setState({ editing: true });
  },
  deleteTodo: function() {
    this.props.handleDelete(this.props.todo.id);
  }

});

module.exports = Todo;
