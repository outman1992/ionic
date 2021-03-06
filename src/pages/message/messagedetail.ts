import { Component, ViewChild } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, ViewController, NavParams, ToastController, Content, ModalController } from 'ionic-angular';
import { AppConfig } from '../../app/app.config';
import { LoginPage } from '../usercenter/login';

@Component({
	selector: 'page-messagedetail',
	templateUrl: 'messagedetail.html'
})
export class MessageDetailPage {

	@ViewChild(Content) content: Content

	user: any;
	socket: any = AppConfig.socket
	message: any;
	to: any;
	from: any = JSON.parse(localStorage.getItem('user'));
	msglist: any = [];
	header: any;
	api: String = AppConfig.getProdUrl();
	page: any = 0;

	constructor(
		public navCtrl: NavController,
		public params: NavParams,
		public viewCtrl: ViewController,
		public http: Http,
		public modalCtrl: ModalController,
		private toastCtrl: ToastController,
	) {
		this.message = ''
		this.to = this.params.get('uid')
	}

	ionViewWillEnter() {
		//登录socket
		// debugger
		if (localStorage.getItem('token')) {
			AppConfig.connect();
			this.socket = AppConfig.socket;
		}
		var that = this;
		if (this.socket) {
			this.socket.on('chatMessage', function (data) {
				// debugger
				if (data.to == that.from.uid) {
					that.msglist.push({
						content: data.message,
						type: 'come',
						header: that.header
					})
				}
			})

			//触发已读事件
			this.socket.emit('message', {
				from: this.to,	//对方
				to: this.from.uid,	//自己
				type: 'setReaded'
			});
		}

		let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
		let options = new RequestOptions({ headers: headers });

		let loginData = {
			uid: this.params.get('uid'),
			phone: this.from.phone_number,
			token: localStorage.getItem('token')
		}

		//获取对方头像及用户名
		this.http.post(this.api + '/app/get_user_info', JSON.stringify(loginData), options).subscribe((data) => {
			let Data = data.json();
			if (!Data.success && Data.result == 'tokenerr') { 	//token错误，跳转登录页面
				let modal = this.modalCtrl.create(LoginPage);
				modal.present();
			} else {
				this.user = Data.result.nick_name;
				this.header = this.api + (Data.result.avatar == "" ? "/images/web/user/default.png" : Data.result.avatar);
			}
		})

		//获取所有聊天记录
		this.getChatlogs();
	}

	ionViewDidEnter() {
		this.content.scrollToBottom()
	}

	goback() {
		this.viewCtrl.dismiss();
	}

	send() {
		// debugger
		this.msglist.push({
			content: this.message,
			type: 'go',
			header: this.api + (this.from.avatar == "" ? "/images/web/user/default.png" : this.from.avatar)
		});

		this.socket.emit('message', {
			message: this.message,
			to: this.to,
			from: this.from.uid,
			type: 'chatMessage'
		});

		let that = this;
		// debugger
		setTimeout(function () {
			that.content.scrollToBottom();
			that.message = '';
		}, 300);

	}

	doRefresh(refresher) {
		this.getChatlogs();
		refresher.complete();
	}

	getChatlogs() {
		let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
		let options = new RequestOptions({ headers: headers });
		//获取所有聊天记录
		let chatlogsdata = {
			myid: this.from.uid,
			hisid: this.params.get('uid'),
			page: this.page
		}
		this.http.post(this.api + '/app/get_chat_list', JSON.stringify(chatlogsdata), options).subscribe((data) => {
			let Data = data.json();
			// console.log(Data)
			if (!Data.success) {
				var toastOpt = {
					message: Data.msg,
					duration: 3000,
					position: 'middle',
					dismissOnPageChange: true,
					cssClass: 'mytoast'
				}
				let toast = this.toastCtrl.create(toastOpt);
				toast.present();
			} else {
				var that = this;
				Data.result.forEach(function (v) {
					var header_path = '',
						msg_type = '';
					if (v.fromid == that.from.uid) {
						msg_type = 'go';
						header_path = that.api + (that.from.avatar == "" ? "/images/web/user/default.png" : that.from.avatar);
					} else {
						// debugger
						msg_type = 'come';
						header_path = that.header;
					}
					that.msglist.unshift({
						content: v.content,
						type: msg_type,
						header: header_path
					});
				})
				that.page++
			}
		})
	}
}
