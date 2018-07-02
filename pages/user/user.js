var gshare = require('../data/gshare.js');
var util = require('../../utils/util.js');
var chooselist = [];
Page({
  data: {
    list: [],
    winWidth: 0,
    winHeight: 0,
    status : 0,
    uuid:null
  },
  onLoad: function (options) {
   var that = this
   that.setData({
     uuid: options.uuid
   })
    console.log("加载页面---user")
    console.log(options)
    var that =this;
    wx.setNavigationBarTitle({
      title: "选择申请人"
    })
//刷新申请人列表
    that.initlist();

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
  },
  onShow: function (options) {
    var that = this
    that.initlist();
  },

  initlist :function(e){
    //初始化申请人列表
    //从本地缓存中获取
    try {
    var that = this;
    gshare.getbuffer("portcontact", function (list) {
      if (list==null) {
        that.setData({
          list: null
        })
      } else
      that.setData({
        list : list
      })
      console.log("list-------:")
      console.log(that.data.list);
    });
    } catch (e){
      wx.showToast({
        title: '列表获取失败',
        icon: 'success',
        duration: 2000
      })
    }
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    chooselist = e.detail.value;
  },
  newuser: function(){
    var  that = this
    wx.navigateTo({
      url: './newuser?uppage=info&&mode=1&&uuid='+that.data.uuid,
    })
  },

  modifyperson:function (e) {
    var that = this;

    console.log("view的值");

    console.log(e.currentTarget.dataset.select);
    wx.navigateTo({
      url: '../user/newuser?uppage=info&&mode=2&&portcode=' + e.currentTarget.dataset.select,
    })
  },
  godecl: function () {
    var that = this
    var paramlist = [];
var templist = null;
var uuid = that.data.uuid

//获取航班号
var tempflightno = null
var temptriplist = wx.getStorageSync("tripinfo")
for(var i =0;i<temptriplist.length;i++){
  if (temptriplist[i].uuid==uuid){
    tempflightno = temptriplist[i].flightno
  }
}
    console.log("航班号：" + tempflightno)

    for (var index in chooselist) {
      templist = that.data.list[chooselist[index]]
      templist = {
        birthday: that.data.list[chooselist[index]].birthday,
        birthplace: that.data.list[chooselist[index]].birthplace,
        country: that.data.list[chooselist[index]].country,
        countrycode: that.data.list[chooselist[index]].countrycode,
        firstname: that.data.list[chooselist[index]].firstname,
        fullname: that.data.list[chooselist[index]].fullname,
        issuanceauthority: that.data.list[chooselist[index]].issuanceauthority,
        issuancedate: that.data.list[chooselist[index]].issuancedate,
        issuanceplace: that.data.list[chooselist[index]].issuanceplace,
        lastname: that.data.list[chooselist[index]].lastname,
        limitdate: that.data.list[chooselist[index]].limitdate,
        phonenumber: that.data.list[chooselist[index]].phonenumber,
        portcode: that.data.list[chooselist[index]].portcode,
        porttype: that.data.list[chooselist[index]].porttype,
        sex: that.data.list[chooselist[index]].sex,
        uuid: uuid
      }
      console.log("templist")
      console.log(templist)
      paramlist.push(templist);


    }
    console.log(that.data.list)
    console.log("chooselist");
    console.log(chooselist);
    console.log("paramlist");
    console.log(paramlist);
    var contactlist = JSON.stringify(paramlist)
    wx.navigateTo({
      url: '../form/form?uppage=' + contactlist + '&&flightno=' + tempflightno
    })
  }
})