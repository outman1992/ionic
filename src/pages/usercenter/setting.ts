import { Component } from '@angular/core';

import { NavController, ViewController } from 'ionic-angular';

@Component({
	selector: 'page-setting',
	templateUrl: 'setting.html'
})
export class SettingPage {

	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController
	) {

	}

	logout() {
		localStorage.removeItem('token');
		this.viewCtrl.dismiss();
	}

	goback() {
		this.viewCtrl.dismiss();
	}
}