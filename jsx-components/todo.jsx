/**
 * @jsx React.DOM
 */

var Todo = React.createClass({
  getInitialState: function() {
    return {
      editing: false
    };
  },
  componentDidMount: function() {
    TodoStore.addChangeEvent(function() {
      this.setState({ editing: false });
    }.bind(this))
  },
  render: function() {
    return (
      <div className="todo">
        {this.state.editing ? this.renderForm() : this.renderTodo()}
        <span><a href="#" onClick={this.editTodo}>Edit</a></span>
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
    this.setState({ editing: true });
  }

});
