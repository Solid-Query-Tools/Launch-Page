const { Session } = require('../models');

const sessionController = {

  createSession: async (req, res, next) => {
    // if the user already has a verified cookie, return next
    if (res.locals.isVerified) {
      return next();
    }
    // otherwise, create a new Session and corresponding cookie
    try {
      const { _id } = res.locals.user;
      await Session.create({
        userId: _id,
        username: res.locals.user.username,
      });
      res.cookie('session', _id);
      return next();
    }
    catch (err) {
      return next({
        log: "Error in createSession",
        status: 500,
        message: { err },
      });
    }
  },

  verifySession: async (req, res, next) => {
    try {
      // look for a Session matching the user's session cookie
      Session.findOne({ userId: req.cookies.session })
        .then(results => {
          // if none is found, set isVerified to false
          if (results === null) {
            res.locals.isVerified = false;
            return next();
          }
          else {
            // otherwise set isVerified to true
            res.locals.isVerified = true;
            return next();
          }
        })
        .catch((err) => {
          return next({
            log: 'Error in sessionController.verifySession --> Session.findOne',
            status: 500,
            message: {err},
          });
        })
    } catch(error) {
      if (error) return next({
        log: 'Error in sessionController.verifySession --> catch block',
        status: 500,
        message: {error}
      });
    };
  },

  deleteSession: async (req, res, next) =>  {
   // find and delete session that corresponds to the user's session cookie
    try {
      Session.findOneAndDelete({ userId: req.cookies.session })
        .then(results => {
          res.locals.deletedSession = results;
          return next();
        });
    }
    catch (err) {
      return next({
        log: "Error in deleteSession",
        status: 500,
        message: { err },
      });
    }
  }
}

module.exports = sessionController;