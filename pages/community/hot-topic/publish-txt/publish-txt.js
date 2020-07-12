// pages/community/hot-topic/publish-txt/publish-txt.js
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
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data,
          topic_id: options.topic_id
        })
      },
    })
  },

  paySelect: function (e) {
    // console.log(e);
    this.setData({
      id: e.target.dataset.id
    })
  },

  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 发布
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.in_name.length <= 0) {
      wx.showToast({
        title: '标题不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.in_content.length <= 0) {
      wx.showToast({
        title: '内容不能为空!',
        icon: 'none'
      })
    } else if (that.data.id == 2 && e.detail.value.in_money.length <= 0) {
      wx.showToast({
        title: '请设置鼓币!',
        icon: 'none'
      })
    } else {
      app.func.req('add_invitation', { openid: that.data.openid, in_type: 1, in_name: e.detail.value.in_name, in_content: e.detail.value.in_content, in_append: '', is_money: that.data.id, set_currency: e.detail.value.in_money, topic_id: that.data.topic_id}, 'POST', function (res) {
        // console.log(res);
        if(res.code == 200){
          wx.showToast({
            title: '发布成功!',
            icon: 'success',
            success:function(){
              wx.navigateBack({
                delta: 1
              })
            }
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