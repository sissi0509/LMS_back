import QuizzesDao from "../Quizzes/dao.js";
import QuestionDao from "./dao.js";
import { model } from "mongoose";

export default function QuestionRoutes(app) {
    const dao = QuestionDao();

    const findAllQuestionsForQuiz = async (req, res) => {
        const { quizId } = req.params;
        const questions = await dao.findAllQuestionsForQuiz(quizId) 
        res.json(questions);
    }

    const deleteQuestionFromQuiz = async (req, res) => {
        const { quizId, questionId } = req.params;
        const status = await dao.deleteQuestionFromQuiz(quizId, questionId);
        res.send(status);
    }

    const updateQuestion = async (req, res) => {
        const {questionId} = req.params;
        const questionUpdates = req.body;
        const status = await dao.updateQuestion(questionId, questionUpdates);
        res.send(status)
    }

    const createQuestionForCourse = async (req, res) => {
        const {quizId} = req.params;
        const question = req.body;
        const newQuestion = await dao.createQuestionForCourse(quizId, question);
        res.send(newQuestion)
    }

    const findQuestionById = async (req, res) => {
        const {questionId} = req.params;
        const question = await dao.findQuestionById(questionId);
        res.json(question)
    }

    app.post("/api/quizzes/:quizId/questions", createQuestionForCourse);
    app.delete("/api/quizzes/:quizId/questions/:questionId", deleteQuestionFromQuiz);
    app.get("/api/quizzes/:quizId/questions", findAllQuestionsForQuiz);
    app.get("/api/questions/:questionId", findQuestionById)
    app.put("/api/questions/:questionId", updateQuestion);
}