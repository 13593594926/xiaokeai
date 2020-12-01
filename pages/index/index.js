//index.js
//获取应用实例
const app = getApp()
import {
  request
} from '../../utils/request'
Page({
  data: {
    banner: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    value: '', // 搜索
    arr: [], //九宫格
    list: [], // 商品列表
    time: 30 * 60 * 60 * 1000,
    arr1: [],
    miao: [], // 秒杀
    tui: [], // 推荐
    kan: [], // 砍价
    pingtuan: [], // 拼团
    pageSize: 6,
    isShow: false,
  },
  // 搜索
  search(event) {
    wx.navigateTo({
      url: `../../package/index/search/search?detail=${event.detail} `
    })
  },
  // 商品详情
  shopDetail(e) {
    wx.navigateTo({
      url: `../../package/index/shopDetail/shopDetail?id=${e.currentTarget.dataset.id} `
    })
  },
  // 分类
  jump(e) {
    wx.setStorageSync('classifyId', e.currentTarget.dataset.id);
    wx.switchTab({
      url: '../classify/classify'
    })
  },
  // 公告详情
  notice() {
    //保留当前页面，跳转到应用内的某个页面
    wx.navigateTo({
      url: '../../package/index/notice/notice',
    });
  },
  // 获取数据
  async get() {
    let {
      data: r
    } = await request('/shop/goods/list', 'POST', {
      miaosha: true
    })
    let {
      data: e
    } = await request('/shop/goods/list', 'POST', {
      recommendStatus: 1
    })
    let {
      data: s
    } = await request('/shop/goods/list', 'POST', {
      kanjia: true
    })
    let {
      data: pingtuan
    } = await request('/shop/goods/list', 'POST', {
      pingtuan: true
    })
    this.setData({
      miao: r.data || [], // 秒杀
      tui: e.data || [], // 推荐
      kan: s.data || [], // 砍价
      pingtuan: pingtuan.data || [], // 拼团
    })
  },
  onLoad: async function () {
    let {
      data: res
    } = await request('/banner/list')
    let {
      data: r
    } = await request('/shop/goods/category/all')
    let {
      data: e
    } = await request('/shop/goods/list', 'POST', {
      pageSize: this.data.pageSize
    })
    this.get()
    this.setData({
      banner: res.data,
      arr: r.data,
      list: e.data,
    })
  },
  // 上拉加载
  async onReachBottom() {
    let {
      data: e
    } = await request('/shop/goods/list', 'POST')
    if (this.data.list.length < e.data.length) {
      let {
        data: res
      } = await request('/shop/goods/list', 'POST', {
        pageSize: this.data.pageSize += 4
      })
      this.setData({
        list: res.data
      })
    } else {
      this.setData({
        isShow: true
      })
      wx.showToast({
        title: '到底了',
        icon: 'none',
        duration: 1000
      })
    }

  }
})