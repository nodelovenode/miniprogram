// pages/formlist/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detaillist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var uuid = options.uuid
    var templist = [];//用来存放匹配的临时表单
    var formlist = wx.getStorageSync("formlist")

    console.log("detail 的uuid")
    console.log(options)
    console.log(formlist)
    for (var i = 0; i < formlist.length; i++) {
      if (formlist[i].uuid == uuid) {
        templist.push(formlist[i])
      }
    }

    that.setData({
      detaillist: templist
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

  },
  exitpage: function () {
    wx.navigateBack();
  },
})