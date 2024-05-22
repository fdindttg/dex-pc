'use strict'

//测试
let MOBILE_URL = 'https://tetherv.xyz'
let BASE_DOMAIN = 'admin.tetherv.xyz'
let KF_URL = 'https://xx.chat/'
let DOWNLOAD_URL = 'https://xxx.com/'

module.exports = {
  NODE_ENV: '"production"',
  BASE_URL: '"https://' + BASE_DOMAIN + '"',
  API_URL: '"https://' + BASE_DOMAIN + '/api/"',
  WS_URL: '"wss://' + BASE_DOMAIN + ':2346"',
  WS1_URL: '"wss://' + BASE_DOMAIN + '/ws1"',
  WS2_URL: '"wss://' + BASE_DOMAIN + '/ws2"',
  MOBILE_URL: '"' + MOBILE_URL + '"',
  KF_URL: '"' + KF_URL + '"',
  DOWNLOAD_URL: '"' + DOWNLOAD_URL + '"'
}
