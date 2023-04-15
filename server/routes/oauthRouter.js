const sessionController = require('../controllers/sessionController');
const oauthController = require('../controllers/oauthController');
const express = require('express');
const dotenv = require('dotenv');
const oauthRouter = express.Router();
dotenv.config();
const client_id = process.env.CLIENT_ID

oauthRouter.get('/', (req, res) => {
  res.status(200).redirect(
    `https://github.com/login/oauth/authorize?client_id=${client_id}`
  );
});

oauthRouter.get(
  '/token?',
  oauthController.exchangeCode,
  oauthController.getUserDetails,
  sessionController.verifySession,
  sessionController.createSession,
  (req, res) => {
    res.body = res.locals.user.username;
    console.log("Sending username back to front!", res.body)
    return res.status(200).redirect('/');
  }
)

module.exports = oauthRouter;