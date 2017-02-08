import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    focus: any;
    category: any;
    current: string;
    goods: any;

    constructor(public navCtrl: NavController) {
        this.focus = [
            { img: 'http://www.taoertao.com/attachment/focus/1459485773jxjp.jpg' },
            { img: 'http://www.taoertao.com/attachment/focus/banner-ghm.png' },
            { img: 'http://www.taoertao.com/attachment/focus/1426832637hqebp.jpg' }
        ];
        this.category = {
            cateLineOne: [
                { icon: 'phone-portrait', cateName: '手机' },
                { icon: 'laptop', cateName: '电脑' },
                { icon: 'headset', cateName: '配件' },
                { icon: 'bulb', cateName: '电器' },
            ],
            cateLineTwo: [
                { icon: 'book', cateName: '书籍' },
                { icon: 'game-controller-a', cateName: '娱乐' },
                { icon: 'football', cateName: '运动' },
                { icon: 'bicycle', cateName: '代步' },
            ]
        };
        this.current = 'new';    //new: 最新，recommend: 推荐
        this.goods = [
            {
                id: 1,
                sellerName: '小万万',
                goodTitle: '我是一个商品',
                goodDes: '我是一个商品我是一个商品我是一个商品',
                goodImages: [
                    'https://img.alicdn.com/bao/uploaded/i1/TB1nN4APpXXXXaDXpXX2WCJ.VXX_160x160.jpg',
                    'https://img.alicdn.com/bao/uploaded/i4/TB1W36_OFXXXXXBXpXXN6rB9XXX_160x160.jpg',
                    'https://img.alicdn.com/bao/uploaded/i2/TB1JIScPpXXXXcOaXXXgX3I9FXX_160x160.jpg'
                ],
            },
            {
                id: 1,
                sellerName: '小万万',
                goodTitle: '我是一个商品',
                goodDes: '我是一个商品我是一个商品我是一个商品',
                goodImages: [
                    'https://img.alicdn.com/bao/uploaded/i1/TB1nN4APpXXXXaDXpXX2WCJ.VXX_160x160.jpg',
                    'https://img.alicdn.com/bao/uploaded/i4/TB1W36_OFXXXXXBXpXXN6rB9XXX_160x160.jpg',
                    'https://img.alicdn.com/bao/uploaded/i2/TB1JIScPpXXXXcOaXXXgX3I9FXX_160x160.jpg',
                    'https://img.alicdn.com/bao/uploaded/i2/TB1JIScPpXXXXcOaXXXgX3I9FXX_160x160.jpg'
                ],
            },
            {
                id: 1,
                sellerName: '小万万',
                goodTitle: '我是一个商品',
                goodDes: '我是一个商品我是一个商品我是一个商品',
                goodImages: [
                    'https://img.alicdn.com/bao/uploaded/i1/TB1nN4APpXXXXaDXpXX2WCJ.VXX_160x160.jpg',
                    'https://img.alicdn.com/bao/uploaded/i4/TB1W36_OFXXXXXBXpXXN6rB9XXX_160x160.jpg',
                ],
            }
        ]
    }

    pushCateList(cateName){
        console.log(cateName)
    }
}
