"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../../utils");

var _SelectWidget = require("./../widgets/SelectWidget");

var _SelectWidget2 = _interopRequireDefault(_SelectWidget);

var _FileWidget = require("./../widgets/FileWidget");

var _FileWidget2 = _interopRequireDefault(_FileWidget);

var _CheckboxesWidget = require("./../widgets/CheckboxesWidget");

var _CheckboxesWidget2 = _interopRequireDefault(_CheckboxesWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function ArrayFieldTitle(_ref) {
  var TitleField = _ref.TitleField;
  var idSchema = _ref.idSchema;
  var title = _ref.title;
  var required = _ref.required;

  if (!title) {
    return null;
  }
  var id = idSchema.$id + "__title";
  return _react2.default.createElement(TitleField, { id: id, title: title, required: required });
}

function ArrayFieldDescription(_ref2) {
  var DescriptionField = _ref2.DescriptionField;
  var idSchema = _ref2.idSchema;
  var description = _ref2.description;

  if (!description) {
    return null;
  }
  var id = idSchema.$id + "__description";
  return _react2.default.createElement(DescriptionField, { id: id, description: description });
}

var ArrayField = function (_Component) {
  _inherits(ArrayField, _Component);

  function ArrayField(props) {
    _classCallCheck(this, ArrayField);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ArrayField).call(this, props));

    _this.onAddClick = function (event) {
      event.preventDefault();
      var items = _this.state.items;
      var _this$props = _this.props;
      var schema = _this$props.schema;
      var registry = _this$props.registry;
      var definitions = registry.definitions;

      var itemSchema = schema.items;
      if ((0, _utils.isFixedItems)(schema) && (0, _utils.allowAdditionalItems)(schema)) {
        itemSchema = schema.additionalItems;
      }
      _this.asyncSetState({
        items: items.concat([(0, _utils.getDefaultFormState)(itemSchema, undefined, definitions)])
      });
    };

    _this.onDropIndexClick = function (index) {
      return function (event) {
        event.preventDefault();
        _this.asyncSetState({
          items: _this.state.items.filter(function (_, i) {
            return i !== index;
          })
        }, { validate: true }); // refs #195
      };
    };

    _this.onReorderClick = function (index, newIndex) {
      return function (event) {
        event.preventDefault();
        event.target.blur();
        var items = _this.state.items;

        _this.asyncSetState({
          items: items.map(function (item, i) {
            if (i === newIndex) {
              return items[index];
            } else if (i === index) {
              return items[newIndex];
            } else {
              return item;
            }
          })
        }, { validate: true });
      };
    };

    _this.onChangeForIndex = function (index) {
      return function (value) {
        _this.asyncSetState({
          items: _this.state.items.map(function (item, i) {
            return index === i ? value : item;
          })
        });
      };
    };

    _this.onSelectChange = function (value) {
      _this.asyncSetState({ items: value });
    };

    _this.state = _this.getStateFromProps(props);
    return _this;
  }

  _createClass(ArrayField, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState(this.getStateFromProps(nextProps));
    }
  }, {
    key: "getStateFromProps",
    value: function getStateFromProps(props) {
      var formData = Array.isArray(props.formData) ? props.formData : null;
      var definitions = this.props.registry.definitions;

      return {
        items: (0, _utils.getDefaultFormState)(props.schema, formData, definitions) || []
      };
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _utils.shouldRender)(this, nextProps, nextState);
    }
  }, {
    key: "isItemRequired",
    value: function isItemRequired(itemsSchema) {
      return itemsSchema.type === "string" && itemsSchema.minLength > 0;
    }
  }, {
    key: "asyncSetState",
    value: function asyncSetState(state) {
      var _this2 = this;

      var options = arguments.length <= 1 || arguments[1] === undefined ? { validate: false } : arguments[1];

      (0, _utils.setState)(this, state, function () {
        _this2.props.onChange(_this2.state.items, options);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props;
      var schema = _props.schema;
      var uiSchema = _props.uiSchema;

      if ((0, _utils.isFilesArray)(schema, uiSchema)) {
        return this.renderFiles();
      }
      if ((0, _utils.isFixedItems)(schema)) {
        return this.renderFixedArray();
      }
      if ((0, _utils.isMultiSelect)(schema)) {
        return this.renderMultiSelect();
      }
      return this.renderNormalArray();
    }
  }, {
    key: "renderNormalArray",
    value: function renderNormalArray() {
      var _this3 = this;

      var _props2 = this.props;
      var schema = _props2.schema;
      var uiSchema = _props2.uiSchema;
      var errorSchema = _props2.errorSchema;
      var idSchema = _props2.idSchema;
      var name = _props2.name;
      var required = _props2.required;
      var disabled = _props2.disabled;
      var readonly = _props2.readonly;

      var title = schema.title || name;
      var items = this.state.items;
      var _props$registry = this.props.registry;
      var definitions = _props$registry.definitions;
      var fields = _props$registry.fields;
      var TitleField = fields.TitleField;
      var DescriptionField = fields.DescriptionField;

      var itemsSchema = (0, _utils.retrieveSchema)(schema.items, definitions);

      return _react2.default.createElement(
        "fieldset",
        {
          className: "field field-array field-array-of-" + itemsSchema.type },
        _react2.default.createElement(ArrayFieldTitle, {
          TitleField: TitleField,
          idSchema: idSchema,
          title: title,
          required: required }),
        schema.description ? _react2.default.createElement(ArrayFieldDescription, {
          DescriptionField: DescriptionField,
          idSchema: idSchema,
          description: schema.description }) : null,
        _react2.default.createElement(
          "div",
          { className: "row array-item-list" },
          items.map(function (item, index) {
            var itemErrorSchema = errorSchema ? errorSchema[index] : undefined;
            var itemIdPrefix = idSchema.$id + "_" + index;
            var itemIdSchema = (0, _utils.toIdSchema)(itemsSchema, itemIdPrefix, definitions);
            return _this3.renderArrayFieldItem({
              index: index,
              canMoveUp: index > 0,
              canMoveDown: index < items.length - 1,
              itemSchema: itemsSchema,
              itemIdSchema: itemIdSchema,
              itemErrorSchema: itemErrorSchema,
              itemData: items[index],
              itemUiSchema: uiSchema.items
            });
          })
        ),
        _react2.default.createElement(AddButton, {
          onClick: this.onAddClick, disabled: disabled || readonly })
      );
    }
  }, {
    key: "renderMultiSelect",
    value: function renderMultiSelect() {
      var _props3 = this.props;
      var schema = _props3.schema;
      var idSchema = _props3.idSchema;
      var uiSchema = _props3.uiSchema;
      var disabled = _props3.disabled;
      var readonly = _props3.readonly;
      var items = this.state.items;
      var definitions = this.props.registry.definitions;

      var itemsSchema = (0, _utils.retrieveSchema)(schema.items, definitions);

      var multipleCheckboxes = uiSchema["ui:widget"] === "checkboxes";
      var Widget = multipleCheckboxes ? _CheckboxesWidget2.default : _SelectWidget2.default;
      return _react2.default.createElement(Widget, {
        id: idSchema && idSchema.$id,
        multiple: true,
        onChange: this.onSelectChange,
        options: { enumOptions: (0, _utils.optionsList)(itemsSchema) },
        schema: schema,
        value: items,
        disabled: disabled,
        readonly: readonly
      });
    }
  }, {
    key: "renderFiles",
    value: function renderFiles() {
      var _props4 = this.props;
      var schema = _props4.schema;
      var idSchema = _props4.idSchema;
      var name = _props4.name;
      var disabled = _props4.disabled;
      var readonly = _props4.readonly;

      var title = schema.title || name;
      var items = this.state.items;

      return _react2.default.createElement(_FileWidget2.default, {
        id: idSchema && idSchema.$id,
        multiple: true,
        onChange: this.onSelectChange,
        schema: schema,
        title: title,
        value: items,
        disabled: disabled,
        readonly: readonly
      });
    }
  }, {
    key: "renderFixedArray",
    value: function renderFixedArray() {
      var _this4 = this;

      var _props5 = this.props;
      var schema = _props5.schema;
      var uiSchema = _props5.uiSchema;
      var errorSchema = _props5.errorSchema;
      var idSchema = _props5.idSchema;
      var name = _props5.name;
      var required = _props5.required;
      var disabled = _props5.disabled;
      var readonly = _props5.readonly;

      var title = schema.title || name;
      var items = this.state.items;
      var _props$registry2 = this.props.registry;
      var definitions = _props$registry2.definitions;
      var fields = _props$registry2.fields;
      var TitleField = fields.TitleField;

      var itemSchemas = schema.items.map(function (item) {
        return (0, _utils.retrieveSchema)(item, definitions);
      });
      var additionalSchema = (0, _utils.allowAdditionalItems)(schema) ? (0, _utils.retrieveSchema)(schema.additionalItems, definitions) : null;

      if (!items || items.length < itemSchemas.length) {
        // to make sure at least all fixed items are generated
        items = items || [];
        items = items.concat(new Array(itemSchemas.length - items.length));
      }

      return _react2.default.createElement(
        "fieldset",
        { className: "field field-array field-array-fixed-items" },
        _react2.default.createElement(ArrayFieldTitle, {
          TitleField: TitleField,
          idSchema: idSchema,
          title: title,
          required: required }),
        schema.description ? _react2.default.createElement(
          "div",
          { className: "field-description" },
          schema.description
        ) : null,
        _react2.default.createElement(
          "div",
          { className: "row array-item-list" },
          items.map(function (item, index) {
            var additional = index >= itemSchemas.length;
            var itemSchema = additional ? additionalSchema : itemSchemas[index];
            var itemIdPrefix = idSchema.$id + "_" + index;
            var itemIdSchema = (0, _utils.toIdSchema)(itemSchema, itemIdPrefix, definitions);
            var itemUiSchema = additional ? uiSchema.additionalItems || {} : Array.isArray(uiSchema.items) ? uiSchema.items[index] : uiSchema.items || {};
            var itemErrorSchema = errorSchema ? errorSchema[index] : undefined;

            return _this4.renderArrayFieldItem({
              index: index,
              removable: additional,
              canMoveUp: index >= itemSchemas.length + 1,
              canMoveDown: additional && index < items.length - 1,
              itemSchema: itemSchema,
              itemData: item,
              itemUiSchema: itemUiSchema,
              itemIdSchema: itemIdSchema,
              itemErrorSchema: itemErrorSchema
            });
          })
        ),
        additionalSchema ? _react2.default.createElement(AddButton, {
          onClick: this.onAddClick,
          disabled: disabled || readonly }) : null
      );
    }
  }, {
    key: "renderArrayFieldItem",
    value: function renderArrayFieldItem(_ref3) {
      var index = _ref3.index;
      var _ref3$removable = _ref3.removable;
      var removable = _ref3$removable === undefined ? true : _ref3$removable;
      var _ref3$canMoveUp = _ref3.canMoveUp;
      var canMoveUp = _ref3$canMoveUp === undefined ? true : _ref3$canMoveUp;
      var _ref3$canMoveDown = _ref3.canMoveDown;
      var canMoveDown = _ref3$canMoveDown === undefined ? true : _ref3$canMoveDown;
      var itemSchema = _ref3.itemSchema;
      var itemData = _ref3.itemData;
      var itemUiSchema = _ref3.itemUiSchema;
      var itemIdSchema = _ref3.itemIdSchema;
      var itemErrorSchema = _ref3.itemErrorSchema;
      var SchemaField = this.props.registry.fields.SchemaField;
      var _props6 = this.props;
      var disabled = _props6.disabled;
      var readonly = _props6.readonly;

      var hasToolbar = removable || canMoveUp || canMoveDown;
      var btnStyle = { flex: 1, paddingLeft: 6, paddingRight: 6, fontWeight: "bold" };

      return _react2.default.createElement(
        "div",
        { key: index, className: "array-item" },
        _react2.default.createElement(
          "div",
          { className: hasToolbar ? "col-xs-10" : "col-xs-12" },
          _react2.default.createElement(SchemaField, {
            schema: itemSchema,
            uiSchema: itemUiSchema,
            formData: itemData,
            errorSchema: itemErrorSchema,
            idSchema: itemIdSchema,
            required: this.isItemRequired(itemSchema),
            onChange: this.onChangeForIndex(index),
            registry: this.props.registry,
            disabled: this.props.disabled,
            readonly: this.props.readonly })
        ),
        hasToolbar ? _react2.default.createElement(
          "div",
          { className: "col-xs-2 array-item-toolbox text-right" },
          _react2.default.createElement(
            "div",
            { className: "btn-group", style: { display: "flex" } },
            canMoveUp || canMoveDown ? _react2.default.createElement(
              "button",
              { type: "button", className: "btn btn-default array-item-move-up",
                style: btnStyle,
                tabIndex: "-1",
                disabled: disabled || readonly || !canMoveUp,
                onClick: this.onReorderClick(index, index - 1) },
              "⬆"
            ) : null,
            canMoveUp || canMoveDown ? _react2.default.createElement(
              "button",
              { type: "button", className: "btn btn-default array-item-move-down",
                style: btnStyle,
                tabIndex: "-1",
                disabled: disabled || readonly || !canMoveDown,
                onClick: this.onReorderClick(index, index + 1) },
              "⬇"
            ) : null,
            removable ? _react2.default.createElement(
              "button",
              { type: "button", className: "btn btn-danger array-item-remove",
                style: btnStyle,
                tabIndex: "-1",
                disabled: disabled || readonly,
                onClick: this.onDropIndexClick(index) },
              "✖"
            ) : null
          )
        ) : null
      );
    }
  }, {
    key: "itemTitle",
    get: function get() {
      var schema = this.props.schema;

      return schema.items.title || schema.items.description || "Item";
    }
  }]);

  return ArrayField;
}(_react.Component);

ArrayField.defaultProps = {
  uiSchema: {},
  idSchema: {},
  registry: (0, _utils.getDefaultRegistry)(),
  required: false,
  disabled: false,
  readonly: false
};


function AddButton(_ref4) {
  var onClick = _ref4.onClick;
  var disabled = _ref4.disabled;

  return _react2.default.createElement(
    "div",
    { className: "row" },
    _react2.default.createElement(
      "p",
      { className: "col-xs-2 col-xs-offset-10 array-item-add text-right" },
      _react2.default.createElement(
        "button",
        { type: "button", className: "btn btn-info col-xs-12",
          tabIndex: "-1", onClick: onClick,
          disabled: disabled, style: { fontWeight: "bold" } },
        "➕"
      )
    )
  );
}

if (process.env.NODE_ENV !== "production") {
  ArrayField.propTypes = {
    schema: _react.PropTypes.object.isRequired,
    uiSchema: _react.PropTypes.object,
    idSchema: _react.PropTypes.object,
    errorSchema: _react.PropTypes.object,
    onChange: _react.PropTypes.func.isRequired,
    formData: _react.PropTypes.array,
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

exports.default = ArrayField;