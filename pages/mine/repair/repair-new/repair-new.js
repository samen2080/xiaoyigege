// pages/mine/repair/repair-new/repair-new.js
const app = getApp()
var tcity = require("../../../../utils/citys.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_arr: [],
    rep_date: '请选择',
    dateColor: '#999999',
    address_img: '',
    upHidden: false,
    rep_user_province: "",
    rep_user_city: "",
    rep_user_county: '',
    provinces: [],
    citys: [],
    countys: [],
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: true

  },
  bindDateChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      rep_date: e.detail.value,
      dateColor: '#000000'
    })
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
        rep_user_province: this.data.provinces[val[0]],
        rep_user_city: cityData[val[0]].sub[0].name,
        citys: citys,
        rep_user_county: cityData[val[0]].sub[0].sub[0].name,
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
        rep_user_city: this.data.citys[val[1]],
        rep_user_county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        rep_user_county: this.data.countys[val[2]],
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
    var user_id = wx.getStorageSync("user_info").user_id;
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
      rep_user_province: that.data.rep_user_province,
      rep_user_city: that.data.rep_user_city,
      rep_user_county: that.data.rep_user_county,
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      user_id: user_id,
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
    var rep_date = wx.getStorageSync("repair_page1_data").rep_date;
    var rep_repairman_id = wx.getStorageSync("repair_page1_data").rep_repairman_id;
    var rep_repairman_com = wx.getStorageSync("repair_page1_data").rep_repairman_com;
    var rep_status = wx.getStorageSync("repair_page1_data").rep_status;
    var rep_repairman_mobile = wx.getStorageSync("repair_page1_data").rep_repairman_mobile;
    var rep_repairman_address = wx.getStorageSync("repair_page1_data").rep_repairman_address;
    var rep_repairman_province = wx.getStorageSync("repair_page1_data").rep_repairman_province;
    var rep_repairman_city = wx.getStorageSync("repair_page1_data").rep_repairman_city;
    var rep_repairman_county = wx.getStorageSync("repair_page1_data").rep_repairman_county;
    // if (e.detail.value.rep_user_id.length <= 0) {
    //   wx.showToast({
    //     title: '用户id不能为空!',
    //     icon: 'none'
    //   })
    // } else
     if (e.detail.value.rep_user_mobile.length <= 0) {
      wx.showToast({
        title: '用户电话不能为空!',
        icon: 'none'
      })
    } else if (that.data.rep_user_province.length <= 0) {
      wx.showToast({
        title: '用户区域不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.rep_user_address.length <= 0) {
      wx.showToast({
        title: '用户地址不能为空!',
        icon: 'none'
      })
    } else if (that.data.rep_date.length <= 0) {
      wx.showToast({
        title: '维修日期不能为空!',
        icon: 'none'
      })
    }else {
      app.func.req('add_repair2', {
        // rep_date: rep_date, rep_repairman_id: rep_repairman_id, rep_repairman_com: rep_repairman_com,
        // rep_status: rep_status, rep_repairman_mobile: rep_repairman_mobile,
        // rep_repairman_address: rep_repairman_address,
        // rep_repairman_province: rep_repairman_province,
        // rep_repairman_city: rep_repairman_city,
        // rep_repairman_county: rep_repairman_county,
        rep_user_id: that.data.user_id,
        rep_user_mobile: e.detail.value.rep_user_mobile,
        rep_user_address: e.detail.value.rep_user_address,
        rep_user_province: that.data.rep_user_province,
        rep_user_city: that.data.rep_user_city,
        rep_user_county: that.data.rep_user_county,
        rep_date: that.data.rep_date,
        openid: that.data.openid,
      }, 'POST', function (res) {
        console.log("20200126", that.data.rep_user_province);
        if (res.code == 200) {
          wx.showToast({
            title: '新建成功',
            icon: 'none',
            duration: 1000,
            success: function () {
              setTimeout(function () {
                wx.navigateTo({
                  url: '../../repair/repair',
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