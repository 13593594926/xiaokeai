const app = getApp()
import {
  request
} from '../../utils/request'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arr: Array,
    activeKey: Number,
    list: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    obj: {},
    properties: [],
    sku: [],
    value: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    // 加入购物车
    addShop(e) {
      let id = e.currentTarget.dataset.id
      app.addShop(id, 1)
      app.number()
    },
    // 监听切换事件
    aaa(e) {
      this.triggerEvent("dian", e.currentTarget.dataset.id)
    },
    //详情
    shopDetail(e) {
      wx.navigateTo({
        url: `../../package/index/shopDetail/shopDetail?id=${e.currentTarget.dataset.id} `
      })
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
    onChange(e) {
      this.data.value = e.detail
    },
    sku(e) {
      let i = e.currentTarget.dataset.i
      let id = e.currentTarget.dataset.id
      if (this.data.sku[i].optionValueId != id) {
        this.data.sku[i].optionValueId = id
      } else {
        this.data.sku[i].optionValueId = 0
      }
      this.setData({sku: this.data.sku})
    },
    getSku(sku) {
      if (sku) {
        this.setData({
          sku: []
        })
        sku.forEach((item, index) => {
          this.data.sku.push({
            'optionId': item.id,
            'optionValueId': 0
          })
        })
        this.setData({
          sku: this.data.sku
        })
      }
    },
    async add(e) {
      let {
        data: res
      } = await request('/shop/goods/detail', 'GET', {
        id: e.currentTarget.dataset.id
      })
      // sku
      this.getSku(res.data.properties)
      this.setData({
        show: true,
        obj: res.data,
        properties: res.data.properties || [],
      })
    },
    async addSkuShop() {
      let flag = this.data.sku.every(item =>
        item.optionValueId != 0
      )
      if (!flag) {
        wx.showToast({
          title: '请选择规格',
          icon: 'none',
          duration: 1500,
        });
        return false
      }

      let id = this.data.obj.basicInfo.id
      app.addShop(id, this.data.value, this.data.sku)
      let {
        data: res
      } = await request('/shop/goods/detail', 'GET', {
        id
      })
      app.number()

      // sku
      this.getSku(res.data.properties)
      this.setData({
        obj: res.data,
        properties: res.data.properties || [],
        value: 1,
        show: false
      })
    }
  }
})