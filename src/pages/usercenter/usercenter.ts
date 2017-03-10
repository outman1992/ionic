import { Component } from '@angular/core';
import { App, NavController, ModalController, ToastController } from 'ionic-angular';

import { LoginPage } from '../usercenter/login';
import { SettingPage } from '../usercenter/setting';
import { PublishedPage } from '../usercenter/my/published';
import { WantsPage } from '../usercenter/my/wants';
import { UserinfoPage } from '../usercenter/my/userinfo';

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
		public toastCtrl: ToastController,
		public appCtrl: App
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

	popPage(index) {
		if (!this.checkUserLogin()) { return false };
		switch (index) {
			case 1:
				this.appCtrl.getRootNav().push(PublishedPage);
				break;
			case 2:
				this.appCtrl.getRootNav().push(WantsPage);
				break;
			case 4:
				this.appCtrl.getRootNav().push(UserinfoPage);
				break;
		}
	}

}
