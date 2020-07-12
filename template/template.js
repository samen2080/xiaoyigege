//初始化数据
function tabbarinit() {
  return [
    {
      "current": 0,
      "pagePath": "/pages/index/index",
      "iconPath": "/images/index-icon.png",
      "selectedIconPath": "/images/index-icon-n-.png",
      "text": "主页"
    },
   
    // {
    //   "current": 0,
    //   "pagePath": "/pages/community/community",
    //   "iconPath": "/images/community-icon.png",
    //   "selectedIconPath": "/images/community-icon-n-.png",
    //   "text": "社区"
    // },
    
    {
       "current": 0,
       "pagePath": "/pages/message/message",
       "iconPath": "/images/message-icon.png",
       "selectedIconPath": "/images/message-icon-n-.png",
       "text": "消息"
    },
    
    {
      "current": 0,
      "pagePath": "/pages/mine/mine",
      "iconPath": "/images/mine-2.png",
      "selectedIconPath": "/images/mine-1.png",
      "text": "我的"
    }
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  console.log("20200208===", otabbar)

  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar;
  that.setData({ bindData });
}

module.exports = {
  tabbar: tabbarmain
}