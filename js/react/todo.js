/**
 * @jsx React.DOM
 */

var Todo = React.createClass({displayName: 'Todo',
  render: function() {
    return (
      React.DOM.div({className: "todo"}, this.props.todo.title)
    );
  }

});
