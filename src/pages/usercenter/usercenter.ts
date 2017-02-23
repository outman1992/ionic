import { Component } from '@angular/core';

import { LoginPage } from '../usercenter/login';
import { SettingPage } from '../usercenter/setting';
import { NavController, ModalController, ToastController } from 'ionic-angular';

import { AppConfig } from '../../app/app.config';

@Component({
	selector: 'page-usercenter',
	templateUrl: 'usercenter.html'
})
export class UsercenterPage {

	login: any;
	user: any;
	api: String = AppConfig.getProdUrl();

	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		public toastCtrl: ToastController
	) {
		// debugger
		this.user = JSON.parse(localStorage.getItem('user'))
		this.login = localStorage.getItem('token') ? this.user : null;
	}

	ionViewWillEnter() {
		this.user = JSON.parse(localStorage.getItem('user'))
		this.login = localStorage.getItem('token') ? this.user : null;
	}

	popLogin() {
		// debugger
		let modal = this.modalCtrl.create(LoginPage);
		modal.onDidDismiss((data) => {
			// debugger
			this.user = JSON.parse(localStorage.getItem('user'))
			this.login = localStorage.getItem('token') ? this.user : null;
		})
		modal.present();
	}

	popSetting() {
		// debugger
		if (!this.checkUserLogin()) { return false };

		let modal = this.modalCtrl.create(SettingPage);
		modal.onDidDismiss((data) => {
			// debugger
			this.user = JSON.parse(localStorage.getItem('user'))
			this.login = localStorage.getItem('token') ? this.user : null;
		})
		modal.present();
	}

	checkUserLogin() {
		if (!localStorage.getItem('token')) {
			let toast = this.toastCtrl.create({
				message: '请先登录',
				duration: 2000,
				position: 'middle',
				dismissOnPageChange: true,
				cssClass: 'mytoast'
			});
			toast.present();
			return false;
		} else {
			return true;
		}
	}

}
