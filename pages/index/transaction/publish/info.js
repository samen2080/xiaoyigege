// pages/index/transaction/publish/info.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['请选择'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    that.setData({
      host: host,
      old_id: options.old_id
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      },
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.price.length <= 0) {
      wx.showToast({
        title: '金额不能为空！',
        icon: 'none'
      })
    } else if (e.detail.value.link_name.length <= 0) {
      wx.showToast({
        title: '联系人不能为空！',
        icon: 'none'
      })
    } else if (e.detail.value.link_mobile.length <= 0) {
      wx.showToast({
        title: '联系电话不能为空！',
        icon: 'none'
      })
    } else if (that.data.region.length <= 1) {
      wx.showToast({
        title: '请选择区域',
        icon: 'none'
      })
    } else if (e.detail.value.link_address.length <= 0) {
      wx.showToast({
        title: '地址不能为空！',
        icon: 'none'
      })
    } else {
      app.func.req('publish_oldgoods_add', { openid: that.data.openid, old_id: that.data.old_id, old_money: e.detail.value.price, old_contacts: e.detail.value.link_name, old_phone: e.detail.value.link_mobile, old_area: that.data.region.join(","), old_address: e.detail.value.link_address }, 'POST', function (res) {
        // console.log(res);
        if (res.code == 200){
          wx.navigateTo({
            url: 'success?old_id=' + res.old_id,
          })
        }
      });
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