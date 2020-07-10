// pages/index/competition/competition-main/competition-main.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    cancel: false

  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    var user_id = wx.getStorageSync("index_user_info").user_id;
    that.setData({
      host: host,
      user_id: user_id,
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        app.func.req('get_sign_one', { user_id: that.data.user_id }, 'GET', function (res) {
          console.log("20200705res", res);
          that.setData({
            items: res
          })  
        });
        app.func.req('get_sign_two', { user_id: that.data.user_id }, 'GET', function (res) {
          console.log("20200705res", res);
          that.setData({
            item: res
          })  
        });
      },
    })
    that.getDetail();
  },
  getDetail: function () {
    var that = this;
        app.func.req('get_draft', { openid: that.data.openid, pageSize: 1000, page: 1 }, 'GET', function (res) {
      that.setData({
        infoList: res,
      })
    });
  },

  enroll: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../competition-regist/competition-regist',
    })
  },

  look: function (e) {
    var that = this;
    if (that.data.items == null & that.data.item == null) {
    wx.navigateTo({
      url: '../competition-main/competition-main',
    })
  }else{
    wx.navigateTo({
      url: '../competition-view/competition-view',
    })
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