//app.js
import {request,server} from "./request/index";
import {calDays} from "./utils/util"

App({
    onLaunch: function () {
        let that = this
        // 展示本地存储能力
        let logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 获取用户openID
        wx.login({
            success(res) {
                //已经有了就表发请求了！
                // let openid = wx.getStorageSync("openid");
                // if (openid!=null){
                //     return
                // }
                if (res.code) {
                    //发起网络请求
                    wx.request({
                        url: server+'/vip/vip-card/login',
                        data: {
                            code: res.code
                        },
                        success(res) {
                            wx.setStorage({
                                key: "openid", data: res.data.openid
                            })
                            wx.setStorage({
                                key: "vipStatus", data: res.data.vipStatus
                            })
                            wx.setStorage({
                                key: "promoCode", data: res.data.promoCode
                            })
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
        // 获取用户信息。先查看是否授权
        wx.getSetting({
            success (res){
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        //设置获取的省市区为简体中文
                        lang:"zh_CN",
                        success: function(res) {
                            // console.log(res.rawData)
                        }
                    })
                }
            }
            //若未授权，只能通过按钮绑定openType的方式授权
        })
        //获取当前手机状态栏的高度
        wx.getSystemInfo({
            success(res){
                that.globalData.statusBarHeight = res.statusBarHeight
            }
        })
    },

    getOpenid: function () {
        //直接同步GET啊，异步傻逼得要死
        return  wx.getStorageSync("openid");
    },
    //接收调用者的引用(调用的那个页面)作为参数
    /*再写这种屎代码写一次721死一个妈*/
    getVipInfo(invoker) {
        wx.getStorage({
            key: 'openid',
            success: result => {
                let openid = result.data
                console.log(openid)
                invoker.setData({openid: openid})

                request({
                    url: server+'/vip/vip-card/getVipInfo',
                    // data: {openid: 'openid'}
                    data: {openid: openid}
                })
                .then(res => {
                    let expTime = res.data.expirationTime
                    let vipStatus = res.data.vipStatus
                    //  未注册。
                    if (res.data==='') {
                        invoker.setData({isNotUser: true})
                        wx.setStorage({
                            key:'vipStatus',data:0
                        })
                        return
                    }
                    //  已注册，会员中心隐藏notRegister！一定要考虑else！！(if else都玩不明白是吧)
                    else {
                        //保存充值状态信息
                        wx.setStorage({
                            key:'vipStatus',data:vipStatus
                        })
                        invoker.setData({
                            isNotUser: false,
                            promoCode: res.data.promoCode
                        })
                    }
                    //  未充值过
                    if (vipStatus == 1) {
                        invoker.setData({
                            remainingDays: 0,
                            expirationTime: '未充值',
                            isUser: true,
                            isExpired: true
                        })
                        return
                    }
                    //  充值过但过期了
                    if (vipStatus == 2) {
                        invoker.setData({
                            remainingDays: 0,
                            expirationTime: '已过期',
                            isUser: true,
                            isExpired: true
                        })
                        return;
                    }
                    expTime = expTime.substring(0,10)
                    let remainingDays = calDays(new Date(expTime))
                    //  充值过且未过期
                    invoker.setData({
                        isVIP: true,
                        isUser: true,
                        isExpired: false,
                        expirationTime: expTime,
                        remainingDays: remainingDays
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
    //垃圾，一律用storage，用这个要遭
    globalData: {
        vipStatus: 99,
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
