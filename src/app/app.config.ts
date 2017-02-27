import * as io from 'socket.io-client'

export class AppConfig {

	//生产环境URL
	public static getProdUrl() {
		return "http://127.0.0.1:3000";
	}

	public static socket = null;

	public static connect() {
		// debugger
		if (!this.socket) {
			this.socket = io('http://127.0.0.1:3000');
			let user = JSON.parse(localStorage.getItem('user'))
			this.socket.emit('message', {
				content: {
					uid: user.uid
				},
				type: 'reg'
			});

			this.socket.on('reguser', function (data) {
				console.log(data);
			});
		}
	}
}