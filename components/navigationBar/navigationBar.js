const app = getApp()

Component({

    properties: {

    },
    //在写样式距离和大小时建议都用px，因小程序右边的胶囊也是用的px，不是rpx。
    data: {
        statusBarHeight: app.globalData.statusBarHeight + 'px',
        navigationBarHeight: (app.globalData.statusBarHeight + 44) + 'px'
    },

    methods: {
        backHome: function () {
            let pages = getCurrentPages()
            wx.navigateBack({
                delta: pages.length
            })
        },
        back: function () {
            wx.navigateBack({
                delta: 1
            })
        }
    }
})
