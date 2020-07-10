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
		console.log(this.data.isVIP)

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
			console.log(result.data)
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
	}

})
