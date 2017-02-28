import { Component } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, ViewController, NavParams, ToastController } from 'ionic-angular';
import { AppConfig } from '../../app/app.config';

@Component({
	selector: 'page-messagedetail',
	templateUrl: 'messagedetail.html'
})
export class MessageDetailPage {

	user: any;
	socket: any = AppConfig.socket
	message: any;
	to: any;
	from: any = JSON.parse(localStorage.getItem('user'));
	msglist: any = [];
	header: any;
	api: String = AppConfig.getProdUrl();

	constructor(
		public navCtrl: NavController,
		public params: NavParams,
		public viewCtrl: ViewController,
		public http: Http,
		private toastCtrl: ToastController,
	) {
		this.message = ''
		this.to = this.params.get('uid')

	}

	ionViewDidLoad() {

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

		//获取对方头像及用户名
		this.http.post(this.api + '/app/get_user_info', JSON.stringify({ uid: this.params.get('uid') }), options).subscribe((data) => {
			let Data = data.json();
			this.user = Data.result.nick_name;
			this.header = this.api + (Data.result.avatar == "" ? "/images/web/user/default.png" : Data.result.avatar);
		})

		//获取所有聊天记录
		this.http.post(this.api + '/app/get_chat_list', JSON.stringify({ myid: this.from.uid, hisid: this.params.get('uid') }), options).subscribe((data) => {
			let Data = data.json();
			console.log(Data)
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
					that.msglist.push({
						content: v.content,
						type: msg_type,
						header: header_path
					})
				})
			}
		})
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
	}
}
