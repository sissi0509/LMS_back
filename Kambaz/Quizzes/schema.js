import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    // course: { type: String, ref: "Course", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    points: { type: Number, min: 0, default: 0 },
    availableFrom: Date,
    availableUntil: Date,
    dueDate: Date,
    published: { type: Boolean, default: false, required: true },
    type: {
      type: String,
      enum: [
        "GRADED_QUIZ",
        "PRACTICE_QUIZ",
        "GRADED_SURVEY",
        "UNGRADED_SURVEY",
      ],
      required: true,
      default: "GRADED_QUIZ",
    },
    assignmentGroup: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
      required: true,
      default: "QUIZZES",
    },
    timeLimitMinutes: { type: Number, min: 0, default: 20 },
    shuffleAnswers: { type: Boolean, default: true },
    multipleAttempts: { type: Boolean, default: false },
    maxAttempts: { type: Number, min: 1, default: 1 },
    showCorrectAnswers: { type: Boolean, default: false },
    showCorrectAnswersAt: { type: Date, default: null },
    accessCode: { type: String, default: null },
    oneQuestionPerTime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionAfterAnswer: { type: Boolean, default: false },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  {
    collection: "quizzes",
  }
);

export default quizSchema;
