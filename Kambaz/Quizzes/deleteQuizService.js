import QuestionDao from "../Questions/dao.js";
import QuizDao from "./dao.js";
import AttemptDao from "../quizAttempt/dao.js";

export default async function deleteQuizService(courseId, quizId) {
  const questionDao = QuestionDao();
  const quizDao = QuizDao();
  const attemptDao = AttemptDao();
  await questionDao.deleteAllQuestionsFromQuiz(quizId);
  await attemptDao.deleteAttemptForQuiz(quizId);
  const status = await quizDao.deleteQuiz(courseId, quizId);
  return status;
}
