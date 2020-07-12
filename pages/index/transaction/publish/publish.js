// pages/index/transaction/publish/publish.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    imgArr:[],
    catTxt: ''
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
      success: function(res) {
        that.setData({
          openid: res.data
        })
      },
    })
  },
  // 上传图片
  uploadImg: function (e) {
    var that = this;
    wx.chooseImage({
      count: 9,
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: that.data.host + '/upload_files/oldgoods',
            filePath: tempFilePaths[i],
            name: 'oldgoods',
            header: {
              "content-type": "multipart/form-data"
            },
            success(res) {
              var imgArr = JSON.parse(res.data);
              that.setData({
                imgArr: that.data.imgArr.concat(imgArr[0])
              })
            }
          })
        }
      },
    })
  },
  newSelect:function(e){
    this.setData({
      id: e.target.dataset.id
    })
  },
  // 分类
  catPage:function(){
    wx.navigateTo({
      url: 'category',
    })
  },
  // 下一步
  formSubmit:function(e){
    var that = this;
    if (e.detail.value.proName.length <= 0){
      wx.showToast({
        title: '名称不能为空！',
        icon: 'none'
      })
    } else if (e.detail.value.proIntro.length <= 0){
      wx.showToast({
        title: '描述不能为空！',
        icon: 'none'
      })
    } else if (that.data.imgArr.length <= 0) {
      wx.showToast({
        title: '请上传图片！',
        icon: 'none'
      })
    } else if (that.data.catTxt.length <= 0) {
      wx.showToast({
        title: '请选择分类',
        icon: 'none'
      })
    } else {
      app.func.req('publish_oldgoods', { old_name: e.detail.value.proName, old_describe: e.detail.value.proIntro, old_img: that.data.imgArr.join(","), is_new: that.data.id + 1, old_type: that.data.old_type }, 'POST', function (res) {
        // console.log(res);
        wx.removeStorage({
          key: 'category',
          success: function (result) {
            wx.navigateTo({
              url: 'info?old_id='+res.old_id,
            })
          },
        })
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
    var that = this;
    wx.getStorage({
      key: 'category',
      success: function(res) {
        that.setData({
          old_type: res.data.old_type,
          catTxt: res.data.catTxt
        })        
      },
    })
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