import { Component } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
	selector: 'page-register',
	templateUrl: 'register.html'
})
export class RegisterPage {
	constructor(
		public viewCtrl: ViewController
	) { }

	goback() {
		this.viewCtrl.dismiss();
	}
}