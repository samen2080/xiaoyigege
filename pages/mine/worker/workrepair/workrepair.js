// pages/mine/workrepair/workrepair.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conList: [],
    items: [],
    num: 0,
    hidden: true,
    openid: ''
  },

  //滑动切换
  swiperTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.detail.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.detail.current
      })
      that.getData();
    }

  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  // 取消交易
  removePro: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.repid;
    that.setData({
      num: index,
      hidden: false,
      qxTxt: '确定要取消吗？',
      way: 0
    })

  },

  // 删除订单
  cancelPro: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.repid;
    that.setData({
      num: index,
      hidden: false,
      qxTxt: '确定要删除维修吗？',
      way: 1
    })

  },

  // 取消取消合约
  removeCancel: function (e) {
    var that = this;
    that.setData({
      hidden: true
    })
  },

  // 确定取消交易
  removeSure: function (e) {
    var that = this;
    var num = e.currentTarget.dataset.num;
    if (that.data.way == 0) {
      that.cancel(num);
    } else if (that.data.way == 1) {
      that.deleteCon(num);
    }
    that.setData({
      hidden: true
    })
  },

  // 取消交易
  cancel: function (rep_id) {
    var that = this;
    app.func.req('cancel_repair', { openid: that.data.openid, rep_id: rep_id }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
        //that.getData();
      }
    });
  },

  // 删除订单

  deleteCon: function (rep_id) {
    var that = this;
    console.log("20200104 ===1that.data.openid:", that.data.openid);
    app.func.req('del_repair', { openid: that.data.openid, rep_id: rep_id }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
        app.func.req('my_repair', { openid: that.data.openid, pageSize: 1000, page: 1 }, 'GET', function (res) {
          that.setData({
            items: res
          })
        });
      }
    });
  },

  // 查看详情
  showRepPage: function (e) {
    //  var index = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../repair/repair-show/repair-show?rep_id=' + e.currentTarget.dataset.repid,
    })
  },
  // 维修评价
  showRatePage: function (e) {
    wx.navigateTo({
      url: '../../repair/repair-pj/repair-pj?rep_id=' + e.currentTarget.dataset.repid,
    })
  },
  changePro: function (e) {
    // var index = e.currentTarget.dataset.id;
    var that = this;
    var num = e.currentTarget.dataset.num;
    console.log("20200108 ===e.currentTarget.dataset.repid:", e.currentTarget.dataset.repid);
    wx.navigateTo({
      url: '../../repair/repair-change/repair-change?rep_id=' + e.currentTarget.dataset.repid + '&rep_date=' + e.currentTarget.dataset.i['rep_date'] + '&rep_user_mobile=' + e.currentTarget.dataset.i['rep_user_mobile'] + '&rep_user_province=' + e.currentTarget.dataset.i['rep_user_province'] + '&rep_user_city=' + e.currentTarget.dataset.i['rep_user_city'] + '&rep_user_county=' + e.currentTarget.dataset.i['rep_user_county'] + '&rep_user_address=' + e.currentTarget.dataset.i['rep_user_address'] + '&rep_status=' + e.currentTarget.dataset.i['rep_status'],
    })
  },

  

  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    var user_identity = wx.getStorageSync("user_info").user_identity;
    that.setData({
      host: host,
      user_identity: user_identity
    })
  },
    getData: function () {
    var that = this;

        app.func.req('work_repair', { openid: that.data.openid, pageSize: 1000, page: 1 }, 'GET', function (res) {
           console.log(res);
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

  onShow: function () {
    console.log("20200108 onshow===");
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        that.getData();
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