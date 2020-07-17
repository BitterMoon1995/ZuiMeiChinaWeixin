//index.js
import {
	request
} from "../../request/index.js"
let app = getApp()
//获取应用实例
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//是否是未过期的会员。条件是isUser为true且isExpired未false
		isVIP: false,

		sliderList: [],
		catesList:[],
		sceneList:[],
		routeList:[],
		activityList:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		app.getVipInfo(this)

		this.getSwiperList()
		// this.getCatesList()
		this.getSceneList()
		// this.getRouteList()
		// this.getActivityList()

	},
	getSwiperList() {
		request({
			url: "http://localhost:2020/mini/slider/list"
		})
		.then(result => {
			this.setData({
				sliderList: result
			})
		})
	},
	getCatesList() {
		request({
			url: "http://localhost:2020/mini/icon/getCategory"
		})
		.then(result => {
			this.setData({
				catesList: result
			})
		})
	},
	getSceneList() {
		request({
			url: "http://localhost:2020/mini/scene-image/getFloorList"
		})
		.then(result => {
			this.setData({
				sceneList: result.data
			})
		})
	},
	getRouteList() {
		request({
			url: "http://localhost:8080/mini/route-image/list"
		})
		.then(result => {
			this.setData({
				routeList: result
			})
		})
	},
	getActivityList() {
		request({
			url: "http://localhost:8080/mini/activity-image/list"
		})
		.then(result => {
			this.setData({
				activityList: result
			})
		})
	},
	/**
	 * 生命周期函数--监听页面显示
	 * onShow与onLoad的区别：
	 * onLoad页面加载时调用，可以获取参数，通过options。onShow页面显示时调用。
	 主要区别：
	 		从二级页面返回该页面时，onLoad不会再次加载，而onshow会重新加载。一个极小的细节，做好笔记嗯(卡了爷4天)
	 */
	onShow: function () {
		//getTabBar：返回当前页面的custom-tab-bar的组件实例
		if (typeof this.getTabBar === 'function' && this.getTabBar()) {
			console.log(this.getTabBar().data.selected)
			this.getTabBar().setData({
				selected: 1
			})
		}
	},

	toSearch() {
		wx.switchTab({url:'/pages/search/search'})
	}
})

