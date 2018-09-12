# weighted-randoms

## Overview
Weighted randoms solves a problem that has been solved, resolved and further iterated on by me several times over. The primary purpose of the package is to take my latest iteration of choosing a random item easily and, in some cases, choose that value in a manner that is somewhat uneven as compared to the other options being selected from.

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

## Principals
Items in the selection set are all assigned a weight. By default this weight is the integer `1` but can be any `Number`. Floating point numbers are also valid and mixing is ok as well. The greater the weight, the more likely the item will be chosen. 

The library accomplishes this without wasting memory with large gaps and is flexible enough to be used with varying types of data sets.  

## Complete Docs
# COMING SOON!