// pages/index/school/school.js
const app = getApp()
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolList: []
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
      success: function (res) {
        that.setData({
          openid: res.data
        })
        that.getList();
      },
    })    
  },

  getList:function(){
    var that = this;
    app.func.req('get_list', { query: 2, openid: that.data.openid, pageSize: 10, page: page }, 'GET', function (res) {
      // console.log(res);
      that.setData({
        schoolList: that.data.schoolList.concat(res)
      })
    });
  },
  
  // 搜索
  formSubmit:function(e){
    var that = this;
    that.search(e.detail.value.search);
  },
  bindconfirm: function (e) {
    var that = this;
    that.search(e.detail.value);
  },
  search: function (school_name) {
    var that = this;
    app.func.req('search_school', { school_name: school_name }, 'GET', function (res) {
      // console.log(res);
      that.setData({
        schoolList: res
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
    page++;
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})