// pages/mine/worker/workmaint/workmaint-change/workmaint-change.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates: '请选择',
    dateColor: '#999999',
    mnt_id: 0,
    mnt_exe_date: 0,
    mnt_user_mobile: '',
    mnt_user_address: '',
    mnt_status: ''
  },

  bindDateChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      dates: e.detail.value,
      dateColor: '#000000'
    })
  },
  genderSelect: function (e) {
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
    console.log("20200106 === mnt_id", options.mnt_id);
    console.log("20200106 === mnt_exe_date", options.mnt_exe_date);
    that.setData({
      host: host,
      mnt_id: options.mnt_id,
      mnt_exe_date: options.mnt_exe_date,
      mnt_user_mobile: options.mnt_user_mobile,
      mnt_user_address: options.mnt_user_address,
      mnt_status: options.mnt_status
    })

    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      },
    })
    //that.getDetail();
  },
  getDetail: function () {
    var that = this;
    app.func.req('my_maint_show/' + that.data.mnt_id, {}, 'GET', function (res) {
      console.log("20191101======");
      console.log(that.data.mnt_id);
      console.log(res);
      that.setData({
        items: res
      })
    });
  },
  // 上传头像
  uploadImg: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
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
  formSubmit: function (e) {
    var that = this;
    if (that.data.mnt_exe_date.length <= 0) {
      wx.showToast({
        title: '日期不能为空!',
        icon: 'none'
      })
    } else if (that.data.mnt_user_mobile.length <= 0) {
      wx.showToast({
        title: '电话不能为空!',
        icon: 'none'
      })
    } else if (that.data.mnt_user_address.length <= 0) {
      wx.showToast({
        title: '地址不能为空!',
        icon: 'none'
      })
    } else {
      app.func.req('update_maint', { openid: that.data.openid, mnt_id: that.data.mnt_id, mnt_exe_date: e.detail.value.mnt_exe_date, mnt_user_mobile: e.detail.value.mnt_user_mobile, mnt_user_address: e.detail.value.mnt_user_address, mnt_status: e.detail.value.mnt_status }, 'POST', function (res) {
        // console.log(res);
        if (res.code == 200) {
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