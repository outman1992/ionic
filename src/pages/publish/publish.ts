import { Component } from '@angular/core';

import { LoginPage } from '../usercenter/login';
import { NavController, ModalController  } from 'ionic-angular';

@Component({
  selector: 'page-publish',
  templateUrl: 'publish.html'
})
export class PublishPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
  	
  }

  // checkLogin(){
  // 	let modal = this.modalCtrl.create(LoginPage)
  // 	modal.present();
  // }

  ionViewWillEnter(){
  	
  	console.log('ionViewWillEnter')
  	let that = this;
  	if(true){
  		this.show();
  	}
  }

  show(){
  	let modal = this.modalCtrl.create(LoginPage)
  	modal.present();
  }

}
