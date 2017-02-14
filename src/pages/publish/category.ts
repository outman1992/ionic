import { Component } from '@angular/core';

import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-category',
    templateUrl: 'category.html'
})
export class PublishCategoryPage {
    category: any;

    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
        public params: NavParams,
    ) {
        // debugger
        this.category = this.params.get('category');
    }

    goback() {
        // debugger
        this.viewCtrl.dismiss({type: 0});
    }

    select(event) { 
        this.viewCtrl.dismiss({ type: 1, cid: this.category, cdata: event.currentTarget.getAttribute('data') });
    }
}