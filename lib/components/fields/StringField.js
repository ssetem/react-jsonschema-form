"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../../utils");

var _TextWidget = require("../widgets/TextWidget");

var _TextWidget2 = _interopRequireDefault(_TextWidget);

var _SelectWidget = require("../widgets/SelectWidget");

var _SelectWidget2 = _interopRequireDefault(_SelectWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StringField(props) {
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

  var widget = uiSchema["ui:widget"] || schema.format;
  var placeholder = uiSchema["ui:placeholder"] || "";
  var commonProps = {
    schema: schema,
    id: idSchema && idSchema.$id,
    label: title || name,
    value: (0, _utils.defaultFieldValue)(formData, schema),
    onChange: onChange,
    required: required,
    disabled: disabled,
    readonly: readonly
  };
  if (Array.isArray(schema.enum)) {
    var enumOptions = (0, _utils.optionsList)(schema);
    if (widget) {
      var Widget = (0, _utils.getAlternativeWidget)(schema, widget, widgets, { enumOptions: enumOptions });
      return _react2.default.createElement(Widget, commonProps);
    }
    return _react2.default.createElement(_SelectWidget2.default, _extends({ options: { enumOptions: enumOptions } }, commonProps));
  }
  if (widget) {
    var _Widget = (0, _utils.getAlternativeWidget)(schema, widget, widgets);
    return _react2.default.createElement(_Widget, _extends({}, commonProps, { placeholder: placeholder }));
  }
  return _react2.default.createElement(_TextWidget2.default, _extends({}, commonProps, { placeholder: placeholder }));
}

if (process.env.NODE_ENV !== "production") {
  StringField.propTypes = {
    schema: _react.PropTypes.object.isRequired,
    uiSchema: _react.PropTypes.object.isRequired,
    idSchema: _react.PropTypes.object,
    onChange: _react.PropTypes.func.isRequired,
    formData: _react.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    registry: _react.PropTypes.shape({
      widgets: _react.PropTypes.objectOf(_react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object])).isRequired,
      fields: _react.PropTypes.objectOf(_react.PropTypes.func).isRequired,
      definitions: _react.PropTypes.object.isRequired
    }),
    required: _react.PropTypes.bool,
    disabled: _react.PropTypes.bool,
    readonly: _react.PropTypes.bool
  };
}

StringField.defaultProps = {
  uiSchema: {},
  registry: (0, _utils.getDefaultRegistry)(),
  disabled: false,
  readonly: false
};

exports.default = StringField;