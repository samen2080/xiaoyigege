// component/component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propArray: {
      type: Array,
    },
    deaultValue: {
      type: String,
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    selectShow: false,//初始option不显示
    nowText: " ",//初始内容
    animationData: {}//右边箭头的动画
  },
  /**
   * 组件的方法列表
   */

  methods: {
    //option的显示与否
    selectToggle: function () {
      console.log('20200131=== select.js metholds is called');
      var nowShow = this.data.selectShow;//获取当前option显示的状态
      //创建动画
      var animation = wx.createAnimation({
        timingFunction: "ease"
      })
      this.animation = animation;
      if (nowShow) {
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        })
      } else {
        animation.rotate(180).step();
        this.setData({
          animationData: animation.export()
        })
      }
      this.setData({
        selectShow: !nowShow
      })
    },
    //设置内容
    setText: function (e) {
      console.log('20200131=== select.js setText is called');
      var nowData = this.properties.propArray;//当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
      var nowIndx = e.target.dataset.index;//当前点击的索引
      var nowId = nowData[nowIndx].id;//当前点击的索引
      var nowText = nowData[nowIndx].text;//当前点击的内容
      console.log('20200131=== select.js nowId:', nowId);
      // 20200131 new start
      var nowSelectedData = {
        id: nowId,
        text: nowText
      }
      this.triggerEvent('myget', nowSelectedData)
      // 20200131 new end
      //再次执行动画，注意这里一定，一定，一定是this.animation来使用动画
      this.animation.rotate(0).step();
      this.setData({
        selectShow: false,
        nowText: nowText,
        animationData: this.animation.export()
      })
    }
  }
})