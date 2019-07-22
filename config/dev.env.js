'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://54.169.173.84/api"',
  FILE_API: '"http://54.169.173.84:4000"',
  MEDIA_PATH: '"http://54.169.173.84"',
  STORAGE_FOLDER: '"gallery"',
  MARKER_FOLDER: '"marker"',
})
