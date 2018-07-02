var url = "http://www.imooc.com/course/ajaxlist";
var page = 0;
var page_size = 5;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;
var city = require("../data/city")
var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var result = null;
// 获取数据的方法，具体怎么获取列表数据大家自行发挥
var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url: url,
    data: {
      page: page,
      page_size: page_size,
      sort: sort,
      is_easy: is_easy,
      lange_id: lange_id,
      pos_id: pos_id,
      unlearn: unlearn
    },
    success: function (res) {
      //console.info(that.data.list);
      var list = that.data.list;
      for (var i = 0; i < res.data.list.length; i++) {
        list.push(res.data.list[i]);
      }
      that.setData({
        list: list
      });
      page++;
      that.setData({
        hidden: true
      });
    }
  });
}
Page({
  data: {
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    tempFilePaths: ''
  },
  ocr: function () {
    var that = this
    var url = "http://mp.itownet.cn/linshi/" + that.data.tempfilename
    //var url = "http://mp.itownet.cn/linshi/P1EQyYp9zk1xhC3Q7fc3JDhA.jpg"
    console.log("url----------")
    console.log(url)
    wx.request({
      method: "POST",
      url: 'http://recognition.image.myqcloud.com/ocr/handwriting',

      header: {
        'content-type': 'application/json',
        // 'Authorization': '0WvMVGqgylQLBR7SH7G260KBmRlhPTEyNTU4MjM3Njkmaz1BS0lEM3pqSWhJN0NBMmpFZHZEeXRoTXYyNVh1c2hMcnNrOVImZT0xNTI4ODc2NTAxJnQ9MTUyODc5MDEwMSZyPTIwNDg4MzUwMTAmdT0wJmY9'
        'Authorization': '++KEmFivPOoIfDXOgR3hZEfYlU5hPTEyNTU4MjM3Njkmaz1BS0lEM3pqSWhJN0NBMmpFZHZEeXRoTXYyNVh1c2hMcnNrOVImZT0xNTI5MTEyNDM3JnQ9MTUyOTAyNjAzNyZyPTEzMDIwODUyMDUmdT0wJmY9'
      },
      data: {
        "appid": "1255823769",
        "url": url
      },


      success: function (res) {
        console.log("成功")
        console.log(res)
        that.setData({
          ocrlist: res.data
        })
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
  chooseimage: function () {
    var _this = this;

    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        if (tempFilePaths[0].indexOf("http://") > -1) {
          var tempfilename = tempFilePaths[0].substr(11, tempFilePaths[0].length - 10)

        } else if (tempFilePaths[0].indexOf("wxfile://") > -1) {
          var tempfilename = tempFilePaths[0].substr(9, tempFilePaths[0].length - 8)
        }
        _this.setData({
          tempFilePaths: res.tempFilePaths,
          tempfilename: tempfilename
        })




        console.log(tempfilename)
        console.log(tempFilePaths)
        wx.uploadFile({
          url: 'http://mp.itownet.cn/upload', //仅为示例，非真实的接口地址  
          filePath: tempFilePaths[0],
          name: 'upfile',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            //do something  

            console.log("上传成功")
            wx.request({
              method: "GET",
              url: 'http://mp.itownet.cn/linshi/' + tempfilename,
              headers: {

              },
              success: function (res) {
                result = res.data
                console.log("获取照片成功")
                _this.ocr()
              },
              fail: function () {
                // fail
              },
              complete: function () {
                // complete
              }
            })


          },
          fail: function (res) {
            console.log("上传失败")
          },
          complete: function (res) {
            console.log("结束")
          }
        })


      }
    })
  },
  onLoad: function () {
    var that = this
    that.setData({
      list: list
    })
    console.log(list)
    //  这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  onShow: function () {
    //  在页面展示之后先获取一次数据
    var that = this;
    GetList(that);
  },
  bindDownLoad: function () {
    //  该方法绑定了页面滑动到底部的事件
    var that = this;
    GetList(that);
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
    GetList(this)
  }
})