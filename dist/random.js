"use strict";

var _item2 = require("./item");

var _asArray = require("./asArray");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Random is quick class that expertly handles weighted randoms in your code
 * in an efficient way. It supports objects that sport
 */
var Random =
/*#__PURE__*/
function () {
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
    key: "reweighStandardItems",

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
    value: function reweighStandardItems() {
      var newStandardWeight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (newStandardWeight) {
        this.standardWeight = newStandardWeight;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (item.tags && Array.isArray(item.tags) && item.tags.includes(STD_WEIGHT)) {
            item.weight = this.standardWeight;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
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

      var Class = this.constructor;
      var asc = Number(from) < Number(to);
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
     * @return {mixed} the value of the randomly, possibly randomly weighted,
     * generated item. If the item's `value` property is a function, the
     * result of that function is returned instead.
     */

  }, {
    key: "one",
    value: function one() {
      var index = Math.random() * this.size;
      var count = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;

          if (index < item.weight + count) {
            if (/\[object Function\]/.test({}.toString.apply(item.value))) {
              return item.value();
            }

            return item.value;
          }

          count += item.weight;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
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
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.list[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var item = _step3.value;
          size += item.weight;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return size;
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

      var items = bag.some(count).map(function (item) {
        return Random.one(Object.keys(item || {}));
      });
      return items;
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

      var items = bag.some(count).map(function (item) {
        var key = Random.one(Object.keys(item || {}));
        var val = item[key];
        return val;
      });
      return items;
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

      var items = bag.some(count).map(function (item) {
        var key = Random.one(Object.keys(item || {}));
        var val = item[key];
        return [key, val];
      });
      return items;
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

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = args[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
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
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
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
}();
/** Standard default weight value used through code for new items */


var DEF_STD_WEIGHT = new Number(1);
/** A constant symbol used as a tag for standard weight items */

var STD_WEIGHT = Symbol('Standard Default Random Item Weight');
/** A generated symbol applied to addRange(...) items */

var GEN_RANGE = function GEN_RANGE(from, to) {
  return Symbol.for("Generated Range Item from ".concat(from, " to ").concat(to));
};
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


var GEN_RANGE_VALS = function GEN_RANGE_VALS(symbol) {
  return Array.from(/.*(\b\d+\b).*(\b\d+\b)/.exec(symbol.toString())).slice(1);
};

module.exports = {
  default: Random,
  Random: Random,
  isNumber: _asArray.isNumber,
  numericSort: _asArray.numericSort,
  STD_WEIGHT: STD_WEIGHT,
  DEF_STD_WEIGHT: DEF_STD_WEIGHT,
  GEN_RANGE: GEN_RANGE,
  GEN_RANGE_VALS: GEN_RANGE_VALS
};