// pages/community/bbs/bbs.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isJoin:false,
    bbsList: []
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
    // 论坛
    app.func.req('forum', { pageSize: 1000, page: 1 }, 'GET', function (res) {
      // console.log(res);
      for (var i = 0; i < res.length; i++) {
        res[i].isJoin = false;
      }
      that.setData({
        bbsList: res
      })
    });
  },
// 加入论坛
  // joinIn: function (e) {
  //   console.log(e.currentTarget.id);
  //   for (var i = 0; i < this.data.bbsList.length; i++) {
  //     if (e.currentTarget.id == this.data.bbsList[i].id) {
  //       if (this.data.bbsList[i].isJoin == true) {
  //         this.data.bbsList[i].isJoin = false;
  //         var bbsList = this.data.bbsList;
  //         this.setData({
  //           bbsList
  //         })
  //       } else {
  //         this.data.bbsList[i].isJoin = true;
  //         var bbsList = this.data.bbsList;
  //         this.setData({
  //           bbsList
  //         })
  //       }
  //     }
  //   }
  // },
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