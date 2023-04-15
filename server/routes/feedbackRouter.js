const express = require('express');
const feedbackRouter = express.Router();
const { getFeedback, postFeedback, updateFeedback } = require('../controllers/feedbackController');
const { verifySession } = require('../controllers/sessionController')

feedbackRouter.post('/', verifySession, postFeedback, (req, res) => {
  res.status(200).send('Your feedback has been submitted. Once approved, it will appear in the feed.');
})

feedbackRouter.put('/', updateFeedback, (req, res) => {
  console.log("Comment has sucessfully been updated in Feedback Object!")
  res.status(200).send(res.locals.updatedObject);
})

feedbackRouter.get('/', getFeedback, (req, res) => {
  return res.status(200).send(res.locals.feedback);
})

module.exports = feedbackRouter;