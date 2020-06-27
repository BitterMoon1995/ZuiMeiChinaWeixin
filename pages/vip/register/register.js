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
        console.log(e.detail.value)
        this.data.vipCard.gender = e.detail.value
    },
    // 上传图片
    chooseImg: function (e) {
        let that = this;
        let imgs = this.data.imgs;
        if (imgs.length >= 9) {
            this.setData({
                lenMore: 1
            });
            setTimeout(function () {
                that.setData({
                    lenMore: 0
                });
            }, 2500);
            return false;
        }
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                let tempFilePaths = res.tempFilePaths;
                that.setData({hide: true})
                let imgs = that.data.imgs

                wx.uploadFile({
                    url: 'http://localhost:2020/upload', //仅为示例，非真实的接口地址
                    filePath: tempFilePaths[0],
                    name: 'file',
                    success(res) {
                        that.data.vipCard.photoSrc = res.data
                    }
                })

                // console.log(tempFilePaths + '----');
                for (let i = 0; i < tempFilePaths.length; i++) {
                    if (imgs.length >= 9) {
                        that.setData({
                            imgs: imgs
                        });
                        return false;
                    } else {
                        imgs.push(tempFilePaths[i]);
                    }
                }
                // console.log(imgs);
                that.setData({
                    imgs: imgs
                });
            }
        });
    },
    // 删除图片
    deleteImg: function (e) {
        let imgs = this.data.imgs;
        let index = e.currentTarget.dataset.index;
        imgs.splice(index, 1);
        this.setData({
            imgs: imgs,
            hide: false
        });
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
        let vipCard = this.data.vipCard
        // for (let key in vipCard) {
        //     if (vipCard[key].length===0) {
        //         wx.showModal({
        //             title: '提示',
        //             content: '您录入的信息不完整',
        //             showCancel: false,
        //             success (res) {
        //
        //             }
        //         })
        //         return
        //     }
        // }
        request({
            url: 'http://localhost:2020/vip/vip-card/save',
            data: {
                'openid': vipCard.openid,
                'phone': vipCard.phone,
                'realName': vipCard.realName,
                'idNum': vipCard.idNum,
                'address': vipCard.address,
                // 'photoSrc': vipCard.photoSrc,
                'photoSrc': 'https://gd3.alicdn.com/imgextra/i2/801955496/O1CN01C9Pp6h1qTDNVlYjsf_!!801955496.jpg_400x400.jpg',
                'gender': vipCard.gender
            },
            method: 'POST'
        })
        .then(res=>{
            wx.showModal({
                title: '提示',
                content: '感谢您成为卓行的尊贵用户！',
                showCancel: false,
                success (res) {
                    wx.redirectTo({
                        url: '/pages/vip/vipcenter/vipcenter'
                    })
                }
            })
        })
    },

    clearFont() {
        this.setData({
            placeholder: ''
        })
    },


    onLoad(query) {
        let openid = app.globalData.openid
        console.log(openid)
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
