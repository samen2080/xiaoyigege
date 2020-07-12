// pages/mine/maint/maint.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    items: [],
    num: 0,
    hidden:true  
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

  // 修改保养
  // changePro: function (e) {
  //   var that = this;
  //   var index = e.currentTarget.dataset.mntid;
  //   that.setData({
  //     num: index,
  //     hidden: false,
  //     qxTxt:'确定要修改吗？',
  //     way: 0
  //   })

  // },

  // 取消修改保养
  // changeCancel: function (e) {
  //   var that = this;
  //   that.setData({
  //     hidden: true
  //   })
  // },

  // 确定修改保养
  // changeSure: function (e) {
  //   var that = this;
  //   var num = e.currentTarget.dataset.num;
  //   if (that.data.way == 0) {
  //     that.change(num);
  //   }
  //   that.setData({
  //     hidden: true
  //   })
  // },

  // 修改交易
  // change: function (mnt_id) {
  //   var that = this;
  //   app.func.req('change_maint', { openid: that.data.openid, mnt_id: mnt_id }, 'POST', function (res) {
  //     // console.log(res);
  //     if (res.code == 200) {
  //       that.getData();
  //       wx.navigateTo({
  //     url: 'maint-show/maint-show?mnt_id=' + e.currentTarget.dataset.mntid,
  //    })

  //     }
      
  //   });
  // },
  change: function (e) {
   // var index = e.currentTarget.dataset.id;
    var that = this;
    wx.navigateTo({
      url: 'maint-change/maint-change?mnt_id=' + e.currentTarget.dataset.mntid + '&mnt_maint_id=' + e.currentTarget.dataset.i['mnt_maint_id'] + '&mnt_exe_date=' + e.currentTarget.dataset.i['mnt_exe_date'] + '&mnt_user_mobile=' + e.currentTarget.dataset.i['mnt_user_mobile'] + '&mnt_user_address=' + e.currentTarget.dataset.i['mnt_user_address'] + '&mnt_user_province=' + e.currentTarget.dataset.i['mnt_user_province'] + '&mnt_user_city=' + e.currentTarget.dataset.i['mnt_user_city'] + '&mnt_user_county=' + e.currentTarget.dataset.i['mnt_user_county'] + '&mnt_status=' + e.currentTarget.dataset.i['mnt_status'],
    })
  },
  // 查看详情
  showPage: function (e) {
    // var index = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'maint-show/maint-show?mnt_id=' + e.currentTarget.dataset.mntid,
    })
  },

  // 提交评论页面
  showComment: function (e) {
    var index = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'maint-pj/maint-pj?mnt_id=' + e.currentTarget.dataset.mntid,
    })
  },
  // 提交保养
  submitMnt: function (e) {
    wx.navigateTo({
      url: 'maint-new/maint-new?mnt_id=' + e.currentTarget.dataset.mntid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    var user_identity = wx.getStorageSync("user_info").user_identity;
    console.log("20200106=== maint.js onload");
    that.setData({
      user_identity: user_identity,
      host: host
    })
    // wx.getStorage({
    //   key: 'openid',
    //   success: function (res) {
    //     that.setData({
    //       openid: res.data
    //     })
    //     that.getData();
    //   },
    // })
  },                                                                                                                                
  // 获取列表数据
  getData: function () {
    var that = this;
    console.log(" 20200110 that.data.currentTab:", that.data.currentTab);
    app.func.req('my_maint/' + that.data.currentTab, { openid: that.data.openid }, 'GET', function (res) {
      // console.log(res);
      that.setData({
        items: res,
        sheight: 424 * res.length
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