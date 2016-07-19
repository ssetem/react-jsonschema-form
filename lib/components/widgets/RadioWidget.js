"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RadioWidget(_ref) {
  var schema = _ref.schema;
  var options = _ref.options;
  var value = _ref.value;
  var required = _ref.required;
  var disabled = _ref.disabled;
  var _onChange = _ref.onChange;

  // Generating a unique field name to identify this set of radio buttons
  var name = Math.random().toString();
  var enumOptions = options.enumOptions;

  return _react2.default.createElement(
    "div",
    { className: "field-radio-group" },
    enumOptions.map(function (option, i) {
      var checked = option.value === value;
      return _react2.default.createElement(
        "div",
        { key: i, className: "radio " + (disabled ? "disabled" : "") },
        _react2.default.createElement(
          "label",
          null,
          _react2.default.createElement("input", { type: "radio",
            name: name,
            value: option.value,
            checked: checked,
            disabled: disabled,
            onChange: function onChange(_) {
              return _onChange(option.value);
            } }),
          option.label
        )
      );
    })
  );
}

if (process.env.NODE_ENV !== "production") {
  RadioWidget.propTypes = {
    schema: _react.PropTypes.object.isRequired,
    id: _react.PropTypes.string.isRequired,
    options: _react.PropTypes.shape({
      enumOptions: _react.PropTypes.array
    }).isRequired,
    value: _react.PropTypes.any,
    required: _react.PropTypes.bool,
    onChange: _react.PropTypes.func
  };
}
exports.default = RadioWidget;