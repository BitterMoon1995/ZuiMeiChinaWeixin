import {request,server} from "../../../request/index";
import {scrollHandle} from "../../../utils/scrollHandle"

Page({
    data: {
        introList:[],
        richText:null,

        name: '',
        location: '',
        price: '',
        level: '',
        longitude: '',//经度
        latitude: '',//纬度

        isScrollUp:false
    },
    onLoad: function (options) {
        console.log(options.id)
        this.getPage()
    },
    getPage(){
        request({
            url: server+"/mini/scene/getById",
            //每个页面对应一个景区对应一个景区ID
            data: {Id:"24e099fd9999fa6797b5537572fb1a0b"}
        })
            .then(result => {
                let Glenn = result.data
                console.log(Glenn)
                this.setData({
                    introList: Glenn.introImgs,
                    richText: Glenn.richText,
                   name: Glenn.name,
                    location: Glenn.location,
                    price: Glenn.price,
                    longitude: Glenn.longitude,//经度
                    latitude: Glenn.latitude,
                    level: Glenn.level
                })
            })
    },

    routePlaning(){
        const latitude = this.data.latitude
        const longitude = this.data.longitude
        const name = this.data.name

        let key = 'HVYBZ-TENKD-M3A4H-HH4MY-JCPZO-JEF5I';  //使用在腾讯位置服务申请的key
        let referer = 'MY橙旅游';   //调用插件的app的名称
        let endPoint = JSON.stringify({  //终点
            'name': name,
            'latitude': latitude,
            'longitude': longitude
        });
        wx.navigateTo({
            url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
        });
    },

    onPageScroll: function(e) {
        scrollHandle(e,this)
    },
});
