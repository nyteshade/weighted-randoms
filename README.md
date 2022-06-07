# weighted-randoms

## Overview
Weighted randoms solves a problem that has been solved, resolved and further iterated on by me several times over. The primary purpose of the package is to take my latest iteration of choosing a random item easily and, in some cases, choose that value in a manner that is somewhat uneven as compared to the other options being selected from.

## Principals
Items in the selection set are all assigned a weight. By default this weight is the integer `1` but can be any `Number`. Floating point numbers are also valid and mixing is ok as well. The greater the weight, the more likely the item will be chosen. 

The library accomplishes this without wasting memory with large gaps and is flexible enough to be used with varying types of data sets.  

## TODO

- [ ] Explain `new Random()`
- [ ] Explain `new Random().generate()`
- [ ] Explain `new Random().one()`
- [ ] Explain `new Random().some()`
- [ ] Explain `new Random().range()`
- [ ] Explain `new Random().add()`
- [ ] Explain `new Random().addRange()`
- [ ] Explain `new Random().size {get}`
- [ ] Explain `new Random().standardWeight {get, set}`
- [ ] Explain `new Random().reweighStandardItems()`
- [X] Explain `Random.one()`
- [ ] Explain `Random.one() in detail`
- [ ] Explain `Random.some()`
- [X] Explain `Random.range()`
- [ ] Explain `Random.range() in detail`
- [ ] Explain `Random.keys()`
- [ ] Explain `Random.values()`
- [ ] Explain `Random.ofWeight()`
- [ ] Explain `Random.roll()`
- [ ] Explain `Random.from()`
- [ ] Explain `Random.item()`
- [ ] Explain `new Item()`

## New Features
As of 1.2.x, the ability to chain a random item selection from subsequent instances of `Random` has been added. This is done by adding a `.next` property to an item in a `Random` instance list. If `.next` is truthy and an instance of `Random` then a loop is created where `.next.one()` is called until the resulting value is no longer an instance of `Random` or is falsey. 

Additionally, a `.postProcess()` function is supported on each `Item` instance. If present and a function, then the final chosen value will be passed as a parameter. The expectation is that the returned value will a potentially modified version of the final chosen value.

Lastly, in 1.2.x, a shell script called `repl.sh` is included that creates a node repl with all the imports already ready for testing. This made my life easier and makes it easier to play with weighted randoms.

## Installation

```sh
npm install --save weighted-randoms
```

## Usage
```js
import { Random } from 'weighted-randoms'

Random.one('apple', 'orange', 'pear') // 'orange'
Random.range(1,10).some()             // [1,5,10]
Random.one(1, [3, 5], 7)              // 3 
```

While these examples are simple and seem to fit the bill, a more complex example is provided. This example can be played with directly through the use of the `repl.js` script or they can be directly `require()'d` or `import'ed`. There is a png in this repo named "Magic Items Table.png". This was taken from an early 1974 copy of Dungeons & Dragons Basic Rules. The png shows the data in question that is to be converted into a random choice with weighted values and sub-table values. There are comments in the code to explain how special cases work, but these come from
the newly provided `next` and `postProcess` properties.

Let's take a look

```sh
$ ./repl.sh
> MagicItemsTable.some(5)
[
  'Sword +1, +2 against Lycanthropes',
  'Potion of Levitation',
  'Protection from Lycanthropes',
  'Protection from Undead',
  'Gauntlets of Ogre Power'
]
>
```

This can also be done with `npm run repl` which gives the following results:

```sh
$ npm run repl

> weighted-randoms@1.2.0 repl
> node ./repl.sh

> MagicItemsTable.some(5)
[
  'Axe +1',
  'Sword +1, +2 against Lycanthropes',
  'Protection from Lycanthropes',
  'Potion of Invisibility',
  'Spell scroll: 3 magic-user/elf spells (any)'
]
>
```

So what's going on here? The file `DnDBasicRulesMagic.js` has all its exports placed into the global scope inside the repl created when `./repl.sh` is executed. If trying to run this does not work in your cloned repo, try adding the command `node` in front of it (i.e. `node ./repl.sh`).

Inside the `DnDBasicRulesMagic.js` file there are 8 exported values

```js
[
  'MagicItemsTable',
  'MiscellaneousMagicTable',
  'PotionsTable',
  'RingsTable',
  'ScrollsTable',
  'SwordsTable',
  'WandsStavesRodsTable',
  'WeaponsArmorTable'
]
```

Each of these exports is an instance of `Random` with items predefined within. Each item in the top level `MagicItemsTable` `Random` instance has a `.next` property. This property in turn has one of the other seven exported `Random` instances as a value.

If an item is chosen that has a `.next` value, it has its `.one()` function invoked to get the next subsequent item. This process continues until the final value is no longer an instance of `Random`. 

Once a final item is chosen, if the original item had a `.postProcess()` function property, it is invoked with the chosen item value. The `.postProcess()` function property takes the chosen item and returns an item; usually a modified version of the previously chosen item.

In the `DnDBasicRulesMagic.js` example, values from the "Rings" and "Potions" tables list effects. It would be unclear if it were a Potion or a Ring unless we prepend the text "Ring of " or "Potion of ", respectively. So a `.postProcess()` function is added to the top level choice for Rings and Potions that prepends the text to whatever item was eventually selected, solving this problem.
