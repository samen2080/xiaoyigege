// pages/mine/info/info.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates: '请选择',
    dateColor:'#999999'
  },
  bindDateChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      dates: e.detail.value,
      dateColor: '#000000'
    })
  },
  genderSelect:function(e){
    // console.log(e);
    this.setData({
      id: e.target.dataset.id
    })
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
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        app.func.req('get_user', { openid: res.data }, 'GET', function (res) {
            console.log("2020=====",res);
          that.setData({
            userInfo: res,
            user_headimg: res.user_headimg
          })
          if (res.user_sex == 1) {
            that.setData({
              id: 0
            })
          } else if (res.user_sex == 2) {
            that.setData({
              id: 1
            })
          }
          if (res.user_birthday != '') {
            that.setData({
              dates: res.user_birthday,
              dateColor: '#000000'
            })
          }
        });
      },
    })
  },
  // 上传头像
  uploadImg:function(e){
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        const tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: that.data.host + '/upload_files/user',
          filePath: tempFilePaths[0],
          name: 'user',
          header: {
            "content-type": "multipart/form-data"
          },
          success(res) {
            var headImg = JSON.parse(res.data);
            var user_headimg = that.data.user_headimg;
            user_headimg = that.data.host + headImg[0];
            that.setData({
              user_headimg: user_headimg
            })
          }
        })
      },
    })
  },
  // 保存
  formSubmit:function(e){
    var that = this;
    var myreg = /^1\d{10}$/;
    if (e.detail.value.user_nickname.length <= 0){
      wx.showToast({
        title: '昵称不能为空',
        icon: 'none'
      })
    } else if (!myreg.test(e.detail.value.user_phone)){
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
    } else {
      app.func.req('edit_data', { openid: that.data.openid, user_headimg: that.data.user_headimg, user_identity: that.data.userInfo.user_identity, user_nickname: e.detail.value.user_nickname, user_sex: Number(that.data.id) + 1, user_birthday: that.data.dates, user_address: e.detail.value.user_address, user_intro: e.detail.value.user_intro, user_sign: e.detail.value.user_sign, user_phone: e.detail.value.user_phone}, 'POST', function (res) {
        // console.log(res);
        if(res.code == 200){
          wx.navigateBack({
            delta: 1
          })
        }
      })
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