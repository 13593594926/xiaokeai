// pages/shopDetail/shopDetail.js
const app = getApp()
import {
  request
} from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    list: {},
    token: wx.getStorageSync('token'),
    properties: [],
    show: false,
    isShow: -1,
    value: 1,
    sku: [],
    num: ''
  },

  showPopup() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },
  add(e) {
    let i = e.currentTarget.dataset.i
    let id = e.currentTarget.dataset.id
    if (this.data.sku[i].optionValueId != id) {
      this.data.sku[i].optionValueId = id
    } else {
      this.data.sku[i].optionValueId = 0
    }
    this.setData({
      sku: this.data.sku
    })
  },
  onChange(e) {
    this.data.value = e.detail
  },
  // 购物车
  goShop() {
    wx.switchTab({
      url: '../../../pages/shopping/shopping'
    })
  },
  // 加入购物车
  addShop(e) {
    console.log(this.data.sku);
    let id = this.data.list.basicInfo.id
    if (this.data.sku) {

      let flag = this.data.sku.every(item => item.optionValueId != 0)
      if (!flag) {
        wx.showToast({
          title: '请选择规格',
          icon: 'none',
          duration: 1500,
        });
        return false
      }
      app.addShop(id, this.data.value, this.data.sku)
    } else {

      app.addShop(id, this.data.value, )
    }
    app.number()
    console.log(app.globalData.num);
    this.data.sku = []
    this.data.properties.forEach((item, index) => {
      this.data.sku.push({
        'optionId': item.id,
        'optionValueId': 0
      })
    })
    this.setData({
      value: 1,
      show: false,
      sku: this.data.sku,
      num: app.globalData.num || ''
    })
  },
  // 收藏
  async favAdd() {
    let id = this.data.list.basicInfo.id
    let {
      data
    } = await request('/shop/goods/fav/add', "POST", {
      goodsId: id,
      token: this.data.token
    })
    this.getList(id)
  },
  // 取消收藏
  async favDel() {
    let id = this.data.list.basicInfo.id
    let {
      data
    } = await request('/shop/goods/fav/delete', "POST", {
      goodsId: id,
      token: this.data.token
    })
    this.getList(id)
  },
  async getList(id) {
    let {
      data: res
    } = await request('/shop/goods/detail', 'GET', {
      id: id
    })
    // sku
    if (res.data.properties) {
      res.data.properties.forEach((item, index) => {
        this.data.sku.push({
          'optionId': item.id,
          'optionValueId': 0
        })
      })
    }
    this.setData({
      list: res.data,
      properties: res.data.properties || [],
      sku: this.data.sku
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList(options.id)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    this.setData({
      num: app.globalData.num || ''
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