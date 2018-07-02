var gshare = require('../data/gshare.js');

var result = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    country: [
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
      name: "P",

    }],
    sex: [{
      code: "1",
      name: "男",

    },
    {
      code: "2",
      name: "女",

    }],
    page: null,

    /*定义变量来控制画面是否隐藏标签文字*/
    lable1: true,
    lable2: true,
    lable3: true,
    lable4: true,
    lable5: true,
    lable6: true,
    lable7: true,
    lable8: true,
    lable9: true,
    lable10: true,
    lable11: true,
    lable12: true,
    lable13: true,
    lable14: true,
    lable15: true,
    list: [],  //用来控制当前画面的已有数据
    datalist: [],//用来保存从缓存中获取到的portcontact
    showdel: true, //是否显示删除按钮


    hideimg: true,
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    tempFilePaths: '',
    scanmode : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  portinput: function (e) {
    var that = this
    var tempdatalist = wx.getStorageSync("portcontact")
    var obj = null
    that.setData({
      ifsameportcode: false
    })
    console.log(e.detail.value.toUpperCase())
    console.log(tempdatalist)
    for (var i = 0; i < tempdatalist.length; i++) {
      if (tempdatalist[i].portcode.toUpperCase().indexOf(e.detail.value.toUpperCase()) > -1) {
        console.log("存在相同的护照号码")
        that.setData({
          ifsameportcode: true
        })
        return
      } else {
        that.setData({
          ifsameportcode: false
        })
      }
    }
    if (tempdatalist.length == 0) {
      that.setData({
        ifsameportcode: false
      })
    }

  },


  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: "申请人信息"
    })
    that.setData({
      page: options.uppage,
      mode: options.mode,
      paramportcode: options.portcode,
      datalist: wx.getStorageSync("portcontact")
    })

    if (that.data.mode == 1) {
      wx.setNavigationBarTitle({
        title: "新增申请人"
      })
      //提供默认值
      that.setData({
        showdel: false,
        portcode: that.data.paramportcode
      })

    }
    else if (that.data.mode == 2) {
      wx.setNavigationBarTitle({
        title: "编辑申请人"
      })
      //提供默认值
      that.setData({
        showdel: true,
        portcode: that.data.paramportcode
      })
    }


    console.log("获取本地申请人----")
    console.log(that.data.datalist);
    if (that.data.datalist == '' || that.data.datalist == null) {
      that.setData({
        datalist: [],
      })
    } else {
      //定位编辑的申请人
      for (var i = 0; i < that.data.datalist.length; i++) {
        if (that.data.datalist[i].portcode == that.data.portcode) {
          that.setData({
            list: [{
              porttype: that.data.datalist[i].porttype,
              portcode: that.data.datalist[i].portcode,
              countrycode: that.data.datalist[i].countrycode,
              country: that.data.datalist[i].country,
              firstname: that.data.datalist[i].firstname,
              lastname: that.data.datalist[i].lastname,
              sex: that.data.datalist[i].sex,
              birthday: that.data.datalist[i].birthday,
              birthplace: that.data.datalist[i].birthplace,
              issuancedate: that.data.datalist[i].issuancedate,
              issuanceplace: that.data.datalist[i].issuanceplace,
              issuanceauthority: that.data.datalist[i].issuanceauthority,
              limitdate: that.data.datalist[i].limitdate
            }]
          })
        }
      }
    }
    // var j = that.data.datalist.length
    // for (var i = 0; i < j; i++) {
    //   // console.log("that.data.datalist[i].portcode" + that.data.datalist[i].portcode)
    //   // console.log("that.data.paramportcode" + that.data.paramportcode)
    //   if (that.data.datalist[i].portcode == that.data.paramportcode) {
    //     console.log("找到匹配的护照")
    //     console.log(that.data.datalist[i])
    //     var templist = that.data.datalist[i];
    //     that.setData({
    //       list: [templist]
    //     })
    //     return
    //   } else {
    //     that.setData({
    //       list: [],
    //     })
    //   }
    // }
    console.log('当前页面list，判断是否处于修改状态')
    console.log(that.data.list)
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

  /**
   * 护照图片识别
   */

  ocr: function () {
    var that = this
    var url = gshare.g_requesturl +"/linshi/" + that.data.tempfilename
    console.log("url----------")
    console.log(url)

wx.request({
  url: gshare.g_requesturl +'/ocr',
  method:'POST',
  success: function (res) {
    console.log("ocrkey成功")
    console.log(res.data)
    var ocrkey = res.data.ocrkey
    wx.request({
      method: "POST",
      url: 'https://recognition.image.myqcloud.com/ocr/handwriting',

      header: {
        'content-type': 'application/json',
        'Authorization': ocrkey   },
      data: {
        "appid": "1255823769",
        "url": url
      },


      success: function (res) {
        console.log("成功")
        console.log(res.data)
        that.setData({
          ocrlist: res.data,
          scanmode: true
        })
        var tempocr = []

        for (var i = 0; i < res.data.data.items.length; i++) {
          tempocr.push({ itemstring: res.data.data.items[i].itemstring })
        }
        // console.log(JSON.stringify(tempocr))

        // wx.navigateTo({
        //   url: './imgocr?obj=' + JSON.stringify(tempocr).replace(/&/g, '')
        // })

        //根据护照照片中最后两行内容识别
        var temp1 = tempocr[tempocr.length-1].itemstring
        var temp2 = tempocr[tempocr.length - 2].itemstring
        var temp3 = temp2.substring(temp2.indexOf('<') + 2, temp2.length - temp2.indexOf('<') - 2)

        console.log("temp1"+temp1)
        console.log("temp2" + temp2)
        console.log("temp3" + temp3)
        var port_type=temp2.substring(0,1)
        var port_countrycode=temp2.substring(2,5)
        var port_firstname = temp2.substring(5, 9)

        var port_lastname = temp3.substring(0, temp3.indexOf('<'))

        var port_code = temp1.substring(0,9)
        var port_birthdate = temp1.substring(13,19)
        port_birthdate = port_birthdate.substring(0, 2) + '-' + port_birthdate.substring(2, 4) + '-' + port_birthdate.substring(4, 6)
        var port_sex = temp1.substring(20, 21)=='F'?'女':'男'
        var port_limit = temp1.substring(21,27)
        port_limit = port_limit.substring(0, 2) + '-' + port_limit.substring(2, 4) + '-' + port_limit.substring(4, 6)
        that.setData({
          lable1: true,
          lable2: true,
          lable3: true,
          lable4: true,
          lable5: true,
          lable6: true,
          lable7: true,
          lable8: true,
          lable9: true,
          lable10: true,

          list : [{           
            porttype: port_type,
            portcode: port_code,
            countrycode: port_countrycode,
            country: '',
            firstname: port_firstname,
            lastname: port_lastname,
            birthday: port_birthdate,
            birthplace: '',
            issuancedate:'',
            issuanceplace:'',
            issuanceauthority:'',
            sex: port_sex,
            limitdate: port_limit
          }]
        })
        console.log(port_type)
        console.log(port_countrycode)
        console.log(port_firstname)
        console.log(port_lastname)
        console.log(port_code)
        console.log(port_birthdate)
        console.log(port_sex)
        console.log(port_limit)

      },
      fail: function (res) {
        // fail
        console.log("失败")
        console.log(res)
      },
      complete: function () {
        // complete

      }
    })
  },
})

    
    // wx.request({
    //   method: "GET",
    //   url: 'https://mp.itownet.cn:8090/ocr?ocrkey=1',
    //   success: function (res) {
    //     console.log("orc成功")
    //     console.log(res.data.ocrkey)
       
    //   },
    //   fail: function (res) {
    //     // fail
    //     console.log("失败")
    //     console.log(res)
    //   },
    //   complete: function () {
    //     // complete

    //   }
    // })


  },
  scanimg: function () {

    var _this = this;

    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        console.log(res)

        var tempFilePaths = res.tempFilePaths
        var tempfilename = null

        console.log(" res.tempFilePaths")
        console.log(res.tempFilePaths)

        if (tempFilePaths[0].indexOf("http://") > -1) {
           tempfilename = tempFilePaths[0].substr(11, tempFilePaths[0].length - 10)

        } else if (tempFilePaths[0].indexOf("wxfile://") > -1) {
           tempfilename = tempFilePaths[0].substr(9, tempFilePaths[0].length - 8)
        }
        _this.setData({
          tempFilePaths: res.tempFilePaths,
          tempfilename: tempfilename
        })
     
        console.log("tempfilename-------")
        console.log(tempfilename)




        wx.uploadFile({
          url: gshare.g_requesturl +'/upload', //仅为示例，非真实的接口地址  
          filePath: tempFilePaths[0],
          name: 'upfile',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            //do something  

            console.log("上传成功" + tempfilename)
            _this.ocr()
            // wx.request({
            //   method: "GET",
            //   url: gshare.g_requesturl +'/linshi/' + tempfilename,
            //   headers: {

            //   },
            //   success: function (res) {
            //     result = res.data
            //     console.log("获取照片成功")
            //     _this.ocr()
            //   },
            //   fail: function () {
            //     // fail
            //     console.log("获取照片失败")
            //   },
            //   complete: function () {
            //     // complete
            //     console.log("获取照片完成")
            //   }
            // })


          },
          fail: function (res) {
            console.log("上传失败")
            console.log(res)
          },
          complete: function (res) {
            console.log("上传结束")
          }
        })


      }
    })
  },
  pickport: function (e) {

    console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({
      portindex: e.detail.value,
      lable1: false
    })
  },
  pickcountry: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      countryindex: e.detail.value,
      lable2: false
    })
  },
  pickprovicy: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      provicyindex: e.detail.value,
      lable6: false
    })
  },
  pickvisaprovicy: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      visaprovicyindex: e.detail.value,
      lable8: false
    })
  },
  pickcountry1: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      countryindex1: e.detail.value,
      lable3: false
    })
  },

  picksex: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sexindex: e.detail.value,
      lable4: false
    })
  },
  bindDateChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      lable5: false
    })
  },

  bindvisaDateChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      visadate: e.detail.value,
      lable7: false
    })
  },
  bindlimitDateChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      limitdate: e.detail.value,
      lable10: false
    })
  },
  pickvisaplace: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      visaplaceindex: e.detail.value,
      lable9: false
    })
  },
  returnpage: function () {
    var that = this;
    var page = that.data.page;
    if (page == "choose") {
      wx.redirectTo({
        url: './user',
      })
    }
    if (page == "info") {
      wx.navigateBack();
    }
  },
  deleteperson: function (e) {
    try {
      var that = this
      console.log("开始删除申请人")
      console.log(that.data.datalist.length)
      // 调用接口删除常用信息
      gshare.getbuffer("info", function (userinfo) {
        var phonenumber = userinfo.phonenumber;
        var portcode = e.detail.value.portcode;
        var del = 0;
        var j = that.data.datalist.length
        for (var i = 0; i < j; i++) {

          if (that.data.datalist[i].portcode == portcode) {
            console.log("准备删除申请人:" + that.data.datalist[i].portcode + " 索引：" + i)
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

        gshare.setbuffer("portcontact", that.data.datalist);


        //       wx.request({
        //         method: "POST",
        //         url: 'https://decl.top:8090/deletecontact',
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


  deluser: function (e) {
    var that = this;

    var listdata = { portcode: e.currentTarget.dataset.select }
    console.log(listdata)
    console.log("portcode-----------" + e.currentTarget.dataset.select)
    console.log(that.data.datalist)
    gshare.deldata(that.data.datalist, listdata, "portcontact")

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
      //判断护照号码是否为空
      if (e.detail.value.portcode == '' || e.detail.value.portcode==null) {
        wx.showModal({
          title: '提示',
          content: '护照号码不能为空',
          showCancel: false,
        })
        return
      }

//判断护照号码是否重复
      if (that.data.ifsameportcode==true){
        wx.showModal({
          title: '提示',
          content: '护照号码重复，请核对修改',
          showCancel: false,
        })
        return
      }



      gshare.getbuffer("info", function (userinfo) {
        phonenumber = userinfo.phonenumber;

        if (that.data.list.length == 0) {
          console.log("准备新增一个申请人")
          listdata = {

            porttype: e.detail.value.porttype,
            portcode: e.detail.value.portcode,
            countrycode: e.detail.value.countrycode,
            country: e.detail.value.country,
            fullname: e.detail.value.firstname + " " + e.detail.value.lastname,
            sex: e.detail.value.sex,
            birthday: e.detail.value.birthday,
            birthplace: e.detail.value.birthplace,
            issuancedate: e.detail.value.issuancedate,
            issuanceplace: e.detail.value.issuanceplace,
            issuanceauthority: e.detail.value.issuanceauthority,
            limitdate: e.detail.value.limitdate,
            phonenumber: phonenumber,
            firstname: e.detail.value.firstname,
            lastname: e.detail.value.lastname
          }
        } else {
          console.log("准备修改一个申请人")

//如果扫描证件模式，生成单独的listdata
          if (that.data.scanmode==true) {
            listdata = {

              porttype: (e.detail.value.porttype == null || e.detail.value.porttype == "") ? that.data.list[0].porttype : e.detail.value.porttype,
              portcode: e.detail.value.portcode,
              countrycode: (e.detail.value.countrycode == null || e.detail.value.countrycode == "") ? that.data.list[0].countrycode : e.detail.value.countrycode,
              country: (e.detail.value.country == null || e.detail.value.country == "") ? that.data.list[0].country : e.detail.value.country,
              fullname: e.detail.value.firstname + " " + e.detail.value.lastname,
              sex: (e.detail.value.sex == null || e.detail.value.sex == "") ? that.data.list[0].sex : e.detail.value.sex,
              birthday: (e.detail.value.birthday == null || e.detail.value.birthday == "") ? that.data.list[0].birthday : e.detail.value.birthday,
              birthplace: (e.detail.value.birthplace == null || e.detail.value.birthplace == "") ? that.data.list[0].birthplace : e.detail.value.birthplace,
              issuancedate: (e.detail.value.issuancedate == null || e.detail.value.issuancedate == "") ? that.data.list[0].issuancedate : e.detail.value.issuancedate,
              issuanceplace: (e.detail.value.issuanceplace == null || e.detail.value.issuanceplace == "") ? that.data.list[0].issuanceplace : e.detail.value.issuanceplace,
              issuanceauthority: (e.detail.value.issuanceauthority == null || e.detail.value.issuanceauthority == "") ? that.data.list[0].issuanceauthority : e.detail.value.issuanceauthority,
              limitdate: (e.detail.value.limitdate == null || e.detail.value.limitdate == "") ? that.data.list[0].limitdate : e.detail.value.limitdate,
              phonenumber: phonenumber,
              firstname: e.detail.value.firstname,
              lastname: e.detail.value.lastname
            }
          } else {
          listdata = {

            porttype: (e.detail.value.porttype == null || e.detail.value.porttype == "") ? that.data.datalist[0].porttype : e.detail.value.porttype,
            portcode: e.detail.value.portcode,
            countrycode: (e.detail.value.countrycode == null || e.detail.value.countrycode == "") ? that.data.datalist[0].countrycode : e.detail.value.countrycode,
            country: (e.detail.value.country == null || e.detail.value.country == "") ? that.data.datalist[0].country : e.detail.value.country,
            fullname: e.detail.value.firstname + " " + e.detail.value.lastname,
            sex: (e.detail.value.sex == null || e.detail.value.sex == "") ? that.data.datalist[0].sex : e.detail.value.sex,
            birthday: (e.detail.value.birthday == null || e.detail.value.birthday == "") ? that.data.datalist[0].birthday : e.detail.value.birthday,
            birthplace: (e.detail.value.birthplace == null || e.detail.value.birthplace == "") ? that.data.datalist[0].birthplace : e.detail.value.birthplace,
            issuancedate: (e.detail.value.issuancedate == null || e.detail.value.issuancedate == "") ? that.data.datalist[0].issuancedate : e.detail.value.issuancedate,
            issuanceplace: (e.detail.value.issuanceplace == null || e.detail.value.issuanceplace == "") ? that.data.datalist[0].issuanceplace : e.detail.value.issuanceplace,
            issuanceauthority: (e.detail.value.issuanceauthority == null || e.detail.value.issuanceauthority == "") ? that.data.datalist[0].issuanceauthority : e.detail.value.issuanceauthority,
            limitdate: (e.detail.value.limitdate == null || e.detail.value.limitdate == "") ? that.data.datalist[0].limitdate : e.detail.value.limitdate,
            phonenumber: phonenumber,
            firstname: e.detail.value.firstname,
            lastname: e.detail.value.lastname
          }
          }
        }
        console.log("that.data.list")
        console.log(that.data.list)
        console.log(listdata)
        if (that.data.list.length == 0) {
          list = that.data.datalist.push(listdata);
          console.log("that.data.datalist")
          console.log(that.data.datalist)
        } else {
          //先删除，后插入

          var j = that.data.datalist.length
if(j==0) {
  if (that.data.scanmode == true)
  {
    console.log("扫描保存一个申请人")
    that.data.datalist.push(listdata);

    gshare.setbuffer("portcontact", that.data.datalist);
    wx.showToast({
      title: "信息保存成功",
      icon: 'success',
      duration: 2000
    })
    that.returnpage();
   return
  }
}

var scanmodex = 0//标识datalist中是否有扫描的护照编号
          for (var i = 0; i < j; i++) {
            console.log("that.data.datalist[i].portcode" + that.data.datalist[i].portcode)
            console.log("that.data.list[0].portcode" + listdata.portcode)
            if (that.data.datalist[i].portcode == listdata.portcode) {
              console.log("准备删除申请人:" + that.data.datalist[i].portcode + " 索引：" + i)
              list = that.data.datalist.splice(i, 1, listdata);
             // list = that.data.datalist.push(listdata);
              gshare.setbuffer("portcontact", that.data.datalist);
              wx.showToast({
                title: "信息保存成功",
                icon: 'success',
                duration: 2000
              })
              that.returnpage();
              return
            } else
            {
              scanmodex++
            }
          }
          if (scanmodex!=0){
            console.log("扫描保存一个申请人")
            that.data.datalist.push(listdata);
            gshare.setbuffer("portcontact", that.data.datalist);
            wx.showToast({
              title: "信息保存成功",
              icon: 'success',
              duration: 2000
            })
            that.returnpage();
          } 
        }

        gshare.setbuffer("portcontact", that.data.datalist);
        wx.showToast({
          title: "信息保存成功",
          icon: 'success',
          duration: 2000
        })
        that.returnpage();
 
      });
    } catch (e) {
      wx.showToast({
        title: '系统异常',
        icon: 'fail',
        duration: 2000
      })
      console.log(e);
    }
  }
})