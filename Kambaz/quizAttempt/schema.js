import mongoose from "mongoose";
const quizAttemptSchema = new mongoose.Schema(
  {
    user: { type: String, ref: "UserModel", required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    // attemptNumber: { type: Number, required: true, default: 0 }, derived from the len of submittedAt
    startAt: [{ type: Date }],
    submittedAt: [{ type: Date }],
    score: [{ type: Number, default: 0 }],
    // last attempt answer
    answers: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        selectedChoiceIndex: Number, // for MCQ
        selectedBoolean: Boolean, // for true/false
        textAnswer: String, // for fill in blank
        isCorrect: Boolean,
        pointsAwarded: Number,
      },
    ],
  },
  { collection: "quizAttempts" }
);

export default quizAttemptSchema;
