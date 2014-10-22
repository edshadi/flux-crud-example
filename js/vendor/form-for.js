(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var Input = require('./input.react');
var FormErrors = require('./form-errors.react');
var SubmitInput = require('./submit-input.react');
module.exports = FormFor = React.createClass({displayName: 'FormFor',
  render: function() {
    if(Object.keys(this.props.object).length === 0) return(React.DOM.div(null));
    return (
      React.DOM.form({onSubmit: this.handleSubmit}, 
        FormErrors({errors: this.props.errors}), 
        this.inputs(), 
        SubmitInput({ref: "input", data: {value: this.submitText(), className: "btn btn-default"}})
      )
    );
  },
  inputs: function() {
    var object = this.props.object;
    var inputs = [];
    Object.keys(object).forEach(function(key, i) {
      var value = object[key];
      var dataForInput = {value: value, name: key}
      var options = this.options()[key] || {};
      inputs.push(Input({key: key, ref: key, data: dataForInput, options: options}));
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

},{"./form-errors.react":7,"./input.react":9,"./submit-input.react":14}],2:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var CheckboxInput = React.createClass({displayName: 'CheckboxInput',
  render: function() {
    var data = this.props.data;
    return (
      React.DOM.input({ref: data.name, type: "checkbox", defaultChecked: data.defaultChecked, className: data.className, value: data.value})
    );
  }

});

module.exports = CheckboxInput;

},{}],3:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var ColorInput = React.createClass({displayName: 'ColorInput',
  render: function() {
    var data = this.props.data;
    return (
      React.DOM.input({ref: data.name, name: data.name, type: "color", defaultValue: data.defaultValue, className: data.className})
    );
  }

});

module.exports = ColorInput;

},{}],4:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var DateInput = React.createClass({displayName: 'DateInput',
  render: function() {
    var data = this.props.data;
    return (
      React.DOM.input({ref: data.name, type: "date", defaultValue: data.defaultValue, placeholder: data.placeholder, className: data.className})
    );
  }

});

module.exports = DateInput;

},{}],5:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var DatetimeInput = React.createClass({displayName: 'DatetimeInput',
  render: function() {
    var data = this.props.data;
    return (
      React.DOM.input({ref: data.name, type: "datetime", defaultValue: data.defaultValue, className: data.className})
    );
  }

});

module.exports = DatetimeInput;

},{}],6:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var EmailInput = React.createClass({displayName: 'EmailInput',
  render: function() {
    var data = this.props.data;
    return (
      React.DOM.input({ref: data.name, type: "email", defaultValue: data.defaultValue, placeholder: data.placeholder, className: data.className})
    );
  }

});

module.exports = EmailInput;

},{}],7:[function(require,module,exports){
/**
 * @jsx React.DOM
 */


var FormErrors = React.createClass({displayName: 'FormErrors',
  render: function() {
    var errors = [];
    this.props.errors.forEach(function(err) {
      errors.push(React.DOM.li(null, err))
    })
    return (
      React.DOM.ul({className: "form-errors"}, errors)
    );
  }
});

module.exports = FormErrors;

},{}],8:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var HiddenInput = React.createClass({displayName: 'HiddenInput',
  render: function() {
    var data = this.props.data;
    return (
      React.DOM.input({ref: data.name, type: "hidden", value: data.value, className: data.className})
    );
  }

});
module.exports = HiddenInput;

},{}],9:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var TextInput = require('./text-input.react');
var CheckboxInput = require('./checkbox-input.react');
var NumberInput = require('./number-input.react');
var HiddenInput = require('./hidden-input.react');
var SelectInput = require('./select-input.react');
var PasswordInput = require('./password-input.react');
var TextareaInput = require('./textarea-input.react');
var DateInput = require('./date-input.react');
var ColorInput = require('./color-input.react');
var DatetimeInput = require('./datetime-input.react');
var EmailInput = require('./email-input.react');
var SubmitInput = require('./submit-input.react');

var Input = React.createClass({displayName: 'Input',
  render: function() {
    var data = this.props.data;
    return (
      React.DOM.div(null, 
        React.DOM.div({className: "form-group"}, 
          this.input()
        )
      )
    );
  },
  input: function() {
    var data = this.props.data;
    switch(this.type()) {
      case 'boolean':
        return(React.DOM.span(null, CheckboxInput({ref: "input", data: {name: data.name, defaultChecked: data.value, className: this.props.options.className, value: data.value}}), React.DOM.span(null, this.placeholder())))
        break;
      case 'number':
        return(NumberInput({ref: "input", data: {name: data.name, defaultValue: data.value, placeholder: this.placeholder(), className: this.props.options.className}}))
        break;
      case 'submit':
        return(SubmitInput({ref: "input", data: {value: data.value, className: this.props.options.className}}))
        break;
      case 'color':
        return(ColorInput({ref: "input", data: {name: data.name, defaultValue: data.value, className: this.props.options.className}}))
        break;
      case 'email':
        return(EmailInput({ref: "input", data: {name: data.name, defaultValue: data.value, placeholder: this.placeholder(), className: this.props.options.className}}))
        break;
      case 'date':
        return(DateInput({ref: "input", data: {name: data.name, defaultValue: data.value, placeholder: this.placeholder(), className: this.props.options.className}}))
        break;
      case 'datetime':
        return(DatetimeInput({ref: "input", data: {name: data.name, defaultValue: data.value, className: this.props.options.className}}))
        break;
      case 'hidden':
        return(HiddenInput({ref: "input", data: {name: data.name, value: data.value, placeholder: this.placeholder(), className: this.props.options.className}}))
        break;
      case 'select':
        return(SelectInput({ref: "input", data: {name: data.name, value: data.value, values: this.props.options.values , className: this.props.options.className}}))
        break;
      case 'password':
        return(PasswordInput({ref: "input", data: {name: data.name, defaultChecked: data.value, placeholder: this.placeholder(), className: this.props.options.className}}))
        break;
      case 'textarea':
        return(TextareaInput({ref: "input", data: {name: data.name, defaultValue: data.value, placeholder: this.placeholder(), className: this.props.options.className}}))
        break;
      default:
        return(TextInput({ref: "input", data: {name: data.name, defaultValue: data.value, placeholder: this.placeholder(), className: this.props.options.className}}))
    }

  },
  type: function() {
    var type = typeof(this.props.data.value);
    if(this.props.options.type) type = this.props.options.type;
    if(this.isId()) type = 'hidden';
    if(this.isPassword()) type = 'password';
    if(this.isEmail()) type = 'email';
    return type;
  },
  isId: function() {
    if(this.props.data.name === 'id') return true;
    return false;
  },
  isPassword: function() {
    if(this.props.data.name === 'password' || this.props.data.name === 'password_confirmation') return true;
    return false;
  },
  isEmail: function() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(this.props.data.name === 'email' || re.test(this.props.data.value)) return true;
    return false;
  },
  placeholder: function() {
    var name = this.props.options.placeholder || this.props.data.name;
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
});

module.exports = Input;

},{"./checkbox-input.react":2,"./color-input.react":3,"./date-input.react":4,"./datetime-input.react":5,"./email-input.react":6,"./hidden-input.react":8,"./number-input.react":10,"./password-input.react":12,"./select-input.react":13,"./submit-input.react":14,"./text-input.react":15,"./textarea-input.react":16}],10:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var NumberInput = React.createClass({displayName: 'NumberInput',
  render: function() {
    var data = this.props.data;
    return (
      React.DOM.input({ref: data.name, type: "number", defaultValue: data.defaultValue, placeholder: data.placeholder, className: data.className})
    );
  }

});

module.exports = NumberInput;

},{}],11:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var OptionForSelect = React.createClass({displayName: 'OptionForSelect',

  render: function() {
    return (
      React.DOM.option({value: this.props.value}, this.props.show)
    );
  }

});
module.exports = OptionForSelect;

},{}],12:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var PasswordInput = React.createClass({displayName: 'PasswordInput',
  render: function() {
    var data = this.props.data;
    return (
      React.DOM.input({ref: data.name, type: "password", defaultValue: data.defaultValue, placeholder: data.placeholder, className: data.className})
    );
  }

});

module.exports = PasswordInput;

},{}],13:[function(require,module,exports){
/**
 * @jsx React.DOM
 */


var OptionForSelect = require('./options-for-select.react')
var SelectInput = React.createClass({displayName: 'SelectInput',
  render: function() {
    var data = this.props.data;
    var options = [];
    data.values.forEach(function(value) {
      options.push(OptionForSelect({key: value.value, value: value.value, show: value.show}))
    }.bind(this))
    return (
      React.DOM.select({ref: data.name, defaultValue: data.value, className: data.className, id: data.id}, 
        options
      )
    );
  }

});
module.exports = SelectInput;

},{"./options-for-select.react":11}],14:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var SubmitInput = React.createClass({displayName: 'SubmitInput',
  render: function() {
    var data = this.props.data;
    return (
      React.DOM.input({ref: data.value, type: "submit", value: data.value, className: data.className})
    );
  }

});

module.exports = SubmitInput;

},{}],15:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var TextInput = React.createClass({displayName: 'TextInput',
  render: function() {
    var data = this.props.data;
    return (
      React.DOM.input({ref: data.name, type: "text", defaultValue: data.defaultValue, placeholder: data.placeholder, className: data.className})
    );
  }

});

module.exports = TextInput;

},{}],16:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var TextareaInput = React.createClass({displayName: 'TextareaInput',
  render: function() {
    var data = this.props.data;
    return (
      React.DOM.textarea({ref: data.name, defaultValue: data.defaultValue, placeholder: data.placeholder, className: data.className})
    );
  }

});
module.exports = TextareaInput;

},{}]},{},[1]);
