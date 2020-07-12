// pages/index/master/master.js
const app = getApp()
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    masterLis:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    that.setData({
      host: host
    })
    wx.getStorage({
      key: 'openid',
      success: function (open) {
        that.setData({
          openid: open.data
        })
        that.getList();
      },
    })
  },

  getList: function () {
    var that = this;
    app.func.req('get_list', { query: 1, openid: that.data.openid}, 'GET', function (res) {
      // console.log(res);
      that.setData({
        masterLis: that.data.masterLis.concat(res)
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
    // page++;
    // this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})