import { Component } from '@angular/core';

import { App, NavController, ModalController } from 'ionic-angular';
import { MessageDetailPage } from './messagedetail';
import { LoginPage } from '../usercenter/login';

@Component({
	selector: 'page-message',
	templateUrl: 'message.html'
})
export class MessagePage {

	login: any;

	constructor(
		public navCtrl: NavController,
		public appCtrl: App,
		public modalCtrl: ModalController,
	) {
		this.login = localStorage.getItem('token') ? true : false;
		// var socket = io();
	}

	goChat() {
		this.appCtrl.getRootNav().push(MessageDetailPage);
	}

	ionViewWillEnter() {
		this.login = localStorage.getItem('token') ? true : false;
	}

	popLogin() {
		// debugger
		let modal = this.modalCtrl.create(LoginPage);
		modal.onDidDismiss((data) => {
			// debugger
			this.login = localStorage.getItem('token') ? true : false;
		})
		modal.present();
	}
}
