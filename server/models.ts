const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Schema = mongoose.Schema;

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB.'))
  .catch((err) => console.log(err));

// TO DO: 
// initialize models and schemas
// export models