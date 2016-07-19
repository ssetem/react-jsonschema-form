"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _BaseInput = require("./BaseInput");

var _BaseInput2 = _interopRequireDefault(_BaseInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rangeSpec(schema) {
  var spec = {};
  if (schema.multipleOf) {
    spec.step = schema.multipleOf;
  }
  if (schema.minimum) {
    spec.min = schema.minimum;
  }
  if (schema.maximum) {
    spec.max = schema.maximum;
  }
  return spec;
}

function RangeWidget(props) {
  var schema = props.schema;
  var value = props.value;

  return _react2.default.createElement(
    "div",
    { className: "field-range-wrapper" },
    _react2.default.createElement(_BaseInput2.default, _extends({
      type: "range"
    }, props, rangeSpec(schema))),
    _react2.default.createElement(
      "span",
      { className: "range-view" },
      value
    )
  );
}

if (process.env.NODE_ENV !== "production") {
  RangeWidget.propTypes = {
    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
  };
}

exports.default = RangeWidget;