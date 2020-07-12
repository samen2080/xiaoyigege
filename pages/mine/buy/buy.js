// pages/mine/buy/buy.js
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

  // 取消交易
  removePro: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.traid;
    that.setData({
      num: index,
      hidden: false,
      qxTxt:'确定要取消吗？',
      way: 0
    })

  },

  // 删除订单
  cancelPro: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.traid;
    that.setData({
      num: index,
      hidden: false,
      qxTxt: '确定要删除订单吗？',
      way: 1
    })

  },

  // 取消取消交易
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
    } else if (that.data.way == 1){
      that.deleteTra(num);
    }
    that.setData({
      hidden: true
    })
  },

  // 取消交易
  cancel: function (tra_id) {
    var that = this;
    app.func.req('cancel_trade', { openid: that.data.openid, tra_id: tra_id }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
        that.getData();
      }
    });
  },

  // 删除订单
  deleteTra: function (tra_id) {
    var that = this;
    app.func.req('del_trade', { openid: that.data.openid, tra_id: tra_id }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
        that.getData();
      }
    });
  },

  // 查看详情
  showPage: function (e) {
    // var index = e.currentTarget.dataset.id; 20191023 delete, buy.wxml文件不存在data-id
    wx.navigateTo({
      url: 'product-show/product-show?tra_id=' + e.currentTarget.dataset.traid,
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
    app.func.req('my_buy_goods/' + that.data.currentTab, { openid: that.data.openid, genre: 1 }, 'GET', function (res) {
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