// package/my/collect/collect.js
import {request} from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  async del(e) {
    let id = e.currentTarget.dataset.id
    let goodsId = e.currentTarget.dataset.goodsid
    let token = wx.getStorageSync('token');

    let { data } = await request('/shop/goods/fav/delete', "POST", { id, goodsId, token })
    wx.showToast({
      title: '删除成功',
      icon: 'none',
      duration: 1500, 
    });
    this.getList()
  },
  async getList() {
    let token = wx.getStorageSync('token');
    let { data: res } = await request('/shop/goods/fav/list',"POST",{token})
    this.setData({
      list:res.data||[]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   this.getList()
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