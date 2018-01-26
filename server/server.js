import express from 'express'
import path from 'path'
import morgan from 'morgan'
import config from '../config'
import oauthRoute from './oauthRoute'
import bodyParser from 'body-parser'
// import historyApiFallback from 'connect-history-api-fallback';
// app.use(historyApiFallback());

const app = express()

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, '../dist')))


oauthRoute(app)

app.get('/config', (req, res) => {
	res.send({
		code: 0,
		data: config
	})
})



const server = app.listen(config.port, () => {
	const host = server.address().address
	const port = server.address().port

	console.log('Example app listening at http://%s:%s', host, port)
})
