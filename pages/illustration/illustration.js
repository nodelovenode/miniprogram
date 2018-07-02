// pages/illustration/illustration.js
var countrylist = require("../data/countrylist.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      datalist: countrylist.countrylist,
    })
    console.log(that.data.datalist)
  },

  //获取点击当前国家的信息，并跳转到详细页面
  bindgetcountry: function (e) {
    var that = this
    var countryname = null
    var id = e.currentTarget.dataset.id
    for (var i = 0; i < that.data.datalist.length; i++) {
      for (var j = 0; j < that.data.datalist[i].data.length; j++) {
        if (that.data.datalist[i].data[j].id == id) {

          countryname = that.data.datalist[i].data[j].countryname
        }
      }
    }
    var countrylist = {
      id: id,
      countryname: countryname
    }
    wx.navigateTo({
      url: '../illustration/notice/notice?transid=' + countrylist.id +"&&transcountryname="+countrylist.countryname,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
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