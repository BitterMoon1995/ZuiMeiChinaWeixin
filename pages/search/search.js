import {
    request
} from "../../request/index.js"
const app = getApp()
// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        condition: '',
        type: 0,
        resultList: [],

        hadResults: false,
        clear: true, //搜索框无内容
        noResults: false,
        cleanIcon: false, //清除搜索内容小图标

        recentList:[],
        hotList:[]
    },

    handleInput(e) {
        let content = e.detail.value
        this.setData({
            condition: content
        })
        //不是空串，删除图标就要出现
        if (content !== '') {
            this.setData({
                cleanIcon: true
            })
        }
        //是就隐藏
        else {
            this.clear()
        }
    },

    clear() {
        this.getRecent()
        this.setData({
            condition: '',
            cleanIcon: false,
            clear: true,
            hadResults: false,
            noResults: false
        })
    },

    search(e) {
        let content = e.currentTarget.dataset.content
        //快捷搜索
        if (content !== undefined) {
            this.find(content)
            return
        }
        //搜索框搜索
        let condition = this.data.condition
        if (!condition.trim()) return
        this.find(condition)
    },

    find(content) {
        let openid = wx.getStorageSync("openid")
        request({
            url: 'http://localhost:2020/mini/search/overall',
            //搜索字段为快捷框内容
            data: {
                condition: content,
                openid: openid
            }
        })
        .then(result => {
            console.log(content)
            console.log(result.data)
            //根据搜索结果判断页面状态。无搜索结果，则页面显示 无结果态
            if (result.data.length === 0) {
                this.setData({
                    hadResults: false,
                    clear: false,
                    noResults: true
                })
            } else {//否则展示搜索结果
                this.setData({
                    cleanIcon: true,
                    hadResults: true,
                    clear: false,
                    resultList: result.data,
                })
            }
        })
    },

    getRecent() {
        let page = this
        let openid = wx.getStorageSync("openid")
        request({
            url: 'http://localhost:2020/mini/search/getRecent',
            data: {
                openid:openid
            }
        })
        .then(res=>{
            page.setData({
                recentList:res.data
            })
        })
    },
    getHot() {
        let page = this
        request({
            url: 'http://localhost:2020/mini/search/getHot',
        })
            .then(res=>{
                page.setData({
                    hotList:res.data
                })
            })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getRecent()
        this.getHot()
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
        //getTabBar：返回当前页面的custom-tab-bar的组件实例
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 0
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
