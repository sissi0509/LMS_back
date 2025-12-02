import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema({
  _id: String,
  title: String,
  dueDate: Date,
  availableDate: Date,
  untilDate: Date,
  points: Number,
  description: String,
});
export default assignmentSchema;
