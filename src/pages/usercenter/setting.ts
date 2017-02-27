import { Component } from '@angular/core';

import { NavController, ViewController } from 'ionic-angular';
import { AppConfig } from '../../app/app.config';

@Component({
	selector: 'page-setting',
	templateUrl: 'setting.html'
})
export class SettingPage {

	socket: any = AppConfig.socket;

	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController
	) {

	}

	logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.socket.disconnect();
		this.viewCtrl.dismiss();
	}

	goback() {
		this.viewCtrl.dismiss();
	}
}