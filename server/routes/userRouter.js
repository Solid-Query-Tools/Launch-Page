const express = require('express');
const userRouter = express.Router();
const { getUser, verifyAdmin } = require('../controllers/userController')

// check if user is logged in and retrieve username to send back to client
userRouter.get('/', getUser, verifyAdmin, (req, res) => {
  return res.status(200).send(res.locals.userResponse);
})

module.exports = userRouter;