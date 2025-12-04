import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("QuizAttempt", schema);
export default model;
