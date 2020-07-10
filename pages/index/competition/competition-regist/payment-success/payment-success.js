// pages/index/competition/competition-regist/payment/payment-success/payment-success.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
      value : Math.floor(Math.random()*20000 + 20000)
  },

  back: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../../../../index/index'
    })
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  pay: function (e) {
  var arr = [];
  for(var i = 0;i<10;i++){
    var isRepeat = false;
    var num = parseInt(Math.random()*(100-20)+20);
    for(var j = 0;j<arr.length;j++){
        if(arr[j] == num){
            isRepeat = true;
        }
    }
    if(isRepeat == false){
        arr.push(num);
    }
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