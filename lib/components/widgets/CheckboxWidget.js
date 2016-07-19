"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CheckboxWidget(_ref) {
  var schema = _ref.schema;
  var id = _ref.id;
  var value = _ref.value;
  var required = _ref.required;
  var disabled = _ref.disabled;
  var _onChange = _ref.onChange;
  var label = _ref.label;

  return _react2.default.createElement(
    "div",
    { className: "checkbox " + (disabled ? "disabled" : "") },
    _react2.default.createElement(
      "label",
      null,
      _react2.default.createElement("input", { type: "checkbox",
        id: id,
        checked: typeof value === "undefined" ? false : value,
        required: required,
        disabled: disabled,
        onChange: function onChange(event) {
          return _onChange(event.target.checked);
        } }),
      _react2.default.createElement(
        "strong",
        null,
        label
      )
    )
  );
}
if (process.env.NODE_ENV !== "production") {
  CheckboxWidget.propTypes = {
    schema: _react.PropTypes.object.isRequired,
    id: _react.PropTypes.string.isRequired,
    onChange: _react.PropTypes.func,
    value: _react.PropTypes.bool,
    required: _react.PropTypes.bool
  };
}

exports.default = CheckboxWidget;