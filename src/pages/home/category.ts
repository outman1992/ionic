import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { App, ViewController, NavController, ModalController, NavParams } from 'ionic-angular';
import { DetailPage } from './detail';
import { AppConfig } from '../../app/app.config';

@Component({
	selector: 'page-category',
	templateUrl: 'category.html'
})
export class CategoryPage {

	cid: any;
	cateName: any;
	api: String = AppConfig.getProdUrl();
	page: any = 1;
	goods: any = [];
	dataOver: any = false;
	isShowList: any = true;

	constructor(
		public navCtrl: NavController,
		public appCtrl: App,
		public viewCtrl: ViewController,
		public http: Http,
		public params: NavParams,
		public modalCtrl: ModalController,
	) {
		this.cid = this.params.get('cid');
		this.cateName = this.params.get('cateName');
		this.getCategoryList(this.cid, false);
	}

	goback() {
		this.navCtrl.pop();
	}

	ionViewWillEnter() {
		this.dataOver = false;
	}

	//加载数据doInfinite：上拉刷新标志	
	getCategoryList(cid, infiniteScroll) {
		let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
		let options = new RequestOptions({ headers: headers });
		this.http.post(this.api + '/app/get_category_list', JSON.stringify({ cid: cid, page: this.page }), options).subscribe((data) => {
			let Data = data.json();
			if (Data.success) {

				// debugger
				if (this.page == 1) {
					if (Data.result.length == 0) {
						this.isShowList = false;
					} else {
						this.isShowList = true;
					}
				}

				if (Data.result.length > 0) {
					var that = this;

					Data.result.forEach(function (v) {
						v.good_images = JSON.parse(v.good_images)[0];
					})

					for (var i = 0; i < Data.result.length; i += 2) {
						that.goods.push(Data.result.slice(i, i + 2))
					}
					// debugger
					this.page++;
					if (infiniteScroll) {
						infiniteScroll.complete();
					}
				} else {
					this.dataOver = true;
					if (infiniteScroll) {
						infiniteScroll.enable(false);
					}
				}
				// this.goods.concat(Data.result);


			}
		})
		// console.log(this.goods)
	}

	//上拉刷新	
	doInfinite(infiniteScroll) {
		this.getCategoryList(this.cid, infiniteScroll);
	}

	pushDetail(gid) {
		this.appCtrl.getRootNav().push(DetailPage, { id: gid });
	}
}