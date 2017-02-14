import { Component } from '@angular/core';

import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-sellmethod',
    templateUrl: 'sellmethod.html'
})
export class SellMthodPage {
    sellmethod: any;

    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
        public params: NavParams,
    ) {
        this.sellmethod = this.params.get('method');
    }

    goback() {
        this.viewCtrl.dismiss(this.sellmethod);
    }
}