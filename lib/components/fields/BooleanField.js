"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../../utils");

var _CheckboxWidget = require("./../widgets/CheckboxWidget");

var _CheckboxWidget2 = _interopRequireDefault(_CheckboxWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildOptions(schema) {
  return {
    enumOptions: (0, _utils.optionsList)(Object.assign({
      enumNames: ["true", "false"],
      enum: [true, false]
    }, { enumNames: schema.enumNames }))
  };
}

function BooleanField(props) {
  var schema = props.schema;
  var name = props.name;
  var uiSchema = props.uiSchema;
  var idSchema = props.idSchema;
  var formData = props.formData;
  var registry = props.registry;
  var required = props.required;
  var disabled = props.disabled;
  var readonly = props.readonly;
  var onChange = props.onChange;
  var title = schema.title;
  var widgets = registry.widgets;

  var widget = uiSchema["ui:widget"];
  var commonProps = {
    schema: schema,
    id: idSchema && idSchema.$id,
    onChange: onChange,
    label: title || name,
    value: (0, _utils.defaultFieldValue)(formData, schema),
    required: required,
    disabled: disabled,
    readonly: readonly
  };
  if (widget) {
    var Widget = (0, _utils.getAlternativeWidget)(schema, widget, widgets);
    return _react2.default.createElement(Widget, _extends({ options: buildOptions(schema) }, commonProps));
  }
  return _react2.default.createElement(_CheckboxWidget2.default, commonProps);
}

if (process.env.NODE_ENV !== "production") {
  BooleanField.propTypes = {
    schema: _react.PropTypes.object.isRequired,
    uiSchema: _react.PropTypes.object,
    idSchema: _react.PropTypes.object,
    onChange: _react.PropTypes.func.isRequired,
    formData: _react.PropTypes.bool,
    required: _react.PropTypes.bool,
    disabled: _react.PropTypes.bool,
    readonly: _react.PropTypes.bool,
    registry: _react.PropTypes.shape({
      widgets: _react.PropTypes.objectOf(_react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object])).isRequired,
      fields: _react.PropTypes.objectOf(_react.PropTypes.func).isRequired,
      definitions: _react.PropTypes.object.isRequired
    })
  };
}

BooleanField.defaultProps = {
  uiSchema: {},
  registry: (0, _utils.getDefaultRegistry)(),
  disabled: false,
  readonly: false
};

exports.default = BooleanField;