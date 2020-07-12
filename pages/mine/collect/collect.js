// pages/mine/collect/collect.js
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
  // 获取列表
  getList: function () {
    var that = this;
    app.func.req('my_collect', { openid: that.data.openid }, 'GET', function (res) {
      // console.log(res);
      that.setData({
        coList: res
      })
    });
  },
  // 取消收藏
  collect:function(e){
    var that = this;
    app.func.req('collect', { coll_type: 2, coll_user_id: that.data.openid, coll_good_id: e.currentTarget.dataset.id }, 'POST', function (res) {
      // console.log(res);
      if(res.code == 200){
        that.getList();
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