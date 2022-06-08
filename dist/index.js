"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Item: true
};
Object.defineProperty(exports, "Item", {
  enumerable: true,
  get: function get() {
    return _item.Item;
  }
});

var _item = require("./item");

var _asArray = require("./asArray");

Object.keys(_asArray).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _asArray[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _asArray[key];
    }
  });
});

var _DnDBasicRulesMagic = require("./examples/DnDBasicRulesMagic");

Object.keys(_DnDBasicRulesMagic).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _DnDBasicRulesMagic[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DnDBasicRulesMagic[key];
    }
  });
});

var _random = require("./random");

Object.keys(_random).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _random[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _random[key];
    }
  });
});