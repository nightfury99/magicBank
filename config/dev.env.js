'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://18.136.107.205/api"',
  FILE_API: '"http://18.136.107.205:4000"',
  MEDIA_PATH: '"http://18.136.107.205"',
  STORAGE_FOLDER: '"gallery"',
  MARKER_FOLDER: '"marker"',
})
