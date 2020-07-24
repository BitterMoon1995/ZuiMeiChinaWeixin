let app = getApp()
Component({
    data: {
        selected: 8848,
        color: "#000000",
        selectedColor: "#3cc51f",
        list: [
            {
                pagePath: "/pages/search/search",//绝对路径！！！！！！！！！！！
                text: "搜索",
            },
            {
                pagePath: "/pages/index/index",
                text: "首页",
            },
            {
                pagePath: "/pages/vip/vipcenter/vipcenter",//绝对路径！！！！！！！！！！！
                text: "会员卡",
            }
        ]
    },
    attached() {
    },
    methods: {
        switchTab(e) {
            //可获取当前点击的tabbar的路径和下标
            let data = e.currentTarget.dataset
            let index = data.index
            let url = data.path
            //如果是第三个tabbar（指近平），则调用return方法返回上一页
            if (index === 3) {
                app.return(getCurrentPages())
                return
            }
            //tabbar的跳转不能用navigate to，必须用switchTab，用url指定目标页面
            //且规定目标页面也必须是有tabbar的页面，否则不予跳转
            wx.switchTab({url})
            this.setData({
                selected: index
            })
        }
    }
})
