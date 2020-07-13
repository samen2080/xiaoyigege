// pages/index/competition-main/competition-enroll/competition-enroll.js
// pages/index/competition-main/city/city.js
var app = getApp();

Page({
    data: {
        hot_city: [ "北京市", "上海市", "深圳市", "广州市", "重庆市", "天津市", "长沙市", "成都市", "杭州市", "昆明市", "南京市", "武汉市", "厦门市", "西安市", "郑州市" ],
        picker_city: !1,
        city_search: !1,
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
    onLoad: function(t) {
        // app.setNavigationBarColor(this), 
        var host = getApp().globalData.host;
        console.log(wx.getStorageSync("location_city")), 
        this.setData({
            location_city: wx.getStorageSync("location_city")[1],
            region: wx.getStorageSync("location_city")
        });

        var user_id = wx.getStorageSync("index_user_info").user_id;

        this.setData({
            host: host,
            user_id: user_id,
            com_inf_sex: this.data.selectArray1[0].text,
            com_inf_age: this.data.selectArray2[24].text,
            com_inf_pen: this.data.selectArray3[0].text
          });
    },

    refresh: function(t) {
        var c = this;
        if ("" == wx.getStorageSync("citys")) {
            console.log("没有城市的缓存"), new QQMapWX({
                key: "FQIBZ-FOE3Q-CY354-GLNJF-3NUHZ-SBBO6"
            }).getCityList({
                success: function(t) {
                    wx.setStorageSync("citys", t), console.log(t);
                    var e = t.result[0], i = e[0];
                    if ("市" == i.fullname.charAt(i.fullname.length - 1, 1)) (a = [])[0] = i; else var a = t.result[1].slice(i.cidx[0], i.cidx[1]);
                    c.setData({
                        citys: e.slice(),
                        more_city: t.result[0],
                        province: a,
                        all_city: t.result
                    });
                },
                fail: function(t) {
                    console.log(t);
                },
                complete: function(t) {
                    console.log(t);
                }
            });
        } else {
            console.log("有城市的缓存");
            var e = wx.getStorageSync("citys");
            console.log(e);
            var i = e.result[0], a = i[0];
            if ("市" == a.fullname.charAt(a.fullname.length - 1, 1)) (n = [])[0] = a; else var n = e[1].slice(a.cidx[0], a.cidx[1]);
            c.setData({
                citys: i.slice,
                more_city: e.result[0],
                province: n,
                all_city: e.result
            });
        }
    },
    more_city: function(t) {
        var e = this;
        0 == e.data.picker_city ? e.setData({
            picker_city: !0
        }) : e.setData({
            picker_city: !1
        });
    },
    bindChange: function(t) {
        var e = t.detail.value;
        console.log(t);
        var i = this.data.all_city, a = e[0], c = i[0][a];
        if ("市" == c.fullname.charAt(c.fullname.length - 1, 1)) {
            (n = [])[0] = c;
        } else {
            var n = [];
            console.log(i[1]), n = i[1].slice(c.cidx[0], c.cidx[1]);
        }
        this.setData({
            province: n,
            citys: i[0]
        });
    },
    search: function(t) {
        var e = this;
        var i = e.data.all_city, a = t.detail.value;
        if ("" != a) {
            var c = [];
            for (var n in i[1]) -1 == i[1][n].pinyin[0].indexOf(a) && -1 == i[1][n].pinyin[1].indexOf(a) && -1 == i[1][n].fullname.indexOf(a) || "区" != i[1][n].fullname.charAt(i[1][n].fullname.length - 1, 1) && "县" != i[1][n].fullname.charAt(i[1][n].fullname.length - 1, 1) && c.push(i[1][n]);
            e.setData({
                city_result: c,
                city_search: !0
            });
        } else e.setData({
            city_search: !1,
            city_result: []
        });
    },
    select: function(t) {
        var e = t.currentTarget.dataset.province;
        var f = t.currentTarget.dataset.city;
        var g = t.currentTarget.dataset.county;
        wx.setStorageSync("province", e),
        wx.setStorageSync("city", f),
        wx.setStorageSync("county", g), 
        app.globalData.sele_city = 0, wx.redirectTo({
            url: "../competition-regist/competition-regist"
        }), app.util.request({
            url: "entry/wxapp/SaveCity",
            cachetime: "0",
            data: {
                cityname: f
            },
            success: function(t) {
                console.log("这是保存城市");
            }
        });
    },
    bindRegionChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value);
        var e = t.detail.value[0];
        var f = t.detail.value[1];
        var g = t.detail.value[2];
        console.log("picker f", f);
        console.log("picker indexof 市", f.indexOf("市"));
        -1 != f.indexOf("市") ? (console.log("有市"), this.setData({
            select_province: e,
            select_city: f,
            select_county: g
        })) : wx.showModal({
            title: "温馨提示",
            content: "当前城市选择仅支持市"
        });
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
        com_inf_address_province: that.data.select_province,
        com_inf_address_city: that.data.select_city,
        com_inf_address_county: that.data.select_county,
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
        com_inf_address_province: that.data.select_province,
        com_inf_address_city: that.data.select_city,
        com_inf_address_county: that.data.select_county,
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
    //   } else if (undefined == that.data.com_inf_sex){
    //   wx.showToast({
    //     title: '性别不能为空',
    //     icon: 'none'
    //   })
    //   } else if (undefined == that.data.com_inf_age){
    //   wx.showToast({
    //     title: '年龄不能为空',
    //     icon: 'none'
    //   })
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
      } else if (undefined == that.data.select_province){
      wx.showToast({
        title: '省不能为空',
        icon: 'none'
      })
      } else if (undefined == that.data.select_city){
      wx.showToast({
        title: '市不能为空',
        icon: 'none'
      })
      } else if (undefined == that.data.select_county){
        wx.showToast({
          title: '区不能为空',
          icon: 'none'
        })
      } else if (that.data.com_inf_address_detail.length <= 0){
      wx.showToast({
        title: '详细地址不能为空',
        icon: 'none'
      })
    //   }else if (undefined == that.data.com_inf_pen){
    //   wx.showToast({
    //     title: '书法类型不能为空',
    //     icon: 'none'
    //   })
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
                  
                    // if (that.data.com_inf_sex <= 0){
                    //   wx.showToast({
                    //     title: '性别不能为空',
                    //     icon: 'none'
                    //   })
                    // } else if (that.data.com_inf_age <= 0){
                    //   wx.showToast({
                    //     title: '年龄不能为空',
                    //     icon: 'none'
                    //   })
                    // } else if (that.data.com_inf_pen <= 0){
                    //   wx.showToast({
                    //     title: '硬笔软笔类型不能为空',
                    //     icon: 'none'
                    //   })
                    // }else {
                        app.func.req('enroll_competition_team', {
                          com_inf_type: '团队参赛',
                          com_inf_organization: that.data.com_inf_organization,
                          com_inf_responser: that.data.com_inf_responser,
                          com_inf_phone: that.data.com_inf_phone,
                          com_inf_phone_two: that.data.com_inf_phone_two,
                          com_inf_address_province: that.data.com_inf_address_province,
                          com_inf_address_city: that.data.com_inf_address_city,
                          com_inf_address_county: that.data.com_inf_address_county,
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
                              url: '../competition-regist/payment/payment?inf_code=' + that.data.inf_code,
                            })
                          }
                        });
                      //}
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
                          com_inf_address_county: that.data.com_inf_address_county,
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
                              url: '../competition-regist/payment/payment?inf_code=' + that.data.inf_code,
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

    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});