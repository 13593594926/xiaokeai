// pages/classify/classify.js
const app =  getApp();

import {
  request
} from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    arr: [],
    list: [],
  },
  search(event) {
    wx.navigateTo({
      url: `../../package/index/search/search?detail=${event.detail} `
    })
  },
  // 监听切换事件
  onChange(e) {
    wx.showLoading({
      title: '加载中',
    })

    this.data.activeKey = e.detail
    wx.setStorageSync('classifyId', this.data.activeKey);
    this.get(this.data.activeKey)
    this.setData({
      activeKey: this.data.activeKey
    })
    wx.hideLoading();
  },
  // 获取分类数据
  async get(id) {
    let {
      data: res
    } = await request('/shop/goods/list', "POST", {
      categoryId: id
    })
    this.setData({
      list: res.data
    })
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
    let {
      data: res
    } = await request('/shop/goods/category/all')
    this.data.activeKey = wx.getStorageSync('classifyId') || res.data[0].id;
    this.get(this.data.activeKey)
    this.setData({
      arr: res.data,
      activeKey: this.data.activeKey,
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