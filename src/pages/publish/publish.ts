import { Component } from '@angular/core';

import { LoginPage } from '../usercenter/login';
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
            alert(base64Image);
        }, (err) => {
            alert(err);
            // Handle error
        });
    }

}
