const { Session } = require('../models');

const sessionController = {

  createSession: async (req, res, next) => {
    console.log("Entering Middleware: Creating Session")
    // if the user already has a verified cookie, return next
    if (res.locals.isVerified) {
      console.log("The User has been verified! Skipping creating a session");
      return next();
    }
    // otherwise, create a new Session and corresponding cookie
    try {
      const { _id } = res.locals.user;
      console.log('id: ', _id);
      await Session.create({
        userId: _id,
        username: res.locals.user.username,
      })
      res.cookie('session', _id);
      console.log("A session has been created for:", res.locals.user.username)
      return next();
    }
    catch (err) {
      console.log("Error in createSession")
      return next({
        log: "Error in createSession",
        status: 500,
        message: { err },
      })
    }
  },

  verifySession: async (req, res, next) => {
    console.log("Entering Middleware: Verifying Session")
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
          console.log('Error in sessionController.verifySession --> Session.findOne');
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
    console.log("Entering Middleware: Deleting Session!")
   //NEED TO GET COOKIES AND USE THAT TO DELETE SESSION
    try {
      Session.findOneAndDelete({ userId: req.cookies.session })
        .then(results => {
          res.locals.deletedSession = results;
          return next();
        })
    }
    catch (err) {
      console.log("Error in deleteSession")
      return next({
        log: "Error in deleteSession",
        status: 500,
        message: { err },
      })
    }

  }
}

module.exports = sessionController;