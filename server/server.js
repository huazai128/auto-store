import express from 'express';
import path from 'path';
import morgan from 'morgan';
import config from '../config';

// import historyApiFallback from 'connect-history-api-fallback';

const app = express();

// app.use(historyApiFallback());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist')));


app.get('/config', (req, res) => {
	res.send({
		code: 0,
		data: config
	});
});

const server = app.listen(3000, () => {
	const host = server.address().address;
	const port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
