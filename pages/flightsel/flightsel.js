// pages/flightsel/flightsel.js
var util = require('../../utils/util.js');
var resultlist = require('../../utils/result.js');
var resultflist = require('../../utils/resultflightno.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请输入出发日期',
    selectedCity: true,
    selectedFlight: false,
    city: null,
    citycode: null,
    datalist: [],
    leavecity: null, leavecitycode: null, arrivecity: null, arrivecitycode: null,

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    if (options.city == undefined || options.citycode == undefined) {

    } else {
      that.setData({
        city: options.city,
        citycode: options.citycode,
        mode: options.mode,
      })
    }
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          clientHeight: res.windowHeight
        });
      }

    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var that = this
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    that.setData({//将携带的参数赋值
      leavecity: that.data.leavecity,
      arrivecity: that.data.arrivecity,
      leavecitycode: that.data.leavecitycode,
      arrivecitycode: that.data.arrivecitycode,
    });
    console.log("出发" + that.data.leavecity)
    console.log("到达" + that.data.arrivecity)
  },
  //跳转无网络模式填写信息
  offlinedecl: function () {
    var uuid = util.formatTime(new Date());
    wx.showLoading({ title: '加载中', });
    console.log("trip-------------uuid---------------")
    console.log(uuid)

    wx.navigateTo({
      url: '../trip/newtrip?mode=1&&tripno=' + uuid,
    })
    //mode=1 表示新增，mode=2表示编辑
    wx.hideLoading();
  },
  //控制按起降城市和按航班号码
  selectedCity: function (e) {
    this.setData({
      selectedFlight: false,
      selectedCity: true
    })
  },
  selectedFlight: function (e) {
    this.setData({
      selectedCity: false,
      selectedFlight: true
    })
  },
  //picker控制器
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //获取城市选择页面传来的数据（到达城市）
  changearrivecity: function () {
    var that = this
    that.setData({
      mode: 2,
    })
    console.log("选择到达城市")
    wx.navigateTo({
      url: '../flightsel/citysel/citysel?mode=' + that.data.mode
    })
  },
  //获取城市选择页面传来的数据（出发城市）
  changeleavecity: function () {
    var that = this
    that.setData({
      mode: 1
    })
    console.log("选择出发城市")
    wx.navigateTo({
      url: '../flightsel/citysel/citysel?mode=' + that.data.mode
    })
  },
  //获取城市form表单内容调用接口
  citysubmit: function (e) {
    var that = this
    // var formData = e.detail.value;
    // wx.request({
    //   // method:'POST',
    //   // url: 'http://apis.haoservice.com/plan/InternationalFlightQueryByCity',
    //   // data: { dep: e.detail.value.depcityInput,
    //   //   arr: e.detail.value.arrcityInput,
    //   //   date: e.detail.value.citypicker,
    //   //   key: "3471f842e90c473cb540275a1db57b86"
    //   // },
    //   method: 'GET',
    //   url: 'http://apis.haoservice.com/plan/InternationalFlightQueryByCity?dep=' + e.detail.value.dep + '&arr=' + e.detail.value.arr + '&date=' + e.detail.value.citypicker + '&key=3471f842e90c473cb540275a1db57b86',
    //   // data: param,
    //   header: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log("接口调用成功")
    //     console.log(res.data)
    //   }
    // })
    that.setData({
      datalist: resultlist.result,
      date: e.detail.value.citypicker,
    })
    console.log(e.detail.value.citypicker)
    var obj = {
      leavecity: that.data.leavecity,
      arrivecity: that.data.arrivecity,
      leavecitycode: that.data.leavecitycode,
      arrivecitycode: that.data.arrivecitycode,
    }
    if (that.data.leavecity == null || that.data.arrivecity == null || e.detail.value.citypicker == null) {
      wx.showModal({
        title: '提示',
        content: '出发城市、到达城市和出发日期不能为空。',
        showCancel: false,
        success: function (res) {

        }
      })
    } else {
      wx.navigateTo({
        url: '../flightsel/flightresult/flightresult?datalist=' + JSON.stringify(that.data.datalist) + '&&obj=' + JSON.stringify(obj),
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
    }

  },
  //获取航班号码
  flightnoInput: function (e) {
    // let flightno
    // this.setData({
    //   flightno: e.detail.value
    // })
    var flightno = e.detail.value
  },

  //获取航班号码form内容调用接口
  flightnosubmit: function (e) {
    var that = this
    var transflightno
    that.setData({
      transflightno: e.detail.value.flightnoInput.toUpperCase()
    })
    console.log(that.data.date)
    console.log(that.data.transflightno)
  }

})


