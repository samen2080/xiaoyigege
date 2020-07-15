// pages/index/competition-main/competition-view/competition-view.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0
  },
  
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      if (e.target.dataset.current == 0){
        
      } else {
  
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    var host = app.globalData.host;
    var user_id = wx.getStorageSync("index_user_info").user_id;
    that.setData({
      host: host,
      user_id: user_id,
    });

    app.func.req('get_enroll_team', { user_id: user_id }, 'GET', function (res) {
      that.setData({
        itemTeam: res
      })  
    });

    app.func.req('get_enroll_individual', { user_id: user_id }, 'GET', function (res) {
      that.setData({
        itemIndividual: res
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})