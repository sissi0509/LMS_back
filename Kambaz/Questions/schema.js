const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  question: { type: String, required: true },
  type: {
    type: String,
    enum: ["MCQ", "TRUE_FALSE", "FILL_BLANK"],
    required: true,
  },
  points: { type: Number, default: 0, required: true },

  // For MCQ
  choices: [String],
  correctChoiceIndex: Number,

  // For true false
  correctBoolean: Boolean,

  // For fill in blank
  acceptableAnswers: [String],
});
