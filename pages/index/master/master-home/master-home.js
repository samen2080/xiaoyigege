// pages/index/master/master-home/master-home.js
const app = getApp()
var imgPostf = ["jpg", "png", "bmp", 'jpeg'];
var videoPostf = ['avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'dat', 'mov', 'qt', 'asf', 'wmv', 'mp4'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    that.setData({
      host: host,
      master_id: options.master_id
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        that.getDetail();
      },
    })    
  },
  // 大师详情
  getDetail:function(){
    var that = this;
    app.func.req('get_list', { query: 1, id: that.data.master_id, openid: that.data.openid }, 'GET', function (res) {
      // console.log(res);
      that.setData({
        user_id: res.user_id,
        user_headimg: res.user_headimg,
        user_nickname: res.user_nickname,
        user_topic_count: res.user_topic_count,
        user_invitation_count: res.user_invitation_count,
        user_followers_count: res.user_followers_count,
        user_following_count: res.user_following_count,
        user_intro: res.user_intro,
        user_skilled: res.user_skilled,
        is_follow: res.follow
      })
    });
  },
  // 动态
  getIn: function () {
    var that = this;
    app.func.req('great_dynamic', { pageSize: 10, page: 1, in_user_id: that.data.master_id, query: 1, openid: that.data.openid}, 'GET', function (res) {
      // console.log(res);
      for (var i = 0; i < res.length; i++) {
        if (res[i].in_append.length != 0) {
          var index1 = res[i].in_append[0].lastIndexOf(".");
          var index2 = res[i].in_append[0].length;
          var postf = res[i].in_append[0].substring(index1 + 1, index2).toLowerCase();
          var result = imgPostf.indexOf(postf);
          var result2 = videoPostf.indexOf(postf);
          if (result > -1) {
            res[i].in_append_type = 1;
          } else if (result <= -1 && result2 > -1) {
            res[i].in_append_type = 2;
          } else if (result <= -1 && result2 <= -1)  {
            res[i].in_append_type = 0;
          }
        }
      } 
      that.setData({
        inList: res
      })
    });
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
        that.getDetail();
      } else {
        that.getIn();
      }
    }
  },
  masterPost:function(e){
    var that = this;
    that.setData({
      currentTab: 1
    })
  },
  // 单个操作
  listenerButton: function (e) {
    var that = this;
    var arr = that.data.inList;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].in_id == e.currentTarget.dataset.inid) {
        if (arr[i].collect == 0) {
          that.inCollect(["收藏"], e.currentTarget.dataset.inid);
        } else if (arr[i].collect == 1) {
          that.inCollect(["取消收藏"], e.currentTarget.dataset.inid);
        }
      }
    }  
  },
  // 内容精选收藏
  inCollect: function (item, coll_good_id) {
    var that = this;
    wx.showActionSheet({
      itemList: item,//显示的列表项
      itemColor: '#000000',
      success: function (res) {
        if (res.tapIndex === 0) {
          app.func.req('collect', { coll_type: 1, coll_user_id: that.data.openid, coll_good_id: coll_good_id }, 'POST', function (res) {
            // console.log(res);
            if (res.code == 200) {
              that.getIn();
            }
          });
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  // 关注/取消
  focus:function(e){
    var that = this;
    app.func.req('follow_user', { openid: that.data.openid, fo_followed_id: that.data.user_id }, 'POST', function (res) {
      // console.log(res);
      that.getDetail();
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