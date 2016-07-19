"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../../utils");

var _ArrayField = require("./ArrayField");

var _ArrayField2 = _interopRequireDefault(_ArrayField);

var _BooleanField = require("./BooleanField");

var _BooleanField2 = _interopRequireDefault(_BooleanField);

var _NumberField = require("./NumberField");

var _NumberField2 = _interopRequireDefault(_NumberField);

var _ObjectField = require("./ObjectField");

var _ObjectField2 = _interopRequireDefault(_ObjectField);

var _StringField = require("./StringField");

var _StringField2 = _interopRequireDefault(_StringField);

var _UnsupportedField = require("./UnsupportedField");

var _UnsupportedField2 = _interopRequireDefault(_UnsupportedField);

var _DescriptionField = require("./DescriptionField");

var _DescriptionField2 = _interopRequireDefault(_DescriptionField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REQUIRED_FIELD_SYMBOL = "*";
var COMPONENT_TYPES = {
  "array": _ArrayField2.default,
  "boolean": _BooleanField2.default,
  "integer": _NumberField2.default,
  "number": _NumberField2.default,
  "object": _ObjectField2.default,
  "string": _StringField2.default
};

function getFieldComponent(schema, uiSchema, fields) {
  var field = uiSchema["ui:field"];
  if (typeof field === "function") {
    return field;
  }
  if (typeof field === "string" && field in fields) {
    return fields[field];
  }
  return COMPONENT_TYPES[schema.type] || _UnsupportedField2.default;
}

function getLabel(label, required, id) {
  if (!label) {
    return null;
  }
  return _react2.default.createElement(
    "label",
    { className: "control-label", htmlFor: id },
    required ? label + REQUIRED_FIELD_SYMBOL : label
  );
}

function renderHelp(help) {
  if (!help) {
    return null;
  }
  if (typeof help === "string") {
    return _react2.default.createElement(
      "p",
      { className: "help-block" },
      help
    );
  }
  return _react2.default.createElement(
    "div",
    { className: "help-block" },
    help
  );
}

function ErrorList(_ref) {
  var errors = _ref.errors;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement("p", null),
    _react2.default.createElement(
      "ul",
      { className: "error-detail bs-callout bs-callout-info" },
      (errors || []).map(function (error, index) {
        return _react2.default.createElement(
          "li",
          { className: "text-danger", key: index },
          error
        );
      })
    )
  );
}

function Wrapper(_ref2) {
  var type = _ref2.type;
  var classNames = _ref2.classNames;
  var errorSchema = _ref2.errorSchema;
  var label = _ref2.label;
  var description = _ref2.description;
  var hidden = _ref2.hidden;
  var help = _ref2.help;
  var required = _ref2.required;
  var displayLabel = _ref2.displayLabel;
  var id = _ref2.id;
  var children = _ref2.children;

  if (hidden) {
    return children;
  }
  var errors = errorSchema.__errors;
  var isError = errors && errors.length > 0;
  var classList = ["form-group", "field", "field-" + type, isError ? "field-error has-error" : "", classNames].join(" ").trim();
  return _react2.default.createElement(
    "div",
    { className: classList },
    displayLabel && label ? getLabel(label, required, id) : null,
    displayLabel && description ? _react2.default.createElement(_DescriptionField2.default, { id: id + "__description", description: description }) : null,
    children,
    isError ? _react2.default.createElement(ErrorList, { errors: errors }) : _react2.default.createElement("div", null),
    renderHelp(help)
  );
}

if (process.env.NODE_ENV !== "production") {
  Wrapper.propTypes = {
    type: _react.PropTypes.string.isRequired,
    id: _react.PropTypes.string,
    classNames: _react.PropTypes.string,
    label: _react.PropTypes.string,
    description: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    help: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    hidden: _react.PropTypes.bool,
    required: _react.PropTypes.bool,
    displayLabel: _react.PropTypes.bool,
    children: _react.PropTypes.node.isRequired
  };
}

Wrapper.defaultProps = {
  classNames: "",
  errorSchema: { errors: [] },
  hidden: false,
  required: false,
  displayLabel: true
};

function SchemaField(props) {
  var uiSchema = props.uiSchema;
  var errorSchema = props.errorSchema;
  var idSchema = props.idSchema;
  var name = props.name;
  var required = props.required;
  var registry = props.registry;
  var definitions = registry.definitions;
  var fields = registry.fields;

  var schema = (0, _utils.retrieveSchema)(props.schema, definitions);
  var FieldComponent = getFieldComponent(schema, uiSchema, fields);
  var disabled = Boolean(props.disabled || uiSchema["ui:disabled"]);
  var readonly = Boolean(props.readonly || uiSchema["ui:readonly"]);

  if (Object.keys(schema).length === 0) {
    return _react2.default.createElement("div", null);
  }

  var displayLabel = true;
  if (schema.type === "array") {
    displayLabel = (0, _utils.isMultiSelect)(schema) || (0, _utils.isFilesArray)(schema, uiSchema);
  }
  if (schema.type === "object") {
    displayLabel = false;
  }
  if (schema.type === "boolean" && !uiSchema["ui:widget"]) {
    displayLabel = false;
  }
  if (uiSchema["ui:field"]) {
    displayLabel = false;
  }

  return _react2.default.createElement(
    Wrapper,
    {
      label: props.schema.title || schema.title || name,
      description: props.schema.description || schema.description,
      errorSchema: errorSchema,
      hidden: uiSchema["ui:widget"] === "hidden",
      help: uiSchema["ui:help"],
      required: required,
      type: schema.type,
      displayLabel: displayLabel,
      id: idSchema.$id,
      classNames: uiSchema.classNames },
    _react2.default.createElement(FieldComponent, _extends({}, props, {
      schema: schema,
      disabled: disabled,
      readonly: readonly }))
  );
}

SchemaField.defaultProps = {
  uiSchema: {},
  errorSchema: {},
  idSchema: {},
  registry: (0, _utils.getDefaultRegistry)(),
  disabled: false,
  readonly: false
};

if (process.env.NODE_ENV !== "production") {
  SchemaField.propTypes = {
    schema: _react.PropTypes.object.isRequired,
    uiSchema: _react.PropTypes.object,
    idSchema: _react.PropTypes.object,
    formData: _react.PropTypes.any,
    errorSchema: _react.PropTypes.object,
    registry: _react.PropTypes.shape({
      widgets: _react.PropTypes.objectOf(_react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object])).isRequired,
      fields: _react.PropTypes.objectOf(_react.PropTypes.func).isRequired,
      definitions: _react.PropTypes.object.isRequired
    })
  };
}

exports.default = SchemaField;