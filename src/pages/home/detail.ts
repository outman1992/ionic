import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html'
})
export class DetailPage {

    id: any;
    goods: any;
    detail: null;

    constructor(
        public navCtrl: NavController, 
        public params: NavParams,
        public http: Http
    ) {
        this.id = this.params.get('id');

        this.http.get('http://rap.taobao.org/mockjsdata/8438/api/goods/detail').subscribe(data=>{
            this.detail = data.json().result;
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