// pages/mine/fans/fans.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isfocus:false,
    FansList: []
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
          openid: res.data
        })
        app.func.req('user_follow/2', { openid: res.data }, 'GET', function (res) {
          // console.log(res);
          that.setData({
            FansList: res
          })
        });
      },
    })
  },

  focus:function(e){
    // console.log(e.currentTarget.id);
    for (var i = 0; i < this.data.FansList.length; i++) {
      if (e.currentTarget.id == this.data.FansList[i].user_id) {
        app.func.req('follow_user', { openid: this.data.openid, fo_followed_id: e.currentTarget.id }, 'POST', function (res) {
          if(res.code == 10006){
            wx.showToast({
              title: '关注成功！',
              icon: 'success'
            })
          } else if (res.code == 10007) {
            wx.showToast({
              title: '取消关注成功！',
              icon: 'success'
            })
          }
        });
        if (this.data.FansList[i].follow == 1) {
          this.data.FansList[i].follow = 0;
          var FansList = this.data.FansList;
          this.setData({
            FansList
          })
        } else {
          this.data.FansList[i].follow = 1;
          var FansList = this.data.FansList;
          this.setData({
            FansList
          })
        }
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