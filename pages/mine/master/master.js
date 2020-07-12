// pages/mine/master/master.js
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
          openid: res.data
        })
      },
    })
  },
  formSubmit:function(e){
    var that = this;
    if (e.detail.value.user_skills.length <= 0){
      wx.showToast({
        title: '请填写擅长乐器!',
        icon: 'none'
      })
    } else if (e.detail.value.user_intro.length <= 0) {
      wx.showToast({
        title: '请输入简介!',
        icon: 'none'
      })
    } else {
      app.func.req('apply_identity', { openid: that.data.openid, user_skilled: e.detail.value.user_skills, user_intro: e.detail.value.user_intro }, 'POST', function (res) {
        // console.log(res);
        if(res.code == 200){
          wx.showToast({
            title: '申请成功！',
            icon:'none',
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