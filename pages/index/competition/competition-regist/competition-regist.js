// pages/index/competition/competition-regist/competition-regist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    selectArray1: [{
      "id": "1",
      "text": "男"
    }, {
      "id": "2",
      "text": "女"
    }],

    selectArray2: [{
      "id": "1",
      "text": "1970"
    }, {
      "id": "2",
      "text": "1971"
    }, {
      "id": "3",
      "text": "1972"
    }, {
      "id": "4",
      "text": "1973"
    }, {
      "id": "5",
      "text": "1974"
      }, {
        "id": "6",
        "text": "1975"
      },  {
        "id": "7",
        "text": "1976"
      },  {
        "id": "8",
        "text": "1977"
      }, {
        "id": "9",
        "text": "1978"
      }, {
        "id": "10",
        "text": "1979"
      }, {
        "id": "11",
        "text": "1980"
      }, {
        "id": "12",
        "text": "1981"
      }, {
        "id": "13",
        "text": "1982"
      }, {
        "id": "14",
        "text": "1983"
      }, {
        "id": "15",
        "text": "1984"
      }, {
        "id": "16",
        "text": "1985"
      }, {
        "id": "17",
        "text": "1986"
      }, {
        "id": "18",
        "text": "1987"
      }, {
        "id": "19",
        "text": "1988"
      }, {
        "id": "20",
        "text": "1989"
      }, {
        "id": "21",
        "text": "1990"
      }, {
        "id": "22",
        "text": "1991"
      }, {
        "id": "23",
        "text": "1992"
      }, {
        "id": "24",
        "text": "1993"
      }, {
        "id": "25",
        "text": "1994"
      }, {
        "id": "26",
        "text": "1995"
      }, {
        "id": "27",
        "text": "1996"
      }, {
        "id": "28",
        "text": "1997"
      }, {
        "id": "29",
        "text": "1998"
      }, {
        "id": "30",
        "text": "1999"
      }, {
        "id": "31",
        "text": "2000"
      }, {
        "id": "32",
        "text": "2001"
      }, {
        "id": "33",
        "text": "2002"
      }, {
        "id": "34",
        "text": "2003"
      }, {
        "id": "35",
        "text": "2004"
      }, {
        "id": "36",
        "text": "2005"
      }, {
        "id": "37",
        "text": "2006"
      }, {
        "id": "38",
        "text": "2007"
      }, {
        "id": "39",
        "text": "2008"
      }, {
        "id": "40",
        "text": "2009"
      }, {
        "id": "41",
        "text": "2010"
      }, {
        "id": "42",
        "text": "2011"
      }, {
        "id": "43",
        "text": "2012"
      }, {
        "id": "44",
        "text": "2013"
      }, {
        "id": "45",
        "text": "2014"
      }, {
        "id": "46",
        "text": "2015"
      }, {
        "id": "47",
        "text": "2016"
      }, {
        "id": "48",
        "text": "2017"
      }, {
        "id": "49",
        "text": "2018"
      }, {
        "id": "50",
        "text": "2019"
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
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    var user_id = wx.getStorageSync("index_user_info").user_id;
    that.setData({
      host: host,
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
    wx.showModal({
      title: '提示',
      content: '请仔细核对填写信息，如确认无误请点击确认',
      success:function(res){
            if(res.confirm){
              console.log('弹框后点取消')

              if (that.data.currentTab == 0) {
                  app.func.req('add_com_info_one', {
                    com_inf_type: '团队参赛',
                    com_inf_organization: e.detail.value.com_inf_organization,
                    com_inf_responser: e.detail.value.com_inf_responser,
                    com_inf_phone: e.detail.value.com_inf_phone,
                    com_inf_phone_two: e.detail.value.com_inf_phone_two,
                    com_inf_address_province: e.detail.value.com_inf_address_province,
                    com_inf_address_area: e.detail.value.com_inf_address_area,
                    com_inf_address_detail: e.detail.value.com_inf_address_detail,

                    com_inf_name: e.detail.value.com_inf_name,
                    com_inf_sex: that.data.com_inf_sex,
                    com_inf_age: that.data.com_inf_age,

                    com_inf_ident: e.detail.value.com_inf_ident,
                    com_inf_pen: that.data.com_inf_pen,
                    com_inf_product: e.detail.value.com_inf_product,
                    com_inf_calligraphy: e.detail.value.com_inf_calligraphy,
                    com_inf_size: e.detail.value.com_inf_size,
                    com_inf_content: e.detail.value.com_inf_content,
                    com_inf_teacher: e.detail.value.com_inf_teacher,

                    com_inf_user_id: wx.getStorageSync("index_user_info").user_id,
            
                    openid: that.data.openid,
                  }, 'POST', function (res) {
                    if (res.code == 200) {
                      wx.navigateTo({
                        url: 'payment/payment',
                      })
                    }
                  });
                }else{
                  app.func.req('add_com_info_two', {
                    com_inf_type: '个人参赛',
                    com_inf_name: e.detail.value.com_inf_name,
                    com_inf_sex: that.data.com_inf_sex,
                    com_inf_age: that.data.com_inf_age,

                    com_inf_ident: e.detail.value.com_inf_ident,
                    com_inf_phone: e.detail.value.com_inf_phone,
                    com_inf_address_province: e.detail.value.com_inf_address_province,
                    com_inf_address_area: e.detail.value.com_inf_address_area,
                    com_inf_address_detail: e.detail.value.com_inf_address_detail,

                    com_inf_pen: that.data.com_inf_pen,
                    com_inf_product: e.detail.value.com_inf_product,
                    com_inf_calligraphy: e.detail.value.com_inf_calligraphy,
                    com_inf_size: e.detail.value.com_inf_size,
                    com_inf_content: e.detail.value.com_inf_content,
                    com_inf_teacher: e.detail.value.com_inf_teacher,

                    com_inf_user_id: wx.getStorageSync("index_user_info").user_id,


            
                  }, 'POST', function (res) {
                    if (res.code == 200) {
                      wx.navigateTo({
                        url: 'payment/payment',
                      })
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