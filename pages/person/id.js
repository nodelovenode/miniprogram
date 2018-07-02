var gshare = require('../data/gshare.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: null,
    mode: 1,
    list: [],  //用来控制当前画面的已有数据
    cardlist: [],//用来保存从缓存中获取到的cardlist
    caenable: true, //认证按钮是否可用
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var mode = null
    if (options.mode != undefined) { mode = options.mode }
    wx.setNavigationBarTitle({
      title: "实名认证"
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

    that.setData({
      datalist: wx.getStorageSync("cardlist"),
      mode: mode
    })


    console.log("获取本地认证信息----")
    console.log(that.data.datalist);
    if (that.data.datalist == '' || that.data.datalist == null) {
      that.setData({
        datalist: [],
        caenable: true
      })
    } else {
      that.setData({
        caenable: false,
        name: that.data.datalist[0].name,
        caid: that.data.datalist[0].caid,
      })

      wx.showToast({
        title: '无需实名认证',
        icon: 'success',
        duration: 2000
      })
      console.log('已经进行过实名认证，无需重复认证')
      console.log(that.data.datalist)
    }


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
  test : function(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  returnpage: function () {
    var that = this;
    console.log("that.data.mode")
    console.log(that.data.mode)
    if (that.data.mode == 1) {
      // wx.redirectTo({
      //   url: './person',
      // })
      console.log("取消")
      wx.navigateTo({
        url: '../index/index',
      })
    }
    if (that.data.mode == 2) {
      wx.navigateBack();
    }
  },

  formSubmit: function (e) {
    try {
      var that = this
      var phonenumber = null;
      var userinfo = null;
      var listdata = null;
      var list = [];
      if (e.detail.value.caid.length!=18) {
        wx.showModal({
          title: '身份证号码长度不正确',
          showCancel: false
        })
        return
      }
      if (e.detail.value.caid == '' || e.detail.value.name=='') {
        wx.showModal({
          title: '姓名、身份证号码都不可为空',
          showCancel: false
        })
        return
      }

      gshare.getbuffer("info", function (userinfo) {
        phonenumber = userinfo.phonenumber;
        listdata = {

          phonenumber: phonenumber,
          name: e.detail.value.name,
          caid: e.detail.value.caid
        }

        console.log(listdata)
        list = that.data.datalist.push(listdata);
        console.log("that.data.datalist")
        console.log(that.data.datalist)

        gshare.setbuffer("cardlist", that.data.datalist);


        wx.showToast({
          title: "信息保存成功",
          icon: 'success',
          duration: 2000
        })
        that.setData({
          caenable: false,
          name: that.data.datalist[0].name,
          caid: that.data.datalist[0].caid
        })

        that.returnpage();
      });
    } catch (e) {
      wx.showToast({
        title: '系统异常',
        icon: 'success',
        duration: 2000
      })
      console.log(e);
    }
  }
})