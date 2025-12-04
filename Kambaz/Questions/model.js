import mongoose from "mongoose";
import questionSchema from "./schema.js";
const model = mongoose.model("Question", questionSchema);
export default model;
