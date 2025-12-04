// createAttempt(userId, quizId, attemptData);
// updateAttempt(userId, quizId, attemptData);
// readAttempt(userId, quizId);
// readAttemptId(attemptId);
// getAllAttemptForQuiz(quizId);

import attemptModel from "./model.js";

export default function QuizAttemptDao() {
  const createOrUpdateAttempt = async (userId, quizId, attemptData) => {
    let attempt = await attemptModel.find({ user: userId, quiz: quizId });
    if (!attempt) {
      attempt = await attemptModel.create({
        user: userId,
        quiz: quizId,
        ...attemptData,
      });
    }
    if (attempt.attemptNumber >= maxAttempts) {
      throw new Error("Maximum number of attempts reached");
    }
    attempt.attemptNumber += 1;
    attempt.submittedAt.push(new Date());
    attempt.score.push(attemptData.score);
    attempt.answers = attemptData.answers;

    await attempt.save();
    return attempt;
  };

  return { createOrUpdateAttempt };
}
