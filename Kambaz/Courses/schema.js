import mongoose from "mongoose";
import moduleSchema from "../Modules/schema.js";
import assignmentSchema from "../Assignment/schema.js";

const courseSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    number: String,
    startDate: Date,
    endDate: Date,
    // startDate: { type: Date },
    // endDate: { type: Date },
    image: String,
    credits: Number,
    description: String,
    modules: [moduleSchema],
    assignments: [assignmentSchema],
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
  },
  { collection: "courses" }
);
export default courseSchema;
