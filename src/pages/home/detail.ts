import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, NavParams, LoadingController } from 'ionic-angular';

@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html'
})
export class DetailPage {

    id: any;
    goods: any;
    detail: null;
    loading: any;

    constructor(
        public navCtrl: NavController, 
        public params: NavParams,
        public http: Http,
        public loadCtrl: LoadingController
    ) {
        this.id = this.params.get('id');



        this.http.get('http://rap.taobao.org/mockjsdata/8438/api/goods/detail').subscribe(data=>{
            this.detail = data.json().result;
            // this.loading.dismiss();
            this.loading = this.loadCtrl.create({
                spinner: "dots",
                duration: data.json().result.image.length * 300
            })
            this.loading.present();
        })
        
        // var that = this;
        // this.goods.forEach(function(v, i) {
        //     if (that.id == v.id) {
        //         that.detail = v;
        //     }
        // })
    }

    goback() {
        this.navCtrl.pop();
    }


}