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
        openid: ''
    },
    promoCode(e) {
        this.data.promoCode = e.detail.value
    },

    charge(e) {
        let openid = this.data.openid
        request({
            url: "http://localhost:2020/vip/vip-card/pay",
            data: {
                openid: openid
            },
            method: 'POST'
        })
        .then(res=>{
            let nigger = res.data
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
                    request({
                        url:"http://localhost:2020/vip/vip-card/charge",
                        data:{
                            'openid': openid,
                            'nonceStr': nonceStr
                        },
                        method: 'post',
                        header: {'content-type': 'application/x-www-form-urlencoded'}
                    })
                },
                fail(res) {
                }
            })
        })


    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        wx.getStorage(
            {
                key: 'openid',
                success: result => {
                    console.log(result)
                    that.setData({openid:result.data})
                }
            }
        )
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
