/**
 * @jsx React.DOM
 */

var TodoForm = React.createClass({
  render: function() {
    return (
      <FormFor object={this.props.object} options={this.props.options} errors={this.props.errors} />
    );
  }

});
