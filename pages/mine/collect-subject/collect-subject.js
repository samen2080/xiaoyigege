// pages/mine/collect-subject/collect-subject.js
const app = getApp()
var imgPostf = ["jpg", "png", "bmp", 'jpeg'];
var videoPostf = ['avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'dat', 'mov', 'qt', 'asf', 'wmv', 'mp4'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    management_good:false,
    // items: [
    //   { intro: '麦尔航空节8小接简介，麦尔航空节8小接简介麦尔航空.', name: '#资源共享#', checked: false, imgSrc: '/images/banner.png' },
    //   { intro: '麦尔航空节8小接简介，麦尔航空节8小接简介麦尔航空.', name: '#资源共享#', checked: false, imgSrc: '/images/banner.png' },
    //   { intro: '麦尔航空节8小接简介，麦尔航空节8小接简介麦尔航空.', name: '#资源共享#', checked: false, imgSrc: '/images/banner.png' },
    //   { intro: '麦尔航空节8小接简介，麦尔航空节8小接简介麦尔航空.', name: '#资源共享#', checked: false, imgSrc: '/images/banner.png' },
    // ],
    middlearr: []
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

  // 单个删除
  listenerButton: function (e) {
    var that = this;
    var arr = that.data.items;
    var index = e.currentTarget.dataset.id;
    wx.showActionSheet({
      itemList: ['取消收藏'],//显示的列表项
      itemColor:'#000000',
      success: function (res) {
        if (res.tapIndex === 0) {
          arr.splice(index, 1);
          that.setData({
            items: arr,
            middlearr: []
          })
          app.func.req('collect', { coll_type: 1, coll_user_id: that.data.openid, coll_good_id: e.currentTarget.dataset.inid }, 'POST', function (res) {
            // console.log(res);
            if (res.code == 200) {
              that.getList();
            }
          });
        }
      },
      fail: function (res) {},
      complete: function (res) {}
    })
  },

  // 批量操作
  management: function () {
    let that = this;
    that.setData({
      management_good: true,
    })
  },
  finish_management: function () {
    let that = this;
    that.setData({
      management_good: false,
    })
  },
  // 选择
  select: function (e) {
    var that = this;
    let arr2 = [];
    if (that.data.management_good == false) {
      return;
    } else {
      var arr = that.data.items;
      var index = e.currentTarget.dataset.id;
      arr[index].checked = !arr[index].checked;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
          arr2.push(arr[i])
        }
      };
      that.setData({
        items: arr,
        middlearr: arr2
      })
    }
  },

  // 删除
  deleteitem: function () {
    var that = this;
    let arr = that.data.items;
    let arr2 = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].checked == false) {
        arr2.push(arr[i]);
      }
    }
    that.setData({
      items: arr2,
      middlearr: []
    })
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
        that.getList();
      },
    })
  },
  getList: function () {
    var that = this;
    app.func.req('invitation_collect', { openid: that.data.openid, pageSize: 1000, page: 1 }, 'GET', function (res) {
      // console.log(res);
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
  // 点赞
  like: function (e) {
    var that = this;
    app.func.req('thumbs_upGood', { openid: that.data.openid, th_good_id: e.currentTarget.dataset.inid, th_type: 2 }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
        that.getList();
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