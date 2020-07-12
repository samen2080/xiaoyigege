// pages/index/transaction/buy/buy.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tra_mobile:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    that.setData({
      host: host,
      old_id: options.old_id
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      },
    })
    app.func.req('purchase_goods', { old_id: options.old_id }, 'GET', function (res) {
      // console.log(res);
      that.setData({
        old_info: res
      })
    });
  },
  bindinput:function(e){
    var that = this;
    that.setData({
      tra_mobile: e.detail.value
    })
  },
  // 支付
  pay: function (e) {
    var that = this;
    if (that.data.tra_mobile.length <= 0 ){
      wx.showToast({
        title: '联系方式不能为空',
        icon: 'none'
      })
    } else {
      app.func.req('goods_pay', { openid: that.data.openid, tra_old_id: that.data.old_info.old_id, tra_name: '', tra_phone: that.data.tra_mobile, tra_amount: that.data.old_info.old_money, old_user_id: that.data.old_info.old_user_id}, 'POST', function (res) {
        // console.log(res);
        if(res.code == 200){
          wx.navigateTo({
            url: 'success?tra_id=' + res.order_sn + '&tel=' + res.tel,
          })
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})