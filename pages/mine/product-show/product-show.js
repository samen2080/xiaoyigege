// pages/mine/product-show/product-show.js
const app = getApp();
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    hidden: true,
    onhidden: true,
    onbtnShow: true,
    rebtnShow: false,
    buyShow: true,
    hasMore: true,
    messageList: []
  },

  // 下架
  removePro: function (e) {
    var that = this;
    that.setData({
      hidden: false
    })
  },

  // 取消下架
  removeCancel: function (e) {
    var that = this;
    that.setData({
      hidden: true,
      onhidden: true
    })
  },

  // 确定下架
  removeSure: function (e) {
    var that = this;
    that.published(1);
    that.setData({
      hidden: true
    })
  },
  // 上架
  onPro: function (e) {
    var that = this;
    that.setData({
      onhidden: false
    })
  },
  // 确定上架
  onSure: function (e) {
    var that = this;
    that.published(2);
    that.setData({
      onhidden: true
    })
  },
  // 上架/下架
  published: function (is_published) {
    var that = this;
    app.func.req('save_release_goods', { old_id: that.data.pro_id, is_published: is_published }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
        // that.getDetail(that.data.pro_id);
        wx.showToast({
          title: '成功！',
          icon: 'success',
          success() {
            setTimeout(function () {
              wx.navigateBack({
                del: 1
              })
            }, 1500)
          }
        })
      }
    });
  },
  // 购买
  buyPro: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../../index/transaction/buy/buy?old_id=' + that.data.pro_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    var that = this;
    var host = getApp().globalData.host;
    that.setData({
      host: host,
      pro_id: options.pro_id
    })
    if (options.status == 0) {
      that.setData({
        hidden: true,
        onbtnShow: true,
        rebtnShow: false,
        buyShow: true,
        status: 0
      })
    } else {
      that.setData({
        hidden: true,
        onbtnShow: true,
        rebtnShow: true,
        buyShow: false,
        status: 1
      })
    }
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        app.func.req('get_user', { openid: res.data }, 'GET', function (res) {
          // console.log(res);
          that.setData({
            userImg: res.user_headimg,
            user_id: res.user_id
          })
        });
        that.getDetail(options.pro_id);
      },
    })
    // 留言列表
    that.getMessage(options.pro_id, 1);
    // 相似推荐
    app.func.req('old_recommend/' + options.pro_id, {}, 'GET', function (res) {
      // console.log(res);
      that.setData({
        proList: res
      })
    });
  },
  // 商品详情
  getDetail: function (old_id) {
    var that = this;
    app.func.req('old_detail/' + old_id, { openid: that.data.openid }, 'GET', function (res) {
      // console.log(res);
      that.setData({
        old_name: res.old_name,
        pro_id: res.old_id,
        old_describe: res.old_describe,
        old_money: res.old_money,
        old_collect: res.collect,
        user_nickname: res.user_nickname,
        user_headimg: res.user_headimg,
        user_address: res.old_area,
        imgUrls: res.old_img,
        old_user_id: res.old_user_id
      })
      if (res.is_published == 2 && that.data.status == 0) {
        that.setData({
          onbtnShow: false,
          rebtnShow: true
        })
      } else if (res.is_published == 1 && that.data.status == 0) {
        that.setData({
          onbtnShow: true,
          rebtnShow: false
        })
      }
    });
  },
  fullSize: function (e) {
    var src = e.currentTarget.dataset.src;
    for (var i = 0; i < this.data.imgUrls.length; i++) {
      this.data.imgUrls[i] = this.data.host + this.data.imgUrls[i];
    }
    //图片预览
    wx.previewImage({
      current: src,
      urls: this.data.imgUrls
    })
  },
  // 发表留言
  formSubmit: function (e) {
    var that = this;
    app.func.req('message_add', { user_id: that.data.openid, om_content: e.detail.value.comment, old_id: that.data.pro_id }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
        wx.showToast({
          title: '发表成功！',
          icon: 'success',
          success: function (res) {
            that.setData({
              comment: ''
            })
            that.getMessage(that.data.pro_id, 1);
          }
        })

      }
    });
  },
  // 获取留言列表
  getMessage: function (old_id, p) {
    var that = this;
    app.func.req('message_list', { pageSize: 5, page: p, old_id: old_id }, 'GET', function (res) {
      // console.log(res);
      if (res.length <= 0) {
        wx.showToast({
          title: '没有更多留言了~',
          icon: 'none'
        })
        that.setData({
          hasMore: false
        })
      } else if (res.length < 5 && res.length > 0) {
        that.setData({
          hasMore: false
        })
      } else if (res.length >= 5) {
        that.setData({
          hasMore: true
        })
        page += 1;
      }
      that.setData({
        messageList: that.data.messageList.concat(res)
      })
    });
  },
  // 更多留言
  messMore: function () {
    var that = this;
    that.getMessage(that.data.pro_id, page);
  },
  // 收藏/取消收藏
  collect: function () {
    var that = this;
    app.func.req('collect', { coll_type: 2, coll_user_id: that.data.openid, coll_good_id: that.data.pro_id }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
        that.getDetail(that.data.pro_id);
      }
    });
  },
  // 相似推荐点击
  show: function (e) {
    var that = this;
    that.getDetail(e.currentTarget.dataset.oldid);
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
      that.getMessage(e.currentTarget.dataset.oldid, 1);
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target);
    }
    return {
      title: '转发标题'
    }
  }
})