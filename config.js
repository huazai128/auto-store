const config = {
	development: {
		port: 7805,
		apiBase: 'http://192.168.0.222:5555',
		oauth: {
			serverClientId: 'pc',
			serverClientSecret: 'pc',
			serverAccessTokenUrl: 'http://192.168.0.222:5555/oauth/token',
		},
	},
	production: {
		port: 7805,
		apiBase: 'http://sanhui.api.fongwell.com',
		oauth: {
			serverClientId: 'YnjssiuWaofJYzLk',
			serverClientSecret: '7tdZfDcUelnqsJR4DRf1KibD2wCNg4znH7rVBNsbd8xBcGQRCygoW7Ht3PqAg9Rd',
			serverAccessTokenUrl: 'http://sanhui.api.fongwell.com/oauth/token',
		},
	},
};
var envbuild = 'development';
if (process.env.config_env) {
	envbuild = process.env.config_env;
} else {
	if (process.argv.length > 2) {
		for (var i in config) {
			if (process.argv.indexOf(i) !== -1) {
				envbuild = i;
				break;
			}
		}
	}
}

var toUse = config[envbuild];
console.log('配置环境:' + envbuild);
module.exports = toUse;
