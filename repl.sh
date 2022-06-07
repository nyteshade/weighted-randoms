#!/usr/bin/env node

const repl = require('node:repl')
const library = require('./dist')

Object.assign(global, library)

repl.start({
  prompt: '> ',
  useColors: true,
  useGlobal: true,
})
