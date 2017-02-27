import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { App, NavController, NavParams, LoadingController, ModalController, ToastController } from 'ionic-angular';
import { AppConfig } from '../../app/app.config';
import { MessageDetailPage } from '../message/messagedetail';
import { LoginPage } from '../usercenter/login';

@Component({
	selector: 'page-detail',
	templateUrl: 'detail.html'
})
export class DetailPage {

	id: any;
	goods: any;
	detail: null;
	loading: any;
	api: String = AppConfig.getProdUrl();

	constructor(
		public navCtrl: NavController,
		public appCtrl: App,
		public params: NavParams,
		public http: Http,
		public loadCtrl: LoadingController,
		public modalCtrl: ModalController,
		public toastCtrl: ToastController
	) {
		this.id = this.params.get('id');



		this.http.get(this.api + '/app/goods_detail?gid=' + this.id).subscribe(data => {
			var res = data.json()
			if (res.success) {
				var good_images = JSON.parse(res.result.good_images)
				res.result.good_images = good_images
				this.detail = res.result;
				// this.loading.dismiss();
				this.loading = this.loadCtrl.create({
					spinner: "dots",
					duration: good_images.length * 300
				})
				this.loading.present();
			}

		})

		// var that = this;
		// this.goods.forEach(function(v, i) {
		//     if (that.id == v.id) {
		//         that.detail = v;
		//     }
		// })
	}

	goback() {
		this.navCtrl.pop();
	}

	chat() {
		if (localStorage.getItem('token') && localStorage.getItem('user')) {
			this.goMsgDetailPage();
		} else {
			let modal = this.modalCtrl.create(LoginPage);
			modal.onDidDismiss((data) => {
				if (localStorage.getItem('token') && localStorage.getItem('user')) {
					this.goMsgDetailPage();
				}
			})
			modal.present();
		}
	}

	goMsgDetailPage() {
		this.appCtrl.getRootNav().push(MessageDetailPage, { uid: this.detail['uid'] });
	}


}