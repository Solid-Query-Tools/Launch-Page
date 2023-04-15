const express = require('express');
const userRouter = express.Router();
const { getUser } = require('../controllers/userController')

// check if user is logged in and retrieve username to send back to client
userRouter.get('/', getUser, (req, res) => {
  console.log("Exiting the getUser Middleware! userResponse: ", res.locals.userResponse);
  return res.status(200).send(res.locals.userResponse);
})

module.exports = userRouter;