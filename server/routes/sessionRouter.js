const express = require('express');
const sessionRouter = express.Router();
const { deleteSession } = require('../controllers/sessionController')

// check if user is logged in and retrieve username to send back to client
sessionRouter.delete('/', deleteSession, (req, res) => {
  console.log("Exiting deleteSession!", res.locals.deletedSession);
  return res.status(200).send(res.locals.deletedSession);
})

module.exports = sessionRouter;