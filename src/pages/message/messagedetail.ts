import { Component } from '@angular/core';

import { NavController, ViewController } from 'ionic-angular';

@Component({
	selector: 'page-messagedetail',
	templateUrl: 'messagedetail.html'
})
export class MessageDetailPage {

	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController
	) {

	}
	goback() {
		this.viewCtrl.dismiss();
	}
}
