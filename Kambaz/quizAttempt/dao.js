// createAttempt(userId, quizId, attemptData);
// updateAttempt(userId, quizId, attemptData);
// readAttempt(userId, quizId);
// readAttemptId(attemptId);
// getAllAttemptForQuiz(quizId);

import attemptModel from "./model.js";

export default function QuizAttemptDao() {
  const createAttempt = async (userId, quizId, attemptData) => {
    const attempt = await attemptModel.create({
      user: userId,
      quiz: quizId,
      ...attemptData,
    });
    return attempt;
  };

  const updateAttempt = ASU;
}
