/**
 * If the value supplied is actually a number, basically finite values that
 * can be parsed as floats and are not `NaN` will cause this function to
 * return true
 *
 * @param {mixed} value any value that should be tested for numberhood
 *
 * @return {Boolean} true if the value is not `NaN` and can be parsed as
 * a float
 */
const isNumber = (value) => !Number.isNaN(parseFloat(value)) && isFinite(value)

/**
 * The `sort` method on `Array` instances sorts alphabetically rather than
 * numerically. Can be a problem when we specifically wish to sort by
 * numbers. This method does so with a deliberate soft equals for when
 * checking if `a` and `b` are equal. The soft equal is to allow for cases
 * where `5 == new Number(5)`.
 *
 * This function sorts the numeric keys in ascending order.
 *
 * @param {Number} a the left component to compare
 * @param {Number} b the right component to compare
 *
 * @return {Number} -1 on if `a` is less than `b`, 0 if they are equal and
 * 1 if `a` > `b`.
 *
 * @throws an error if both a and b are not finite values.
 */
const numericSort = (a,b) => {
  if (!isNumber(a) || !isNumber(b)) {
    throw new Error("numericSort should only be used on numbers")
  }

  let left = Number(a)
  let right = Number(b)

  if (left < right)   { return -1 }
  if (left == right) { return 0 }  // double equals are deliberate
  if (left > right)   { return 1 }
}

/**
 * This function wraps numericSort in a function that swaps the
 * direction of the default numeric sorting routine, i.e. sorts
 * the supplied numbers in descending order.
 *
 * @param {Array<number|Number>} args a left value and right value
 * typically, subsequent parameters are ignored by `Array.sort()`
 * @return {number} -1, 0, or 1 as is expected for a sort routine
 */
const reverseNumericSort = (...args) => {
  return -1 * numericSort(...args)
}

/**
 * A constant used to define the various options that can be passed
 * to `asArray()` in order to determine how to sort the numeric keys
 * of the supplied array.
 */
const SortOptions = {
  ASCENDING: 1,
  DESCENDING: -1,
}

/**
 * This function takes an object that has numeric keys and from that
 * object, in order, creates a normally index'ed array. So given an
 * object such as:
 * ```
 * let object = { '-23': 'c', 5: 'a', 123: 't' }
 * ```
 *
 * You can invoke `asArray()` and get the following
 *
 * ```
 * asArray(object) // [ 'c', 'a', 't' ]
 * ```
 *
 * Calling asArray() does not mutate the object supplied. Rather a
 * Proxy instance is created to wrap it and allow for the conversion to
 * a bonafide array.
 *
 * @param {Object} object any JavaScript object that can be iterated over
 * that contains at least a property that is a finite value (i.e. number)
 * @param {number} direction if `SortOptions.ASCENDING` or 1 is supplied,
 * which is the default, keys with a lower numeric value will be earlier
 * in the generated array. If `SortOptions.DESCENDING` or -1 is supplied,
 * the opposite will occur.
 * @return an actual array instance with all previous finite values
 * appearing in numerical order in the returned array.
 */
function asArray(object, direction = SortOptions.ASCENDING) {
  let finiteKeys = Object.keys(object)
    .filter(key => isFinite(key))
    .map(num => Number(num))

  finiteKeys.sort(
    SortOptions.ASCENDING == direction
      ? numericSort
      : reverseNumericSort
  )

  let proxy = new Proxy(object, {
    get(t, p, r) {
      if (typeof p === 'symbol') {
        return Reflect.get(t, p, r)
      }

      if (p === 'length') {
        return finiteKeys.length
      }

      if (isFinite(p) && p >= 0 && p < finiteKeys.length) {
        let key = finiteKeys[p]
        let result = t[p] || t[key]

        return result
      }
      else {
        return Reflect.get(t, p, r)
      }
    }
  })

  return Array.from(proxy)
}

/**
 * Adds a `asArray` getter to the object in question. If the object
 * supplied is a function or class, its instances will bear the new
 * getter property. If the supplied object does not have a `prototype`
 * property, then the geter is applied directly to the object supplied
 *
 * @method provideGetter
 *
 * @param {Function|Object} to see above; the value to receive a new
 * `asArray` getter
 * @param {string} [as='asArray'] defaulting to the value `asArray`, the
 * name of the injected getter can be supplied by the caller.
 * @param {boolean} force if true, no autodetection of function or class
 * takes place and the resulting getter is blindly applied to the target
 */
function provideGetter(to, as = 'asArray', force = false, contents) {
  let target = to

  // Set proper defaults
  contents = contents || '(arguments[0])'

  if (!force && to?.prototype) {
    target = to.prototype
    contents = '(this)'
  }

  Object.defineProperty(target, as, {
    get() {
      return asArray(eval(contents))
    }
  })
}

/** Export each function separately */
export { isNumber, numericSort, reverseNumericSort, provideGetter, asArray }

/** Export the primary function as the default behavior */
export default asArray
