let r = 1

Component({
    properties: {},
    data: {
        isScrollUp: false
    },
    methods: {
        toTop() {
            wx.pageScrollTo({
                scrollTop: 0
            })
        }

    },
    onPageScroll: function(e) {
        console.log(e.scrollTop)
        let that = this
        if (e.scrollTop > r) {
            that.setData({
                isScrollUp : true
            })
        }
        else {
            that.setData({
                isScrollUp : false
            })
        }
        r = e.scrollTop
    },

});
