// pages/vip/charge/charge.js
import {request,server} from "../../../request/index"

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

        //推荐码校验
        isOK: false,

        //推荐码输入框控制
        noCharged: true,

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
    verifyCode() {
        let openid = wx.getStorageSync('openid')
        let that = this
        request({
            url: server+"/vip/vip-card/verifyPmCode",
            data:{
                'openid': openid,
                'pmCode': this.data.promoCode,
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
                    icon: 'none',
                    duration: 2000
                })
            }
            else if (code===416){
                wx.showToast({
                    title: '非会员用户',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },

    charge(e) {
        let that = this
        let openid = wx.getStorageSync("openid")+''
        request({
            url: server+"/vip/vip-card/pay",
            data: {
                'openid': openid
            },
            method: 'post',
            header: {'content-type': 'application/x-www-form-urlencoded'}
        })
        .then(res=>{
            console.log(res)
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
                    console.log(res)
                    let promoCode = that.data.promoCode
                    request({
                        url: server+"/vip/vip-card/charge",
                        data:{
                            'openid': openid,
                            'nonceStr': nonceStr,
                            'promoCode': promoCode
                        },
                        method: 'post',
                        header: {'content-type': 'application/x-www-form-urlencoded'}
                    })
                    .then(res=>{
                        if (res.data.status.code == 200) {
                            wx.switchTab({
                                url: '/pages/vip/vipcenter/vipcenter',
                                success: res1 => {
                                    let page = getCurrentPages().pop();
                                    if (page === undefined || page == null) return;
                                    page.onLoad();
                                }
                            })
                        }
                        else {

                        }
                    })
                },
                fail(res) {
                }
            })
        })
    },

    getOpenid() {
        const id = wx.getStorageSync("openid");
        this.setData({
            openid: id
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let vipSta = wx.getStorageSync("vipStatus")
        if (vipSta == 1){
            this.setData({noCharged:true})
        }
        else this.setData({noCharged:false})
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
