//app.js
import {request} from "./request/index";

App({
    onLaunch: function () {
        let that = this
        // 展示本地存储能力
        let logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success(res) {
                if (res.code) {
                    //发起网络请求
                    wx.request({
                        url: 'http://localhost:2020/vip/vip-card/login',
                        data: {
                            code: res.code
                        },
                        success(res) {
                            wx.setStorage({
                                key: "openid", data: res.data.openid
                            })
                            that.globalData.openid = res.data.openid
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
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
        //获取当前手机状态栏的高度
        wx.getSystemInfo({
            success(res){
                console.log(res)
                that.globalData.statusBarHeight = res.statusBarHeight
            }
        })
    },

    getOpenid: function () {
        //直接同步GET啊，异步傻逼得要死
        return  wx.getStorageSync("openid");
    },
    //接收调用者的引用(调用的那个页面)作为参数
    getVipInfo(invoker) {
        let me = this

        wx.getStorage({
            key: 'openid',
            success: result => {
                let openid = result.data
                invoker.setData({openid: openid})

                request({
                    url: 'http://localhost:2020/vip/vip-card/getVipInfo',
                    // data: {openid: 'openid'}
                    data: {openid: openid}
                })
                .then(res => {
                    let expTime = res.data.expirationTime
                    //  未注册
                    if (res.data === '') {
                        invoker.setData({isNotUser: true})
                        return
                    }
                    //  未充值过
                    if (expTime.toString().slice(0,4) === '1989') {
                        invoker.setData({
                            remainingDays: 0,
                            expirationTime: '未充值',
                            isUser: true,
                            isExpired: true
                        })
                        return
                    }
                    //  充值过但过期了
                    let expirationTime = expTime.slice(0, 10)
                    me.getRemainingTime(expirationTime,invoker)
                    if (invoker.data.remainingDays <= 0) {
                        invoker.setData({
                            remainingDays: 0,
                            expirationTime: '已过期',
                            isUser: true,
                            isExpired: true
                        })
                        return;
                    }
                    //  充值过且未过期
                    invoker.setData({
                        isVIP: true,
                        isUser: true,
                        isExpired: false
                    })
                })
            }
        })
    },

    getRemainingTime(expirationTime,invoker) {
        let expTime = new Date(expirationTime)
        let expTimeTS = expTime.getTime()//毫秒，一天有86400000毫秒

        let currentTime = new Date()
        let currentTimeTS = currentTime.getTime()

        let remainingDays = (expTimeTS - currentTimeTS) / 86400000
        let result = remainingDays.toFixed(0)

        invoker.setData({
            expirationTime: expirationTime,
            remainingDays: result
        })
    },
    globalData: {
        userInfo: null,
        openid: '',
        statusBarHeight: 0
    },

    //返回上一页，参数为当前页面
    return(pages) {
        let beforePage = pages[pages.length - 2]; //前一页
        wx.navigateBack({
            success: function () {
                beforePage.onLoad(); // 执行前一个页面的onLoad方法
            }
        });
    }
})
