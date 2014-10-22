/**
 * @jsx React.DOM
 */

var Todo = React.createClass({displayName: 'Todo',
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
      React.DOM.div({className: "todo"}, 
        this.state.editing ? this.renderForm() : this.renderTodo(), 
        React.DOM.span(null, React.DOM.a({href: "#", onClick: this.editTodo}, "Edit")), 
        React.DOM.span(null, React.DOM.a({href: "#", onClick: this.deleteTodo}, "Delete"))
      )
    );
  },
  renderTodo: function() {
    return(React.DOM.div({className: "todo-item"}, this.props.todo.title));
  },
  renderForm: function() {
    var options = {
      onSubmit: this.props.handleEdit
    };
    return(TodoForm({object: this.props.todo, options: options, errors: this.props.errors}));
  },
  editTodo: function() {
    this.setState({ editing: true });
  },
  deleteTodo: function() {
    this.props.handleDelete(this.props.todo.id);
  }

});
