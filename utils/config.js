var host = 'https://www.xqtechinfo.com/eduhome/home/'; 
console.log('config.js is called');
function req(url, data, mway, cb) {
  console.log('config.js req.url', host+url);
  console.log('config.js req.data', data);

    wx.showLoading({
      title: '页面加载中',
    }, 60000)
  wx.request({
    url: host + url,
    data: data,
    method: mway,
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    },
    complete:function(){
      console.log("enter finally")
      wx.hideLoading();
    }
  })
}


module.exports = {
  req: req,
  hostUrl: host
}