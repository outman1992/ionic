import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';

import { App, ViewController, NavController, ModalController, Content } from 'ionic-angular';
import { DetailPage } from './detail';
import { CategoryPage } from './category';
import { SearchPage } from '../search/search';
import { AppConfig } from '../../app/app.config';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild(Content) content: Content

	focus: any;
	category: any;
	current: string;
	goods: any;
	page: any = 1;
	count: any;
	dataOver: any;
	api: String = AppConfig.getProdUrl();
	goTopShow: any = false;

	constructor(
		public navCtrl: NavController,
		public appCtrl: App,
		public viewCtrl: ViewController,
		public http: Http,
		public modalCtrl: ModalController,
	) {
		this.focus = [
			{ img: 'http://www.taoertao.com/attachment/focus/1459485773jxjp.jpg' },
			{ img: 'http://www.taoertao.com/attachment/focus/banner-ghm.png' },
			{ img: 'http://www.taoertao.com/attachment/focus/1426832637hqebp.jpg' }
		];
		this.getFocus()

		this.category = {
			cateLineOne: [
				{ icon: 'phone-portrait', cateName: '手机', cid: 1 },
				{ icon: 'laptop', cateName: '电脑', cid: 2 },
				{ icon: 'headset', cateName: '配件', cid: 4 },
				{ icon: 'bulb', cateName: '电器', cid: 5 },
			],
			cateLineTwo: [
				{ icon: 'book', cateName: '书籍', cid: 6 },
				{ icon: 'game-controller-a', cateName: '娱乐', cid: 7 },
				{ icon: 'football', cateName: '运动', cid: 8 },
				{ icon: 'bicycle', cateName: '代步', cid: 9 },
			]
		};
		this.current = 'new';    //new: 最新，recommend: 推荐

		//加载初始数据
		this.loadGoodList();

		this.page = 1;
		this.dataOver = false;
	}

	ionViewDidEnter() {
		if (localStorage.getItem('token')) { AppConfig.connect(); }
	}

	getFocus() {
		// debugger
		this.http.get(this.api + '/app/get_focus').subscribe((data) => {
			if (data.json().success) {
				this.focus = data.json().result
				return true
			}
			return false
		})
	}

	pushCateList(cid, cateName) {
		this.appCtrl.getRootNav().push(CategoryPage, { cid: cid, cateName: cateName });
	}

	pushDetail(id) {
		// this.viewCtrl.dismiss();
		this.appCtrl.getRootNav().push(DetailPage, { id: id });
		// this.navCtrl.push(DetailPage, { id: id });
	}

	doInfinite(infiniteScroll) {

		let type = this.current == 'new' ? '1' : '2'

		// debugger
		if (this.page <= this.count) {

			setTimeout(() => {
				this.http.get(this.api + '/app/home_list?type=' + type + '&page=' + this.page).subscribe(data => {
					let that = this
					data.json().result.result.forEach(function (v) {
						v.good_images = JSON.parse(v.good_images)
						that.goods.push(v)
					})
					infiniteScroll.complete();
					this.page++

				});

			}, 500);

		} else {
			this.dataOver = true;
			infiniteScroll.enable(false);
		}
	}

	loadList(type) {
		if (type == 1) {
			this.current = 'new';
			this.page = 1;
			this.goods = [];
			this.loadGoodList();
		} else if (type == 2) {
			this.current = 'recommend';
			this.page = 1;
			this.goods = [];
			this.loadGoodList();
		}
	}

	//加载数据方法
	loadGoodList() {
		let type = this.current == 'new' ? '1' : '2'
		this.http.get(this.api + '/app/home_list?type=' + type + '&page=' + this.page).subscribe(data => {
			this.goods = data.json().result.result;
			this.count = data.json().result.count
			let that = this
			this.goods.forEach(function (v) {
				v.good_images = JSON.parse(v.good_images)
			})

			this.dataOver = false;
			this.page++;
		});
	}

	openSearchModal() {
		let searchModal = this.modalCtrl.create(SearchPage);
		searchModal.present();
	}

	//去顶部相关
	scrolling() {
		this.goTopShow = this.content.getContentDimensions().scrollTop > 200;
	}
	goToTop() {
		this.content.scrollToTop();
	}
}
