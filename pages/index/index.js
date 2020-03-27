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
		swiperList: [],
		catesList:[],
		floorList:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		/* 发送异步请求获取轮播图数据 */
		// wx.request({
		// 	url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
		// 	success:(result)=>{
		// 		this.setData({
		// 			swiperList:result.data.message
		// 		})
		// 	}
		// })
		this.getSwiperList()
		this.getCatesList()
		this.getFloorList()
	},
	getSwiperList() {
		request({
			url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
		})
		.then(result => {
			this.setData({
				swiperList: result.data.message
			})
		})
	},
	getCatesList() {
		request({
			url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"
		})
		.then(result => {
			this.setData({
				catesList: result.data.message
			})
		})
	},
	getFloorList() {
		request({
			url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"
		})
		.then(result => {
			this.setData({
				floorList: result.data.message
			})
		})
	}

})
