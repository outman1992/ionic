import { Component } from '@angular/core';

import { LoginPage } from '../usercenter/login';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { Camera, ImagePicker } from 'ionic-native';

@Component({
    selector: 'page-publish',
    templateUrl: 'publish.html'
})
export class PublishPage {

    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public viewCtrl: ViewController
    ) {

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
        alert(JSON.stringify(Camera));

        Camera.getPicture().then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            alert(base64Image);
        }, (err) => {
            alert(err);
            // Handle error
        });

    }

    getPhotos(){
        alert(JSON.stringify(ImagePicker));
        ImagePicker.getPictures().then((results) => {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
            }
        }, (err) => { 
            alert(err);
        });
    }

}
