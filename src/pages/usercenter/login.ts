import { Component } from '@angular/core';

import { NavController, ViewController  } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	constructor(public viewCtrl: ViewController) {
  	
  	}

  	goback(){
  		this.viewCtrl.dismiss();
  	}
}