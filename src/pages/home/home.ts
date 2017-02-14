import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { App, ViewController, NavController, ModalController } from 'ionic-angular';
import { DetailPage } from './detail';
import { SearchPage } from '../search/search';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    focus: any;
    category: any;
    current: string;
    goods: any;
    page: any;
    dataOver: any;

    constructor(
        public navCtrl: NavController,
        public appCtrl: App,
        public viewCtrl: ViewController,
        public http: Http,
        public modalCtrl: ModalController,
    ) {
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

        //加载初始数据
        this.loadGoodList();

        this.page = 1;
        this.dataOver = false;
    }

    pushCateList(cateName) {
        // console.log(cateName)
    }

    pushDetail(id) {
        // this.viewCtrl.dismiss();
        this.appCtrl.getRootNav().push(DetailPage, { id: id });
        // this.navCtrl.push(DetailPage, { id: id });
    }

    doInfinite(infiniteScroll) {

        // debugger
        if (this.page <= 2) {
            this.page++
            
            setTimeout(() => {
                this.http.get('http://rap.taobao.org/mockjsdata/8438/api/index/goods').subscribe(data => {
                    // console.log(data.json().result.data);
                    // this.goods.concat(data.json().result.data);
                    // console.log(this.goods);
                    var that = this;
                    data.json().result.data.forEach(function(v){
                        that.goods.push(v)
                    })
                    // console.log(this.goods);
                    // console.log(typeof that.goods)
                    // console.log(data.json().result)
                    // console.log('Async operation has ended');
                    infiniteScroll.complete();
                });

                // console.log('Async operation has ended');
                // infiniteScroll.complete();
            }, 500);
        }else{
            this.dataOver = true;
            infiniteScroll.enable(false);
        }
    }

    loadList(type){
        if(type == 1){
            this.current = 'new';
            this.loadGoodList();
        } else if (type == 2) {
            this.current = 'recommend';
            this.loadGoodList();
        }
    }

    //加载数据方法
    loadGoodList(){
        this.http.get('http://rap.taobao.org/mockjsdata/8438/api/index/goods').subscribe(data => {
            this.goods = data.json().result.data;
            // console.log(typeof that.goods)
            // console.log(data.json().result)
            this.dataOver = false;
            this.page = 1;
        });
    }

    openSearchModal(){
        let searchModal = this.modalCtrl.create(SearchPage);
        searchModal.present();
    }
}
