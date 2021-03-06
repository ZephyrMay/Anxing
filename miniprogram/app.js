//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'anxing-917314',
      traceUser: true
    })
    // const db = wx.cloud.database({
    //   env: 'anxing-917314'
    // })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var _this=this;
    // 登录
    wx.login({
      success: res => {
        // console.log(res);
        _this.globalData.code = res.code;
        // console.log("code: " + _this.globalData.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // wx.request({
    //   url: 'https://api.weixin.qq.com/sns/jscode2session',
    //   data: {
    //     appid: 'wx9ed0a37e28b8bed8',
    //     secret: 'a9f020cc3c24e12758106932654c2842',
    //     grant_type: 'authorization_code'
    //   },
    //   success: function (res) {
    //     _this.globalData.openid = res.data.openid;
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    location:{
      province: '',
      city: '',
      latitude: '',
      longitude: ''
    },
    speed:-2,
    recorderManager:null,
    openid: "",
    access_token: "",
    code: 0
  }
})