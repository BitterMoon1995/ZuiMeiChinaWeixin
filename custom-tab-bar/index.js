Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
				"pagePath": "pages/index/index",
				"text": "首页"
			},
			{
				"pagePath": "pages/category/category",
				"text": "官网"
			},
			{
				"pagePath": "pages/my/my",
				"text": "打卡"
			},
			{
				"pagePath": "pages/cart/cart",
				"text": "优购"
			},
			{
				"pagePath": "pages/cart/cart",
				"text": "我的"
			}
		]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})