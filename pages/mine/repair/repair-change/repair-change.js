const app = getApp()
var tcity = require("../../../../utils/citys.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rep_date: '请选择',
    dateColor: '#999999',
    rep_id: 0,
    // 2020/01/18 start
    rep_date: 0,
    rep_user_mobile: '',
    rep_user_address: '',
    rep_status: '',
    rep_user_province: "",
    rep_user_city: "",
    rep_user_county: '',
    provinces: [],
    citys: [],
    countys: [],
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    // 2020/01/18 end
    selectArray: [{
      "id": "1",
      "text": "已报修"
    }, {
      "id": "2",
      "text": "已维修"
    }, {
      "id": "3",
      "text": "已过期"
    }]
  },
  // 2020/01/18 start
  bindDateChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      rep_date: e.detail.value,
      dateColor: '#000000'
    })
  },
  genderSelect: function (e) {
    // console.log(e);
    this.setData({
      id: e.target.dataset.id
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
  // 2020/01/18 end
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    console.log("20200106=== rep_id", options.rep_id);
    console.log("20200106=== rep_date", options.rep_date);
    console.log("20200108=== rep_status", options.rep_status);
    var user_identity = wx.getStorageSync("user_info").user_identity;
    var user_id = wx.getStorageSync("user_info").user_id;
    // 2020 / 01 / 18 start
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
    // 2020 / 01 / 18 end
    that.setData({
      host: host,
      rep_id: options.rep_id,
      rep_date: options.rep_date,
      rep_user_mobile: options.rep_user_mobile,
      rep_user_address: options.rep_user_address,
      rep_status: options.rep_status,
      user_identity: user_identity,
      // 2020/01/18 start
      rep_user_province: options.rep_user_province,
      rep_user_city: options.rep_user_city,
      rep_user_county: options.rep_user_county,
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      rep_repairman_id : user_id,
      // 2020/01/18 end
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
    app.func.req('my_repair_show/' + that.data.rep_id, {}, 'GET', function (res) {
      console.log("20191101======");
      console.log(that.data.rep_id);
      console.log(that.data.rep_repairman_id);
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
  getData: function (e) {
    console.log('20200131=== e.detail.id:', e.detail.id);
    console.log('20200131=== e.detail.text:', e.detail.text);
    this.setData({
      rep_status: e.detail.id
    })
  },
  // 保存
  formSubmit: function (e) {
    var that = this;
    var temp_user_id;
    if (that.data.user_identity == 2) {
       temp_user_id = e.detail.value.rep_repairman_id}
    else{
       temp_user_id = ''
    };
    console.log("20200204===: temp_user_id", temp_user_id);
    if (that.data.rep_date.length <= 0) {
      wx.showToast({
        title: '日期不能为空!',
        icon: 'none'
      })
    } else if (that.data.rep_user_mobile.length <= 0) {
      wx.showToast({
        title: '电话不能为空!',
        icon: 'none'
      })
    } else if (that.data.rep_status == null && that.data.user_identity == 2) {
      wx.showToast({
        title: '维修状态不能为空!',
        icon: 'none'
      })
    } else if (that.data.rep_repairman_id.length <= 0 && that.data.user_identity == 2) {
      wx.showToast({
        title: '维修员id不能为空!',
        icon: 'none'
      })
    } else if (that.data.rep_user_province.length <= 0) {
      wx.showToast({
        title: '区域不能为空!',
        icon: 'none'
      })
    }else if (that.data.rep_user_address.length <= 0) {
      wx.showToast({
        title: '地址不能为空!',
        icon: 'none'
      })
    }  else {
      app.func.req('update_repair', { openid: that.data.openid, rep_id: that.data.rep_id, rep_date: that.data.rep_date, rep_user_mobile: e.detail.value.rep_user_mobile, rep_repairman_id: temp_user_id, rep_user_address: e.detail.value.rep_user_address, rep_status: that.data.rep_status, rep_user_province: that.data.rep_user_province, rep_user_city: that.data.rep_user_city, rep_user_county: that.data.rep_user_county}, 'POST', function (res) {
        console.log("20200106 1 ======");
        console.log(that.data.rep_id);
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