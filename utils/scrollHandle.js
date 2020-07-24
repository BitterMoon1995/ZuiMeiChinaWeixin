let r = 0

export const scrollHandle = function(e,page) {
    if (e.scrollTop > r) {
        page.setData({
            isScrollUp : true
        })
    }
    else {
        page.setData({
            isScrollUp : false
        })
    }
    r = e.scrollTop
}
