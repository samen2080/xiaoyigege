const app = getApp()
// pages/message/message-show/message-show.js
Page({

  /**
  * Page initial data
  */
  data: {
    om_id: 0,
    om_user_id: 0,
    om_content: '',
    om_add_time: 0,
    om_read_status: 0
  },

  /**
  * Lifecycle function--Called when page load
  */
  onLoad: function (options) {
    var that = this;
    that.setData({
      om_id: options.om_id,
      om_user_id: options.om_user_id,
      om_content: options.om_content,
      om_add_time: options.om_add_time,
      om_read_status: options.om_read_status
    })
    console.log("20200117 om_id:", that.data.om_id)
    console.log("20200117 om_id:", that.data.om_read_status)

    if (that.data.om_read_status == 0) {
      app.func.req('update_message', { om_id: that.data.om_id }, 'POST', function (res) {
        // console.log(res);
        if (res.code == 200) {
          console.log("update successfully")
        }
      })
    }

  },

  /**
  * Lifecycle function--Called when page is initially rendered
  */
  onReady: function () {

  },

  /**
  * Lifecycle function--Called when page show
  */
  onShow: function () {

  },

  /**
  * Lifecycle function--Called when page hide
  */
  onHide: function () {

  },

  /**
  * Lifecycle function--Called when page unload
  */
  onUnload: function () {

  },

  /**
  * Page event handler function--Called when user drop down
  */
  onPullDownRefresh: function () {

  },

  /**
  * Called when page reach bottom
  */
  onReachBottom: function () {

  },

  /**
  * Called when user click on the top right corner to share
  */
  onShareAppMessage: function () {

  }
})