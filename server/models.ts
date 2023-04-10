const { Schema, connect, model } = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB.'))
  .catch((err) => console.log(err));

// TO DO: 
// initialize models and schemas
// interface IFeedback {
//   type: string,
//   message: string,
//   createdBy: string,
//   createdAt: Date,
//   approved: boolean,
//   adminResponse: string
// }

const feedbackSchema = new Schema({
  type: {type: String, required: true},
  message: {type: String, required: true},
  createdBy: {type: String, required: true}, //Could be a user instance instead
  createdAt: {type: Date, required: true}, 
  approved: {type: Boolean, default: false, required: true},
  adminResponse: {type: String, required: false}, 
});

const userSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: false},
  admin: {type: Boolean, requred: true, default: false}
});

// export models
const Feedback = model('feedback', feedbackSchema);
const User = model('user', userSchema);

module.exports = { Feedback, User };