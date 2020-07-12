// pages/mine/mine-subject/mine-subject.js
const app = getApp()
var imgPostf = ["jpg", "png", "bmp", 'jpeg'];
var videoPostf = ['avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'dat', 'mov', 'qt', 'asf', 'wmv', 'mp4'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    middlearr: []
  },
  // 单个删除
  listenerButton: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['删除'],//显示的列表项
      itemColor: '#000000',
      success: function (res) {
        if (res.tapIndex === 0) {
          app.func.req('del_invitation', { in_id: e.currentTarget.dataset.inid }, 'POST', function (res) {
            // console.log(res);
            if(res.code == 200){
              wx.showToast({
                title: '删除成功!',
                icon: 'success'
              })
              that.getList();
            }
          });
        }
      }
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
        that.getList();
      },
    })
  },
  getList: function () {
    var that = this;
    app.func.req('my_invitation', { pageSize: 100, page: 1, openid: that.data.openid }, 'GET', function (res) {
      // console.log(res);
      for (var i = 0; i < res.length; i++) {
        if (res[i].in_append.length != 0) {
          var index1 = res[i].in_append[0].lastIndexOf(".");
          var index2 = res[i].in_append[0].length;
          var postf = res[i].in_append[0].substring(index1 + 1, index2).toLowerCase();
          var result = imgPostf.indexOf(postf);
          if (result != -1) {
            res[i].in_append_type = 1;
          } else {
            res[i].in_append_type = 2;
          }
        }
      }
      that.setData({
        items: res
      })
    });
  },
  // 点赞
  like: function (e) {
    var that = this;
    app.func.req('thumbs_upGood', { openid: that.data.openid, th_good_id: e.currentTarget.dataset.inid, th_type: 2 }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
        that.getList();
      }
    });
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