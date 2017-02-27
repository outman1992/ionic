import { Component } from '@angular/core';

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
	header: any = 'http://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-woody.png';

	constructor(
		public navCtrl: NavController,
		public params: NavParams,
		public viewCtrl: ViewController
	) {
		this.user = '123123';
		this.message = {
			content: ''
		}
		this.to = {
			uid: this.params.get('uid')
		}
		this.msglist = [
			{ content: '你好，在吗？', type: 'come' },
			{ content: '在的，你好', type: 'go' }
		]
	}

	ionViewWillEnter() {
		// debugger
		var that = this;
		this.socket.on('chatMessage', function (data) {
			// debugger
			if (data.to.uid == that.from.uid) {
				console.log('有人发信息给我了');
				console.log(data);
				that.msglist.push({
					content: data.message.content,
					type: 'come'
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
			content: this.message.content,
			type: 'go'
		});

		this.socket.emit('message', {
			message: this.message,
			to: this.to,
			from: this.from.uid,
			type: 'chatMessage'
		});
	}
}
