import {
    request,server
} from "../../../request/index"

let app = getApp()
let r = 1

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showScenes: true,
        sceneList: [],

        condition: '',
        resultList: [],

        //用户是否在上滑？
        isScrollUp: false,

        getFocus: false
    },

    getShowList() {
        request({
            url: server+'/mini/scene/showList'
        })
            .then(result => {
                this.setData({
                    sceneList: result.data
                })
            })
    },

    handleInput(e) {
        if (e.detail.value !== '')
            this.setData({
                showScenes: false,
                condition: e.detail.value
            })
        else
            this.setData({
                showScenes: true
            })
    },

    search() {
        if (!this.data.condition.trim()) return
        request({
            url: server+'/mini/search/overall',
            data: {
                condition: this.data.condition
            }
        })
            .then(result => {
                this.setData({
                    resultList: result.data
                })
            })
    },

    return() {
        app.return(getCurrentPages())
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getShowList()
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
        this.setData({
            getFocus: true
        })
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
    /*
    社会主义建设之：列表页静止没有tabbar，但是用户上滑时会出现★★

    监听用户滑动，得到【滚动条相对于页面顶部的偏移量，单位为px】
    再用一个全局变量暂存，不能是方法变量！
    当本次偏移量大于上次的偏移量，说明用户在下滑，滑了！！！
     */
    onPageScroll: function(e) {
        let that = this
        if (e.scrollTop > r) {
            that.setData({
                isScrollUp : true
            })
        }
        else {
            that.setData({
                isScrollUp : false
            })
        }
        //蒸馏啊！！！！！！！！！！！！！！！！！！！！！！
        r = e.scrollTop

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
