// pages/mine/focus/focus.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data,
          host: host
        })
        that.getList();
      },
    })
  },
  getList: function () {
    var that = this;
    app.func.req('user_follow/1', { openid: that.data.openid }, 'GET', function (res) {
      // console.log(res);
      that.setData({
        focusList: res
      })
    });
  },
  // 取消关注
  focus: function (e) {
    var that = this;
    for (var i = 0; i < that.data.focusList.length; i++) {
      if (e.currentTarget.id == that.data.focusList[i].user_id) {
        app.func.req('follow_user', { openid: that.data.openid, fo_followed_id: e.currentTarget.id }, 'POST', function (res) {
          // console.log(res);
          if (res.code == 10007) {
            wx.showToast({
              title: '取消关注成功！',
              icon: 'success'
            })
            that.getList();
          }
        });
      }
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