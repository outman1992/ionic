import { Component } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';

import { RegisterPage } from './register';
import { AppConfig } from '../../app/app.config';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	private user: any;
	api: String = AppConfig.getProdUrl();

	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController,
		private toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		public http: Http,
	) {
		this.user = {};
		this.user.username = "";
		this.user.password = "";
	}

	login() {
		var toastOpt = {
			message: "",
			duration: 3000,
			position: 'middle',
			dismissOnPageChange: true,
			cssClass: 'mytoast'
		}
		if (this.user.username == "" || this.user.username.length <= 3) {
			toastOpt.message = "请输入正确的用户名";
			let toast = this.toastCtrl.create(toastOpt);
			toast.present();
		} else if (this.user.password == "") {// || this.user.password.length <= 6
			toastOpt.message = "请输入正确的密码";
			let toast = this.toastCtrl.create(toastOpt);
			toast.present();
		} else {
			// console.log(this.user);
			let loading = this.loadingCtrl.create({
				spinner: 'circles'
			});

			loading.present();
			let userInfo = {
				username: this.user.username,
				password: Md5.hashStr(this.user.password)
			}

			// debugger
			let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
			let options = new RequestOptions({ headers: headers });
			this.http.post(this.api + '/app/login', JSON.stringify(userInfo), options).subscribe((data) => {
				let Data = data.json();

				if (Data.success) {
					toastOpt.message = Data.message;
					let toast = this.toastCtrl.create(toastOpt);
					toast.present();
					loading.dismiss();

					localStorage.setItem('token', Data.token);
					localStorage.setItem('user', JSON.stringify(Data.result));

					setTimeout(() => {
						toast.dismiss();
						this.viewCtrl.dismiss();
					}, 1000);
				} else {
					loading.dismiss();
					toastOpt.message = Data.message;
					let toast = this.toastCtrl.create(toastOpt);
					toast.present();
				}
			})
		}
	}

	goback() {
		this.viewCtrl.dismiss();
	}

	register() {
		this.viewCtrl.dismiss();
		this.navCtrl.push(RegisterPage)
	}
}