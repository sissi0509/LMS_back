import QuizzesDao from "../Quizzes/dao.js";
import QuestionDao from "./dao.js";
import { model } from "mongoose";

export default function QuestionRoutes(app) {
  const dao = QuestionDao();

  const findAllQuestionsForQuiz = async (req, res) => {
    const { quizId } = req.params;
    const questions = await dao.findAllQuestionsForQuiz(quizId);
    res.json(questions);
  };

  const deleteQuestionFromQuiz = async (req, res) => {
    const { quizId, questionId } = req.params;
    const status = await dao.deleteQuestionFromQuiz(quizId, questionId);
    res.send(status);
  };

  const deleteAllQuestionsFromQuiz = async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.deleteAllQuestionsFromQuiz(quizId);
    res.send(status);
  };

  const updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    const questionUpdates = req.body;
    const status = await dao.updateQuestion(questionId, questionUpdates);
    res.send(status);
  };

  const findQuestionById = async (req, res) => {
    const { questionId } = req.params;
    const question = await dao.findQuestionById(questionId);
    res.json(question);
  };

  const findQuizPoints = async (req, res) => {
    const { quizId } = req.params;
    const quizPoint = await dao.findQuizPoints(quizId);
    res.json(quizPoint);
  };

  const createOrUpdateQuestionForCourse = async (req, res) => {
    const { quizId, questionId } = req.params;
    const question = req.body;
    const newQuestion = await dao.createOrUpdateQuestion(
      questionId,
      question,
      quizId
    );
    res.send(newQuestion);
  };

  app.post(
    "/api/quizzes/:quizId/questions/:questionId",
    createOrUpdateQuestionForCourse
  );
  app.delete(
    "/api/quizzes/:quizId/questions/:questionId",
    deleteQuestionFromQuiz
  );
  app.get("/api/quizzes/:quizId/points", findQuizPoints);
  app.delete("/api/quizzes/:quizId/questions", deleteAllQuestionsFromQuiz);
  app.get("/api/quizzes/:quizId/questions", findAllQuestionsForQuiz);
  app.get("/api/questions/:questionId", findQuestionById);
  app.put("/api/questions/:questionId", updateQuestion);
}
