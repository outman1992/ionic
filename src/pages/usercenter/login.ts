import { Component } from '@angular/core';

import { NavController, ViewController, ToastController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  	private user: any;
	constructor(
		public navCtrl: NavController, 
		public viewCtrl: ViewController, 
		private toastCtrl: ToastController,
		public loadingCtrl: LoadingController
	) {
		this.user = {};
		this.user.username = "";
		this.user.password = "";
	}

	login(){
		var toastOpt = {
			message: "",
			duration: 3000,
  			position: 'middle'
		}
		if(this.user.username == "" || this.user.username.length <= 3){
			toastOpt.message = "请输入正确的用户名";
			let toast = this.toastCtrl.create(toastOpt);
			toast.present();
		}else if(this.user.password == "" || this.user.password.length <= 6){
			toastOpt.message = "请输入正确的密码";
			let toast = this.toastCtrl.create(toastOpt);
			toast.present();
		}else{
			console.log(this.user);
			let loading = this.loadingCtrl.create({
				spinner: 'circles'
			});

			loading.present();

			setTimeout(() => {
				loading.dismiss();
			}, 5000);
		}
	}

	goback(){
		this.viewCtrl.dismiss();
	}
}