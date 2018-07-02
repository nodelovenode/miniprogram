// pages/illustration/notice/notice.js
var notice = require("../../data/notice.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countrylist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.transid
    var countryname = options.transcountryname
    console.log("传过来的ID" + id + "传过来的countryname" + countryname)
    var that = this
    var newdatalist = []
    console.log("获取各国说明")
    wx.request({
      method: "GET",
      url: 'https://mp.itownet.cn/linshi/notice.json',
      success: function (res) {
        console.log("获取成功")
        that.setData({
          datalist: res.data
        })
        console.log(that.data.datalist)
        for (var i = 0; i < that.data.datalist.length; i++) {
          if (that.data.datalist[i].id == id) {
            // newdatalist = that.data.datalist[i]
            // console.log(that.data.datalist[i])
            that.setData({
              newdatalist: that.data.datalist[i]
            })
            console.log(that.data.newdatalist)
          }
        }
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

    wx.setNavigationBarTitle({
      title: countryname + "出入境说明"//页面标题为路由参数
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