// pages/mine/repair/repair-pj/repair-pj.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conList: [],
    num: 0,
    grade: '',
    hidden: true,
    repid: 0,
    flag: [0, 0, 0],
    startext: ['', '', ''],
    stardata: [1, 2, 3, 4, 5]
  },

  changeColor: function (e) {
    var index = e.currentTarget.dataset.index;
    var num = e.currentTarget.dataset.no;
    var a = 'flag[' + index + ']';
    var b = 'startext[' + index + ']';
    var that = this;
    that.setData({
      grade: num
    });
    console.log("index");
    console.log(index);
    console.log("num");
    console.log(num);

    if (num == 1) {
      that.setData({
        [a]: 1,
        [b]: '非常不满意'
      });
    } else if (num == 2) {
      that.setData({
        [a]: 2,
        [b]: '不满意'
      });
    } else if (num == 3) {
      that.setData({
        [a]: 3,
        [b]: '一般'
      });
    } else if (num == 4) {
      that.setData({
        [a]: 4,
        [b]: '满意'
      });
    } else if (num == 5) {
      that.setData({
        [a]: 5,
        [b]: '非常满意'
      });
    }
  },

  // 取消
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  formSubmit: function (e) {
    var that = this;
    if (that.data.grade.length <= 0) {
      wx.showToast({
        title: '服务评价不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.rep_rating_comment.length <= 0) {
      wx.showToast({
        title: '评价描述不能为空!',
        icon: 'none'
      })
    } else {
      app.func.req('update_repair_comment', {
        rep_id: that.data.rep_id,
        rep_rating_grade: that.data.grade,
        rep_rating_comment: e.detail.value.rep_rating_comment
      }, 'POST',
        function (res) {
          if (res.code == 200) {
            wx.showToast({
              title: '提交成功！',
              icon: 'success',
              //duration: 3000,
              success: function (res) {
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    that.setData({
      host: host,
      rep_id: options.rep_id
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

  // 获取列表数据
  getData: function () {
    var that = this;
    app.func.req('my_repair_comment/', { rep_id: that.data.rep_id }, 'POST',
      function (res) {
        that.setData({
          items: res
        })
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