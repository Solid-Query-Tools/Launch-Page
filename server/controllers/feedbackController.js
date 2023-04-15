const { Feedback, User } = require('../models');

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
    // if user is not logged in, send only approved feedback 
    // if user is logged in, use cookie to find the user
    // if user's admin is false, retrieve only approved feedback
    // if user's admin is true, retrieve all feedback
    try {  
      if (Object.keys(req.cookies).includes("session") === false)  {
        console.log("User not logged in, sending APPROVED feedback!")
        Feedback.find({ approved: true })
              .then(results => {
                res.locals.feedback = results;
                return next();
              })
      }
      await User.findOne({ _id: req.cookies.session })
        .then(results => {
          let adminStatus = results.admin;
          if (adminStatus === true) {
            console.log("Sending ALL feedback")
            Feedback.find({})
              .then(results => {
                res.locals.feedback = results;
                return next();
              })
          }
          else {
            console.log("Sending only APPROVED feedback")
            Feedback.find({ approved: true })
              .then(results => {
                res.locals.feedback = results;
                return next();
              })
          }
        })
    }
    catch (error) {
      if (error) return next({
        log: 'Error in feedbackController.getFeedback --> finding feedback',
        status: 500,
        message: { error }
      });
    };
  },

  updateFeedback: async (req, res, next)  =>  {
    try {
      const { _id, adminResponse } = req.body;
      console.log("Updating feedback in DB and approving! ID and Admin Response:", _id, adminResponse)
      
      Feedback.findOneAndUpdate({_id: _id}, {adminResponse: adminResponse, approved: true})
        .then(result => {
          res.locals.updatedObject = result;
          return next();
        })
    }
    catch (err) {
      next({
        log: "Error in updateFeedback",
        status: 500,
        message: { err },
      })
    }
  }

}

module.exports = feedbackController;