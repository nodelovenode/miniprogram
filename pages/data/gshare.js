var util = require('../../utils/util.js');
//公共写入缓存方法
// var g_requesturl = "https://mp.itownet.cn:8090"
var g_requesturl = "https://mp.itownet.cn"
var setbuffer = function (pkey, pdata) {

  try {
    //
    //pkey表示存储的对象名称，pdata表示对象内容，pdata是一个json对象
    wx.setStorage({
      key: pkey,
      data: pdata
    })


  } catch (e) {
    wx.showToast({
      title: "信息保存失败",
      icon: 'fail',
      duration: 2000
    })
    console.log(e);
    return "error";
  }

}

//公共读取缓存方法
var getbuffer = function (pkey, pdata) {
  try {
    wx.getStorage({
      key: pkey,
      success: function (res) {
        console.log("获取key   " + pkey)
        console.log(res.data)
        pdata(res.data);
      },
      fail: function (e) {
        console.log("没有这个key   " + pkey);
        pdata(null);
      }
    })
  }
  catch (e) {
    console.log(e);
    return "error";
  }



}

var flashcontactlist = function () {
  //从远程获取常用申请人列表，并将获取的内容放到本地缓存
  var that = this
  var phonenumber = null;
  var userinfo = null;
  that.getbuffer("info", function (userinfo) {
    phonenumber = userinfo.phonenumber;
    console.log("刷新列表" + phonenumber);
    wx.request({
      method: "POST",
      url: g_requesturl+'/portcontact',
      data: JSON.stringify({
        phonenumber: phonenumber
      }),

      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("常用申请人列表")
        // console.log(res.data)
        that.setbuffer("portcontact", res.data);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  })
}

var uploadtrip = function (obj) {
  //obj对象为json，从本地缓存生成，样例
  // var obj = [{
  //   phoneno: "1360000000",
  //   gdate: "2018-05-01",
  //   leaveplace: "北京",
  //   arriveplace: "纽约",
  //   flightno: "CZ9998"
  // }, {
  //   phoneno: "1360000000",
  //   gdate: "2018-08-01",
  //   leaveplace: "北京",
  //   arriveplace: "伦敦",
  //   flightno: "CZ9788"
  // }]
// for (var i=0;i<obj.length;i++){
// console.log("上传参数")
//   console.log(obj)

  wx.request({
    method: "POST",
    url: g_requesturl+'/synctrip',
    data: obj,
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      // console.log(res.data)

      wx.showToast({
        title: "行程同步成功",
        icon: 'success',
        duration: 2000
      })
    },
    fail: function (res) {
      // fail
      console.log(res)
      wx.showToast({
        title: "行程同步失败",
        icon: 'fail',
        duration: 2000
      })

    },
    complete: function () {

    }
  })
}

var uploadperson = function (obj) {
  //obj对象为json，从本地缓存生成，样例
  // var obj = [{
  //   porttype: "个人"
  //   , portcode: "99999999"
  //   , countrycode: "中国"
  //   , country: "中国"
  //   , fullname: "高 志峰"
  //   , sex: "男"
  //   , birthday: "1982-01-27"
  //   , birthplace: "山西省"
  //   , issuancedate: "2018-08-01"
  //   , issuanceplace: "辽宁省"
  //   , issuanceauthority: "公安部出入境管理局"
  //   , limitdate: "2018-12-23"
  //   , phoneno: "13654241826"
  //   , firstname: "高"
  //   , lastname: "志峰"

  // }, {
  //   porttype: "个人"
  //   , portcode: "99991111"
  //   , countrycode: "中国"
  //   , country: "中国"
  //   , fullname: "庄 郅"
  //   , sex: "男"
  //   , birthday: "1982-01-27"
  //   , birthplace: "黑龙江省"
  //   , issuancedate: "2018-08-01"
  //   , issuanceplace: "辽宁省"
  //   , issuanceauthority: "公安部出入境管理局"
  //   , limitdate: "2018-12-23"
  //   , phoneno: "13654241826"
  //   , firstname: "庄"
  //   , lastname: "郅"

  // }]

  wx.request({
    method: "POST",
    url: g_requesturl+'/syncperson',
    data: obj,
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      // console.log(res.data)

      wx.showToast({
        title: "申请人同步成功",
        icon: 'fail',
        duration: 2000
      })
    },
    fail: function (res) {
      // fail
      console.log(res)
      wx.showToast({
        title: "申请人同步失败",
        icon: 'fail',
        duration: 2000
      })

    },
    complete: function () {

    }
  })
}
var uploadform = function (obj) {

  wx.request({
    method: "POST",
    url: g_requesturl+'/syncform',
    data: obj,
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      // console.log(res.data)

      wx.showToast({
        title: "表单同步成功",
        icon: 'fail',
        duration: 2000
      })
    },
    fail: function (res) {
      // fail
      console.log(res)
      wx.showToast({
        title: "表单同步失败",
        icon: 'fail',
        duration: 2000
      })

    },
    complete: function () {

    }
  })
}
var getuuid = util.formatTime(new Date());  //唯一值

var adddata = function (datalist, list, buffername) {
  console.log(datalist)
  if (datalist == undefined) {
    datalist = []
  } else if (datalist.length == 0) {
    datalist = []
  }

  if (list == undefined || list == null) {
    list = ''
  } else { datalist.push(list) }



  console.log("public datalist")
  console.log(datalist)
  console.log("public list")
  console.log(list)


  if (buffername == "test") { wx.setStorage("test", datalist) }
  else if (buffername == "tripinfo") { 
    wx.setStorage({
      key: 'tripinfo',
      data: datalist,
    })
  }
  else if (buffername == "person") { wx.setStorage("person", datalist) }
  else if (buffername == "form") { wx.setStorage("form", datalist) } else if (buffername == "info") { wx.setStorage("info", datalist) }
  else if (buffername == "session_key") { wx.setStorage("session_key", datalist) }
}

//检索数组，看是否有重复

var ifrepeat = function (datalist, list, buffername) {
  var result = false
  console.log(datalist)
  if (datalist == undefined) {
    return false;
  } else if (datalist.length == 0) {
    return false;
  }

  if (list == undefined || list == null) {
    return false
  }
  if (buffername == "tripinfo") {

    for (var i = 0; i < datalist.length; i++) {
      if (datalist[i].uuid==list.uuid) {
        result = true;

      } else { result = false; }
    }
    return result;


  }
  else if (buffername == "test") {

    for (var i = 0; i < datalist.length; i++) {
      if (datalist[i].firstname == list.firstname &&
        datalist[i].lastname == list.lastname) {
        result = true;
        console.log(result);
        return true;
      } else { result = false; }
    }
    return result;
  }
  else if (buffername == "person") {
    for (var i = 0; i < datalist.length; i++) {
      if (datalist[i].phonenumber == list.phonenumber) {
        result = true;

      } else { result = false; }
    }
    return result;
   }
  else if (buffername == "form") { 
    for (var i = 0; i < datalist.length; i++) {
      if (datalist[i].uuid == list.uuid) {
        result = true;

      } else { result = false; }
    }
    return result;
  } 
}
//----删除元素
var deldata = function (datalist, list, buffername) {
  var tempdatalist = datalist
  // console.log("datalist")
  // console.log(datalist)
  if (datalist == undefined) {
    return datalist;
  } else if (datalist.length == 0) {
    return datalist;
  }

  if (list == undefined || list == null) {
    return datalist
  }

  if (buffername == "test") {

  for (var i = 0; i < datalist.length; i++) {
    if (datalist[i].firstname == list.firstname &&
      datalist[i].lastname == list.lastname) {
             tempdatalist.splice(i, 1)
    }
  }
  return tempdatalist
  }
  else if (buffername == "tripinfo") {

    for (var i = 0; i < datalist.length; i++) {
      if (datalist[i].uuid == list.uuid) {
        tempdatalist.splice(i, 1)
      }
    }
    wx.setStorageSync("tripinfo", tempdatalist)
    return tempdatalist
  }
  else if (buffername == "portcontact") {

    for (var i = 0; i < datalist.length; i++) {
      if (datalist[i].portcode == list.portcode) {
        tempdatalist.splice(i, 1)
      }
    }
    console.log("tempdatalist")
    console.log(tempdatalist)
    wx.setStorageSync("portcontact", tempdatalist)
    return tempdatalist
  }

}

// 定义函数出口  
module.exports = {
  setbuffer: setbuffer,
  getbuffer: getbuffer,
  flashcontactlist: flashcontactlist,
  uploadtrip: uploadtrip,
  uploadperson: uploadperson,
  uploadform: uploadform,
  getuuid: getuuid,
  adddata: adddata,
  ifrepeat: ifrepeat,
  deldata: deldata,
  g_requesturl: g_requesturl
}  