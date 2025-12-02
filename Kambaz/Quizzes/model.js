import mongoose from "mongoose";
import quizSchema from "./schema.js";
const model = mongoose.model("Quiz", quizSchema);
export default model;
