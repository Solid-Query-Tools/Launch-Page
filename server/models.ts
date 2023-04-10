const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Schema = mongoose.Schema;

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB.'))
  .catch((err) => console.log(err));

// TO DO: 
// initialize models and schemas
interface IFeedback {
  type: string,
  message: string,
  createdBy: string,
  createdAt: Date,
  adminResponse: string
}

const feedbackSchema = new Schema<IFeedback>({
  type: {type: String, required: true},
  message: {type: String, required: true},
  createdBy: {type: String, required: true}, //Could be a user instance instead
  createdAt: {type: Date, required: true}, 
  adminResponse: {type: String, required: false}, 
})

// export models