// pages/index/competition/competition-fill/competition-fill.js
var app = getApp();

Page({
    data: {
        hot_city: [ "北京市", "上海市", "深圳市", "广州市", "重庆市", "天津市", "长沙市", "成都市", "杭州市", "昆明市", "南京市", "武汉市", "厦门市", "西安市", "郑州市" ],
        picker_city: !1,
        city_search: !1
    },
    onLoad: function(t) {
        // app.setNavigationBarColor(this), 
        console.log(wx.getStorageSync("location_city")), 
        this.setData({
            location_city: wx.getStorageSync("location_city")[1],
            region: wx.getStorageSync("location_city")
        });
    },
    refresh: function(t) {
        var c = this;
        if ("" == wx.getStorageSync("citys")) {
            console.log("没有城市的缓存"), new QQMapWX({
                key: "FQIBZ-FOE3Q-CY354-GLNJF-3NUHZ-SBBO6"
            }).getCityList({
                success: function(t) {
                    wx.setStorageSync("citys", t), console.log(t);
                    var e = t.result[0], i = e[0];
                    if ("市" == i.fullname.charAt(i.fullname.length - 1, 1)) (a = [])[0] = i; else var a = t.result[1].slice(i.cidx[0], i.cidx[1]);
                    c.setData({
                        citys: e.slice(),
                        more_city: t.result[0],
                        province: a,
                        all_city: t.result
                    });
                },
                fail: function(t) {
                    console.log(t);
                },
                complete: function(t) {
                    console.log(t);
                }
            });
        } else {
            console.log("有城市的缓存");
            var e = wx.getStorageSync("citys");
            console.log(e);
            var i = e.result[0], a = i[0];
            if ("市" == a.fullname.charAt(a.fullname.length - 1, 1)) (n = [])[0] = a; else var n = e[1].slice(a.cidx[0], a.cidx[1]);
            c.setData({
                citys: i.slice,
                more_city: e.result[0],
                province: n,
                all_city: e.result
            });
        }
    },
    more_city: function(t) {
        var e = this;
        0 == e.data.picker_city ? e.setData({
            picker_city: !0
        }) : e.setData({
            picker_city: !1
        });
    },
    bindChange: function(t) {
        var e = t.detail.value;
        console.log(t);
        var i = this.data.all_city, a = e[0], c = i[0][a];
        if ("市" == c.fullname.charAt(c.fullname.length - 1, 1)) {
            (n = [])[0] = c;
        } else {
            var n = [];
            console.log(i[1]), n = i[1].slice(c.cidx[0], c.cidx[1]);
        }
        this.setData({
            province: n,
            citys: i[0]
        });
    },
    search: function(t) {
        var e = this;
        var i = e.data.all_city, a = t.detail.value;
        if ("" != a) {
            var c = [];
            for (var n in i[1]) -1 == i[1][n].pinyin[0].indexOf(a) && -1 == i[1][n].pinyin[1].indexOf(a) && -1 == i[1][n].fullname.indexOf(a) || "区" != i[1][n].fullname.charAt(i[1][n].fullname.length - 1, 1) && "县" != i[1][n].fullname.charAt(i[1][n].fullname.length - 1, 1) && c.push(i[1][n]);
            e.setData({
                city_result: c,
                city_search: !0
            });
        } else e.setData({
            city_search: !1,
            city_result: []
        });
    },
    select: function(t) {
        var e = t.currentTarget.dataset.city;
        wx.setStorageSync("city", e), app.globalData.sele_city = 0, wx.redirectTo({
            url: "../index/index"
        }), app.util.request({
            url: "entry/wxapp/SaveCity",
            cachetime: "0",
            data: {
                cityname: e
            },
            success: function(t) {
                console.log("这是保存城市");
            }
        });
    },
    bindRegionChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value);
        var e = t.detail.value[1];
        -1 != e.indexOf("市") ? (console.log("有市"), this.setData({
            select_city: e
        })) : wx.showModal({
            title: "温馨提示",
            content: "当前城市选择仅支持市"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});