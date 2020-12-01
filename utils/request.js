let request = function (url, method = "GET", data = {}) {
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: "https://api.it120.cc/xiaokeai" + url,
            data: data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            method,
            success: (res) => {
                console.log(res.data)
                if (res.data.code == 2000) {
                    wx.showModal({
                        title: '提示',
                        content: '请先登录',
                        success (res) {
                          if (res.confirm) {
                              wx.switchTab({
                                  url: '/pages/my/my',
                              });
                          } else if (res.cancel) {
                              wx.showToast({
                                  title: '已取消',
                                  icon: 'none', 
                                  duration: 1500, 
                              });
                          }
                        }
                      })
                }
                resolve(res)
            },
            fail: (res) => {
                reject(res)
            },
            complete: () => {
                wx.hideLoading();
            }
        });
    })
}
module.exports = {
    request
}