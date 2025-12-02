import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("Question", schema);
export default model;
