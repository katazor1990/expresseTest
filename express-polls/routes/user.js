const users = require('../models/user');
const settings = require('../settings')
const bodyParser = require('body-parser');
const express = require('express');
/*const authMiddle = require('../authmiddleware');*/
const router  = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/*router.use(authMiddle);         USAGE GLOBAL       */

router.get('polls',(req,res) => {
    const sex = req.query.sex; // query du style ?sex=F

   if(sex && !['M','F','Other'].includes(sex)) {
        return res.status(400).send('Parameter sex must be F, M or Other');
    }

   const usersFiltered = sex ? users.filter(usr => usr.sex === sex) : users;

   res.send(usersFiltered);
});

router.get('/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	const user =users.find( user => user.id === id);
	res.send(user);
});

router.get('/:username', (req, res) => {
	const username = req.params.username;
	const user =users.find( user => user.username === username);

	if(!user) return res.sendStatus(404);
	res.send(user);
});
/*
router.put('/:id', authMiddle,(req, res) => {
	const id = parseInt(req.params.id, 10);
	const user = users.find( user => user.id === id );
	if (!user) return res.status(404).send('Invalide id');
	
	const response = req.body.response;
	if (!username && !sex) return res.status(400).send('Missing parameter username');
	if (sex && ['M', 'F','Other'].includes(sex)) {
		return res.status(400).send('Missing parameter username'); 
	}
	user.username = username ? username : user.username;
	user.sex = sex ? sex : user.sex;
	res.status(200).send(user);
});*/

router.post('', authMiddle,(req, res) => {
	const { username, sex } = req.body;
	if (!username) return res.status(400).send('Missing parameter username');
	if (!sex) return res.status(400).send('Missing parameter sex');

	if (['M', 'F', 'Other'].includes(sex)) {
		return res.status(400).send('Invalide paramater')
	} 

	const id = users.reduce((max, user) =>  max > user.id ? max : user.id, 0) + 1;
	
	const user = { id, username, sex };
	users.push(user);
	res.status(200).send(user);
});

router.delete('/:id', authMiddle,(req, res) => {
	const id = parseInt(req.params.id, 10);
	const user = users.find( user => user.id === id );
	if(!user) return res.sendStauts(404);
	const index = users.findIndex( u => u.id === id );
	users.splice(user, 1);
	res.status(204).send(user);
});

module.exports = router;