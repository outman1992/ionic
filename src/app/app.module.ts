import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ActivityPage } from '../pages/activity/activity';
import { MessagePage } from '../pages/message/message';
import { MessageDetailPage } from '../pages/message/messagedetail';
import { UsercenterPage } from '../pages/usercenter/usercenter';
import { PublishPage } from '../pages/publish/publish';
import { SellMthodPage } from '../pages/publish/sellmethod';
import { PublishCategoryPage } from '../pages/publish/category';
import { LoginPage } from '../pages/usercenter/login';
import { RegisterPage } from '../pages/usercenter/register';
import { SettingPage } from '../pages/usercenter/setting';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/home/detail';
import { CategoryPage } from '../pages/home/category';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';

import { PublishedPage } from '../pages/usercenter/my/published';

@NgModule({
	declarations: [
		MyApp,
		ActivityPage,
		MessagePage,
		UsercenterPage,
		PublishPage,
		LoginPage,
		RegisterPage,
		HomePage,
		DetailPage,
		TabsPage,
		SearchPage,
		SellMthodPage,
		PublishCategoryPage,
		SettingPage,
		MessageDetailPage,
		CategoryPage,
		PublishedPage
	],
	imports: [
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		ActivityPage,
		MessagePage,
		UsercenterPage,
		PublishPage,
		LoginPage,
		RegisterPage,
		HomePage,
		DetailPage,
		TabsPage,
		SearchPage,
		SellMthodPage,
		PublishCategoryPage,
		SettingPage,
		MessageDetailPage,
		CategoryPage,
		PublishedPage
	],
	providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
