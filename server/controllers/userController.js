const { Session, User } = require('../models');

const userController = {

  getUser: async (req, res, next) => {
    // if no session cookie, return null to the client
    if (!req.cookies.session) {
      res.locals.userResponse = null;
      return next();
    }

    // otherwise search for a session matching the current cookie
    await Session.findOne({ userId: req.cookies.session })
      .then(results => {
        // if no corresponding session is found, return null to the client
        if (results === null) {
          res.locals.userResponse = null;
          return next();
        }
        // otherwise save the user's github username to res.locals.userResponse
        res.locals.userResponse = {username: results.username};
        return next();
      })
      .catch((err) => {
        console.log('Error in userController.getUser');
        return next({
          log: 'Error in userController.getUser',
          status: 500,
          message: { err },
        });
      });
  },

  verifyAdmin: async (req, res, next) => {
    try {
      if (!res.locals.userResponse) return next();
      let username = res.locals.userResponse.username;
      const user = await User.findOne({username});
      if (user.admin) {
        res.locals.userResponse.admin = true;
      }
      return next();
    }
    catch(err) {
      return next({
        log: 'Error in verifyAdmin',
        status: 500,
        message: {err},
      });
    }
  }
}

module.exports = userController;