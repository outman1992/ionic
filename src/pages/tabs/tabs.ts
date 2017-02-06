import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CategoryPage } from '../category/category';
import { MessagePage } from '../message/message';
import { UsercenterPage } from '../usercenter/usercenter';
import { PublishPage } from '../publish/publish';

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

  constructor() {

  }

  publish(){
  	console.log(12312121)
  }
}
