import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


// connect to mongo DB
mongoose.connect(`${process.env.MONGO_URI}`);
mongoose.connection
.on('open', () => console.log('Connected to Mongo DB'))
.on('error', (error: object) => console.log(error));

// define schema for bug submissions
// const bugSchema = new mongoose.Schema({
//   message: {type: String},
//   resolved: {type: Boolean, default: false},
//   created: {type: Date, default: new Date()}
// });

// define schema for admin logins
const adminSchema = new mongoose.Schema({
  user: {type: String, required: true},
  admin: {type: Boolean, required: true}
});

// define & export the Bug model
// export const Bug = mongoose.model('Bug', bugSchema);
export const Admin = mongoose.model('Admin', adminSchema);