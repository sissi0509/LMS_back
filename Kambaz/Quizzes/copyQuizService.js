import QuestionDao from "../Questions/dao.js";
import QuizDao from "./dao.js";
import CourseDao from "../Courses/dao.js";
import AttemptDao from "../quizAttempt/dao.js";

export default async function copyQuiz(courseId, quizId) {
  const questionDao = QuestionDao();
  const quizDao = QuizDao();

  const quiz = await quizDao.findQuizById(quizId)

  const copiedQuiz = {...quiz.toObject(), questions: []}
  delete copiedQuiz._id;

  const newQuiz = await quizDao.createQuizForCourse(courseId, copiedQuiz)

  const quizQuestions = await questionDao.findAllQuestionsForQuiz(quizId)

  for (const each of quizQuestions) {
    const newQuestion = each.toObject();
    delete newQuestion._id;
    await questionDao.createQuestionForCourse(newQuiz._id, newQuestion)
  }

  return newQuiz
}