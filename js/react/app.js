/**
 * @jsx React.DOM
 */
var React = require('react');
var Todos = require('./todos');
window.onload = function() {
  React.render(<Todos />, document.body);
}
