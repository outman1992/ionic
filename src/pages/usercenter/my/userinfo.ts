import { Component } from '@angular/core';
// import { Http, Headers, RequestOptions } from '@angular/http';
import { Http } from '@angular/http';
import { NavController, ViewController, ToastController } from 'ionic-angular';

import { AppConfig } from '../../../app/app.config';

@Component({
	selector: 'page-userinfo',
	templateUrl: 'userinfo.html'
})
export class UserinfoPage {

	api: any = AppConfig.getProdUrl();

	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController,
		private toastCtrl: ToastController,
		public http: Http,
	) {

	}

	goback() {
		this.viewCtrl.dismiss();
	}
}