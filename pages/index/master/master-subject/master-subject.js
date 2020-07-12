// pages/index/master/master-subject/master-subject.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    subList: [
      { id: 1, pic: '/images/huati1.png', name: '#话题名称#', post: '50', number:60 },
      { id: 2, pic: '/images/huati1.png', name: '#话题名称#', post: '20', number: 60 },
      { id: 3, pic: '/images/huati1.png', name: '#话题名称#', post: '30', number: 60 }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    that.setData({
      host: host,
      master_id: options.master_id
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        that.getDetail();
        that.getFocus();
      },
    })
  },
  // 大师信息
  getDetail: function () {
    var that = this;
    app.func.req('get_list', { query: 1, id: that.data.master_id, openid: that.data.openid }, 'GET', function (res) {
      // console.log(res);
      that.setData({
        user_id: res.user_id,
        user_headimg: res.user_headimg,
        user_nickname: res.user_nickname,
        user_skilled: res.user_skilled,
        is_follow: res.follow
      })
    });
  },
  // 话题列表
  getFocus: function () {
    var that = this;
    app.func.req('great_dynamic', { pageSize: 100, page: 1, in_user_id: that.data.master_id, query: 2, openid: that.data.openid }, 'GET', function (res) {
      // console.log(res);
      var subList = res;
      that.setData({
        subList: subList
      })
    });
  },

  // 大师关注/取消
  masterFocus: function () {
    var that = this;
    app.func.req('follow_user', { openid: that.data.openid, fo_followed_id: that.data.master_id }, 'POST', function (res) {
      // console.log(res);
      that.getDetail();
      that.getFocus();
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