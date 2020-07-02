import {
    request
} from "../../../request/index"

let app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        vipCard: {
            openid: '',
            phone: '',
            realName: '',
            idNum: '',
            address: '',
            photoSrc: '',
            gender: 8
        },
        photoSrc: '',
        imgs: [],
        hide: false,
    },
    phone(e) {
        this.data.vipCard.phone = e.detail.value
    },
    realName(e) {
        this.data.vipCard.realName = e.detail.value
    },
    idNum(e) {
        this.data.vipCard.idNum = e.detail.value
    },
    address(e) {
        this.data.vipCard.address = e.detail.value
    },
    gender(e) {
        this.data.vipCard.gender = e.detail.value
    },
    chooseImg(e) {
        let that = this
        wx.chooseImage({
            count: 1,
            success: res => {
                let temp = res.tempFilePaths[0]
                that.setData({photoSrc: temp, show: true})
            }
        })
    },
    deleteImg() {
        this.setData({photoSrc: '', show: false})
    },
    // 预览图片
    previewImg: function (e) {
        //获取当前图片的下标
        let index = e.currentTarget.dataset.index;
        //所有图片
        let imgs = this.data.imgs;
        wx.previewImage({
            //当前显示图片
            current: imgs[index],
            //所有图片
            urls: imgs
        })
    },

    upload() {
        let that = this
        //校验非空
        this.data.vipCard.openid = this.getOpenid()
        let vipCard = this.data.vipCard
        vipCard.photoSrc = this.data.photoSrc
        for (let key in vipCard) {
            if (vipCard[key] === '' || vipCard.gender===8) {
                wx.showModal({
                    title: '提示',
                    content: '您录入的信息不完整',
                    showCancel: false,
                    success(res) {
                    }
                })
                return
            }
        }
        //上传图片
        wx.uploadFile({
            url: 'http://localhost:2020/upload',
            filePath: that.data.photoSrc,
            name: 'file',
            complete(res) {
                that.data.vipCard.photoSrc = res.data
                //上传信息
                request({
                    url: 'http://localhost:2020/vip/vip-card/save',
                    data: {
                        'openid': vipCard.openid,
                        'phone': vipCard.phone,
                        'realName': vipCard.realName,
                        'idNum': vipCard.idNum,
                        'address': vipCard.address,
                        'photoSrc': vipCard.photoSrc,
                        'gender': vipCard.gender
                    },
                    method: 'POST'
                })
                //提示
                .then(res => {
                    if (res.data) {
                        wx.showModal({
                            title: '提示',
                            content: '感谢您成为卓行的尊贵用户！',
                            showCancel: false,
                            success(res) {
                                wx.redirectTo({
                                    url: '/pages/vip/vipcenter/vipcenter'
                                })
                            }
                        })
                    } else {
                        wx.showToast({
                            title: '服务器开小差啦',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })
            }

        })

    },

    getOpenid() {
        let that = this
        wx.getStorage(
            {
                key: 'openid',
                success: result => {
                    that.data.vipCard.openid = result.data
                }
            }
        )
        return this.data.openid
    },

    clearFont() {
        this.setData({
            placeholder: ''
        })
    },


    onLoad(query) {
        let openid = app.globalData.openid
        this.data.vipCard.openid = openid
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
