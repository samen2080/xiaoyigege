//index.js
//获取应用实例
const app = getApp()
var template = require('../../template/template.js');
var imgPostf = ["jpg", "png", "bmp", 'jpeg'];
var videoPostf = ['avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'dat', 'mov', 'qt', 'asf', 'wmv', 'mp4'];
Page({
  data: {
    swiperCurrent: 0
  },
  onLoad: function () {
    template.tabbar("tabBar", 0, this)//0表示第一个tabbar
    var that = this;
    var host = getApp().globalData.host;
    that.setData({
      host: host
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        that.getIn();
        // 品牌广告
        app.func.req('get_list', { query: 4, pageSize: 4, page: 1, openid: that.data.openid }, 'GET', function (res) {
          console.log("get_list.res",res);
          console.log('adList', res)
          that.setData({
            adList: res
          })
        });
        // 大师入驻
        app.func.req('get_list', { query: 1, openid: that.data.openid }, 'GET', function (res) {
          console.log("master.res", res);
          var masterList = [];
          var index = [];
          for (var i = 0; i < res.length; i++) {
            var num = Math.ceil((i + 1) / 3);
            if (index.indexOf(num) < 0) {
              index.push(num);
              masterList.push({ index: num, list: [res[i]] });
            } else {
              for (var j = 0; j < masterList.length; j++) {
                if (num == masterList[j].index) {
                  masterList[j].list.push(res[i])
                }
              }
            }
          }
          // console.log(masterList);
          // console.log(index);
          that.setData({
            masterList: masterList
          })
        });
        // 鼓校专区
        app.func.req('get_list', { query: 2, pageSize: 4, page: 1, openid: that.data.openid }, 'GET', function (res) {
          // console.log(res);
          that.setData({
            schoolList: res
          })
        });
        that.getProduct();
      },
      fail:function(){
        wx.redirectTo({
          url: '../start/start',
        })
      }
    })
    // 轮播图
    app.func.req('banner', {}, 'GET', function (res) {
      // console.log(res);
      var imgUrls = res;
      // 20200213 start
       console.log(imgUrls);
      // 20200213 end
      that.setData({
        imgUrls: imgUrls
      })
    });
  },
  // 轮播
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  // 搜索
  searchPage: function () {
    wx.navigateTo({
      url: 'search/search',
    })
  },
// 内容精选
  getIn:function(){
    var that = this;
    // app.func.req('handpick_contnet', { openid: that.data.openid}, 'GET', function (res) {
    //   // console.log(res);
    //   for (var i = 0; i < res.length; i++) {
    //     if (res[i].in_append.length != 0) {
    //       var index1 = res[i].in_append[0].lastIndexOf(".");
    //       var index2 = res[i].in_append[0].length;
    //       var postf = res[i].in_append[0].substring(index1 + 1, index2).toLowerCase();
    //       var result = imgPostf.indexOf(postf);
    //       if (result != -1) {
    //         res[i].in_append_type = 1;
    //       } else {
    //         res[i].in_append_type = 2;
    //       }
    //     }
    //   }
    //   that.setData({
    //     handpick_contnet: res
    //   })
      // console.log(that.data.handpick_contnet);
    // });
  },
  // 点赞
  like:function(e){
    var that = this;
    app.func.req('thumbs_upGood', { openid: that.data.openid, th_good_id: e.currentTarget.dataset.inid, th_type: 2 }, 'POST', function (res) {
      // console.log(res);
      if(res.code == 200){
        that.getIn();
      }      
    });
  },
  // 帖子详情
  topicShow: function (e) {
    wx.navigateTo({
      url: '../community/hot-topic/topic-show/topic-show?in_id=' + e.currentTarget.dataset.inid,
    })
    // var that = this;
    // var arr = that.data.handpick_contnet;
    // for (var i = 0; i < arr.length; i++) {
    //   if (arr[i].in_id == e.currentTarget.dataset.inid) {
    //     if (arr[i].is_money == 2) {
    //       wx.showModal({
    //         title: '想看全部内容吗?',
    //         content: '兑换鼓币才能查看哦~',
    //         confirmText: '消耗鼓币',
    //         confirmColor: '#19c810',
    //         success(res) {
    //           if (res.confirm) {
    //             wx.navigateTo({
    //               url: '../community/hot-topic/topic-show/topic-show?in_id=' + e.currentTarget.dataset.inid,
    //             })
    //           }
    //         }
    //       })
    //     }
    //   }
    // }
  },
  // 内容精选操作
  listenerButton:function(e){
    var that = this;
    var arr = that.data.handpick_contnet;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].in_id == e.currentTarget.dataset.inid){
        if (arr[i].collect == 0) {
          that.inCollect(["收藏"], e.currentTarget.dataset.inid);       
        } else if (arr[i].collect == 1) {
          that.inCollect(["取消收藏"], e.currentTarget.dataset.inid);
        }
      } 
    }    
  },
  // 内容精选收藏
  inCollect: function (item,coll_good_id){
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
  // 二手交易
  getProduct: function () {
    var that = this;
    app.func.req('get_list', { query: 3, pageSize: 4, page: 1, openid: that.data.openid }, 'GET', function (res) {
      // console.log(res);
      that.setData({
        proList: res
      })
    });
  },
  // 收藏
  collect:function(e){
    var that = this;
    app.func.req('collect', { coll_type: 2, coll_user_id: that.data.openid, coll_good_id: e.currentTarget.dataset.collid }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
        that.getProduct();
      }
    });
  },
  // 精彩活动
  activity:function(){
    wx.showToast({
      title: '暂未开通此功能！',
      icon: 'none'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target);
    }
  }
})
