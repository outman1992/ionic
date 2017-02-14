import { Component } from '@angular/core';

import { LoginPage } from '../usercenter/login';
import { SellMthodPage } from './sellmethod';
import { PublishCategoryPage } from './category';
import { NavController, ModalController, ViewController, ActionSheetController } from 'ionic-angular';
import { Camera } from 'ionic-native';

@Component({
    selector: 'page-publish',
    templateUrl: 'publish.html'
})
export class PublishPage {

    options: any = {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA
    };

    imageArray: any;
    sellmethod: any;
    category: any;
    cdata: any;

    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public viewCtrl: ViewController,
        public actionSheetCtrl: ActionSheetController,
    ) {
        this.imageArray = [];
    }

    // checkLogin(){
    // 	let modal = this.modalCtrl.create(LoginPage)
    // 	modal.present();
    // }

    show() {
        let modal = this.modalCtrl.create(LoginPage)
        modal.present();
    }

    goback() {
        this.viewCtrl.dismiss();
    }

    getImages() {
        let actionSheet = this.actionSheetCtrl.create({
            title: '选择图片',
            buttons: [
                {
                    text: '从相册中选取',
                    // role: 'destructive',
                    handler: () => {
                        // console.log('Destructive clicked');
                        this.options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
                        this.getPhotos();
                    }
                }, {
                    text: '拍照',
                    handler: () => {
                        // console.log('Archive clicked');
                        this.options.sourceType = Camera.PictureSourceType.CAMERA;
                        this.getPhotos();
                    }
                }, {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                        // console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();

    }

    getPhotos(){
        // this.imageArray.push('http://photocdn.sohu.com/20091011/Img267278341.jpg');
        // debugger
        Camera.getPicture(this.options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            // let base64Image = imageData;
            this.imageArray.push(base64Image);
            // alert(base64Image);
        }, (err) => {
            alert(err);
            // Handle error
        });
    }

    popSellMethod(){
        let modal = this.modalCtrl.create(SellMthodPage, { method: this.sellmethod });

        modal.onDidDismiss(data => {
            // console.log(data);
            this.sellmethod = data;
        });

        modal.present();
    }

    popCategory(){
        let modal = this.modalCtrl.create(PublishCategoryPage, { category: this.category });

        modal.onDidDismiss(data => {
            // debugger
            // data = data ? JSON.parse(data) : undefined;
            if (data.type == 1) {
                this.category = data.cid;
                this.cdata = JSON.parse(data.cdata);
            }
        });

        modal.present();
    }

}
