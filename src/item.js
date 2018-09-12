import { DEF_STD_WEIGHT, STD_WEIGHT, Random } from './random'

export class Item {
  constructor(value = 1, weight = DEF_STD_WEIGHT, tags = [], force = false) {
    if (
      typeof value === 'object' &&
      typeof value.value !== 'undefined' &&
      typeof value.weight !== 'undefined' &&
      !force
    ) {
      Object.assign(this, value)
    }

    if (weight === DEF_STD_WEIGHT && !~tags.indexOf(STD_WEIGHT)) {
      tags.push(STD_WEIGHT)
    }

    Object.assign(this, { value, weight, tags })
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
  static from(...args) {
    return new Item(...args)
  }

  /**
   * The value property is any type of JavaScript value, if this property
   * yields a function, the resulting value from the function's execution
   * is used when employed with `Random` instances.
   *
   * @type {mixed}
   */
  value = null

  /**
   * The weight is whatever the system default is, typically `1` unless
   * changed.
   *
   * @type {Number}
   */
  weight = DEF_STD_WEIGHT

  /**
   * By default, and as long as the weight is equal to the `DEF_STD_WEIGHT`
   * instance, the tags array will be populated with a Symbol that can target
   * this `Item` instance as having a standard default weighting; this allows
   * for easy reweighing should the instance need to be customized.
   *
   * @type {Array<mixed>}
   */
  tags = [ STD_WEIGHT ]
}
