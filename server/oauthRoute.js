import config, { oauth as configOauth } from '../config'
import request from 'request'
import path from 'path'

var appendExpireTime = function (token) {
	var expires = token.expires_in
	token.expireTime = new Date().getTime() + expires * 1000 * 0.9
}

var router = function (app) {
	app.get('/config', (req, res) => {
		res.send({
			code: 0,
			data: config
		})
	})

	app.post('/oauth', function (req, res, next) {

		// const { username, password } = req.body

		request.post({
			url: configOauth.serverAccessTokenUrl,
			rejectUnauthorized: false,
			// headers: {
			// 	Authorization: 'Basic ' + new Buffer(configOauth.serverClientId + ':' + configOauth.serverClientSecret).toString('base64')
			// },
			form: {
				client_id: configOauth.serverClientId,
				client_secret: configOauth.serverClientSecret,
				grant_type: 'password',
				username: req.body.username,
				password: req.body.password,
			}
		}, function (err, response, body) {
			let data
			try {
				data = JSON.parse(body)

			} catch (e) {
				res.json({
					err: err,
					body: body
				})
				return
			}
			if (data.access_token) {
				appendExpireTime(data)
				res.json(data)
			} else {
				res.json({
					err: err,
					body: body
				})
				return
			}
		})
	})

	// app.get('/**', function (req, res) {
	// 	// res.header('Cache-Control', 'no-cache')
	// 	res.sendfile(`${path.join(__dirname, '../dist')}/index.html`)
	// })

}

export default router
