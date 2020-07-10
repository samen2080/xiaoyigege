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
   
    {
      "current": 0,
      "pagePath": "broadcast-cate/broadcast-cate",
      "iconPath": "/images/community-icon.png",
      "selectedIconPath": "/images/community-icon-n-.png",
      "text": "课程"

    },

    {
      "current": 0,
      "pagePath": "/pages/livebroadcast/livebroadcast",
      "iconPath": "/images/broadcast-icon.png",
      "selectedIconPath": "/images/broadcast-icon.png",
      "text": "直播"

    },
    
     {
       "current": 0,
       "pagePath": "/pages/message/message",
       "iconPath": "/images/message-icon.png",
       "selectedIconPath": "/images/message-icon-.png",
       "text": "消息"
     },
    {
      "current": 0,
      "pagePath": "/pages/mine/mine",
      "iconPath": "/images/mine-icon.png",
      "selectedIconPath": "/images/mine-icon-.png",
      "text": "我的"
    }
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  console.log("20200411templ");
  console.log("20200411templ bindName",bindName);
  console.log("20200411templ id", id);
  console.log("20200411templ target", target);

  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  console.log("20200411templ bindData", bindData[bindName]);

  that.setData({ bindData });

}

module.exports = {
  tabbar: tabbarmain
}