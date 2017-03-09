import { Component } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { App, NavController, ModalController, ToastController } from 'ionic-angular';
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
	api: String = AppConfig.getProdUrl();
	contacts: any = [];

	constructor(
		public navCtrl: NavController,
		public appCtrl: App,
		public modalCtrl: ModalController,
		public http: Http,
		private toastCtrl: ToastController,
	) {
		this.login = localStorage.getItem('token') ? true : false;
		this.user = JSON.parse(localStorage.getItem('user'));
	}

	goChat(uid, i) {
		this.contacts[i].notread = 0;
		this.appCtrl.getRootNav().push(MessageDetailPage, { uid: uid });
	}

	ionViewWillEnter() {
		this.login = localStorage.getItem('token') ? true : false;
		//登录socket
		if (localStorage.getItem('token')) {
			AppConfig.connect();

			this.socket = AppConfig.socket;
			// debugger
			let that = this;
			this.socket.on('chatMessage', function (data) {
				that.getContects();
			})

			//加载联系人
			this.getContects();
		}
	}

	popLogin() {
		// debugger
		let modal = this.modalCtrl.create(LoginPage);
		modal.onDidDismiss((data) => {
			// debugger
			this.login = localStorage.getItem('token') ? true : false;
			this.user = JSON.parse(localStorage.getItem('user'));
			this.getContects();
		})
		modal.present();
	}

	getContects() {
		let loginData = {
			uid: this.user.uid,
			phone: this.user.phone_number,
			token: localStorage.getItem('token')
		}

		let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
		let options = new RequestOptions({ headers: headers });
		this.http.post(this.api + '/app/get_chat_person', JSON.stringify(loginData), options).subscribe((data) => {
			let Data = data.json();
			if (!Data.success) {
				if (!Data.success && Data.result == 'tokenerr') {
					localStorage.removeItem('token');
					localStorage.removeItem('user');
					this.socket.disconnect();
					this.login = false;
					this.popLogin();
				} else {
					var toastOpt = {
						message: Data.msg,
						duration: 3000,
						position: 'middle',
						dismissOnPageChange: true,
						cssClass: 'mytoast'
					}
					let toast = this.toastCtrl.create(toastOpt);
					toast.present();
				}
			} else {
				this.contacts = Data.result;
			}
		})
	}
}
