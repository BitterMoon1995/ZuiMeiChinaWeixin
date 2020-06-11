import {
    request
} from "../../request/index.js"
// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        condition: '',
        type: 8888,

        resultList: []
    },

    handleInput(e) {
        this.setData({
            condition: e.detail.value
        })
    },

    search() {
        let tag = this.data.type
        /*
        javaScript中两个等于号和三个等于号之间的区别：
        ==先转换类型再比较，===先判断类型，如果不是同一类型直接为false
         */
        if (tag == 0) {
            this.searchAll()
        }
    },

    searchAll() {
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            type:options.type
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
