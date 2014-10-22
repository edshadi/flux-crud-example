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

  },
  render: function() {
    return (
      React.DOM.div(null, "hello")
    );
  }
});
