import { Component } from '@angular/core';
import * as io from 'socket.io-client'

import { App, NavController, ModalController } from 'ionic-angular';
import { MessageDetailPage } from './messagedetail';
import { LoginPage } from '../usercenter/login';
import { AppConfig } from '../../app/app.config';

@Component({
	selector: 'page-message',
	templateUrl: 'message.html'
})
export class MessagePage {

	login: any;
	socket: any;
	user: any;

	constructor(
		public navCtrl: NavController,
		public appCtrl: App,
		public modalCtrl: ModalController,
	) {
		this.login = localStorage.getItem('token') ? true : false;

	}

	goChat() {
		this.appCtrl.getRootNav().push(MessageDetailPage);
	}

	ionViewWillEnter() {
		this.login = localStorage.getItem('token') ? true : false;
		//登录socket
		if (localStorage.getItem('token')) { AppConfig.connect(); }
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
