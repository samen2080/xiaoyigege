// pages/mine/buy/product-show/product-show.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    cancel:false,
    //20191102 start
    flag: [0, 0, 0],
    startext: ['', '', ''],
    stardata: [1, 2, 3, 4, 5]
    //20191102 end

  },
  // 20191102 start
  changeColor: function (e) {
    var index = e.currentTarget.dataset.index;
    var num = e.currentTarget.dataset.no;
    var a = 'flag[' + index + ']';
    var b = 'startext[' + index + ']';
    var that = this;
    if (num == 1) {
      that.setData({
        [a]: 1,
        [b]: '非常不满意'
      });
    } else if (num == 2) {
      that.setData({
        [a]: 2,
        [b]: '不满意'
      });
    } else if (num == 3) {
      that.setData({
        [a]: 3,
        [b]: '一般'
      });
    } else if (num == 4) {
      that.setData({
        [a]: 4,
        [b]: '满意'
      });
    } else if (num == 5) {
      that.setData({
        [a]: 5,
        [b]: '非常满意'
      });
    }
  },
  // 取消
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  // 提交
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.con_rating_com.length <= 0) {
      wx.showToast({
        title: '评价意见不能为空!',
        icon: 'none'
      })
      // } else if (e.currentTarget.dataset.no.length <= 0) {
      //   wx.showToast({
      //     title: '请评级服务质量!',
      //     icon: 'none'
      //   })

    } else {
      app.func.req('update_contract_comment', {
        // contract_id: that.data.contract_id,
        // con_rating_grade: e.detail.value.con_rating_grade, 
        con_id: con_id,
        con_rating_comment: e.detail.value.con_rating_com
      },
        'POST',
        function (res) {
          // console.log(res);
          if (res.code == 200) {
            wx.showToast({
              title: '提交成功!',
              icon: 'success',
              success: function () {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }
        });
    }
  },
  // 2019/11/02 end
  
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    that.setData({
      host: host,
      tra_id: options.tra_id
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      },
    })
    that.getDetail();
  },

  // 取消交易/删除订单
  removePro: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.id;
    that.setData({
      num: index,
      hidden: false
    })
    if (index == 0){
      that.setData({
        txt: "确定要取消吗？"
      })
    } else if (index == 1){
      that.setData({
        txt: "确定要删除吗？"
      })
    }
  },

  // 再想想
  removeCancel: function (e) {
    var that = this;
    that.setData({
      hidden: true
    })
  },

  // 确定
  removeSure: function (e) {
    var that = this;
    var num = e.currentTarget.dataset.num; 
    if (num == 0) {
      app.func.req('cancel_trade', { openid: that.data.openid, tra_id: that.data.tra_id }, 'POST', function (res) {
        // console.log(res);
        if (res.code == 200) {
          that.getDetail();
          that.setData({
            hidden: true,
            cancel: true
          })
        }
      });
    } else if (num == 1) {
      app.func.req('del_trade', { openid: that.data.openid, tra_id: that.data.tra_id }, 'POST', function (res) {
        // console.log(res);
        if (res.code == 200) {
          wx.navigateBack({
            delta: 1
          })
        }
      });
    }   
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   var that = this;
  //   var host = app.globalData.host;
  //   that.setData({
  //     host: host,
  //     tra_id: options.tra_id
  //   })
  //   wx.getStorage({
  //     key: 'openid',
  //     success: function (res) {
  //       that.setData({
  //         openid: res.data
  //       })
  //     },
  //   })
  //   that.getDetail();
  // },
  getDetail:function(){
    var that = this;
    app.func.req('trade_detail/' + that.data.tra_id, {}, 'GET', function (res) {
      that.setData({
        items: res
      })
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