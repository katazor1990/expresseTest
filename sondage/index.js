const express = require('express');
const settings = require('./settings');
const bodyParser = require('body-parser');
const sondageRouter = require('./routes/routes');
const cors = require('cors');

const app = express();
const corsOptions = {
	origin: '*',
	allowHeaderq: [
		'origin',
		'accept',
		'authorization'
	],
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/polls', sondageRouter);

app.get('/', (req, res) => {
	res.send('Hello world !');
});

app.listen(settings.port, () => {
	console.log('Listenning on port ' + settings.port);
});
