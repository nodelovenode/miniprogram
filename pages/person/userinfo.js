var gshare = require('../data/gshare.js');
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    status: 0,
    id: 0,
    list:null,
    portcode:null
  },
  onLoad: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: "常用申请人"
    })
    console.log("person的userinfo页面")
    //刷新申请人列表
    that.initlist();

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
  onShow: function (options) {
    // 生命周期函数--监听小程序显示(后退到这个页面的时候这个就会被回调)    当小程序启动，或从后台进入前台显示，会触发 onShow  
    

    // var pages = getCurrentPages();
    // var prevPage = pages[pages.length - 2];  //上一个页面
    // prevPage.onLoad(prevPage.options)
    // console.log("调用show函数")
    this.initlist();
  },

  initlist: function (e) {
    //初始化申请人列表
    //从本地缓存中获取
    try {
      var that = this;
      gshare.getbuffer("portcontact", function (list) {
        that.setData({
          list: list
        })
      });
    } catch (e) {
      wx.showToast({
        title: '列表获取失败',
        icon: 'success',
        duration: 2000
      })
    }
  },
  formSubmit: function (e) {
    var that = this
    try {
      that.setData({
        id: e.detail.value.id
      })
    } catch (e) {

    }
  },
  newuser: function () {

    wx.showLoading({ title: '加载中', });
  
 

    wx.navigateTo({
      url: '../user/newuser?uppage=info&&mode=1',
    })
    wx.hideLoading(); 
  },


  deletecontact: function () {
    var that = this
    console.log("that.id" + that.data.id);
    //删除申请人
    wx.showModal({
      title: '提示',
      content: '是否删除该记录',
      success: function (res) {
       
        if (res.confirm) {
          var newlist = that.data.list;
          newlist.splice(that.data.id, 1);
          that.setData({
            list: newlist
          })
          gshare.setbuffer("portcontact", newlist);

        }
      }
    })
  },
  modifyperson:function(e){
    var that = this;

    console.log("view的值");

    console.log(e.currentTarget.dataset.select);
    wx.navigateTo({
      url: '../user/newuser?uppage=info&&mode=2&&portcode=' + e.currentTarget.dataset.select,
    })
  }
})