/**
 * @jsx React.DOM
 */
var React = require('React');
var FormFor = require('../vendor/form-for/form-for.react');
var TodoForm = React.createClass({
  render: function() {
    return (
      <FormFor object={this.props.object} options={this.props.options} errors={this.props.errors} />
    );
  }

});

module.exports = TodoForm;
