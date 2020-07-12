// pages/mine/info/phone.js
const app = getApp()
var interval = null 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_get_code: '获取验证码',
    input_login_code: '',     //用户输入的验证码
    disabled: true,
    phoneInput: '',
    currentTime: 90 
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
      fail: function (res) {
      }
    })
  },
  phoneInput: function (e) {

    var myreg = /^1\d{10}$/;
    this.setData({
      phoneInput: e.detail.value
    })
    if (e.detail.value.length == 11 && myreg.test(e.detail.value)) {
      clearInterval(interval);
      this.setData({
        show_get_code: '获取验证码',
        disabled: false,
        currentTime: 90
      })
    } else {
      this.setData({
        disabled: true
      })
    }

  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime;
    wx.request({
      //url: 'https://www.zhiweihome.com/zhixiu/stationing/home/getcode',
      url:'https://www.xqtechinfo.com/areohome/home/getcode',
      data: {
        mobile: that.data.phoneInput
      },
      method: "GET", 
      success: function (res) {
        // console.log(res);
        interval = setInterval(function () {
          currentTime--;
          that.setData({
            show_get_code: '重新获取(' + currentTime + ')秒',
            phonecode: res.data.phonecode
          })
          if (currentTime <= 0) {
            clearInterval(interval)
            that.setData({
              show_get_code: '获取验证码',
              currentTime: 90,
              disabled: false
            })
          }
        }, 1000)
      },
    })
  },
  getVerificationCode() {
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
  },
  formSubmit: function (e) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        // console.log(res);
        app.func.req('edit_data', { openid: that.data.openid, user_headimg: res.data.avatarUrl, user_identity: 1, user_nickname: res.data.nickName, user_sex: res.data.gender, user_birthday: '', user_address: '', user_intro: '', user_sign: '', user_phone: e.detail.value.phoneInput}, 'POST', function (res) {
          // console.log(res);
          if (e.detail.value.yzmInput != that.data.phonecode) {
            wx.showToast({
              title: '验证码错误!',
              icon: 'none'
            })
          } else if (res.code == 200 && e.detail.value.yzmInput == that.data.phonecode) {
            wx.redirectTo({
              url: '../../index/index',
            })
          }

        });
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