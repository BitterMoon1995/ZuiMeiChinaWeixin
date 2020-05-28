//index.js
import {
	request
} from "../../request/index.js"
//获取应用实例
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
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
		/* 发送异步请求获取轮播图数据 */
		// wx.request({
		// 	url:'https://api-hmugo-web.itheima.net/api/public/v1/home/sliderdata',
		// 	success:(result)=>{
		// 		this.setData({
		// 			sliderList:result.data.message
		// 		})
		// 	}
		// })
		this.getSwiperList()
		this.getCatesList()
		this.getSceneList()
		this.getRouteList()
		this.getActivityList()
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
			url: "http://localhost:2020/mini/scene-image/getSticky"
		})
		.then(result => {
			console.log(result)
			this.setData({
				sceneList: result
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
