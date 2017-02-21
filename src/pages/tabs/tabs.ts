import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ActivityPage } from '../activity/activity';
import { MessagePage } from '../message/message';
import { UsercenterPage } from '../usercenter/usercenter';
import { LoginPage } from '../usercenter/login';
import { PublishPage } from '../publish/publish';

import { NavController, ModalController, ViewController, App } from 'ionic-angular';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root: any = HomePage;
    tab2Root: any = ActivityPage;
    tab3Root: any = PublishPage;
    tab4Root: any = MessagePage;
    tab5Root: any = UsercenterPage;

    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public viewCtrl: ViewController,
        public appCtrl: App,
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
