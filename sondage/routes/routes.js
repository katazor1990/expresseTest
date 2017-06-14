const express = require('express');
const router = express.Router();
const polls = require('../models/polls');

router.param('id', (req, res, next, id) => {
  return polls.getById(id)
    .then((poll) => {
      req.poll = poll;
      next();
    })
    .catch((error) => {
      return res.status(404).send(error.message);
    });
});

router.get('/', (req, res) => {
  return polls.getAll()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

router.get('/:id', (req, res) => {
  res.send(req.poll);
});

router.post('/', (req, res) => {
  const { question, answers } = req.body;

  if (!question) return res.status(400).send('Missing parameter question');
  if (!answers) return res.status(400).send('Missing parameter answers');

  if (typeof question !== 'string') return res.status(400).send('Wrong parameter question');
  if (!Array.isArray(answers) || answers.some(a => typeof a !== 'string')) {
    return res.status(400).send('Wrong parameter answers');
  }

  return polls.create(question, answers)
    .then((poll) => {
      res.status(201).send(poll);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

router.delete('/:id', (req, res) => {
  return polls.delete(req.poll.id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

router.post('/:id/votes', (req, res) => {
  const vote = parseInt(req.body.vote, 10);

  if (typeof vote === 'undefined') return res.status(400).send('Missing parameter vote');
  if (!(vote in req.poll.answers)) return res.status(400).send('Wrong parameter vote');

  return polls.vote(req.poll.id, vote)
  .then((votes) => {
  	res.status(201).send(votes);
  })
  .catch((error) => {
  	res.status(500).send(error.message);
  });
});

module.exports = router;
