var citylist = require("../../data/city.js")
var gshare = require("../../data/gshare.js")
// pages/flightsel/citysel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    datalist: [],
    // cnhotcitylist: [],
    // cnhotindex: '',
    mode: null,

  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      datalist: citylist.city,
      olddatalist: citylist.city,
      // cnhotcitylist: citylist.cnhotcity,
      mode: options.mode,
    })
    console.log(options.mode)
    console.log("城市列表")
    console.log(that.data.datalist)
    /** 
     * 获取系统信息 
     */
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
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab == e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  cityinput: function (e) {
    var that = this
    var tempdatalist = []
    var obj = null
    console.log(e.detail.value.toUpperCase())
    console.log(that.data.datalist)
    for (var i = 0; i < that.data.olddatalist.length; i++) {
      if (that.data.olddatalist[i].citycode.toUpperCase().indexOf(e.detail.value.toUpperCase()) > -1 ||
        that.data.olddatalist[i].city.toUpperCase().indexOf(e.detail.value.toUpperCase()) > -1) {
        console.log("找到了")
        obj = { city: that.data.olddatalist[i].city, citycode: that.data.olddatalist[i].citycode, flightport: that.data.olddatalist[i].flightport, countrycode: that.data.olddatalist[i].countrycode, iata: that.data.olddatalist[i].iata }
        tempdatalist.push(obj)
        console.log(tempdatalist)
      } else {
      }
    }
    if (tempdatalist.length == 0) {
      tempdatalist = that.data.olddatalist;
      // console.log("没找到")
      // console.log(that.data.olddatalist;)
    }
    that.setData({
      datalist: tempdatalist
    })
  },
  //点击获取内容并将变量传给上一层页面赋值
  //热门城市获取
  // bindgetcnhotcity: function (e) {
  //   var that = this
  //   that.setData({
  //     cnhotindex: that.data.index
  //   })
  //   var cnhotindex = parseInt(e.currentTarget.dataset.index);
  //   console.log("cnhotindex" + cnhotindex);
  //   console.log(that.data.cnhotcitylist[cnhotindex].city);
  //   let pages = getCurrentPages();//当前页面
  //   let prevPage = pages[pages.length - 2];//上一页面
  //   if (that.data.mode == 2) {
  //     prevPage.setData({//直接给上移页面赋值
  //       arrivecity: that.data.cnhotcitylist[cnhotindex].city,
  //       arrivecitycode: that.data.cnhotcitylist[cnhotindex].citycode
  //     });
  //   } else if (that.data.mode == 1) {
  //     prevPage.setData({//直接给上移页面赋值
  //       leavecity: that.data.cnhotcitylist[cnhotindex].city,
  //       leavecitycode: that.data.cnhotcitylist[cnhotindex].citycode
  //     });
  //   }
  //   wx.navigateBack({//返回
  //     delta: 1
  //   })
  // },
  //一般城市获取
  bindgetcity: function (e) {
    var that = this
    var index = parseInt(e.currentTarget.dataset.index);
    console.log("index" + index);
    that.data.datalist[index]
    console.log(that.data.datalist[index].city);
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    if (that.data.mode == 2) {
      prevPage.setData({//直接给上移页面赋值
        arrivecity: that.data.datalist[index].city,
        arrivecitycode: that.data.datalist[index].citycode
      });
    } else if (that.data.mode == 1) {
      prevPage.setData({//直接给上移页面赋值
        leavecity: that.data.datalist[index].city,
        leavecitycode: that.data.datalist[index].citycode
      });
    }
    wx.navigateBack({//返回
      delta: 1
    })
    console.log(that.data.mode)
  }

})