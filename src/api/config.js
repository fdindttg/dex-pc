let app = {
  baseUrl: 'https://admin.tetherv.xyz/api/',
  wsUrl: 'wss://admin.ku-coins.com:2346'
}

if (process.env.NODE_ENV == 'production') {
  app.wsUrl = 'wss://admin.vssdtd.com:2346'
  app.baseUrl = 'https://admin.vssdtd.com/api/'
}

export default app
