//index.js
import {
	request,server
} from "../../request/index.js"
let app = getApp()
//获取应用实例
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//是未注册的用户，或已过期、从未充值过的会员 吗？
		invalidVIP: true,

		sliderList: [],
		sceneList:[],
		routeList:[],
		activityList:[],
		recruitUrl: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

		this.getSwiperList()
		this.getSceneList()
		this.vipRecruit()

	},
	getSwiperList() {
		request({
			url: server+"/mini/slider/list"
		})
		.then(result => {
			this.setData({
				sliderList: result
			})
		})
	},
	getSceneList() {
		request({
			url: server+"/mini/scene-image/getFloorList"
		})
		.then(result => {
			this.setData({
				sceneList: result.data
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
			this.getTabBar().setData({
				selected: 1
			})
		}
	},

	toSearch() {
		wx.switchTab({url:'/pages/search/search'})
	},

	//动态设置会员招募海报的跳转路径
	vipRecruit() {
		let code = wx.getStorageSync('vipStatus')
		console.log('code:'+code)
		if (code==0){
			this.setData({
				recruitUrl : '/pages/vip/register/register'
			})
		}
		if (code==1||code==2){
			this.setData({
				recruitUrl : '/pages/vip/charge/charge'
			})
		}
		if (code==6){
			this.setData({
				invalidVIP : false
			})
		}
	}
})

