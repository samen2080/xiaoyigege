// pages/community/hot-topic/topic-show/topic-show.js
const app = getApp();
var imgPostf = ["jpg", "png", "bmp", 'jpeg'];
var videoPostf = ['avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'dat', 'mov', 'qt', 'asf', 'wmv', 'mp4'];
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    that.setData({
      host: host,
      in_id: options.in_id
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        that.getShow();
        that.getComm();
      },
      fail: function () {
        wx.redirectTo({
          url: '../../../start/start',
        })
      }
    })
  },
  // 详情
  getShow: function () {
    var that = this;
    app.func.req('invitation_detail', { in_id: that.data.in_id, openid: that.data.openid }, 'GET', function (del) {
      // console.log(del);
      if (del.code == 50001) {
        wx.showModal({
          title: '想看全部内容吗?',
          content: '兑换' + del.money + '鼓币才能查看哦~',
          confirmText: '消耗鼓币',
          confirmColor: '#19c810',
          success(res) {
            if (res.confirm) {
              app.func.req('is_pay', { in_id: that.data.in_id, openid: that.data.openid }, 'POST', function (result) {
                // console.log(result);
                if (result.code == 50002) {
                  wx.showToast({
                    title: '鼓币不足',
                    icon: 'none',
                    success: function () {
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  })
                } else if (result.code == 200) {
                  that.getShow();
                }
              });
            } else if (res.cancel) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      } else {
        that.addShow();
        if (del.in_append.length != 0) {
          var index1 = del.in_append[0].lastIndexOf(".");
          var index2 = del.in_append[0].length;
          var postf = del.in_append[0].substring(index1 + 1, index2).toLowerCase();
          var result = imgPostf.indexOf(postf);
          var result2 = videoPostf.indexOf(postf);
          if (result != -1) {
            del.in_append_type = 1;
          } else if (result2 != -1) {
            del.in_append_type = 2;
          }
        }
        that.setData({
          inshow: del
        })
      }      
    });    
  },
  // 增加浏览量
  addShow() {
    var that = this;
    app.func.req('add_volume', { openid: that.data.openid, type: 2, browse_forum_id: that.data.in_id }, 'POST', function (res) {})
  },
  // 点赞
  like: function (e) {
    var that = this;
    app.func.req('thumbs_upGood', { openid: that.data.openid, th_good_id: e.currentTarget.dataset.inid, th_type: 2 }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
        that.getShow();
      }
    });
  },
  // 评论列表
  getComm:function(){
    var that = this;
    app.func.req('get_comment', { com_in_id: that.data.in_id, pageSize: 5, page: 1 }, 'GET', function (res) {
      // console.log(res);
      that.setData({
        commList: res
      })
    });
  },
// 关注/取消
  focus: function (e) {
    var that = this;
    app.func.req('follow_user', { openid: that.data.openid, fo_followed_id: that.data.inshow.user_id }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 10006) {
        wx.showToast({
          title: '关注成功！',
          icon: 'success',
          success: function () {
            that.getShow();
          }
        })
      } else if (res.code == 10007) {
        wx.showToast({
          title: '取消关注成功！',
          icon: 'none',
          success: function () {
            that.getShow();
          }
        })
      }
    });
  },
  fullSize:function(e){
    var src = e.currentTarget.dataset.src;
    for (var i = 0; i < this.data.inshow.in_append.length; i++){
      this.data.inshow.in_append[i] = this.data.host + this.data.inshow.in_append[i];
    }
    //图片预览
    wx.previewImage({
      current: src, 
      urls: this.data.inshow.in_append 
    })
  },

  // 发表评论
  formSubmit:function(e){
    var that = this;
    if(e.detail.value.comment.length <= 0){
      wx.showToast({
        title: '评论不能为空！',
        icon: 'none'
      })
    } else {
      app.func.req('save_comment', { openid: that.data.openid, com_in_id: that.data.in_id, com_desc: e.detail.value.comment }, 'POST', function (res) {
        // console.log(res);
        if (res.code == 200){
          wx.showToast({
            title: '评论成功！',
            icon: 'success',
            success: function () {
              that.setData({
                comment: ''
              })
              that.getComm();
            }
          })
        } else {
          wx.showToast({
            title: '评论失败！',
            icon: 'none',
          })
        }        
      });
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