//index.js

const app = getApp()
import {
  request
} from "../../utils/request"
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    detail: {},
    user: {},
    list: {},
    uId: wx.getStorageSync('uId'),
    iv: '',
    encryptedData: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // 获取个人信息
  async getList() {
    // 个人信息
    let token = wx.getStorageSync('token');
    let {
      data: res
    } = await request("/user/detail", "GET", {
      token: token
    })
    this.setData({
      list: res.data
    })
  },
  // 跳转
  jumpAss() {
    wx.navigateTo({
      url: '../../package/my/asset/asset'
    })
  },
  jumpC() {
    wx.navigateTo({
      url: '../../package/my/integral/integral'
    })
  },
  jumpB() {
    wx.navigateTo({
      url: '../../package/my/grow/grow'
    })
  },
  jumpO() {
    wx.navigateTo({
      url: '../../package/my/order/order?code=-1'
    })
  },
  jumpO1() {
    wx.navigateTo({
      url: '../../package/my/order/order?code=0'
    })
  },
  jumpO2() {
    wx.navigateTo({
      url: '../../package/my/order/order?code=1'
    })
  },
  jumpO3() {
    wx.navigateTo({
      url: '../../package/my/order/order?code=2'
    })
  },
  jumpO4() {
    wx.navigateTo({
      url: '../../package/my/order/order?code=3'
    })
  },
  jumpO5() {
    wx.navigateTo({
      url: '../../package/my/order/order?code=10'
    })
  },
  // 收藏
  jumpCollect() {
    wx.navigateTo({
      url: '../../package/my/collect/collect'
    })
  },
  // 退出登录
  quit() {
    wx.showToast({
      title: '已退出登录',
      icon: 'none', 
      duration: 1500,
      mask: false,
      success: (result) => {
        app.globalData.userInfo = null
        wx.setStorageSync('token', '')
        wx.setStorageSync('uId', '')
        app.number()
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: false
        })
      }, 
    });
  },
  onLoad: function () {
    // this.setData({
    //   uId:wx.getStorageSync('uId')
    // })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          if (res.userInfo) {
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        }
      })
    }
  },
  getLogin() {
    wx.login({
      success: async (res) => {
        if (res.code) {
          // 登录
          let {
            data
          } = await request('/user/wxapp/login', "POST", {
            code: res.code
          })
          // data.code == 10000 没有注册
          if (data.code == 10000) {
            wx.login({
              success: async (r) => {
                // 注册
                let {
                  data: re
                } = await request('/user/wxapp/register/complex', "POST", {
                  code: r.code,
                  iv: this.data.iv,
                  encryptedData: this.data.encryptedData
                })
                this.getLogin()
              }
            })
          } else {
            wx.setStorageSync('token', data.data.token);
            wx.setStorageSync('uId', data.data.uid);
            this.getList()
            wx.showToast({
              title: '登录成功',
              icon: 'none', 
              duration: 1500,  
            });
            this.setData({
              hasUserInfo: true,
              user: data.data,
              uId: data.data.uid
            })
          }
        } else {
          console.log('登陆失败' + res.errMsg);
        }
      }
    })
  },
  getUserInfo: async function (e) {
    this.setData({
      iv: e.detail.iv,
      encryptedData: e.detail.encryptedData
    })
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.userInfo) {
      this.getLogin()
      this.setData({
        userInfo: e.detail.userInfo,
        detail: e.detail,
      })
    }
  }
})