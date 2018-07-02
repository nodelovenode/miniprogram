var postData = require('../data/test.js');
var gshare = require('../data/gshare.js');
var phonenumber = '';
var app = getApp();

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
    showpriv: true,
    showmenu: false,
    username: '',
    avatar: "../index/img/31.png",
    phoneno: null,
    ifca: false
  },
  onLoad: function () {
    var userinfo = null;
    var that = this;
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

    wx.setNavigationBarTitle({
      title: "个人中心"
    })



    //    that.bindGetUserInfo();

    gshare.getbuffer("info", function (userinfo) {
      console.log("userinfo")
      console.log(userinfo)
      if (userinfo != null) { //表示数据已经缓存，无需授权登录


        //检测是否实名认证过
        console.log("cardlist")
        console.log(wx.getStorageSync("cardlist").length)
        if (wx.getStorageSync("cardlist") == undefined || wx.getStorageSync("cardlist") == null || wx.getStorageSync("cardlist").length == 0) {
          that.setData({
            ifca: false
          })
        } else {
          that.setData({
            ifca: true
          })
        }

        that.setData({

          showmenu: true,
          showpriv: false,
          username: userinfo.phonenumber,
          avatar: "../index/img/31.png"
        })
      }

    });

  },


  getPhoneNumber: function (e) {
    var that = this;
    // console.log('微信端获取手机号')
    // console.log(e)
    // console.log(e.detail.iv)
    // console.log(e.detail.encryptedData)
    //发出授权请求，用于获取用户手机号码
    //根据用户登录login接口获取sessionkey，并存放到本地缓存session_key中
    console.log(gshare.g_requesturl + '/account')
    wx.login({
      success: function (res) {
        wx.request({
          method: "POST",
          url: gshare.g_requesturl + '/account',
          headers: {
            'content-type': 'application/json;charset=utf-8'
          },
          data: {
            js_code: res.code
          },
          success: function (res) {
            console.log('session接口调用成功')
            console.log(res.data);
            wx.setStorageSync('session_key', res.data.session_key);
            //var fn = res.data.session_key;
            /**
             * 在授权sessionkey之后，执行获取手机号代码
             */

            if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {

            } else {

              //提取本地存储的sessionkey
              var sessionkey = res.data.session_key
              if (sessionkey == undefined || sessionkey == null) {
                wx.showToast({
                  duration: 2000,
                  title: '远程服务超时',
                })
                return
              } else {
                wx.request({
                  method: "POST",
                  url: gshare.g_requesturl + '/phone',
                  headers: {
                    'content-type': 'application/json;charset=utf-8'
                  },
                  data: {
                    pdata: e.detail.encryptedData,
                    piv: e.detail.iv,
                    psessionkey: sessionkey
                  },
                  success: function (res) {
                    console.log('手机号码解密接口调用成功')
                    console.log(res.data);
                    phonenumber = res.data.phoneNumber
                    //调用数据接口写入数据库

                    console.log("正式手机号" + phonenumber);

                    if (phonenumber == undefined || phonenumber == '') {
                      wx.showToast({
                        duration: 2000,
                        title: '远程服务超时',
                      })
                      return
                    } else {
                      that.setData({
                        showpriv: false,
                        showmenu: true
                      })
                      that.setphonenumber();
                      that.modalcnt()
                      return res.data.phoneNumber;
                    }
                  }, fail: function (res) {
                    console.log(res)
                    wx.showToast({
                      duration: 2000,
                      title: '远程服务超时',
                    })
                  },
                  complete: function (res) {

                  }

                })
              }

            }




          },
          fail: function (res) {
            console.log(res)
            wx.showToast({
              title: '远程服务超时',
            })
          }

        })
      }
    })



  },


  modalcnt: function () {
    var that = this
    if (that.data.ifca == true) {
      wx.showToast({
        title: '无需实名认证',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '是否进行实名认证',
      confirmText:"是",
      cancelText:"否",
      success: function (res) {
        if (res.confirm) {
          //跳转到实名认证页面
          wx.navigateTo({
            url: './id?mode=1',
          })

        } else if (res.cancel) {

        }
      }
    })
  },



  clearbuffer: function () {
    wx.showModal({
      title: '提示',
      content: '本操作将清除所有的缓存数据，是否继续？',
      success: function (res) {
        if (res.confirm) {
          // wx.removeStorage({
          //   key: 'info',
          //   success: function (res) { },
          // })
          wx.removeStorage({
            key: 'portcontact',
            success: function (res) { },
          })
          wx.removeStorage({
            key: 'tripinfo',
            success: function (res) { },
          })
          wx.removeStorage({
            key: 'person',
            success: function (res) { },
          })
          wx.removeStorage({
            key: 'formlist',
            success: function (res) { },
          })
          // wx.removeStorage({
          //   key: 'cardlist',
          //   success: function (res) { },
          // })
          // wx.removeStorage({
          //   key: 'session_key',
          //   success: function (res) { },
          // })

        } else if (res.cancel) {
          return;
        }
      }
    })
  },
  bindGetUserInfo: function (fn) {
    console.log("发起请求，获取sessionkey")
    wx.login({
      success: function (res) {
        wx.request({
          method: "POST",
          url: gshare.g_requesturl + '/account',
          headers: {
            'content-type': 'application/json;charset=utf-8'
          },
          data: {
            js_code: res.code
          },
          success: function (res) {
            console.log('session接口调用成功')
            console.log(res.data);
            wx.setStorageSync('session_key', res.data.session_key);
            //fn = res.data.session_key;
          },
          fail: function (res) {
            console.log(res)
            wx.showToast({
              title: '远程服务超时',
            })
          }

        })
      }
    })
  },

  setphonenumber: function (e) {
    var that = this;
    var userinfo = null;

    if (phonenumber == undefined || phonenumber == "" || phonenumber == null) {
      wx.showToast({
        title: '用户登录失败',
        icon: 'information',
        image: '',
        duration: 0,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      return;
    } else {

      that.setData({
        avatar: app.globalData.userInfo,
        username: phonenumber,
        phoneno: phonenumber,
      })

      var info = {
        phonenumber: phonenumber
      }

      var setbuffer = gshare.setbuffer("info", info);

      //用户信息同步到后台数据库
      wx.request({
        method: "POST",
        url: gshare.g_requesturl + '/syncuser',
        headers: {
          'content-type': 'application/json;charset=utf-8'
        },
        data: {
          phonenumber: phonenumber
        },


        success: function (res) {
          //调用公共缓存方法，缓存本地数据
        },
        fail: function (res) {
          console.log(res)
          wx.showToast({
            title: '远程服务超时',
          })
        },
        complete: function (res) {
        }
      })
    }
  },

  gotocontact: function () {
    wx.navigateTo({
      url: '../person/userinfo',
    })
  },
  gotoform: function () {
    wx.navigateTo({
      url: '../formlist/formlist',
    })
  },

  uploaddata: function () {
    //打开新页面，上传行程，表单，常用注册人信息
    //从本地存储缓存中获取数据，整理为json格式文件，调用接口进行上传
    //上传，
    wx.navigateTo({
      url: '../system/upload',
    })
  },
  gotoscancode: function () {
    var obj = wx.getStorageSync("formlist")
    wx.navigateTo({
      url: '../scancode/index'
    })

  },
  exitlogin: function () {
    //退出登录，清除本地缓存的phonenumber
    wx.navigateBack({
      delta: -1
    })

  },
  onShow: function () {
    var that = this
    //检测是否实名认证过
    console.log("cardlist")
    console.log(wx.getStorageSync("cardlist").length)
    if (wx.getStorageSync("cardlist") == undefined || wx.getStorageSync("cardlist") == null || wx.getStorageSync("cardlist").length == 0) {
      that.setData({
        ifca: false
      })
    } else {
      that.setData({
        ifca: true
      })
    }
  },


  trip: function (e) {
    // var obj = [{
    //   gdate: "2018-06-01",
    //   leaveplace: "北京",
    //   arriveplace: "纽约",
    //   flightno: "CZ2908"
    // }]
    // wx.setStorageSync("trip", obj);


    wx.showLoading({ title: '加载中', });
    var info = wx.getStorageSync("info")
    wx.navigateTo({
      url: '../center/center',
    })
    wx.hideLoading();
  },

})  