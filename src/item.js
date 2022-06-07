import { DEF_STD_WEIGHT, STD_WEIGHT, Random } from './random'

export class Item {
  constructor(
    value = 1, 
    weight = DEF_STD_WEIGHT, 
    tags = [], 
    force = false, 
    next = null, 
    postProcess = null
  ) {
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

    Object.assign(this, { value, weight, tags, next, postProcess })
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
   * This value, if an instance of `Random` will cause `next.one()` to be
   * called if this item is selected. This is a method that allows one
   * choice to trigger another choice.
   * 
   * @type {Random}
   */
  next = null

  /**
   * If the item in question has a `postProcess` property and that property
   * is a function, then after all processing, including subsequently
   * triggered choices due to the presence of `next` properties, are all done,
   * then `postProcess(value)` is invoked. The result is then returned instead
   * of `.value` from this item.
   * 
   * @type {function}
   */
  postProcess = null

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
