import {
    request
} from "../../../request/index"
let app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showScenes: true,
        sceneList: [],

        condition:'',
        resultList: []
    },

    getShowList() {
        request({
            url: 'http://localhost:2020/mini/scene/showList'
        })
        .then(result => {
            console.log(result)
            this.setData({
                sceneList: result.data
            })
        })
    },

    handleInput(e) {
        if (e.detail.value!=='')
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
            url: 'http://localhost:2020/mini/search/overall',
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

    return(){
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
