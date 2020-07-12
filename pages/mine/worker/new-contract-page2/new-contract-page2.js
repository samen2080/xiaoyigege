// pages/mine/worker/new-contract-page2/new-contract-page2.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_arr: [],
    address_img: '',
    upHidden: false,
    // 2020/1/21 start
    install_date: '请选择',
    install_date: 0,
    dateColor: '#999999',
    start_date: '请选择',
    start_date: 0,
    end_date: '请选择',
    end_date: 0,
    selectArray: [{
      "id": "1",
      "text": "月付"
    }, {
      "id": "2",
      "text": "季付"
      },{
        "id": "3",
        "text": "半年付"
      }, {
        "id": "4",
        "text": "年付"
      }]
    // 2020/1/21 end
  },
  // 2020/1/21 start
  bindDateChange1: function (e) {
    // console.log(e.detail.value)
    this.setData({
      install_date: e.detail.value,
      dateColor: '#000000'
    })
  },
  bindDateChange2: function (e) {
    // console.log(e.detail.value)
    this.setData({
      start_date: e.detail.value,
      dateColor: '#000000'
    })
  },
  bindDateChange3: function (e) {
    // console.log(e.detail.value)
    this.setData({
      end_date: e.detail.value,
      dateColor: '#000000'
    })
  },
  // 2020/1/21 end
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      },
    })
  },
  // 上传图片
  //=================================upload photo start 20191104
  uploadpic: function () {
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (ress) {
        wx.showToast({
          icon: "loading",
          title: "正在上传"
        }),
          wx.uploadFile({
            //url: app.siteurl + '/index.php?m=api&c=index&v=uploadpic', 
            url: that.data.host + '/upload_files/invitation',
            filePath: ress.tempFilePaths[0],
            name: 'invitation',
            header: {
              "Content-Type": "multipart/form-data"
            },
            formData: {
              'appkey': app.appkey
            },
            success: function (res) {
              if (res.statusCode == 200) {
                var img_arr = JSON.parse(res.data);
                that.setData({
                  address_img: that.data.img_arr.concat(img_arr[0]),
                  upHidden: true
                })
                console.log("==========img==================");
                console.log(that.data.address_img)
              }
              else {
                wx.showModal({
                  title: '提示',
                  content: '上传失败',
                  showCancel: false
                })
                return;
              }
            },
            fail: function (e) {
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
            },
            complete: function () {
              wx.hideToast();
            }
          })
      }
    })
  },
  //=================================upload photo end 20191104
  // 取消
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  getData: function (e) {
    console.log('20200131=== e.detail.id:',e.detail.id);
    console.log('20200131=== e.detail.text:', e.detail.text);
    this.setData({
      period: e.detail.id
    })
  },

  // 发布
  formSubmit: function (e) {
    var that = this;
    //20200131
    console.log('20200131=== this.data.period:', this.data.period);
    if (this.data.period == null) {
      wx.showToast({
        title: '合约周期不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.lift_module.length <= 0) {
      wx.showToast({
        title: '电梯型号不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.install_date.length <= 0) {
      wx.showToast({
        title: '安装日期不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.start_date.length <= 0) {
      wx.showToast({
        title: '合约开始日期不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.end_date.length <= 0) {
      wx.showToast({
        title: '合约结束日期不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.total_amt.length <= 0) {
      wx.showToast({
        title: '合约金额不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.sign_id.length <= 0) {
      wx.showToast({
        title: '签约人不id能为空!',
        icon: 'none'
      })
    } 
    else if (e.detail.value.con_sign_name.length <= 0) {
      wx.showToast({
        title: '签约人姓名不能为空!',
        icon: 'none'
      })
    } 
    // else if (e.detail.value.maint_com.length <= 0) {
    //   wx.showToast({
    //     title: '签约公司不能为空!',
    //     icon: 'none'
    //   })
    // }
     else {
      wx.setStorage({
        key: 'contract_page2_data',
        data: {
          period: this.data.period,
          lift_module: e.detail.value.lift_module,
          install_date: e.detail.value.install_date,
          start_date: e.detail.value.start_date,
          end_date: e.detail.value.end_date,
          total_amt: e.detail.value.total_amt,
          sign_id: e.detail.value.sign_id,
          con_sign_name: e.detail.value.con_sign_name,
          maint_id: e.detail.value.maint_id,
          con_maint_name: e.detail.value.con_maint_name,
          // maint_com: e.detail.value.maint_com
        },
        success: function (res) {
          wx.navigateTo({
            url: '../../worker/new-contract-page3/new-contract-page3',
          })
        },
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
  onShareAppMessage: function () {

  }
})