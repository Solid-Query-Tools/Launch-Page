const dotenv = require('dotenv');
const { User } = require('../models');
const axios = require('axios')
dotenv.config();

const client_secret = process.env.CLIENT_SECRET;
const client_id = process.env.CLIENT_ID;

const oauthController = {

  exchangeCode: (req, res, next) => {
    console.log("Running OAUTH MiddleWare 1 - Exchange Code ")
    const { code } = req.query;
    const body = { client_id, client_secret, code };
    const options = { headers: { accept: 'application/json' } };

    console.log("After the response from the initial visit to github, we are sending the client_id, client_secret, code:", 
      client_id, client_secret, code
    )

    axios.post('https://github.com/login/oauth/access_token', body, options)
      .then(response => {
        res.locals.token = response.data['access_token'];
        console.log("We are exiting Middleware Number 1...")
        return next();
      })
      .catch(err => {
        console.log('error in oauthController.exchangeCode --> POST')
        return next({
          log: 'error in oauthController.exchangeCode --> POST',
          status: 500,
          message: {err: err}
        });
      });
  },

  getUserDetails: (req, res, next) => {
    console.log("Running OAUTH MiddleWare 2 - Get User Details ");
    axios.get('https://api.github.com/user', 
      { headers: { Authorization: `Bearer ${res.locals.token}` } },
    )
      .then(response => {
        const { login } = response.data;
        User.findOne({ username: login })
          .then(user => {
            if (!user) {
              // user doesn't exist, so:
              const newUser = new User({
                username: login,
              });
              newUser
                .save()
                .then(user => {
                  res.locals.user = user;
                  return next();
                })
                .catch(err => {
                  console.log('Error in getUserDetails --> new User.save')
                  return next({
                    log: 'Error in getUserDetails --> new User.save',
                    status: 500,
                    message: {err}
                  });
                });
            } else {
              // user already exists
              res.locals.user = user;
              return next();
            }
          })
          .catch(err => {
            console.log('error in getUserDetails --> User.findOne')
            return next({
              log: 'error in getUserDetails --> User.findOne',
              status: 500,
              message: {err}
            });
          });
      })
      .catch(err => {
        console.log('Error in getUserDetails --> fetch')
        return next({
          log: 'Error in getUserDetails --> fetch',
          status: 500,
          message: {err}
        });
      });
  }
}

module.exports = oauthController;