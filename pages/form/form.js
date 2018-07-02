// pages/form/form.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstname: '姓氏',
    lastname: '名字',
    birthday: '出生日期',
    flightno: '航班号码',
    date: '2000-01-01',
    initialSwitch: false,
    firstnameInput: null,
    lastnameInput: null,
    flightnoInput: null,
    list: [],
    formlist: []

  },

  onLoad: function (options) {
    var that = this

    // 把接收到的字符串转换成json对象
    var param = options.uppage;
    var flightno = options.flightno;
    var op = JSON.parse(param);
    console.log("form接收的参数：----")
    console.log(op);
    that.setData({
      list: op,
      phonenumber: wx.getStorageSync("info").phonenumber,
      flightno: flightno
    })

  },

  /**
 * 获取表单values
 */
  formBindsubmit: function (e) {
    console.log(e.detail.value);
    var formlist = e.detail.value;
    var j = 0;
    var p = 0;
    var ll = [];
    var templist = [];
    var temp = '';
    var keytemp = '';
    var uuid = ''
    for (var key in formlist) {
      console.log(key)
      ll.push(key)
    }
    console.log("表单项共" + ll.length + "个")
    for (var i = 0; i < ll.length; i++) {


      if (ll[i].indexOf("firstname") > -1) {
        keytemp = 'firstname'
      }
      else if (ll[i].indexOf("lastname") > -1) {
        keytemp = 'lastname'
      }
      else if (ll[i].indexOf("birthday") > -1) {
        keytemp = 'birthday'
      }
      else if (ll[i].indexOf("flightno") > -1) {
        keytemp = 'flightno'
      }
      else if (ll[i].indexOf("otheroption1") > -1) {
        keytemp = 'otheroption1'
      }
      else if (ll[i].indexOf("otheroption2") > -1) {
        keytemp = 'otheroption2'
      } else if (ll[i].indexOf("uuid") > -1) {
        keytemp = 'uuid'
        uuid = formlist[ll[i]]
      } else if (ll[i].indexOf("phonenumber") > -1) {
        keytemp = 'phonenumber'
      } 


      console.log(ll[i] + "的值" + formlist[ll[i]])
      temp = temp + '"' + keytemp + '"' + ':' + '"' + formlist[ll[i]] + '"' + ','

      if ((i + 1) % 8 == 0) {
        temp = '{' + temp.substr(0, temp.length - 1) + '}'
        console.log(temp)
        var obj = JSON.parse(temp)
        templist.push(obj)
        temp = '';
       
      }
    }
    var oldformlist = wx.getStorageSync("formlist")
    for(var i=0;i<oldformlist.length;i++){
      templist.push(oldformlist[i])
    }

    console.log("生成的表单-------------")
    console.log(templist)
    wx.setStorageSync("formlist", templist)
//更新行程表的staus字段
   var oldtriplist = wx.getStorageSync("tripinfo")
   var temptriplist = oldtriplist
   for (var i = 0; i < oldtriplist.length;i++){
    
     if (oldtriplist[i].uuid == uuid)
     {
       temptriplist.splice(i,1,{
         arriveplace: oldtriplist[i].arriveplace,
         flightno: oldtriplist[i].flightno,
         gdate: oldtriplist[i].gdate,
         leaveplace: oldtriplist[i].leaveplace,
         phonenumber: oldtriplist[i].phonenumber,
         status: 1,
         uuid: oldtriplist[i].uuid,

       })
       console.log("更新状态之后的trip")
       console.log(temptriplist)
       wx.setStorageSync("tripinfo",temptriplist)
      //  wx.setStorage({
      //    key: 'tripinfo',
      //    data: temptriplist,
      //  })
     }
   }


    wx.showModal({
      title: '提示',
      content: '表单申报完成，如果您需要分享，可以到个人中心->我的二维码 中查看，也可以在 我的表单 中查看具体内容',
      showCancel:false,
      success: function (res) {
        if (res.confirm) {
          
          // wx.redirectTo({
          //   url: '../trip/trip',
          // })
          wx.navigateBack({
            delta :2
          })
          }}
    })

    // console.log("表单内容")
    // var pformlist = wx.getStorageSync("formlist")
    // wx.navigateTo({
    //   url: '../form/scancode?form=' + JSON.stringify(pformlist),
    // })
  },



  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  /**
 * 监听日期picker选择器
 */
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  switchChecked: function (e) {
    console.log('switch 发生 change 事件，携带值为', e.detail.value)
    this.setData({
      cswitch: e.detail.value
    })
  },
})