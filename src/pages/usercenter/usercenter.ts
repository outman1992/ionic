import { Component } from '@angular/core';

import { LoginPage } from '../usercenter/login';
import { SettingPage } from '../usercenter/setting';
import { NavController, ModalController, ToastController } from 'ionic-angular';

@Component({
	selector: 'page-usercenter',
	templateUrl: 'usercenter.html'
})
export class UsercenterPage {

	login: any;

	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		public toastCtrl: ToastController
	) {
		this.login = localStorage.getItem('token') ? true : false;
	}

	popLogin() {
		let modal = this.modalCtrl.create(LoginPage);
		modal.onDidDismiss((data) => {
			this.login = localStorage.getItem('token') ? true : false;
		})
		modal.present();
	}

	popSetting() {
		if (!this.checkUserLogin()) { return false };

		let modal = this.modalCtrl.create(SettingPage);
		modal.onDidDismiss((data) => {
			this.login = localStorage.getItem('token') ? true : false;
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
