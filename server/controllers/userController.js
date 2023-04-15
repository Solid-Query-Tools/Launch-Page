const { Session } = require('../models');

const userController = {

  getUser: async (req, res, next) => {
    console.log("Retrieving the username from the database")
    let cookies = req.cookies;
    console.log("These are the cookies!", cookies);
    await Session.findOne({ userId: req.cookies.session })
      .then(results => {
        res.locals.currentUser = results.username;
        console.log("This is the username from the retrieval:", res.locals.currentUser)
        return next();
      })
      .catch((err) => {
        console.log('Error in userController.getUser');
        return next({
          log: 'Error in userController.getUser',
          status: 500,
          message: { err },
        });
      })
  },
  
}



module.exports = userController;