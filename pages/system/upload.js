// pages/system/upload.js
var gshare = require('../data/gshare');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personlist: [],
    triplist: [],
    formlist: [],
    chooselist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var personlist = wx.getStorageSync("portcontact")

    var triplist = wx.getStorageSync("tripinfo")

    var formlist = wx.getStorageSync("formlist")
    console.log(personlist)
    console.log(triplist)
    console.log(formlist)
    that.setData({
      personlist: personlist,
      triplist: triplist,
      formlist: formlist
    })
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

  checkboxChange: function (e) {
    var that = this
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    that.setData({
      chooselist: e.detail.value
    })
  },

  upload: function () {
    var that = this
    wx.showToast({
      title: '开始上传.',
      icon: 'loading',
      duration: 2000
    });
    wx.showLoading({ title: '上传中...', });
    for (var i = 0; i < that.data.chooselist.length; i++) {
      if (that.data.chooselist[i] == 0) {
        if (that.data.personlist == null || that.data.personlist == undefined || that.data.personlist.length == 0)
        { } else { gshare.uploadperson(that.data.personlist) }

      }
      if (that.data.chooselist[i] == 1) {
        if (that.data.triplist == null || that.data.triplist == undefined || that.data.triplist.length == 0)
        { } else { gshare.uploadtrip(that.data.triplist) }

      }
      if (that.data.chooselist[i] == 2) {
        if (that.data.formlist == null || that.data.formlist == undefined || that.data.formlist.length == 0)
        { } else { gshare.uploadform(that.data.formlist) }

      }
    }
    wx.hideLoading();
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
    var that = this
    var personlist = wx.getStorageSync("portcontact")

    var triplist = wx.getStorageSync("tripinfo")

    var formlist = wx.getStorageSync("formlist")
    console.log(personlist)
    console.log(triplist)
    console.log(formlist)
    that.setData({
      personlist: personlist,
      triplist: triplist,
      formlist: formlist
    })
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