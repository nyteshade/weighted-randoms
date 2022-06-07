"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Item: true,
  Random: true,
  STD_WEIGHT: true,
  DEF_STD_WEIGHT: true,
  GEN_RANGE: true,
  GEN_RANGE_VALS: true
};
Object.defineProperty(exports, "DEF_STD_WEIGHT", {
  enumerable: true,
  get: function get() {
    return _random.DEF_STD_WEIGHT;
  }
});
Object.defineProperty(exports, "GEN_RANGE", {
  enumerable: true,
  get: function get() {
    return _random.GEN_RANGE;
  }
});
Object.defineProperty(exports, "GEN_RANGE_VALS", {
  enumerable: true,
  get: function get() {
    return _random.GEN_RANGE_VALS;
  }
});
Object.defineProperty(exports, "Item", {
  enumerable: true,
  get: function get() {
    return _item.Item;
  }
});
Object.defineProperty(exports, "Random", {
  enumerable: true,
  get: function get() {
    return _random.Random;
  }
});
Object.defineProperty(exports, "STD_WEIGHT", {
  enumerable: true,
  get: function get() {
    return _random.STD_WEIGHT;
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