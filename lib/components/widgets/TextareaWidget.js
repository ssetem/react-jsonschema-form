"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TextWidget(_ref) {
  var schema = _ref.schema;
  var id = _ref.id;
  var placeholder = _ref.placeholder;
  var value = _ref.value;
  var required = _ref.required;
  var disabled = _ref.disabled;
  var readonly = _ref.readonly;
  var _onChange = _ref.onChange;

  return _react2.default.createElement("textarea", {
    id: id,
    className: "form-control",
    value: typeof value === "undefined" ? "" : value,
    placeholder: placeholder,
    required: required,
    disabled: disabled,
    readOnly: readonly,
    onChange: function onChange(event) {
      return _onChange(event.target.value);
    } });
}

if (process.env.NODE_ENV !== "production") {
  TextWidget.propTypes = {
    schema: _react.PropTypes.object.isRequired,
    id: _react.PropTypes.string.isRequired,
    placeholder: _react.PropTypes.string,
    value: _react.PropTypes.string,
    required: _react.PropTypes.bool,
    onChange: _react.PropTypes.func
  };
}

exports.default = TextWidget;