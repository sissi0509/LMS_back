// createAttempt(userId, quizId, attemptData);
// updateAttempt(userId, quizId, attemptData);
// readAttempt(userId, quizId);
// readAttemptId(attemptId);
// getAllAttemptForQuiz(quizId);

import attemptModel from "./model.js";
import questionModel from "../Questions/model.js";
import quizModel from "../Quizzes/model.js";

export default function QuizAttemptDao() {
  const gradeAttempt = async (userAnswers) => {
    const questionIds = userAnswers.map((a) => a.question);
    const questionDocs = await questionModel.find({
      _id: { $in: questionIds },
    });

    const questionMap = new Map();
    questionDocs.forEach((q) => {
      questionMap.set(q._id.toString(), q);
    });

    let totalScore = 0;

    const gradedAnswers = userAnswers.map((a) => {
      const q = questionMap.get(a.question.toString());

      if (!q) {
        return { ...a, isCorrect: false, pointsAwarded: 0 };
      }

      let isCorrect = false;
      let pointsAwarded = 0;

      if (q.type === "MCQ") {
        const studentChoice = (a.selectedChoiceText || "").trim().toLowerCase();
        const correctChoice = (q.correctChoiceText || "").trim().toLowerCase();
        isCorrect = studentChoice === correctChoice;
        pointsAwarded = isCorrect ? q.points : 0;
      } else if (q.type === "TRUE_FALSE") {
        isCorrect = a.selectedBoolean === q.correctBoolean;
        pointsAwarded = isCorrect ? q.points : 0;
      } else if (q.type === "FILL_BLANK") {
        const acceptable = q.acceptableAnswers ?? []; // string[][]
        const studentAnswers = a.textAnswer ?? []; // string[]
        const totalBlanks = acceptable.length;

        if (totalBlanks > 0) {
          let correctCount = 0;

          for (let i = 0; i < totalBlanks; i++) {
            const studentRaw = (studentAnswers[i] || "").trim().toLowerCase();
            const allowedForBlank = acceptable[i] ?? [];
            const allowedNormalized = allowedForBlank.map((ans) =>
              (ans || "").trim().toLowerCase()
            );
            if (allowedNormalized.includes(studentRaw)) {
              correctCount++;
            }
          }
          const perBlank = q.points / totalBlanks;
          pointsAwarded = perBlank * correctCount;
          isCorrect = correctCount === totalBlanks;
        } else {
          isCorrect = false;
          pointsAwarded = 0;
        }
      }
      totalScore += pointsAwarded;
      return {
        ...a,
        isCorrect,
        pointsAwarded,
      };
    });

    return { gradedAnswers, totalScore };
  };

  // const createAttempt = async (userId, quizId) => {
  //   attempt = await attemptModel.create({
  //     user: userId,
  //     quiz: quizId,
  //     startAt: new Date(attemptData.startAt),
  //     score: 0,
  //   });
  //   return attempt;
  // };

  // const updateAttempt = async (userId, quizId, attemptData) => {
  //   const { gradedAnswers, totalScore } = await gradeAttempt(
  //     attemptData.answers
  //   );

  //   let attempt = await attemptModel.findOne({ user: userId, quiz: quizId });
  //   const quiz = await quizModel.findById(quizId);
  //   const maxAttempts = quiz.maxAttempts;
  //   const submittedDate = new Date(attemptData.submittedAt);
  //   const attemptsUsed = attempt.submittedAt.length;
  //   if (attemptsUsed >= maxAttempts) {
  //     throw new Error("Already reached the maximum number of attempts!");
  //   }

  //   attempt.submittedAt.push(submittedDate);
  //   attempt.score.push(totalScore);
  //   attempt.answers = gradedAnswers;

  //   await attempt.save();
  //   return attempt;
  // };

  const createOrUpdateAttempt = async (userId, quizId, attemptData) => {
    const { gradedAnswers, totalScore } = await gradeAttempt(
      attemptData.answers
    );

    let attempt = await attemptModel.findOne({ user: userId, quiz: quizId });
    const quiz = await quizModel.findById(quizId);
    const maxAttempts = quiz.maxAttempts;

    if (!attempt) {
      attempt = await attemptModel.create({
        user: userId,
        quiz: quizId,
        startAt: attemptData.startAt,
        // score: 0,
      });
      return attempt;
    }

    const attemptsUsed = attempt.submittedAt.length;
    if (attemptsUsed >= maxAttempts) {
      throw new Error("Already reached the maximum number of attempts!");
    }

    attempt.startAt = attemptData.startAt;
    attempt.submittedAt = attemptData.submittedAt;
    attempt.score.push(totalScore);
    attempt.answers = gradedAnswers;

    await attempt.save();
    return attempt;
  };

  const getAttempt = async (quizId, userId) => {
    const attempt = await attemptModel.findOne({ user: userId, quiz: quizId });
    return {
      attempt,
      attemptsUsed: attempt ? attempt.submittedAt.length : 0,
    };
  };

  const getAllAttemptForQuiz = async (quizId) => {
    const attempts = await attemptModel.find({ quiz: quizId });

    const attemptsWithCount = attempts.map((a) => ({
      attempt: a,
      attemptsUsed: a.submittedAt.length,
    }));

    return attemptsWithCount;
  };

  const deleteAttemptForQuiz = async (quizId) => {
    return attemptModel.deleteMany({ quiz: quizId });
  };

  // const getAttemptById = async (attemptId) => {
  //   const attempt = await attemptModel.findById(attemptId);
  //   return attempt;
  // };

  return {
    createOrUpdateAttempt,
    getAttempt,
    gradeAttempt,
    // createAttempt,
    // updateAttempt,
    getAllAttemptForQuiz,
    deleteAttemptForQuiz,
    // getAttemptById,
  };
}
