import mongoose from "mongoose";
import moduleSchema from "../Modules/schema.js";
import assignmentSchema from "../Assignment/schema.js";

const courseSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    number: String,
    startDate: String,
    endDate: String,
    // startDate: { type: Date },
    // endDate: { type: Date },
    image: String,
    credits: Number,
    description: String,
    modules: [moduleSchema],
    assignments: [assignmentSchema],
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" }],
  },
  { collection: "courses" }
);
export default courseSchema;
