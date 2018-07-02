// pages/flightsel/flightdyn/flightdyn.js
var sub = require("../../data/gshare.js")
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempdatalist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.data.tempdatalist = JSON.parse(options.trandatalist)
    var datalist = []
    that.setData({
      datalist: this.data.tempdatalist
    })
    console.log(that.data.datalist)

    //获取屏幕高度
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight,
          clientWidth: res.windowWidth
        });
      }
    })
  },
  //将datalist传送到行程列表


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //将datalist传送到行程列表
  bindaddtrip: function (e) {

    var uuid = util.formatTime(new Date());

    console.log("航班动态--------uuid---------------")
    console.log(uuid)



    var that = this
    var obj = {
      leavecity: that.data.datalist.leavecity,

      arrivecity: that.data.datalist.arrivecity,

      name: that.data.datalist.name,
      date: that.data.datalist.dep_time.substr(0, 10),
    }
    console.log(obj)

    wx.showModal({
      title: '提示',
      content: '已经将航程信息添加到行程中，是否需要立刻填写入境申请单？',
      showCancel: true,
      cancelText: "否",
      confirmText: "是",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          // wx.redirectTo({
          //   url: '../../trip/newtrip?mode=1&&tripno=' + uuid +'&&datalist=' + JSON.stringify(obj)
          // })
          //插入tripinfo
          var temptriplist = wx.getStorageSync("tripinfo")
          var phonenumber = wx.getStorageSync("info")
        if (temptriplist==undefined || temptriplist==null || temptriplist.length==0){
          temptriplist = [{
            arriveplace: obj.arrivecity,
            flightno: obj.name,
            gdate: obj.date,
            leaveplace: obj.leavecity,
            phonenumber: phonenumber.phonenumber,
            uuid: util.formatTime(new Date()),
            status : 0
          }]
        } else {

          temptriplist.push({
            arriveplace: obj.arrivecity,
            flightno: obj.name,
            gdate: obj.date,
            leaveplace: obj.leavecity,
            phonenumber: phonenumber.phonenumber,
            uuid: util.formatTime(new Date()),
            status:0
          })
        }
          wx.setStorageSync("tripinfo", temptriplist)
          console.log("temptriplist")
          console.log(temptriplist)
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: '../../trip/trip'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          // wx.setStorage({
          //   key: 'tripkey',
          //   data: 'tripdata',
          //   success: function (res) {
          //     wx.showToast({
          //       title: '添加成功',
          //       icon: 'success',
          //       duration: 2000
          //     })
          //   }
          // })
          return
        }
      }
    })
  }

})