import { Component } from '@angular/core';

import { App, NavController } from 'ionic-angular';
import { MessageDetailPage } from './messagedetail';

@Component({
	selector: 'page-message',
	templateUrl: 'message.html'
})
export class MessagePage {

	constructor(
		public navCtrl: NavController,
		public appCtrl: App
	) {

	}
	goChat() {
		this.appCtrl.getRootNav().push(MessageDetailPage);
	}
}
