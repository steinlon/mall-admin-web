'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // For mall project
  // BASE_API: '"http://localhost:8080"'
  // For mall-swarm project
  BASE_API: '"http://localhost:8201/mall-admin"'
})
