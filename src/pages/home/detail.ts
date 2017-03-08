import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

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
	wanted: any = false;
	user: any = JSON.parse(localStorage.getItem('user'));

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

		this.http.get(this.api + '/app/goods_detail?gid=' + this.id + '&uid=' + (this.user ? this.user.uid : null)).subscribe(data => {
			var res = data.json()
			if (res.success) {
				var good_images = JSON.parse(res.result.good_images)
				res.result.good_images = good_images
				this.detail = res.result;
				this.wanted = res.result.wanted
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
		var myUid = this.user.uid;
		// debugger
		if (myUid == this.detail['uid']) {
			var toastOpt = {
				message: "不能购买自己发布的二货！",
				duration: 1500,
				position: 'middle',
				dismissOnPageChange: true,
				cssClass: 'mytoast'
			}
			let toast = this.toastCtrl.create(toastOpt);
			toast.present();
		} else {
			this.appCtrl.getRootNav().push(MessageDetailPage, { uid: this.detail['uid'] });
		}
	}

	//收藏	
	want() {
		var toastOpt = {
			message: "",
			duration: 1500,
			position: 'middle',
			dismissOnPageChange: true,
			cssClass: 'mytoast'
		}

		if (!localStorage.getItem('token') || !localStorage.getItem('user')) {
			let modal = this.modalCtrl.create(LoginPage);

			modal.present();
		} else {
			if (this.wanted) {
				toastOpt.message = '您已经收藏过了哦~';
				let toast = this.toastCtrl.create(toastOpt);
				toast.present();
			} else {
				var myUid = this.user.uid;
				if (myUid == this.detail['uid']) {

					toastOpt.message = '不能收藏自己发布的二货！'
					let toast = this.toastCtrl.create(toastOpt);
					toast.present();

				} else {
					let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
					let options = new RequestOptions({ headers: headers });

					//获取对方头像及用户名
					this.http.post(this.api + '/app/collect', JSON.stringify({ uid: this.user.uid, gid: this.detail['gid'] }), options).subscribe((data) => {
						let Data = data.json();

						toastOpt.message = Data.msg;
						let toast = this.toastCtrl.create(toastOpt);
						toast.present();

						if (Data.success) {
							this.wanted = true
						}
					})
				}
			}
		}

	}


}