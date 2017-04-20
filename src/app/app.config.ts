import * as io from 'socket.io-client'

export class AppConfig {

	//生产环境URL
	public static getProdUrl() {
		return "http://new.taoertao.com";
	}

	public static socket = null;

	public static connect() {
		// debugger
		if (!this.socket) {
			this.socket = io('http://new.taoertao.com');
			let user = JSON.parse(localStorage.getItem('user'))
			this.socket.emit('message', {
				content: {
					uid: user.uid
				},
				type: 'reg'
			});

			this.socket.on('reguser', function (data) {
				console.log('聊天系统登录成功', '人数：' + data.num);
			});
		}
	}
}