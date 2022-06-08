"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STD_WEIGHT = exports.Random = exports.GEN_RANGE_VALS = exports.GEN_RANGE = exports.DEF_STD_WEIGHT = exports.COL_WEIGHT = exports.COL_VALUE_STRING = exports.COL_VALUE_MIXED = exports.COL_VALUE_JSON = exports.COL_TAG_STRING = exports.COL_TAGS_CSV = exports.COL_NEXT_JSON = exports.COL_NEXT_FILEPATH = exports.COLS_STRING_VALUES = exports.COLS_NESTED = exports.COLS_JSON_VALUES = exports.COLS_DEFAULT = void 0;

var _item2 = require("./item");

var _asArray = require("./asArray");

var _csvParse = require("csv-parse");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _util = require("util");

var _yargs = require("yargs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * Random is quick class that expertly handles weighted randoms in your code
 * in an efficient way. It supports objects that sport
 */
var Random = /*#__PURE__*/function (_Symbol$toStringTag) {
  /**
   * Creates a new instance of Random which can be used to generate a random
   * selection from the choices it is aware of. Each choice can be weighted
   * differently than its peers.
   *
   * @param  {...any} list
   */
  function Random(weightIfFirstAndFinite) {
    var _this$constructor;

    for (var _len = arguments.length, list = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      list[_key - 1] = arguments[_key];
    }

    _classCallCheck(this, Random);

    this.list = [];

    if ((0, _asArray.isNumber)(weightIfFirstAndFinite)) {
      this.standardWeight = Number(weightIfFirstAndFinite) || DEF_STD_WEIGHT;
    } else {
      this.standardWeight = DEF_STD_WEIGHT;

      if (weightIfFirstAndFinite !== undefined && weightIfFirstAndFinite !== null) {
        list = [weightIfFirstAndFinite].concat(list);
      }
    }

    this.list = (_this$constructor = this.constructor).normalizeArgs.apply(_this$constructor, [this.standardWeight].concat(_toConsumableArray(list)));
  }
  /**
   * When items are supplied without a specified weight, this is the
   * weight applied to them when added to the internal list. This getter
   * retrieves the current value for this instance.
   *
   * @return {Number} the current default weight, or 1.0 if unchanged
   */


  _createClass(Random, [{
    key: "standardWeight",
    get: function get() {
      return this[STD_WEIGHT];
    }
    /**
     * When items are supplied without a specified weight, this is the
     * weight applied to them when added to the internal list. This setter
     * applies a new value for this instance.
     *
     * @param {Number} value the current default weight, or 1.0 if unchanged
     */
    ,
    set: function set(value) {
      if ((0, _asArray.isNumber)(value)) {
        this[STD_WEIGHT] = Number(value);
        this.reweighStandardItems();
      }
    }
    /**
     * The size property determines the total weight of all the possibilities
     * within the list. Each item has a weight and this value is the sum of all
     * the items' individual weights combined.
     *
     * @return {Number} total weight of all choices
     */

  }, {
    key: "size",
    get: function get() {
      var size = 0;

      var _iterator = _createForOfIteratorHelper(this.list),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          size += item.weight;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return size;
    }
    /**
     * Items supplied to the Random set without a weight will be set at a
     * standard default weight. These items are also tagged as being set thus
     * for easier identification. This method allows an easy way to reweigh
     * those items with an alternate standard weight after the fact. If
     * standardWeight has been set directly or via `newStandardWeight` the
     * weights will be recalculated.
     *
     * @param {Number} newStandardWeight an optional new weight to apply to this
     * Random instance for all new weights for items added
     */

  }, {
    key: "reweighStandardItems",
    value: function reweighStandardItems() {
      var newStandardWeight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (newStandardWeight) {
        this.standardWeight = newStandardWeight;
      }

      var _iterator2 = _createForOfIteratorHelper(this.list),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;

          if (item.tags && Array.isArray(item.tags) && item.tags.includes(STD_WEIGHT)) {
            item.weight = this.standardWeight;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    /**
     * A way to append further items to the internal set of possibilities
     * generated by this Random set. `this` will be returned for inlining.
     *
     * @param  {...any} items either a comma separated list of new items or
     * any of the other accepted variations to append to the Random set.
     * @return {Random} `this` is returned to allow for appending as an
     * inline operation
     */

  }, {
    key: "add",
    value: function add() {
      for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }

      var list = Random.normalizeArgs.apply(Random, [this.standardWeight].concat(items));
      this.list = this.list.concat(list);
      return this;
    }
    /**
     * Adds a range of numbers as Random item choices to the set for
     * picking. The number range can be from large to small or small
     * to large; it makes no difference. Each item generated in this
     * range of numbers will be tagged with a `GEN_RANGE` symbol for
     * identification.
     *
     * @param {Number} from starting number of range
     * @param {Number} to ending number of range
     * @param {Number} withWeight an optional weight to use instead of the
     * standardWeight from this `Random` instance
     *
     * @return {Random} the `this` value for inline chaining
     *
     * @throws an error if `from` or `to` are not actually numbers
     */

  }, {
    key: "addRange",
    value: function addRange() {
      var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var withWeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (!(0, _asArray.isNumber)(from) || !(0, _asArray.isNumber)(to)) {
        throw new Error('Number ranges must be numeric');
      }

      var asc = Number(from) < Number(to);
      var Class = this.constructor;
      var tags = [GEN_RANGE(from, to)];

      if (withWeight === null) {
        withWeight = this.standardWeight;
        tags.push(STD_WEIGHT);
      }

      for (var i = from; asc && i <= to || !asc && i >= to; asc ? i++ : i--) {
        this.list.push(Class.item(i, withWeight, tags));
      }

      return this;
    }
    /**
     * Synonymous with one(); deprecated; remove before launch
     */

  }, {
    key: "generate",
    value: function generate() {
      return this.one();
    }
    /**
     * Randomly select a value from the internal list, taking into account
     * any weights when generating the random occurrence.
     *
     * @param {function} postProcess if a function is supplied here, it is
     * expected to be of the signature function(result):result. It allows you
     * to process the result by acting on it and returning the subsequent 
     * value.
     * @return {mixed} the value of the randomly, possibly randomly weighted,
     * generated item. If the item's `value` property is a function, the
     * result of that function is returned instead.
     */

  }, {
    key: "one",
    value: function one() {
      var index = Math.random() * this.size;
      var count = 0;

      var toString = function toString(obj) {
        return Object.prototype.toString.apply(obj);
      };

      var isFunction = function isFunction(obj) {
        return /object Function/.test(toString(obj));
      };

      var _iterator3 = _createForOfIteratorHelper(this.list),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var item = _step3.value;

          if (index < item.weight + count) {
            var result = item.value;

            if (item.next && item.next instanceof Random) {
              result = item.next;
            }

            if (isFunction(result)) {
              result = result();
            }

            while (result && result instanceof Random) {
              result = result.one();
            }

            var postProcess = item.postProcess;

            if (postProcess && isFunction(postProcess)) {
              result = postProcess(result);
            }

            return result;
          }

          count += item.weight;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return null;
    }
    /**
     * Same as `one()` but executes the function `count` number of times and
     * returns the results in an array.
     *
     * @param {Number} count the number of items to generate. Defaults to 3
     *
     * @return {Array<mixed>} an array of items generated through subsequent
     * calls to `.one()`
     */

  }, {
    key: "some",
    value: function some() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
      var items = [];

      for (var i = 0; i < count; i++) {
        items.push(this.one());
      }

      return items;
    }
    /**
     * Creates a new Random item entry with default values for `weight`, an
     * empty array for `tags` and a `value` of whatever you wish to wrap. If
     * `value` is a `function`, it will be executed whenever the value is
     * used by `Random` instances.
     *
     * As a form of validation, if a Random.item instance is passed for value
     * it will simply be returned as long as `force` is `false`
     *
     * @param {Mixed} value the value to be used for this `Random` item entry;
     * if the value is a `Random` item entry it will only be wrapped if `force`
     * is `true`.
     * @param {Number} weight by default this is one, or the default standard
     * weight used by the system.
     */

  }, {
    key: _Symbol$toStringTag,
    get:
    /**
     * Ensure that instances of Random report themselves as instances
     * of class Random. Testing this is as easy as matching the name 
     * of this class to the results of a call to Object.prototype.
     * toString.call() and passing this instance as the first parameter.
     * 
     * @return {string} the name of the Class this function is part of
     */
    function get() {
      return this.constructor.name;
    }
  }], [{
    key: "item",
    value: function item() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _construct(_item2.Item, args);
    }
    /**
     * Shortcut method that is identical to `new Random(...args).one()`
     *
     * @param  {...any} args the comma separated list of items to choose from;
     * all items will be weighted evenly.
     */

  }, {
    key: "from",
    value: function from() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return _construct(Random, args).one();
    }
    /**
     * Sometimes it is easier to lay out data as a stream of CSV, or comma
     * separated values. Since the 
     * 
     * @param {String} pathToFile string denoting the path to the CSV file
     * containing the data to use to construct the Random() instance.
     * @param {Array<Symbol>} columnData an ordered array of predefined Symbol 
     * constants indicating which data should exist for each column and what
     * format to expect. An example might look like
     * ```
     *   20,"20% chance of Rain","WEATHER,DEF_STD_WEIGHT"
     * ```
     * @param {Array<Symbol>} nextColumnData if this value is null, the primary
     * `columnData` value will be used. Otherwise this arrangement will be used
     * when parsing the COL_NEXT_FILE values.
     */

  }, {
    key: "fromCSVFile",
    value: function () {
      var _fromCSVFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(pathToFile) {
        var columnData,
            nextColumnData,
            skipFirstLine,
            options,
            tryParse,
            contents,
            records,
            stringValueIndex,
            jsonValueIndex,
            mixedValueIndex,
            csvTagIndex,
            singleTagIndex,
            nextFileIndex,
            nextJSONIndex,
            weightIndex,
            valueIndex,
            tagIndex,
            nextIndex,
            _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                columnData = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : COLS_DEFAULT;
                nextColumnData = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : null;
                skipFirstLine = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : false;
                options = {
                  delimeter: ',',
                  skipEmptyLines: true,
                  comment: '#',
                  from_line: skipFirstLine ? 2 : 1
                };

                if (!_fs["default"].existsSync(pathToFile)) {
                  _context2.next = 34;
                  break;
                }

                tryParse = function tryParse(string) {
                  try {
                    return JSON.parse(string);
                  } catch (ignored) {
                    return null;
                  }
                }; // Read the contents of the specified CSV file and parse
                // the CSV into an array of records


                _context2.next = 8;
                return (0, _util.promisify)(_fs["default"].readFile)(pathToFile);

              case 8:
                contents = _context2.sent;
                _context2.prev = 9;
                _context2.next = 12;
                return (0, _util.promisify)(_csvParse.parse)(contents, options);

              case 12:
                records = _context2.sent;
                _context2.next = 17;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](9);

              case 17:
                if (records) {
                  _context2.next = 19;
                  break;
                }

                return _context2.abrupt("return", null);

              case 19:
                // Determine which columns were specified for values, tags and weight
                // Fetch the value indices
                stringValueIndex = columnData.indexOf(COL_VALUE_STRING);
                jsonValueIndex = columnData.indexOf(COL_VALUE_JSON);
                mixedValueIndex = columnData.indexOf(COL_VALUE_MIXED); // Fetch the tag indices

                csvTagIndex = columnData.indexOf(COL_TAGS_CSV);
                singleTagIndex = columnData.indexOf(COL_TAG_STRING); // Fetch the next property indices

                nextFileIndex = columnData.indexOf(COL_NEXT_FILEPATH);
                nextJSONIndex = columnData.indexOf(COL_NEXT_JSON); // Normalize the indicies based on searched data

                weightIndex = columnData.indexOf(COL_WEIGHT);
                valueIndex = ~stringValueIndex ? stringValueIndex : ~mixedValueIndex ? mixedValueIndex : jsonValueIndex;
                tagIndex = ~csvTagIndex ? csvTagIndex : ~singleTagIndex ? singleTagIndex : -1;
                nextIndex = ~nextFileIndex ? nextFileIndex : nextJSONIndex;
                _context2.next = 32;
                return Promise.all(records.map( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(record) {
                    var value, tags, weight, next, path;
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!~valueIndex) {
                              _context.next = 9;
                              break;
                            }

                            _context.t0 = valueIndex;
                            _context.next = _context.t0 === jsonValueIndex ? 4 : _context.t0 === mixedValueIndex ? 6 : _context.t0 === stringValueIndex ? 8 : 8;
                            break;

                          case 4:
                            value = tryParse(record[valueIndex]) || null;
                            return _context.abrupt("break", 9);

                          case 6:
                            value = tryParse(record[valueIndex]) || record[valueIndex];
                            return _context.abrupt("break", 9);

                          case 8:
                            value = record[valueIndex];

                          case 9:
                            tags = ~tagIndex ? ~csvTagIndex ? record[tagIndex].trim().split(',').map(function (tag) {
                              return tag.trim();
                            }) : [record[tagIndex]] : [STD_WEIGHT];
                            weight = ~weightIndex ? Number(record[weightIndex]) : DEF_STD_WEIGHT;
                            next = null;

                            if (!~nextIndex) {
                              _context.next = 23;
                              break;
                            }

                            if (!~nextFileIndex) {
                              _context.next = 21;
                              break;
                            }

                            if (!record[nextIndex]) {
                              _context.next = 19;
                              break;
                            }

                            path = _path["default"].isAbsolute(record[nextIndex]) ? record[nextIndex] : _path["default"].join(_path["default"].dirname(pathToFile), record[nextIndex]);
                            _context.next = 18;
                            return Random.fromCSVFile(path, nextColumnData || columnData);

                          case 18:
                            next = _context.sent;

                          case 19:
                            _context.next = 23;
                            break;

                          case 21:
                            next = JSON.parse(record[nextIndex]);

                            if (/object Object/.test(Object.prototype.toString.call(next))) {
                              next = next.list || null;
                            }

                          case 23:
                            return _context.abrupt("return", {
                              value: value,
                              tags: tags,
                              weight: weight,
                              next: next
                            });

                          case 24:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref.apply(this, arguments);
                  };
                }()));

              case 32:
                records = _context2.sent;
                return _context2.abrupt("return", _construct(Random, _toConsumableArray(records)));

              case 34:
                return _context2.abrupt("return", null);

              case 35:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[9, 15]]);
      }));

      function fromCSVFile(_x) {
        return _fromCSVFile.apply(this, arguments);
      }

      return fromCSVFile;
    }()
    /**
     * Simulates the rolling of dice. A die, or dice if plural, have a given
     * number of sides. The most common real world dice are six sided. The
     * `count` value indicates the number of said dice that should be "rolled"
     * and added together in order. A collection of rolls can be indicated
     * if `repeat` is a number greater than one.
     *
     * Two completely optional twists are also available. First if `dropLowest`
     * is true, the lowest number in a set is dropped before summing or
     * returning. Second, if `individualValues` is true then rather than summing
     * the results of the rolls per set, an array with each die roll will be
     * returned instead; `dropLowest` still functions as expected if individual
     * values are requested.
     *
     * @param {Number} count the number of times each die is rolled in a set
     * @param {Number} sides the number of sides on the die, defaults to 6
     * @param {Number} repeat how many sets to create, defaults to 1
     * @param {Boolean} dropLowest true if the lowest value is dropped one time
     * @param {Boolean} individualValues if true, defaults to false, then rather
     * than summing the values, each element of the returned array will be an
     * array of individual rolls.
     * @return {Array<Number>|Array<Array<Number>>} an array of numbers will be
     * returned, for a total count equal to repeat. If a six-sided die is
     * "rolled" three times and this process is repeated six times, then an
     * array of six numbers between 3 and 18 will be returned. If
     * `individualValues` is true, rather than summed values, an array of array
     * of numbers will be returned instead. `dropLowest` still works as expected
     * in this case
     */

  }, {
    key: "roll",
    value: function roll() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var sides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
      var repeat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var dropLowest = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var individualValues = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var dice = Random.range(1, sides, 1000);
      var results = [];

      for (var i = 0; i < repeat; i++) {
        var set = dice.some(count);
        set.sort(_asArray.numericSort);

        if (dropLowest) {
          set.splice(0, 1);
        }

        results.push(individualValues ? set : set.reduce(function (prev, cur) {
          return prev + cur;
        }, 0));
      }

      return results;
    }
    /**
     * A shortcut for creating a new `Random` instance, setting the weight
     * and optionally adding in values at the newly set weight.
     *
     * @param {Number} defaultWeight a new value to use as a standard weight
     * in a newly created Random() instance.
     * @param  {...any} args any number of arguments to add to the Random
     * instance with the newly calculated weight.
     *
     * @return a new instance of Random with the specified weight and
     * optionally any values added at the new weight.
     */

  }, {
    key: "ofWeight",
    value: function ofWeight() {
      var defaultWeight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEF_STD_WEIGHT;
      var rand = new Random();
      rand.standardWeight = defaultWeight;

      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      rand.add.apply(rand, args);
      return rand;
    }
    /**
     * Given a number range, choose a number randomly from that list. The
     * ranges are inclusive. So from of 1 and to of 6 will generate only
     * values of the set [1,2,3,4,5,6]. Numbers below `from` and above
     * `to` will not be selected.
     *
     * @param {Number} from the starting value of the range of numbers
     * @param {Number} to the ending value of the range of numbers
     * @param {Number} weighing the weight of each items by default
     *
     * @return {Random} the instance of `Random` prefilled with items whose
     * values are numbers from the specified range.
     */

  }, {
    key: "range",
    value: function range() {
      var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
      var weighing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEF_STD_WEIGHT;
      var rand = new Random().addRange(from, to, weighing);
      return rand;
    }
    /**
     * Choose any one item from the list of values supplied to the function.
     * Each value supplied to the function will be appropriately wrapped using
     * a call to `Random.item(value)` thereby giving it a value, weight and
     * tags list.
     *
     * @param  {...any} args a comma separated list of values to choose from
     *
     * @return {mixed} the `value` property value or return result of a
     * function if `value` is a function of the item randomly chosen from the
     * list
     */

  }, {
    key: "one",
    value: function one() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return _construct(Random, args).one();
    }
    /**
     * Same as the static version of `Random.one()` but returning `count`
     * number of instances in an array.
     *
     * @param {Number} count number of random selections to make
     * @param  {...any} args the items from which to make a selection.
     *
     * @return {Array<mixed>} an array of items chosen from the selected
     * list.
     */

  }, {
    key: "some",
    value: function some() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

      for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        args[_key7 - 1] = arguments[_key7];
      }

      return _construct(Random, args).some(count);
    }
    /**
     * Rather than choosing a value from the supplied list, for each value
     * supplied a random property name from that object will instead be
     * returned.
     *
     * @param {Number} count number of random selections to make
     * @param  {...any} objects objects from which to randomly choose a
     * property value name.
     *
     * @return {Array<string>} an array of property names chosen randomly
     * from the list of objects supplied.
     */

  }, {
    key: "keys",
    value: function keys() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      for (var _len8 = arguments.length, objects = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        objects[_key8 - 1] = arguments[_key8];
      }

      var bag = _construct(Random, objects);

      return bag.some(count).map(function (item) {
        return Random.one(Object.keys(item || {}));
      });
    }
    /**
     * Rather than choosing a value from the supplied list, for each value
     * supplied a random property value from that object will instead be
     * returned.
     *
     * @param {Number} count number of random selections to make
     * @param  {...any} objects objects from which to randomly choose a
     * property value.
     *
     * @return {Array<string>} an array of property values chosen randomly
     * from the list of objects supplied.
     */

  }, {
    key: "values",
    value: function values() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      for (var _len9 = arguments.length, objects = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
        objects[_key9 - 1] = arguments[_key9];
      }

      var bag = _construct(Random, objects);

      return bag.some(count).map(function (item) {
        var key = Random.one(Object.keys(item || {}));
        var val = item[key];
        return val;
      });
    }
    /**
     * Rather than choosing a value from the supplied list, for each value
     * supplied a random property name and value from that object will instead
     * be returned.
     *
     * @param {Number} count number of random selections to make
     * @param  {...any} objects objects from which to randomly choose a
     * property name and value.
     *
     * @return {Array<string>} an array of property names and values chosen
     * randomly from the list of objects supplied.
     */

  }, {
    key: "entries",
    value: function entries() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      for (var _len10 = arguments.length, objects = new Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
        objects[_key10 - 1] = arguments[_key10];
      }

      var bag = _construct(Random, objects);

      return bag.some(count).map(function (item) {
        var key = Random.one(Object.keys(item || {}));
        var val = item[key];
        return [key, val];
      });
    }
    /**
     * Some effort has gone into parsing the supplied values to be smart about
     * how to process them. If *only one item* is supplied, some custom logic is
     * considered.
     *
     * If the item is an array, then its values are used instead
     * If the item has a `length` property then
     *   If the item has a `asArray` getter then use its resulting contents
     *   If the item is not a string, use the contents of calling Array.from()
     *
     * Once all logic has been considered, wrap each item up as a Random.item()
     * result; excepting only if the supplied item has both a value and weight
     * property. If the object has a 'value' and 'weight' property but no 'tags'
     * property, rather than modifying the original, a proxy of the item with
     * a handler that returns an empty array for tags is added.
     *
     * @param {Number} defaultWeight the default weight to apply to arguments
     * processed using this method.
     * @param  {...any} args any value that should be considered to be added
     * to the `Random` set for selection.
     *
     * @return {Array<mixed>} returns an array of properly vetted items for
     * a Random instance to contain
     */

  }, {
    key: "normalizeArgs",
    value: function normalizeArgs(defaultWeight) {
      for (var _len11 = arguments.length, args = new Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
        args[_key11 - 1] = arguments[_key11];
      }

      var Class = this;
      var list = []; // If we are given a single value, it may be more complicated...

      if (args.length === 1) {
        // If the first and only argument is an array, then the list
        // should be its contents
        if (Array.isArray(args[0])) {
          args = _toConsumableArray(args[0]);
        } // If the object appears to known its own length...
        else if (args[0].hasOwnProperty('length')) {
          // ...if that object has an .asArray property...
          if (args[0].hasOwnProperty('asArray')) {
            args = args[0].asArray;
          } else if (typeof args !== 'string') {
            args = Array.from(args[0]);
          }
        }
      }

      var _iterator4 = _createForOfIteratorHelper(args),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var item = _step4.value;

          if (Array.isArray(item)) {
            var _item = _slicedToArray(item, 2),
                value = _item[0],
                weight = _item[1];

            list.push(Class.item(value, weight));
          } else if (item.hasOwnProperty('weight') && item.hasOwnProperty('value')) {
            if (!item.hasOwnProperty('tags')) {
              list.push(new Proxy(item, {
                get: function get(target, property, receiver) {
                  if (property === 'tags') {
                    return [];
                  } else {
                    return Reflect.get(target, property, receiver);
                  }
                }
              }));
            } else {
              list.push(item);
            }
          } else {
            list.push(Class.item(item, defaultWeight || DEF_STD_WEIGHT, [STD_WEIGHT]));
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return list;
    }
  }, {
    key: "usingItem",
    value: function usingItem(itemClass) {
      if (~(itemClass === null || itemClass === void 0 ? void 0 : itemClass.prototype) instanceof _item2.Item) {
        return Random;
      }

      return eval("(\n      class Random_".concat(itemClass.name, " extends Random {\n        static item(...args) { return new itemClass(...args) }\n      }\n    )"));
    }
  }]);

  return Random;
}(Symbol.toStringTag);
/** Standard default weight value used through code for new items */


exports.Random = Random;
var DEF_STD_WEIGHT = new Number(1);
/** A constant symbol used as a tag for standard weight items */

exports.DEF_STD_WEIGHT = DEF_STD_WEIGHT;
var STD_WEIGHT = Symbol('Standard Default Random Item Weight');
/** A generated symbol applied to addRange(...) items */

exports.STD_WEIGHT = STD_WEIGHT;

var GEN_RANGE = function GEN_RANGE(from, to) {
  return Symbol["for"]("Generated Range Item from ".concat(from, " to ").concat(to));
};
/**
 * When employing Random.fromCSV(), one of the arguments required
 * is the layout of columns and how to work with them. Below are some
 * constants to help that definition.
 */

/** Indicates the column in question is a number representing weight */


exports.GEN_RANGE = GEN_RANGE;
var COL_WEIGHT = Symbol('Column represents numerical weight');
/** Indicates the column in question is a string representing value */

exports.COL_WEIGHT = COL_WEIGHT;
var COL_VALUE_STRING = Symbol('Column represents string values');
/** Indicates the column in question is a JSON string to be constructed */

exports.COL_VALUE_STRING = COL_VALUE_STRING;
var COL_VALUE_JSON = Symbol('Column represents parseable JSON');
/** Indicates the column in question is either JSON or a raw String */

exports.COL_VALUE_JSON = COL_VALUE_JSON;
var COL_VALUE_MIXED = Symbol('Column represents string or JSON value');
/** Indicates the column in question is a CSV string of tags to apply */

exports.COL_VALUE_MIXED = COL_VALUE_MIXED;
var COL_TAGS_CSV = Symbol('Column represents CSV as string tag names');
/** Indicates the column in question is a string whose value is a tag */

exports.COL_TAGS_CSV = COL_TAGS_CSV;
var COL_TAG_STRING = Symbol('Column representing a single tag string');
/** 
 * Indicates the column in question is a file path string to a CSV file
 * that should be converted to a live Random instance.
 */

exports.COL_TAG_STRING = COL_TAG_STRING;
var COL_NEXT_FILEPATH = Symbol('Column represents a path to a CSV file for a linked Random');
/** Default set of columns for use with Random.fromCSV() */

exports.COL_NEXT_FILEPATH = COL_NEXT_FILEPATH;
var COLS_DEFAULT = [COL_WEIGHT, COL_VALUE_MIXED, COL_TAGS_CSV];
/** Default set of columns for nested tables when using Random.fromCSV() */

exports.COLS_DEFAULT = COLS_DEFAULT;
var COLS_NESTED = [COL_WEIGHT, COL_VALUE_MIXED, COL_NEXT_FILEPATH];
/** Set of columns with strict string values */

exports.COLS_NESTED = COLS_NESTED;
var COLS_STRING_VALUES = [COL_WEIGHT, COL_VALUE_STRING, COL_TAGS_CSV];
/** Set of columns with strict JSON only values */

exports.COLS_STRING_VALUES = COLS_STRING_VALUES;
var COLS_JSON_VALUES = [COL_WEIGHT, COL_VALUE_JSON, COL_TAGS_CSV];
/** 
 * Indicates the column in question is a JSON string to be constructed 
 * and passed as args to `new Random()`. Note this means that if an array
 * is supplied, it will be used as params via `new Random(...JSON.parse(val))`
 * whereas if it is an object, the object should contain a list property
 * whose contents will be supplied to `new Random(listPropertyContents)`
 */

exports.COLS_JSON_VALUES = COLS_JSON_VALUES;
var COL_NEXT_JSON = Symbol('Column represents JSON data for a new Random');
/**
 * Deconstructs a `Symbol` generated using `GEN_RANGE` and returns an
 * array with the `from` and `to` values used to generate the supplied
 * symbol
 *
 * @param {Symbol} symbol a symbol generated using `GEN_RANGE`
 *
 * @return {Array<Number>} an array of two values used in the original
 * call to GEN_RANGE.
 */

exports.COL_NEXT_JSON = COL_NEXT_JSON;

var GEN_RANGE_VALS = function GEN_RANGE_VALS(symbol) {
  return Array.from(/.*(\b\d+\b).*(\b\d+\b)/.exec(symbol.toString())).slice(1);
};
/*
module.exports = {
  default: Random,

  Random,
  isNumber,
  numericSort,
  provideGetter,

  STD_WEIGHT,
  DEF_STD_WEIGHT,
  GEN_RANGE,
  GEN_RANGE_VALS,

  COLS_DEFAULT,
  COLS_DEFAULT_OBJ,
  COLS_NESTED,
  COL_WEIGHT,
  COL_VALUE_STRING,
  COL_VALUE_JSON,
  COL_TAGS_CSV,
  COL_TAG_STRING,
  COL_NEXT_FILEPATH,
  COL_NEXT_JSON,
}
*/


exports.GEN_RANGE_VALS = GEN_RANGE_VALS;