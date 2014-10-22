/**
 * @jsx React.DOM
 */

var TodoForm = React.createClass({displayName: 'TodoForm',
  render: function() {
    return (
      FormFor({object: this.props.object, options: this.props.options, errors: this.props.errors})
    );
  }

});
