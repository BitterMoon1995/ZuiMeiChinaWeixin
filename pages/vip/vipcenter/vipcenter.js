import {
    request
} from "../../../request/index"

let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: true,
        openid: '',
        remainingDays: 0,
        expirationTime: null,
        isVIP: false,
        isNotVIP: false,
        isNotActive: false,
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

    getOpenid() {
        let that = this
        wx.getStorage(
            {
                key: 'openid',
                success: result => {
                    that.setData({openid: result.data})
                }
            }
        )
        return this.data.openid
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this

        wx.getStorage({
                key: 'openid',
                success: result => {
                    let openid = result.data
                    that.setData({openid: openid})

                    request({
                        url: 'http://localhost:2020/vip/vip-card/getVipInfo',
                        // data: {openid: 'openid'}
                        data: {openid: openid}
                    })
                    .then(res => {
                        if (res.data==='') {
                            that.setData({isNotVIP: true})
                            return
                        }

                        let expirationTime = res.data.expirationTime.slice(0,10)
                        that.getRemainingTime(expirationTime)
                        if (that.data.remainingDays<=0) {
                            that.setData({
                                isNotActive: true,
                                remainingDays: 0,
                                expirationTime: '已过期'
                            })
                        }

                        that.setData({isVIP:true})
                    })
                }
            })
    },

    getRemainingTime(expirationTime) {
        let expTime = new Date(expirationTime)
        let expTimeTS = expTime.getTime()//毫秒，一天有86400000毫秒

        let currentTime = new Date()
        let currentTimeTS=currentTime.getTime()

        let remainingDays = (expTimeTS - currentTimeTS) / 86400000
        let result = remainingDays.toFixed(0)

        this.setData({
            expirationTime:expirationTime,
            remainingDays:result
        })
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
