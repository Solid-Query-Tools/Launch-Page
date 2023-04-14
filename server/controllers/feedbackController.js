const { Feedback } = require('../models');

const feedbackController = {

  postFeedback: async (req, res, next) => {
    try {
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
            message: {err},
        })
    }
  },

  getFeedback: async (req, res, next) => {
    //if user's admin is true:
    
    // find all approved feedback and save to res.locals
    Feedback.find({ approved: true })
      .then(results => {
        res.locals.approvedFeedback = results;
      })
      .catch(err => next({
        log: 'Error in feedbackController.getFeedback --> find approved feedback',
        status: 500,
        message: { err }
      }));

    // find all unapproved feedback (to send if user is admin) and save to res.locals
    Feedback.find({ approved: false })
      .then(results => {
        res.locals.pendingFeedback = results;
      })
      .catch(err => next({
        log: 'Error in feedbackController.getFeedback --> find pending feedback',
        status: 500,
        message: { err }
      }));

    return next();
  },
}

module.exports = feedbackController;