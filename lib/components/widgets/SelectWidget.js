"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
function processValue(type, value) {
  if (type === "boolean") {
    return value === "true";
  } else if (type === "number") {
    return (0, _utils.asNumber)(value);
  }
  return value;
}

function SelectWidget(_ref) {
  var schema = _ref.schema;
  var id = _ref.id;
  var options = _ref.options;
  var value = _ref.value;
  var required = _ref.required;
  var disabled = _ref.disabled;
  var readonly = _ref.readonly;
  var multiple = _ref.multiple;
  var _onChange = _ref.onChange;
  var enumOptions = options.enumOptions;

  return _react2.default.createElement(
    "select",
    {
      id: id,
      multiple: multiple,
      className: "form-control",
      value: value,
      required: required,
      disabled: disabled,
      readOnly: readonly,
      onChange: function onChange(event) {
        var newValue = void 0;
        if (multiple) {
          newValue = [].filter.call(event.target.options, function (o) {
            return o.selected;
          }).map(function (o) {
            return o.value;
          });
        } else {
          newValue = event.target.value;
        }

        _onChange(processValue(schema.type, newValue));
      } },
    enumOptions.map(function (_ref2, i) {
      var value = _ref2.value;
      var label = _ref2.label;

      return _react2.default.createElement(
        "option",
        { key: i, value: value },
        label
      );
    })
  );
}

if (process.env.NODE_ENV !== "production") {
  SelectWidget.propTypes = {
    schema: _react.PropTypes.object.isRequired,
    id: _react.PropTypes.string.isRequired,
    options: _react.PropTypes.shape({
      enumOptions: _react.PropTypes.array
    }).isRequired,
    value: _react.PropTypes.any,
    required: _react.PropTypes.bool,
    multiple: _react.PropTypes.bool,
    onChange: _react.PropTypes.func
  };
}

exports.default = SelectWidget;