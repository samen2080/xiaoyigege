// pages/mine/mine.js
const app = getApp()
var template = require('../../template/template.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signInShow : 'none',
    // isSign: false
  },

  signIn:function(e){
    var that = this;
    app.func.req('checkin', { openid: that.data.openid }, 'POST', function (res) {
      // console.log(res);
      if(res.code == 200){
        that.setData({
          signInShow: 'block',
          day: res.day
        })
        that.getUser();
      } else if (res.code == 40004) {
        wx.showToast({
          title: '不能重复签到哦~',
          icon: 'none'
        })
      }
    });    
  },

  closeSignIn: function (e) {
    var that = this;
    that.setData({
      signInShow: 'none',
      // isSign: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 2, this);   
  },
  getUser: function () {
    var that = this;
    var user_identity = wx.getStorageSync("user_info").user_identity;
    app.func.req('get_user', { openid: that.data.openid }, 'GET', function (res) {
      // console.log(res);
      that.setData({
        userInfo: res,
        user_identity: user_identity
      })
    });
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
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        that.getUser();
      },
      fail: function () {
        wx.redirectTo({
          url: '../start/start',
        })
      }
    })   
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