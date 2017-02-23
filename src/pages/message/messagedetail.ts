import { Component } from '@angular/core';

import { NavController, ViewController } from 'ionic-angular';

@Component({
	selector: 'page-messagedetail',
	templateUrl: 'messagedetail.html'
})
export class MessageDetailPage {

	user: any;

	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController
	) {
		this.user = '123123'
	}
	goback() {
		this.viewCtrl.dismiss();
	}
}
