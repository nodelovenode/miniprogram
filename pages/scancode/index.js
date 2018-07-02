// pages/main/index.js
var QR = require("../../utils/qrcode.js");
Page({
  data: {
    canvasHidden: false,
    maskHidden: true,
    imagePath: '',
    placeholder: 'https://www.itownet.cn',//默认二维码生成文本,
    formlist: null,
    triplist: [],
showhint:[]  //用来提示是否有申请人

  },
  onLoad: function (options) {

    var that = this
    //获取屏幕高度
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    })


    // 页面初始化 options为页面跳转所带来的参数
    var size = this.setCanvasSize();//动态设置画布大小
    var initUrl = this.data.placeholder;

    var temptriplist = []
    var tmp_form = []
    var showuser = []
    var hint = true
    var tempshowhint = []
    var tempformlist = wx.getStorageSync("formlist")
    that.setData({
      triplist: wx.getStorageSync("tripinfo")
    })
    console.log(that.data.triplist)
    this.createQrCode(initUrl, "mycanvas", size.w, size.h);
    console.log("二维码")
    console.log("options.form")
    console.log(options.form)
    if (options.form != undefined) {
      that.setData({
        placeholder: options.form,
        formlist: JSON.parse(options.form)
      })
    } else {

      for (var i = 0; i < that.data.triplist.length; i++) {
        showuser.push(false)
        //初始化显示列
        that.setData({
          showuser: showuser
        })
        tmp_form = []
        for (var x = 0; x < tempformlist.length; x++) {

          if (tempformlist[x].uuid == that.data.triplist[i].uuid) {
            tmp_form.push(tempformlist[x])
            hint = false

          }
        
        }
        tempshowhint.push(hint)
 
        console.log("tempshowhint")
        console.log(tempshowhint)
        hint = true
        var temparray = JSON.stringify({

          uuid: that.data.triplist[i].uuid,
          arriveplace: that.data.triplist[i].arriveplace,
          leaveplace: that.data.triplist[i].leaveplace,
          gdate: that.data.triplist[i].gdate,
          flightno: that.data.triplist[i].flightno,
          formlist: tmp_form
        })
        temptriplist.push(JSON.parse('{"trip":' + temparray + '}'))
      }
      that.setData({
        // formlist: "[" + temptriplist.substring(0, temptriplist.length-1)+"]"
        formlist: temptriplist
      })
    }
    that.setData({
      showhint: tempshowhint
    })
    console.log("showuser")
    console.log(that.data.showuser)
    console.log("this.data.formlist")
    console.log(this.data.formlist)
  },
  changeshowuser: function (e) {
    var that = this
    var index = e.currentTarget.dataset.text;
    var show = e.currentTarget.dataset.select;
    var tempshow = that.data.showuser
    console.log("show的值")
    console.log(show[index])
    console.log("是否提示")
    console.log(that.data.showhint)
    if (that.data.showhint[index]==true){
      wx.showToast({
        title: '行程没有申报'
      });
    }

    for (var i = 0; i < that.data.showuser.length; i++) {

      if (i == index)
      { tempshow.splice(i, 1, show[index]==false) }
    }

    console.log("后来tempshow")
    console.log(tempshow)
     that.setData({
      showuser: tempshow
    })
  },

  onReady: function () {

  },
  onShow: function () {

    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭

  },
  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => { this.canvasToTempImage(); }, 1000);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({
          imagePath: tempFilePath,
          // canvasHidden:true
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  showscancode: function (e) {
    console.log(e)
    wx.navigateTo({
      url: './detail?uuid=' + e.currentTarget.dataset.select + '&&fullname=' + e.currentTarget.dataset.text
    })
  },


  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.imagePath;
    console.log(img);
    wx.previewImage({
      current: img, // 当前显示图片的https链接
      urls: [img] // 需要预览的图片https链接列表
    })
  },
  formSubmit: function (e) {
    var that = this;

    console.log("e.currentTarget.dataset.text")
    console.log(e.currentTarget.dataset.text)
    var url = e.currentTarget.dataset.text;
    that.setData({
      maskHidden: false,
    });
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 2000
    });
    var st = setTimeout(function () {
      wx.hideToast()
      var size = that.setCanvasSize();
      //绘制二维码
      that.createQrCode(url, "mycanvas", size.w, size.h);
      that.setData({
        maskHidden: true
      });
      clearTimeout(st);
    }, 2000)

  }

})