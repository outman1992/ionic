import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, ViewController, ToastController } from 'ionic-angular';

import { AppConfig } from '../../../app/app.config';

@Component({
	selector: 'page-published',
	templateUrl: 'published.html'
})
export class PublishedPage {

	api: any = AppConfig.getProdUrl();
	page: any = 1;
	list: any = [];
	count: any;
	dataOver: any = false;

	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController,
		private toastCtrl: ToastController,
		public http: Http,
	) {

	}

	ionViewWillEnter() {
		this.loadMyProList(null);
	}

	doInfinite(infiniteScroll) {
		if (this.page <= this.count) {
			this.loadMyProList(infiniteScroll);
		} else {
			this.dataOver = true;
			infiniteScroll.enable(false);
		}
	}

	loadMyProList(infiniteScroll) {
		let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
		let options = new RequestOptions({ headers: headers });

		let userInfo = {
			token: localStorage.getItem('token'),
			phone: JSON.parse(localStorage.getItem('user')).phone_number,
			uid: JSON.parse(localStorage.getItem('user')).uid,
			page: this.page
		};

		this.http.post(this.api + '/app/my_published_list', JSON.stringify(userInfo), options).subscribe((data) => {
			let Data = data.json();
			if (Data.success) {
				let that = this;
				this.count = Data.result.count;
				Data.result.result.forEach(function (v) {
					v.good_images = JSON.parse(v.good_images)[0];
					that.list.push(v);
				})
				if (infiniteScroll) {
					infiniteScroll.complete();
				}
				this.page++
			}
		})
	}

	goback() {
		this.viewCtrl.dismiss();
	}
}