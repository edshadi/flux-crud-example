/**
 * @jsx React.DOM
 */

var Todo = React.createClass({
  render: function() {
    return (
      <div className='todo'>{this.props.todo.title}</div>
    );
  }

});
