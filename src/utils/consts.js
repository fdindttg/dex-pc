export default {
  install(Vue, options) {
    Vue.prototype.Globals = {
      Status: {
        // 充提记录
        Funding: {
          PENDING: 0, // 审核中
          SUCCESS: 1, // 成功
          FAIL: 2 // 失败
        },
        Transfer: {
          SUCCESS: 1,
          FAIL: 2
        }
      },
      mobileUrl: process.env.MOBILE_URL,
      Server: {
        Path: {
          BASE: process.env.BASE_URL,
          API: process.env.API_URL,
          WS: process.env.WS1_URL,
          WS1: process.env.WS2_URL
        }
      }
    }
  }
}
