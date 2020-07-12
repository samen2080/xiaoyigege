// pages/index/transaction/owner/owner.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    follow:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    that.setData({
      host: host,
      old_user_id: options.owner_id
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        that.getShow();
      },
      fail: function () {
        wx.redirectTo({
          url: '../../../start/start',
        })
      }
    })
    
  },
  getShow:function(){
    var that = this;
    app.func.req('seller_homepage', { old_user_id: that.data.old_user_id, openid: that.data.openid }, 'GET', function (res) {
      // console.log(res);
      that.setData({
        info: res.info,
        focus: res.follow,
        count: res.goods_count,
        proList: res.data
      })
    });
  },
  // 关注/取消
  focus: function (e) {
    var that = this;
    app.func.req('follow_user', { openid: that.data.openid, fo_followed_id: that.data.old_user_id }, 'POST', function (res) {
      // console.log(res);
      that.getShow();
    });
  },
  // 收藏
  collect: function (e) {
    var that = this;
    app.func.req('collect', { coll_type: 2, coll_user_id: that.data.openid, coll_good_id: e.currentTarget.dataset.collid }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
        that.getShow();
      }
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