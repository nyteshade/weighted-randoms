import { Item } from './item'
import { provideGetter, numericSort, isNumber } from './asArray'
import { parse } from 'csv-parse'
import FS from 'fs'
import Path from 'path'
import { promisify } from 'util'
import { string } from 'yargs'

/**
 * Random is quick class that expertly handles weighted randoms in your code
 * in an efficient way. It supports objects that sport
 */
export class Random {
  /**
   * Creates a new instance of Random which can be used to generate a random
   * selection from the choices it is aware of. Each choice can be weighted
   * differently than its peers.
   *
   * @param  {...any} list
   */
  constructor(weightIfFirstAndFinite, ...list) {
    this.list = []

    if (isNumber(weightIfFirstAndFinite)) {
      this.standardWeight = Number(weightIfFirstAndFinite) || DEF_STD_WEIGHT
    }
    else {
      this.standardWeight = DEF_STD_WEIGHT

      if (
        weightIfFirstAndFinite !== undefined &&
        weightIfFirstAndFinite !== null
      ) {
        list = [weightIfFirstAndFinite].concat(list)
      }
    }

    this.list = this.constructor.normalizeArgs(this.standardWeight, ...list)
  }

  /**
   * When items are supplied without a specified weight, this is the
   * weight applied to them when added to the internal list. This getter
   * retrieves the current value for this instance.
   *
   * @return {Number} the current default weight, or 1.0 if unchanged
   */
  get standardWeight() {
    return this[STD_WEIGHT]
  }

  /**
   * When items are supplied without a specified weight, this is the
   * weight applied to them when added to the internal list. This setter
   * applies a new value for this instance.
   *
   * @param {Number} value the current default weight, or 1.0 if unchanged
   */
  set standardWeight(value) {
    if (isNumber(value)) {
      this[STD_WEIGHT] = Number(value)
      this.reweighStandardItems()
    }
  }

  /**
   * The size property determines the total weight of all the possibilities
   * within the list. Each item has a weight and this value is the sum of all
   * the items' individual weights combined.
   *
   * @return {Number} total weight of all choices
   */
  get size() {
    let size = 0

    for (let item of this.list) {
      size += item.weight
    }

    return size
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
  reweighStandardItems(newStandardWeight = null) {
    if (newStandardWeight) {
      this.standardWeight = newStandardWeight
    }

    for (let item of this.list) {
      if (
        item.tags &&
        Array.isArray(item.tags)
        && item.tags.includes(STD_WEIGHT)
      ) {
        item.weight = this.standardWeight
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
  add(...items) {
    let list = Random.normalizeArgs(this.standardWeight, ...items)
    this.list = this.list.concat(list)

    return this
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
  addRange(from = 0, to = 5, withWeight = null) {
    if (!isNumber(from) || !isNumber(to)) {
      throw new Error('Number ranges must be numeric')
    }

    const asc = Number(from) < Number(to)

    let Class = this.constructor
    let tags = [GEN_RANGE(from, to)]

    if (withWeight === null) {
      withWeight = this.standardWeight
      tags.push(STD_WEIGHT)
    }

    for (
      let i = from;
      (asc && i <= to) || (!asc && i >= to);
      asc ? i++ : i--
    ) {
      this.list.push(Class.item(i, withWeight, tags))
    }

    return this
  }

  /**
   * Synonymous with one(); deprecated; remove before launch
   */
  generate() {
    return this.one()
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
  one() {
    let index = Math.random() * this.size
    let count = 0
    let toString = obj => Object.prototype.toString.apply(obj)
    let isFunction = obj => /object Function/.test(toString(obj))

    for (let item of this.list) {
      if (index < (item.weight + count)) {
        let result = item.value

        if (item.next && item.next instanceof Random) {
          result = item.next
        } 

        if (isFunction(result)) {
          result = result()
        }

        while (result && result instanceof Random) {
          result = result.one()
        }

        let postProcess = item.postProcess

        if (postProcess && isFunction(postProcess)) {
          result = postProcess(result)
        }

        return result
      }
      count += item.weight
    }

    return null
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
  some(count = 3) {
    let items = []

    for (let i = 0; i < count; i++) {
      items.push(this.one())
    }

    return items
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
  static item(...args) {
    return new Item(...args)
  }

  /**
   * Shortcut method that is identical to `new Random(...args).one()`
   *
   * @param  {...any} args the comma separated list of items to choose from;
   * all items will be weighted evenly.
   */
  static from(...args) {
    return new Random(...args).one()
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
  static async fromCSVFile(
    pathToFile, 
    columnData = COLS_DEFAULT, 
    nextColumnData = null,
    skipFirstLine = false
  ) {
    const options = { 
      delimeter: ',', 
      skipEmptyLines: true, 
      comment: '#',
      from_line: skipFirstLine ? 2 : 1
    }
    
    if (FS.existsSync(pathToFile)) {
      const tryParse = (string) => {
        try { return JSON.parse(string) }
        catch(ignored) { return null }
      }

      // Read the contents of the specified CSV file and parse
      // the CSV into an array of records
      let contents = await promisify(FS.readFile)(pathToFile)
      let records
      
      try { records = await promisify(parse)(contents, options) }
      catch (e) { /* Ignored */ }

      if (!records) { 
        return null
      }

      // Determine which columns were specified for values, tags and weight
      // Fetch the value indices
      let stringValueIndex = columnData.indexOf(COL_VALUE_STRING)
      let jsonValueIndex = columnData.indexOf(COL_VALUE_JSON)
      let mixedValueIndex = columnData.indexOf(COL_VALUE_MIXED)

      // Fetch the tag indices
      let csvTagIndex = columnData.indexOf(COL_TAGS_CSV)
      let singleTagIndex = columnData.indexOf(COL_TAG_STRING)

      // Fetch the next property indices
      let nextFileIndex = columnData.indexOf(COL_NEXT_FILEPATH)
      let nextJSONIndex = columnData.indexOf(COL_NEXT_JSON)

      // Normalize the indicies based on searched data
      let weightIndex = columnData.indexOf(COL_WEIGHT)
      let valueIndex = ~stringValueIndex 
        ? stringValueIndex 
        : (~mixedValueIndex ? mixedValueIndex : jsonValueIndex)
      let tagIndex = ~csvTagIndex 
        ? csvTagIndex 
        : (~singleTagIndex ? singleTagIndex : -1)
      let nextIndex = ~nextFileIndex ? nextFileIndex : nextJSONIndex
      let postProcessIndex = columnData.indexOf(COL_POST_PROCESS)

      records = await Promise.all(records.map(async (record) => {
        let value 
        if (~valueIndex) {
          switch (valueIndex) {
            case jsonValueIndex:
              value = tryParse(record[valueIndex]) || null 
              break 

            case mixedValueIndex:
              value = tryParse(record[valueIndex]) || record[valueIndex]
              break

            default:
            case stringValueIndex:
              value = record[valueIndex]              
          }
        }

        let tags = ~tagIndex
          ? (~csvTagIndex
              ? record[tagIndex].trim().split(',').map(tag => tag.trim())
              : [record[tagIndex]]
            )
          : [ STD_WEIGHT ]

        let weight = ~weightIndex 
          ? Number(record[weightIndex]) 
          : DEF_STD_WEIGHT

        let next = null 

        if (~nextIndex) {
          if (~nextFileIndex) {
            if (record[nextIndex]) {
              let path = Path.isAbsolute(record[nextIndex])
                ? record[nextIndex]
                : Path.join(Path.dirname(pathToFile), record[nextIndex])

              next = await Random.fromCSVFile(
                path, 
                nextColumnData || columnData
              )
            }
          }
          else {
            next = JSON.parse(record[nextIndex])

            if (/object Object/.test(Object.prototype.toString.call(next))) {
              next = next.list || null
            }
          }
        }

        let postProcess = null
        if (~postProcessIndex) {
          postProcess = eval(`(function(record){ ${record[postProcessIndex]} })`)
        }

        // Reorder the data to the format that `new Random()` expects
        return { value, tags, weight, next, postProcess }
      }))

      return new Random(...records)
    }

    return null;
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
  static roll(
    count = 1,
    sides = 6,
    repeat = 1,
    dropLowest = false,
    individualValues = false
  ) {
    let dice = Random.range(1, sides, 1000)
    let results = []

    for (let i = 0; i < repeat; i ++) {
      let set = dice.some(count)

      set.sort(numericSort)

      if (dropLowest) {
        set.splice(0, 1)
      }

      results.push((individualValues
        ? set
        : set.reduce((prev, cur) => { return prev + cur }, 0)
      ))
    }

    return results
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
  static ofWeight(defaultWeight = DEF_STD_WEIGHT, ...args) {
    let rand = new Random()

    rand.standardWeight = defaultWeight
    rand.add(...args)

    return rand
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
  static range(from = 1, to = 10, weighing = DEF_STD_WEIGHT) {
    let rand = new Random().addRange(from, to, weighing)

    return rand
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
  static one(...args) {
    return new Random(...args).one()
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
  static some(count = 3, ...args) {
    return new Random(...args).some(count)
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
  static keys(count = 1, ...objects) {
    const bag = new Random(...objects)
    return bag.some(count).map(
      item => Random.one(Object.keys(item || {}))
    )
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
  static values(count = 1, ...objects) {
    const bag = new Random(...objects)
    return bag.some(count).map(item => {
      const key = Random.one(Object.keys(item || {}))
      const val = item[key]

      return val
    })
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
  static entries(count = 1, ...objects) {
    const bag = new Random(...objects)
    return bag.some(count).map(item => {
      const key = Random.one(Object.keys(item || {}))
      const val = item[key]

      return [key, val]
    })
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
  static normalizeArgs(defaultWeight, ...args) {
    let Class = this
    let list = []

    // If we are given a single value, it may be more complicated...
    if (args.length === 1) {
      // If the first and only argument is an array, then the list
      // should be its contents
      if (Array.isArray(args[0])) {
        args = [...args[0]]
      }

      // If the object appears to known its own length...
      else if (args[0].hasOwnProperty('length')) {
        // ...if that object has an .asArray property...
        if (args[0].hasOwnProperty('asArray')) {
          args = args[0].asArray
        }
        else if (typeof args !== 'string') {
          args = Array.from(args[0])
        }
      }
    }

    for (let item of args) {
      if (Array.isArray(item)) {
        let [value, weight] = item
        list.push(Class.item(value, weight))
      }
      else if (
        item.hasOwnProperty('weight') &&
        item.hasOwnProperty('value')
      ) {
        if (!item.hasOwnProperty('tags')) {
          list.push(new Proxy(item, {
            get(target, property, receiver) {
              if (property === 'tags') {
                return []
              }
              else {
                return Reflect.get(target, property, receiver)
              }
            }
          }))
        }
        else {
          list.push(item)
        }
      }
      else {
        list.push(Class.item(
          item,
          defaultWeight || DEF_STD_WEIGHT,
          [STD_WEIGHT]
        ))
      }
    }

    return list
  }

  /**
   * Ensure that instances of Random report themselves as instances
   * of class Random. Testing this is as easy as matching the name 
   * of this class to the results of a call to Object.prototype.
   * toString.call() and passing this instance as the first parameter.
   * 
   * @return {string} the name of the Class this function is part of
   */
  get [Symbol.toStringTag]() {
    return this.constructor.name
  }

  static usingItem(itemClass) {
    if (~itemClass?.prototype instanceof Item) {
      return Random
    }

    return eval(`(
      class Random_${itemClass.name} extends Random {
        static item(...args) { return new itemClass(...args) }
      }
    )`)
  }
}

/** Standard default weight value used through code for new items */
export const DEF_STD_WEIGHT = new Number(1)

/** A constant symbol used as a tag for standard weight items */
export const STD_WEIGHT = Symbol('Standard Default Random Item Weight')

/** A generated symbol applied to addRange(...) items */
export const GEN_RANGE = (from, to) => Symbol.for(
  `Generated Range Item from ${from} to ${to}`
)

/**
 * When employing Random.fromCSV(), one of the arguments required
 * is the layout of columns and how to work with them. Below are some
 * constants to help that definition.
 */

/** Indicates the column in question is a number representing weight */
export const COL_WEIGHT = Symbol('Column represents numerical weight')

/** Indicates the column in question is a string representing value */
export const COL_VALUE_STRING = Symbol('Column represents string values')

/** Indicates the column in question is a JSON string to be constructed */
export const COL_VALUE_JSON = Symbol('Column represents parseable JSON')

/** Indicates the column in question is either JSON or a raw String */
export const COL_VALUE_MIXED = Symbol('Column represents string or JSON value')

/** Indicates the column in question is a CSV string of tags to apply */
export const COL_TAGS_CSV = Symbol('Column represents CSV as string tag names')

/** Indicates the column in question is a string whose value is a tag */
export const COL_TAG_STRING = Symbol('Column representing a single tag string')

export const COL_POST_PROCESS = Symbol(
  'Column represents function body w/record as passed param'
)

/** 
 * Indicates the column in question is a file path string to a CSV file
 * that should be converted to a live Random instance.
 */
export const COL_NEXT_FILEPATH = Symbol(
  'Column represents a path to a CSV file for a linked Random'
)

/** Default set of columns for use with Random.fromCSV() */
export const COLS_DEFAULT = [ COL_WEIGHT, COL_VALUE_MIXED, COL_TAGS_CSV ]

/** Default set of columns for nested tables when using Random.fromCSV() */
export const COLS_NESTED = [ COL_WEIGHT, COL_VALUE_MIXED, COL_NEXT_FILEPATH ]

/** Set of columns with strict string values */
export const COLS_STRING_VALUES = [ COL_WEIGHT, COL_VALUE_STRING, COL_TAGS_CSV ]

/** Set of columns with strict JSON only values */
export const COLS_JSON_VALUES = [ COL_WEIGHT, COL_VALUE_JSON, COL_TAGS_CSV ]

/** 
 * Indicates the column in question is a JSON string to be constructed 
 * and passed as args to `new Random()`. Note this means that if an array
 * is supplied, it will be used as params via `new Random(...JSON.parse(val))`
 * whereas if it is an object, the object should contain a list property
 * whose contents will be supplied to `new Random(listPropertyContents)`
 */
export const COL_NEXT_JSON = Symbol(
  'Column represents JSON data for a new Random'
)

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
export const GEN_RANGE_VALS = (symbol) =>
  Array.from(/.*(\b\d+\b).*(\b\d+\b)/.exec(symbol.toString())).slice(1)

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