//app.js
//this is a comment
var http = require('utils/config.js'); //接口配置
console.log("http:", http)
var userInfo = {};
App({
  onLaunch: function () {
    console.log("hello")
  },
  
  globalData: {
    userInfo: null,
    host: 'https://www.xqtechinfo.com/eduhome/',
    appid: 'wx9cc83ccf37fcf826',
    secret: 'f86787cb07a2db89df7cc795a12aeef0',
  },

  func: {
    req: http.req
  },
})