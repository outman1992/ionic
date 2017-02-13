import { Component } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';

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
            position: 'middle'
        }
        if (this.user.username == "" || this.user.username.length <= 3) {
            toastOpt.message = "请输入正确的用户名";
            let toast = this.toastCtrl.create(toastOpt);
            toast.present();
        } else if (this.user.password == "" || this.user.password.length <= 6) {
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

            debugger
            let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
            let options = new RequestOptions({ headers: headers });
            this.http.post('http://www.wanlinqiang.com/login', JSON.stringify(userInfo), options).subscribe((data) => {
                let Data = data.json();

                if (Data.success) {
                    toastOpt.message = Data.message;
                    let toast = this.toastCtrl.create(toastOpt);
                    toast.present();

                    localStorage.setItem('token', '123456789789456123');

                    setTimeout(() => {
                        loading.dismiss();
                        this.viewCtrl.dismiss();
                    }, 1000);
                } else {
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
}