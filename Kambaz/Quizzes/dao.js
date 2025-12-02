import quizModel from "./model.js";
import courseModel from "../Courses/model.js";
export default function Dao() {
  async function findQuizzesForCourse(courseId) {
    const course = await courseModel.findById(courseId).populate("quizzes");
    if (!course) {
      return [];
    }
    return course.assignments;
  }
  async function createQuizForCourse(courseId, quizData) {
    const course = await courseModel.findById(courseId);
    if (!course) {
      throw new Error(`Course ${courseId} not found`);
    }
    const quiz = await quizModel.create({
      ...quizData,
      course: courseId,
    });

    course.quizzes.push(quiz._id);
    await course.save();

    return quiz;
  }

  async function deleteQuiz(quizId) {
    const quiz = await quizModel.findById(quizId);
    if (!quiz) {
      throw new Error("Quiz not found");
    }

    const courseId = quiz.course;

    await quizModel.deleteOne({ _id: quizId });
    await courseModel.updateOne(
      { _id: courseId },
      { $pull: { quizzes: quizId } }
    );

    return quizId;
  }

  async function updateQuiz(quizId, quizUpdates) {
    const quiz = await quizModel.findById(quizId);
    if (!quiz) {
      throw new Error("Quiz not found");
    }
    Object.assign(quiz, quizUpdates);
    await quiz.save();
    return quiz;
  }

  return {
    findQuizzesForCourse,
    createQuizForCourse,
    deleteQuiz,
    updateQuiz,
  };
}
