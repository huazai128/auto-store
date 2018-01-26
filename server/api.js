import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import colors from 'colors'

const app = express()

app.use(morgan('dev'))

// app.use(cors())
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))

let data = [
	{ img: 'http://img06.tooopen.com/images/20161227/tooopen_sy_193217225516.jpg', title: '一个酸菜鱼', cate: '烤鱼' },
	{ img: 'http://img06.tooopen.com/images/20161227/tooopen_sy_193217225516.jpg', title: '两个酸菜鱼', cate: '寿司' },
	{ img: 'http://img06.tooopen.com/images/20161227/tooopen_sy_193217225516.jpg', title: '酸菜鱼', cate: '咖啡' },
]

app.get('/api/data', (request, response) => {
	response.send({
		code: 0,
		data
	})

})

app.listen(9000, () => {
	console.log('================================='.blue)
	console.log('Absolute Terror Field:'.cyan)
	console.log('http://localhost:9000/'.magenta)
})
