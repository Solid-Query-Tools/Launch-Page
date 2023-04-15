const { Feedback } = require('../models');

const feedbackController = {

  postFeedback: async (req, res, next) => {
    try {
      console.log("Posting feedback to DB!")
      const { type, message, createdBy } = req.body;
      Feedback.create({
        'type': type,
        'message': message,
        'createdBy': createdBy,
      })
      return next();
    }
    catch (err) {
      next({
        log: "Error in postFeedback",
        status: 500,
        message: { err },
      })
    }
  },

  getFeedback: async (req, res, next) => {
    // find all approved feedback and save to res.locals
    try {
      console.log("Getting Approved Feedback");
      Feedback.find({ approved: true })
        .then(results => {
          res.locals.approvedFeedback = results;
        })
        .then(Feedback.find({ approved: false })
          .then(results => {
            res.locals.pendingFeedback = results;
            return next();
          })
        )
    }
    catch (error) {
      if (error) return next({
        log: 'Error in feedbackController.getFeedback --> finding feedback',
        status: 500,
        message: { error }
      });
    };
  },
}

module.exports = feedbackController;