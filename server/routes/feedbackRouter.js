const express = require('express');
const feedbackRouter = express.Router();
const { getFeedback, postFeedback } = require('../controllers/feedbackController');

feedbackRouter.post('/', postFeedback, (req, res) => {
  res.status(200).send('Your feedback has been submitted. Once approved, it will appear in the feed.');
})

feedbackRouter.get('/', getFeedback, (req, res) => {
  return res.status(200).send(res.locals.feedback);
})

module.exports = feedbackRouter;