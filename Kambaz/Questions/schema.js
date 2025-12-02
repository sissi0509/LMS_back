const questionSchema = new mongoose.Schema({
  title: String,
  question: String,
  type: {
    type: String,
    enum: ["MCQ", "TRUE_FALSE", "FILL_BLANK"],
    required: true,
  },
  points: { type: Number, required: true },

  // For MCQ
  choices: [String],
  correctChoiceIndex: Number,

  // For true false
  correctBoolean: Boolean,

  // For fill in blank
  acceptableAnswers: [String],
});
