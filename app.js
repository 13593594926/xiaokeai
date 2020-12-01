const {
  request
} = require("./utils/request")

//app.js
App({
  async addShop(goodsId, number = 1, sku = '') {
    let token = wx.getStorageSync('token')
    if (!token) {
      wx.showToast({
        title: '添加失败，请重新登录',
        icon: 'none',
        duration: 1500,
      });
      return false
    }
    if (sku == '') {

      let {
        data: res
      } = await request('/shopping-cart/add', "POST", {
        goodsId,
        number,
        token
      })
    } else {

      let {
        data: res
      } = await request('/shopping-cart/add', "POST", {
        goodsId,
        number,
        token,
        sku: JSON.stringify(sku)
      })
    }
    wx.showToast({
      title: '加入成功',
      duration: 1500,
    });
  },
  async number() {
    // Do something when show.
    let token = wx.getStorageSync('token');
    
      let {
        data: res
      } = await request('/shopping-cart/info', "GET", {
        token
      })
      if (res.data) {
        this.globalData.num = res.data.number || ''
      } else {
        this.globalData.num = ''
      }
      if (this.globalData.num == '') {
        wx.removeTabBarBadge({ //移除tabbar右上角的文本
          index: 2, //tabbar下标
        })
      } else {
        wx.setTabBarBadge({ //tabbar右上角添加文本
          index: 2, //  tabbar下标
          text: this.globalData.num + '' //显示的内容
        })
      };
  },
  onShow() {
    if (this.globalData.userInfo) {

      this.number()
    }
  },
  onLaunch: function () {


    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    let token = wx.getStorageSync('token')
    if (!token) {
      this.globalData.userInfo = null
      return false
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo

          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //   }
          // })
          console.log('没授权');
          wx.switchTab({
            url: '/pages/index/index',
          });
        } else {
          console.log('已授权');
          wx.navigateTo({
            url: "./package/shouquan/shouquan"
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    order: 0,
    num: '',
  }
})