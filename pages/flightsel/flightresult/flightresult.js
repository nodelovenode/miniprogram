// pages/flightsel/flightresult/flightresult.js
var result = require("../../../utils/result.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempdatalist: [],
    obj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.tempdatalist = JSON.parse(options.datalist)
    this.data.obj = JSON.parse(options.obj)
    console.log("我是传过来的datalist和obj")
    console.log(this.data.tempdatalist)
    console.log(this.data.obj)


    var that = this
    var datalist = []
    var leavecity = null

    // console.log(result.result)
    // this.data.tempdatalist = result.result
    // that.setData({
    //   datalist: this.data.tempdatalist,
    //   leavecity: "",
    //   leavecitycode:"",
    //   arrivecity: "",
    //   arrivecitycode: "",
    // })



    that.setData({
      datalist: this.data.tempdatalist,
      leavecity: this.data.obj.leavecity,
      leavecitycode: this.data.obj.leavecitycode,
      arrivecity: this.data.obj.arrivecity,
      arrivecitycode: this.data.obj.arrivecitycode,
    })

  //获取屏幕高度
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    })
    
  },

  bindflightinfo: function (e) {
    var that = this
    var obj = null
    var index = parseInt(e.currentTarget.dataset.index)
    var trandatalist = {
      airmode: that.data.datalist[index].airmode,
      arr: that.data.datalist[index].arr,
      arr_temperature: that.data.datalist[index].arr_temperature,
      arr_time: that.data.datalist[index].arr_time,
      company: that.data.datalist[index].company,
      date: that.data.datalist[index].date,
      dep: that.data.datalist[index].dep,
      dep_temperature: that.data.datalist[index].dep_temperature,
      dep_time: that.data.datalist[index].dep_time,
      distance: that.data.datalist[index].distance,
      eta: that.data.datalist[index].eta,
      etd: that.data.datalist[index].etd,
      fly_time: that.data.datalist[index].fly_time,
      name: that.data.datalist[index].name,
      punctuality: that.data.datalist[index].punctuality,
      status: that.data.datalist[index].status,
      leavecity: that.data.leavecity,
      arrivecity: that.data.arrivecity,
      leavecitycode: that.data.leavecitycode,
      arrivecitycode: that.data.arrivecitycode,
    }
    wx.navigateTo({
      url: '../flightdyn/flightdyn?trandatalist=' + JSON.stringify(trandatalist),
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