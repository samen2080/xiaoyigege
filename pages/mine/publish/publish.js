// pages/mine/publish/publish.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    items: [],
    num:0,
    hidden: true,
    onhidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    that.setData({
      host: host
    })
  },
  getData: function () {
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        app.func.req('release_goods', { openid: res.data, type: that.data.currentTab + 1}, 'GET', function (res) {
          // console.log(res);
          that.setData({
            items: res,
            sheight: 322 * res.length
          })
        });
      },
    })
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.detail.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.detail.current
      })
      that.getData();
    }

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
    }
  },

  // 下架
  removePro: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.oldid;
    that.setData({
      num: index,
      hidden:false
    })
    
  },

  // 取消下架
  removeCancel:function(e){
    var that = this;
    that.setData({
      hidden: true,
      onhidden: true
    })
  },

  // 确定下架
  removeSure: function (e) {
    var that = this;
    var num = e.currentTarget.dataset.num;
    that.published(num,1);
    that.setData({
      hidden: true
    })
  },

  // 上架
  onPro: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.oldid;
    that.setData({
      num: index,
      onhidden: false
    })
  },

  // 确定上架
  onSure: function (e) {
    var that = this;
    var num = e.currentTarget.dataset.num;
    that.published(num,2);
    that.setData({
      onhidden: true
    })
  },

  // 上架/下架
  published: function (old_id,is_published) {
    var that = this;
    app.func.req('save_release_goods', { old_id: old_id, is_published: is_published }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
        that.getData();
      }
    });
  },

  // 发布商品
  publish:function(){
    wx.navigateTo({
      url: '../../index/transaction/publish/publish',
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
    this.getData();  
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