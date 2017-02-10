import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CategoryPage } from '../category/category';
import { MessagePage } from '../message/message';
import { UsercenterPage } from '../usercenter/usercenter';
import { LoginPage } from '../usercenter/login';
import { PublishPage } from '../publish/publish';

import { NavController, ModalController, ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root: any = HomePage;
    tab2Root: any = CategoryPage;
    tab3Root: any = PublishPage;
    tab4Root: any = MessagePage;
    tab5Root: any = UsercenterPage;

    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public viewCtrl: ViewController
    ) {

    }

    goPublish() {
        //如果已登陆，弹出发布modal；否则弹出登录modal
        if (localStorage.getItem('token')) {
            let publish = this.modalCtrl.create(PublishPage);
            publish.present();
        } else {
            let login = this.modalCtrl.create(LoginPage);
            login.present();
        }

    }
}
