var postData = require('../data/test.js');
var gshare = require('../data/gshare.js');
var util = require('../../utils/util.js');
var page = 0;
var page_size = 20;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;


var GetList = function (that) {
  that.setData({
    hidden: false
  });
  //从本地缓存中获取行程，如果本地缓存数据为空，那么从远程进行同步
  gshare.getbuffer("trip", function (tripinfo) {
    console.log("tripinfo");
    console.log(tripinfo);
    if (tripinfo != null && tripinfo == "[]") { //表示数据已经缓存，无需授权登录
      console.log("本地数据");
      that.setData({

        trip: tripinfo

      })
    } else {

      that.gettrip();
    }

  });
}

Page({
  data: {//data在onload执行之后执行  
    src: '../index/img/1.jpg',
    /** 
    * 页面配置 
    */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,

    navbar: ['全部', '已完成', '未完成'],
    currentTab: 0,
    tripinfo: null,
    showimg: true,
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    phonenumber: null
  }
  ,

  edittrip: function (e) {

    wx.showModal({
      title: '提示',
      content: '人为修改可能导致信息不准确，是否继续？',
      showCancel: true,
      cancelText:"否",
      confirmText:"是",
      success: function (res) {
        if (res.confirm) {
          var tripno = e.currentTarget.dataset.select
          wx.navigateTo({
            url: './newtrip?mode=2&&tripno=' + tripno,
          }) } else {
            return
          }
      }
    })





  },

  deltrip: function (e) {
    var that = this;
    var deltripno = e.currentTarget.dataset.select
    var listdata = { uuid: deltripno }



    wx.showModal({
      title: '提示',
      content: '是否删除当前行程记录？',
      showCancel: true,
      cancelText: "否",
      confirmText: "是",
      success: function (res) {
        if (res.confirm) {

          console.log(listdata)
          console.log("deltripno-----------" + deltripno)
          console.log(that.data.trip)
          gshare.deldata(that.data.trip, listdata, "tripinfo")
          that.setData({
            trip: wx.getStorageSync("tripinfo")
          })
          wx.showToast({
            title: "信息删除成功",
            icon: 'success',
            duration: 2000
          })
    


        } else if (res.cancel) {
          return
          }
        }
      
    })



  },
  bindDownLoad: function () {
    //  该方法绑定了页面滑动到底部的事件  
    var that = this;
    gettrip(that);
  },
  scroll: function (event) {
    //  该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。  
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    //  该方法绑定了页面滑动到顶部的事件，然后做上拉刷新  
    page = 0;
    this.setData({
      list: [],
      scrollTop: 0
    });
    gettrip(that);
  }
  ,



  gettrip: function () {
    var that = this;
    //获取行程
    wx.request({
      method: "POST",
      url: gshare.g_requesturl +'/trip',
      data: JSON.stringify({
        phonenumber: that.data.phonenumber
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {

        var err = res.data.error
        if (err) {
          console.log("通过表单获取数据失败" + err);
          that.setData({
            error: err
          })
        }
        else {
          console.log("通过表单获取数据成功");
          console.log(res.data)
          if (res.data != null) {
            if (res.data.length == 0) {
              console.log("对象长度是0")
              that.setData({
                showimg: false,
                trip: [{ id: 0, leaveplace: "您还没有任何行程!", arriveplace: "" }]
              })
              var setbuffer = gshare.setbuffer("trip", res.data);
            } else {
              that.setData({
                showimg: true,
                trip: res.data
              });
              var setbuffer = gshare.setbuffer("trip", res.data);
              var list = that.data.list;
              for (var i = 0; i < res.data.length; i++) {
                list.push(res.data[i]);
              }
              that.setData({
                list: list
              });
              page++;
              that.setData({
                hidden: true
              });
            }
          } else {
            that.setData({
              showimg: false,
              trip: [{ id: 0, leaveplace: "您还没有任何行程!", arriveplace: "" }]
            })
            var setbuffer = gshare.setbuffer("trip", res.data);
          }
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        console.log("远程数据");
      }
    })
  },


  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  onShow: function () {
    var that = this
    var trip = wx.getStorageSync("tripinfo")
    console.log("trip的show")
    console.log(trip)
    that.setData({
      trip: trip,
      datalist:trip
    })


    // gshare.getbuffer("tripinfo", function (tripinfo) {

    //   if (tripinfo != undefined && tripinfo.length != 0) { //表示数据已经缓存，无需授权登录
    //     console.log("show本地数据");
    //     console.log(tripinfo);

    //   } else {
    //     that.gettrip();
    //   }
    // })
  },
  onLoad: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: "行程列表"
    })
    gshare.getbuffer("tripinfo", function (tripinfo) {

      if (tripinfo != undefined && tripinfo.length != 0) { //表示数据已经缓存，无需授权登录
        // console.log("本地数据");
        // console.log(tripinfo);
        that.setData({
          trip: tripinfo
        })
      } else {
        // that.gettrip();
      }

    });



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
  onPullDownRefresh: function () {

    var that = this;
    console.log("滑动事件");
    //从本地缓存中获取行程，如果本地缓存数据为空，那么从远程进行同步
    gshare.getbuffer("trip", function (tripinfo) {

      if (tripinfo != null) { //表示数据已经缓存，无需授权登录
        console.log("本地数据");
        console.log(tripinfo);
        that.setData({

          trip: tripinfo

        })
      } else {

        that.gettrip();
      }

    });
    wx.stopPullDownRefresh()
  },
  flashlocal: function () {
    var datapost = this.data.datapost
    //从源端获取数据刷新到本地
    wx.setStorage({
      key: 'name',
      data: datapost,
    })
    wx.setStorage({
      key: 'jpg',
      data: 'https://img02.tooopen.com/images/20150812/tooopen_sy_137691656723.jpg',
    })
  },
  getlocal: function () {

    //从源端获取数据刷新到本地
    wx.getStorage({
      key: 'name',
      success: function (res) {
        console.log(res.data)
      },
    })

  },

  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
  ,
  newtrip: function () {
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

  chooseperson: function (e) {
    console.log("跳转到申请人")
    console.log("uuid")
    console.log(e.currentTarget.dataset.select)
    wx.navigateTo({
      url: '../user/user?uuid=' + e.currentTarget.dataset.select,
    })
  },
})  