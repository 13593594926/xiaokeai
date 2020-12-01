// pages/seachList/seachList.js
let {
  request
} = require('../../../utils/request')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    list: [],
    value: '',
    xiao: false, // 销量
    jia: false, // 价格
  },
  // 加入购物车
  addShop(e) {
    let id = e.currentTarget.dataset.id
    app.addShop(id, 1)
  },
  // 商品详情
  goDetail() {
    wx.navigateTo({
      url: `../../package/index/shopDetail/shopDetail?id=${e.currentTarget.dataset.id} `
    })
  },
  // 排序
  async sort(type) {
    let {
      data: res
    } = await request('/shop/goods/list', "POST", {
      k: this.data.value,
      orderBy: type
    })
    this.setData({
      list: res.data
    })
  },
  // 综合
  sortZ() {
    this.sort('addedUp')
  },
  // 新品
  sortX() {
    this.sort('nameUp')
  },
  // 销量
  sortL() {
    if (this.data.xiao) {
      // 降序
      this.sort('ordersDown')
    } else {
      // 升序
      this.sort('ordersUp')
    }
    this.data.xiao = !this.data.xiao
  },
  // 价格
  sortJ() {
    if (this.data.jia) {
      // 降序
      this.sort('priceDown')
    } else {
      // 升序
      this.sort('priceUp')
    }
    this.data.jia = !this.data.jia

  },
  // 切换样式
  qiehuan() {
    this.data.isShow = !this.data.isShow
    this.setData({
      isShow: this.data.isShow
    })
    this.storg()
  },
  // 保存本地
  storg() {
    wx.setStorageSync('isShow', this.data.isShow)
  },
  // 搜索
  async seach(event) {
    this.data.value = event.detail
    let {
      data: res
    } = await request(`/shop/goods/list`, 'POST', {
      k: this.data.value
    })
    this.setData({
      list: res.data || [],
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 默认加载
    this.setData({
      value: options.detail
    })
    this.seach(options)
    this.getStorg()
  },
  // 读取本地
  getStorg() {
    let isSS = wx.getStorageSync('isShow')
    this.setData({
      isShow: isSS
    })
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

  }
})