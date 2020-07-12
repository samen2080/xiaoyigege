// pages/community/hot-topic/topic-home/topic-home.js
const app = getApp();
var imgPostf = ["jpg", "png", "bmp", 'jpeg'];
var videoPostf = ['avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'dat', 'mov', 'qt', 'asf', 'wmv', 'mp4'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    hidden: true,
    pubPage:true  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    that.setData({
      host: host,
      topic_id: options.topic_id
    })
    // 相关论坛
    app.func.req('correlation_forum/' + options.topic_id, {}, 'GET', function (res) {
      // console.log(res);
      that.setData({
        forumList: res,
        forum_id: res.forum_id
      })
      that.getIn();
    });
    // 话题主页
    app.func.req('topic_page/'+options.topic_id, { }, 'GET', function (res) {
      // console.log(res);
      that.setData({
        topic: res
      })
    });
    // 活跃用户
    app.func.req('active_user/' + options.topic_id, {}, 'GET', function (res) {
      // console.log(res);
      that.setData({
        userList: res
      })
    });
  },
  // 推荐动态
  getIn:function(){
    var that = this;
    app.func.req('recommend_dynamic/' + that.data.topic_id + '/' + that.data.forum_id, { openid: that.data.openid }, 'GET', function (res) {
      // console.log(res);
      for (var i = 0; i < res.length; i++){
        if (res[i].in_append.length != 0){
          var index1 = res[i].in_append[0].lastIndexOf(".");
          var index2 = res[i].in_append[0].length;
          var postf = res[i].in_append[0].substring(index1 + 1, index2).toLowerCase();
          var result = imgPostf.indexOf(postf);
          if (result != -1){
            res[i].in_append_type = 1;
          } else {
            res[i].in_append_type = 2;
          }
        }        
      }
      that.setData({
        inList: res
      })
    });
  },
  // 单个帖子操作
  listenerButton: function (e) {
    var that = this;
    var arr = that.data.inList;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].in_id == e.currentTarget.dataset.inid) {
        if (arr[i].collect == 0) {
          that.inCollect(['收藏'], e.currentTarget.dataset.inid);
        } else if (arr[i].collect == 1) {
          that.inCollect(["取消收藏"], e.currentTarget.dataset.inid);
        }
      }
    } 
  },
  // 单个帖子收藏
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
              wx.showToast({
                title: '操作成功！',
                icon: 'success',
                success:function(){
                  that.getIn();
                }
              })              
            }
          });
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  // 点赞
  like: function (e) {
    var that = this;
    app.func.req('thumbs_upGood', { openid: that.data.openid, th_good_id: e.currentTarget.dataset.inid, th_type: 2 }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
        that.getIn();
      }
    });
  },
  //查看详情（花费鼓币）
  showPage:function(e){
    var that = this;
    wx.navigateTo({
      url: '../topic-show/topic-show?in_id=' + e.currentTarget.dataset.inid,
    })
    // var index = e.currentTarget.dataset.id;
    // that.setData({
    //   num: index,
    //   hidden: false
    // })
  },

  // 取消查看
  removeCancel: function (e) {
    var that = this;
    that.setData({
      hidden: true
    })
  },

  // 确定查看
  removeSure: function (e) {
    var that = this;
    var arr = that.data.items;
    var num = e.currentTarget.dataset.num;
    that.setData({
      hidden: true
    })
    wx.navigateTo({
      url: '../topic-show/topic-show?in_id=',
    })
  },
  publishBbs:function(e){
    this.setData({
      pubPage: false
    })
  },
  closePage:function(e){
    this.setData({
      pubPage: true
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
    var that = this;
    that.setData({
      pubPage: true
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        that.getIn();
      },
    })
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