const express = require('express');
const settings = require('./settings');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/users', userRouter);

app.get('/', (req, res) => {
	res.send('Hello world !');
});

app.listen(settings.port, () => {
	console.log('Listenning on port ' + settings.port);
});
