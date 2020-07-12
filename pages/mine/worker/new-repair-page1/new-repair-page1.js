// pages/mine/worker/new-repair-page1/new-repair-page1.js
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
    // 2020/1/21 start
    rep_date: '请选择',
    dateColor: '#999999',
    rep_date: 0,
    rep_repairman_province: '',
    rep_repairman_city: '',
    rep_repairman_county: '',
    provinces: [],
    citys: [],
    countys: [],
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition1: false,
    condition2: false,
    // 2020/1/21 end
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
  // 2020/1/21 start
  bindDateChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      rep_date: e.detail.value,
      dateColor: '#000000'
    })
  },

  bindChangeMain: function (e) {
    var val = e.detail.value;
    if (this.data.condition1 == 1){
      this.bindChange(val);
      this.setData({
        rep_repairman_province: this.data.rep_repairman_province,
        rep_repairman_city: this.data.rep_repairman_city,
        rep_repairman_county: this.data.rep_repairman_county
      })
    }
    if (this.data.condition2 == 1) {
      this.bindChange(val);
      this.setData({
        rep_repairman_province: this.data.rep_repairman_province,
        rep_repairman_city: this.data.rep_repairman_city,
        rep_repairman_county: this.data.rep_repairman_county
      })
    }
  },

  bindChange: function (val) {
    //console.log(e);
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
        rep_repairman_province: this.data.provinces[val[0]],
        rep_repairman_city: cityData[val[0]].sub[0].name,
        citys: citys,
        rep_repairman_county: cityData[val[0]].sub[0].sub[0].name,
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
        rep_repairman_city: this.data.citys[val[1]],
        rep_repairman_county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        rep_repairman_county: this.data.countys[val[2]],
        values: val
      })
      return;
    }
  },
  

  open1: function () {
    console.log("20200118===open")
    this.setData({
      condition1: !this.data.condition1,
    })
  },
  open2: function () {
    console.log("20200118===open")
    this.setData({
      condition2: !this.data.condition2
    })
  },
  // 2020/1/21 end
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    var user_id = wx.getStorageSync("user_info").user_id;
    // 2020 / 1 / 21 start
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
    // 2020 / 1 / 21 end
    that.setData({
      host: host, 
      rep_repairman_id: user_id,
      // 2020/1/21 start
      rep_repairman_province: that.data.rep_repairman_province,
      rep_repairman_city: that.data.rep_repairman_city,
      rep_repairman_county: that.data.rep_repairman_county,
      'provinces': provinces,
      'citys': citys,
      'countys': countys
      // 2020/1/21 end
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
  // 上传图片
  //=================================upload photo start 20191104
  uploadpic: function () {
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (ress) {
        wx.showToast({
          icon: "loading",
          title: "正在上传"
        }),
          console.log("==========="),
          console.log(that.data.host),
          console.log(ress.tempFilePaths[0]),
          wx.uploadFile({
            //url: app.siteurl + '/index.php?m=api&c=index&v=uploadpic', 
            url: that.data.host + '/upload_files/house',
            filePath: ress.tempFilePaths[0],
            name: 'house',
            header: {
              "Content-Type": "multipart/form-data"
            },
            formData: {
              'appkey': app.appkey
            },
            success: function (res) {
              if (res.statusCode == 200) {
                console.log("=====20191108===res");
                console.log(res);

                var img_arr = JSON.parse(res.data);
                that.setData({
                  address_img: that.data.img_arr.concat(img_arr[0]),
                  upHidden: true
                })
                console.log(that.data.address_img)
              }
              else {
                wx.showModal({
                  title: '提示',
                  content: '上传失败',
                  showCancel: false
                })
                return;
              }
            },
            fail: function (e) {
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
            },
            complete: function () {
              wx.hideToast();
            }
          })
      }
    })
  },
  //=================================upload photo end 20191104
  // 取消
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  getData: function (e) {
    console.log('20200131=== e.detail.id:', e.detail.id);
    console.log('20200131=== e.detail.text:', e.detail.text);
    this.setData({
      rep_status: e.detail.id
    })
  },
  // 发布
  formSubmit: function (e) {
    var that = this;
    // var rep_date = wx.getStorageSync("repair_page1_data").rep_date;
    // var rep_repairman_id = wx.getStorageSync("repair_page1_data").rep_repairman_id;
    // var rep_repairman_com = wx.getStorageSync("repair_page1_data").rep_repairman_com;
    // var rep_status = wx.getStorageSync("repair_page1_data").rep_status;
    // var rep_repairman_mobile = wx.getStorageSync("repair_page1_data").rep_repairman_mobile;
    // var rep_repairman_address = wx.getStorageSync("repair_page1_data").rep_repairman_address;
    // var rep_user_id = wx.getStorageSync("repair_page1_data").rep_user_id;
    // var rep_user_mobile = wx.getStorageSync("repair_page1_data").rep_user_mobile;
    // var rep_user_address = wx.getStorageSync("repair_page1_data").rep_user_address;
    if (e.detail.value.rep_date.length <= 0) {
      wx.showToast({
        title: '维修日期不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.rep_repairman_id.length <= 0) {
      wx.showToast({
        title: '维修员ID不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.rep_repairman_com.length <= 0) {
      wx.showToast({
        title: '维修公司不能为空!',
        icon: 'none'
      })
    }
    //  else if (this.data.rep_status == null) {
    //   wx.showToast({
    //     title: '维修状态不能为空!',
    //     icon: 'none'
    //   })
    // } 
    else if (e.detail.value.rep_repairman_mobile.length <= 0) {
      wx.showToast({
        title: '维修员电话不能为空!',
        icon: 'none'
      })
    } else if (that.data.rep_repairman_province.length <= 0) {
      wx.showToast({
        title: '维修站区域不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.rep_repairman_address.length <= 0) {
      wx.showToast({
        title: '维修站地址不能为空!',
        icon: 'none'
      })
    } 
    // else if (e.detail.value.rep_user_id.length <= 0) {
    //   wx.showToast({
    //     title: '用户ID不能为空!',
    //     icon: 'none'
    //   })
    // } else if (e.detail.value.rep_user_mobile.length <= 0) {
    //   wx.showToast({
    //     title: '用户电话不能为空!',
    //     icon: 'none'
    //   })
    // }
    // else if (e.detail.value.rep_user_address.length <= 0) {
    //   wx.showToast({
    //     title: '用户地址不能为空!',
    //     icon: 'none'
    //   })
    // } 
    else {
      console.log("20191216 ===rep_date:")
      console.log(e.detail.value.rep_date)
      console.log("20191216 ===rep_repairman_id:")
      console.log(e.detail.value.rep_repairman_id)

     
      // app.func.req('add_repair', {
      //   rep_date: e.detail.value.rep_date, rep_repairman_id: e.detail.value.rep_repairman_id, rep_repairman_com: e.detail.value.rep_repairman_com,
      //   rep_status: e.detail.value.rep_status, rep_repairman_mobile: e.detail.value.rep_repairman_mobile,
      //   rep_repairman_address: e.detail.value.rep_repairman_address,
      //   // rep_user_id: e.detail.value.rep_user_id, rep_user_mobile: e.detail.value.rep_user_mobile,
      //   // rep_user_address: e.detail.value.rep_user_address,
      //   // 2020/1/21 start
      //   province: that.data.province,
      //   city: that.data.city,
      //   county: that.data.county,
      //   // 2020/1/21 end
      //   openid: that.data.openid,
      // }, 'POST', function (res) {
      //   // console.log(res);
      //   if (res.code == 200) {
      //     wx.showToast({
      //       title: '新建成功',
      //       icon: 'none',
      //       duration: 2000,
      //       success: function () {
      //         setTimeout(function () {
      //           wx.navigateTo({
      //             url:'../../worker/new-repair-page2/new-repair-page2',
      //             // url: '../../repair/repair',
      //           })
      //         }, 2000);
      //       }

      //     })
      //   }
      // })
      wx.setStorage({
        key: 'repair_page1_data',
        data: {
          rep_date: e.detail.value.rep_date,
          rep_repairman_id: e.detail.value.rep_repairman_id,
          rep_repairman_com: e.detail.value.rep_repairman_com,
          rep_status: 1,
          rep_repairman_mobile: e.detail.value.rep_repairman_mobile,
          rep_repairman_address: e.detail.value.rep_repairman_address,
          rep_repairman_province: that.data.rep_repairman_province,
          rep_repairman_city: that.data.rep_repairman_city,
          rep_repairman_county: that.data.rep_repairman_county
        },
        success: function (res) {
          console.log("20200126", that.data.rep_repairman_province);
          wx.navigateTo({
            url: '../../worker/new-repair-page2/new-repair-page2',
          })
        },
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