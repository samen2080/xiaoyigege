//app.js
var http = require('utils/config.js'); //接口配置
var userInfo = {};
App({
  onLaunch: function () {
    console.log("hello")
  },
  
  globalData: {
    userInfo: null,
    host: 'https://www.xqtechinfo.com/xiaoyigege/',
    appid: 'wx69b14788f69629f6',
    secret: '61279b0a0c72a154f13c4b211d9125f4',
  },

  func: {
    req: http.req
  },
})