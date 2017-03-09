import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { HomePage } from '../home/home';
import { ActivityPage } from '../activity/activity';
import { MessagePage } from '../message/message';
import { UsercenterPage } from '../usercenter/usercenter';
import { LoginPage } from '../usercenter/login';
import { PublishPage } from '../publish/publish';
import { AppConfig } from '../../app/app.config';

import { NavController, ModalController, ViewController, App } from 'ionic-angular';

@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {
	// this tells the tabs component which Pages
	// should be each tab's root Page
	tab1Root: any = HomePage;
	tab2Root: any = ActivityPage;
	tab3Root: any = PublishPage;
	tab4Root: any = MessagePage;
	tab5Root: any = UsercenterPage;
	api: String = AppConfig.getProdUrl();
	notReadCount: any = null;

	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		public viewCtrl: ViewController,
		public appCtrl: App,
		public http: Http,
	) {

	}

	ionViewWillEnter() {
		// debugger
		if (localStorage.getItem('token')) {
			AppConfig.connect();
			this.getNotReadMsgCount();

			let that = this;
			AppConfig.socket.on('chatMessage', function (data) {
				console.log('有消息了');
				that.getNotReadMsgCount();
			});
		}
	}

	getNotReadMsgCount() {
		let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
		let options = new RequestOptions({ headers: headers });

		//获取对方头像及用户名
		var user = JSON.parse(localStorage.getItem('user'));
		var countData = {
			uid: user.uid,
			phone: user.phone_number,
			token: localStorage.getItem('token')
		};
		// debugger
		this.http.post(this.api + '/app/get_notread_num', JSON.stringify(countData), options).subscribe((data) => {
			let Data = data.json();
			if (Data.success) {
				if (Data.result > 0) {
					this.notReadCount = Data.result;
				}
			}
		})
	}

	goPublish() {
		//如果已登陆，弹出发布modal；否则弹出登录modal
		if (localStorage.getItem('token')) {
			let publish = this.modalCtrl.create(PublishPage);
			publish.present();
		} else {
			let login = this.modalCtrl.create(LoginPage);
			login.present();
		}

	}

	readMsg() {
		this.notReadCount = null;
	}
}
