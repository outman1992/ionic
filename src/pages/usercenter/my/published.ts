import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, ViewController, ToastController } from 'ionic-angular';

import { AppConfig } from '../../../app/app.config';

@Component({
	selector: 'page-published',
	templateUrl: 'published.html'
})
export class PublishedPage {

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