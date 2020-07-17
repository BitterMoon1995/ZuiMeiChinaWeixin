import {request} from "../../../request/index.js";

Page({
    data: {
        introList:[],
        richText:null,

        name: '',
        location: '',
        price: '',
        longitude: '',//经度
        latitude: '',//纬度
    },
    onLoad: function (options) {
        console.log(options.id)
        this.getPage()
    },
    getPage(){
        request({
            url: "http://localhost:2020/mini/scene/getById",
            //每个页面对应一个景区对应一个景区ID
            data: {Id:"62fee1c0efe40974de662f490257c3fc"}
        })
            .then(result => {
                let Glenn = result.data
                this.setData({
                    introList: Glenn.introImgs,
                    richText: Glenn.richText,
                    name: Glenn.name,
                    location: Glenn.location,
                    price: Glenn.price,
                    longitude: Glenn.longitude,//经度
                    latitude: Glenn.latitude
                })
            })
    },

    zhiNa(){
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
    }
});
