// pages/testqr/testqr.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },
  callQRcode: function () {
    console.log("callqrcode")
    wx.scanCode({
      success: (res) => {
        console.log("res")
        var data = res.result;
        var str = "promotion.coupon.code.yingwumeijia.com";
        var arr = null;
        if (data.indexOf(str) > -1) {
          arr = data.split(str);
          var api = "https://preconapi.yingwumeijia.com/activity/coupon/use?couponCode=" + arr[1];

          wx.request({
            url: api, //仅为示例，并非真实的接口地址
            method: "POST",
            success: function (res) {
              if (res.data.succ) {
                wx.showToast({
                  title: "签到成功",
                  image: "../images/download_close_ico@3x.png",
                  duration: 3000,
                  mask: true
                });
              }
              else {
                wx.showToast({
                  title: res.data.message,
                  image: "../images/download_close_ico@3x.png",
                  duration: 3000,
                  mask: true
                });
              }
            }
          })
        }
      },
      fail: ((res) => {
        console.log("fail", res)
      })
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})