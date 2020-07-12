const app = getApp()
 // 20200118 start
 var tcity = require("../../../../utils/citys.js");
  // 20200118 end
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mnt_exe_date: '请选择',
    dateColor: '#999999',
    mnt_id: 0,
    mnt_exe_date: 0,
    mnt_user_mobile: '',
    mnt_user_address: '',
   // 20200118 start
    mnt_user_province: "",
    mnt_user_city: "",
    mnt_user_county: '',
    provinces: [],
    citys: [],
    countys: [],
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
     // 20200118 end
    selectArray: [{
      "id": "0",
      "text": "提交待接单"
    }, {
      "id": "1",
      "text": "提前已执行"
    }, {
      "id": "2",
      "text": "按时已执行"
      },{
        "id": "3",
        "text": "延时已执行"
      }, {
        "id": "4",
        "text": "临时已执行"
      }, {
        "id": "5",
        "text": "提交已接单"
      }]
  },
  bindDateChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      mnt_exe_date: e.detail.value,
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
      console.log('mnt_user_province no ');
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
      console.log('mnt_user_city no');
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

  // 20200118  end
  /**
   * 生命周期函数--监听页面加载
   */
  

  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    var user_identity = wx.getStorageSync("user_info").user_identity;
    var user_id = wx.getStorageSync("user_info").user_id ;
    console.log("20200202====：",  that.data.selectArray);
    // that.getData();
    // console.log("20200202==== onload e：", e);
    // console.log("20200202==== onload e：", e.detail.id);
    // console.log("20200202==== onload e：", e.detail.text);
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
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    // 20200118 end

 
    console.log("20200106 === mnt_id", options.mnt_id);
    console.log("20200106 === mnt_maint_id", options.mnt_maint_id);
    that.setData({
      host: host,
      user_identity: user_identity,
      mnt_id: options.mnt_id,
      mnt_status: options.mnt_status,
      mnt_maint_id: options.mnt_maint_id,      
      mnt_exe_date: options.mnt_exe_date,
      mnt_user_mobile: options.mnt_user_mobile,
      mnt_user_address: options.mnt_user_address,
       // 20200118 start
      mnt_user_province: options.mnt_user_province,
      mnt_user_city: options.mnt_user_city, 
      mnt_user_county: options.mnt_user_county,
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
    app.func.req('my_maint_show/' + that.data.mnt_id, {}, 'GET', function (res) {
      console.log("20191101======");
      console.log(that.data.mnt_id);
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
    console.log('20200202=== e:', e);
    console.log('20200131=== e.detail.id:', e.detail.id);
    console.log('20200131=== e.detail.text:', e.detail.text);
    this.setData({
      mnt_status: e.detail.id
    })
  },
  // 保存
  formSubmit: function (e) {
    var that = this;
    if (that.data.mnt_exe_date.length <= 0) {
      wx.showToast({
        title: '日期不能为空!',
        icon: 'none'
      })
    } else if (that.data.mnt_user_mobile.length <= 0) {
      wx.showToast({
        title: '电话不能为空!',
        icon: 'none'
      })
    } 
    else if (that.data.mnt_status == null && that.data.user_identity == 2 ) {
      wx.showToast({
        title: '状态不能为空!',
        icon: 'none'
      })
    }
    else if (e.detail.value.mnt_maint_id.length <= 0 && that.data.user_identity == 2 ) {
      wx.showToast({
        title: '保养员id不能为空!',
        icon: 'none'
      })
    } 
    else if (that.data.mnt_user_province.length <= 0) {
      wx.showToast({
        title: '区域不能为空!',
        icon: 'none'
      })
    }
    else if (that.data.mnt_user_address.length <= 0) {
      wx.showToast({
        title: '地址不能为空!',
        icon: 'none'
      })
    }  else {
       app.func.req('update_maint', { openid: that.data.openid, mnt_id: that.data.mnt_id, mnt_status: that.data.mnt_status, mnt_maint_id: e.detail.value.mnt_maint_id,  mnt_exe_date: that.data.mnt_exe_date, mnt_user_mobile: e.detail.value.mnt_user_mobile, mnt_user_address: e.detail.value.mnt_user_address, mnt_user_province: that.data.mnt_user_province, mnt_user_city: that.data.mnt_user_city, mnt_user_county: that.data.mnt_user_county}, 'POST', function (res) {
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