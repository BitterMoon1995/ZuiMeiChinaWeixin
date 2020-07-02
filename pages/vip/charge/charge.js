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

        isOK: true,
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
            this.data.promoCode = pmCode
            let openid = this.getOpenid()
            console.log(openid)
            this.timer = setInterval(function () {
                that.verifyCode(openid, pmCode)
            }, 2000)
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
            console.log(res.data)
            if (res.data!==200){

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
