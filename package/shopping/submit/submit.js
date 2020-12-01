// package/shopping/submit/submit.js
import {
  request
} from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
      score:""
  },

  // 提交订单
  async onSubmit() {

    // 获取今天的时间
    let date = new Date().toLocaleDateString()

    let reg = new RegExp('/', 'g')

    let nowTime = date.replace(reg, '-')

    // 获取明天的时间
    var days = new Date();
    days.setTime(days.getTime() + 60 * 1000);
    let day2 = days.toLocaleDateString()

    let newTime = day2.replace(reg, '-')
    console.log(nowTime, newTime)
    // 添加参数数组
    let goodsJsonStr = []
    console.log(this.data.list)
    this.data.list.items.forEach((res) => {

      goodsJsonStr.push({
        "goodsId": res.goodsId,
        "number": res.number,
        "propertyChildIds": "",
        "logisticsType": 0,
      }, )


    })
    goodsJsonStr = JSON.stringify(goodsJsonStr)
    let token = wx.getStorageSync('token')

    let {
      data
    } = await request('/order/create','POST',{
      goodsJsonStr,
      token
    })

    console.log(data)

    wx.showToast({
      title: '支付失败',
      icon: "none"
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
    let token = wx.getStorageSync('token');
    let {
      data: res
    } = await request('/shopping-cart/info', "GET", {
      token: token
    })
    console.log(res);
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