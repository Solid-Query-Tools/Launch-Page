const { connect, Schema, model } = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB.'))
  .catch((err) => console.log(err));

const feedbackSchema = new Schema({
  type: {type: String, required: true},
  message: {type: String, required: true},
  createdBy: {type: String, required: true}, //Could be a user instance instead
  createdAt: {type: Date, required: true, default: Date.now()}, 
  approved: {type: Boolean, default: false, required: true},
  adminResponse: {type: String, required: false}, 
});

const userSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: false},
  admin: {type: Boolean, requred: true, default: false}
});

const sessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 600,
    default: Date.now(),
  }
});

// export models
const Feedback = model('Feedback', feedbackSchema);
const User = model('User', userSchema);
const Session = model('Session', sessionSchema);

module.exports = { Feedback, User, Session }