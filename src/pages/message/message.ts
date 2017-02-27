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
		AppConfig.socket = io('http://127.0.0.1:3000');
		// this.socket = io('http://127.0.0.1:3000');
		this.socket = AppConfig.socket;
		this.socket.on('reguser', function (data) {
			console.log(data);
		});
		// this.socket.on('chatMessage', function (data) {
		// 	console.log(data);
		// });
		// debugger
		//登录socket
		if (localStorage.getItem('token')) {
			this.user = JSON.parse(localStorage.getItem('user'))
			this.socket.emit('message', {
				content: {
					uid: this.user.uid
				},
				type: 'reg'
			});
		}
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
