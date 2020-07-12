// pages/index/school/school-show/school-show.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    current:0
  },
  swiperChange:function(e){
    this.setData({
      current: e.detail.current
    })
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
      },
    })
    // 鼓校专区
    app.func.req('get_list', { query: 2, id: options.dr_id, openid: that.data.openid}, 'GET', function (res) {
      // console.log(res);
      that.setData({
        dr_name: res.dr_name,
        dr_address: res.dr_address,
        dr_intro: res.dr_intro,
        imgUrls: res.dr_img,
        lat: res.lat,
        lng: res.lng
      })
    });
  },

  fullSize: function (e) {
    var src = e.currentTarget.dataset.src;
    for (var i = 0; i < this.data.imgUrls.length; i++) {
      this.data.imgUrls[i] = this.data.host + this.data.imgUrls[i];
    }
    //图片预览
    wx.previewImage({
      current: src,
      urls: this.data.imgUrls
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