Page({
  data: {
    formlist: [{ country: "日本" }],
    formc: [
      { lable: "姓氏" }, { lable: "名字" }, { lable: "出生日期" }, { lable: "航班" }
    ],
    winHeight: 0
  },
  onLoad: function () {
    var that = this

    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

  }

})
