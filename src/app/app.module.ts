import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CategoryPage } from '../pages/category/category';
import { MessagePage } from '../pages/message/message';
import { UsercenterPage } from '../pages/usercenter/usercenter';
import { PublishPage } from '../pages/publish/publish';
import { SellMthodPage } from '../pages/publish/sellmethod';
import { PublishCategoryPage } from '../pages/publish/category';
import { LoginPage } from '../pages/usercenter/login';
import { SettingPage } from '../pages/usercenter/setting';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/home/detail';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';

@NgModule({
	declarations: [
		MyApp,
		CategoryPage,
		MessagePage,
		UsercenterPage,
		PublishPage,
		LoginPage,
		HomePage,
		DetailPage,
		TabsPage,
		SearchPage,
		SellMthodPage,
		PublishCategoryPage,
		SettingPage
	],
	imports: [
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		CategoryPage,
		MessagePage,
		UsercenterPage,
		PublishPage,
		LoginPage,
		HomePage,
		DetailPage,
		TabsPage,
		SearchPage,
		SellMthodPage,
		PublishCategoryPage,
		SettingPage
	],
	providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
