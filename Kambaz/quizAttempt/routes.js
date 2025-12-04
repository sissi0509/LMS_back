import attemptDao from "./dao.js";

export default function AttemptRoutes(app) {
  const dao = attemptDao();
  const createOrUpdateAttempt = async (req, res) => {
    try {
      const { userId, quizId } = req.params;
      const attempt = await dao.createOrUpdateAttempt(userId, quizId, req.body);
      res.json(attempt);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  const getAttempt = async (req, res) => {
    const { userId, quizId } = req.params;
    const result = await dao.getAttempt(quizId, userId);
    res.json(result); // here it contains both attempts and attemptsUsed
  };

  const getAllAttemptForQuiz = async (req, res) => {
    const { quizId } = req.params;
    const attempts = await dao.getAllAttemptForQuiz(quizId);
    res.json(attempts);
  };

  app.post(
    "/api/users/:userId/quizzes/:quizId/attempts",
    createOrUpdateAttempt
  );
  app.get("/api/users/:userId/quizzes/:quizId/attempts", getAttempt);
  app.get("/api/quizzes/:quizId/attempts", getAllAttemptForQuiz);
}
