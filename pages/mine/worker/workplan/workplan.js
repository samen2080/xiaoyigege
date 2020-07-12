// pages/mine/workrepair/workrepair.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conList: [],
    items: [],
    coninfo: [],
    num: 0,
    hidden: true,
    openid: ''
  },

  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    that.setData({
    con_id: options.con_id
    });
  },

  getContract: function (){
    var that = this;
    console.log("20200205 ===");
    app.func.req('plan_contract', { con_id: that.data.con_id, pageSize: 1000, page: 1 }, 'GET', function (res) {
        that.setData({
          coninfo: res
        });
      });
    },

  getData: function () {
    var that = this;
    app.func.req('work_plan', { openid: that.data.openid, pageSize: 1000, page: 1 }, 'GET', function (res) {
    //  console.log(res);
      that.setData({
        items: res 
      })
      console.log("20200206 2===", that.data.items[1].pln_exe_date);
    });
  },
  //执行计划
  exePlan: function (e) {
    var that = this;
    var mnt_user_province = that.data.coninfo[0].con_user_province;
    var mnt_user_city = that.data.coninfo[0].con_user_city;
    var mnt_user_county = that.data.coninfo[0].con_user_county;
    var mnt_user_address = that.data.coninfo[0].con_user_address;
    var mnt_user_mobile = that.data.coninfo[0].con_user_mobile;

    var mnt_pln_id = e.currentTarget.dataset.i['pln_id'];
    var mnt_user_id = e.currentTarget.dataset.i['pln_user_id'];
    var mnt_exe_date = e.currentTarget.dataset.i['pln_exe_date'];

    app.func.req('exe_plan', {
      mnt_user_province: mnt_user_province,
      mnt_user_city: mnt_user_city,
      mnt_user_county: mnt_user_county,
      mnt_user_address: mnt_user_address,
      mnt_user_mobile: mnt_user_mobile,

      mnt_pln_id: mnt_pln_id,
      mnt_user_id: mnt_user_id,
      mnt_exe_date: mnt_exe_date,

      pln_id: e.currentTarget.dataset.i['pln_id']
    }, 'POST', function (res) {
      console.log("20200206 res 1===",res);
      if (res.code == 200) {
        wx.showToast({
          title: '操作成功！',
          icon: 'success',
          duration: 1000,
          success: function () {
            setTimeout(function () {
            that.getData();
            },1000)
            }
        })
       
      }
    })
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
        that.getContract();
      },
    });
  },

  // workmaint: function(e) {
  //   var that = this;
  //   wx.navigateTo({
  //     url: '../../maint/maint-show/maint-show?mnt_id=' + e.currentTarget.dataset.conid + '&mnt_user_province=' + that.data.coninfo[0].con_user_province + '&mnt_user_city=' + that.data.coninfo[0].con_user_city + '&mnt_user_county=' + that.data.coninfo[0].con_user_county + '&mnt_user_address=' + that.data.coninfo[0].con_user_address + '&mnt_user_mobile=' + that.data.coninfo[0].con_user_mobile + '&mnt_pln_id=' + e.currentTarget.dataset.i['mnt_pln_id'] + '&mnt_user_id=' + e.currentTarget.dataset.i['mnt_user_id'] + '&mnt_exe_date=' + e.currentTarget.dataset.i['mnt_exe_date'] ,
  //   })
  // },

  // 查看详情
  workMaint: function (e) {
    console.log("20200206 mntid===", e.currentTarget.dataset.plnmntid);
    wx.navigateTo({
      url: '../../maint/maint-show/maint-show?mnt_id=' + e.currentTarget.dataset.plnmntid,
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