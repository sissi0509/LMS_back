import QuizDao from "./dao.js";
import QuestionDao from "../Questions/dao.js";
import deleteQuizService from "./deleteQuizService.js";
import copyQuizService from "./copyQuizService.js";
export default function QuizRoutes(app) {
  const quizDao = QuizDao();
  const questionDao = QuestionDao();
  const findQuizzesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await quizDao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  };

  const findQuizzesById = async (req, res) => {
    const { quizId } = req.params;
    const quiz = await quizDao.findQuizById(quizId);
    res.json(quiz);
  };

  const createQuizForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quiz = await quizDao.createQuizForCourse(courseId, req.body);
    res.json(quiz);
  };

  const deleteQuiz = async (req, res) => {
    const { courseId, quizId } = req.params;
    const status = await deleteQuizService(courseId, quizId);

    res.send(status);
  };

  const updateQuiz = async (req, res) => {
    const { quizId } = req.params;
    const quiz = await quizDao.updateQuiz(quizId, req.body);
    res.json(quiz);
  };

  const copyQuiz = async (req, res) => {
    const {courseId, quizId} = req.params;
    const quizzes = copyQuizService(courseId, quizId);
    res.json(quizzes)
  }

  app.post("/api/courses/:courseId/quizzes/:quizId/copy", copyQuiz);
  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.get("/api/quizzes/:quizId", findQuizzesById);
  app.post("/api/courses/:courseId/quizzes", createQuizForCourse);
  app.delete("/api/courses/:courseId/quizzes/:quizId", deleteQuiz);
  app.put("/api/quizzes/:quizId", updateQuiz);
}
