// pages/community/community.js
const app = getApp()
var template = require('../../template/template.js');
var imgPostf = ["jpg", "png", "bmp", 'jpeg'];
var videoPostf = ['avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'dat', 'mov', 'qt', 'asf', 'wmv', 'mp4'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperCurrent: 0,
    bbsList: [],
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload",options)
    template.tabbar("tabBar", 1, this)//0表示第一个tabbar
    var that = this;
    var host = app.globalData.host;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          host: host,
          openid :res.data
        })
        that.getInvitation();
      },
      fail: function () {
        wx.redirectTo({
          url: '../start/start',
        })
      }
    })    
    // 热门话题
    app.func.req('hot_topic', { pageSize: 3, page: 1 }, 'GET', function (res) {
      console.log("hotTopic",res);
      that.setData({
        hotList: res
      })
    });
    // 论坛
    app.func.req('forum', { pageSize: 6, page: 1 }, 'GET', function (res) {
      console.log("forum", res);
      for(var i = 0; i< res.length; i++){
        res[i].isfocus = false;
      }
      that.setData({
        bbsList: res
      })
    });
  },
  // 请求帖子数据
  getInvitation:function(){
    var that = this;
    app.func.req('community_invitation', { type: 1, status: 1, pageSize: 5, page: 1, openid: that.data.openid }, 'GET', function (res) {
      console.log("comm",res);
      for (var i = 0; i < res.length; i++) {
        if (res[i].in_append.length != 0) {
          var index1 = res[i].in_append[0].lastIndexOf(".");
          var index2 = res[i].in_append[0].length;
          var postf = res[i].in_append[0].substring(index1 + 1, index2).toLowerCase();
          var result = imgPostf.indexOf(postf);
          if (result != -1) {
            res[i].in_append_type = 1;
          } else {
            res[i].in_append_type = 2;
          }
        }
      }
      that.setData({
        items: res
      })
    });
  },
  // 搜索
  searchPage: function () {
    wx.navigateTo({
      url: '../index/search/search',
    })
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  // 加入论坛
  // focus: function (e) {
  //   console.log(e.currentTarget.id);
  //   for (var i = 0; i < this.data.bbsList.length; i++) {
  //     if (e.currentTarget.id == this.data.bbsList[i].forum_id) {
  //       if (this.data.bbsList[i].isfocus == true) {
  //         this.data.bbsList[i].isfocus = false;
  //         var bbsList = this.data.bbsList;
  //         this.setData({
  //           bbsList
  //         })
  //       } else {
  //         this.data.bbsList[i].isfocus = true;
  //         var bbsList = this.data.bbsList;
  //         this.setData({
  //           bbsList
  //         })
  //       }
  //     }
  //   }
  // },
  // 全部分类
  allButton: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['默认', '精华帖', '鼓教材', '鼓谱', '其他'],//显示的列表项
      itemColor: '#000000',
      success: function (res) {
        if (res.tapIndex === 0) {

        } else if (res.tapIndex === 1) {

        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  // 排序
  sortButton: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['默认', '最新', '热门', '关注'],//显示的列表项
      itemColor: '#000000',
      success: function (res) {
        if (res.tapIndex === 0) {

        } else if (res.tapIndex === 1) {

        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  // 单个帖子操作
  listenerButton: function (e) {
    var that = this;
    var arr = that.data.items;
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
  // 帖子收藏
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
              that.getInvitation();
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
        that.getInvitation();
      }
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