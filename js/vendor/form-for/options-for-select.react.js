/**
 * @jsx React.DOM
 */
var React = require('react');

var OptionForSelect = React.createClass({

  render: function() {
    return (
      <option value={this.props.value}>{this.props.show}</option>
    );
  }

});
module.exports = OptionForSelect;
