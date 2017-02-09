import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-search',
    templateUrl: 'search.html'
})
export class SearchPage {

    constructor(
        public navCtrl: NavController,
        public params: NavParams,
        public http: Http
    ) {
        
    }

    goback() {
        this.navCtrl.pop();
    }


}