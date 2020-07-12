// pages/mine/worker/new-maint-page2/new-maint-page2.js

const app = getApp()
var tcity = require("../../../../utils/citys.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_arr: [],
    address_img: '',
    upHidden: false,
    mnt_user_province: "",
    mnt_user_city: "",
    mnt_user_county: '',
    provinces: [],
    citys: [],
    countys: [],
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: true

  },
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        mnt_user_province: this.data.provinces[val[0]],
        mnt_user_city: cityData[val[0]].sub[0].name,
        citys: citys,
        mnt_user_county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        mnt_user_city: this.data.citys[val[1]],
        mnt_user_county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        mnt_user_county: this.data.countys[val[2]],
        values: val
      })
      return;
    }


  },
  open: function () {
    console.log("20200118===open")
    this.setData({
      condition: !this.data.condition
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    tcity.init(that);
    var cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    that.setData({
      host: host,
      mnt_user_province: that.data.mnt_user_province,
      mnt_user_city: that.data.mnt_user_city,
      mnt_user_county: that.data.mnt_user_county,
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
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
  formSubmit: function (e) {
    var that = this;
    var mnt_exe_date = wx.getStorageSync("maint_page1_data").mnt_exe_date;
    var mnt_maint_id = wx.getStorageSync("maint_page1_data").mnt_maint_id;
    var mnt_maint_com = wx.getStorageSync("maint_page1_data").mnt_maint_com;
    var mnt_status = wx.getStorageSync("maint_page1_data").mnt_status;
    var mnt_maint_mobile = wx.getStorageSync("maint_page1_data").mnt_maint_mobile;
    var mnt_maint_address = wx.getStorageSync("maint_page1_data").mnt_maint_address;
    var mnt_maint_province = wx.getStorageSync("maint_page1_data").mnt_maint_province;
    var mnt_maint_city = wx.getStorageSync("maint_page1_data").mnt_maint_city;
    var mnt_maint_county = wx.getStorageSync("maint_page1_data").mnt_maint_county;
    if (e.detail.value.mnt_user_id.length <= 0) {
      wx.showToast({
        title: '用户id不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.mnt_user_mobile.length <= 0) {
      wx.showToast({
        title: '用户电话不能为空!',
        icon: 'none'
      })
    } else if (that.data.mnt_user_province.length <= 0) {
      wx.showToast({
        title: '用户区域不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.mnt_user_address.length <= 0) {
      wx.showToast({
        title: '用户地址不能为空!',
        icon: 'none'
      })
    }else{
      app.func.req('add_maint', {
      mnt_exe_date: mnt_exe_date, mnt_maint_id: mnt_maint_id, mnt_maint_com: mnt_maint_com,
      mnt_status: mnt_status, mnt_maint_mobile: mnt_maint_mobile,
      mnt_maint_address: mnt_maint_address,
      mnt_maint_province: mnt_maint_province,
      mnt_maint_city: mnt_maint_city,
      mnt_maint_county: mnt_maint_county,

      mnt_user_id: e.detail.value.mnt_user_id,
      mnt_user_mobile: e.detail.value.mnt_user_mobile,
      mnt_user_address: e.detail.value.mnt_user_address,
      mnt_user_province: that.data.mnt_user_province,
      mnt_user_city: that.data.mnt_user_city,
      mnt_user_county: that.data.mnt_user_county,
      openid: that.data.openid,
    }, 'POST', function (res) {
      console.log("20200126", that.data.mnt_user_province);
      if (res.code == 200) {
        wx.showToast({
          title: '新建成功',
          icon: 'none',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateTo({
                url: '../../worker/workmaint/workmaint',
              })
            }, 2000);
          }

        })
      }
    })
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