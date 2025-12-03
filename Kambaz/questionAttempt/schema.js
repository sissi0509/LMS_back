const quizAttemptSchema = new mongoose.Schema(
  {
    user: { type: String, ref: "UserModel", required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    attemptNumber: { type: Number, required: true, default: 0 },
    submittedAt: [{ type: Date, required: true }],
    score: [{ type: Number, required: true }],

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
