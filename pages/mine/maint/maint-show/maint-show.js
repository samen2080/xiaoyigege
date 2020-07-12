// pages/mine/maint/maint-show/maint-show.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    cancel: false,
    user_identity: null

  },

  // 取消交易/删除订单
  removePro: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.id;
    that.setData({
      num: index,
      hidden: false
    })
    if (index == 0) {
      that.setData({
        txt: "确定要取消吗？"
      })
    } else if (index == 1) {
      that.setData({
        txt: "确定要删除吗？"
      })
    }
  },

  // 再想想
  removeCancel: function (e) {
    var that = this;
    that.setData({
      hidden: true
    })
  },

  // 确定
  removeSure: function (e) {
    var that = this;
    var num = e.currentTarget.dataset.num;
    if (num == 0) {
      app.func.req('cancel_trade', { openid: that.data.openid, con_id: that.data.con_id }, 'POST', function (res) {
        // console.log(res);
        if (res.code == 200) {
          that.getDetail();
          that.setData({
            hidden: true,
            cancel: true
          })
        }
      });
    } else if (num == 1) {
      app.func.req('del_trade', { openid: that.data.openid, con_id: that.data.con_id }, 'POST', function (res) {
        // console.log(res);
        if (res.code == 200) {
          wx.navigateBack({
            delta: 1
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
    var user_identity = wx.getStorageSync("user_info").user_identity;
    that.setData({
      host: host,
      mnt_id: options.mnt_id,
      user_identity: user_identity
    })
    console.log("20200206 1===");
    console.log(options.mnt_id);
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      },
    })
    that.getDetail();
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

  // addPlan: function () {
  //   var that = this;
  //   var pln_con_id = that.data.con_id;
  //   var pln_user_id = that.data.items.con_user_id;
  //   var pln_user_mobile = that.data.items.con_user_mobile;
  //   var pln_exe_date = that.data.items.con_start_date;
  //   var pln_user_address = that.data.items.con_user_address;
  //   var pln_maint_id = that.data.items.con_maint_id;
  //   var pln_maint_com = that.data.items.con_maint_com;


  //   app.func.req('add_plan', {
  //     pln_con_id: pln_con_id,
  //     pln_user_id: pln_user_id,
  //     pln_user_mobile: pln_user_mobile,
  //     pln_exe_date: pln_exe_date,
  //     pln_user_address: pln_user_address,
  //     pln_maint_id: pln_maint_id,
  //     pln_maint_com: pln_maint_com,

  //     // openid: that.data.openid,
  //   }, 'POST', function (res) {
  //     // console.log(res);
  //     if (res.code == 200) {
  //       wx.navigateBack({
  //         delta: 1
  //       })
  //     }
  //   })
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