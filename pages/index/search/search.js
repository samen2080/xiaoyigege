// pages/index/search/search.js
const app = getApp();
var imgPostf = ["jpg", "png", "bmp", 'jpeg'];
var videoPostf = ['avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'dat', 'mov', 'qt', 'asf', 'wmv', 'mp4'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,  
    searchVal:'',
    record:false,
    items: [],
    sheight: 1034,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    that.setData({
      host: host
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        that.getData();
      },
    })
  },
  cancelSearch:function(e){
    wx.navigateBack({
      delta: 1
    })
  },
  bindinput:function(e){
    this.setData({
      searchVal: e.detail.value
    })
    if (e.detail.value.length <= 0){
      this.setData({
        record: false
      })
    }
  },
  getData:function(){
    var that = this;
    if (that.data.searchVal.length <= 0){
      that.setData({
        record: false,
        bgcolor: '#fff'
      })
    } else {
      app.func.req('search', { search_type: that.data.currentTab, search_name: that.data.searchVal, openid: that.data.openid }, 'GET', function (res) {
        // console.log(res);
        var sheight;
        if (res.length <= 0) {
          that.setData({
            record: false,
            sheight: 1034,
            bgcolor: '#fff'
          })
        } else {
          if (that.data.currentTab == 1) {
            sheight = 200 * res.length;
          } else if (that.data.currentTab == 2) {
            sheight = 668 * res.length;
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
          } else if (that.data.currentTab == 0) {
            sheight = 160 * res.length;
          }
          
          that.setData({
            record: true,
            items: res,
            sheight: sheight,
            bgcolor: '#f5f5f5'
          })
        }
      });
    }
    
  },

  bindconfirm:function(e){
    var that = this;
    that.getData();
  },

  search: function (e) {
    var that = this;
    that.getData();
  },

  //滑动切换
  swiperTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.detail.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.detail.current
      })
      that.getData();
    }
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
    }
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
              that.getData();
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
        that.getData();
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