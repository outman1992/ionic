import { Component } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, ViewController, NavParams } from 'ionic-angular';
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
	) {
		this.message = {
			content: ''
		}
		this.to = {
			uid: this.params.get('uid')
		}

	}

	ionViewDidLoad() {

	}

	ionViewWillEnter() {
		//登录socket
		if (localStorage.getItem('token')) { AppConfig.connect(); }
		// debugger
		var that = this;
		if (this.socket) {
			this.socket.on('chatMessage', function (data) {
				// debugger
				if (data.to.uid == that.from.uid) {
					that.msglist.push({
						content: data.message.content,
						type: 'come',
						header: this.header
					})
				}
			})
		}

		let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
		let options = new RequestOptions({ headers: headers });
		this.http.post(this.api + '/app/get_user_info', JSON.stringify({ uid: this.params.get('uid') }), options).subscribe((data) => {
			let Data = data.json();
			this.user = Data.result.nick_name;
			this.header = this.api + (Data.result.avatar == "" ? "/images/web/user/default.png" : Data.result.avatar);
		})
	}

	goback() {
		this.viewCtrl.dismiss();
	}

	send() {
		// debugger
		this.msglist.push({
			content: this.message.content,
			type: 'go',
			header: this.from.avatar
		});

		this.socket.emit('message', {
			message: this.message,
			to: this.to,
			from: this.from.uid,
			type: 'chatMessage'
		});
	}
}
