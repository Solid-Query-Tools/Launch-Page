const express = require('express');
const userRouter = express.Router();
const { getUser } = require('../controllers/userController')

userRouter.get('/', getUser, (req, res) => {
  console.log("Exiting the getUser Middleware!")
  return res.status(200).send(res.locals.currentUser);
})

module.exports = userRouter;