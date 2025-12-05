import quizModel from "../Quizzes/model.js";
import model from "./model.js";
export default function QuestionsDao(db) {
  async function findAllQuestionsForQuiz(quizId) {
    const quizQuestions = await quizModel.findById(quizId, {
      _id: 0,
      questions: 1,
    });

    const questionIds = quizQuestions.questions;

    const questions = await model.find({ _id: { $in: questionIds } });

    return questions;
  }

  async function deleteQuestionFromQuiz(quizId, questionId) {
    const status = await quizModel.updateOne(
      { _id: quizId },
      { $pull: { questions: questionId } }
    );

    return model.deleteOne({ _id: questionId });
  }


    async function deleteAllQuestionsFromQuiz(quizId) {
        const quizQuestions = await quizModel.findById(quizId, {_id: 0, questions: 1});

        const questionIds = quizQuestions.questions;

        return model.deleteMany({_id: {$in: questionIds}})
    }

    async function updateQuestion(questionId, questionUpdates) {
        return model.updateOne({_id: questionId}, {$set: questionUpdates})
    }

    async function createQuestionForCourse(quizId, question) {
        delete question._id;

        const newQuestion = await model.create({ ...question });

        const quizUpdate = await quizModel.updateOne(
        { _id: quizId },
        { $push: { questions: newQuestion._id } }
        );

        return newQuestion;
    }

    async function findQuestionById(questionId) {
        const question = await model.find({ _id: questionId });

        return question;
    }


    async function findQuizPoints(quizId) {
        const questions = await findAllQuestionsForQuiz(quizId)
        if (questions.length !== 0) {
            return questions.reduce((sum, question) => {return sum + question.points}, 0);
        }
        else {
            return 0;
        }
    }

    return {
        findAllQuestionsForQuiz, 
        deleteQuestionFromQuiz,
        updateQuestion, 
        createQuestionForCourse,
        findQuestionById,
        findQuizPoints,
        deleteAllQuestionsFromQuiz,
    }

}
