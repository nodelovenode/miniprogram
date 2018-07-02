var gshare = require('../data/gshare.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    country: [
      {
        code: "JPN",
        name: "日本",

      },
      {
        code: "CHN",
        name: "中国",

      }
    ],
    provicy: [{
      "ProID": 1,
      "name": "北京市",
      "ProSort": 1,
      "ProRemark": "直辖市"
    }, {
      "ProID": 2,
      "name": "天津市",
      "ProSort": 2,
      "ProRemark": "直辖市"
    }, {
      "ProID": 3,
      "name": "河北省",
      "ProSort": 5,
      "ProRemark": "省份"
    }, {
      "ProID": 4,
      "name": "山西省",
      "ProSort": 6,
      "ProRemark": "省份"
    }, {
      "ProID": 5,
      "name": "内蒙古自治区",
      "ProSort": 32,
      "ProRemark": "自治区"
    }, {
      "ProID": 6,
      "name": "辽宁省",
      "ProSort": 8,
      "ProRemark": "省份"
    }, {
      "ProID": 7,
      "name": "吉林省",
      "ProSort": 9,
      "ProRemark": "省份"
    }, {
      "ProID": 8,
      "name": "黑龙江省",
      "ProSort": 10,
      "ProRemark": "省份"
    }, {
      "ProID": 9,
      "name": "上海市",
      "ProSort": 3,
      "ProRemark": "直辖市"
    }, {
      "ProID": 10,
      "name": "江苏省",
      "ProSort": 11,
      "ProRemark": "省份"
    }, {
      "ProID": 11,
      "name": "浙江省",
      "ProSort": 12,
      "ProRemark": "省份"
    }, {
      "ProID": 12,
      "name": "安徽省",
      "ProSort": 13,
      "ProRemark": "省份"
    }, {
      "ProID": 13,
      "name": "福建省",
      "ProSort": 14,
      "ProRemark": "省份"
    }, {
      "ProID": 14,
      "name": "江西省",
      "ProSort": 15,
      "ProRemark": "省份"
    }, {
      "ProID": 15,
      "name": "山东省",
      "ProSort": 16,
      "ProRemark": "省份"
    }, {
      "ProID": 16,
      "name": "河南省",
      "ProSort": 17,
      "ProRemark": "省份"
    }, {
      "ProID": 17,
      "name": "湖北省",
      "ProSort": 18,
      "ProRemark": "省份"
    }, {
      "ProID": 18,
      "name": "湖南省",
      "ProSort": 19,
      "ProRemark": "省份"
    }, {
      "ProID": 19,
      "name": "广东省",
      "ProSort": 20,
      "ProRemark": "省份"
    }, {
      "ProID": 20,
      "name": "海南省",
      "ProSort": 24,
      "ProRemark": "省份"
    }, {
      "ProID": 21,
      "name": "广西壮族自治区",
      "ProSort": 28,
      "ProRemark": "自治区"
    }, {
      "ProID": 22,
      "name": "甘肃省",
      "ProSort": 21,
      "ProRemark": "省份"
    }, {
      "ProID": 23,
      "name": "陕西省",
      "ProSort": 27,
      "ProRemark": "省份"
    }, {
      "ProID": 24,
      "name": "新 疆维吾尔自治区",
      "ProSort": 31,
      "ProRemark": "自治区"
    }, {
      "ProID": 25,
      "name": "青海省",
      "ProSort": 26,
      "ProRemark": "省份"
    }, {
      "ProID": 26,
      "name": "宁夏回族自治区",
      "ProSort": 30,
      "ProRemark": "自治区"
    }, {
      "ProID": 27,
      "name": "重庆市",
      "ProSort": 4,
      "ProRemark": "直辖市"
    }, {
      "ProID": 28,
      "name": "四川省",
      "ProSort": 22,
      "ProRemark": "省份"
    }, {
      "ProID": 29,
      "name": "贵州省",
      "ProSort": 23,
      "ProRemark": "省份"
    }, {
      "ProID": 30,
      "name": "云南省",
      "ProSort": 25,
      "ProRemark": "省份"
    }, {
      "ProID": 31,
      "name": "西藏自治区",
      "ProSort": 29,
      "ProRemark": "自治区"
    }, {
      "ProID": 32,
      "name": "台湾省",
      "ProSort": 7,
      "ProRemark": "省份"
    }, {
      "ProID": 33,
      "name": "澳门特别行政区",
      "ProSort": 33,
      "ProRemark": "特别行政区"
    }, {
      "ProID": 34,
      "name": "香港特别行政区",
      "ProSort": 34,
      "ProRemark": "特别行政区"
    }],
    visaplace: [{
      code: "1",
      name: "公安部出入境管理局"
    }],
    porttype: [{
      code: "1",
      name: "个人",

    },
    {
      code: "2",
      name: "集体",

    }],
    sex: [{
      code: "1",
      name: "男",

    },
    {
      code: "2",
      name: "女",

    }],

    leaveplace: [{ code: "1", name: "北京" }, { code: "2", name: "纽约" }],
    page: null,

    /*定义变量来控制画面是否隐藏标签文字*/
    lable1: true,
    lable2: true,
    lable3: true,
    lable4: true,
    showdel: true, //是否显示删除按钮
    list: [],  //用来控制当前画面的已有数据
    datalist: [],//用来保存从缓存中获取到的portcontact
    tripmode: null
  },
  //获取城市选择页面传来的数据（到达城市）
  changearrivecity: function () {
    var that = this
    that.setData({
      mode: 2,
      lable3: false
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
      mode: 1,
      lable2: false
    })
    console.log("选择出发城市")
    wx.navigateTo({
      url: '../flightsel/citysel/citysel?mode=' + that.data.mode
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this



    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    })

    //获取本地行程数据，保存到datalist中
    that.setData({
      datalist: wx.getStorageSync("tripinfo")
    })
    console.log("获取本地行程信息----")
    console.log(that.data.showdel)
    console.log(that.data.datalist);

    that.setData({
      tripmode: options.mode,
      tripno: options.tripno,
      flightobj: options.datalist,
      showdel: false
    })

    // console.log(JSON.parse(that.data.flightobj))
    if (that.data.flightobj != undefined || that.data.flightobj!=null) {
      var fobj = JSON.parse(that.data.flightobj)
      //表示新增数据，并且要默认值补充上
      that.setData({
        date : fobj.date,
        leavecity: fobj.leavecity,
        arrivecity: fobj.arrivecity,
        list: [{flightno: fobj.name}],
        uuid: that.data.tripno,
        lable3: false,
        lable2: false,
        lable1: false
      })
      return;
    }


    console.log(that.data.tripno)
    console.log(that.data.tripmode)
    if (that.data.tripmode == 1) {
      wx.setNavigationBarTitle({
        title: "新增行程"
      })
      //提供默认值
      that.setData({
        showdel: false,
        uuid: that.data.tripno
      })

    }
    else if (that.data.tripmode == 2) {
      wx.setNavigationBarTitle({
        title: "编辑行程"
      })
      //提供默认值
      that.setData({
        showdel: true,
        uuid: that.data.tripno
      })
    }
    
    if (that.data.datalist == '' || that.data.datalist == null || that.data.datalist == undefined) {
      that.setData({
        datalist: [],
      })
    } else {
      //定位编辑的行程
      for (var i = 0; i < that.data.datalist.length; i++) {
        if (that.data.datalist[i].uuid == that.data.tripno) {
          that.setData({
            list: [{ gdate: that.data.datalist[i].gdate, leaveplace: that.data.datalist[i].leaveplace, arriveplace: that.data.datalist[i].arriveplace, flightno: that.data.datalist[i].flightno }]
          })
          console.log("that.data.list")

          console.log(that.data.list)
        }
      }
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
    var that = this
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    var local_leavecity = '';
    var local_arrivecity = '';
    if (that.data.list[0] != null || that.data.list[0] != undefined) {
      local_leavecity = that.data.list[0].leaveplace
      local_arrivecity = that.data.list[0].arriveplace
    }
    console.log("本地出发" + local_leavecity)
    console.log("本地到达" + local_arrivecity)

    if (that.data.leavecity == undefined || that.data.leavecity == null) {
      that.setData({//将携带的参数赋值
        leavecity: local_leavecity
      });
    } else {
      that.setData({//将携带的参数赋值
        leavecity: that.data.leavecity
      });
    }

    if (that.data.arrivecity == undefined || that.data.arrivecity == null) {
      that.setData({//将携带的参数赋值
        arrivecity: local_arrivecity
      });
    } else {
      that.setData({//将携带的参数赋值
        arrivecity: that.data.arrivecity
      });
    }
    console.log("出发" + that.data.leavecity)
    console.log("到达" + that.data.arrivecity)
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

  pickgdate: function (e) {

    //console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({
      date: e.detail.value,
      lable1: false
    })
  },

  pickleavecity: function (e) {

    //console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({
      leavecityindex: e.detail.value,
      lable2: false
    })
  },
  pickarrivecity: function (e) {

    //console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({
      arrivecityindex: e.detail.value,
      lable3: false
    })
  },
  returnpage: function () {
    wx.navigateBack();
    // wx.redirectTo({
    //   url: './trip',
    // })
  },
  deletetrip: function (e) {
    try {
      var that = this
      console.log("开始删除行程")
      console.log(that.data.datalist.length)
      // 调用接口删除常用信息
      gshare.getbuffer("info", function (userinfo) {
        var phonenumber = userinfo.phonenumber;
        var portcode = e.detail.value.portcode;
        var del = 0;
        var j = that.data.datalist.length
        for (var i = 0; i < j; i++) {

          if (that.data.datalist[i].portcode == portcode) {
            console.log("准备删除行程:" + that.data.datalist[i].portcode + " 索引：" + i)
            console.log("删除之前的list")
            console.log(that.data.datalist)
            del = i;
            // var list = that.data.datalist.splice(2, 1);
            // console.log("删除之后的list")
            // console.log(list)
            // that.setData({
            //   datalist: list
            // })
            // console.log(that.data.datalist)

          }
        }
        console.log("del" + del)
        var ll = that.data.datalist.splice(del, 1);
        console.log("删除之后的list")
        console.log(that.data.datalist)
        that.setData({
          datalist: that.data.datalist
        })

        gshare.setbuffer("trip", that.data.datalist);


        //       wx.request({
        //         method: "POST",
        //         url: 'http://decl.top:8090/deletecontact',
        //         data: JSON.stringify({
        //           phonenumber: phonenumber,
        //           portcode: e.detail.value.portcode
        //         }),

        //         headers: {
        //           'Content-Type': 'application/json'
        //         },
        //         success: function (res) {
        //           console.log(res.data)

        //           wx.showToast({
        //             title: res.data,
        //             icon: 'success',
        //             duration: 2000
        //           })
        //           gshare.flashcontactlist();
        //         },
        //         fail: function () {
        //           // fail
        //           wx.showToast({
        //             title: "同步远程失败",
        //             icon: 'fail',
        //             duration: 2000
        //           })

        //         },
        //         complete: function () {
        //           // complete
        //           console.log("请求结束")
        //           gshare.flashcontactlist();
        //           wx.navigateBack({

        //  })

        //         }
        //       })


      })
    }
    catch (e) {

    }

  },


  // formSubmit: function (e) {
  //   try {
  //     var that = this
  //     var phonenumber = null;
  //     var userinfo = null;
  //     var listdata = null;
  //     var list = [];
  //     gshare.getbuffer("info", function (userinfo) {
  //       phonenumber = userinfo.phonenumber;

  //       if (that.data.list.length == 0) {
  //         console.log("准备新增一个行程")
  //         listdata = {

  //           gdate: e.detail.value.gdate,
  //           leaveplace: e.detail.value.leaveplace,
  //           arriveplace: e.detail.value.arriveplace,
  //           flightno: e.detail.value.flightno,
  //           phonenumber: phonenumber,
  //           uuid: that.data.uuid
  //         }
  //         console.log("新增行程信息----")
  //         console.log(listdata);
  //         that.data.datalist.push(listdata);
  //         console.log(that.data.datalist);
  //       } else {
  //         console.log("准备修改一个行程")
  //         listdata = {

  //           gdate: (e.detail.value.gdate == null || e.detail.value.gdate == "") ? that.data.datalist[0].gdate : e.detail.value.gdate,

  //           leaveplace: (e.detail.value.leaveplace == null || e.detail.value.leaveplace == "") ? that.data.datalist[0].leaveplace : e.detail.value.leaveplace,
  //           arriveplace: (e.detail.value.arriveplace == null || e.detail.value.arriveplace == "") ? that.data.datalist[0].arriveplace : e.detail.value.arriveplace,
  //           flightno: e.detail.value.flightno,
  //           phonenumber: phonenumber
  //         }
  //       }
  //       // console.log("that.data.list")
  //       // console.log(that.data.list)
  //       // console.log(listdata)
  //       // if (that.data.list.length == 0) {
  //       //   list = that.data.datalist.push(listdata);
  //       //   console.log("that.data.datalist")
  //       //   console.log(that.data.datalist)
  //       // } else {
  //       //   //先删除，后插入

  //       //   var j = that.data.datalist.length
  //       //   for (var i = 0; i < j; i++) {
  //       //     console.log("that.data.datalist[i].portcode" + that.data.datalist[i].portcode)
  //       //     console.log("that.data.list[0].portcode" + that.data.list[0].portcode)
  //       //     if (that.data.datalist[i].portcode == that.data.list[0].portcode) {
  //       //       console.log("准备删除申请人:" + that.data.datalist[i].portcode + " 索引：" + i)
  //       //       list = that.data.datalist.splice(i, 1);
  //       //       list = that.data.datalist.push(listdata);
  //       //     }
  //       //   }
  //       // }
  //       console.log("缓存行程到本地")
  //       console.log(that.data.datalist)
  //       gshare.setbuffer("tripinfo", that.data.datalist);
  //       console.log("读取tripinfo")
  //       console.log(wx.getStorageSync("tripinfo"))
  //       wx.showToast({
  //         title: "信息保存成功",
  //         icon: 'success',
  //         duration: 2000
  //       })
  //       that.returnpage();

  //     });
  //   } catch (e) {
  //     wx.showToast({
  //       title: '系统异常',
  //       icon: 'success',
  //       duration: 2000
  //     })
  //     console.log(e);
  //   }
  // },
  deltrip: function (e) {
    var that = this;
    var deltripno = e.currentTarget.dataset.select
    var listdata = { uuid: deltripno }
    console.log(listdata)
    console.log("deltripno-----------" + deltripno)
    console.log(that.data.datalist)
    gshare.deldata(that.data.datalist, listdata, "tripinfo")

    wx.showToast({
      title: "信息删除成功",
      icon: 'success',
      duration: 2000
    })
    that.returnpage();
  },
  formSubmit: function (e) {
    try {
      var that = this
      var phonenumber = null;
      var userinfo = null;
      var listdata = null;
      var list = [];
      var datalist = [];
      gshare.getbuffer("info", function (userinfo) {
        phonenumber = userinfo.phonenumber;
        datalist = that.data.datalist;
        console.log("trip的datalist")
        console.log(datalist)
        console.log(that.data.tripmode)
        if (that.data.tripmode == 1) {
          listdata = {

            gdate: e.detail.value.gdate,
            leaveplace: e.detail.value.leaveplace,
            arriveplace: e.detail.value.arriveplace,
            flightno: e.detail.value.flightno,
            phonenumber: phonenumber,
            uuid: that.data.uuid,
            status:0
          }

          console.log("uuid----------")
          console.log(listdata.uuid)
          gshare.adddata(datalist, listdata, "tripinfo")
        } else if (that.data.tripmode == 2) {
          listdata = {

            gdate: (e.detail.value.gdate == null || e.detail.value.gdate == "") ? that.data.datalist[0].gdate : e.detail.value.gdate,

            leaveplace: (e.detail.value.leaveplace == null || e.detail.value.leaveplace == "") ? that.data.datalist[0].leaveplace : e.detail.value.leaveplace,
            arriveplace: (e.detail.value.arriveplace == null || e.detail.value.arriveplace == "") ? that.data.datalist[0].arriveplace : e.detail.value.arriveplace,
            flightno: e.detail.value.flightno,
            phonenumber: phonenumber,
            uuid: that.data.uuid,
            status:0
          }
          //进行修改，找出原来的数据，删除之后进行添加
          console.log(datalist);
          console.log(listdata)

          gshare.deldata(datalist, listdata, "tripinfo")
          gshare.adddata(datalist, listdata, "tripinfo")

        }

        wx.showToast({
          title: "信息保存成功",
          icon: 'success',
          duration: 2000
        })
        that.returnpage();
      })



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