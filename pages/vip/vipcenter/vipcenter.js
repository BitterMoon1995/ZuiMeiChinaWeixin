import {
    request,server
} from "../../../request/index"

let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid: '',

        //控制页面显示
        isNotUser: false,
        isUser: false,

        //数据展示
        remainingDays: 0,
        expirationTime: null,

        //是否是未过期的会员。条件是isUser为true且isExpired未false
        isExpired: false,
        isVIP: false,
        vipStatus: 99,
        promoCode: '',

        vipCard: {
            openid: '',
            phone: '',
            realName: '',
            idNum: '',
            address: '',
            photoSrc: '',
            gender: 8,
            expirationTime: ''
        }
    },

    /**
     * 生命周期函数--监听页面加载
     *
     * 会员制度：    未注册非用户——已注册未充值——已充值已过期——已充值未过期
     */
    onLoad: function (options) {
        app.getVipInfo(this)
        app.getRemainingTime(this.data.expirationTime,this)

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
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 2
            })
        }
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
