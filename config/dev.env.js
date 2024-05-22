'use strict'

// const merge = require('webpack-merge')
// const prodEnv = require('./prod.env')

// // 编译时的全局常量
// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"'
// })

// 编译时的全局常量

let BASE_DOMAIN = 'admin.tetherv.xyz'
let MOBILE_URL = 'https://tetherv.xyz'
let KF_URL = 'https://t.me/exbess'
let DOWNLOAD_URL = 'https://www.tetherv.xyz'
module.exports = {
  NODE_ENV: '"development"',
  BASE_URL: '"https://' + BASE_DOMAIN + '"',
  API_URL: '"https://' + BASE_DOMAIN + '/api/"',
  WS_URL: '"wss://' + BASE_DOMAIN + ':2346"',
  WS1_URL: '"wss://' + BASE_DOMAIN + '/ws1"',
  WS2_URL: '"wss://' + BASE_DOMAIN + '/ws2"',
  MOBILE_URL: '"' + MOBILE_URL + '"',
  KF_URL: '"' + KF_URL + '"',
  DOWNLOAD_URL: '"' + DOWNLOAD_URL + '"'
}
