// pages/vip/charge/charge.js
import {request} from "../../../request/index"

let app = getApp()

const md5 = require('../../../utils/md5')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        promoCode: '',
        prepay_id: '',
        nigger: null
    },
    promoCode(e) {
        this.data.promoCode = e.detail.value
    },


    charge(e) {

        let openid = app.globalData.openid

        request({
            url: "http://localhost:2020/vip/vip-card/pay",
            data: {
                openid: openid
            },
            method: 'POST'
        })
        .then(res=>{
            let nigger = res.data
            console.log(nigger)

            let p = 'prepay_id='+res.data.packageZ
            console.log(p)
            this.setData({nigger:res.data})

            wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: p,
                signType: 'MD5',
                paySign: res.data.paySign,
                success(res) {
                    console.log(res)
                },
                fail(res) {
                }
            })
        })


    },

    randomString(len) {
        len = len || 32;
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz12345678';
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        let length = chars.length;
        let pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * length));
        }
        return pwd;
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
