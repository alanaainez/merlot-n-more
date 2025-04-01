import { Schema, model } from 'mongoose';


// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const wineSchema = new Schema({
  name: String,
  type: String,
  winery: String,
  region: String,
  rating: Number,
});

export default model('Wine', wineSchema);
