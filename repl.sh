#!/usr/bin/env node

(async function() {
  const repl = require('node:repl')
  const library = require('./dist')

  const csvSample = await library.Random.fromCSVFile(
    './src/examples/CSV/GeneralMagicItems.csv',
    library.COLS_NESTED
  )

  Object.assign(global, library, { csvSample })

  repl.start({
    prompt: '> ',
    useColors: true,
    useGlobal: true,
  })
})()

