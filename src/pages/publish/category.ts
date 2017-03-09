import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

import { AppConfig } from '../../app/app.config';

@Component({
	selector: 'page-category',
	templateUrl: 'category.html'
})
export class PublishCategoryPage {

	category: any;
	api: any = AppConfig.getProdUrl();
	categoryList: any;
	cdata: any = {};

	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController,
		public params: NavParams,
		public http: Http,
		private toastCtrl: ToastController,
	) {
		// debugger
		this.category = this.params.get('category');
	}

	ionViewWillEnter() {

		var toastOpt = {
			message: "",
			duration: 3000,
			position: 'middle',
			dismissOnPageChange: true,
			cssClass: 'mytoast'
		}

		let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
		let options = new RequestOptions({ headers: headers });

		this.http.post(this.api + '/app/get_all_category', JSON.stringify({}), options).subscribe((data) => {
			let Data = data.json();
			if (Data.success) {
				this.categoryList = Data.result;
				let that = this;
				Data.result.forEach(function (v) {
					that.cdata[v.id] = v
				})
			} else {
				toastOpt.message = Data.msg;
				let toast = this.toastCtrl.create(toastOpt);
				toast.present();
			}
		})
	}

	goback() {
		// debugger
		this.viewCtrl.dismiss({ type: 0 });
	}

	select(cid) {
		this.viewCtrl.dismiss({ type: 1, cid: this.category, cdata: this.cdata[cid] });
	}
}