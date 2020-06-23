// pages/vip/charge/charge.js
import {
    request
} from "../../../request/index"

let app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        promoCode: ''
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


        // let time = new Date().getTime();
        // let randomS = this.randomString(32)
        // wx.requestPayment({
        //     timeStamp: time.toString(),
        //     nonceStr: randomS,
        //     package: 'prepay_id=wx2017033010242291fcfe0db70013231072',
        //     signType: 'MD5',
        //     paySign: 'MD5(appId=wxd678efh567hg6787&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id=wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111) = 22D9B4E54AB1950F51E0649E8810ACD6\n',
        //     success(res) {
        //     },
        //     fail(res) {
        //     }
        // })
    },

    randomString(len) {
        len = len || 32;
        let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
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
