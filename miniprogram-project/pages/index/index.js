//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      nickName: '1874',
      avatarUrl: 'http://pic.sc.chinaz.com/files/pic/pic9/202007/bpic20762.jpg'
    },
    count: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  onLoad: function () {
    this.setData({ count: 0 })
  },

  add: function(e) {
    console.log(e)
    this.setData({ count: this.data.count + 1 })
  },

  reduce: function() {
    this.setData({ count: this.data.count - 1 })
  }
})
