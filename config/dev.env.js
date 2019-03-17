'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AUTH_API: '"http://auth.chargeup.asia:1337"',
  BASE_API: '"http://api.chargeup.asia"',
})
