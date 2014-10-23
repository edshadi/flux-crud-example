/**
 * @jsx React.DOM
 */
var React = require('react');

var CheckboxInput = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <input ref={data.name} type="checkbox" defaultChecked={data.defaultChecked} className={data.className} value={data.value} />
    );
  }

});

module.exports = CheckboxInput;
