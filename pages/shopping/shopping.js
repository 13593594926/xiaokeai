// pages/shopping/shopping.js
import {
  request
} from '../../utils/request'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    value: ''
  },
  onSubmit() {
    wx.navigateTo({
      url: '../../package/shopping/submit/submit',
    });
  },
  // 删除
  async del(e) {
    let token = wx.getStorageSync('token')
    let {
      data: res
    } = await request('/shopping-cart/remove', "POST", {
      key: e.currentTarget.dataset.id,
      token: token
    })
    app.number()

    this.setData({
      list: res.data || []
    })
  },
  // 数量
  async update(key, number) {
    let token = wx.getStorageSync('token')
    let {
      data: res
    } = await request('/shopping-cart/modifyNumber', "POST", {
      key: key,
      number: number,
      token: token
    })
    this.setData({
      list: res.data
    })
  },
  //  数量改变
  change(e) {
    this.setData({
      value: e.detail
    })
  },
  // 数量加减
  plus(e) {
    let key = e.currentTarget.dataset.id
    this.update(key, this.data.value)
    wx.showToast({
      title: '修改成功',
      icon: 'none',
      duration: 1500,
    });
    app.number()

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    app.number()

    let token = wx.getStorageSync('token');
    let {
      data: res
    } = await request('/shopping-cart/info', "GET", {
      token: token
    })
    this.setData({
      list: res.data || []
    })
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

  }
})