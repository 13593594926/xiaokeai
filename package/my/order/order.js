// pages/orderList/orderList.js
import {
  request
} from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    code: "",
    tab: [{
        title: "全部",
      },
      {
        title: "待付款",
        code: 0
      },
      {
        title: "待发货",
        code: 1
      },
      {
        title: "待收货",
        code: 2
      },
      {
        title: "待评价",
        code: 3
      }


    ],
    list: [],
    goodsMap: {}
  },

// 删除订单
  async del(e) {
    let orderId = e.currentTarget.dataset.id
    let token = wx.getStorageSync('token')
    let { data } = await request('/order/delete', "POST", { orderId, token })
    this.getList()
      wx.showToast({
        title: '已取消订单',
        icon: 'none',
        duration: 1500,
      });
  },
  // 切换tab

  change(e) {

    this.setData({
      active: e.currentTarget.id,
      code: e.currentTarget.id - 1
    })

    this.getList()

  },

  // 获取订单列表
  async getList() {
    let status = this.data.code
    let token = wx.getStorageSync('token')
    if (status != -1) {
      let {data} = await request("/order/list", "POST", {status,token})
      if (data.code == 0) {
        this.setData({
          list: data.data.orderList,
          goodsMap: data.data.goodsMap
        })
      } else {
        this.setData({
          list: []
        })
      }
    } else {
      let {data} = await request("/order/list", "POST", {token})
      if (data.code == 0) {
        this.setData({
          list: data.data.orderList,
          goodsMap: data.data.goodsMap
        })
      } else {
        this.setData({
          list: []
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      active: options.code*1 + 1,
      code: options.code
    })
    this.getList()
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