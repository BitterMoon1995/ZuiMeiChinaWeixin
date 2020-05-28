import {request} from "../../../request/index";

Page({
    data: {
        introList:[],
        richText:null
    },
    onLoad: function (options) {
        this.getIntroList()
        this.getRichText()
    },
    getIntroList(){
        request({
            url: "http://localhost:2020/mini/scene-image/getIntros",
            //每个页面对应一个景区对应一个景区ID
            data: {sceneId:"f93391ee04cac2bd92f40a4db3b84be6"}
        })
        .then(result => {
            this.setData({
                introList: result.data
            })
        })
    },
    getRichText(){
        request({
            url: "http://localhost:2020/mini/scene-image/getRichText",
            //每个页面对应一个景区对应一个景区ID
            data: {sceneId:"f93391ee04cac2bd92f40a4db3b84be6"}
        })
        .then(result => {
            this.setData({
                richText: result.data
            })
        })
    }
});
