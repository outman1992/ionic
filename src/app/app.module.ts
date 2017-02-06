import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CategoryPage } from '../pages/category/category';
import { MessagePage } from '../pages/message/message';
import { UsercenterPage } from '../pages/usercenter/usercenter';
import { PublishPage } from '../pages/publish/publish';
import { LoginPage } from '../pages/usercenter/login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    CategoryPage,
    MessagePage,
    UsercenterPage,
    PublishPage,
    LoginPage,
    HomePage,
    TabsPage
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
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
