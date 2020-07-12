// pages/community/hot-topic/publish-video/publish-video.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video_arr: [],
    upHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    that.setData({
      host: host,
      topic_id: options.topic_id
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

  paySelect: function (e) {
    // console.log(e);
    this.setData({
      id: e.target.dataset.id
    })
  },

  // 上传视频
  upvideo: function () {
    var that = this;
    if (this.data.video_arr.length < 4) {
      wx.chooseVideo({
        maxDuration: 60,
        success: function (res) {
          var tempFilePaths = res.tempFilePath;
          wx.uploadFile({
            url: that.data.host + '/upload_files/invitation',
            filePath: tempFilePaths,
            name: 'invitation',
            header: {
              "content-type": "multipart/form-data"
            },
            success(res) {
              var video_arr = JSON.parse(res.data);
              that.setData({
                video_arr: that.data.video_arr.concat(video_arr[0])
              })
            }
          })
        }
      })
    } else {
      wx.showToast({
        title: '最多上传4个视频',
        icon: 'none',
        duration: 3000
      });
    }
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
    } else if (that.data.video_arr.length <= 0) {
      wx.showToast({
        title: '请添加视频!',
        icon: 'none'
      })
    } else if (that.data.id == 2 && e.detail.value.in_money.length <= 0) {
      wx.showToast({
        title: '请设置鼓币!',
        icon: 'none'
      })
    } else {
      app.func.req('add_invitation', { openid: that.data.openid, in_type: 3, in_name: e.detail.value.in_name, in_content: e.detail.value.in_content, in_append: that.data.video_arr.join(","), is_money: that.data.id, set_currency: e.detail.value.in_money, topic_id: that.data.topic_id }, 'POST', function (res) {
        // console.log(res);
        if (res.code == 200) {
          wx.showToast({
            title: '发布成功!',
            icon: 'success',
            success: function () {
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