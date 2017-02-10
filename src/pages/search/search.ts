import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, NavParams, Searchbar } from 'ionic-angular';

@Component({
    selector: 'page-search',
    templateUrl: 'search.html'
})
export class SearchPage {

    @ViewChild('searchbar') searchbar: Searchbar;

    constructor(
        public navCtrl: NavController,
        public params: NavParams,
        public http: Http
    ) {
        
    }

    goback() {
        this.navCtrl.pop();
    }

    ionViewDidEnter() {
        // debugger
        this.searchbar.setFocus()
        // this.searchbar.ionCancel(function(){
            
        // })
    }

}