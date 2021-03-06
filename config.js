
const config = {
	development: {
		port: 8000,
		apiBase: 'http://192.168.0.210:3721',
		// apiBase: 'https://sscsapi.fongwell.com',
		oauth: {
			serverClientId: 'TxxGjYZCAUbQgxipKzWZtjvYugGGoQdVIYSUSvAhqKWPlWNyqdZSOOIMVcUJQLFw',
			serverClientSecret: 'iFAeXVElWvIqHFJFrAmpeFpizMTLJiYx',
			serverAccessTokenUrl: 'http://192.168.0.210:3721/oauth/token',
			// serverAccessTokenUrl: 'https://sscsapi.fongwell.com/oauth/token',
		},
	},
	production: {
		port: 3000,
		apiBase: 'https://sscsapi.fongwell.com',
		oauth: {
			serverClientId: 'TxxGjYZCAUbQgxipKzWZtjvYugGGoQdVIYSUSvAhqKWPlWNyqdZSOOIMVcUJQLFw',
			serverClientSecret: 'iFAeXVElWvIqHFJFrAmpeFpizMTLJiYx',
			serverAccessTokenUrl: 'https://sscsapi.fongwell.com/oauth/token',
		},
	},
}

var envbuild = 'development'
if (process.env.NODE_ENV) {
	envbuild = process.env.NODE_ENV
} else {
	if (process.argv.length > 2) {
		for (var i in config) {
			if (process.argv.indexOf(i) !== -1) {
				envbuild = i
				break
			}
		}
	}
}

var toUse = config[envbuild]
console.log('node环境:' + envbuild)
module.exports = toUse
