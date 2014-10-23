/**
 * @jsx React.DOM
 */
var React = require('react');

var Input = require('./input.react');
var FormErrors = require('./form-errors.react');
module.exports = FormFor = React.createClass({
  render: function() {
    if(Object.keys(this.props.object).length === 0) return(<div />);
    return (
      <form onSubmit={this.handleSubmit}>
        <FormErrors errors={this.props.errors} />
        {this.inputs()}
        <input type="submit"  value={this.submitText()} className="btn btn-default"/>
      </form>
    );
  },
  inputs: function() {
    var object = this.props.object;
    var inputs = [];
    Object.keys(object).forEach(function(key, i) {
      var value = object[key];
      var dataForInput = {value: value, name: key}
      var options = this.options()[key] || {};
      inputs.push(<Input key={key} ref={key} data={dataForInput} options={options}/>);
    }.bind(this));
    return inputs;
  },
  options: function() {
    return this.props.options || {};
  },
  submitText: function() {
    var submit = this.options().submit;
    if(submit && submit.value) return submit.value
    submit = this.props.object.id ? 'Update' : 'Create';
    if(this.options().name) submit = submit + ' ' + this.options().name;
    return submit;
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var submitHandler = this.options().onSubmit
    if(submitHandler) {
      var data = {};
      Object.keys(this.refs).forEach(function(ref) {
        var value = this.getInputValue(ref);
        data[ref] = value;
      }.bind(this))
      console.log(data)
      submitHandler(data);
    }
  },
  getInputValue: function(ref) {
    // find the ref component
    // find the refs of the found component
    // find the input ref from the found component
    // get the getDOMNode and the value
    if(this.refs[ref] && this.refs[ref].refs && this.refs[ref].refs.input && this.refs[ref].refs.input.getDOMNode) {
      var input = this.refs[ref].refs.input.getDOMNode();
      if(input.type === "checkbox") return input.checked;
      return input.value;
    }
  }

});

module.exports = FormFor;
