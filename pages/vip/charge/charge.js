// pages/vip/charge/charge.js
import {request} from "../../../request/index"

let app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        promoCode: '',
        prepay_id: '',
        nigger: null,
        openid: '',

        timer: null,

        isOK: false,
        isWrong: false,

        iconSize: [20, 30, 40, 50, 60, 70],
        iconColor: [
            'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
        ],
        iconType: [
            'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
        ]
    },
    promoCode(e) {
        let that = this

        if (e.detail.value.length === 8) {
            let pmCode = e.detail.value

            this.setData({
                promoCode:pmCode
            })

            this.data.promoCode = pmCode
            let openid = this.getOpenid()
            console.log(openid)
            this.timer = setInterval(function () {
                that.verifyCode(openid, pmCode)
            }, 1000)
        }
        else {
            this.setData({
                isOK: false
            })
        }
    },
    verifyCode(openid,pmCode) {
        let that = this
        request({
            url:"http://localhost:2020/vip/vip-card/verifyPmCode",
            data:{
                'openid': openid,
                'pmCode': pmCode,
            },
            method: 'post',
            header: {'content-type': 'application/x-www-form-urlencoded'}
        })
        .then(res=>{
            clearTimeout(that.timer)
            let code = res.data
            console.log(code)
            if (code===200){
                that.setData({
                    isOK: true
                })
            }
            else if (code===400){
                wx.showToast({
                    title: '找不到该会员',
                    icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
                    duration: 2000
                })
            }
            //推荐自己
            else if (code===415){
                wx.showToast({
                    title: '无效推荐码',
                    icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
                    duration: 2000
                })
            }
            else if (code===416){
                wx.showToast({
                    title: '非会员用户',
                    icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
                    duration: 2000
                })
            }
        })
    },

    charge(e) {
        let that = this
        let openid = this.getOpenid()
        request({
            url: "http://localhost:2020/vip/vip-card/pay",
            data: {
                openid: openid
            },
            method: 'POST'
        })
        .then(res=>{
            let nonceStr = res.data.nonceStr

            let p = 'prepay_id='+res.data.packageZ
            this.setData({nigger:res.data})

            wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: nonceStr,
                package: p,
                signType: 'MD5',
                paySign: res.data.paySign,
                success(res) {
                    let promoCode = that.data.promoCode
                    request({
                        url:"http://localhost:2020/vip/vip-card/charge",
                        data:{
                            'openid': openid,
                            'nonceStr': nonceStr,
                            'promoCode': promoCode
                        },
                        method: 'post',
                        header: {'content-type': 'application/x-www-form-urlencoded'}
                    })
                    .then(res=>{
                        wx.redirectTo({
                            url: '/pages/vip/vipcenter/vipcenter'
                        })
                    })
                },
                fail(res) {
                }
            })
        })


    },

    getOpenid() {
        let that = this
        wx.getStorage(
            {
                key: 'openid',
                success: result => {
                    that.setData({openid:result.data})
                }
            }
        )
        return this.data.openid
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOpenid()
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
