import {
    request,server
} from "../../../request/index"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    address: '',
    photoSrc: '',
    openid: '',

    show: false
  },
  phone(e) {
    this.data.phone = e.detail.value
  },
  address(e) {
    this.data.address = e.detail.value
  },
  chooseImg(e) {
    let that = this
    wx.chooseImage({
      count: 1,
      success:res => {
        let temp = res.tempFilePaths[0]
        that.setData({photoSrc:temp,show:true})
      }
    })
  },
  deleteImg() {
    this.setData({photoSrc:'',show:false})
  },
  edit() {

  },
  submit() {
    let that = this
    wx.uploadFile({
      url: server+'/upload',
      filePath: that.data.photoSrc,
      name: 'file',
      complete(res) {
        that.setData({photoSrc:res.data})
        request({
          url:"https://www.freetour.top:721/vip/vip-card/edit",
          data:{
            'openid': that.data.openid,
            'phone': that.data.phone,
            'address': that.data.address,
            'photoSrc': that.data.photoSrc,
          },
          method: 'post',
          header: {'content-type': 'application/x-www-form-urlencoded'}
        })
        .then(res=>{
          if (res.data === 200) {
            wx.showModal({
              title: '提示',
              content: '修改成功！',
              showCancel: false,
              success (res) {
                wx.redirectTo({
                  url: '/pages/vip/vipcenter/vipcenter'
                })
              }
            })
          }
          else if (res.data === 401) {
            wx.showModal({
              title: '提示',
              content: '抱歉，一天之内最多修改一次',
              showCancel: false,
              success (res) {
                wx.switchTab({
                  url: '/pages/vip/vipcenter/vipcenter',
                  success: res1 => {
                    let page = getCurrentPages().pop();
                    if (page === undefined || page == null) return;
                    page.onLoad();
                  }
                })
              }
            })
          }
        })
      }
    })
  },

  getOpenid() {
    let that = this
    wx.getStorage(
        {
          key: 'openid',
          success: result => {
            that.setData({openid: result.data})
          }
        }
    )
    return this.data.openid
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenid()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
