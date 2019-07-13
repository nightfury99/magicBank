'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://13.229.122.17/api"',
  FILE_API: '"http://52.221.193.133:4000"',
  MEDIA_PATH: '"http://52.221.193.133"',
  STORAGE_FOLDER: '"gallery"'
})
