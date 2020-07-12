// pages/index/transaction/publish/category.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catArr: ['全部','机械', '电气','现场应用', '维保', 'CAD', 'UG造型设计', ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 选择分类
  catSelect: function (e) {
    var that = this;
    var index = e.target.dataset.id;
    this.setData({
      catTxt: that.data.catArr[index]
    })
    wx.setStorage({
      key: 'category',
      data: {
        old_type: index + 1,
        catTxt: that.data.catArr[index]
      },
      success:function(){
        wx.navigateBack({
          delta: 1
        })
      }
    })
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