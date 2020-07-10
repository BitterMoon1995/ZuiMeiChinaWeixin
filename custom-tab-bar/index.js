let app = getApp()
Component({
    data: {
        selected: 4,
        color: "#000000",
        selectedColor: "#3cc51f",
        list: [
            {
                "pagePath": "/pages/vip/vipcenter/vipcenter",//绝对路径！！！！！！！！！！！
                "text": "会员"
            },
            {
                "pagePath": "/pages/index/index",
                "text": "首页"
            },
            {
                // "pagePath": "pages/cart/cart",
                "text": "返回"
            },
        ]
    },
    attached() {
    },
    methods: {
        switchTab(e) {
            this.setData({
                selected: 99999
            })
            //可获取当前点击的tabbar的路径和下标
            const data = e.currentTarget.dataset
            const url = data.path
            console.log(data)
            //如果是第三个tabbar（指近平），则调用return方法返回上一页
            if (data.index === 2) {
                app.return(getCurrentPages())
            }
            //tabbar的跳转不能用navigate to，必须用switchTab，用url指定目标页面
            //且规定目标页面也必须是有tabbar的页面，否则不予跳转
            wx.switchTab({url})
            this.setData({
                selected: data.index
            })
            console.log(this.data.selected)
        }
    }
})
