/*const express = require('express');
const router = express.Router();
const polls = require('../models/polls');*/

router.get('/', (req, res) => {
  res.send(polls);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const poll = polls.find(p => p.id === id);

  if (!poll) return res.sendStatus(404);

  res.send(poll);
});

router.post('/', (req, res) => {
  const { question, answers } = req.body;
  // Vérification des paramètres
  if (!question) return res.status(400).send('Missing parameter question');
  if (!answers) return res.status(400).send('Missing parameter answers');

  if (typeof question !== 'string') return res.status(400).send('Wrong parameter question');
  if (!Array.isArray(answers) || answers.some(a => typeof a !== 'string')) {
    return res.status(400).send('Wrong parameter answers');
  }

  const id = Math.max(...polls.map(p => p.id)) + 1;

  const poll = {
    id, question, answers,
    votes: []
  };
  polls.push(poll);

  res.status(201).send(poll);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const poll = polls.find(p => p.id === id);

  if (!poll) return res.sendStatus(404);

  const index = polls.findIndex(p => p.id === id);

  polls.splice(index, 1);

  res.sendStatus(204);
});

router.post('/:id/votes', (req, res) => {
  res.status(201).send(poll.votes);
});

module.exports = router;
