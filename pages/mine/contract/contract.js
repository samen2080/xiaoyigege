/* pages/mine/contract/contract.js */
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    conList: [],
    items: [],
    num: 0,
    openid: '',
    hidden: true
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
  // removePro: function (e) {
  //   var that = this;
  //   var index = e.currentTarget.dataset.conid;
  //   that.setData({
  //     num: index,
  //     hidden: false,
  //     qxTxt: '确定要取消吗？',
  //     way: 0
  //   })

  // },

  // 删除订单
  // cancelPro: function (e) {
  //   var that = this;
  //   var index = e.currentTarget.dataset.conid;
  //   that.setData({
  //     num: index,
  //     hidden: false,
  //     qxTxt: '确定要删除合约吗？',
  //     way: 1
  //   })

  // },

  // 取消取消合约
  // removeCancel: function (e) {
  //   var that = this;
  //   that.setData({
  //     hidden: true
  //   })
  // },

  // 确定取消交易
  // removeSure: function (e) {
  //   var that = this;
  //   var num = e.currentTarget.dataset.num;
  //   if (that.data.way == 0) {
  //     that.cancel(num);
  //   } else if (that.data.way == 1) {
  //     that.deleteCon(num);
  //   }
  //   that.setData({
  //     hidden: true
  //   })
  // },

  // 取消交易
  // cancel: function (con_id) {
  //   var that = this;
  //   app.func.req('cancel_contract', { openid: that.data.openid, con_id: con_id }, 'POST', function (res) {
  //     // console.log(res);
  //     if (res.code == 200) {
  //       //that.getData();
  //     }
  //   });
  // },

  // 删除订单
  // deleteCon: function (con_id) {
  //   var that = this;
  //   app.func.req('del_contract', { openid: that.data.openid, con_id: con_id }, 'POST', function (res) {
  //     // console.log(res);
  //     if (res.code == 200) {
  //       // that.getData();
  //     }
  //   });
  // },

  changeCon: function (e) {
    // var index = e.currentTarget.dataset.id;
    var that = this;
    var num = e.currentTarget.dataset.num;
    wx.navigateTo({
      url: 'contract-change/contract-change?con_id=' + e.currentTarget.dataset.conid
        + '&con_sign_date=' + e.currentTarget.dataset.i['con_sign_date'] + '&con_user_mobile=' + e.currentTarget.dataset.i['con_user_mobile'] + '&con_user_address=' + e.currentTarget.dataset.i['con_user_address'] + '&con_user_province=' + e.currentTarget.dataset.i['con_user_province'] + '&con_user_city=' + e.currentTarget.dataset.i['con_user_city'] + '&con_user_county=' + e.currentTarget.dataset.i['con_user_county'],
     })
  },
  // 查看详情
  showConPage: function (e) {
    //  var index = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'contract-show/contract-show?con_id=' + e.currentTarget.dataset.conid,
    })
  },
  // 合约评价
  showRatePage: function (e) {
    wx.navigateTo({
      url: 'contract-pj/contract-pj?con_id=' + e.currentTarget.dataset.conid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   var that = this;
  //   var host = app.globalData.host;
  //   that.setData({
  //     host: host
  //   })
  //    wx.getStorage({
  //      key: 'openid',
  //      success: function (res) {
  //        that.setData({
  //          openid: res.data
  //        })
  //        that.getData();
  //      },
  //    })
  // },
  // // 获取列表数据
  // getData: function () {
  //   var that = this;
  //   app.func.req('my_contract' , { openid: that.data.openid }, 'GET', function (res) {
  //     let arr = [];
  //     arr.push(res)
  //     that.setData({
  //       conList: arr,
  //       sheight: 424 * res.length
  //     })
  //   });
  // },

  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    var user_identity = wx.getStorageSync("user_info").user_identity;

    that.setData({
      user_identity: user_identity,
      host: host
    })

    // wx.getStorage({
    //   key: 'openid',
    //   success: function (res) {
    //     app.func.req('my_contract', { openid: res.data, pageSize: 1000, page: 1 }, 'GET', function (res) {
    //       // console.log(res);
    //       that.setData({
    //         items: res
    //       })
    //     });
    //   },
    // })
  },
  getData: function () {
    var that = this;
    app.func.req('my_contract', { openid: that.data.openid, pageSize: 1000, page: 1 }, 'GET', function (res) {
      console.log("20200106====res:", res);
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
  // onShow: function () {
  //   var that = this;
  //   wx.getStorage({
  //     key: 'openid',
  //     success: function (res) {
  //       that.setData({
  //         openid: res.data
  //       })
  //       that.getData();
  //     },
  //   })
  // },

  onShow: function () {
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