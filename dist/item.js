"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = void 0;

var _random = require("./random");

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Item = /*#__PURE__*/function () {
  function Item() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var weight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _random.DEF_STD_WEIGHT;
    var tags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var force = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var next = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var postProcess = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

    _classCallCheck(this, Item);

    _defineProperty(this, "next", null);

    _defineProperty(this, "postProcess", null);

    _defineProperty(this, "value", null);

    _defineProperty(this, "weight", _random.DEF_STD_WEIGHT);

    _defineProperty(this, "tags", [_random.STD_WEIGHT]);

    if (_typeof(value) === 'object' && typeof value.value !== 'undefined' && typeof value.weight !== 'undefined' && !force) {
      Object.assign(this, value);
    }

    if (weight === _random.DEF_STD_WEIGHT && !~tags.indexOf(_random.STD_WEIGHT)) {
      tags.push(_random.STD_WEIGHT);
    }

    Object.assign(this, {
      value: value,
      weight: weight,
      tags: tags,
      next: next,
      postProcess: postProcess
    });
  }
  /**
   * A shortcut method that allows the creation of an instance using the
   * `.from()` static method. Identical to using `new Item(...)` syntax.
   *
   * Examples:
   *   Item.from('hello')
   *   Item.from('hello', 50)
   *
   * @method from
   * @param {[type]} args [description]
   * @return {[type]} [description]
   */


  _createClass(Item, null, [{
    key: "from",
    value: function from() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _construct(Item, args);
    }
    /**
     * This value, if an instance of `Random` will cause `next.one()` to be
     * called if this item is selected. This is a method that allows one
     * choice to trigger another choice.
     * 
     * @type {Random}
     */

  }]);

  return Item;
}();

exports.Item = Item;