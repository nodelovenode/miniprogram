var gshare = require("../data/gshare.js")
var app = getApp()
Page({
  data: {
    array: [{
      mode: 'scaleToFill',
      text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
    }, {
      mode: 'aspectFit',
      text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来'
    }, {
      mode: 'aspectFill',
      text: 'aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来'
    }, {
      mode: 'top',
      text: 'top：不缩放图片，只显示图片的顶部区域'
    }, {
      mode: 'bottom',
      text: 'bottom：不缩放图片，只显示图片的底部区域'
    }, {
      mode: 'center',
      text: 'center：不缩放图片，只显示图片的中间区域'
    }, {
      mode: 'left',
      text: 'left：不缩放图片，只显示图片的左边区域'
    }, {
      mode: 'right',
      text: 'right：不缩放图片，只显示图片的右边边区域'
    }, {
      mode: 'top left',
      text: 'top left：不缩放图片，只显示图片的左上边区域'
    }, {
      mode: 'top right',
      text: 'top right：不缩放图片，只显示图片的右上边区域'
    }, {
      mode: 'bottom left',
      text: 'bottom left：不缩放图片，只显示图片的左下边区域'
    }, {
      mode: 'bottom right',
      text: 'bottom right：不缩放图片，只显示图片的右下边区域'
    }],
    src: './img/2.jpg'
  },
  onLoad: function () {
    // 查看是否授权
    // wx.getSetting({
    //   success: function (res) {

    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称

    //   }
    // })
    // console.log(wx.getStorageSync("info").phonenumber)
    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo)
        app.globalData.userInfo = res.userInfo.avatarUrl;
        app.globalData.username = res.userInfo.nickName;
      }
    })


  },
  imageError: function (e) {
    console.log('image3发生error事件，携带值为', e.detail.errMsg)
  },
  gettest: function (e) {
    wx.removeStorageSync("test")
  },
test : function(){
  var dd = wx.getStorageSync("test")
  console.log("dd-----------")
  console.log(dd)
  var dl = { firstname: "ddd", lastname: "9889", birthday: "", flightno: "", fradio1: "0", fradio2: "0" }
  var name = "test"
  console.log(gshare.deldata(dd,dl,name))
 // wx.setStorageSync("test", dd)

},
  getflight: function (e) {
    wx.navigateTo({
      url: '../flightsel/flightsel',
    })

  },
  onPullDownRefresh: function () {
    console.log("滑动事件");
    wx.stopPullDownRefresh()
  },
  trip: function (e) {

    wx.showLoading({ title: '加载中', });
    var info = wx.getStorageSync("info")

    if (info == undefined || info == null || info == "") {
      console.log("用户未登录，重定向到个人中心")
      wx.navigateTo({
        url: '../redirect/person',
      })

      wx.hideLoading();
    } else {
      wx.navigateTo({
        url: '../trip/trip',
      })
      wx.hideLoading();
    }
    wx.hideLoading();
  },
  getpassport : function(){
    wx.navigateTo({
      url: '../passport/passport',
    })
  },
  getform: function () {
    wx.navigateTo({
      url: '../formshow/formshow',
    })
  },
  getnotice:function(){
    console.log("获取各国说明")
    wx.request({
      method: "GET",
      url: 'https://mp.itownet.cn/linshi/notice.json',
      success: function (res) {
        console.log("orc成功")
        console.log(res.data)

      },
      fail: function (res) {
        // fail
        console.log("失败")
        console.log(res)
      },
      complete: function () {
        // complete

      }
    })
  }

})