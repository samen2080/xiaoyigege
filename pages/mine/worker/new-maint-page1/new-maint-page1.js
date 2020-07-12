// pages/mine/worker/new-maint-page1/new-maint-page1.js
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
    // 2020/01/23 start
    mnt_exe_date: '请选择',
    mnt_exe_date: 0,
    dateColor: '#999999',
    mnt_maint_province: "",
    mnt_maint_city: "",
    mnt_maint_county: '',
    provinces: [],
    citys: [],
    countys: [],
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: true,
  //  2020/01/23 end
    selectArray: [{
      "id": "0",
      "text": "未执行"
    }, {
      "id": "1",
      "text": "提前已执行"
    }, {
      "id": "2",
      "text": "按时已执行"
    }, {
      "id": "3",
      "text": "延时已执行"
      }, {
        "id": "4",
        "text": "临时已执行"
      }]
  },
  // 2020/01/23 start
  bindDateChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      mnt_exe_date: e.detail.value,
      dateColor: '#000000'
    })
  },
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('mnt_maint_province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        mnt_maint_province: this.data.provinces[val[0]],
        mnt_maint_city: cityData[val[0]].sub[0].name,
        citys: citys,
        mnt_maint_county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('mnt_maint_city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        mnt_maint_city: this.data.citys[val[1]],
        mnt_maint_county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('mnt_maint_county no');
      this.setData({
        mnt_maint_county: this.data.countys[val[2]],
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
  // 2020/01/23 end
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    var user_id = wx.getStorageSync("user_info").user_id;
    // 2020 / 01 / 23 start
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
    console.log('mnt_maint_city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    // 2020 / 01 / 23 end
    that.setData({
      host: host,
      mnt_maint_id: user_id,
      // 2020/01/23 start
      mnt_maint_province: that.data.mnt_maint_province,
      mnt_maint_city: that.data.mnt_maint_city,
      mnt_maint_county: that.data.mnt_maint_county,
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      // 2020/01/23 end
      
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
      mnt_status: e.detail.id
    })
  },
  // 发布
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.mnt_exe_date.length <= 0) {
      wx.showToast({
        title: '保养日期不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.mnt_maint_id.length <= 0) {
      wx.showToast({
        title: '保养员ID不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.mnt_maint_com.length <= 0) {
      wx.showToast({
        title: '保养公司不能为空!',
        icon: 'none'
      })
    }
    //  else if (this.data.mnt_status == null) {
    //   wx.showToast({
    //     title: '保养状态不能为空!',
    //     icon: 'none'
    //   })
    // } 
    else if (e.detail.value.mnt_maint_mobile.length <= 0) {
      wx.showToast({
        title: '保养员电话不能为空!',
        icon: 'none'
      })
    } 
    // else if (e.detail.value.mnt_maint_address.length <= 0) {
    //   wx.showToast({
    //     title: '保养中心地址不能为空!',
    //     icon: 'none'
    //   })
    // }
    //  else if (e.detail.value.mnt_maint_id.length <= 0) {
    //   wx.showToast({
    //     title: '用户ID不能为空!',
    //     icon: 'none'
    //   })
    //}
    else if (that.data.mnt_maint_province.length <= 0) {
      wx.showToast({
        title: '保养站区域不能为空!',
        icon: 'none'
      })
    } 
    else if (e.detail.value.mnt_maint_address.length <= 0) {
      wx.showToast({
        title: '保养站地址不能为空!',
        icon: 'none'
      })
    } else {
      console.log("20191216 ===rep_date:")
      console.log(e.detail.value.rep_date)
      console.log("20191216 ===rep_repairman_id:")
      console.log(e.detail.value.rep_repairman_id)


      // app.func.req('add_maint', {
      //   mnt_exe_date: e.detail.value.mnt_exe_date,
      //   mnt_maint_id: e.detail.value.mnt_maint_id,
      //   mnt_maint_com: e.detail.value.mnt_maint_com,
      //   mnt_status: e.detail.value.mnt_status, 
      //   mnt_maint_mobile: e.detail.value.mnt_maint_mobile,
      //   // mnt_maint_address: e.detail.value.mnt_maint_address,
      //   mnt_maint_id: e.detail.value.mnt_maint_id, 
      //   mnt_maint_mobile: e.detail.value.mnt_maint_mobile,
      //   mnt_maint_address: e.detail.value.mnt_maint_address, 
      //   // 2020/01/23 start
      //   mnt_maint_province: that.data.mnt_maint_province,
      //   mnt_maint_city: that.data.mnt_maint_city,
      //   mnt_maint_county: that.data.mnt_maint_county,
      //   // 2020/01/23 end
      //   openid: that.data.openid,
      // }, 'POST', function (res) {
      //   console.log("20200123", e.detail.value.mnt_maint_mobile);
      //   console.log("20200123", that.data.mnt_maint_city);
      //   if (res.code == 200) {
      //     wx.showToast({
      //        title: '新建成功',
      //        icon: 'none',
      //        duration: 2000,
      //        success: function () {
      //          setTimeout(function () {
      //            wx.navigateTo({
      //              url: '../../maint/maint',
      //            })
      //          }, 2000);
      //        }

      //     })
      //   }
      // })
     
      wx.setStorage({
        key: 'maint_page1_data',
        data: {
          mnt_exe_date: e.detail.value.mnt_exe_date,
          mnt_maint_id: e.detail.value.mnt_maint_id,
          mnt_maint_com: e.detail.value.mnt_maint_com,
          mnt_status: 5, 
          mnt_maint_mobile: e.detail.value.mnt_maint_mobile,
          mnt_maint_address: e.detail.value.mnt_maint_address,
          mnt_maint_province: that.data.mnt_maint_province,
          mnt_maint_city: that.data.mnt_maint_city,
          mnt_maint_county: that.data.mnt_maint_county
        },
        success: function (res) {
          console.log("20200126", that.data.rep_repairman_province);
          wx.navigateTo({
            url: '../../worker/new-maint-page2/new-maint-page2',
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