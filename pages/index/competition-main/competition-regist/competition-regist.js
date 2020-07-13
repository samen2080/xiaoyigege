// pages/index/competition-main/competition-regist/competition-regist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    inf_code: Math.floor(Math.random()*20000 + 20000),
    com_inf_address_province: "城市",
    com_inf_address_city: "/",
    com_inf_address_county: "区域",
    selectArray1: [{
      "id": "1",
      "text": "男"
    }, {
      "id": "2",
      "text": "女"
    }],

    selectArray2: [{
      "id": "1",
      "text": "1"
    }, {
      "id": "2",
      "text": "2"
    }, {
      "id": "3",
      "text": "3"
    }, {
      "id": "4",
      "text": "4"
    }, {
      "id": "5",
      "text": "5"
      }, {
        "id": "6",
        "text": "6"
      },  {
        "id": "7",
        "text": "7"
      },  {
        "id": "8",
        "text": "8"
      }, {
        "id": "9",
        "text": "9"
      }, {
        "id": "10",
        "text": "10"
      }, {
        "id": "11",
        "text": "11"
      }, {
        "id": "12",
        "text": "12"
      }, {
        "id": "13",
        "text": "13"
      }, {
        "id": "14",
        "text": "14"
      }, {
        "id": "15",
        "text": "15"
      }, {
        "id": "16",
        "text": "16"
      }, {
        "id": "17",
        "text": "17"
      }, {
        "id": "18",
        "text": "18"
      }, {
        "id": "19",
        "text": "19"
      }, {
        "id": "20",
        "text": "20"
      }, {
        "id": "21",
        "text": "21"
      }, {
        "id": "22",
        "text": "22"
      }, {
        "id": "23",
        "text": "23"
      }, {
        "id": "24",
        "text": "24"
      }, {
        "id": "25",
        "text": "25"
      }, {
        "id": "26",
        "text": "26"
      }, {
        "id": "27",
        "text": "27"
      }, {
        "id": "28",
        "text": "28"
      }, {
        "id": "29",
        "text": "29"
      }, {
        "id": "30",
        "text": "30"
      }, {
        "id": "31",
        "text": "31"
      }, {
        "id": "32",
        "text": "32"
      }, {
        "id": "33",
        "text": "33"
      }, {
        "id": "34",
        "text": "34"
      }, {
        "id": "35",
        "text": "35"
      }, {
        "id": "36",
        "text": "36"
      }, {
        "id": "37",
        "text": "37"
      }, {
        "id": "38",
        "text": "38"
      }, {
        "id": "39",
        "text": "39"
      }, {
        "id": "40",
        "text": "40"
      }, {
        "id": "41",
        "text": "41"
      }, {
        "id": "42",
        "text": "42"
      }, {
        "id": "43",
        "text": "43"
      }, {
        "id": "44",
        "text": "44"
      }, {
        "id": "45",
        "text": "45"
      }, {
        "id": "46",
        "text": "46"
      }, {
        "id": "47",
        "text": "47"
      }, {
        "id": "48",
        "text": "48"
      }, {
        "id": "49",
        "text": "49"
      }, {
        "id": "50",
        "text": "50"
      }, {
        "id": "51",
        "text": "51"
      }, {
        "id": "52",
        "text": "52"
      }, {
        "id": "53",
        "text": "53"
      }, {
        "id": "54",
        "text": "54"
      }, {
        "id": "55",
        "text": "55"
      }, {
        "id": "56",
        "text": "56"
      }, {
        "id": "57",
        "text": "57"
      }, {
        "id": "58",
        "text": "58"
      }, {
        "id": "59",
        "text": "59"
      }, {
        "id": "60",
        "text": "60"
      }, {
        "id": "61",
        "text": "61"
      }, {
        "id": "62",
        "text": "62"
      }, {
        "id": "63",
        "text": "63"
      }, {
        "id": "64",
        "text": "64"
      }, {
        "id": "65",
        "text": "65"
      }, {
        "id": "66",
        "text": "66"
      }, {
        "id": "67",
        "text": "67"
      }, {
        "id": "68",
        "text": "68"
      }, {
        "id": "69",
        "text": "69"
      }, {
        "id": "70",
        "text": "70"
      }, {
        "id": "71",
        "text": "71"
      }, {
        "id": "72",
        "text": "72"
      }, {
        "id": "73",
        "text": "73"
      }, {
        "id": "74",
        "text": "74"
      }, {
        "id": "75",
        "text": "75"
      }, {
        "id": "76",
        "text": "76"
      }, {
        "id": "77",
        "text": "77"
      }, {
        "id": "78",
        "text": "78"
      }, {
        "id": "79",
        "text": "79"
      }, {
        "id": "80",
        "text": "80"
      }],
      
      selectArray3: [{
        "id": "1",
        "text": "硬笔"
      }, {
        "id": "2",
        "text": "软笔"
      }],
  },

  getData1: function (e) {
    this.setData({
      com_inf_sex: e.detail.text
    })
  },

  getData2: function (e) {
    this.setData({
      com_inf_age: e.detail.text
     })
  },

  getData3: function (e) {
    this.setData({
      com_inf_pen: e.detail.text
     })
  },

  getData4: function (e) {
    this.setData({
      currentTab: e.target.dataset.current
     })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    var host = getApp().globalData.host;
    var user_id = wx.getStorageSync("index_user_info").user_id;
    that.setData({
      host: host,
      user_id: user_id,
      com_inf_sex: that.data.selectArray1[0].text,
      com_inf_age: that.data.selectArray2[0].text,
      com_inf_pen: that.data.selectArray3[0].text
    });
    // if (!undefined == e.detail.value.com_inf_organization){
    //     wx.setStorage({
    //       key: 'enroll_info',
    //       data: {
    //         inf_organization: e.detail.value.com_inf_organization,
    //       },
    //       success: function () {
    //           console.log("save success");
    //       }
    //     });
    // };
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
      if (e.target.dataset.current == 0){
        
      } else {
  
      }
    }
  },
  
  formSubmit: function (e) {
    var that = this;
    if (that.data.currentTab == 0) {
      that.setData({
        com_inf_organization: e.detail.value.com_inf_organization,
        com_inf_responser: e.detail.value.com_inf_responser,
        com_inf_phone_two: e.detail.value.com_inf_phone_two,

        com_inf_phone: e.detail.value.com_inf_phone,
        com_inf_address_province: e.detail.value.com_inf_address_province,
        com_inf_address_city: e.detail.value.com_inf_address_city,
        com_inf_address_detail: e.detail.value.com_inf_address_detail,
        com_inf_name: e.detail.value.com_inf_name,
        com_inf_ident: e.detail.value.com_inf_ident,
        com_inf_product: e.detail.value.com_inf_product,
        com_inf_calligraphy: e.detail.value.com_inf_calligraphy,
        com_inf_size: e.detail.value.com_inf_size,
        com_inf_content: e.detail.value.com_inf_content,
        com_inf_teacher: e.detail.value.com_inf_teacher
      });
    }else{
      that.setData({
        com_inf_phone: e.detail.value.com_inf_phone,
        com_inf_address_province: e.detail.value.com_inf_address_province,
        com_inf_address_city: e.detail.value.com_inf_address_city,
        com_inf_address_detail: e.detail.value.com_inf_address_detail,
        com_inf_name: e.detail.value.com_inf_name,
        com_inf_ident: e.detail.value.com_inf_ident,
        com_inf_product: e.detail.value.com_inf_product,
        com_inf_calligraphy: e.detail.value.com_inf_calligraphy,
        com_inf_size: e.detail.value.com_inf_size,
        com_inf_content: e.detail.value.com_inf_content,
        com_inf_teacher: e.detail.value.com_inf_teacher
      })
    };

    if (that.data.currentTab == 0) {
      if (that.data.com_inf_organization.length <= 0){
           wx.showToast({
             title: '参赛机构不能为空',
             icon: 'none'
           })		
         } else if (that.data.com_inf_responser.length <= 0){
                 wx.showToast({
                   title: '组织人不能为空',
                   icon: 'none'
                 })
         } else {
                 that.verifyCompetionCommon();
         }	
     }else{
           that.verifyCompetionCommon();
     }
  },

  verifyCompetionCommon() {
    var that = this;
    if (that.data.com_inf_name.length <= 0){
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none'
      })		
      } else if (undefined == that.data.com_inf_sex){
      wx.showToast({
        title: '性别不能为空',
        icon: 'none'
      })
      } else if (undefined == that.data.com_inf_age){
      wx.showToast({
        title: '年龄不能为空',
        icon: 'none'
      })
      } else if (that.data.com_inf_ident.length <= 0){
      wx.showToast({
        title: '身份证不能为空',
        icon: 'none'
      })
      }else if (that.data.com_inf_phone.length <= 0){
      wx.showToast({
        title: '联系方式不能为空',
        icon: 'none'
      })
      } else if (that.data.com_inf_address_province.length <= 0){
      wx.showToast({
        title: '省不能为空',
        icon: 'none'
      })
      } else if (that.data.com_inf_address_city.length <= 0){
      wx.showToast({
        title: '市不能为空',
        icon: 'none'
      })
      } else if (that.data.com_inf_address_detail.length <= 0){
      wx.showToast({
        title: '详细地址不能为空',
        icon: 'none'
      })
      }else if (undefined == that.data.com_inf_pen){
      wx.showToast({
        title: '书法类型不能为空',
        icon: 'none'
      })
      } else if (that.data.com_inf_product.length <= 0){
      wx.showToast({
        title: '作品名称不能为空',
        icon: 'none'
      })
      }else if (that.data.com_inf_calligraphy.length <= 0){
      wx.showToast({
        title: '作品书体不能为空',
        icon: 'none'
      })
      } else if (that.data.com_inf_size.length <= 0){
      wx.showToast({
        title: '作品尺寸不能为空',
        icon: 'none'
      })
     } else if (that.data.com_inf_content.length <= 0){
      wx.showToast({
        title: '作品内容不能为空',
        icon: 'none'
      })
      }else if (that.data.com_inf_teacher.length <= 0){
      wx.showToast({
        title: '指导老师不能为空',
        icon: 'none'
      })
      }else{
        that.addCompetionEnroll();
      }
  },

  addCompetionEnroll() {
  var that = this;
  wx.showModal({
    title: '提示',
    content: '请仔细核对填写信息，如确认无误请点击确认',
    success:function(res){
          if(res.confirm){
            console.log('弹框后点取消')
            if (that.data.currentTab == 0) {
                app.func.req('get_enroll_team', { user_id: that.data.user_id }, 'GET', function (res) {
                  if (undefined != res.com_inf_id) {
                      wx.showToast({
                        title: '已报名团队了!',
                        icon: 'none',
                        duration: 2000
                      })
                  }else{
                  
                    if (that.data.com_inf_sex <= 0){
                      wx.showToast({
                        title: '性别不能为空',
                        icon: 'none'
                      })
                    } else if (that.data.com_inf_age <= 0){
                      wx.showToast({
                        title: '年龄不能为空',
                        icon: 'none'
                      })
                    } else if (that.data.com_inf_pen <= 0){
                      wx.showToast({
                        title: '硬笔软笔类型不能为空',
                        icon: 'none'
                      })
                    }else {
                        app.func.req('enroll_competition_team', {
                          com_inf_type: '团队参赛',
                          com_inf_organization: that.data.com_inf_organization,
                          com_inf_responser: that.data.com_inf_responser,
                          com_inf_phone: that.data.com_inf_phone,
                          com_inf_phone_two: that.data.com_inf_phone_two,
                          com_inf_address_province: that.data.com_inf_address_province,
                          com_inf_address_city: that.data.com_inf_address_city,
                          com_inf_address_city: that.data.com_inf_address_county,
                          com_inf_address_detail: that.data.com_inf_address_detail,

                          com_inf_name: that.data.com_inf_name,
                          com_inf_sex: that.data.com_inf_sex,
                          com_inf_age: that.data.com_inf_age,

                          com_inf_ident: that.data.com_inf_ident,
                          com_inf_pen: that.data.com_inf_pen,
                          com_inf_product: that.data.com_inf_product,
                          com_inf_calligraphy: that.data.com_inf_calligraphy,
                          com_inf_size: that.data.com_inf_size,
                          com_inf_content: that.data.com_inf_content,
                          com_inf_teacher: that.data.com_inf_teacher,
                          com_inf_user_id: that.data.user_id,
                          com_inf_code: that.data.inf_code
                        }, 'POST', function (res) {
                          if (res.code == 200) {
                            wx.navigateTo({
                              url: 'payment/payment?inf_code=' + that.data.inf_code,
                            })
                          }
                        });
                      }
                    } 
                });
              }else{
                app.func.req('get_enroll_individual', { user_id: that.data.user_id }, 'GET', function (res) {
                  console.log("20200711 res", res);
                  if (undefined != res.com_inf_id) {
                    wx.showToast({
                        title: '已报名个人了!',
                        icon: 'none',
                        duration: 2000
                      })
                  }else{
                        app.func.req('enroll_competition_individual', {
                          com_inf_type: '个人参赛',
                          com_inf_name: that.data.com_inf_name,
                          com_inf_sex: that.data.com_inf_sex,
                          com_inf_age: that.data.com_inf_age,

                          com_inf_ident: that.data.com_inf_ident,
                          com_inf_phone: that.data.com_inf_phone,
                          com_inf_address_province: that.data.com_inf_address_province,
                          com_inf_address_city: that.data.com_inf_address_city,
                          com_inf_address_city: that.data.com_inf_address_county,
                          com_inf_address_detail: that.data.com_inf_address_detail,

                          com_inf_pen: that.data.com_inf_pen,
                          com_inf_product: that.data.com_inf_product,
                          com_inf_calligraphy: that.data.com_inf_calligraphy,
                          com_inf_size: that.data.com_inf_size,
                          com_inf_content: that.data.com_inf_content,
                          com_inf_teacher: that.data.com_inf_teacher,
                          com_inf_user_id: that.data.user_id,
                          com_inf_code: that.data.inf_code

                        }, 'POST', function (res) {
                          if (res.code == 200) {
                            wx.navigateTo({
                              url: 'payment/payment?inf_code=' + that.data.inf_code,
                            })
                          }
                        });
                      }
                    });
              };
          }else{
              console.log('弹框后点取消')
              wx.navigateBack({
                    delta: 1
                  })
          }
    }
  })
  },

  bindRegionChange: function(t) {
    console.log("picker发送选择改变，携带值为", t.detail.value);
    var e = t.detail.value[1];
    -1 != e.indexOf("市") ? (console.log("有市"), this.setData({
        select_city: e
    })) : wx.showModal({
        title: "温馨提示",
        content: "当前城市选择仅支持市"
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
    this.setData({
      com_inf_address_province: wx.getStorageSync("province"),
      com_inf_address_city: wx.getStorageSync("city"),
      com_inf_address_county: wx.getStorageSync("county")
  });
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