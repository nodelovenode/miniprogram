// pages/formshow/formshow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    triplist: [],
    personcount: [],
    formcount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var x = 0;
    var y = 0;
    var i = 0;
    var j = 0;
    var triplist = wx.getStorageSync("tripinfo")
    var formlist = wx.getStorageSync("formlist")
    var templist = []
    that.setData({
      triplist: triplist,
      formlist: formlist
    })

    console.log(" that.data.formlist.length")
    console.log(that.data.formlist)
    for (i = 0; i < that.data.triplist.length; i++) {

      for (j = 0; j < that.data.formlist.length; j++) {
        if (triplist[i].uuid == formlist[j].uuid) {
          x++;
        y++;
        }

      }
         templist.push({ uuid: triplist[i].uuid, count: x })
         x=0;

    }
    that.setData({
      personcount: templist
    })

    if (y!=0){
      that.setData({
        formcount: 1
      })
    }
    console.log(that.data.personcount)
    /** 
* 获取系统信息 
*/
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  godetail: function (e) {
    var that = this
    var uuid = e.currentTarget.dataset.select
    console.log("uuid-----------------" + uuid)
    console.log(that.data.formlist)
    wx.navigateTo({
      url: '../formlist/detail?uuid=' + uuid
    })

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