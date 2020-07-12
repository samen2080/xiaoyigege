const app = getApp()
// 20200118 start
var tcity = require("../../../../utils/citys.js");
// 20200118 end
Page({

  /**
   * 页面的初始数据
   */
  data: {
    con_sign_date: '请选择',
    dateColor: '#999999',
    con_id: 0,
    con_sign_date: 0,
    con_user_mobile: '',
    con_user_address: '',
    // 20200118 start
    con_user_province: "",
    con_user_city: "",
    con_user_county: '',
    provinces: [],
    citys: [],
    countys: [],
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false
    // 20200118 end

  },
  bindDateChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      con_sign_date: e.detail.value,
      dateColor: '#000000'
    })
  },

  // 20200118  start
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('con_user_province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        con_user_province: this.data.provinces[val[0]],
        con_user_city: cityData[val[0]].sub[0].name,
        citys: citys,
        con_user_county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('con_user_city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        con_user_city: this.data.citys[val[1]],
        con_user_county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('con_user_county no');
      this.setData({
        con_user_county: this.data.countys[val[2]],
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

  // 20200118  end
  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    var user_identity = wx.getStorageSync("user_info").user_identity;
    var user_id = wx.getStorageSync("user_info").user_id;
    // 20200118 start
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
    console.log('con_user_city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    // 20200118 end


    console.log("20200106 === con_id", options.con_id);
    console.log("20200106 === con_exe_date", options.con_exe_date);
    that.setData({
      host: host,
      user_identity: user_identity,
      user_id: user_id,
      con_id: options.con_id,
      con_status: options.con_status,
      con_sign_date: options.con_sign_date,
      con_user_mobile: options.con_user_mobile,
      con_user_address: options.con_user_address,
      // 20200118 start
      con_user_province: options.con_user_province,
      con_user_city: options.con_user_city,
      con_user_county: options.con_user_county,
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      // 'province': cityData[0].name,
      // 'city': cityData[0].sub[0].name,
      // 'county': cityData[0].sub[0].sub[0].name
      // 20200118 end

    })

    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      },
    })
    //that.getDetail();
  },
  getDetail: function () {
    var that = this;
    app.func.req('my_contract_show/' + that.data.con_id, {}, 'GET', function (res) {
      console.log("20191101======");
      console.log(that.data.con_id);
      console.log(res);
      that.setData({
        items: res
      })
    });
  },
  // 上传头像
  uploadImg: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: that.data.host + '/upload_files/user',
          filePath: tempFilePaths[0],
          name: 'user',
          header: {
            "content-type": "multipart/form-data"
          },
          success(res) {
            var headImg = JSON.parse(res.data);
            var user_headimg = that.data.user_headimg;
            user_headimg = that.data.host + headImg[0];
            that.setData({
              user_headimg: user_headimg
            })
          }
        })
      },
    })
  },
  // 保存
  formSubmit: function (e) {
    var that = this;
    if (that.data.con_sign_date.length <= 0) {
      wx.showToast({
        title: '日期不能为空!',
        icon: 'none'
      })
    } else if (that.data.con_user_mobile.length <= 0) {
      wx.showToast({
        title: '电话不能为空!',
        icon: 'none'
      })
    } else if (that.data.con_user_address.length <= 0) {
      wx.showToast({
        title: '地址不能为空!',
        icon: 'none'
      })
    } else {
      app.func.req('update_con', { openid: that.data.openid, con_id: that.data.con_id, user_id: that.data.user_id, con_status: e.detail.value.con_status, con_sign_date: that.data.con_sign_date, con_user_mobile: e.detail.value.con_user_mobile, con_user_address: e.detail.value.con_user_address, con_user_province: that.data.con_user_province, con_user_city: that.data.con_user_city, con_user_county: that.data.con_user_county }, 'POST', function (res) {
        // console.log(res);
        if (res.code == 200) {
          wx.navigateBack({
            delta: 1
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